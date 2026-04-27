import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];

export interface LineItem {
  name: string;
  amount_cents: number;
}

function toDate(day: string, month: string, year: string): string | null {
  if (!day || !month || !year) return null;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function str(val: unknown): string | null {
  if (!val) return null;
  const s = String(val).trim();
  return s || null;
}

export function buildLineItems(service: string, formData: Record<string, unknown>): LineItem[] {
  const items: LineItem[] = [];

  switch (service) {
    case "ABN Registration":
      items.push({ name: "ABN Registration", amount_cents: 6900 });
      if (formData.registerForGST === "yes")
        items.push({ name: "GST Registration", amount_cents: 7900 });
      if (formData.tradeUnderBusinessName === "yes") {
        if (formData.registrationPeriod === "3years")
          items.push({ name: "Business Name Registration (3 years)", amount_cents: 19900 });
        else
          items.push({ name: "Business Name Registration (1 year)", amount_cents: 11900 });
      }
      break;

    case "Business Name Registration":
      if (formData.registrationPeriod === "3years")
        items.push({ name: "Business Name Registration (3 years)", amount_cents: 19900 });
      else
        items.push({ name: "Business Name Registration (1 year)", amount_cents: 11900 });
      if (formData.registerForGST === "yes")
        items.push({ name: "GST Registration", amount_cents: 7900 });
      break;

    case "ABN/GST/Business Name Cancellation":
      items.push({ name: "ABN/GST/Business Name Cancellation", amount_cents: 6900 });
      break;

    case "GST Cancellation":
      items.push({ name: "GST Cancellation", amount_cents: 6900 });
      break;

    case "Business Name Cancellation":
      items.push({ name: "Business Name Cancellation", amount_cents: 6900 });
      break;

    case "Update ABN Details":
      items.push({ name: "Update ABN Details", amount_cents: 6900 });
      break;

    default:
      items.push({ name: service, amount_cents: 6900 });
  }

  return items;
}

export async function createOrderFromLovable(
  service: string,
  formData: Record<string, unknown>
) {
  const lineItems = buildLineItems(service, formData);
  const amountCents = lineItems.reduce((sum, item) => sum + item.amount_cents, 0);

  const insert: OrderInsert = {
    status: "pending",
    contact_first_name: String(formData.firstName || ""),
    contact_middle_name: str(formData.middleName),
    contact_last_name: String(formData.lastName || ""),
    contact_email: String(formData.email || ""),
    contact_phone: str(formData.phone),
    dob: toDate(
      String(formData.dobDay || ""),
      String(formData.dobMonth || ""),
      String(formData.dobYear || "")
    ),
    tfn_option: str(formData.tfnOption),
    tfn:
      formData.tfnOption === "now" && formData.tfn
        ? String(formData.tfn).replace(/\s/g, "")
        : null,
    accept_terms: Boolean(formData.acceptTerms),
    authorise_tax_agent: Boolean(formData.authoriseTaxAgent),
    confirm_true_info: Boolean(formData.confirmTrueInfo),
    authorise_asic_agent: Boolean(formData.authoriseASICAgent ?? false),
    amount_cents: amountCents,
    currency: "aud",
  };

  // ABN Registration
  if (service === "ABN Registration") {
    insert.abn_purpose = str(formData.abnPurpose);
    insert.abn_start_date = toDate(
      String(formData.abnStartDay || ""),
      String(formData.abnStartMonth || ""),
      String(formData.abnStartYear || "")
    );
    insert.previous_abn = str(formData.previousABN);
    insert.business_activity = str(formData.businessActivity);
    insert.personal_address = str(formData.personalAddress);
    insert.applying_reason = str(formData.applyingReason);
    insert.country_of_birth = str(formData.countryOfBirth);
    insert.state_of_birth = str(formData.stateOfBirth);
    insert.city_of_birth = str(formData.cityOfBirth);
    insert.trade_under_business_name = str(formData.tradeUnderBusinessName);
    insert.business_name_option = str(formData.businessNameOption);
    insert.new_business_name = str(formData.newBusinessName);
    insert.existing_business_name = str(formData.existingBusinessName);
    insert.registration_period = str(formData.registrationPeriod);
    insert.register_for_gst = str(formData.registerForGST);
    insert.annual_turnover = str(formData.annualTurnover);
    insert.gst_lodge_frequency = str(formData.gstLodgeFrequency);
    insert.gst_result_timing = str(formData.gstResultTiming);
    insert.import_goods = str(formData.importGoods);
    insert.gst_start_date = toDate(
      String(formData.gstStartDay || ""),
      String(formData.gstStartMonth || ""),
      String(formData.gstStartYear || "")
    );
    insert.accounting_tasks = Array.isArray(formData.accountingTasks)
      ? (formData.accountingTasks as string[])
      : null;
  }

  // Business Name Registration
  if (service === "Business Name Registration") {
    insert.business_name_option = str(formData.businessNameOption);
    insert.new_business_name = str(formData.newBusinessName);
    insert.existing_business_name = str(formData.existingBusinessName);
    insert.registration_period = str(formData.registrationPeriod);
    insert.personal_address = str(formData.personalAddress);
    insert.country_of_birth = str(formData.countryOfBirth);
    insert.state_of_birth = str(formData.stateOfBirth);
    insert.city_of_birth = str(formData.cityOfBirth);
    insert.register_for_gst = str(formData.registerForGST);
    insert.annual_turnover = str(formData.annualTurnover);
    insert.gst_lodge_frequency = str(formData.gstLodgeFrequency);
    insert.gst_result_timing = str(formData.gstResultTiming);
    insert.import_goods = str(formData.importGoods);
    insert.gst_start_date = toDate(
      String(formData.gstStartDay || ""),
      String(formData.gstStartMonth || ""),
      String(formData.gstStartYear || "")
    );
    insert.accounting_tasks = Array.isArray(formData.accountingTasks)
      ? (formData.accountingTasks as string[])
      : null;
  }

  // Cancellations & Update — store the ABN being acted on
  if (
    service === "ABN/GST/Business Name Cancellation" ||
    service === "GST Cancellation" ||
    service === "Business Name Cancellation" ||
    service === "Update ABN Details"
  ) {
    insert.abn = str(formData.abn);
  }

  const { data, error } = await supabase
    .from("orders")
    .insert(insert)
    .select("id, contact_email, contact_first_name, contact_last_name, amount_cents")
    .single();

  if (error) throw new Error(error.message);

  // Create order_items for each line item
  const items = lineItems.map((item) => ({
    order_id: data.id,
    service_type: item.name,
    price: item.amount_cents,
    details: formData,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(items);
  if (itemsError) console.error("order_items insert failed:", itemsError.message);

  return data;
}
