// Deploy secrets before use:
//   supabase secrets set STRIPE_SECRET_KEY=sk_live_...
// (use sk_test_... for development)

import Stripe from "npm:stripe@17";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LineItem {
  name: string;
  amount_cents: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const { orderId, items, customerEmail, origin } = (await req.json()) as {
      orderId: string;
      items: LineItem[];
      customerEmail: string;
      origin: string;
    };

    if (!orderId || !items?.length || !customerEmail || !origin) {
      return json({ error: "Missing required fields" }, 400);
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: items.map((item) => ({
        price_data: {
          currency: "aud",
          product_data: { name: item.name },
          unit_amount: item.amount_cents,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-cancel?order_id=${orderId}`,
      metadata: { order_id: orderId },
    });

    // Update order with session ID using service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const srKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const patch = await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${orderId}`, {
      method: "PATCH",
      headers: dbHeaders(srKey),
      body: JSON.stringify({
        stripe_checkout_session_id: session.id,
        status: "payment_processing",
      }),
    });

    if (!patch.ok) {
      const msg = await patch.text();
      throw new Error(`Failed to update order with session ID: ${msg}`);
    }

    return json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Checkout creation failed";
    return json({ error: msg }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function dbHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
}
