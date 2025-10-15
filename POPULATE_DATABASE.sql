-- XOVA DATABASE POPULATION
-- Run this after the main database setup to populate with essential data

-- ==============================================
-- 1. POPULATE INGREDIENTS TABLE
-- ==============================================

-- Clear existing ingredients first
DELETE FROM ingredients;

-- Insert comprehensive ingredient database
INSERT INTO ingredients (name, display_name, cost_per_100g, category, subcategory, protein, carbs, fiber, fat, calories, iron, vitamin_c, calcium, magnesium, potassium, folate, omega3, zinc, vitamin_d, energy_boost, muscle_recovery, weight_loss, immune_support, heart_health, digestive_health, anti_aging, stress_relief, contains_gluten, contains_dairy, contains_nuts, contains_soy, is_vegan, is_vegetarian, description) VALUES

-- FRUITS
('banana', 'Banana', 0.25, 'fruit', 'tropical', 1.1, 22.8, 2.6, 0.3, 89, 0.26, 8.7, 5, 27, 358, 20, 0, 0.15, 0, true, true, false, true, true, true, true, false, false, false, false, false, true, true, 'Natural sweetness and potassium for energy'),
('strawberry', 'Strawberry', 1.20, 'fruit', 'berry', 0.7, 7.7, 2.0, 0.3, 32, 0.41, 58.8, 16, 13, 153, 24, 0, 0.14, 0, true, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Vitamin C powerhouse with antioxidants'),
('blueberry', 'Blueberry', 2.50, 'fruit', 'berry', 0.7, 14.5, 2.4, 0.3, 57, 0.28, 9.7, 6, 6, 77, 6, 0, 0.16, 0, true, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Antioxidant-rich superfruit'),
('mango', 'Mango', 0.80, 'fruit', 'tropical', 0.8, 15.0, 1.6, 0.4, 60, 0.13, 36.4, 11, 10, 168, 43, 0, 0.09, 0, true, false, false, true, false, true, true, false, false, false, false, false, true, true, 'Tropical sweetness with vitamin A'),
('apple', 'Apple', 0.60, 'fruit', 'pome', 0.3, 13.8, 2.4, 0.2, 52, 0.12, 4.6, 6, 5, 107, 3, 0, 0.04, 0, true, false, true, true, true, true, false, false, false, false, false, false, true, true, 'Fiber-rich with natural sweetness'),
('pineapple', 'Pineapple', 0.70, 'fruit', 'tropical', 0.5, 13.1, 1.4, 0.1, 50, 0.29, 47.8, 13, 12, 109, 18, 0, 0.12, 0, true, false, true, true, false, true, true, false, false, false, false, false, true, true, 'Digestive enzyme bromelain'),
('orange', 'Orange', 0.45, 'fruit', 'citrus', 0.9, 11.8, 2.4, 0.1, 47, 0.10, 53.2, 40, 10, 181, 30, 0, 0.07, 0, true, false, false, true, true, true, true, false, false, false, false, false, true, true, 'Vitamin C and citrus flavor'),
('kiwi', 'Kiwi', 1.80, 'fruit', 'berry', 1.1, 14.7, 3.0, 0.5, 61, 0.31, 92.7, 34, 17, 312, 25, 0, 0.14, 0, true, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Highest vitamin C content'),
('avocado', 'Avocado', 1.50, 'fruit', 'tropical', 2.0, 8.5, 6.7, 14.7, 160, 0.55, 10.0, 12, 29, 485, 81, 0.11, 0.64, 0, false, true, false, false, true, true, true, false, false, false, false, false, true, true, 'Healthy fats and fiber'),
('coconut', 'Coconut', 0.90, 'fruit', 'tropical', 3.3, 15.2, 9.0, 33.5, 354, 2.43, 3.3, 14, 32, 356, 26, 0, 1.10, 0, true, false, false, false, true, false, false, false, false, false, false, false, true, true, 'Natural electrolytes and MCTs'),

-- VEGETABLES
('spinach', 'Spinach', 0.80, 'vegetable', 'leafy_green', 2.9, 3.6, 2.2, 0.4, 23, 2.71, 28.1, 99, 79, 558, 194, 0, 0.53, 0, false, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Iron and folate powerhouse'),
('kale', 'Kale', 0.70, 'vegetable', 'leafy_green', 4.3, 8.8, 3.6, 0.9, 49, 1.47, 120.0, 150, 47, 491, 62, 0, 0.65, 0, false, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Superfood green with vitamin K'),
('carrot', 'Carrot', 0.30, 'vegetable', 'root', 0.9, 9.6, 2.8, 0.2, 41, 0.30, 5.9, 33, 12, 320, 19, 0, 0.24, 0, true, false, true, true, true, true, true, false, false, false, false, false, true, true, 'Beta-carotene for eye health'),
('beetroot', 'Beetroot', 0.40, 'vegetable', 'root', 1.6, 9.6, 2.8, 0.2, 43, 0.80, 4.9, 16, 23, 325, 109, 0, 0.35, 0, true, false, true, false, true, true, false, false, false, false, false, false, true, true, 'Natural nitrates for performance'),
('cucumber', 'Cucumber', 0.25, 'vegetable', 'gourd', 0.7, 3.6, 0.5, 0.1, 16, 0.28, 2.8, 16, 13, 147, 7, 0, 0.20, 0, false, false, true, false, false, true, false, false, false, false, false, false, true, true, 'Hydrating and low calorie'),
('celery', 'Celery', 0.35, 'vegetable', 'stalk', 0.7, 3.0, 1.6, 0.2, 16, 0.20, 3.1, 40, 11, 260, 36, 0, 0.13, 0, false, false, true, false, false, true, false, false, false, false, false, false, true, true, 'Natural electrolytes and fiber'),

-- LIQUIDS
('almond_milk', 'Almond Milk', 0.15, 'liquid', 'nut_milk', 0.6, 1.5, 0.4, 1.1, 17, 0.28, 0, 188, 15, 63, 1, 0, 0.20, 0, false, false, true, false, true, true, false, false, false, false, true, false, true, true, 'Low-calorie nut milk'),
('coconut_milk', 'Coconut Milk', 0.20, 'liquid', 'plant_milk', 2.3, 6.0, 2.2, 23.8, 230, 1.64, 2.8, 16, 37, 263, 16, 0, 0.67, 0, true, false, false, false, true, false, false, false, false, false, false, false, true, true, 'Creamy with medium-chain triglycerides'),
('oat_milk', 'Oat Milk', 0.18, 'liquid', 'grain_milk', 1.0, 7.0, 0.8, 1.5, 43, 0.26, 0, 120, 10, 35, 5, 0, 0.30, 0, true, false, false, false, true, true, false, true, false, false, false, false, true, true, 'Creamy with beta-glucan fiber'),
('water', 'Water', 0.00, 'liquid', 'base', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false, true, false, false, true, false, false, false, false, false, false, true, true, 'Pure hydration base'),
('green_tea', 'Green Tea', 0.05, 'liquid', 'tea', 0.2, 0.0, 0.0, 0.0, 1, 0.02, 0, 0, 1, 8, 0, 0, 0.01, 0, true, false, true, true, true, true, true, true, false, false, false, false, true, true, 'Antioxidant-rich with L-theanine'),

-- PROTEINS
('protein_powder_vanilla', 'Vanilla Protein Powder', 2.50, 'protein', 'whey', 75.0, 5.0, 3.0, 2.0, 340, 5.0, 0, 200, 100, 300, 50, 0, 8.0, 5.0, true, true, true, true, false, true, true, false, false, false, false, false, false, false, 'High-quality whey protein isolate'),
('protein_powder_chocolate', 'Chocolate Protein Powder', 2.50, 'protein', 'whey', 75.0, 5.0, 3.0, 2.0, 340, 5.0, 0, 200, 100, 300, 50, 0, 8.0, 5.0, true, true, true, true, false, true, true, false, false, false, false, false, false, false, 'Chocolate whey protein isolate'),
('plant_protein_vanilla', 'Vanilla Plant Protein', 2.80, 'protein', 'plant', 70.0, 8.0, 5.0, 3.0, 330, 8.0, 0, 150, 120, 400, 60, 0.5, 6.0, 3.0, true, true, true, true, false, true, true, false, false, false, true, false, true, true, 'Pea and rice protein blend'),
('greek_yogurt', 'Greek Yogurt', 0.60, 'protein', 'dairy', 10.0, 3.6, 0.0, 0.4, 59, 0.04, 1.2, 110, 11, 141, 12, 0, 0.52, 0, false, true, false, true, false, true, false, false, true, false, false, false, false, true, 'Probiotic-rich protein source'),

-- SUPPLEMENTS & SUPERFOODS
('spirulina', 'Spirulina', 8.00, 'supplement', 'algae', 57.5, 23.9, 3.6, 7.7, 290, 28.5, 10.1, 120, 195, 1363, 94, 0.82, 2.0, 0, true, true, true, true, true, true, true, true, false, false, false, false, true, true, 'Complete protein algae superfood'),
('chia_seeds', 'Chia Seeds', 1.50, 'supplement', 'seed', 16.5, 42.1, 34.4, 30.7, 486, 7.7, 1.6, 631, 335, 407, 49, 17.8, 4.6, 0, true, true, true, true, true, true, true, false, false, false, false, false, true, true, 'Omega-3 and fiber powerhouse'),
('hemp_seeds', 'Hemp Seeds', 2.20, 'supplement', 'seed', 31.6, 8.7, 4.0, 48.8, 553, 7.9, 1.0, 70, 700, 1200, 110, 8.7, 9.9, 0, true, true, true, true, true, true, true, false, false, false, false, false, true, true, 'Complete amino acid profile'),
('flax_seeds', 'Flax Seeds', 1.20, 'supplement', 'seed', 18.3, 28.9, 27.3, 42.2, 534, 5.7, 0.6, 255, 392, 813, 87, 22.8, 4.3, 0, true, true, true, true, true, true, true, false, false, false, false, false, true, true, 'Lignans and omega-3 fatty acids'),
('maca_powder', 'Maca Powder', 4.50, 'supplement', 'root', 14.3, 59.0, 8.5, 2.2, 325, 16.6, 285.0, 150, 104, 2050, 79, 0, 3.8, 0, true, false, false, true, false, true, true, true, false, false, false, false, true, true, 'Adaptogenic hormone support'),
('cacao_powder', 'Cacao Powder', 3.20, 'supplement', 'superfood', 19.6, 57.9, 33.2, 13.7, 228, 13.9, 0, 128, 499, 1524, 32, 0, 6.8, 0, true, false, true, true, true, true, true, true, false, false, false, false, true, true, 'Raw chocolate with antioxidants'),
('turmeric', 'Turmeric', 2.80, 'supplement', 'spice', 7.8, 64.9, 21.1, 9.9, 354, 41.4, 25.9, 168, 208, 2525, 20, 0, 4.5, 0, false, true, false, true, true, true, true, true, false, false, false, false, true, true, 'Anti-inflammatory curcumin'),
('ginger', 'Ginger', 1.50, 'supplement', 'spice', 1.8, 17.8, 2.0, 0.8, 80, 0.6, 5.0, 16, 43, 415, 11, 0, 0.34, 0, true, false, true, true, true, true, true, true, false, false, false, false, true, true, 'Digestive and anti-nausea support'),

-- SWEETENERS
('honey', 'Honey', 0.80, 'sweetener', 'natural', 0.3, 82.4, 0.2, 0.0, 304, 0.42, 0.5, 6, 2, 52, 2, 0, 0.22, 0, true, false, false, true, false, true, false, true, false, false, false, false, true, true, 'Natural antibacterial sweetness'),
('maple_syrup', 'Maple Syrup', 0.60, 'sweetener', 'natural', 0.0, 67.0, 0.0, 0.0, 260, 0.11, 0, 102, 14, 212, 0, 0, 4.16, 0, true, false, false, false, false, true, false, false, false, false, false, false, true, true, 'Mineral-rich natural sweetener'),
('dates', 'Dates', 0.70, 'sweetener', 'fruit', 2.5, 75.0, 8.0, 0.4, 277, 1.02, 0.4, 64, 54, 696, 15, 0, 0.44, 0, true, false, false, false, false, true, false, false, false, false, false, false, true, true, 'Fiber-rich natural sweetener'),
('stevia', 'Stevia', 1.50, 'sweetener', 'artificial', 0.0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false, true, false, false, true, false, false, false, false, false, false, true, true, 'Zero-calorie natural sweetener');

-- ==============================================
-- 2. CREATE SAMPLE SMOOTHIE RECIPES
-- ==============================================

-- Note: This would require a smoothie_recipes table
-- For now, we'll create some sample data in the system_settings

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
