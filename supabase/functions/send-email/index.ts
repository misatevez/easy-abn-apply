const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "abn.service11@gmail.com";
const FROM_EMAIL = "ABN Registration Services <noreply@abn-number.com>";
const SITE_URL = "https://abn-number.com";

const SERVICE_LABEL: Record<string, string> = {
  abn_registration: "ABN Registration",
  gst_registration: "GST Registration",
  business_name_registration_1yr: "Business Name Registration (1 year)",
  business_name_registration_3yr: "Business Name Registration (3 years)",
  business_name_registration: "Business Name Registration",
  abn_cancellation: "ABN Cancellation",
  gst_cancellation: "GST Cancellation",
  business_name_cancellation: "Business Name Cancellation",
  abn_update: "Update ABN Details",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const srKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const resendKey = Deno.env.get("RESEND_API_KEY")!;

  try {
    const { order_id, template_name } = await req.json();
    if (!order_id || !template_name) {
      return json({ error: "order_id and template_name are required" }, 400);
    }

    const headers = dbHeaders(srKey);

    // Fetch order
    const orderRes = await fetch(
      `${supabaseUrl}/rest/v1/orders?id=eq.${order_id}&select=*`,
      { headers }
    );
    const orders = await orderRes.json();
    const order = orders[0];
    if (!order) return json({ error: "Order not found" }, 404);

    // Fetch order_items
    const itemsRes = await fetch(
      `${supabaseUrl}/rest/v1/order_items?order_id=eq.${order_id}&select=*&order=created_at.asc`,
      { headers }
    );
    const items: OrderItem[] = await itemsRes.json();

    // Idempotency
    if (template_name === "confirmation" && order.confirmation_email_sent) {
      return json({ skipped: true, reason: "confirmation already sent" });
    }
    if (template_name === "admin_notification" && order.admin_notified) {
      return json({ skipped: true, reason: "admin already notified" });
    }
    if (template_name === "completion" && order.completion_email_sent) {
      return json({ skipped: true, reason: "completion already sent" });
    }

    const firstName = order.contact_first_name || "Customer";
    const fullName = [order.contact_first_name, order.contact_middle_name, order.contact_last_name]
      .filter(Boolean).join(" ");
    const totalAUD = order.amount_cents ? (order.amount_cents / 100).toFixed(2) : "0.00";
    const date = new Date(order.created_at).toLocaleDateString("en-AU", {
      day: "numeric", month: "long", year: "numeric",
    });
    const servicesList = items.length > 0
      ? items.map((i) => SERVICE_LABEL[i.service_type] ?? i.service_type).join(" + ")
      : "ABN Registration";

    let subject = "";
    let html = "";
    let to = "";
    let flagField = "";

    if (template_name === "confirmation") {
      to = order.contact_email;
      subject = `Your Order Has Been Received — ${servicesList}`;
      html = confirmationTemplate({ firstName, servicesList, totalAUD, date, order, items });
      flagField = "confirmation_email_sent";
    } else if (template_name === "admin_notification") {
      to = ADMIN_EMAIL;
      subject = `New Order — ${servicesList} — ${fullName}`;
      html = adminTemplate({ fullName, servicesList, totalAUD, date, order, items });
      flagField = "admin_notified";
    } else if (template_name === "completion") {
      to = order.contact_email;
      subject = `Your ${servicesList} — Completed`;
      html = completionTemplate({ firstName, servicesList, order, items });
      flagField = "completion_email_sent";
    } else if (template_name === "abandoned_1") {
      to = order.contact_email;
      subject = `Complete Your ${servicesList} Application`;
      html = abandonedTemplate1({ firstName, servicesList, orderId: order.id });
      flagField = "";
    } else if (template_name === "abandoned_2") {
      to = order.contact_email;
      subject = `Reminder: Your ${servicesList} Request Is Pending`;
      html = abandonedTemplate2({ firstName, servicesList, orderId: order.id });
      flagField = "";
    } else if (template_name === "abandoned_3") {
      to = order.contact_email;
      subject = `Final Reminder: Complete Your ${servicesList}`;
      html = abandonedTemplate3({ firstName, servicesList, orderId: order.id });
      flagField = "";
    } else {
      return json({ error: `Unknown template: ${template_name}` }, 400);
    }

    // Send via Resend
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
    });
    const sendData = await sendRes.json();
    const success = sendRes.ok;

    // Log
    await fetch(`${supabaseUrl}/rest/v1/email_logs`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({
        order_id,
        recipient_email: to,
        template: template_name,
        status: success ? "sent" : "failed",
        provider_message_id: sendData.id ?? null,
      }),
    });

    // Update flag
    if (success && flagField) {
      await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${order_id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ [flagField]: true }),
      });
    }

    // Log in admin_activity_log
    if (success) {
      await fetch(`${supabaseUrl}/rest/v1/admin_activity_log`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify({
          order_id,
          action: "email_sent",
          details: `Template: ${template_name} → ${to}`,
        }),
      }).catch(() => {});
    }

    if (!success) {
      console.error("Resend error:", sendData);
      return json({ error: "Email sending failed", details: sendData }, 500);
    }

    return json({ success: true, email_id: sendData.id });
  } catch (err) {
    console.error(err);
    return json({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
  }
});

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderItem = {
  id: string;
  service_type: string;
  price: number;
  status: string;
  details: Record<string, unknown> | null;
  result_data: Record<string, unknown> | null;
  completed_at: string | null;
};

// ─── Templates ────────────────────────────────────────────────────────────────

function confirmationTemplate(p: {
  firstName: string; servicesList: string; totalAUD: string; date: string;
  order: Record<string, unknown>; items: OrderItem[];
}) {
  const address = [p.order.personal_address, p.order.state, p.order.postal_code].filter(Boolean).join(", ");
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:20px">
<h2 style="color:#1d4ed8">Your Application Has Been Received</h2>
<p>Dear ${p.firstName},</p>
<p>Thank you for your payment. We confirm that your request has been successfully received and is now being processed.</p>

<h3 style="margin-top:24px">SERVICES REQUESTED</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px">
${p.items.map((i) => `<tr style="border-bottom:1px solid #e5e7eb">
  <td style="padding:8px 0">${SERVICE_LABEL[i.service_type] ?? i.service_type}</td>
  <td style="padding:8px 0;text-align:right">A$${(i.price / 100).toFixed(2)}</td>
</tr>`).join("")}
<tr style="border-top:2px solid #1d4ed8;font-weight:bold">
  <td style="padding:10px 0">Total</td>
  <td style="padding:10px 0;text-align:right">A$${p.totalAUD}</td>
</tr>
</table>

<h3 style="margin-top:24px">WHAT'S NEXT</h3>
<p>Upon completion, a confirmation email will be issued to you containing the full details of your application for your records.</p>
<p>Please note that changes may take up to 48 hours to become publicly available on the ABN Lookup website.</p>

<h3 style="margin-top:24px">SUBMITTED INFORMATION</h3>
<p style="font-size:14px;line-height:1.6">
  <strong>Name:</strong> ${[p.order.contact_first_name, p.order.contact_middle_name, p.order.contact_last_name].filter(Boolean).join(" ")}<br>
  <strong>Email:</strong> ${p.order.contact_email}<br>
  <strong>Phone:</strong> ${p.order.contact_phone || "—"}<br>
  <strong>Date of Birth:</strong> ${p.order.dob || "—"}<br>
  <strong>Address:</strong> ${address || "—"}<br>
  <strong>Business Activity:</strong> ${p.order.business_activity || "—"}<br>
  <strong>Reason for Applying:</strong> ${p.order.applying_reason || "—"}<br>
  <strong>First Time Applying:</strong> ${p.order.first_time_applying ? "Yes" : "No"}
</p>

${p.items.map((i) => itemDetailsBlock(i)).join("")}

<h3 style="margin-top:24px">REGISTRATION DETAILS</h3>
<p style="font-size:14px">Terms &amp; Conditions: Accepted<br>Tax Agent Authorisation: Accepted</p>

<p>If you have any questions, contact us at <a href="mailto:info@abn-number.com">info@abn-number.com</a>.</p>
<p>Respectfully,<br><strong>ABN Registration Services</strong><br><a href="${SITE_URL}">${SITE_URL}</a></p>
</body></html>`;
}

function adminTemplate(p: {
  fullName: string; servicesList: string; totalAUD: string; date: string;
  order: Record<string, unknown>; items: OrderItem[];
}) {
  const address = [p.order.personal_address, p.order.state, p.order.postal_code].filter(Boolean).join(", ");
  const tfnDisplay = p.order.tfn_option === "now" && p.order.tfn
    ? `Provided (${String(p.order.tfn).replace(/\d(?=\d{3})/g, "*")})`
    : (p.order.tfn_option || "—");

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:20px">
<h2 style="color:#1d4ed8">New Order Received</h2>
<p>A new order has been successfully submitted and paid.</p>

<h3>ORDER SUMMARY</h3>
<p style="font-size:14px;line-height:1.8">
  <strong>Order ID:</strong> ${p.order.id}<br>
  <strong>Total Amount:</strong> A$${p.totalAUD}<br>
  <strong>Date:</strong> ${p.date}<br>
  <strong>Stripe Session:</strong> ${p.order.stripe_checkout_session_id || "—"}
</p>

<h3>SERVICES REQUESTED</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px">
${p.items.map((i) => `<tr style="border-bottom:1px solid #e5e7eb">
  <td style="padding:8px 0">${SERVICE_LABEL[i.service_type] ?? i.service_type}</td>
  <td style="padding:8px 0;text-align:right">A$${(i.price / 100).toFixed(2)}</td>
</tr>`).join("")}
<tr style="font-weight:bold;border-top:2px solid #1d4ed8">
  <td style="padding:10px 0">Total</td>
  <td style="padding:10px 0;text-align:right">A$${p.totalAUD}</td>
</tr>
</table>

<h3 style="margin-top:24px">CLIENT DETAILS</h3>
<p style="font-size:14px;line-height:1.8">
  <strong>Name:</strong> ${p.fullName}<br>
  <strong>Email:</strong> ${p.order.contact_email}<br>
  <strong>Phone:</strong> ${p.order.contact_phone || "—"}<br>
  <strong>Date of Birth:</strong> ${p.order.dob || "—"}<br>
  <strong>Address:</strong> ${address || "—"}<br>
  <strong>Country of Birth:</strong> ${p.order.country_of_birth || "—"}<br>
  <strong>State of Birth:</strong> ${p.order.state_of_birth || "—"}<br>
  <strong>City of Birth:</strong> ${p.order.city_of_birth || "—"}<br>
  <strong>Business Activity:</strong> ${p.order.business_activity || "—"}<br>
  <strong>Reason for Applying:</strong> ${p.order.applying_reason || "—"}<br>
  <strong>First Time Applying:</strong> ${p.order.first_time_applying ? "Yes" : "No"}<br>
  <strong>TFN:</strong> ${tfnDisplay}
</p>

<h3 style="margin-top:24px">SERVICE-SPECIFIC DETAILS</h3>
${p.items.map((i) => itemDetailsBlock(i)).join("")}

<h3 style="margin-top:24px">COMPLIANCE</h3>
<p style="font-size:14px">Terms Accepted: Yes<br>Tax Agent Authorisation: Yes</p>

<p style="color:#dc2626;font-weight:bold">Please proceed with processing this request.</p>
</body></html>`;
}

function completionTemplate(p: {
  firstName: string; servicesList: string;
  order: Record<string, unknown>; items: OrderItem[];
}) {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:20px">
<h2 style="color:#16a34a">Your Registration Is Complete</h2>
<p>Dear ${p.firstName},</p>
<p>We are pleased to confirm that your request has been successfully completed.</p>

${p.items.map((i) => {
  const result = i.result_data as Record<string, unknown> | null ?? {};
  const label = SERVICE_LABEL[i.service_type] ?? i.service_type;
  let resultHtml = "";

  if (i.service_type === "abn_registration" || i.service_type === "abn_update") {
    const abn = result.abn ?? (p.order.abn as string | null);
    if (abn) resultHtml = `<p><strong>Your ABN:</strong> ${abn}</p>`;
  } else if (i.service_type === "gst_registration") {
    if (result.gst_start_date) resultHtml = `<p><strong>GST active from:</strong> ${result.gst_start_date}</p>`;
  } else if (i.service_type === "business_name_registration" || i.service_type === "business_name_registration_1yr" || i.service_type === "business_name_registration_3yr") {
    if (result.business_name) resultHtml = `<p><strong>Registered business name:</strong> ${result.business_name}</p>`;
  } else if (i.service_type.includes("cancellation")) {
    if (result.cancellation_date) resultHtml = `<p><strong>Effective date:</strong> ${result.cancellation_date}</p>`;
    else resultHtml = `<p>Your ${label} has been successfully processed.</p>`;
  }

  return `<div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:12px 0">
  <h3 style="margin:0 0 8px;color:#1d4ed8">${label}</h3>
  ${resultHtml || "<p>Successfully completed.</p>"}
  ${result.notes ? `<p><em>Note: ${result.notes}</em></p>` : ""}
</div>`;
}).join("")}

<p>You can verify your details on the ABN Lookup website:<br>
<a href="https://abr.business.gov.au/">https://abr.business.gov.au/</a></p>

<p>If you have any questions, contact us at <a href="mailto:info@abn-number.com">info@abn-number.com</a>.</p>
<p>Respectfully,<br><strong>ABN Registration Services</strong><br><a href="${SITE_URL}">${SITE_URL}</a></p>
</body></html>`;
}

function abandonedTemplate1(p: { firstName: string; servicesList: string; orderId: string }) {
  const link = `${SITE_URL}/apply?resume=${p.orderId}`;
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:20px">
<h2 style="color:#1d4ed8">Complete Your Application</h2>
<p>Dear ${p.firstName},</p>
<p>Your application is still pending — payment has not yet been completed.</p>
<p><strong>Services selected:</strong> ${p.servicesList}</p>
<p>If you experienced any difficulties or need more time, you can resume your application using the link below:</p>
<p><a href="${link}" style="background:#1d4ed8;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin:8px 0">→ Resume My Application</a></p>
<p>If you have any questions, contact us at <a href="mailto:info@abn-number.com">info@abn-number.com</a>.</p>
<p>Kind regards,<br><strong>ABN Registration Services</strong><br><a href="${SITE_URL}">${SITE_URL}</a></p>
</body></html>`;
}

function abandonedTemplate2(p: { firstName: string; servicesList: string; orderId: string }) {
  const link = `${SITE_URL}/apply?resume=${p.orderId}`;
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:20px">
<h2 style="color:#1d4ed8">Reminder: Your Request Is Still Pending</h2>
<p>Dear ${p.firstName},</p>
<p>Your application is still pending.</p>
<p><strong>Services selected:</strong> ${p.servicesList}</p>
<p>To ensure your request is processed without delay, please finalise your application:</p>
<p><a href="${link}" style="background:#1d4ed8;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin:8px 0">→ Complete My Application</a></p>
<p>Once payment is confirmed, your request will be submitted and handled by a registered tax agent.</p>
<p>Kind regards,<br><strong>ABN Registration Services</strong><br><a href="${SITE_URL}">${SITE_URL}</a></p>
</body></html>`;
}

function abandonedTemplate3(p: { firstName: string; servicesList: string; orderId: string }) {
  const link = `${SITE_URL}/apply?resume=${p.orderId}`;
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:20px">
<h2 style="color:#dc2626">Final Reminder: Complete Your Application</h2>
<p>Dear ${p.firstName},</p>
<p>Your application has not yet been completed. This is a final reminder.</p>
<p><strong>Services selected:</strong> ${p.servicesList}</p>
<p><a href="${link}" style="background:#dc2626;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin:8px 0">→ Complete My Application</a></p>
<p>If you no longer wish to proceed, no further action is required.</p>
<p>Kind regards,<br><strong>ABN Registration Services</strong><br><a href="${SITE_URL}">${SITE_URL}</a></p>
</body></html>`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function itemDetailsBlock(item: OrderItem): string {
  const d = item.details as Record<string, unknown> | null ?? {};
  const label = SERVICE_LABEL[item.service_type] ?? item.service_type;
  const rows = Object.entries(d)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td style="padding:4px 8px 4px 0;font-weight:bold;min-width:160px">${humanKey(k)}:</td><td style="padding:4px 0">${Array.isArray(v) ? v.join(", ") : String(v)}</td></tr>`)
    .join("");

  if (!rows) return "";
  return `<div style="border-left:3px solid #1d4ed8;padding-left:12px;margin:12px 0">
  <strong>${label}</strong>
  <table style="font-size:13px;margin-top:6px;width:100%">${rows}</table>
</div>`;
}

function humanKey(k: string): string {
  const map: Record<string, string> = {
    abn_purpose: "ABN Purpose", abn_start_date: "ABN Start Date", previous_abn: "Previous ABN",
    business_activity: "Business Activity", personal_address: "Address", applying_reason: "Reason",
    gst_start_date: "GST Start Date", annual_turnover: "Annual Turnover",
    lodge_frequency: "Lodge Frequency", result_timing: "Result Timing", import_goods: "Import Goods",
    option: "Option", new_name: "New Name", existing_name: "Existing Name",
    registration_period: "Registration Period", abn_to_cancel: "ABN to Cancel",
    reason: "Reason", cancellation_date: "Cancellation Date", abn: "ABN",
    business_name: "Business Name", abn_to_update: "ABN to Update",
    fields_to_update: "Fields to Update", new_address: "New Address",
    new_phone: "New Phone", new_email: "New Email", new_business_activity: "New Activity",
  };
  return map[k] ?? k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

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
