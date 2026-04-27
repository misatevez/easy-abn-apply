-- Allow authenticated users (admins) to update orders
CREATE POLICY "auth_update_orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read email_logs
CREATE POLICY "auth_select_email_logs"
  ON public.email_logs FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to read webhook_events
CREATE POLICY "auth_select_webhook_events"
  ON public.webhook_events FOR SELECT
  TO authenticated
  USING (true);
