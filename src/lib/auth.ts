// Supabase authentication system with magic links

import { supabase } from './supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  profile?: UserProfile;
  favoriteSmoothies?: string[]; // Array of smoothie IDs
  deliveryHistory?: DeliveryOrder[];
  dailyCheckins?: DailyCheckin[];
}

export interface DailyCheckin {
  date: string;
  energy: number; // 1-10
  mood: number; // 1-10
  appetite: number; // 1-10
  sleep: number; // 1-10
}

export interface DeliveryOrder {
  id: string;
  orderDate: string;
  deliveryDate: string;
  smoothies: {
    smoothieId: string;
    smoothieName: string;
    dayOfWeek: string;
    timeOfDay: 'morning' | 'afternoon' | 'evening';
  }[];
  status: 'pending' | 'preparing' | 'shipped' | 'delivered';
  packagingBreakdown: {
    freshIngredients: string[];
    dryIngredients: string[];
  };
}

export interface UserProfile {
  // Basic Info
  age: number;
  gender: string;
  height: number; // cm
  weight: number; // kg
  
  // Health Goals
  healthGoals: string[];
  
  // Dietary Restrictions
  dietaryRestrictions: string[];
  
  // Allergens
  allergens: string[];
  
  // Flavor Preferences
  flavorPreferences: string[];
  
  // Lifestyle
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very-active' | 'athlete';
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  stressLevel: 'low' | 'moderate' | 'high';
  
  // Delivery Preferences (for weekly pack)
  deliveryPreferences?: {
    baselinePreferences: string[];
    allowAIVariations: boolean;
    preferredDeliveryDay: string;
    specialInstructions: string;
  };
}

// Send magic link to email
export async function sendMagicLink(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to send magic link' };
  }
}

// Sign up with email/password (keeping for compatibility)
export async function signup(email: string, password: string, name: string): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        name: name,
        createdAt: data.user.created_at
      };
      return { success: true, user };
    }

    return { success: false, error: 'Signup failed' };
  } catch (error) {
    return { success: false, error: 'Signup failed' };
  }
}

// Login with email/password
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      // Fetch profile
      const profile = await getUserProfile();
      
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name || email.split('@')[0],
        createdAt: data.user.created_at,
        profile: profile || undefined
      };
      return { success: true, user };
    }

    return { success: false, error: 'Login failed' };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
}

// Logout
export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    
    if (!supabaseUser) return null;

    // Fetch profile
    const profile = await getUserProfile();

    const user: User = {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name: supabaseUser.user_metadata?.name || supabaseUser.email!.split('@')[0],
      createdAt: supabaseUser.created_at,
      profile: profile || undefined
    };

    return user;
  } catch (error) {
    return null;
  }
}

// Get current user synchronously (for initial render)
export function getCurrentUserSync(): User | null {
  // This is a fallback for synchronous calls
  // In production, you should handle this with React state/context
  const session = supabase.auth.getSession();
  return null; // Will be populated by async getCurrentUser
}

// Update user profile
export async function updateUserProfile(profile: UserProfile): Promise<void> {
  try {
    // Retry logic to handle session establishment
    let user = null;
    let attempts = 0;
    const maxAttempts = 5;
    
    while (!user && attempts < maxAttempts) {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      user = authUser;
      
      if (!user) {
        attempts++;
        if (attempts < maxAttempts) {
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    if (!user) {
      throw new Error('Authentication session not found. Please log in again.');
    }

    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    // Handle table not existing error
    if (checkError && (checkError.code === 'PGRST116' || checkError.code === '42P01')) {
      console.error('❌ XOVA Database Error: Tables not found');
      console.error('📖 Quick Fix:');
      console.error('   1. Open Supabase Dashboard → SQL Editor');
      console.error('   2. Run the contents of /supabase-migrations.sql');
      console.error('   3. Refresh this page');
      console.error('📚 See DATABASE_SETUP_GUIDE.md for detailed instructions');
      throw new Error('Database tables not found. Please run Supabase migrations. See DATABASE_SETUP_GUIDE.md');
    }

    if (existingProfile) {
      // Update existing profile
      const { error } = await supabase
        .from('profiles')
        .update({
          age: profile.age,
          gender: profile.gender,
          height: profile.height,
          weight: profile.weight,
          activity_level: profile.activityLevel,
          dietary_restrictions: profile.dietaryRestrictions,
          health_goals: profile.healthGoals,
          allergies: profile.allergens,
          flavor_preferences: profile.flavorPreferences,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Supabase update error:', error);
        throw new Error(`Failed to update profile: ${error.message}`);
      }
    } else {
      // Insert new profile
      const { error } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          age: profile.age,
          gender: profile.gender,
          height: profile.height,
          weight: profile.weight,
          activity_level: profile.activityLevel,
          dietary_restrictions: profile.dietaryRestrictions,
          health_goals: profile.healthGoals,
          allergies: profile.allergens,
          flavor_preferences: profile.flavorPreferences
        });
      
      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(`Failed to create profile: ${error.message}`);
      }
    }
  } catch (error: any) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

// Get user profile
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // If table doesn't exist or no profile found, return null (not an error)
    if (error) {
      console.log('No profile found or table does not exist:', error.message);
      return null;
    }

    if (!profile) return null;

    return {
      age: profile.age,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
      healthGoals: profile.health_goals || [],
      dietaryRestrictions: profile.dietary_restrictions || [],
      allergens: profile.allergies || [],
      flavorPreferences: profile.flavor_preferences || [],
      activityLevel: profile.activity_level,
      sleepQuality: 'good', // Default, can be expanded
      stressLevel: 'moderate' // Default, can be expanded
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

// Update user (for compatibility with existing code)
export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  // This function is primarily used for updating favorites, delivery history, etc.
  // We'll handle these through separate functions
  if (updates.profile) {
    await updateUserProfile(updates.profile);
  }
}

// Analytics event tracking
export async function trackEvent(eventType: string, eventData?: any): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await supabase
      .from('analytics_events')
      .insert({
        user_id: user?.id || null,
        event_type: eventType,
        event_data: eventData || {}
      });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const user = await getCurrentUser();
      callback(user);
    } else {
      callback(null);
    }
  });
}
