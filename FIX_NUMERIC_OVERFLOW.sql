-- FIX NUMERIC OVERFLOW ISSUE
-- Update column sizes to accommodate larger nutritional values

-- ==============================================
-- 1. UPDATE INGREDIENTS TABLE COLUMN SIZES
-- ==============================================

-- Update macronutrients to handle larger values
ALTER TABLE ingredients 
ALTER COLUMN protein TYPE DECIMAL(6,2),
ALTER COLUMN carbs TYPE DECIMAL(6,2),
ALTER COLUMN fiber TYPE DECIMAL(6,2),
ALTER COLUMN fat TYPE DECIMAL(6,2);

-- Update micronutrients to handle larger values  
ALTER TABLE ingredients 
ALTER COLUMN iron TYPE DECIMAL(7,2),
ALTER COLUMN vitamin_c TYPE DECIMAL(7,2),
ALTER COLUMN vitamin_a TYPE DECIMAL(7,2),
ALTER COLUMN calcium TYPE DECIMAL(7,2),
ALTER COLUMN magnesium TYPE DECIMAL(7,2),
ALTER COLUMN potassium TYPE DECIMAL(7,2),
ALTER COLUMN folate TYPE DECIMAL(7,2),
ALTER COLUMN omega3 TYPE DECIMAL(7,2),
ALTER COLUMN zinc TYPE DECIMAL(7,2),
ALTER COLUMN vitamin_d TYPE DECIMAL(7,2);

-- Update cost to handle higher prices
ALTER TABLE ingredients 
ALTER COLUMN cost_per_100g TYPE DECIMAL(8,2);

-- Update density to handle higher values
ALTER TABLE ingredients 
ALTER COLUMN density TYPE DECIMAL(6,2);

-- ==============================================
-- 2. SUCCESS MESSAGE
-- ==============================================

SELECT 'NUMERIC OVERFLOW FIXED! 🔧' as status,
       'Column sizes updated to handle larger nutritional values.' as message,
       'You can now run the population script without errors.' as details;
