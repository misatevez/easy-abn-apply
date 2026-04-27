import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) return;
    supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", orderId)
      .eq("status", "payment_processing")
      .then(({ error }) => {
        if (error) console.error("Failed to cancel order:", error.message);
      });
  }, [orderId]);

  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <XCircle className="h-10 w-10 text-orange-500" />
          </div>

          <h1 className="text-3xl font-extrabold text-foreground">Payment Cancelled</h1>
          <p className="mt-3 text-muted-foreground">
            Your payment was cancelled and your application has not been submitted. You have
            not been charged.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            You can go back and complete your application at any time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/abn-registration">
              <Button size="lg" className="w-full sm:w-auto">
                Try Again
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCancel;
