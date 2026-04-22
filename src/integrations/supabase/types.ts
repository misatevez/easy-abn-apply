export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      abandoned_carts: {
        Row: {
          consent_given: boolean | null
          consent_timestamp: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          order_id: string | null
          recovered: boolean | null
          reminder_1_sent: boolean | null
          reminder_1_sent_at: string | null
          reminder_2_sent: boolean | null
          reminder_2_sent_at: string | null
          reminder_3_sent: boolean | null
          reminder_3_sent_at: string | null
          services: string | null
        }
        Insert: {
          consent_given?: boolean | null
          consent_timestamp?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          order_id?: string | null
          recovered?: boolean | null
          reminder_1_sent?: boolean | null
          reminder_1_sent_at?: string | null
          reminder_2_sent?: boolean | null
          reminder_2_sent_at?: string | null
          reminder_3_sent?: boolean | null
          reminder_3_sent_at?: string | null
          services?: string | null
        }
        Update: {
          consent_given?: boolean | null
          consent_timestamp?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          order_id?: string | null
          recovered?: boolean | null
          reminder_1_sent?: boolean | null
          reminder_1_sent_at?: string | null
          reminder_2_sent?: boolean | null
          reminder_2_sent_at?: string | null
          reminder_3_sent?: boolean | null
          reminder_3_sent_at?: string | null
          services?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "abandoned_carts_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_activity_log: {
        Row: {
          action: string
          created_at: string
          details: string | null
          id: string
          order_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: string | null
          id?: string
          order_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: string | null
          id?: string
          order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_log_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          completed_at: string | null
          created_at: string
          existing_abn: string | null
          fields_to_update: string | null
          gst_start_date: string | null
          id: string
          order_id: string
          price: number
          proposed_business_name: string | null
          registration_period: string | null
          result_abn: string | null
          result_business_name: string | null
          result_cancellation_date: string | null
          result_gst_start_date: string | null
          result_notes: string | null
          service_type: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          existing_abn?: string | null
          fields_to_update?: string | null
          gst_start_date?: string | null
          id?: string
          order_id: string
          price: number
          proposed_business_name?: string | null
          registration_period?: string | null
          result_abn?: string | null
          result_business_name?: string | null
          result_cancellation_date?: string | null
          result_gst_start_date?: string | null
          result_notes?: string | null
          service_type: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          existing_abn?: string | null
          fields_to_update?: string | null
          gst_start_date?: string | null
          id?: string
          order_id?: string
          price?: number
          proposed_business_name?: string | null
          registration_period?: string | null
          result_abn?: string | null
          result_business_name?: string | null
          result_cancellation_date?: string | null
          result_gst_start_date?: string | null
          result_notes?: string | null
          service_type?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address: string | null
          admin_notified: boolean | null
          agent_authorisation_accepted: boolean
          business_activity: string | null
          completed_at: string | null
          completion_email_sent: boolean | null
          confirmation_email_sent: boolean | null
          created_at: string
          dob: string
          email: string
          first_name: string
          first_time_applying: boolean | null
          id: string
          last_name: string
          middle_name: string | null
          payment_amount: number | null
          phone: string | null
          postal_code: string | null
          reason_for_applying: string | null
          state: string | null
          status: string
          stripe_payment_status: string | null
          stripe_session_id: string | null
          tax_file_number: string | null
          terms_accepted: boolean
          updated_at: string
        }
        Insert: {
          address?: string | null
          admin_notified?: boolean | null
          agent_authorisation_accepted?: boolean
          business_activity?: string | null
          completed_at?: string | null
          completion_email_sent?: boolean | null
          confirmation_email_sent?: boolean | null
          created_at?: string
          dob: string
          email: string
          first_name: string
          first_time_applying?: boolean | null
          id?: string
          last_name: string
          middle_name?: string | null
          payment_amount?: number | null
          phone?: string | null
          postal_code?: string | null
          reason_for_applying?: string | null
          state?: string | null
          status?: string
          stripe_payment_status?: string | null
          stripe_session_id?: string | null
          tax_file_number?: string | null
          terms_accepted?: boolean
          updated_at?: string
        }
        Update: {
          address?: string | null
          admin_notified?: boolean | null
          agent_authorisation_accepted?: boolean
          business_activity?: string | null
          completed_at?: string | null
          completion_email_sent?: boolean | null
          confirmation_email_sent?: boolean | null
          created_at?: string
          dob?: string
          email?: string
          first_name?: string
          first_time_applying?: boolean | null
          id?: string
          last_name?: string
          middle_name?: string | null
          payment_amount?: number | null
          phone?: string | null
          postal_code?: string | null
          reason_for_applying?: string | null
          state?: string | null
          status?: string
          stripe_payment_status?: string | null
          stripe_session_id?: string | null
          tax_file_number?: string | null
          terms_accepted?: boolean
          updated_at?: string
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
