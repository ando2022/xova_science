-- XOVA Ingredients Database
-- Cost data in CHF per 100g, nutritional tags for AI matching

CREATE TABLE IF NOT EXISTS ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  cost_per_100g DECIMAL(5,2) NOT NULL, -- CHF per 100g
  density DECIMAL(4,2) DEFAULT 1.0, -- g/ml for volume calculations
  category TEXT NOT NULL, -- 'fruit', 'vegetable', 'liquid', 'protein', 'supplement', 'sweetener'
  
  -- Nutritional tags for AI matching
  protein DECIMAL(4,1) DEFAULT 0, -- grams per 100g
  carbs DECIMAL(4,1) DEFAULT 0,
  fiber DECIMAL(4,1) DEFAULT 0,
  fat DECIMAL(4,1) DEFAULT 0,
  calories INTEGER DEFAULT 0,
  
  -- Micronutrients (mg per 100g)
  iron DECIMAL(4,1) DEFAULT 0,
  vitamin_c DECIMAL(4,1) DEFAULT 0,
  vitamin_a DECIMAL(4,1) DEFAULT 0,
  calcium DECIMAL(4,1) DEFAULT 0,
  magnesium DECIMAL(4,1) DEFAULT 0,
  potassium DECIMAL(4,1) DEFAULT 0,
  folate DECIMAL(4,1) DEFAULT 0,
  omega3 DECIMAL(4,1) DEFAULT 0,
  
  -- Functional tags for health goals
  energy_boost BOOLEAN DEFAULT FALSE,
  muscle_recovery BOOLEAN DEFAULT FALSE,
  weight_management BOOLEAN DEFAULT FALSE,
  stress_relief BOOLEAN DEFAULT FALSE,
  immune_support BOOLEAN DEFAULT FALSE,
  anti_inflammatory BOOLEAN DEFAULT FALSE,
  digestive_health BOOLEAN DEFAULT FALSE,
  heart_health BOOLEAN DEFAULT FALSE,
  
  -- Allergen and dietary tags
  allergens TEXT[] DEFAULT '{}', -- 'nuts', 'dairy', 'soy', 'gluten'
  dietary_tags TEXT[] DEFAULT '{}', -- 'vegan', 'vegetarian', 'keto', 'paleo'
  
  -- Usage constraints
  max_percentage DECIMAL(4,1) DEFAULT 30.0, -- Max % of total smoothie
  min_percentage DECIMAL(4,1) DEFAULT 5.0,  -- Min % for meaningful impact
  flavor_profile TEXT DEFAULT 'neutral', -- 'sweet', 'tart', 'creamy', 'neutral', 'bitter'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert comprehensive ingredient database
INSERT INTO ingredients (name, cost_per_100g, density, category, protein, carbs, fiber, fat, calories, iron, vitamin_c, vitamin_a, calcium, magnesium, potassium, folate, omega3, energy_boost, muscle_recovery, weight_management, stress_relief, immune_support, anti_inflammatory, digestive_health, heart_health, allergens, dietary_tags, max_percentage, min_percentage, flavor_profile) VALUES

-- FRUITS (Base ingredients, 15-40% of smoothie)
('Banana', 0.45, 1.1, 'fruit', 1.1, 22.8, 2.6, 0.3, 89, 0.3, 8.7, 0.03, 5, 27, 358, 20, 0, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 30.0, 10.0, 'sweet'),
('Blueberries', 2.80, 1.0, 'fruit', 0.7, 14.5, 2.4, 0.3, 57, 0.3, 9.7, 0.05, 6, 6, 77, 6, 0.1, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 25.0, 8.0, 'sweet'),
('Strawberries', 2.20, 1.0, 'fruit', 0.8, 7.7, 2.0, 0.4, 32, 0.4, 58.8, 0.01, 16, 13, 153, 24, 0.1, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 25.0, 8.0, 'sweet'),
('Raspberries', 3.50, 1.0, 'fruit', 1.2, 11.9, 6.5, 0.7, 52, 0.7, 26.2, 0.03, 25, 22, 151, 21, 0.1, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 20.0, 8.0, 'tart'),
('Mango', 1.80, 1.0, 'fruit', 0.8, 15.0, 1.6, 0.4, 60, 0.2, 36.4, 0.54, 11, 10, 168, 43, 0, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 25.0, 10.0, 'sweet'),
('Pineapple', 1.50, 1.0, 'fruit', 0.5, 13.1, 1.4, 0.1, 50, 0.3, 47.8, 0.03, 13, 12, 109, 18, 0, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 25.0, 10.0, 'sweet'),
('Apple', 1.20, 1.0, 'fruit', 0.3, 13.8, 2.4, 0.2, 52, 0.1, 4.6, 0.03, 6, 5, 107, 3, 0, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 20.0, 8.0, 'sweet'),
('Orange', 1.00, 1.0, 'fruit', 0.9, 11.8, 2.4, 0.1, 47, 0.1, 53.2, 0.23, 40, 10, 181, 30, 0, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 20.0, 8.0, 'sweet'),
('Kiwi', 2.50, 1.0, 'fruit', 1.1, 14.7, 3.0, 0.5, 61, 0.3, 92.7, 0.02, 34, 17, 312, 25, 0, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 20.0, 8.0, 'tart'),

-- VEGETABLES (10-25% of smoothie)
('Spinach', 1.80, 1.0, 'vegetable', 2.9, 3.6, 2.2, 0.4, 23, 2.7, 28.1, 0.47, 99, 79, 558, 194, 0.1, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 20.0, 5.0, 'neutral'),
('Kale', 2.20, 1.0, 'vegetable', 4.3, 8.8, 3.6, 0.9, 49, 1.5, 93.4, 0.68, 150, 47, 491, 62, 0.2, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 15.0, 5.0, 'bitter'),
('Avocado', 1.50, 1.0, 'vegetable', 2.0, 8.5, 6.7, 14.7, 160, 0.6, 10.0, 0.15, 12, 29, 485, 81, 0.1, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 15.0, 5.0, 'creamy'),
('Cucumber', 0.80, 1.0, 'vegetable', 0.7, 3.6, 0.5, 0.1, 16, 0.3, 2.8, 0.01, 16, 13, 147, 7, 0, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 15.0, 5.0, 'neutral'),

-- LIQUIDS (30-60% of smoothie)
('Almond Milk', 0.35, 1.0, 'liquid', 1.0, 1.5, 0.5, 1.1, 17, 0.3, 0, 0.01, 120, 16, 60, 1, 0, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, ARRAY['nuts'], ARRAY['vegan', 'vegetarian'], 50.0, 20.0, 'neutral'),
('Oat Milk', 0.40, 1.0, 'liquid', 1.0, 7.0, 0.8, 0.5, 43, 0.3, 0, 0.01, 120, 15, 100, 2, 0, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 50.0, 20.0, 'creamy'),
('Coconut Milk', 0.55, 1.0, 'liquid', 2.3, 6.0, 0, 23.8, 230, 1.6, 2.8, 0, 16, 37, 263, 16, 0, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 40.0, 15.0, 'creamy'),
('Water', 0.00, 1.0, 'liquid', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, '{}', ARRAY['vegan', 'vegetarian'], 60.0, 10.0, 'neutral'),

-- PROTEIN SOURCES (5-15% of smoothie)
('Greek Yogurt', 1.20, 1.1, 'protein', 10.0, 3.6, 0, 0.4, 59, 0.1, 0.5, 0.01, 110, 11, 141, 12, 0, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, ARRAY['dairy'], ARRAY['vegetarian'], 20.0, 5.0, 'creamy'),
('Protein Powder (Whey)', 8.50, 0.6, 'protein', 80.0, 8.0, 0, 2.0, 370, 2.0, 0, 0, 200, 100, 300, 0, 0, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, ARRAY['dairy'], ARRAY['vegetarian'], 15.0, 3.0, 'neutral'),
('Protein Powder (Plant)', 9.20, 0.6, 'protein', 75.0, 10.0, 2.0, 3.0, 360, 3.0, 0, 0, 150, 80, 250, 0, 0, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, '{}', ARRAY['vegan', 'vegetarian'], 15.0, 3.0, 'neutral'),
('Hemp Seeds', 4.50, 0.6, 'protein', 31.6, 8.7, 4.0, 48.8, 553, 8.0, 1.0, 0.01, 70, 700, 1200, 110, 8.7, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 10.0, 2.0, 'neutral'),

-- SUPPLEMENTS (2-8% of smoothie)
('Chia Seeds', 3.80, 0.6, 'supplement', 16.5, 42.1, 34.4, 30.7, 486, 7.7, 1.6, 0.05, 631, 335, 407, 49, 17.8, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 8.0, 2.0, 'neutral'),
('Flax Seeds', 2.20, 0.6, 'supplement', 18.3, 28.9, 27.3, 42.2, 534, 5.7, 0.6, 0.01, 255, 392, 813, 87, 22.8, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 8.0, 2.0, 'neutral'),
('Almond Butter', 6.50, 1.0, 'supplement', 21.2, 21.6, 12.2, 49.4, 614, 3.7, 0, 0.01, 264, 279, 705, 50, 0.3, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, ARRAY['nuts'], ARRAY['vegan', 'vegetarian'], 10.0, 3.0, 'creamy'),
('Peanut Butter', 4.20, 1.0, 'supplement', 25.1, 20.9, 8.5, 50.4, 588, 2.3, 0, 0.01, 92, 168, 649, 74, 0, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, ARRAY['nuts'], ARRAY['vegan', 'vegetarian'], 10.0, 3.0, 'creamy'),

-- SWEETENERS (0-5% of smoothie)
('Honey', 2.50, 1.4, 'sweetener', 0.3, 82.4, 0.2, 0, 304, 0.4, 0.5, 0, 6, 2, 52, 2, 0, TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, '{}', ARRAY['vegetarian'], 5.0, 1.0, 'sweet'),
('Maple Syrup', 3.20, 1.3, 'sweetener', 0.04, 67.0, 0, 0, 260, 0.1, 0, 0, 102, 14, 204, 0, 0, TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, '{}', ARRAY['vegan', 'vegetarian'], 5.0, 1.0, 'sweet'),
('Vanilla Extract', 25.00, 0.9, 'sweetener', 0.1, 12.7, 0, 0.1, 288, 0.1, 0, 0, 11, 12, 148, 0, 0, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, '{}', ARRAY['vegan', 'vegetarian'], 3.0, 0.5, 'sweet'),

-- SUPERFOODS (2-5% of smoothie)
('Cacao Powder', 12.00, 0.4, 'supplement', 19.6, 57.9, 33.2, 13.7, 228, 13.9, 0, 0.02, 128, 499, 1524, 32, 0, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 5.0, 1.0, 'bitter'),
('Turmeric Powder', 15.00, 0.5, 'supplement', 7.8, 64.9, 21.1, 9.9, 354, 41.4, 0, 0.02, 168, 208, 2525, 20, 0, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 3.0, 0.5, 'bitter'),
('Ginger', 8.50, 1.0, 'supplement', 1.8, 17.8, 2.0, 0.8, 80, 0.6, 5.0, 0, 16, 43, 415, 11, 0, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '{}', ARRAY['vegan', 'vegetarian'], 5.0, 1.0, 'bitter');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ingredients_category ON ingredients(category);
CREATE INDEX IF NOT EXISTS idx_ingredients_cost ON ingredients(cost_per_100g);
CREATE INDEX IF NOT EXISTS idx_ingredients_energy_boost ON ingredients(energy_boost);
CREATE INDEX IF NOT EXISTS idx_ingredients_muscle_recovery ON ingredients(muscle_recovery);
CREATE INDEX IF NOT EXISTS idx_ingredients_weight_management ON ingredients(weight_management);
CREATE INDEX IF NOT EXISTS idx_ingredients_stress_relief ON ingredients(stress_relief);
CREATE INDEX IF NOT EXISTS idx_ingredients_immune_support ON ingredients(immune_support);
CREATE INDEX IF NOT EXISTS idx_ingredients_anti_inflammatory ON ingredients(anti_inflammatory);
CREATE INDEX IF NOT EXISTS idx_ingredients_digestive_health ON ingredients(digestive_health);
CREATE INDEX IF NOT EXISTS idx_ingredients_heart_health ON ingredients(heart_health);

-- Success message
SELECT 'Ingredients database created successfully! ✅' as status;

