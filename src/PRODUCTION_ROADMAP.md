# XOVA Production Roadmap
## From Mock MVP to Fully Functional Platform

**Goal:** Launch a working XOVA platform with real authentication, payments, delivery, and café integration by November 3rd, 2025.

**Timeline:** 8-12 weeks (assuming 1-2 developers)

---

## 📋 Pre-Launch Checklist Overview

- [ ] Phase 1: Backend Infrastructure (Week 1-2)
- [ ] Phase 2: Authentication System (Week 2-3)
- [ ] Phase 3: Payment Integration (Week 3-5)
- [ ] Phase 4: Delivery System (Week 5-7)
- [ ] Phase 5: Café Integration (Week 7-8)
- [ ] Phase 6: Testing & QA (Week 9-10)
- [ ] Phase 7: Deployment (Week 11)
- [ ] Phase 8: Soft Launch & Monitoring (Week 12+)

---

# PHASE 1: Backend Infrastructure Setup
**Duration:** 1-2 weeks

## 1.1 Supabase Project Setup

### Step 1: Create Supabase Project
```bash
1. Go to https://supabase.com
2. Click "New Project"
3. Name: "xova-production"
4. Region: Choose closest to Zurich (eu-central-1 Frankfurt)
5. Database Password: Generate strong password → SAVE IT
6. Pricing: Start with Free tier, upgrade to Pro when needed
```

### Step 2: Save Your Credentials
```bash
# Create .env.local file in your project root
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find:**
- Go to Project Settings → API
- Copy "Project URL" → VITE_SUPABASE_URL
- Copy "anon public" key → VITE_SUPABASE_ANON_KEY
- Copy "service_role" key → SUPABASE_SERVICE_ROLE_KEY (keep secret!)

### Step 3: Database Schema Setup

Run this SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscription_tier TEXT CHECK (subscription_tier IN ('free', 'premium', 'delivery')) DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles
CREATE TABLE public.user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  height NUMERIC,
  weight NUMERIC,
  health_goals TEXT[],
  dietary_restrictions TEXT[],
  allergens TEXT[],
  flavor_preferences TEXT[],
  activity_level TEXT,
  sleep_quality TEXT,
  stress_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Daily check-ins
CREATE TABLE public.daily_checkins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  energy_level TEXT,
  mood TEXT,
  appetite TEXT,
  specific_needs TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_type TEXT CHECK (plan_type IN ('premium', 'delivery')),
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated recipes (history)
CREATE TABLE public.generated_recipes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  recipe_name TEXT NOT NULL,
  recipe_data JSONB NOT NULL,
  mood_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorite smoothies
CREATE TABLE public.favorite_smoothies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  smoothie_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weekly delivery orders
CREATE TABLE public.delivery_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  delivery_week_start DATE NOT NULL,
  smoothies JSONB NOT NULL, -- Array of smoothie objects
  total_smoothies INTEGER NOT NULL,
  price_per_smoothie NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  delivery_fee NUMERIC DEFAULT 0,
  delivery_address JSONB NOT NULL,
  delivery_instructions TEXT,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'canceled')) DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Café locations
CREATE TABLE public.cafe_locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  phone TEXT,
  website TEXT,
  opening_hours JSONB,
  smoothie_menu JSONB NOT NULL, -- Array of smoothie objects
  accepts_preorders BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom smoothies
CREATE TABLE public.custom_smoothies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  ingredients JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_smoothies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_smoothies ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- User profiles policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Daily checkins policies
CREATE POLICY "Users can manage own checkins" ON public.daily_checkins
  FOR ALL USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Generated recipes policies
CREATE POLICY "Users can manage own recipes" ON public.generated_recipes
  FOR ALL USING (auth.uid() = user_id);

-- Favorite smoothies policies
CREATE POLICY "Users can manage own favorites" ON public.favorite_smoothies
  FOR ALL USING (auth.uid() = user_id);

-- Delivery orders policies
CREATE POLICY "Users can manage own orders" ON public.delivery_orders
  FOR ALL USING (auth.uid() = user_id);

-- Custom smoothies policies
CREATE POLICY "Users can manage own custom smoothies" ON public.custom_smoothies
  FOR ALL USING (auth.uid() = user_id);

-- Café locations are public (read-only for users)
ALTER TABLE public.cafe_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view cafes" ON public.cafe_locations
  FOR SELECT USING (true);

-- Functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated at triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_delivery_orders_updated_at BEFORE UPDATE ON public.delivery_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

### Step 4: Seed Café Data

```sql
-- Insert real Zurich & Aarau café data
INSERT INTO public.cafe_locations (name, address, city, postal_code, latitude, longitude, phone, smoothie_menu, accepts_preorders) VALUES
('Aloha Poke Zurich', 'Europaallee 19', 'Zurich', '8004', 47.3782, 8.5307, '+41 44 585 10 10', 
  '[{"name": "Green Power", "ingredients": ["spinach", "banana", "mango", "coconut water"], "price": 13.50, "nutrients": {"protein": 5, "fiber": 8, "vitamin_c": 120}}]'::jsonb, 
  true),
('Roots Juice Bar', 'Weinbergstrasse 119', 'Zurich', '8006', 47.3831, 8.5417, '+41 44 362 12 12',
  '[{"name": "Berry Blast", "ingredients": ["strawberries", "blueberries", "banana", "almond milk"], "price": 12.00, "nutrients": {"protein": 6, "fiber": 9, "antioxidants": "high"}}]'::jsonb,
  true);
-- Add remaining 10 cafés here
```

### Step 5: Test Database Connection

Create `/lib/database-test.ts`:
```typescript
import { supabase } from './supabase';

export async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase.from('cafe_locations').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
```

---

# PHASE 2: Authentication System
**Duration:** 1 week

## 2.1 Replace Mock Auth with Supabase Auth

### Step 1: Update `/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type User = {
  id: string;
  email: string;
  name?: string;
  subscription_tier: 'free' | 'premium' | 'delivery';
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  user_id: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  health_goals?: string[];
  dietary_restrictions?: string[];
  allergens?: string[];
  flavor_preferences?: string[];
  activity_level?: string;
  sleep_quality?: string;
  stress_level?: string;
};

export type DailyCheckin = {
  id: string;
  user_id: string;
  date: string;
  energy_level: string;
  mood: string;
  appetite: string;
  specific_needs?: string[];
};
```

### Step 2: Create Auth Service `/lib/auth-service.ts`
```typescript
import { supabase } from './supabase';

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  // Fetch user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*, user_profiles(*)')
    .eq('id', user.id)
    .single();
  
  return profile;
}

export async function updateUserProfile(userId: string, profileData: any) {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({ user_id: userId, ...profileData })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
```

### Step 3: Update App.tsx
Replace mock auth with real auth:
```typescript
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { getCurrentUser, signOut } from './lib/auth-service';
import type { User } from './lib/supabase';

// Remove all mock auth imports and functions
// Replace with real auth
```

### Step 4: Update SignupPage.tsx
```typescript
import { useState } from 'react';
import { signUp } from '../lib/auth-service';
import { toast } from 'sonner@2.0.3';

export function SignupPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signUp(email, password, name);
      toast.success('Account created! Please check your email to verify.');
      onNavigate('dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

### Step 5: Update LoginPage.tsx
Similar pattern to SignupPage

### Step 6: Enable Supabase Email Auth
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Email" provider
3. Configure email templates (optional but recommended)

---

# PHASE 3: Payment Integration (Stripe)
**Duration:** 2 weeks

## 3.1 Stripe Account Setup

### Step 1: Create Stripe Account
```bash
1. Go to https://stripe.com
2. Create account for Switzerland
3. Complete business verification
4. Get API keys from Dashboard → Developers → API keys
```

### Step 2: Save Stripe Credentials
Add to `.env.local`:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Step 3: Create Stripe Products & Prices

```bash
# Using Stripe CLI or Dashboard

# Premium Plan
Product: XOVA Premium
Price: CHF 10.00 / week
Billing: Recurring weekly
ID: price_premium_weekly

# Delivery Base (minimum charge)
Product: XOVA Delivery - 7 Smoothies
Price: CHF 84.00 (7 × CHF 12)
Billing: One-time or Recurring weekly

# Delivery volume pricing
7-9 smoothies: CHF 12 each
10-14 smoothies: CHF 10 each
15-21 smoothies: CHF 8 each
```

### Step 4: Install Stripe in Your Project
```bash
npm install @stripe/stripe-js stripe
```

### Step 5: Create Stripe Service `/lib/stripe-service.ts`
```typescript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(
  userId: string,
  planType: 'premium' | 'delivery',
  deliveryData?: any
) {
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, planType, deliveryData })
  });
  
  const session = await response.json();
  const stripe = await stripePromise;
  
  if (stripe) {
    await stripe.redirectToCheckout({ sessionId: session.id });
  }
}

export async function createSubscription(userId: string, planType: string) {
  // Call your backend to create subscription
  const response = await fetch('/api/create-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, planType })
  });
  
  return await response.json();
}

export async function cancelSubscription(subscriptionId: string) {
  const response = await fetch('/api/cancel-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscriptionId })
  });
  
  return await response.json();
}
```

## 3.2 Backend API Setup (Supabase Edge Functions)

### Step 1: Install Supabase CLI
```bash
npm install -g supabase
supabase login
supabase init
```

### Step 2: Create Edge Function for Checkout
```bash
supabase functions new create-checkout
```

Edit `supabase/functions/create-checkout/index.ts`:
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.5.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  try {
    const { userId, planType, deliveryData } = await req.json();
    
    let lineItems = [];
    
    if (planType === 'premium') {
      lineItems.push({
        price: Deno.env.get('STRIPE_PREMIUM_PRICE_ID'),
        quantity: 1,
      });
    } else if (planType === 'delivery') {
      const smoothieCount = deliveryData.smoothies.length;
      let pricePerSmoothie = 12;
      
      if (smoothieCount >= 15) pricePerSmoothie = 8;
      else if (smoothieCount >= 10) pricePerSmoothie = 10;
      
      const deliveryFee = smoothieCount >= 10 ? 0 : 5;
      
      lineItems.push({
        price_data: {
          currency: 'chf',
          product_data: {
            name: `XOVA Delivery - ${smoothieCount} Smoothies`,
          },
          unit_amount: pricePerSmoothie * 100,
        },
        quantity: smoothieCount,
      });
      
      if (deliveryFee > 0) {
        lineItems.push({
          price_data: {
            currency: 'chf',
            product_data: {
              name: 'Delivery Fee',
            },
            unit_amount: deliveryFee * 100,
          },
          quantity: 1,
        });
      }
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: planType === 'premium' ? 'subscription' : 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
      metadata: {
        userId,
        planType,
      },
    });
    
    return new Response(JSON.stringify({ id: session.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
```

### Step 3: Create Webhook Handler
```bash
supabase functions new stripe-webhook
```

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.5.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    );
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await handleCheckoutComplete(session);
        break;
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        await handleSubscriptionChange(subscription);
        break;
    }
    
    return new Response(JSON.stringify({ received: true }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
});

async function handleCheckoutComplete(session: any) {
  const { userId, planType } = session.metadata;
  
  if (planType === 'premium') {
    await supabase.from('subscriptions').insert({
      user_id: userId,
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      plan_type: 'premium',
      status: 'active',
    });
    
    await supabase.from('users').update({
      subscription_tier: 'premium'
    }).eq('id', userId);
  }
}
```

### Step 4: Deploy Edge Functions
```bash
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```

### Step 5: Update Payment UI Components

Update `/components/Settings.tsx` to include upgrade buttons:
```typescript
import { createCheckoutSession } from '../lib/stripe-service';

// Add upgrade button
<Button onClick={() => createCheckoutSession(user.id, 'premium')}>
  Upgrade to Premium - CHF 10/week
</Button>
```

---

# PHASE 4: Delivery System
**Duration:** 2 weeks

## 4.1 Delivery Order Management

### Step 1: Create Delivery Service `/lib/delivery-service.ts`
```typescript
import { supabase } from './supabase';

export async function createDeliveryOrder(
  userId: string,
  smoothies: any[],
  deliveryAddress: any,
  deliveryWeekStart: string
) {
  const totalSmoothies = smoothies.length;
  let pricePerSmoothie = 12;
  
  if (totalSmoothies >= 15) pricePerSmoothie = 8;
  else if (totalSmoothies >= 10) pricePerSmoothie = 10;
  
  const deliveryFee = totalSmoothies >= 10 ? 0 : 5;
  const totalPrice = (totalSmoothies * pricePerSmoothie) + deliveryFee;
  
  const orderNumber = `XO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  const { data, error } = await supabase
    .from('delivery_orders')
    .insert({
      user_id: userId,
      order_number: orderNumber,
      delivery_week_start: deliveryWeekStart,
      smoothies: JSON.stringify(smoothies),
      total_smoothies: totalSmoothies,
      price_per_smoothie: pricePerSmoothie,
      total_price: totalPrice,
      delivery_fee: deliveryFee,
      delivery_address: JSON.stringify(deliveryAddress),
      status: 'pending'
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getDeliveryOrders(userId: string) {
  const { data, error } = await supabase
    .from('delivery_orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { data, error } = await supabase
    .from('delivery_orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
```

### Step 2: Update WeeklyDelivery.tsx
Add checkout flow with Stripe integration:
```typescript
const handleCheckout = async () => {
  try {
    // Create delivery order in database
    const order = await createDeliveryOrder(
      user.id,
      weeklyPlan,
      deliveryAddress,
      selectedWeekStart
    );
    
    // Create Stripe checkout session
    await createCheckoutSession(user.id, 'delivery', {
      orderId: order.id,
      smoothies: weeklyPlan
    });
  } catch (error) {
    toast.error('Failed to create order');
  }
};
```

## 4.2 Delivery Logistics Setup

### Step 1: Choose Delivery Partner
**Options for Zurich:**
1. **Veloblitz** - Zurich bike courier service
2. **Notime** - Swiss delivery platform
3. **Custom solution** - Hire part-time courier

**Recommended:** Start with Veloblitz or Notime for week 1-4, evaluate if scaling needed.

### Step 2: Delivery Address Validation
Add Swiss address validation:
```typescript
export function validateSwissAddress(address: any): boolean {
  // Check postal code format (4 digits)
  if (!/^\d{4}$/.test(address.postalCode)) {
    return false;
  }
  
  // Check if in Zurich area (8000-8099)
  const postalCode = parseInt(address.postalCode);
  if (postalCode < 8000 || postalCode > 8099) {
    return false;
  }
  
  return true;
}
```

### Step 3: Delivery Scheduling
```typescript
export function getNextDeliveryDate(): Date {
  // First delivery: Monday, November 3rd, 2025
  const firstDelivery = new Date('2025-11-03');
  const now = new Date();
  
  if (now < firstDelivery) {
    return firstDelivery;
  }
  
  // Find next Monday
  const dayOfWeek = now.getDay();
  const daysUntilMonday = (8 - dayOfWeek) % 7 || 7;
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  
  return nextMonday;
}

export function canOrderForWeek(deliveryDate: Date): boolean {
  // Orders close Thursday 20:00 before delivery week
  const orderCutoff = new Date(deliveryDate);
  orderCutoff.setDate(orderCutoff.getDate() - 4); // Thursday before
  orderCutoff.setHours(20, 0, 0, 0);
  
  return new Date() < orderCutoff;
}
```

---

# PHASE 5: Café Integration
**Duration:** 1 week

## 5.1 Café Partnership Setup

### Step 1: Contact Cafés
Create partnership proposal email template:

```
Subject: Partnership Opportunity - XOVA Nutrient Intelligence Platform

Dear [Café Name] Manager,

We're launching XOVA, a nutrient intelligence platform that helps health-conscious 
customers in Zurich find smoothies that match their personal health goals.

We'd like to feature your café in our platform, which will:
- Drive qualified customers to your location
- Showcase your smoothie menu to our users
- Provide pre-order functionality (optional)
- No cost to you

Would you be interested in a quick 15-minute call to discuss?

Best regards,
[Your Name]
XOVA Team
```

### Step 2: Café Data Collection
For each café, collect:
- [ ] Menu with exact ingredients
- [ ] Pricing
- [ ] Nutritional info (if available)
- [ ] Opening hours
- [ ] Pre-order capability (yes/no)
- [ ] Contact person for orders

### Step 3: Pre-Order Integration

**Option A: Phone/WhatsApp** (Simple MVP)
```typescript
export function sendPreOrder(cafe: Cafe, smoothie: any, user: User) {
  const message = encodeURIComponent(
    `XOVA Pre-order\nName: ${user.name}\nSmoothie: ${smoothie.name}\nPickup: [time]\nPhone: ${user.phone}`
  );
  
  window.open(`https://wa.me/${cafe.phone}?text=${message}`);
}
```

**Option B: Email** (Professional MVP)
```typescript
export async function sendPreOrderEmail(cafe: Cafe, smoothie: any, user: User) {
  await fetch('/api/send-preorder-email', {
    method: 'POST',
    body: JSON.stringify({
      cafeEmail: cafe.email,
      userName: user.name,
      userEmail: user.email,
      smoothie: smoothie.name,
      pickupTime: user.selectedPickupTime
    })
  });
}
```

### Step 4: Update CafeMatching.tsx
Add pre-order button:
```typescript
<Button onClick={() => handlePreOrder(cafe, smoothie)}>
  Pre-Order via WhatsApp
</Button>
```

---

# PHASE 6: Testing & Quality Assurance
**Duration:** 2 weeks

## 6.1 Testing Checklist

### Unit Tests
```bash
- [ ] Auth service (signup, login, logout)
- [ ] Profile creation and updates
- [ ] Nutrient plan generation
- [ ] Delivery order calculation
- [ ] Café matching algorithm
```

### Integration Tests
```bash
- [ ] Complete user journey (signup → profile → generate → order)
- [ ] Payment flow (test mode)
- [ ] Subscription management
- [ ] Delivery order flow
- [ ] Café pre-order flow
```

### User Acceptance Testing
```bash
- [ ] Recruit 5-10 beta testers
- [ ] Test on different devices (mobile, tablet, desktop)
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Collect feedback via form
```

### Performance Testing
```bash
- [ ] Page load times < 3 seconds
- [ ] Database query optimization
- [ ] Image optimization
- [ ] Lighthouse score > 90
```

### Security Testing
```bash
- [ ] SQL injection prevention (RLS enabled)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] API key security
- [ ] Payment security (PCI compliance via Stripe)
```

## 6.2 Create Testing Accounts

```sql
-- Test accounts
INSERT INTO auth.users (email, encrypted_password) VALUES
('test-free@xova.ch', '[hashed_password]'),
('test-premium@xova.ch', '[hashed_password]'),
('test-delivery@xova.ch', '[hashed_password]');
```

---

# PHASE 7: Deployment
**Duration:** 1 week

## 7.1 Frontend Deployment (Vercel/Netlify)

### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_STRIPE_PUBLISHABLE_KEY=...
```

### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Add environment variables in Netlify dashboard
```

## 7.2 Domain Setup

### Step 1: Purchase Domain
```bash
Recommended: xova.ch
Alternative: xova.swiss
Cost: ~50 CHF/year
```

### Step 2: Configure DNS
```bash
# In your domain registrar
A record: @ → [Vercel IP]
CNAME: www → [Vercel domain]
```

### Step 3: SSL Certificate
```bash
# Automatic with Vercel/Netlify
# Or use Let's Encrypt
```

## 7.3 Email Setup (SendGrid/Mailgun)

### Step 1: Create SendGrid Account
```bash
1. Go to sendgrid.com
2. Create free account (100 emails/day)
3. Verify domain: mail.xova.ch
4. Get API key
```

### Step 2: Configure Supabase Email
```bash
# In Supabase Dashboard → Project Settings → Auth
SMTP Settings:
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: [SendGrid API Key]
Sender: noreply@xova.ch
```

### Step 3: Email Templates
```bash
- Welcome email
- Email verification
- Password reset
- Order confirmation
- Delivery notification
```

## 7.4 Analytics Setup

### Google Analytics 4
```bash
1. Create GA4 property
2. Add tracking code to index.html
3. Set up conversion events:
   - signup
   - upgrade_to_premium
   - create_delivery_order
   - cafe_preorder
```

### Monitoring (Sentry)
```bash
npm install @sentry/react

# Add to App.tsx
Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

---

# PHASE 8: Soft Launch & Monitoring
**Duration:** Ongoing

## 8.1 Pre-Launch Checklist

```bash
- [ ] All features tested
- [ ] Payment flow tested (live mode)
- [ ] Email delivery working
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] Customer support email set up (support@xova.ch)
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Refund policy defined
- [ ] FAQ page created
```

## 8.2 Launch Day Tasks

```bash
Day 1 (Soft Launch):
- [ ] Enable live Stripe payments
- [ ] Send launch email to beta testers
- [ ] Post on LinkedIn/social media
- [ ] Monitor error logs
- [ ] Be ready for customer support

Week 1:
- [ ] Daily metrics review
- [ ] Bug fixes (if any)
- [ ] User feedback collection
- [ ] Café partnership confirmations

Week 2-4:
- [ ] Prepare first deliveries
- [ ] Coordinate with delivery partner
- [ ] Finalize smoothie production
- [ ] Quality control
```

## 8.3 Metrics to Track

### Daily
```bash
- New signups
- Premium conversions
- Delivery orders
- Revenue
- Active users
- Error rate
```

### Weekly
```bash
- Retention rate
- Churn rate
- Average order value
- Café pre-orders
- Customer satisfaction
```

## 8.4 Customer Support Setup

```bash
# Tools
- Email: support@xova.ch (forwarded to team)
- FAQ page on website
- Live chat (optional): Intercom/Crisp
- Response time goal: < 24 hours
```

---

# BUDGET ESTIMATION

## One-Time Costs
```
Domain (.ch): CHF 50
Stripe setup: Free
Initial marketing: CHF 500-1000
Legal (T&C, Privacy): CHF 300-500
Total: CHF 850-1550
```

## Monthly Recurring Costs
```
Supabase Pro: $25/month (~CHF 22)
Vercel/Netlify: Free (hobby) or $20/month
SendGrid: Free (100 emails/day)
Delivery partner: Variable (per order)
Stripe fees: 1.5% + CHF 0.25 per transaction
Total Fixed: ~CHF 22-42/month
```

---

# TIMELINE SUMMARY

| Week | Phase | Key Deliverables |
|------|-------|-----------------|
| 1-2 | Backend Setup | Supabase configured, DB schema live |
| 2-3 | Authentication | Real signup/login working |
| 3-5 | Payments | Stripe integration complete |
| 5-7 | Delivery | Order system functional |
| 7-8 | Café Integration | Pre-orders enabled |
| 9-10 | Testing | All features tested |
| 11 | Deployment | Live on xova.ch |
| 12+ | Launch | Accepting orders |

---

# CRITICAL SUCCESS FACTORS

1. **Start Simple**: Launch with basic features working perfectly
2. **Test Payments Early**: Use Stripe test mode extensively
3. **Clear Communication**: Set expectations with customers
4. **Delivery Logistics**: Have backup plan for first week
5. **Customer Support**: Be responsive in early days
6. **Iterate Fast**: Fix issues quickly based on feedback

---

# NEXT IMMEDIATE STEPS (Start Today)

1. ✅ Create Supabase account
2. ✅ Run database schema SQL
3. ✅ Test database connection
4. ✅ Create Stripe account
5. ✅ Set up .env.local with all keys
6. ✅ Replace mock auth with Supabase auth
7. ✅ Test signup/login flow
8. ✅ Create one test payment flow

**Goal for Week 1:** Have authentication and database working with real data.

---

# GETTING HELP

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Swiss Business**: https://www.ch.ch/en/starting-business
- **Community**: Supabase Discord, Stripe Support

---

**Remember:** You don't need everything perfect. Launch with MVP, iterate based on real user feedback. Focus on these core flows working flawlessly:
1. Signup → Profile → Generate Nutrient Plan
2. Upgrade to Premium → Payment Success
3. Create Delivery Order → Payment → Confirmation
4. Browse Cafés → Pre-Order

Good luck! 🚀
