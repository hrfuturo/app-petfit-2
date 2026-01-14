import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      pets: {
        Row: {
          id: string
          user_id: string
          name: string
          species: 'dog' | 'cat'
          breed: string
          age: number
          size: 'small' | 'medium' | 'large'
          weight: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['pets']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['pets']['Insert']>
      }
      weight_records: {
        Row: {
          id: string
          pet_id: string
          weight: number
          date: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['weight_records']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['weight_records']['Insert']>
      }
      vaccines: {
        Row: {
          id: string
          pet_id: string
          name: string
          date: string
          next_date: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['vaccines']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['vaccines']['Insert']>
      }
      health_events: {
        Row: {
          id: string
          pet_id: string
          type: 'deworming' | 'flea_treatment' | 'appointment' | 'grooming'
          description: string
          date: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['health_events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['health_events']['Insert']>
      }
      diary_entries: {
        Row: {
          id: string
          pet_id: string
          title: string
          content: string
          type: 'behavior' | 'symptom' | 'note'
          date: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['diary_entries']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['diary_entries']['Insert']>
      }
    }
  }
}
