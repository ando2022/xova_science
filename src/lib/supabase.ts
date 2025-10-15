import { createClient } from '@supabase/supabase-js';

// ⚠️ REPLACE THESE WITH YOUR SUPABASE PROJECT CREDENTIALS
// Get these from: Supabase Dashboard → Settings → API
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

// Check if credentials are configured
const isConfigured = 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
  supabaseUrl.includes('supabase.co');

// Use dummy values if not configured to prevent initialization errors
const safeUrl = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const safeKey = isConfigured ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NjU0MzIsImV4cCI6MjAxNDM0MTQzMn0.xxxxxx';

export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    autoRefreshToken: isConfigured,
    persistSession: isConfigured,
    detectSessionInUrl: isConfigured
  }
});

// Export config status for app to check
export const isSupabaseConfigured = isConfigured;

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      smoothies: {
        Row: SmoothieRow;
        Insert: SmoothieInsert;
        Update: SmoothieUpdate;
      };
      check_ins: {
        Row: CheckInRow;
        Insert: CheckInInsert;
        Update: CheckInUpdate;
      };
      favorites: {
        Row: FavoriteRow;
        Insert: FavoriteInsert;
        Update: FavoriteUpdate;
      };
      delivery_orders: {
        Row: DeliveryOrderRow;
        Insert: DeliveryOrderInsert;
        Update: DeliveryOrderUpdate;
      };
      analytics_events: {
        Row: AnalyticsEventRow;
        Insert: AnalyticsEventInsert;
        Update: AnalyticsEventUpdate;
      };
    };
  };
}

export interface ProfileRow {
  id: string;
  user_id: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activity_level: string;
  dietary_restrictions: string[];
  health_goals: string[];
  allergies: string[];
  flavor_preferences: string[];
  created_at: string;
  updated_at: string;
}

export interface ProfileInsert extends Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'> {}
export interface ProfileUpdate extends Partial<ProfileInsert> {}

export interface SmoothieRow {
  id: string;
  user_id: string;
  name: string;
  ingredients: any; // JSON
  proportions: any; // JSON
  instructions: string[];
  macros: any; // JSON
  scientific_explanation: any; // JSON
  health_score: number;
  created_at: string;
}

export interface SmoothieInsert extends Omit<SmoothieRow, 'id' | 'created_at'> {}
export interface SmoothieUpdate extends Partial<SmoothieInsert> {}

export interface CheckInRow {
  id: string;
  user_id: string;
  date: string;
  energy_level: number;
  stress_level: number;
  sleep_quality: number;
  exercise: boolean;
  notes: string | null;
  created_at: string;
}

export interface CheckInInsert extends Omit<CheckInRow, 'id' | 'created_at'> {}
export interface CheckInUpdate extends Partial<CheckInInsert> {}

export interface FavoriteRow {
  id: string;
  user_id: string;
  smoothie_id: string;
  created_at: string;
}

export interface FavoriteInsert extends Omit<FavoriteRow, 'id' | 'created_at'> {}
export interface FavoriteUpdate extends Partial<FavoriteInsert> {}

export interface DeliveryOrderRow {
  id: string;
  user_id: string;
  order_date: string;
  delivery_date: string;
  smoothies: any; // JSON - array of smoothie data
  total_cost: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  created_at: string;
  updated_at: string;
}

export interface DeliveryOrderInsert extends Omit<DeliveryOrderRow, 'id' | 'created_at' | 'updated_at'> {}
export interface DeliveryOrderUpdate extends Partial<DeliveryOrderInsert> {}

export interface AnalyticsEventRow {
  id: string;
  user_id: string | null;
  event_type: string;
  event_data: any; // JSON
  created_at: string;
}

export interface AnalyticsEventInsert extends Omit<AnalyticsEventRow, 'id' | 'created_at'> {}
export interface AnalyticsEventUpdate extends Partial<AnalyticsEventInsert> {}
