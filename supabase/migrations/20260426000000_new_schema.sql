-- orders: main application record
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',

  -- Contact
  contact_first_name TEXT NOT NULL,
  contact_middle_name TEXT,
  contact_last_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,

  -- Personal details
  dob DATE,
  tfn_option TEXT,
  abn_purpose TEXT,
  abn_start_date DATE,
  previous_abn TEXT,
  business_activity TEXT,
  personal_address TEXT,
  applying_reason TEXT,

  -- Business name
  trade_under_business_name TEXT,
  business_name_option TEXT,
  new_business_name TEXT,
  existing_business_name TEXT,
  registration_period TEXT,

  -- Birth details
  country_of_birth TEXT,
  state_of_birth TEXT,
  city_of_birth TEXT,

  -- GST
  register_for_gst TEXT,
  annual_turnover TEXT,
  gst_lodge_frequency TEXT,
  gst_result_timing TEXT,
  import_goods TEXT,
  gst_start_date DATE,

  -- Accounting tasks
  accounting_tasks TEXT[],

  -- Confirmations
  accept_terms BOOLEAN NOT NULL DEFAULT false,
  authorise_tax_agent BOOLEAN NOT NULL DEFAULT false,
  confirm_true_info BOOLEAN NOT NULL DEFAULT false,
  authorise_asic_agent BOOLEAN NOT NULL DEFAULT false,

  -- ABN lookup result (populated from ABR API)
  abn TEXT,
  business_name TEXT,
  business_address TEXT,
  business_state TEXT,
  entity_type TEXT,
  abn_status TEXT,

  -- Payment
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  amount_cents INTEGER,
  currency TEXT NOT NULL DEFAULT 'aud',
  paid_at TIMESTAMPTZ
);

-- abn_lookups: history of ABN lookups via ABR API
CREATE TABLE public.abn_lookups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  looked_up_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  abn TEXT NOT NULL,
  raw_response JSONB,
  business_name TEXT,
  entity_type TEXT,
  abn_status TEXT,
  state TEXT
);

-- email_logs: record of emails sent per order
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  template TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  provider_message_id TEXT
);

-- webhook_events: log of Stripe webhook events (idempotency)
CREATE TABLE public.webhook_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT false,
  payload JSONB NOT NULL
);

-- RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abn_lookups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Anonymous users can create and read back their own order (needed for .insert().select())
CREATE POLICY "anon_insert_orders"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "anon_select_orders"
  ON public.orders FOR SELECT
  TO anon, authenticated
  USING (true);

-- All other mutations go through Edge Functions using the service role key,
-- which bypasses RLS. No additional policies are needed.

-- updated_at auto-update
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_orders_email ON public.orders(contact_email);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_stripe_session ON public.orders(stripe_checkout_session_id);
CREATE INDEX idx_abn_lookups_abn ON public.abn_lookups(abn);
CREATE INDEX idx_email_logs_order_id ON public.email_logs(order_id);
CREATE INDEX idx_webhook_events_stripe_id ON public.webhook_events(stripe_event_id);
