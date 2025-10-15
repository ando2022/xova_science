import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NutritionalProfile {
  user_id: string;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  health_goals: string[];
  dietary_restrictions: string[];
  allergens: string[];
  preferences: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  cost_per_100g: number;
  density: number;
  category: string;
  protein: number;
  carbs: number;
  fiber: number;
  fat: number;
  calories: number;
  iron: number;
  vitamin_c: number;
  vitamin_a: number;
  calcium: number;
  magnesium: number;
  potassium: number;
  folate: number;
  omega3: number;
  energy_boost: boolean;
  muscle_recovery: boolean;
  weight_management: boolean;
  stress_relief: boolean;
  immune_support: boolean;
  anti_inflammatory: boolean;
  digestive_health: boolean;
  heart_health: boolean;
  allergens: string[];
  dietary_tags: string[];
  max_percentage: number;
  min_percentage: number;
  flavor_profile: string;
}

export interface SmoothieRecipe {
  id: string;
  name: string;
  ingredients: Array<{
    name: string;
    amount: number; // in grams
    percentage: number; // % of total
  }>;
  nutritional_breakdown: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    fat: number;
    iron: number;
    vitamin_c: number;
    vitamin_a: number;
    calcium: number;
    magnesium: number;
    potassium: number;
    folate: number;
    omega3: number;
  };
  cost_breakdown: {
    total_cost: number; // CHF
    cost_per_100g: number;
    selling_price: number; // 12 CHF
    margin: number; // CHF
    margin_percentage: number;
    is_profitable: boolean;
  };
  health_benefits: string[];
  scientific_rationale: string;
  flavor_profile: string;
  preparation_notes: string;
}

const MAX_SMOOTHIE_COST = 5.00; // CHF
const SELLING_PRICE = 12.00; // CHF
const SMOOTHIE_WEIGHT = 350; // grams (typical smoothie size)

// Health goal mappings to ingredient properties
const HEALTH_GOAL_MAPPINGS = {
  'energy': ['energy_boost', 'iron', 'vitamin_c'],
  'weight-loss': ['weight_management', 'fiber', 'protein'],
  'muscle-gain': ['muscle_recovery', 'protein', 'calcium'],
  'stress-relief': ['stress_relief', 'magnesium', 'vitamin_c'],
  'immune-support': ['immune_support', 'vitamin_c', 'anti_inflammatory'],
  'heart-health': ['heart_health', 'omega3', 'anti_inflammatory'],
  'digestive-health': ['digestive_health', 'fiber', 'probiotics'],
  'anti-aging': ['anti_inflammatory', 'vitamin_c', 'antioxidants']
};

export class SmoothieGenerator {
  private ingredients: Ingredient[] = [];

  async loadIngredients(): Promise<void> {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .order('cost_per_100g', { ascending: true });

    if (error) {
      console.error('Error loading ingredients:', error);
      throw error;
    }

    this.ingredients = data || [];
  }

  private filterIngredientsForProfile(profile: NutritionalProfile): Ingredient[] {
    return this.ingredients.filter(ingredient => {
      // Check dietary restrictions
      if (profile.dietary_restrictions.includes('vegan') && 
          !ingredient.dietary_tags.includes('vegan')) {
        return false;
      }
      if (profile.dietary_restrictions.includes('vegetarian') && 
          !ingredient.dietary_tags.includes('vegetarian')) {
        return false;
      }

      // Check allergens
      for (const allergen of profile.allergens) {
        if (ingredient.allergens.includes(allergen)) {
          return false;
        }
      }

      return true;
    });
  }

  private calculateNutritionalTargets(profile: NutritionalProfile) {
    // Base targets for a 350g smoothie
    const baseTargets = {
      calories: 250,
      protein: 15,
      carbs: 35,
      fiber: 8,
      fat: 8,
      iron: 2,
      vitamin_c: 60,
      vitamin_a: 0.8,
      calcium: 200,
      magnesium: 80,
      potassium: 400,
      folate: 50,
      omega3: 1
    };

    // Adjust based on activity level
    const activityMultipliers = {
      'sedentary': 0.8,
      'light': 0.9,
      'moderate': 1.0,
      'active': 1.2,
      'very-active': 1.4
    };

    const multiplier = activityMultipliers[profile.activity_level] || 1.0;

    // Adjust based on health goals
    const goalAdjustments = {
      'energy': { calories: 1.2, iron: 1.5, vitamin_c: 1.3 },
      'weight-loss': { protein: 1.3, fiber: 1.4, calories: 0.8 },
      'muscle-gain': { protein: 1.6, calories: 1.3, calcium: 1.2 },
      'stress-relief': { magnesium: 1.5, vitamin_c: 1.2, omega3: 1.3 },
      'immune-support': { vitamin_c: 2.0, vitamin_a: 1.5 },
      'heart-health': { omega3: 2.0, fiber: 1.2, potassium: 1.3 },
      'digestive-health': { fiber: 1.6, probiotics: 1.5 },
      'anti-aging': { vitamin_c: 1.8, omega3: 1.4, antioxidants: 1.5 }
    };

    const adjustedTargets = { ...baseTargets };

    for (const goal of profile.health_goals) {
      const adjustments = goalAdjustments[goal];
      if (adjustments) {
        for (const [nutrient, factor] of Object.entries(adjustments)) {
          if (adjustedTargets[nutrient] !== undefined) {
            adjustedTargets[nutrient] *= factor;
          }
        }
      }
    }

    // Apply activity multiplier
    for (const [nutrient, value] of Object.entries(adjustedTargets)) {
      adjustedTargets[nutrient] = Math.round(value * multiplier);
    }

    return adjustedTargets;
  }

  private selectIngredientsForSmoothie(
    availableIngredients: Ingredient[],
    targets: any,
    healthGoals: string[]
  ): Array<{ ingredient: Ingredient; amount: number; percentage: number }> {
    const selected: Array<{ ingredient: Ingredient; amount: number; percentage: number }> = [];
    let remainingWeight = SMOOTHIE_WEIGHT;
    let totalCost = 0;

    // Priority 1: Base liquid (30-50%)
    const liquids = availableIngredients.filter(i => i.category === 'liquid');
    const baseLiquid = liquids.find(i => i.name === 'Almond Milk') || liquids[0];
    if (baseLiquid) {
      const liquidAmount = Math.floor(remainingWeight * 0.4);
      selected.push({
        ingredient: baseLiquid,
        amount: liquidAmount,
        percentage: (liquidAmount / SMOOTHIE_WEIGHT) * 100
      });
      remainingWeight -= liquidAmount;
      totalCost += (liquidAmount / 100) * baseLiquid.cost_per_100g;
    }

    // Priority 2: Primary fruit (15-25%)
    const fruits = availableIngredients.filter(i => i.category === 'fruit');
    const primaryFruit = fruits[Math.floor(Math.random() * Math.min(3, fruits.length))];
    if (primaryFruit && remainingWeight > 0) {
      const fruitAmount = Math.floor(remainingWeight * 0.2);
      selected.push({
        ingredient: primaryFruit,
        amount: fruitAmount,
        percentage: (fruitAmount / SMOOTHIE_WEIGHT) * 100
      });
      remainingWeight -= fruitAmount;
      totalCost += (fruitAmount / 100) * primaryFruit.cost_per_100g;
    }

    // Priority 3: Protein source (5-15%)
    const proteins = availableIngredients.filter(i => 
      i.category === 'protein' && i.muscle_recovery
    );
    if (proteins.length > 0 && remainingWeight > 0) {
      const protein = proteins[0];
      const proteinAmount = Math.floor(remainingWeight * 0.1);
      selected.push({
        ingredient: protein,
        amount: proteinAmount,
        percentage: (proteinAmount / SMOOTHIE_WEIGHT) * 100
      });
      remainingWeight -= proteinAmount;
      totalCost += (proteinAmount / 100) * protein.cost_per_100g;
    }

    // Priority 4: Vegetables for micronutrients (5-15%)
    const vegetables = availableIngredients.filter(i => 
      i.category === 'vegetable' && 
      (i.iron > 1 || i.vitamin_c > 20 || i.calcium > 50)
    );
    if (vegetables.length > 0 && remainingWeight > 0) {
      const vegetable = vegetables[0];
      const vegAmount = Math.floor(remainingWeight * 0.08);
      selected.push({
        ingredient: vegetable,
        amount: vegAmount,
        percentage: (vegAmount / SMOOTHIE_WEIGHT) * 100
      });
      remainingWeight -= vegAmount;
      totalCost += (vegAmount / 100) * vegetable.cost_per_100g;
    }

    // Priority 5: Supplements for specific goals (2-8%)
    for (const goal of healthGoals) {
      if (remainingWeight <= 10) break;

      const supplements = availableIngredients.filter(i => 
        i.category === 'supplement' && 
        (i[HEALTH_GOAL_MAPPINGS[goal]?.[0]] || i[HEALTH_GOAL_MAPPINGS[goal]?.[1]])
      );

      if (supplements.length > 0) {
        const supplement = supplements[0];
        const suppAmount = Math.floor(remainingWeight * 0.05);
        selected.push({
          ingredient: supplement,
          amount: suppAmount,
          percentage: (suppAmount / SMOOTHIE_WEIGHT) * 100
        });
        remainingWeight -= suppAmount;
        totalCost += (suppAmount / 100) * supplement.cost_per_100g;
      }
    }

    // Fill remaining with secondary fruit or water
    if (remainingWeight > 10) {
      const secondaryFruit = fruits.find(f => f !== primaryFruit);
      if (secondaryFruit) {
        selected.push({
          ingredient: secondaryFruit,
          amount: remainingWeight,
          percentage: (remainingWeight / SMOOTHIE_WEIGHT) * 100
        });
        totalCost += (remainingWeight / 100) * secondaryFruit.cost_per_100g;
      }
    }

    return selected;
  }

  private calculateNutritionalBreakdown(
    selected: Array<{ ingredient: Ingredient; amount: number; percentage: number }>
  ) {
    const breakdown = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fiber: 0,
      fat: 0,
      iron: 0,
      vitamin_c: 0,
      vitamin_a: 0,
      calcium: 0,
      magnesium: 0,
      potassium: 0,
      folate: 0,
      omega3: 0
    };

    for (const item of selected) {
      const ratio = item.amount / 100; // Convert to 100g basis
      breakdown.calories += item.ingredient.calories * ratio;
      breakdown.protein += item.ingredient.protein * ratio;
      breakdown.carbs += item.ingredient.carbs * ratio;
      breakdown.fiber += item.ingredient.fiber * ratio;
      breakdown.fat += item.ingredient.fat * ratio;
      breakdown.iron += item.ingredient.iron * ratio;
      breakdown.vitamin_c += item.ingredient.vitamin_c * ratio;
      breakdown.vitamin_a += item.ingredient.vitamin_a * ratio;
      breakdown.calcium += item.ingredient.calcium * ratio;
      breakdown.magnesium += item.ingredient.magnesium * ratio;
      breakdown.potassium += item.ingredient.potassium * ratio;
      breakdown.folate += item.ingredient.folate * ratio;
      breakdown.omega3 += item.ingredient.omega3 * ratio;
    }

    // Round to reasonable precision
    for (const [key, value] of Object.entries(breakdown)) {
      if (key === 'calories' || key === 'protein' || key === 'carbs' || key === 'fiber' || key === 'fat') {
        breakdown[key] = Math.round(value);
      } else {
        breakdown[key] = Math.round(value * 10) / 10;
      }
    }

    return breakdown;
  }

  private calculateCostBreakdown(
    selected: Array<{ ingredient: Ingredient; amount: number; percentage: number }>
  ) {
    let totalCost = 0;
    for (const item of selected) {
      totalCost += (item.amount / 100) * item.ingredient.cost_per_100g;
    }

    const margin = SELLING_PRICE - totalCost;
    const marginPercentage = (margin / SELLING_PRICE) * 100;
    const isProfitable = totalCost <= MAX_SMOOTHIE_COST;

    return {
      total_cost: Math.round(totalCost * 100) / 100,
      cost_per_100g: Math.round((totalCost / SMOOTHIE_WEIGHT * 100) * 100) / 100,
      selling_price: SELLING_PRICE,
      margin: Math.round(margin * 100) / 100,
      margin_percentage: Math.round(marginPercentage * 10) / 10,
      is_profitable: isProfitable
    };
  }

  private generateHealthBenefits(selected: Array<{ ingredient: Ingredient; amount: number; percentage: number }>, healthGoals: string[]) {
    const benefits = [];
    
    for (const item of selected) {
      if (item.ingredient.energy_boost) benefits.push('Sustained energy release');
      if (item.ingredient.muscle_recovery) benefits.push('Enhanced muscle recovery');
      if (item.ingredient.weight_management) benefits.push('Improved satiety and metabolism');
      if (item.ingredient.stress_relief) benefits.push('Stress reduction and mood support');
      if (item.ingredient.immune_support) benefits.push('Immune system strengthening');
      if (item.ingredient.anti_inflammatory) benefits.push('Anti-inflammatory properties');
      if (item.ingredient.digestive_health) benefits.push('Digestive health optimization');
      if (item.ingredient.heart_health) benefits.push('Cardiovascular health support');
    }

    return [...new Set(benefits)]; // Remove duplicates
  }

  private generateScientificRationale(selected: Array<{ ingredient: Ingredient; amount: number; percentage: number }>, healthGoals: string[], breakdown: any) {
    const rationales = [];

    // High protein rationale
    if (breakdown.protein > 20) {
      rationales.push(`High protein content (${breakdown.protein}g) supports muscle synthesis and satiety.`);
    }

    // Iron rationale
    if (breakdown.iron > 3) {
      rationales.push(`Rich in iron (${breakdown.iron}mg) for optimal oxygen transport and energy metabolism.`);
    }

    // Vitamin C rationale
    if (breakdown.vitamin_c > 80) {
      rationales.push(`Excellent vitamin C source (${breakdown.vitamin_c}mg) for immune function and collagen synthesis.`);
    }

    // Fiber rationale
    if (breakdown.fiber > 10) {
      rationales.push(`High fiber content (${breakdown.fiber}g) promotes digestive health and sustained energy.`);
    }

    // Omega-3 rationale
    if (breakdown.omega3 > 1.5) {
      rationales.push(`Omega-3 fatty acids (${breakdown.omega3}g) support brain health and reduce inflammation.`);
    }

    // Goal-specific rationales
    for (const goal of healthGoals) {
      if (goal === 'energy' && breakdown.iron > 2 && breakdown.vitamin_c > 60) {
        rationales.push('Optimized for energy production through iron and vitamin C synergy.');
      }
      if (goal === 'muscle-gain' && breakdown.protein > 15 && breakdown.calcium > 150) {
        rationales.push('Designed for muscle growth with high protein and bone-supporting calcium.');
      }
      if (goal === 'stress-relief' && breakdown.magnesium > 100) {
        rationales.push('Magnesium-rich formulation supports nervous system relaxation.');
      }
    }

    return rationales.join(' ');
  }

  private generateSmoothieName(selected: Array<{ ingredient: Ingredient; amount: number; percentage: number }>, healthGoals: string[]): string {
    const primaryFruit = selected.find(item => item.ingredient.category === 'fruit');
    const hasGreens = selected.some(item => item.ingredient.category === 'vegetable');
    const hasProtein = selected.some(item => item.ingredient.category === 'protein');
    
    let name = '';
    
    if (primaryFruit) {
      name += primaryFruit.ingredient.name;
    }
    
    if (hasGreens) {
      name += ' Green';
    }
    
    if (hasProtein) {
      name += ' Power';
    }
    
    // Add goal-based suffix
    if (healthGoals.includes('energy')) {
      name += ' Energizer';
    } else if (healthGoals.includes('muscle-gain')) {
      name += ' Builder';
    } else if (healthGoals.includes('stress-relief')) {
      name += ' Zen';
    } else {
      name += ' Boost';
    }
    
    return name;
  }

  async generateSmoothieRecipes(profile: NutritionalProfile, count: number = 21): Promise<SmoothieRecipe[]> {
    if (this.ingredients.length === 0) {
      await this.loadIngredients();
    }

    const availableIngredients = this.filterIngredientsForProfile(profile);
    const targets = this.calculateNutritionalTargets(profile);
    const recipes: SmoothieRecipe[] = [];

    // Generate multiple variations
    for (let i = 0; i < count; i++) {
      try {
        const selected = this.selectIngredientsForSmoothie(
          availableIngredients,
          targets,
          profile.health_goals
        );

        const breakdown = this.calculateNutritionalBreakdown(selected);
        const costBreakdown = this.calculateCostBreakdown(selected);

        // Skip if not profitable
        if (!costBreakdown.is_profitable) {
          continue;
        }

        const name = this.generateSmoothieName(selected, profile.health_goals);
        const healthBenefits = this.generateHealthBenefits(selected, profile.health_goals);
        const scientificRationale = this.generateScientificRationale(selected, profile.health_goals, breakdown);

        const recipe: SmoothieRecipe = {
          id: `recipe_${Date.now()}_${i}`,
          name: name,
          ingredients: selected.map(item => ({
            name: item.ingredient.name,
            amount: item.amount,
            percentage: item.percentage
          })),
          nutritional_breakdown: breakdown,
          cost_breakdown: costBreakdown,
          health_benefits: healthBenefits,
          scientific_rationale: scientificRationale,
          flavor_profile: this.determineFlavorProfile(selected),
          preparation_notes: this.generatePreparationNotes(selected)
        };

        recipes.push(recipe);
      } catch (error) {
        console.error(`Error generating recipe ${i}:`, error);
        continue;
      }
    }

    // Sort by profitability and nutritional completeness
    return recipes.sort((a, b) => {
      // Prioritize profitable recipes
      if (a.cost_breakdown.is_profitable && !b.cost_breakdown.is_profitable) return -1;
      if (!a.cost_breakdown.is_profitable && b.cost_breakdown.is_profitable) return 1;
      
      // Then by margin
      return b.cost_breakdown.margin - a.cost_breakdown.margin;
    }).slice(0, count);
  }

  private determineFlavorProfile(selected: Array<{ ingredient: Ingredient; amount: number; percentage: number }>): string {
    const flavors = selected.map(item => item.ingredient.flavor_profile);
    const sweetCount = flavors.filter(f => f === 'sweet').length;
    const tartCount = flavors.filter(f => f === 'tart').length;
    const creamyCount = flavors.filter(f => f === 'creamy').length;
    const bitterCount = flavors.filter(f => f === 'bitter').length;

    if (creamyCount > 1) return 'Creamy and smooth';
    if (sweetCount > tartCount) return 'Sweet and refreshing';
    if (tartCount > sweetCount) return 'Tart and tangy';
    if (bitterCount > 0) return 'Rich and complex';
    return 'Balanced and refreshing';
  }

  private generatePreparationNotes(selected: Array<{ ingredient: Ingredient; amount: number; percentage: number }>): string {
    const notes = [];
    
    const hasFrozenFruit = selected.some(item => 
      item.ingredient.category === 'fruit' && 
      (item.ingredient.name.includes('frozen') || item.ingredient.name === 'Banana')
    );
    
    if (hasFrozenFruit) {
      notes.push('Use frozen fruit for creamier texture');
    }
    
    const hasSeeds = selected.some(item => 
      item.ingredient.name.toLowerCase().includes('seed')
    );
    
    if (hasSeeds) {
      notes.push('Blend seeds thoroughly for maximum nutrition');
    }
    
    const hasGreens = selected.some(item => item.ingredient.category === 'vegetable');
    
    if (hasGreens) {
      notes.push('Blend greens first for smooth consistency');
    }
    
    notes.push('Blend for 60-90 seconds until smooth');
    
    return notes.join('. ') + '.';
  }
}

// Export singleton instance
export const smoothieGenerator = new SmoothieGenerator();