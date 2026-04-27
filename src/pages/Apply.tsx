import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Shield, Lock, AlertCircle, Loader2 } from "lucide-react";
import { createOrderFromLovable, buildLineItems } from "@/lib/supabase/orders";
import { supabase } from "@/integrations/supabase/client";

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { service: string; formData: Record<string, unknown> } | null;

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!state?.service || !state?.formData) {
    return (
      <Layout>
        <div className="container py-24 mx-auto max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-orange-400" />
          <h1 className="text-2xl font-bold text-foreground">No application data found</h1>
          <p className="mt-2 text-muted-foreground">
            Please fill out one of our service forms to proceed.
          </p>
          <Link to="/abn-registration" className="mt-6 inline-block">
            <Button size="lg">Go to ABN Registration</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const { service, formData } = state;
  const lineItems = buildLineItems(service, formData);
  const totalCents = lineItems.reduce((sum, item) => sum + item.amount_cents, 0);

  const fullName = [
    String(formData.firstName || ""),
    String(formData.middleName || ""),
    String(formData.lastName || ""),
  ]
    .filter(Boolean)
    .join(" ");

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const order = await createOrderFromLovable(service, formData);

      const res = await supabase.functions.invoke("create-checkout", {
        body: {
          orderId: order.id,
          items: lineItems,
          customerEmail: order.contact_email,
          origin: window.location.origin,
        },
      });

      if (res.error) throw new Error(res.error.message);

      const { url } = res.data as { url: string };
      if (!url) throw new Error("No checkout URL received. Please try again.");

      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <h1 className="mb-1 text-3xl font-bold text-foreground">Review & Pay</h1>
          <p className="mb-8 text-muted-foreground">
            Please review your order before proceeding to secure payment.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">

            {/* Order summary */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Order Summary</h2>
              <div className="space-y-2">
                {lineItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.name}</span>
                    <span className="font-medium text-foreground">
                      A${(item.amount_cents / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    A${(totalCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Applicant info */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Applicant Details</h2>
              <div className="space-y-1.5 text-sm">
                <Row label="Name" value={fullName} />
                <Row label="Email" value={String(formData.email || "")} />
                {formData.phone && <Row label="Phone" value={String(formData.phone)} />}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-green-600" /> Secure payment via Stripe
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-green-600" /> SSL encrypted
              </span>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Redirecting to payment…
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You'll be redirected to Stripe's secure checkout to complete your payment.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-foreground">{value || "—"}</span>
  </div>
);

export default Apply;
