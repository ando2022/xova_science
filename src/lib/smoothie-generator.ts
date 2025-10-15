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
  ingredients: {
    ingredient: Ingredient;
    amount_grams: number;
    cost: number;
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
  cost_breakdown: {
    ingredient_costs: number;
    labor_cost: number;
    total_cost: number;
    margin_percentage: number;
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
    const baseIngredients = this.getBaseIngredients(profile);
    
    for (let i = 0; i < count; i++) {
      try {
        const recipe = this.generateSingleRecipe(profile, baseIngredients, i);
        recipes.push(recipe);
      } catch (error) {
        console.error(`Error generating recipe ${i}:`, error);
        // Skip this recipe and continue
      }
    }

    return recipes;
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

  private generateSingleRecipe(profile: NutritionalProfile, availableIngredients: Ingredient[], index: number): SmoothieRecipe {
    // Select ingredients based on health goals and nutritional targets
    const selectedIngredients = this.selectIngredients(profile, availableIngredients, index);
    
    // Calculate nutritional breakdown
    const nutritionalBreakdown = this.calculateNutritionalBreakdown(selectedIngredients);
    
    // Generate recipe name and description
    const { name, flavorProfile } = this.generateRecipeName(selectedIngredients, profile);
    
    // Generate health benefits
    const healthBenefits = this.generateHealthBenefits(selectedIngredients, profile);
    
    // Calculate costs
    const costBreakdown = this.calculateCosts(selectedIngredients);
    
    // Generate preparation instructions
    const instructions = this.generateInstructions(selectedIngredients);
    
    // Generate scientific rationale
    const scientificRationale = this.generateScientificRationale(selectedIngredients, profile);

    return {
      id: `smoothie-${index + 1}`,
      name,
      flavor_profile: flavorProfile,
      ingredients: selectedIngredients.map(ing => ({
        ingredient: ing.ingredient,
        amount_grams: ing.amount_grams,
        cost: ing.cost
      })),
      nutritional_breakdown: nutritionalBreakdown,
      health_benefits: healthBenefits,
      cost_breakdown: costBreakdown,
      preparation_instructions: instructions,
      scientific_rationale: scientificRationale
    };
  }

  private selectIngredients(profile: NutritionalProfile, availableIngredients: Ingredient[], index: number): Array<{ingredient: Ingredient, amount_grams: number, cost: number}> {
    const selected: Array<{ingredient: Ingredient, amount_grams: number, cost: number}> = [];
    
    // Always include a base liquid
    const liquids = availableIngredients.filter(ing => ing.category === 'liquid');
    if (liquids.length > 0) {
      const liquid = liquids[index % liquids.length];
      selected.push({
        ingredient: liquid,
        amount_grams: 200,
        cost: (liquid.cost_per_100g * 200) / 100
      });
    }

    // Add fruits based on health goals
    const fruits = availableIngredients.filter(ing => ing.category === 'fruit');
    const fruitCount = Math.min(2, fruits.length);
    for (let i = 0; i < fruitCount; i++) {
      const fruit = fruits[(index + i) % fruits.length];
      const amount = 80 + (i * 20); // 80g, 100g
      selected.push({
        ingredient: fruit,
        amount_grams: amount,
        cost: (fruit.cost_per_100g * amount) / 100
      });
    }

    // Add protein if muscle gain is a goal
    if (profile.health_goals.includes('muscle-gain')) {
      const proteins = availableIngredients.filter(ing => ing.category === 'protein');
      if (proteins.length > 0) {
        const protein = proteins[index % proteins.length];
        selected.push({
          ingredient: protein,
          amount_grams: 30,
          cost: (protein.cost_per_100g * 30) / 100
        });
      }
    }

    // Add vegetables for fiber and micronutrients
    const vegetables = availableIngredients.filter(ing => ing.category === 'vegetable');
    if (vegetables.length > 0) {
      const vegetable = vegetables[index % vegetables.length];
      selected.push({
        ingredient: vegetable,
        amount_grams: 50,
        cost: (vegetable.cost_per_100g * 50) / 100
      });
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

  private generateRecipeName(ingredients: Array<{ingredient: Ingredient}>, profile: NutritionalProfile): {name: string, flavorProfile: string} {
    const primaryFruit = ingredients.find(ing => ing.ingredient.category === 'fruit');
    const primaryGoal = profile.health_goals[0] || 'balanced';
    
    const goalNames = {
      'energy': 'Energy',
      'weight-loss': 'Slim',
      'muscle-gain': 'Power',
      'immune-support': 'Immunity',
      'heart-health': 'Heart',
      'stress-relief': 'Zen'
    };

    const goalName = goalNames[primaryGoal] || 'Balanced';
    const fruitName = primaryFruit ? primaryFruit.ingredient.display_name : 'Berry';
    
    const names = [
      `${goalName} ${fruitName} Boost`,
      `${goalName} ${fruitName} Blend`,
      `${goalName} ${fruitName} Power`,
      `${goalName} ${fruitName} Fusion`,
      `${goalName} ${fruitName} Elixir`
    ];

    return {
      name: names[Math.floor(Math.random() * names.length)],
      flavorProfile: primaryFruit ? 'Fruity & Sweet' : 'Creamy & Nutty'
    };
  }

  private generateHealthBenefits(ingredients: Array<{ingredient: Ingredient}>, profile: NutritionalProfile): string[] {
    const benefits = new Set<string>();
    
    // Add benefits based on ingredients
    for (const { ingredient } of ingredients) {
      if (ingredient.energy_boost) benefits.add('Energy Boost');
      if (ingredient.muscle_recovery) benefits.add('Muscle Recovery');
      if (ingredient.weight_loss) benefits.add('Weight Management');
      if (ingredient.immune_support) benefits.add('Immune Support');
      if (ingredient.heart_health) benefits.add('Heart Health');
      if (ingredient.digestive_health) benefits.add('Digestive Health');
      if (ingredient.anti_aging) benefits.add('Anti-Aging');
      if (ingredient.stress_relief) benefits.add('Stress Relief');
    }

    // Add benefits based on health goals
    for (const goal of profile.health_goals) {
      switch (goal) {
        case 'energy':
          benefits.add('Sustained Energy');
          break;
        case 'muscle-gain':
          benefits.add('Muscle Building');
          break;
        case 'weight-loss':
          benefits.add('Metabolism Boost');
          break;
        case 'immune-support':
          benefits.add('Immune Defense');
          break;
        case 'heart-health':
          benefits.add('Cardiovascular Health');
          break;
      }
    }

    return Array.from(benefits).slice(0, 4); // Limit to 4 benefits
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