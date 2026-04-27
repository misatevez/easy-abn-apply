// Deploy secrets before use:
//   supabase secrets set STRIPE_SECRET_KEY=sk_live_...
//   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
// Register this endpoint in the Stripe dashboard:
//   https://dashboard.stripe.com/webhooks
// URL: https://<project-ref>.supabase.co/functions/v1/stripe-webhook
// Events to listen for: checkout.session.completed

import Stripe from "npm:stripe@17";

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Signature verification failed";
    return json({ error: msg }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const srKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const headers = dbHeaders(srKey);

  // Log every event for audit trail (idempotent via UNIQUE stripe_event_id)
  await fetch(`${supabaseUrl}/rest/v1/webhook_events`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal,resolution=ignore-duplicates" },
    body: JSON.stringify({
      stripe_event_id: event.id,
      event_type: event.type,
      processed: false,
      payload: event,
    }),
  });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      // Mark order as paid (idempotent)
      const patch = await fetch(
        `${supabaseUrl}/rest/v1/orders?id=eq.${orderId}&status=neq.paid`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            status: "paid",
            paid_at: new Date().toISOString(),
            stripe_payment_intent_id: session.payment_intent ?? null,
          }),
        }
      );

      if (patch.ok) {
        // Mark abandoned cart as recovered
        await fetch(`${supabaseUrl}/rest/v1/abandoned_carts?order_id=eq.${orderId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ recovered: true }),
        }).catch(() => {});

        // Send emails
        await Promise.allSettled([
          sendEmail(supabaseUrl, srKey, orderId, "confirmation"),
          sendEmail(supabaseUrl, srKey, orderId, "admin_notification"),
        ]);
      }

      await fetch(
        `${supabaseUrl}/rest/v1/webhook_events?stripe_event_id=eq.${event.id}`,
        { method: "PATCH", headers, body: JSON.stringify({ processed: true }) }
      );
    }
  }

  if (event.type === "checkout.session.expired") {
    // Order stays as-is; abandoned cart system will handle follow-up
    await fetch(
      `${supabaseUrl}/rest/v1/webhook_events?stripe_event_id=eq.${event.id}`,
      { method: "PATCH", headers, body: JSON.stringify({ processed: true }) }
    );
  }

  return json({ received: true });
});

async function sendEmail(
  supabaseUrl: string,
  srKey: string,
  orderId: string,
  template: string
) {
  try {
    await fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        apikey: srKey,
        Authorization: `Bearer ${srKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id: orderId, template_name: template }),
    });
  } catch (err) {
    console.error(`Failed to send ${template} email for order ${orderId}:`, err);
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
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
