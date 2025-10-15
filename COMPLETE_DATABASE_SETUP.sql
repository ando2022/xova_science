-- XOVA COMPLETE PRODUCTION DATABASE SETUP
-- Run this in Supabase SQL Editor - COMPLETE VERSION

-- ==============================================
-- 1. CORE USER MANAGEMENT TABLES
-- ==============================================

-- User Profiles (Enhanced)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  
  -- Health & Preferences
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very-active')),
  health_goals TEXT[] DEFAULT '{}',
  dietary_restrictions TEXT[] DEFAULT '{}',
  allergens TEXT[] DEFAULT '{}',
  preferences TEXT[] DEFAULT '{}',
  
  -- Nutritional Profile
  daily_calories INTEGER DEFAULT 2000,
  protein_target INTEGER DEFAULT 60,
  fiber_target INTEGER DEFAULT 25,
  vitamin_c_target INTEGER DEFAULT 90,
  iron_target INTEGER DEFAULT 18,
  calcium_target INTEGER DEFAULT 1000,
  priority_nutrients TEXT[] DEFAULT '{}',
  scientific_rationale TEXT,
  
  -- Account Status
  subscription_status TEXT CHECK (subscription_status IN ('free', 'trial', 'active', 'cancelled', 'expired')) DEFAULT 'free',
  subscription_type TEXT CHECK (subscription_type IN ('weekly', 'fortnightly', 'monthly')) DEFAULT NULL,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  
  -- Preferences
  delivery_preference TEXT CHECK (delivery_preference IN ('home', 'pickup', 'both')) DEFAULT 'both',
  default_delivery_address JSONB,
  communication_preferences JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- 2. INGREDIENTS & RECIPES MANAGEMENT
-- ==============================================

-- Ingredients (Complete)
CREATE TABLE IF NOT EXISTS ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  
  -- Cost & Availability
  cost_per_100g DECIMAL(6,2) NOT NULL, -- CHF per 100g
  density DECIMAL(4,2) DEFAULT 1.0, -- g/ml for volume calculations
  is_seasonal BOOLEAN DEFAULT FALSE,
  season_start_month INTEGER CHECK (season_start_month >= 1 AND season_start_month <= 12),
  season_end_month INTEGER CHECK (season_end_month >= 1 AND season_end_month <= 12),
  is_organic BOOLEAN DEFAULT FALSE,
  is_local BOOLEAN DEFAULT FALSE,
  
  -- Categories
  category TEXT NOT NULL CHECK (category IN ('fruit', 'vegetable', 'liquid', 'protein', 'supplement', 'sweetener', 'nut', 'seed', 'spice')),
  subcategory TEXT,
  
  -- Macronutrients (per 100g)
  protein DECIMAL(5,2) DEFAULT 0,
  carbs DECIMAL(5,2) DEFAULT 0,
  fiber DECIMAL(5,2) DEFAULT 0,
  fat DECIMAL(5,2) DEFAULT 0,
  calories INTEGER DEFAULT 0,
  
  -- Micronutrients (mg per 100g)
  iron DECIMAL(5,2) DEFAULT 0,
  vitamin_c DECIMAL(5,2) DEFAULT 0,
  vitamin_a DECIMAL(5,2) DEFAULT 0,
  calcium DECIMAL(5,2) DEFAULT 0,
  magnesium DECIMAL(5,2) DEFAULT 0,
  potassium DECIMAL(5,2) DEFAULT 0,
  folate DECIMAL(5,2) DEFAULT 0,
  omega3 DECIMAL(5,2) DEFAULT 0,
  zinc DECIMAL(5,2) DEFAULT 0,
  vitamin_d DECIMAL(5,2) DEFAULT 0,
  
  -- Functional Properties
  energy_boost BOOLEAN DEFAULT FALSE,
  muscle_recovery BOOLEAN DEFAULT FALSE,
  weight_loss BOOLEAN DEFAULT FALSE,
  immune_support BOOLEAN DEFAULT FALSE,
  heart_health BOOLEAN DEFAULT FALSE,
  digestive_health BOOLEAN DEFAULT FALSE,
  anti_aging BOOLEAN DEFAULT FALSE,
  stress_relief BOOLEAN DEFAULT FALSE,
  
  -- Allergen Information
  contains_gluten BOOLEAN DEFAULT FALSE,
  contains_dairy BOOLEAN DEFAULT FALSE,
  contains_nuts BOOLEAN DEFAULT FALSE,
  contains_soy BOOLEAN DEFAULT FALSE,
  is_vegan BOOLEAN DEFAULT TRUE,
  is_vegetarian BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Smoothie Recipes (Enhanced)
CREATE TABLE IF NOT EXISTS smoothie_recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  
  -- Recipe Details
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT[],
  
  -- Ingredients & Proportions
  ingredients JSONB NOT NULL, -- [{ingredient_id, amount_grams, amount_ml}]
  total_servings INTEGER DEFAULT 1,
  
  -- Nutritional Information
  nutritional_info JSONB NOT NULL, -- Complete nutritional breakdown
  calories INTEGER,
  protein INTEGER, -- grams
  carbs INTEGER, -- grams
  fiber INTEGER, -- grams
  fat INTEGER, -- grams
  
  -- Micronutrients
  iron DECIMAL(5,2),
  vitamin_c DECIMAL(5,2),
  vitamin_a DECIMAL(5,2),
  calcium DECIMAL(5,2),
  magnesium DECIMAL(5,2),
  
  -- Recipe Properties
  cost_per_serving DECIMAL(6,2), -- CHF
  preparation_time INTEGER, -- minutes
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'medium', 'hard')) DEFAULT 'easy',
  
  -- Health Targeting
  target_health_goals TEXT[],
  scientific_explanation JSONB,
  health_score INTEGER CHECK (health_score >= 1 AND health_score <= 100),
  
  -- Status
  is_favorite BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- 3. ORDERS & PAYMENT MANAGEMENT
-- ==============================================

-- Orders (Enhanced)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL, -- Human-readable order number
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  
  -- Order Details
  plan_type TEXT CHECK (plan_type IN ('weekly', 'fortnightly', 'monthly')) NOT NULL,
  order_type TEXT CHECK (order_type IN ('first-order', 'recurring', 'one-time')) NOT NULL,
  
  -- Selected Smoothies
  selected_smoothies JSONB NOT NULL, -- Array of smoothie recipe IDs and quantities
  
  -- Pricing
  subtotal INTEGER NOT NULL, -- Amount in cents
  delivery_fee INTEGER DEFAULT 0, -- Amount in cents
  tax_amount INTEGER DEFAULT 0, -- Amount in cents
  discount_amount INTEGER DEFAULT 0, -- Amount in cents
  total_amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'CHF',
  
  -- Payment Information
  payment_intent_id TEXT UNIQUE,
  payment_status TEXT CHECK (payment_status IN ('pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded')) DEFAULT 'pending',
  payment_method TEXT,
  stripe_customer_id TEXT,
  
  -- Delivery Information
  delivery_address JSONB,
  delivery_date DATE,
  delivery_time_slot TEXT,
  delivery_instructions TEXT,
  delivery_status TEXT CHECK (delivery_status IN ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'failed', 'cancelled')) DEFAULT 'pending',
  
  -- Order Status
  status TEXT CHECK (status IN ('draft', 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled', 'refunded')) DEFAULT 'pending',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Subscriptions (New)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  
  -- Subscription Details
  stripe_subscription_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('active', 'past_due', 'cancelled', 'unpaid', 'incomplete', 'incomplete_expired', 'trialing')) NOT NULL,
  plan_type TEXT CHECK (plan_type IN ('weekly', 'fortnightly', 'monthly')) NOT NULL,
  
  -- Pricing
  price_per_smoothie INTEGER NOT NULL, -- CHF in cents
  quantity INTEGER NOT NULL, -- Number of smoothies per delivery
  
  -- Billing
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  next_billing_date TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Payment History (New)
CREATE TABLE IF NOT EXISTS payment_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  order_id UUID REFERENCES orders(id),
  subscription_id UUID REFERENCES subscriptions(id),
  
  -- Payment Details
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- CHF in cents
  currency TEXT DEFAULT 'CHF',
  payment_method TEXT,
  
  -- Status
  status TEXT CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled', 'refunded')) NOT NULL,
  failure_reason TEXT,
  
  -- Metadata
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- ==============================================
-- 4. DELIVERY & LOGISTICS
-- ==============================================

-- Delivery Partners/Cafes (New)
CREATE TABLE IF NOT EXISTS delivery_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('cafe', 'restaurant', 'delivery_service', 'pickup_point')) NOT NULL,
  
  -- Location
  address JSONB NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  service_radius INTEGER DEFAULT 5000, -- meters
  
  -- Contact
  phone TEXT,
  email TEXT,
  website TEXT,
  
  -- Services
  can_prepare_smoothies BOOLEAN DEFAULT FALSE,
  has_pre_order_system BOOLEAN DEFAULT FALSE,
  preparation_time_minutes INTEGER DEFAULT 15,
  opening_hours JSONB, -- {monday: {open: "08:00", close: "18:00"}, ...}
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Delivery Assignments (New)
CREATE TABLE IF NOT EXISTS delivery_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) NOT NULL,
  partner_id UUID REFERENCES delivery_partners(id),
  
  -- Assignment Details
  assignment_type TEXT CHECK (assignment_type IN ('preparation', 'pickup', 'delivery')) NOT NULL,
  status TEXT CHECK (status IN ('assigned', 'accepted', 'in_progress', 'completed', 'failed', 'cancelled')) DEFAULT 'assigned',
  
  -- Timing
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  estimated_completion TIMESTAMP WITH TIME ZONE,
  
  -- Instructions
  special_instructions TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- 5. ANALYTICS & TRACKING
-- ==============================================

-- User Events (Enhanced)
CREATE TABLE IF NOT EXISTS user_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  
  -- Event Details
  event_type TEXT NOT NULL,
  event_category TEXT, -- 'navigation', 'interaction', 'conversion', 'error'
  event_data JSONB,
  
  -- Context
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  
  -- Device Info
  device_type TEXT, -- 'desktop', 'mobile', 'tablet'
  browser TEXT,
  os TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Sessions (New)
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT UNIQUE NOT NULL,
  
  -- Session Details
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Device Info
  device_type TEXT,
  browser TEXT,
  os TEXT,
  ip_address INET,
  
  -- Analytics
  page_views INTEGER DEFAULT 0,
  events_count INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- 6. ADMIN & SYSTEM MANAGEMENT
-- ==============================================

-- Admin Users (New)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  
  -- Admin Details
  role TEXT CHECK (role IN ('super_admin', 'admin', 'moderator', 'support')) NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings (New)
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  setting_type TEXT CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'array')) NOT NULL,
  description TEXT,
  
  -- Metadata
  is_public BOOLEAN DEFAULT FALSE,
  is_readonly BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE smoothie_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 8. RLS POLICIES
-- ==============================================

-- User Profiles Policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Ingredients Policies (Public read, Admin write)
CREATE POLICY "Anyone can view active ingredients" ON ingredients
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage ingredients" ON ingredients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid() 
      AND admin_users.is_active = true
    )
  );

-- Smoothie Recipes Policies
CREATE POLICY "Users can view their own recipes" ON smoothie_recipes
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert their own recipes" ON smoothie_recipes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes" ON smoothie_recipes
  FOR UPDATE USING (auth.uid() = user_id);

-- Orders Policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions Policies
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Payment History Policies
CREATE POLICY "Users can view their own payments" ON payment_history
  FOR SELECT USING (auth.uid() = user_id);

-- Delivery Partners Policies (Public read, Admin write)
CREATE POLICY "Anyone can view active delivery partners" ON delivery_partners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage delivery partners" ON delivery_partners
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid() 
      AND admin_users.is_active = true
    )
  );

-- Delivery Assignments Policies
CREATE POLICY "Users can view their delivery assignments" ON delivery_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = delivery_assignments.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- User Events Policies
CREATE POLICY "Users can insert their own events" ON user_events
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own events" ON user_events
  FOR SELECT USING (auth.uid() = user_id);

-- User Sessions Policies
CREATE POLICY "Users can view their own sessions" ON user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" ON user_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON user_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin Users Policies (Admin only)
CREATE POLICY "Admins can view admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid() 
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Super admins can manage admin users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid() 
      AND admin_users.role = 'super_admin'
      AND admin_users.is_active = true
    )
  );

-- System Settings Policies
CREATE POLICY "Public settings are readable by everyone" ON system_settings
  FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can manage system settings" ON system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid() 
      AND admin_users.is_active = true
    )
  );

-- ==============================================
-- 9. FUNCTIONS & TRIGGERS
-- ==============================================

-- Generate Order Number Function
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  counter INTEGER;
BEGIN
  -- Get current counter from system settings
  SELECT COALESCE((setting_value->>'counter')::INTEGER, 0) + 1
  INTO counter
  FROM system_settings 
  WHERE setting_key = 'order_counter';
  
  -- Generate order number: XOVA-YYYYMMDD-XXXXXX
  new_number := 'XOVA-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(counter::TEXT, 6, '0');
  
  -- Update counter
  INSERT INTO system_settings (setting_key, setting_value, setting_type, description)
  VALUES ('order_counter', counter::TEXT::JSONB, 'string', 'Order counter for generating unique order numbers')
  ON CONFLICT (setting_key) 
  DO UPDATE SET 
    setting_value = counter::TEXT::JSONB,
    updated_at = NOW();
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Handle New User Function (Enhanced)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  -- Create initial user session
  INSERT INTO user_sessions (user_id, session_id)
  VALUES (
    NEW.id,
    gen_random_uuid()::TEXT
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update Updated At Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================
-- 10. TRIGGERS
-- ==============================================

-- New User Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Updated At Triggers
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ingredients_updated_at
  BEFORE UPDATE ON ingredients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_smoothie_recipes_updated_at
  BEFORE UPDATE ON smoothie_recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_delivery_partners_updated_at
  BEFORE UPDATE ON delivery_partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_delivery_assignments_updated_at
  BEFORE UPDATE ON delivery_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_sessions_updated_at
  BEFORE UPDATE ON user_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate Order Number Trigger
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number_trigger
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION set_order_number();

-- ==============================================
-- 11. INDEXES FOR PERFORMANCE
-- ==============================================

-- User Profiles Indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_status ON user_profiles(subscription_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

-- Orders Indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_delivery_date ON orders(delivery_date);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- Subscriptions Indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- Ingredients Indexes
CREATE INDEX IF NOT EXISTS idx_ingredients_category ON ingredients(category);
CREATE INDEX IF NOT EXISTS idx_ingredients_is_active ON ingredients(is_active);
CREATE INDEX IF NOT EXISTS idx_ingredients_name ON ingredients(name);

-- Smoothie Recipes Indexes
CREATE INDEX IF NOT EXISTS idx_smoothie_recipes_user_id ON smoothie_recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_smoothie_recipes_is_public ON smoothie_recipes(is_public);
CREATE INDEX IF NOT EXISTS idx_smoothie_recipes_health_score ON smoothie_recipes(health_score);

-- User Events Indexes
CREATE INDEX IF NOT EXISTS idx_user_events_user_id ON user_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_events_event_type ON user_events(event_type);
CREATE INDEX IF NOT EXISTS idx_user_events_created_at ON user_events(created_at);
CREATE INDEX IF NOT EXISTS idx_user_events_session_id ON user_events(session_id);

-- Delivery Partners Indexes
CREATE INDEX IF NOT EXISTS idx_delivery_partners_type ON delivery_partners(type);
CREATE INDEX IF NOT EXISTS idx_delivery_partners_is_active ON delivery_partners(is_active);
CREATE INDEX IF NOT EXISTS idx_delivery_partners_location ON delivery_partners USING GIST (POINT(longitude, latitude));

-- ==============================================
-- 12. INITIAL DATA SETUP
-- ==============================================

-- Insert Default System Settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('app_version', '"1.0.0"'::JSONB, 'string', 'Current application version', true),
('maintenance_mode', 'false'::JSONB, 'boolean', 'Maintenance mode flag', true),
('order_counter', '0'::JSONB, 'string', 'Order counter for generating unique order numbers', false),
('delivery_fee_chf', '8.00'::JSONB, 'number', 'Default delivery fee in CHF', true),
('free_delivery_threshold', '7'::JSONB, 'number', 'Minimum smoothies for free delivery', true),
('max_smoothies_per_order', '21'::JSONB, 'number', 'Maximum smoothies per order', true),
('default_preparation_time', '15'::JSONB, 'number', 'Default preparation time in minutes', true)
ON CONFLICT (setting_key) DO NOTHING;

-- Create First Admin User (Replace with your user ID)
-- INSERT INTO admin_users (user_id, role, permissions)
-- VALUES ('YOUR_USER_ID_HERE', 'super_admin', ARRAY['all'])
-- ON CONFLICT (user_id) DO NOTHING;

-- ==============================================
-- 13. SUCCESS MESSAGE
-- ==============================================

SELECT 'XOVA COMPLETE PRODUCTION DATABASE SETUP COMPLETED SUCCESSFULLY! 🚀' as status,
       'All tables, policies, triggers, and indexes have been created.' as message,
       'Ready for production use with complete data integrity and security.' as details;
