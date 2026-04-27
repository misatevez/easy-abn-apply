-- Add missing columns to orders
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS postal_code TEXT,
  ADD COLUMN IF NOT EXISTS first_time_applying BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- updated_at auto-trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- abandoned_carts table
CREATE TABLE IF NOT EXISTS public.abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='abandoned_carts' AND policyname='anon_insert_abandoned_carts') THEN
    CREATE POLICY "anon_insert_abandoned_carts" ON public.abandoned_carts FOR INSERT TO anon WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='abandoned_carts' AND policyname='auth_all_abandoned_carts') THEN
    CREATE POLICY "auth_all_abandoned_carts" ON public.abandoned_carts FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- admin_activity_log table
CREATE TABLE IF NOT EXISTS public.admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details TEXT,
  performed_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='admin_activity_log' AND policyname='auth_select_activity_log') THEN
    CREATE POLICY "auth_select_activity_log" ON public.admin_activity_log FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='admin_activity_log' AND policyname='auth_insert_activity_log') THEN
    CREATE POLICY "auth_insert_activity_log" ON public.admin_activity_log FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='admin_activity_log' AND policyname='service_insert_activity_log') THEN
    CREATE POLICY "service_insert_activity_log" ON public.admin_activity_log FOR INSERT TO service_role WITH CHECK (true);
  END IF;
END $$;

-- Enable pg_cron extension for abandoned cart scheduler
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
