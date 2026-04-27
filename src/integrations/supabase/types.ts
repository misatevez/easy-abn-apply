export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          status: string
          contact_first_name: string
          contact_middle_name: string | null
          contact_last_name: string
          contact_email: string
          contact_phone: string | null
          dob: string | null
          tfn_option: string | null
          tfn: string | null
          abn_purpose: string | null
          abn_start_date: string | null
          previous_abn: string | null
          business_activity: string | null
          personal_address: string | null
          applying_reason: string | null
          trade_under_business_name: string | null
          business_name_option: string | null
          new_business_name: string | null
          existing_business_name: string | null
          registration_period: string | null
          country_of_birth: string | null
          state_of_birth: string | null
          city_of_birth: string | null
          register_for_gst: string | null
          annual_turnover: string | null
          gst_lodge_frequency: string | null
          gst_result_timing: string | null
          import_goods: string | null
          gst_start_date: string | null
          accounting_tasks: string[] | null
          accept_terms: boolean
          authorise_tax_agent: boolean
          confirm_true_info: boolean
          authorise_asic_agent: boolean
          abn: string | null
          business_name: string | null
          business_address: string | null
          business_state: string | null
          entity_type: string | null
          abn_status: string | null
          stripe_payment_intent_id: string | null
          stripe_checkout_session_id: string | null
          amount_cents: number | null
          currency: string
          paid_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: string
          contact_first_name: string
          contact_middle_name?: string | null
          contact_last_name: string
          contact_email: string
          contact_phone?: string | null
          dob?: string | null
          tfn_option?: string | null
          tfn?: string | null
          abn_purpose?: string | null
          abn_start_date?: string | null
          previous_abn?: string | null
          business_activity?: string | null
          personal_address?: string | null
          applying_reason?: string | null
          trade_under_business_name?: string | null
          business_name_option?: string | null
          new_business_name?: string | null
          existing_business_name?: string | null
          registration_period?: string | null
          country_of_birth?: string | null
          state_of_birth?: string | null
          city_of_birth?: string | null
          register_for_gst?: string | null
          annual_turnover?: string | null
          gst_lodge_frequency?: string | null
          gst_result_timing?: string | null
          import_goods?: string | null
          gst_start_date?: string | null
          accounting_tasks?: string[] | null
          accept_terms?: boolean
          authorise_tax_agent?: boolean
          confirm_true_info?: boolean
          authorise_asic_agent?: boolean
          abn?: string | null
          business_name?: string | null
          business_address?: string | null
          business_state?: string | null
          entity_type?: string | null
          abn_status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_checkout_session_id?: string | null
          amount_cents?: number | null
          currency?: string
          paid_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: string
          contact_first_name?: string
          contact_middle_name?: string | null
          contact_last_name?: string
          contact_email?: string
          contact_phone?: string | null
          dob?: string | null
          tfn_option?: string | null
          tfn?: string | null
          abn_purpose?: string | null
          abn_start_date?: string | null
          previous_abn?: string | null
          business_activity?: string | null
          personal_address?: string | null
          applying_reason?: string | null
          trade_under_business_name?: string | null
          business_name_option?: string | null
          new_business_name?: string | null
          existing_business_name?: string | null
          registration_period?: string | null
          country_of_birth?: string | null
          state_of_birth?: string | null
          city_of_birth?: string | null
          register_for_gst?: string | null
          annual_turnover?: string | null
          gst_lodge_frequency?: string | null
          gst_result_timing?: string | null
          import_goods?: string | null
          gst_start_date?: string | null
          accounting_tasks?: string[] | null
          accept_terms?: boolean
          authorise_tax_agent?: boolean
          confirm_true_info?: boolean
          authorise_asic_agent?: boolean
          abn?: string | null
          business_name?: string | null
          business_address?: string | null
          business_state?: string | null
          entity_type?: string | null
          abn_status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_checkout_session_id?: string | null
          amount_cents?: number | null
          currency?: string
          paid_at?: string | null
        }
        Relationships: []
      }
      abn_lookups: {
        Row: {
          id: string
          looked_up_at: string
          abn: string
          raw_response: Json | null
          business_name: string | null
          entity_type: string | null
          abn_status: string | null
          state: string | null
        }
        Insert: {
          id?: string
          looked_up_at?: string
          abn: string
          raw_response?: Json | null
          business_name?: string | null
          entity_type?: string | null
          abn_status?: string | null
          state?: string | null
        }
        Update: {
          id?: string
          looked_up_at?: string
          abn?: string
          raw_response?: Json | null
          business_name?: string | null
          entity_type?: string | null
          abn_status?: string | null
          state?: string | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          id: string
          sent_at: string
          order_id: string | null
          recipient_email: string
          template: string
          status: string
          provider_message_id: string | null
        }
        Insert: {
          id?: string
          sent_at?: string
          order_id?: string | null
          recipient_email: string
          template: string
          status?: string
          provider_message_id?: string | null
        }
        Update: {
          id?: string
          sent_at?: string
          order_id?: string | null
          recipient_email?: string
          template?: string
          status?: string
          provider_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      webhook_events: {
        Row: {
          id: string
          received_at: string
          stripe_event_id: string
          event_type: string
          processed: boolean
          payload: Json
        }
        Insert: {
          id?: string
          received_at?: string
          stripe_event_id: string
          event_type: string
          processed?: boolean
          payload: Json
        }
        Update: {
          id?: string
          received_at?: string
          stripe_event_id?: string
          event_type?: string
          processed?: boolean
          payload?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
