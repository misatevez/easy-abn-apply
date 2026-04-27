import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { CheckCircle2, Clock, Mail, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type OrderItem = { id: string; service_type: string; price: number };
type OrderSummary = {
  id: string;
  contact_first_name: string;
  contact_email: string;
  amount_cents: number | null;
  status: string;
  created_at: string;
};

const steps = [
  {
    icon: Clock,
    title: "Application Review",
    desc: "Our accredited tax professionals will review your application within 1 business day.",
  },
  {
    icon: Mail,
    title: "Email Confirmation",
    desc: "You'll receive a confirmation email once the registration is processed.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Processing",
    desc: "Your application is securely lodged with the Australian Business Register on your behalf.",
  },
];

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    let attempts = 0;
    const poll = async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, contact_first_name, contact_email, amount_cents, status, created_at")
        .eq("stripe_checkout_session_id", sessionId)
        .single();

      if (data) {
        setOrder(data);
        const { data: orderItems } = await supabase
          .from("order_items")
          .select("id, service_type, price")
          .eq("order_id", data.id);
        setItems(orderItems ?? []);
        setLoading(false);
      } else {
        attempts++;
        if (attempts < 5) setTimeout(poll, 2000);
        else setLoading(false);
      }
    };

    poll();
  }, [sessionId]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-24 flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying your payment…</p>
        </div>
      </Layout>
    );
  }

  if (!sessionId || !order) {
    return (
      <Layout>
        <div className="container py-24 mx-auto max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-orange-400" />
          <h1 className="text-2xl font-bold text-foreground">Confirming your payment…</h1>
          <p className="mt-2 text-muted-foreground">
            We're processing your payment. You'll receive a confirmation email shortly. If you
            have any questions, contact us at{" "}
            <a href="mailto:info@abn-number.com" className="underline">
              info@abn-number.com
            </a>
            .
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const date = new Date(order.created_at).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
            Thank you, {order.contact_first_name}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your request has been successfully received and is now being processed.
          </p>

          {/* Order summary */}
          <div className="mt-6 rounded-xl border border-border bg-muted/40 px-6 py-4 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Order ID</span>
              <span className="font-mono text-muted-foreground">
                {order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Email</span>
              <span className="text-muted-foreground">{order.contact_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Date</span>
              <span className="text-muted-foreground">{date}</span>
            </div>

            {items.length > 0 && (
              <>
                <div className="border-t border-border pt-2 mt-2 space-y-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-muted-foreground">
                      <span>{item.service_type}</span>
                      <span>A${(item.price / 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                  <span>Total paid</span>
                  <span>
                    A${order.amount_cents ? (order.amount_cents / 100).toFixed(2) : "—"}
                  </span>
                </div>
              </>
            )}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            A confirmation email has been sent to{" "}
            <strong>{order.contact_email}</strong>. Please check your spam folder if you don't
            see it within a few minutes.
          </p>

          {/* Steps */}
          <div className="mt-8 grid gap-4 text-left">
            {steps.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline" size="lg">
                Return to Home
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Need help? Contact us at{" "}
            <a href="mailto:info@abn-number.com" className="underline text-foreground">
              info@abn-number.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
