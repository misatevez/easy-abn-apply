-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'pending',
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  dob DATE NOT NULL,
  tax_file_number TEXT,
  business_activity TEXT,
  address TEXT,
  state TEXT,
  postal_code TEXT,
  reason_for_applying TEXT,
  first_time_applying BOOLEAN,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  agent_authorisation_accepted BOOLEAN NOT NULL DEFAULT false,
  stripe_session_id TEXT,
  stripe_payment_status TEXT DEFAULT 'unpaid',
  payment_amount NUMERIC,
  completed_at TIMESTAMPTZ,
  confirmation_email_sent BOOLEAN DEFAULT false,
  completion_email_sent BOOLEAN DEFAULT false,
  admin_notified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  price NUMERIC NOT NULL,
  existing_abn TEXT,
  gst_start_date DATE,
  proposed_business_name TEXT,
  registration_period TEXT,
  fields_to_update TEXT,
  result_abn TEXT,
  result_gst_start_date DATE,
  result_business_name TEXT,
  result_cancellation_date DATE,
  result_notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create abandoned_carts table
CREATE TABLE public.abandoned_carts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  services TEXT,
  reminder_1_sent BOOLEAN DEFAULT false,
  reminder_1_sent_at TIMESTAMPTZ,
  reminder_2_sent BOOLEAN DEFAULT false,
  reminder_2_sent_at TIMESTAMPTZ,
  reminder_3_sent BOOLEAN DEFAULT false,
  reminder_3_sent_at TIMESTAMPTZ,
  recovered BOOLEAN DEFAULT false,
  consent_given BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create admin_activity_log table
CREATE TABLE public.admin_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Anyone can create orders"
ON public.orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can view orders"
ON public.orders FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can update orders"
ON public.orders FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete orders"
ON public.orders FOR DELETE
TO authenticated
USING (true);

-- Order items policies
CREATE POLICY "Anyone can create order items"
ON public.order_items FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can view order items"
ON public.order_items FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can update order items"
ON public.order_items FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete order items"
ON public.order_items FOR DELETE
TO authenticated
USING (true);

-- Abandoned carts policies (no public access)
CREATE POLICY "Authenticated can view abandoned carts"
ON public.abandoned_carts FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can update abandoned carts"
ON public.abandoned_carts FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete abandoned carts"
ON public.abandoned_carts FOR DELETE
TO authenticated
USING (true);

-- Admin activity log policies (read-only for authenticated; inserts via service role bypass RLS)
CREATE POLICY "Authenticated can view admin activity log"
ON public.admin_activity_log FOR SELECT
TO authenticated
USING (true);

-- Updated_at trigger function
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

-- Trigger on orders
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for common lookups
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_orders_email ON public.orders(email);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_abandoned_carts_email ON public.abandoned_carts(email);
CREATE INDEX idx_admin_activity_log_order_id ON public.admin_activity_log(order_id);