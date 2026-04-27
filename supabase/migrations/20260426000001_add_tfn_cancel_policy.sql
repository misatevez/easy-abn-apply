-- Add TFN field to orders
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tfn TEXT;

-- Allow anonymous users to cancel their own order (only from payment_processing → cancelled)
CREATE POLICY "anon_cancel_orders"
  ON public.orders FOR UPDATE
  TO anon, authenticated
  USING (status = 'payment_processing')
  WITH CHECK (status = 'cancelled');
