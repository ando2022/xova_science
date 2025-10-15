-- XOVA DATABASE POPULATION - FIXED VERSION
-- Run this after fixing the numeric overflow issue

-- ==============================================
-- 1. POPULATE INGREDIENTS TABLE (FIXED VALUES)
-- ==============================================

-- Clear existing ingredients first
DELETE FROM ingredients;

-- Insert comprehensive ingredient database with corrected values
INSERT INTO ingredients (name, display_name, cost_per_100g, category, subcategory, protein, carbs, fiber, fat, calories, iron, vitamin_c, calcium, magnesium, potassium, folate, omega3, zinc, vitamin_d, energy_boost, muscle_recovery, weight_loss, immune_support, heart_health, digestive_health, anti_aging, stress_relief, contains_gluten, contains_dairy, contains_nuts, contains_soy, is_vegan, is_vegetarian, description) VALUES

-- FRUITS
('banana', 'Banana', 0.25, 'fruit', 'tropical', 1.10, 22.80, 2.60, 0.30, 89, 0.26, 8.70, 5.00, 27.00, 358.00, 20.00, 0.00, 0.15, 0.00, true, true, false, true, true, true, true, false, false, false, false, false, true, true, 'Natural sweetness and potassium for energy'),
('strawberry', 'Strawberry', 1.20, 'fruit', 'berry', 0.70, 7.70, 2.00, 0.30, 32, 0.41, 58.80, 16.00, 13.00, 153.00, 24.00, 0.00, 0.14, 0.00, true, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Vitamin C powerhouse with antioxidants'),
('blueberry', 'Blueberry', 2.50, 'fruit', 'berry', 0.70, 14.50, 2.40, 0.30, 57, 0.28, 9.70, 6.00, 6.00, 77.00, 6.00, 0.00, 0.16, 0.00, true, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Antioxidant-rich superfruit'),
('mango', 'Mango', 0.80, 'fruit', 'tropical', 0.80, 15.00, 1.60, 0.40, 60, 0.13, 36.40, 11.00, 10.00, 168.00, 43.00, 0.00, 0.09, 0.00, true, false, false, true, false, true, true, false, false, false, false, false, true, true, 'Tropical sweetness with vitamin A'),
('apple', 'Apple', 0.60, 'fruit', 'pome', 0.30, 13.80, 2.40, 0.20, 52, 0.12, 4.60, 6.00, 5.00, 107.00, 3.00, 0.00, 0.04, 0.00, true, false, true, true, true, true, false, false, false, false, false, false, true, true, 'Fiber-rich with natural sweetness'),
('pineapple', 'Pineapple', 0.70, 'fruit', 'tropical', 0.50, 13.10, 1.40, 0.10, 50, 0.29, 47.80, 13.00, 12.00, 109.00, 18.00, 0.00, 0.12, 0.00, true, false, true, true, false, true, true, false, false, false, false, false, true, true, 'Digestive enzyme bromelain'),
('orange', 'Orange', 0.45, 'fruit', 'citrus', 0.90, 11.80, 2.40, 0.10, 47, 0.10, 53.20, 40.00, 10.00, 181.00, 30.00, 0.00, 0.07, 0.00, true, false, false, true, true, true, true, false, false, false, false, false, true, true, 'Vitamin C and citrus flavor'),
('kiwi', 'Kiwi', 1.80, 'fruit', 'berry', 1.10, 14.70, 3.00, 0.50, 61, 0.31, 92.70, 34.00, 17.00, 312.00, 25.00, 0.00, 0.14, 0.00, true, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Highest vitamin C content'),
('avocado', 'Avocado', 1.50, 'fruit', 'tropical', 2.00, 8.50, 6.70, 14.70, 160, 0.55, 10.00, 12.00, 29.00, 485.00, 81.00, 0.11, 0.64, 0.00, false, true, false, false, true, true, true, false, false, false, false, false, true, true, 'Healthy fats and fiber'),
('coconut', 'Coconut', 0.90, 'fruit', 'tropical', 3.30, 15.20, 9.00, 33.50, 354, 2.43, 3.30, 14.00, 32.00, 356.00, 26.00, 0.00, 1.10, 0.00, true, false, false, false, true, false, false, false, false, false, false, false, true, true, 'Natural electrolytes and MCTs'),

-- VEGETABLES
('spinach', 'Spinach', 0.80, 'vegetable', 'leafy_green', 2.90, 3.60, 2.20, 0.40, 23, 2.71, 28.10, 99.00, 79.00, 558.00, 194.00, 0.00, 0.53, 0.00, false, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Iron and folate powerhouse'),
('kale', 'Kale', 0.70, 'vegetable', 'leafy_green', 4.30, 8.80, 3.60, 0.90, 49, 1.47, 120.00, 150.00, 47.00, 491.00, 62.00, 0.00, 0.65, 0.00, false, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Superfood green with vitamin K'),
('carrot', 'Carrot', 0.30, 'vegetable', 'root', 0.90, 9.60, 2.80, 0.20, 41, 0.30, 5.90, 33.00, 12.00, 320.00, 19.00, 0.00, 0.24, 0.00, true, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Beta-carotene for eye health'),
('beetroot', 'Beetroot', 0.40, 'vegetable', 'root', 1.60, 9.60, 2.80, 0.20, 43, 0.80, 4.90, 16.00, 23.00, 325.00, 109.00, 0.00, 0.35, 0.00, true, false, true, false, true, true, false, false, false, false, false, false, true, true, 'Natural nitrates for performance'),
('cucumber', 'Cucumber', 0.25, 'vegetable', 'gourd', 0.70, 3.60, 0.50, 0.10, 16, 0.28, 2.80, 16.00, 13.00, 147.00, 7.00, 0.00, 0.20, 0.00, false, false, true, false, false, true, false, false, false, false, false, false, true, true, 'Hydrating and low calorie'),
('celery', 'Celery', 0.35, 'vegetable', 'stalk', 0.70, 3.00, 1.60, 0.20, 16, 0.20, 3.10, 40.00, 11.00, 260.00, 36.00, 0.00, 0.13, 0.00, false, false, true, false, false, true, false, false, false, false, false, false, true, true, 'Natural electrolytes and fiber'),

-- LIQUIDS
('almond_milk', 'Almond Milk', 0.15, 'liquid', 'nut_milk', 0.60, 1.50, 0.40, 1.10, 17, 0.28, 0.00, 188.00, 15.00, 63.00, 1.00, 0.00, 0.20, 0.00, false, false, true, false, true, true, false, false, false, false, true, false, true, true, 'Low-calorie nut milk'),
('coconut_milk', 'Coconut Milk', 0.20, 'liquid', 'plant_milk', 2.30, 6.00, 2.20, 23.80, 230, 1.64, 2.80, 16.00, 37.00, 263.00, 16.00, 0.00, 0.67, 0.00, true, false, false, false, true, false, false, false, false, false, false, false, true, true, 'Creamy with medium-chain triglycerides'),
('oat_milk', 'Oat Milk', 0.18, 'liquid', 'grain_milk', 1.00, 7.00, 0.80, 1.50, 43, 0.26, 0.00, 120.00, 10.00, 35.00, 5.00, 0.00, 0.30, 0.00, true, false, false, false, true, true, false, true, false, false, false, false, true, true, 'Creamy with beta-glucan fiber'),
('water', 'Water', 0.00, 'liquid', 'base', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, false, false, true, false, false, true, false, false, false, false, false, false, true, true, 'Pure hydration base'),
('green_tea', 'Green Tea', 0.05, 'liquid', 'tea', 0.20, 0.00, 0.00, 0.00, 1, 0.02, 0.00, 0.00, 1.00, 8.00, 0.00, 0.00, 0.01, 0.00, true, false, true, true, true, true, true, true, false, false, false, false, true, true, 'Antioxidant-rich with L-theanine'),

-- PROTEINS
('protein_powder_vanilla', 'Vanilla Protein Powder', 2.50, 'protein', 'whey', 75.00, 5.00, 3.00, 2.00, 340, 5.00, 0.00, 200.00, 100.00, 300.00, 50.00, 0.00, 8.00, 5.00, true, true, true, true, false, true, true, false, false, false, false, false, false, false, 'High-quality whey protein isolate'),
('protein_powder_chocolate', 'Chocolate Protein Powder', 2.50, 'protein', 'whey', 75.00, 5.00, 3.00, 2.00, 340, 5.00, 0.00, 200.00, 100.00, 300.00, 50.00, 0.00, 8.00, 5.00, true, true, true, true, false, true, true, false, false, false, false, false, false, false, 'Chocolate whey protein isolate'),
('plant_protein_vanilla', 'Vanilla Plant Protein', 2.80, 'protein', 'plant', 70.00, 8.00, 5.00, 3.00, 330, 8.00, 0.00, 150.00, 120.00, 400.00, 60.00, 0.50, 6.00, 3.00, true, true, true, true, false, true, true, false, false, false, true, false, true, true, 'Pea and rice protein blend'),
('greek_yogurt', 'Greek Yogurt', 0.60, 'protein', 'dairy', 10.00, 3.60, 0.00, 0.40, 59, 0.04, 1.20, 110.00, 11.00, 141.00, 12.00, 0.00, 0.52, 0.00, false, true, false, true, false, true, false, false, true, false, false, false, false, true, 'Probiotic-rich protein source'),

-- SUPPLEMENTS & SUPERFOODS
('spirulina', 'Spirulina', 8.00, 'supplement', 'algae', 57.50, 23.90, 3.60, 7.70, 290, 28.50, 10.10, 120.00, 195.00, 1363.00, 94.00, 0.82, 2.00, 0.00, true, true, true, true, true, true, true, true, false, false, false, false, true, true, 'Complete protein algae superfood'),
('chia_seeds', 'Chia Seeds', 1.50, 'supplement', 'seed', 16.50, 42.10, 34.40, 30.70, 486, 7.70, 1.60, 631.00, 335.00, 407.00, 49.00, 17.80, 4.60, 0.00, true, true, true, true, true, true, true, false, false, false, false, false, true, true, 'Omega-3 and fiber powerhouse'),
('hemp_seeds', 'Hemp Seeds', 2.20, 'supplement', 'seed', 31.60, 8.70, 4.00, 48.80, 553, 7.90, 1.00, 70.00, 700.00, 1200.00, 110.00, 8.70, 9.90, 0.00, true, true, true, true, true, true, true, false, false, false, false, false, true, true, 'Complete amino acid profile'),
('flax_seeds', 'Flax Seeds', 1.20, 'supplement', 'seed', 18.30, 28.90, 27.30, 42.20, 534, 5.70, 0.60, 255.00, 392.00, 813.00, 87.00, 22.80, 4.30, 0.00, true, true, true, true, true, true, true, false, false, false, false, false, true, true, 'Lignans and omega-3 fatty acids'),
('maca_powder', 'Maca Powder', 4.50, 'supplement', 'root', 14.30, 59.00, 8.50, 2.20, 325, 16.60, 285.00, 150.00, 104.00, 2050.00, 79.00, 0.00, 3.80, 0.00, true, false, false, true, false, true, true, true, false, false, false, false, true, true, 'Adaptogenic hormone support'),
('cacao_powder', 'Cacao Powder', 3.20, 'supplement', 'superfood', 19.60, 57.90, 33.20, 13.70, 228, 13.90, 0.00, 128.00, 499.00, 1524.00, 32.00, 0.00, 6.80, 0.00, true, false, true, true, true, true, true, true, false, false, false, false, true, true, 'Raw chocolate with antioxidants'),
('turmeric', 'Turmeric', 2.80, 'supplement', 'spice', 7.80, 64.90, 21.10, 9.90, 354, 41.40, 25.90, 168.00, 208.00, 2525.00, 20.00, 0.00, 4.50, 0.00, false, true, false, true, true, true, true, true, false, false, false, false, true, true, 'Anti-inflammatory curcumin'),
('ginger', 'Ginger', 1.50, 'supplement', 'spice', 1.80, 17.80, 2.00, 0.80, 80, 0.60, 5.00, 16.00, 43.00, 415.00, 11.00, 0.00, 0.34, 0.00, true, false, true, true, true, true, true, true, false, false, false, false, true, true, 'Digestive and anti-nausea support'),

-- SWEETENERS
('honey', 'Honey', 0.80, 'sweetener', 'natural', 0.30, 82.40, 0.20, 0.00, 304, 0.42, 0.50, 6.00, 2.00, 52.00, 2.00, 0.00, 0.22, 0.00, true, false, false, true, false, true, false, true, false, false, false, false, true, true, 'Natural antibacterial sweetness'),
('maple_syrup', 'Maple Syrup', 0.60, 'sweetener', 'natural', 0.00, 67.00, 0.00, 0.00, 260, 0.11, 0.00, 102.00, 14.00, 212.00, 0.00, 0.00, 4.16, 0.00, true, false, false, false, false, true, false, false, false, false, false, false, true, true, 'Mineral-rich natural sweetener'),
('dates', 'Dates', 0.70, 'sweetener', 'fruit', 2.50, 75.00, 8.00, 0.40, 277, 1.02, 0.40, 64.00, 54.00, 696.00, 15.00, 0.00, 0.44, 0.00, true, false, false, false, false, true, false, false, false, false, false, false, true, true, 'Fiber-rich natural sweetener'),
('stevia', 'Stevia', 1.50, 'sweetener', 'artificial', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, false, false, true, false, false, true, false, false, false, false, false, false, true, true, 'Zero-calorie natural sweetener');

-- ==============================================
-- 2. CREATE SAMPLE SMOOTHIE RECIPES
-- ==============================================

-- Insert sample smoothies into system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('sample_smoothies', '[
  {
    "name": "Energy Boost",
    "ingredients": ["banana", "strawberry", "almond_milk", "protein_powder_vanilla", "spinach"],
    "target_nutrients": ["protein", "iron", "vitamin_c"],
    "health_goals": ["energy", "muscle-gain"]
  },
  {
    "name": "Immune Defender",
    "ingredients": ["orange", "kiwi", "spinach", "ginger", "honey"],
    "target_nutrients": ["vitamin_c", "iron", "magnesium"],
    "health_goals": ["immune-support", "energy"]
  },
  {
    "name": "Weight Loss Warrior",
    "ingredients": ["blueberry", "spinach", "protein_powder_chocolate", "flax_seeds", "water"],
    "target_nutrients": ["protein", "fiber", "omega3"],
    "health_goals": ["weight-loss", "muscle-gain"]
  }
]'::JSONB, 'json', 'Sample smoothie recipes for testing', false);

-- ==============================================
-- 3. SET UP DEFAULT DELIVERY PARTNERS
-- ==============================================

INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('delivery_partners', '[
  {
    "name": "Swiss Post",
    "service_type": "standard",
    "delivery_time": "1-3 business days",
    "cost_chf": 8.50,
    "regions": ["all"]
  },
  {
    "name": "DHL Express",
    "service_type": "express",
    "delivery_time": "next day",
    "cost_chf": 25.00,
    "regions": ["all"]
  },
  {
    "name": "Local Courier",
    "service_type": "same-day",
    "delivery_time": "same day",
    "cost_chf": 15.00,
    "regions": ["zurich", "geneva", "basel"]
  }
]'::JSONB, 'json', 'Available delivery partners and pricing', false);

-- ==============================================
-- 4. SUCCESS MESSAGE
-- ==============================================

SELECT 'DATABASE POPULATION COMPLETED! 🌱' as status,
       'Ingredients, sample recipes, and delivery partners added.' as message,
       'Your XOVA platform is ready for users!' as details;
