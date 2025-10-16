import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface NutritionalProfile {
  user_id: string;
  activity_level: string;
  health_goals: string[];
  dietary_restrictions: string[];
  allergens: string[];
  preferences: string[];
  daily_targets: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    iron: number;
    vitamin_c: number;
    calcium: number;
    magnesium: number;
    omega3: number;
  };
  scientific_rationale: string;
  priority_nutrients: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  display_name: string;
  cost_per_100g: number;
  category: string;
  subcategory: string;
  protein: number;
  carbs: number;
  fiber: number;
  fat: number;
  calories: number;
  iron: number;
  vitamin_c: number;
  calcium: number;
  magnesium: number;
  potassium: number;
  folate: number;
  omega3: number;
  zinc: number;
  vitamin_d: number;
  energy_boost: boolean;
  muscle_recovery: boolean;
  weight_loss: boolean;
  immune_support: boolean;
  heart_health: boolean;
  digestive_health: boolean;
  anti_aging: boolean;
  stress_relief: boolean;
  contains_gluten: boolean;
  contains_dairy: boolean;
  contains_nuts: boolean;
  contains_soy: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  description: string;
}

export interface SmoothieRecipe {
  id: string;
  name: string;
  flavor_profile: string;
  time_of_day: string;
  tier: 'essential' | 'enhanced' | 'premium';
  ingredients: {
    ingredient: Ingredient;
    amount_grams: number;
  }[];
  nutritional_breakdown: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    fat: number;
    iron: number;
    vitamin_c: number;
    calcium: number;
    magnesium: number;
    omega3: number;
  };
  health_benefits: string[];
  price: {
    seven_day: number;
    fourteen_day: number;
  };
  preparation_instructions: string[];
  scientific_rationale: string;
}

class SmoothieGenerator {
  private ingredients: Ingredient[] = [];
  private loaded = false;

  async loadIngredients(): Promise<void> {
    if (this.loaded) return;

    try {
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error loading ingredients:', error);
        // Use fallback ingredients if database fails
        this.ingredients = this.getFallbackIngredients();
      } else {
        this.ingredients = data || [];
        console.log(`Loaded ${this.ingredients.length} ingredients from database`);
      }

      this.loaded = true;
    } catch (error) {
      console.error('Error in loadIngredients:', error);
      this.ingredients = this.getFallbackIngredients();
      this.loaded = true;
    }
  }

  private getFallbackIngredients(): Ingredient[] {
    return [
      {
        id: 'banana',
        name: 'banana',
        display_name: 'Banana',
        cost_per_100g: 0.25,
        category: 'fruit',
        subcategory: 'tropical',
        protein: 1.1,
        carbs: 22.8,
        fiber: 2.6,
        fat: 0.3,
        calories: 89,
        iron: 0.26,
        vitamin_c: 8.7,
        calcium: 5,
        magnesium: 27,
        potassium: 358,
        folate: 20,
        omega3: 0,
        zinc: 0.15,
        vitamin_d: 0,
        energy_boost: true,
        muscle_recovery: true,
        weight_loss: false,
        immune_support: true,
        heart_health: true,
        digestive_health: true,
        anti_aging: true,
        stress_relief: false,
        contains_gluten: false,
        contains_dairy: false,
        contains_nuts: false,
        contains_soy: false,
        is_vegan: true,
        is_vegetarian: true,
        description: 'Natural sweetness and potassium for energy'
      },
      {
        id: 'strawberry',
        name: 'strawberry',
        display_name: 'Strawberry',
        cost_per_100g: 1.20,
        category: 'fruit',
        subcategory: 'berry',
        protein: 0.7,
        carbs: 7.7,
        fiber: 2.0,
        fat: 0.3,
        calories: 32,
        iron: 0.41,
        vitamin_c: 58.8,
        calcium: 16,
        magnesium: 13,
        potassium: 153,
        folate: 24,
        omega3: 0,
        zinc: 0.14,
        vitamin_d: 0,
        energy_boost: true,
        muscle_recovery: false,
        weight_loss: true,
        immune_support: true,
        heart_health: true,
        digestive_health: true,
        anti_aging: true,
        stress_relief: false,
        contains_gluten: false,
        contains_dairy: false,
        contains_nuts: false,
        contains_soy: false,
        is_vegan: true,
        is_vegetarian: true,
        description: 'Vitamin C powerhouse with antioxidants'
      },
      {
        id: 'spinach',
        name: 'spinach',
        display_name: 'Spinach',
        cost_per_100g: 0.80,
        category: 'vegetable',
        subcategory: 'leafy_green',
        protein: 2.9,
        carbs: 3.6,
        fiber: 2.2,
        fat: 0.4,
        calories: 23,
        iron: 2.71,
        vitamin_c: 28.1,
        calcium: 99,
        magnesium: 79,
        potassium: 558,
        folate: 194,
        omega3: 0,
        zinc: 0.53,
        vitamin_d: 0,
        energy_boost: false,
        muscle_recovery: false,
        weight_loss: true,
        immune_support: true,
        heart_health: true,
        digestive_health: true,
        anti_aging: true,
        stress_relief: false,
        contains_gluten: false,
        contains_dairy: false,
        contains_nuts: false,
        contains_soy: false,
        is_vegan: true,
        is_vegetarian: true,
        description: 'Iron and folate powerhouse'
      },
      {
        id: 'protein_powder_vanilla',
        name: 'protein_powder_vanilla',
        display_name: 'Vanilla Protein Powder',
        cost_per_100g: 2.50,
        category: 'protein',
        subcategory: 'whey',
        protein: 75.0,
        carbs: 5.0,
        fiber: 3.0,
        fat: 2.0,
        calories: 340,
        iron: 5.0,
        vitamin_c: 0,
        calcium: 200,
        magnesium: 100,
        potassium: 300,
        folate: 50,
        omega3: 0,
        zinc: 8.0,
        vitamin_d: 5.0,
        energy_boost: true,
        muscle_recovery: true,
        weight_loss: true,
        immune_support: true,
        heart_health: false,
        digestive_health: true,
        anti_aging: true,
        stress_relief: false,
        contains_gluten: false,
        contains_dairy: false,
        contains_nuts: false,
        contains_soy: false,
        is_vegan: false,
        is_vegetarian: false,
        description: 'High-quality whey protein isolate'
      },
      {
        id: 'almond_milk',
        name: 'almond_milk',
        display_name: 'Almond Milk',
        cost_per_100g: 0.15,
        category: 'liquid',
        subcategory: 'nut_milk',
        protein: 0.6,
        carbs: 1.5,
        fiber: 0.4,
        fat: 1.1,
        calories: 17,
        iron: 0.28,
        vitamin_c: 0,
        calcium: 188,
        magnesium: 15,
        potassium: 63,
        folate: 1,
        omega3: 0,
        zinc: 0.20,
        vitamin_d: 0,
        energy_boost: false,
        muscle_recovery: false,
        weight_loss: true,
        immune_support: false,
        heart_health: true,
        digestive_health: true,
        anti_aging: false,
        stress_relief: false,
        contains_gluten: false,
        contains_dairy: false,
        contains_nuts: true,
        contains_soy: false,
        is_vegan: true,
        is_vegetarian: true,
        description: 'Low-calorie nut milk'
      }
    ];
  }

  async generateSmoothieRecipes(profile: NutritionalProfile, count: number = 21): Promise<SmoothieRecipe[]> {
    await this.loadIngredients();

    const recipes: SmoothieRecipe[] = [];
    const usedCombinations = new Set<string>();
    const baseIngredients = this.getBaseIngredients(profile);
    
    // Generate mix of tiers: 50% essential, 35% enhanced, 15% premium
    const essentialCount = Math.floor(count * 0.5);
    const enhancedCount = Math.floor(count * 0.35);
    const premiumCount = count - essentialCount - enhancedCount;
    
    // Generate Essential tier recipes (CHF 12/11)
    let essentialGenerated = 0;
    let attempts = 0;
    while (essentialGenerated < essentialCount && attempts < essentialCount * 3) {
      try {
        const recipe = this.generateSingleRecipe(profile, baseIngredients, essentialGenerated, 'essential');
        const combinationKey = this.createCombinationKey(recipe);
        
        if (!usedCombinations.has(combinationKey)) {
          recipes.push(recipe);
          usedCombinations.add(combinationKey);
          essentialGenerated++;
        }
      } catch (error) {
        console.error(`Error generating essential recipe ${essentialGenerated}:`, error);
      }
      attempts++;
    }
    
    // Generate Enhanced tier recipes (CHF 15/14)
    let enhancedGenerated = 0;
    attempts = 0;
    while (enhancedGenerated < enhancedCount && attempts < enhancedCount * 3) {
      try {
        const recipe = this.generateSingleRecipe(profile, baseIngredients, essentialGenerated + enhancedGenerated, 'enhanced');
        const combinationKey = this.createCombinationKey(recipe);
        
        if (!usedCombinations.has(combinationKey)) {
          recipes.push(recipe);
          usedCombinations.add(combinationKey);
          enhancedGenerated++;
        }
      } catch (error) {
        console.error(`Error generating enhanced recipe ${enhancedGenerated}:`, error);
      }
      attempts++;
    }
    
    // Generate Premium tier recipes (CHF 18/17)
    let premiumGenerated = 0;
    attempts = 0;
    while (premiumGenerated < premiumCount && attempts < premiumCount * 3) {
      try {
        const recipe = this.generateSingleRecipe(profile, baseIngredients, essentialGenerated + enhancedGenerated + premiumGenerated, 'premium');
        const combinationKey = this.createCombinationKey(recipe);
        
        if (!usedCombinations.has(combinationKey)) {
          recipes.push(recipe);
          usedCombinations.add(combinationKey);
          premiumGenerated++;
        }
      } catch (error) {
        console.error(`Error generating premium recipe ${premiumGenerated}:`, error);
      }
      attempts++;
    }

    console.log(`Generated ${recipes.length} unique smoothie recipes (Essential: ${essentialGenerated}, Enhanced: ${enhancedGenerated}, Premium: ${premiumGenerated})`);
    return recipes;
  }

  private createCombinationKey(recipe: SmoothieRecipe): string {
    // Create a unique key based on ingredient names and tier
    const ingredientNames = recipe.ingredients
      .map(ing => ing.ingredient.name)
      .sort()
      .join(',');
    return `${recipe.tier}-${ingredientNames}`;
  }

  private getBaseIngredients(profile: NutritionalProfile): Ingredient[] {
    let availableIngredients = [...this.ingredients];

    // Filter by dietary restrictions
    if (profile.dietary_restrictions.includes('vegan')) {
      availableIngredients = availableIngredients.filter(ing => ing.is_vegan);
    }
    if (profile.dietary_restrictions.includes('vegetarian')) {
      availableIngredients = availableIngredients.filter(ing => ing.is_vegetarian);
    }
    if (profile.dietary_restrictions.includes('dairy-free')) {
      availableIngredients = availableIngredients.filter(ing => !ing.contains_dairy);
    }
    if (profile.dietary_restrictions.includes('gluten-free')) {
      availableIngredients = availableIngredients.filter(ing => !ing.contains_gluten);
    }

    // Filter by allergens
    for (const allergen of profile.allergens) {
      switch (allergen) {
        case 'nuts':
          availableIngredients = availableIngredients.filter(ing => !ing.contains_nuts);
          break;
        case 'dairy':
          availableIngredients = availableIngredients.filter(ing => !ing.contains_dairy);
          break;
        case 'soy':
          availableIngredients = availableIngredients.filter(ing => !ing.contains_soy);
          break;
      }
    }

    return availableIngredients;
  }

  private generateSingleRecipe(profile: NutritionalProfile, availableIngredients: Ingredient[], index: number, tier: 'essential' | 'enhanced' | 'premium'): SmoothieRecipe {
    // Select ingredients based on tier and health goals
    const selectedIngredients = this.selectIngredientsByTier(profile, availableIngredients, index, tier);
    
    // Calculate nutritional breakdown
    const nutritionalBreakdown = this.calculateNutritionalBreakdown(selectedIngredients);
    
    // Generate recipe name and description
    const { name, flavorProfile, timeOfDay } = this.generateRecipeName(selectedIngredients, profile, tier);
    
    // Generate health benefits
    const healthBenefits = this.generateHealthBenefits(selectedIngredients, profile, tier);
    
    // Set pricing based on tier
    const price = this.getTierPricing(tier);
    
    // Generate preparation instructions
    const instructions = this.generateInstructions(selectedIngredients);
    
    // Generate scientific rationale
    const scientificRationale = this.generateScientificRationale(selectedIngredients, profile);

    return {
      id: `smoothie-${tier}-${index + 1}`,
      name,
      flavor_profile: flavorProfile,
      time_of_day: timeOfDay,
      tier,
      ingredients: selectedIngredients.map(ing => ({
        ingredient: ing.ingredient,
        amount_grams: ing.amount_grams
      })),
      nutritional_breakdown: nutritionalBreakdown,
      health_benefits: healthBenefits,
      price,
      preparation_instructions: instructions,
      scientific_rationale: scientificRationale
    };
  }

  private getTierPricing(tier: 'essential' | 'enhanced' | 'premium'): {seven_day: number, fourteen_day: number} {
    const pricing = {
      essential: { seven_day: 12, fourteen_day: 11 },
      enhanced: { seven_day: 15, fourteen_day: 14 },
      premium: { seven_day: 18, fourteen_day: 17 }
    };
    return pricing[tier];
  }

  private getIngredientTier(ingredient: Ingredient): 'base' | 'premium' | 'luxury' {
    // Define ingredient tiers based on cost and category
    const premiumIngredients = ['spirulina', 'acai_berry', 'goji_berry', 'maca_powder', 'cacao_powder', 'turmeric'];
    const luxuryIngredients = ['dragon_fruit', 'passion_fruit', 'hemp_seeds', 'chia_seeds'];
    
    if (luxuryIngredients.includes(ingredient.name)) return 'luxury';
    if (premiumIngredients.includes(ingredient.name) || ingredient.cost_per_100g > 3.0) return 'premium';
    return 'base';
  }

  private selectIngredientsByTier(profile: NutritionalProfile, availableIngredients: Ingredient[], index: number, tier: 'essential' | 'enhanced' | 'premium'): Array<{ingredient: Ingredient, amount_grams: number}> {
    const selected: Array<{ingredient: Ingredient, amount_grams: number}> = [];
    
    // Filter ingredients by tier
    let tierIngredients = availableIngredients;
    if (tier === 'essential') {
      // Only base ingredients (cost < 3.0 CHF per 100g)
      tierIngredients = availableIngredients.filter(ing => ing.cost_per_100g < 3.0);
    } else if (tier === 'enhanced') {
      // Base + premium ingredients (cost < 8.0 CHF per 100g)
      tierIngredients = availableIngredients.filter(ing => ing.cost_per_100g < 8.0);
    }
    // Premium tier can use all ingredients
    
    // Create recipe themes for variety
    const recipeThemes = [
      'tropical', 'berry', 'green', 'citrus', 'creamy', 'nutty', 'spiced'
    ];
    const selectedTheme = recipeThemes[index % recipeThemes.length];

    // Always include a base liquid based on theme
    const liquids = tierIngredients.filter(ing => ing.category === 'liquid');
    if (liquids.length > 0) {
      const themeLiquid = this.selectLiquidByTheme(liquids, selectedTheme);
      selected.push({
        ingredient: themeLiquid,
        amount_grams: 200
      });
    }

    // Add fruits based on theme and tier
    const fruits = tierIngredients.filter(ing => ing.category === 'fruit');
    const themeFruits = this.selectFruitsByTheme(fruits, selectedTheme);
    const fruitCount = tier === 'premium' ? 3 : 2;
    for (let i = 0; i < Math.min(fruitCount, themeFruits.length); i++) {
      const fruit = themeFruits[i % themeFruits.length];
      const amount = 80 + (i * 20); // 80g, 100g, 120g
      selected.push({
        ingredient: fruit,
        amount_grams: amount
      });
    }

    // Add protein based on goals and tier
    if (profile.health_goals.includes('muscle-gain') || tier !== 'essential') {
      const proteins = tierIngredients.filter(ing => ing.category === 'protein');
      if (proteins.length > 0) {
        const goalProtein = this.selectProteinByGoal(proteins, profile.health_goals);
        selected.push({
          ingredient: goalProtein,
          amount_grams: tier === 'premium' ? 40 : 30
        });
      }
    }

    // Add vegetables based on theme
    const vegetables = tierIngredients.filter(ing => ing.category === 'vegetable');
    if (vegetables.length > 0) {
      const themeVegetables = this.selectVegetablesByTheme(vegetables, selectedTheme);
      const veggieCount = tier === 'premium' ? 2 : 1;
      for (let i = 0; i < Math.min(veggieCount, themeVegetables.length); i++) {
        const veggie = themeVegetables[i % themeVegetables.length];
        selected.push({
          ingredient: veggie,
          amount_grams: 30 + (i * 20) // 30g, 50g
        });
      }
    }


    // Add superfoods for enhanced and premium tiers
    if (tier !== 'essential') {
      const superfoods = tierIngredients.filter(ing => 
        ing.category === 'supplement' || 
        ing.name.includes('seed') || 
        ing.name.includes('berry') && ing.cost_per_100g > 2.0
      );
      
      if (superfoods.length > 0 && tier === 'enhanced') {
        // Add 1 superfood for enhanced
        const superfood = superfoods[index % superfoods.length];
        selected.push({
          ingredient: superfood,
          amount_grams: 10
        });
      } else if (superfoods.length > 0 && tier === 'premium') {
        // Add 2 superfoods for premium
        for (let i = 0; i < Math.min(2, superfoods.length); i++) {
          const superfood = superfoods[(index + i) % superfoods.length];
          selected.push({
            ingredient: superfood,
            amount_grams: 15
          });
        }
      }
    }

    return selected;
  }

  private calculateNutritionalBreakdown(ingredients: Array<{ingredient: Ingredient, amount_grams: number}>): any {
    let total = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fiber: 0,
      fat: 0,
      iron: 0,
      vitamin_c: 0,
      calcium: 0,
      magnesium: 0,
      omega3: 0
    };

    for (const { ingredient, amount_grams } of ingredients) {
      const multiplier = amount_grams / 100;
      total.calories += ingredient.calories * multiplier;
      total.protein += ingredient.protein * multiplier;
      total.carbs += ingredient.carbs * multiplier;
      total.fiber += ingredient.fiber * multiplier;
      total.fat += ingredient.fat * multiplier;
      total.iron += ingredient.iron * multiplier;
      total.vitamin_c += ingredient.vitamin_c * multiplier;
      total.calcium += ingredient.calcium * multiplier;
      total.magnesium += ingredient.magnesium * multiplier;
      total.omega3 += ingredient.omega3 * multiplier;
    }

    // Round to reasonable precision
    return {
      calories: Math.round(total.calories),
      protein: Math.round(total.protein * 10) / 10,
      carbs: Math.round(total.carbs * 10) / 10,
      fiber: Math.round(total.fiber * 10) / 10,
      fat: Math.round(total.fat * 10) / 10,
      iron: Math.round(total.iron * 100) / 100,
      vitamin_c: Math.round(total.vitamin_c * 10) / 10,
      calcium: Math.round(total.calcium * 10) / 10,
      magnesium: Math.round(total.magnesium * 10) / 10,
      omega3: Math.round(total.omega3 * 100) / 100
    };
  }

  private generateRecipeName(ingredients: Array<{ingredient: Ingredient}>, profile: NutritionalProfile, tier: 'essential' | 'enhanced' | 'premium'): {name: string, flavorProfile: string, timeOfDay: string} {
    const primaryFruit = ingredients.find(ing => ing.ingredient.category === 'fruit');
    const primaryGoal = profile.health_goals[0] || 'balanced';
    
    // Create beautiful, unique names based on theme and ingredients
    const fruitNames = {
      'banana': 'Golden',
      'strawberry': 'Ruby',
      'blueberry': 'Sapphire',
      'mango': 'Sunset',
      'pineapple': 'Tropical',
      'apple': 'Crisp',
      'orange': 'Citrus',
      'kiwi': 'Emerald',
      'avocado': 'Creamy',
      'pear': 'Delicate',
      'lemon': 'Zesty',
      'grapefruit': 'Pink',
      'raspberry': 'Crimson',
      'blackberry': 'Midnight',
      'coconut': 'Island'
    };

    const themeNames = {
      'tropical': ['Breeze', 'Paradise', 'Island', 'Sunset', 'Oasis'],
      'berry': ['Berry Bliss', 'Berry Burst', 'Berry Dream', 'Berry Fusion', 'Berry Harmony'],
      'green': ['Green Goddess', 'Nature\'s Gift', 'Vitality', 'Pure Green', 'Fresh Start'],
      'citrus': ['Sunrise', 'Morning Glory', 'Golden Hour', 'Fresh Zest', 'Bright Start'],
      'creamy': ['Silk', 'Velvet', 'Smooth Operator', 'Cream Dream', 'Luxury'],
      'nutty': ['Nutty Delight', 'Crunch Time', 'Nourish', 'Rich Blend', 'Satisfaction'],
      'spiced': ['Spice Route', 'Warm Embrace', 'Golden Spice', 'Comfort', 'Cozy']
    };

    const goalThemes = {
      'energy': 'Vitality',
      'weight-loss': 'Slim',
      'muscle-gain': 'Strength',
      'immune-support': 'Defense',
      'heart-health': 'Heart',
      'stress-relief': 'Zen'
    };

    // Determine theme based on ingredients
    const theme = this.determineTheme(ingredients);
    const fruitName = primaryFruit ? fruitNames[primaryFruit.ingredient.name.toLowerCase()] || primaryFruit.ingredient.display_name : 'Berry';
    const goalTheme = goalThemes[primaryGoal] || 'Balance';
    
    // Create unique combinations
    const themeOptions = themeNames[theme] || ['Blend', 'Fusion', 'Mix', 'Delight'];
    const themeName = themeOptions[Math.floor(Math.random() * themeOptions.length)];
    
    // Tier-specific naming
    let name = '';
    if (tier === 'premium') {
      name = `${fruitName} ${themeName} Elite`;
    } else if (tier === 'enhanced') {
      name = `${fruitName} ${themeName} Pro`;
    } else {
      name = `${fruitName} ${themeName}`;
    }

    // Add goal-specific suffix occasionally
    if (Math.random() > 0.7) {
      name += ` ${goalTheme}`;
    }

    // Determine time of day based on ingredients and goals
    const timeOfDay = this.determineTimeOfDay(ingredients, profile.health_goals);

    return {
      name,
      flavorProfile: tier === 'premium' ? 'Gourmet & Complex' : tier === 'enhanced' ? 'Rich & Balanced' : 'Pure & Natural',
      timeOfDay
    };
  }

  private determineTheme(ingredients: Array<{ingredient: Ingredient}>): string {
    const fruitNames = ingredients.map(ing => ing.ingredient.name.toLowerCase());
    
    if (fruitNames.some(name => ['mango', 'pineapple', 'coconut', 'passion fruit'].includes(name))) {
      return 'tropical';
    }
    if (fruitNames.some(name => ['strawberry', 'blueberry', 'raspberry', 'blackberry'].includes(name))) {
      return 'berry';
    }
    if (fruitNames.some(name => ['kiwi', 'green apple', 'lime'].includes(name))) {
      return 'green';
    }
    if (fruitNames.some(name => ['orange', 'lemon', 'grapefruit'].includes(name))) {
      return 'citrus';
    }
    if (fruitNames.some(name => ['banana', 'avocado', 'pear'].includes(name))) {
      return 'creamy';
    }
    if (fruitNames.some(name => ['apple', 'pear'].includes(name))) {
      return 'nutty';
    }
    
    return 'spiced';
  }

  private determineTimeOfDay(ingredients: Array<{ingredient: Ingredient}>, healthGoals: string[]): string {
    const hasCaffeine = ingredients.some(ing => ing.ingredient.name.toLowerCase().includes('coffee') || ing.ingredient.name.toLowerCase().includes('green tea'));
    const hasHeavyFruit = ingredients.some(ing => ['banana', 'mango', 'avocado'].includes(ing.ingredient.name.toLowerCase()));
    const hasProtein = ingredients.some(ing => ing.ingredient.category === 'protein');
    
    if (healthGoals.includes('energy') || hasCaffeine) {
      return 'Best for: Morning Boost';
    }
    if (healthGoals.includes('muscle-gain') && hasProtein) {
      return 'Best for: Post-Workout';
    }
    if (hasHeavyFruit && !hasProtein) {
      return 'Best for: Afternoon Snack';
    }
    if (healthGoals.includes('stress-relief')) {
      return 'Best for: Evening Wind-down';
    }
    
    return 'Best for: Any Time';
  }

  private generateHealthBenefits(ingredients: Array<{ingredient: Ingredient}>, profile: NutritionalProfile, tier: 'essential' | 'enhanced' | 'premium'): string[] {
    const benefits = new Set<string>();
    
    // Add tier-specific core benefits
    if (tier === 'essential') {
      benefits.add('Daily Nutrition');
      benefits.add('Natural Energy');
      benefits.add('Essential Vitamins');
    } else if (tier === 'enhanced') {
      benefits.add('Enhanced Performance');
      benefits.add('Superfood Boost');
      benefits.add('Advanced Recovery');
    } else if (tier === 'premium') {
      benefits.add('Elite Performance');
      benefits.add('Premium Superfoods');
      benefits.add('Maximum Benefits');
      benefits.add('Gourmet Experience');
    }
    
    // Add benefits based on ingredients
    for (const { ingredient } of ingredients) {
      if (ingredient.energy_boost) {
        if (tier === 'premium') benefits.add('Sustained Energy');
        else if (tier === 'enhanced') benefits.add('Enhanced Energy');
        else benefits.add('Natural Energy');
      }
      if (ingredient.muscle_recovery) {
        if (tier === 'premium') benefits.add('Elite Recovery');
        else if (tier === 'enhanced') benefits.add('Advanced Recovery');
        else benefits.add('Muscle Support');
      }
      if (ingredient.immune_support) {
        if (tier === 'premium') benefits.add('Maximum Immunity');
        else if (tier === 'enhanced') benefits.add('Enhanced Immunity');
        else benefits.add('Immune Support');
      }
      if (ingredient.anti_aging) {
        if (tier === 'premium') benefits.add('Anti-Aging Power');
        else if (tier === 'enhanced') benefits.add('Youthful Glow');
      }
    }

    // Add benefits based on health goals with tier enhancement
    for (const goal of profile.health_goals) {
      switch (goal) {
        case 'energy':
          if (tier === 'premium') benefits.add('Elite Energy');
          else if (tier === 'enhanced') benefits.add('Supercharged Energy');
          else benefits.add('Sustained Energy');
          break;
        case 'muscle-gain':
          if (tier === 'premium') benefits.add('Elite Muscle Building');
          else if (tier === 'enhanced') benefits.add('Advanced Muscle Support');
          else benefits.add('Muscle Building');
          break;
        case 'weight-loss':
          if (tier === 'premium') benefits.add('Ultimate Metabolism');
          else if (tier === 'enhanced') benefits.add('Enhanced Metabolism');
          else benefits.add('Weight Management');
          break;
        case 'immune-support':
          if (tier === 'premium') benefits.add('Maximum Immune Defense');
          else if (tier === 'enhanced') benefits.add('Supercharged Immunity');
          else benefits.add('Immune Defense');
          break;
        case 'heart-health':
          if (tier === 'premium') benefits.add('Elite Heart Health');
          else if (tier === 'enhanced') benefits.add('Advanced Heart Support');
          else benefits.add('Cardiovascular Health');
          break;
        case 'stress-relief':
          if (tier === 'premium') benefits.add('Ultimate Relaxation');
          else if (tier === 'enhanced') benefits.add('Enhanced Calm');
          else benefits.add('Stress Relief');
          break;
      }
    }

    return Array.from(benefits).slice(0, tier === 'premium' ? 6 : tier === 'enhanced' ? 5 : 4);
  }

  private selectFruitsByTheme(fruits: Ingredient[], theme: string): Ingredient[] {
    const themeMap = {
      'tropical': ['mango', 'pineapple', 'coconut', 'banana', 'passion fruit', 'papaya'],
      'berry': ['strawberry', 'blueberry', 'raspberry', 'blackberry', 'cranberry'],
      'green': ['kiwi', 'green apple', 'lime', 'avocado'],
      'citrus': ['orange', 'lemon', 'grapefruit', 'lime', 'tangerine'],
      'creamy': ['banana', 'avocado', 'mango', 'pear'],
      'nutty': ['banana', 'apple', 'pear'],
      'spiced': ['apple', 'pear', 'banana']
    };

    const themeKeywords = themeMap[theme] || ['banana', 'apple'];
    return fruits.filter(fruit => 
      themeKeywords.some(keyword => 
        fruit.name.toLowerCase().includes(keyword) || 
        fruit.display_name.toLowerCase().includes(keyword)
      )
    );
  }

  private selectVegetablesByTheme(vegetables: Ingredient[], theme: string): Ingredient[] {
    const themeMap = {
      'tropical': ['spinach', 'kale'],
      'berry': ['spinach'],
      'green': ['spinach', 'kale', 'cucumber', 'celery', 'parsley'],
      'citrus': ['spinach', 'cucumber'],
      'creamy': ['spinach', 'avocado'],
      'nutty': ['spinach'],
      'spiced': ['spinach', 'ginger root']
    };

    const themeKeywords = themeMap[theme] || ['spinach'];
    return vegetables.filter(veggie => 
      themeKeywords.some(keyword => 
        veggie.name.toLowerCase().includes(keyword) || 
        veggie.display_name.toLowerCase().includes(keyword)
      )
    );
  }

  private selectLiquidByTheme(liquids: Ingredient[], theme: string): Ingredient {
    const themeMap = {
      'tropical': ['coconut milk', 'coconut water'],
      'berry': ['almond milk', 'oat milk'],
      'green': ['coconut water', 'almond milk'],
      'citrus': ['coconut water', 'orange juice'],
      'creamy': ['oat milk', 'coconut milk'],
      'nutty': ['almond milk', 'cashew milk'],
      'spiced': ['oat milk', 'almond milk']
    };

    const themeKeywords = themeMap[theme] || ['almond milk'];
    const themeLiquids = liquids.filter(liquid => 
      themeKeywords.some(keyword => 
        liquid.name.toLowerCase().includes(keyword) || 
        liquid.display_name.toLowerCase().includes(keyword)
      )
    );

    return themeLiquids.length > 0 ? themeLiquids[0] : liquids[0];
  }

  private selectProteinByGoal(proteins: Ingredient[], goals: string[]): Ingredient {
    if (goals.includes('muscle-gain')) {
      const wheyProtein = proteins.find(p => p.name.toLowerCase().includes('whey'));
      if (wheyProtein) return wheyProtein;
    }
    if (goals.includes('weight-loss')) {
      const plantProtein = proteins.find(p => p.name.toLowerCase().includes('pea') || p.name.toLowerCase().includes('plant'));
      if (plantProtein) return plantProtein;
    }
    return proteins[0];
  }

  private selectSuperfoodsByTheme(superfoods: Ingredient[], theme: string, goals: string[]): Ingredient[] {
    const themeMap = {
      'tropical': ['acai', 'maca powder', 'spirulina'],
      'berry': ['acai', 'goji berries', 'blueberry powder'],
      'green': ['spirulina', 'chlorella', 'wheatgrass'],
      'citrus': ['camu camu', 'acerola', 'vitamin c'],
      'creamy': ['maca powder', 'hemp seeds', 'flax seeds'],
      'nutty': ['hemp seeds', 'flax seeds', 'chia seeds'],
      'spiced': ['turmeric', 'ginger', 'cinnamon']
    };

    const themeKeywords = themeMap[theme] || ['spirulina'];
    let themeSuperfoods = superfoods.filter(superfood => 
      themeKeywords.some(keyword => 
        superfood.name.toLowerCase().includes(keyword) || 
        superfood.display_name.toLowerCase().includes(keyword)
      )
    );

    // If no theme matches, select based on goals
    if (themeSuperfoods.length === 0) {
      if (goals.includes('energy')) {
        themeSuperfoods = superfoods.filter(s => s.name.toLowerCase().includes('maca') || s.name.toLowerCase().includes('acai'));
      } else if (goals.includes('immune-support')) {
        themeSuperfoods = superfoods.filter(s => s.name.toLowerCase().includes('spirulina') || s.name.toLowerCase().includes('camu'));
      } else if (goals.includes('muscle-gain')) {
        themeSuperfoods = superfoods.filter(s => s.name.toLowerCase().includes('hemp') || s.name.toLowerCase().includes('flax'));
      }
    }

    return themeSuperfoods.length > 0 ? themeSuperfoods : superfoods.slice(0, 3);
  }

  private calculateCosts(ingredients: Array<{cost: number}>): any {
    const ingredientCosts = ingredients.reduce((sum, ing) => sum + ing.cost, 0);
    const laborCost = 2.0; // CHF 2 labor cost per smoothie
    const totalCost = ingredientCosts + laborCost;
    const marginPercentage = Math.round(((totalCost * 2.5) / totalCost - 1) * 100); // 150% margin

    return {
      ingredient_costs: Math.round(ingredientCosts * 100) / 100,
      labor_cost: laborCost,
      total_cost: Math.round((ingredientCosts + laborCost) * 100) / 100,
      margin_percentage: marginPercentage
    };
  }

  private generateInstructions(ingredients: Array<{ingredient: Ingredient, amount_grams: number}>): string[] {
    return [
      'Add liquid base to blender first',
      'Add leafy greens and blend for 30 seconds',
      'Add fruits and protein powder',
      'Blend on high for 60 seconds until smooth',
      'Add ice if desired and blend briefly',
      'Pour and enjoy immediately'
    ];
  }

  private generateScientificRationale(ingredients: Array<{ingredient: Ingredient}>, profile: NutritionalProfile): string {
    const rationales = [];
    
    if (profile.health_goals.includes('energy')) {
      rationales.push('Optimized with potassium-rich fruits and B-vitamins for sustained energy release.');
    }
    
    if (profile.health_goals.includes('muscle-gain')) {
      rationales.push('High-quality protein supports muscle protein synthesis and recovery.');
    }
    
    if (profile.health_goals.includes('immune-support')) {
      rationales.push('Vitamin C and antioxidants strengthen immune function and cellular protection.');
    }

    return rationales.join(' ') || 'Carefully balanced nutrients support your health goals and lifestyle needs.';
  }
}

// Export singleton instance
export const smoothieGenerator = new SmoothieGenerator();