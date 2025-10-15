import { UserProfile, DailyCheckin } from './auth';
import { GeneratedSmoothie } from './smoothie-generator';
import { SMOOTHIE_CATALOG } from './smoothie-database';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface TimeOptimizedSmoothie extends GeneratedSmoothie {
  timeOfDay: TimeOfDay;
  timeRelevanceScore: number;
  timeReasons: string[];
}

export interface WeeklySmoothiePlan {
  [key: string]: { // day-time key like "Monday-morning"
    smoothie: TimeOptimizedSmoothie | null;
  };
}

export interface SmoothiePackage {
  smoothieId: string;
  smoothieName: string;
  ingredients: {
    name: string;
    quantity: string;
    grams: number;
    category: 'fresh' | 'dry';
  }[];
}

export interface IngredientPackaging {
  packages: SmoothiePackage[];
  totalPackages: number;
  freshIngredients: {
    name: string;
    totalGrams: number;
    storage?: string;
  }[];
  dryIngredients: {
    name: string;
    totalGrams: number;
    storage?: string;
  }[];
  totalFreshPackages: number;
  totalDryPackages: number;
}

// Categorize ingredients as fresh or dry
const FRESH_INGREDIENTS = [
  'banana', 'strawberry', 'blueberry', 'raspberry', 'blackberry', 'mango', 
  'pineapple', 'papaya', 'kiwi', 'peach', 'apple', 'pear', 'orange', 'grapefruit',
  'spinach', 'kale', 'cucumber', 'celery', 'avocado', 'beetroot', 'carrot',
  'ginger', 'turmeric', 'lemon', 'lime', 'mint', 'basil', 'parsley',
  'greek yogurt', 'yogurt', 'kefir', 'coconut water', 'almond milk', 'oat milk'
];

const DRY_INGREDIENTS = [
  'protein powder', 'whey protein', 'pea protein', 'hemp protein',
  'chia seeds', 'flax seeds', 'hemp seeds', 'pumpkin seeds',
  'oats', 'granola', 'almond butter', 'peanut butter', 'cashew butter',
  'cacao powder', 'cocoa powder', 'matcha powder', 'spirulina', 'chlorella',
  'maca powder', 'ashwagandha', 'collagen', 'bee pollen',
  'dates', 'raisins', 'goji berries', 'açai powder', 'cinnamon', 'vanilla'
];

export function categorizeIngredient(ingredient: string): 'fresh' | 'dry' {
  const ingredientLower = ingredient.toLowerCase();
  
  if (FRESH_INGREDIENTS.some(fresh => ingredientLower.includes(fresh))) {
    return 'fresh';
  }
  
  if (DRY_INGREDIENTS.some(dry => ingredientLower.includes(dry))) {
    return 'dry';
  }
  
  // Default to fresh for safety
  return 'fresh';
}

// Get current time of day
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}

// Score a smoothie for a specific time of day
export function scoreForTimeOfDay(
  smoothie: GeneratedSmoothie,
  timeOfDay: TimeOfDay,
  userProfile: UserProfile,
  recentCheckin?: DailyCheckin
): TimeOptimizedSmoothie {
  let timeScore = 50;
  const timeReasons: string[] = [];
  const ingredients = smoothie.ingredients.map(i => i.name.toLowerCase());

  if (timeOfDay === 'morning') {
    // Morning: Energy boosting, lighter, easy to digest
    const morningBoostIngredients = ['banana', 'berries', 'oats', 'chia seeds', 'matcha', 'espresso', 'dates', 'maca'];
    const hasMorningBoost = ingredients.filter(ing => 
      morningBoostIngredients.some(m => ing.includes(m))
    ).length;
    
    if (hasMorningBoost > 0) {
      timeScore += hasMorningBoost * 8;
      timeReasons.push('Perfect morning energy boost');
    }

    // Protein for sustained energy
    if (smoothie.macros.protein > 15) {
      timeScore += 10;
      timeReasons.push('High protein keeps you full until lunch');
    }

    // Fiber for digestion
    if (smoothie.macros.fiber > 8) {
      timeScore += 8;
      timeReasons.push('Fiber supports healthy digestion');
    }

    // Avoid too heavy
    if (smoothie.macros.calories > 450) {
      timeScore -= 10;
      timeReasons.push('A bit heavy for morning');
    }

    // Consider sleep quality
    if (recentCheckin && recentCheckin.sleep < 5) {
      // Poor sleep - need more energy
      const hasEnergyBoost = ingredients.some(ing => 
        ['matcha', 'espresso', 'maca', 'cacao'].includes(ing)
      );
      if (hasEnergyBoost) {
        timeScore += 12;
        timeReasons.push('Extra energy to compensate for poor sleep');
      }
    }
  } else if (timeOfDay === 'afternoon') {
    // Afternoon: Sustained energy, prevent afternoon slump, moderate calories
    const afternoonIngredients = ['cacao', 'almond butter', 'peanut butter', 'banana', 'protein'];
    const hasAfternoonPower = ingredients.filter(ing => 
      afternoonIngredients.some(a => ing.includes(a))
    ).length;
    
    if (hasAfternoonPower > 0) {
      timeScore += hasAfternoonPower * 6;
      timeReasons.push('Fights afternoon energy slump');
    }

    // Balanced macros
    if (smoothie.macros.protein > 12 && smoothie.macros.protein < 25) {
      timeScore += 10;
      timeReasons.push('Balanced protein for sustained energy');
    }

    // Good for post-workout if active
    if (userProfile.activityLevel === 'very-active' || userProfile.activityLevel === 'athlete') {
      if (smoothie.macros.protein > 20) {
        timeScore += 12;
        timeReasons.push('Great post-workout recovery');
      }
    }

    // Consider energy levels
    if (recentCheckin && recentCheckin.energy < 5) {
      const hasQuickEnergy = ingredients.some(ing => 
        ['banana', 'dates', 'mango', 'cacao'].includes(ing)
      );
      if (hasQuickEnergy) {
        timeScore += 10;
        timeReasons.push('Quick natural energy boost');
      }
    }
  } else {
    // Evening: Lighter, calming, easier to digest, not too stimulating
    const calmingIngredients = ['banana', 'berries', 'cherry', 'almond', 'vanilla', 'cinnamon'];
    const hasCalming = ingredients.filter(ing => 
      calmingIngredients.some(c => ing.includes(c))
    ).length;
    
    if (hasCalming > 0) {
      timeScore += hasCalming * 7;
      timeReasons.push('Calming ingredients for evening');
    }

    // Avoid stimulants
    const hasStimulants = ingredients.some(ing => 
      ['matcha', 'espresso', 'coffee', 'guarana'].includes(ing)
    );
    if (hasStimulants) {
      timeScore -= 20;
      timeReasons.push('Contains stimulants - may affect sleep');
    } else {
      timeScore += 8;
      timeReasons.push('No stimulants - sleep-friendly');
    }

    // Lighter calories
    if (smoothie.macros.calories < 350) {
      timeScore += 10;
      timeReasons.push('Light and easy to digest');
    }

    // Digestive support
    const hasDigestive = ingredients.some(ing => 
      ['ginger', 'papaya', 'pineapple', 'yogurt'].includes(ing)
    );
    if (hasDigestive) {
      timeScore += 8;
      timeReasons.push('Supports healthy digestion');
    }

    // Consider stress levels
    if (recentCheckin && recentCheckin.mood < 5) {
      const hasMoodBoost = ingredients.some(ing => 
        ['cacao', 'banana', 'berries'].includes(ing)
      );
      if (hasMoodBoost) {
        timeScore += 10;
        timeReasons.push('Mood-boosting ingredients to end the day');
      }
    }
  }

  // Normalize score
  timeScore = Math.max(0, Math.min(100, timeScore));

  return {
    ...smoothie,
    timeOfDay,
    timeRelevanceScore: Math.round(timeScore),
    timeReasons: [...new Set(timeReasons)]
  };
}

// Generate 21 unique personalized smoothie options (7 morning, 7 afternoon, 7 evening)
export function generateWeeklyRecommendations(
  userProfile: UserProfile,
  favorites: string[] = [],
  recentCheckin?: DailyCheckin
): TimeOptimizedSmoothie[] {
  const timesOfDay: TimeOfDay[] = ['morning', 'afternoon', 'evening'];

  // Get base smoothies from catalog
  const catalogSmoothies: GeneratedSmoothie[] = SMOOTHIE_CATALOG.map(s => ({
    id: s.id,
    name: s.name,
    description: s.description,
    ingredients: s.ingredients.map(ing => ({ name: ing.name, quantity: ing.amount })),
    macros: s.macros,
    instructions: s.instructions,
    scientificExplanation: s.scientificExplanation,
    matchScore: s.matchScore,
    matchReasons: [],
    isGenerated: false,
    generatedAt: new Date().toISOString()
  }));

  // Score each smoothie for each time of day
  const scoredByTime: { [key in TimeOfDay]: TimeOptimizedSmoothie[] } = {
    morning: [],
    afternoon: [],
    evening: []
  };

  catalogSmoothies.forEach(smoothie => {
    timesOfDay.forEach(timeOfDay => {
      const scored = scoreForTimeOfDay(smoothie, timeOfDay, userProfile, recentCheckin);
      scoredByTime[timeOfDay].push(scored);
    });
  });

  // Sort each time slot by score and take top 7
  const result: TimeOptimizedSmoothie[] = [];
  
  timesOfDay.forEach(timeOfDay => {
    // Boost favorites
    const withFavorites = scoredByTime[timeOfDay].map(rec => {
      if (favorites.includes(rec.id)) {
        return {
          ...rec,
          matchScore: Math.min(100, rec.matchScore + 15),
          timeRelevanceScore: Math.min(100, rec.timeRelevanceScore + 10),
          matchReasons: [...rec.matchReasons, 'One of your favorites']
        };
      }
      return rec;
    });

    // Sort by combined score (time relevance + match score)
    withFavorites.sort((a, b) => {
      const scoreA = (a.timeRelevanceScore * 0.5) + (a.matchScore * 0.5);
      const scoreB = (b.timeRelevanceScore * 0.5) + (b.matchScore * 0.5);
      return scoreB - scoreA;
    });

    // Take top 7 for this time slot
    result.push(...withFavorites.slice(0, 7));
  });

  return result;
}

// Helper function to convert quantity string to grams
function quantityToGrams(quantityStr: string): number {
  let grams = 100; // default
  const quantityLower = quantityStr.toLowerCase();
  
  if (quantityLower.includes('ml')) {
    const match = quantityLower.match(/(\d+)\s*ml/);
    if (match) grams = parseInt(match[1]); // Approximate ml = g for liquids
  } else if (quantityLower.includes('g')) {
    const match = quantityLower.match(/(\d+)\s*g/);
    if (match) grams = parseInt(match[1]);
  } else if (quantityLower.includes('cup')) {
    const match = quantityLower.match(/(\d+(\.\d+)?)\s*cup/);
    if (match) grams = Math.round(parseFloat(match[1]) * 200); // 1 cup ~= 200g
  } else if (quantityLower.includes('tbsp')) {
    const match = quantityLower.match(/(\d+)\s*tbsp/);
    if (match) grams = parseInt(match[1]) * 15; // 1 tbsp ~= 15g
  } else if (quantityLower.includes('tsp')) {
    const match = quantityLower.match(/(\d+)\s*tsp/);
    if (match) grams = parseInt(match[1]) * 5; // 1 tsp ~= 5g
  }
  
  return grams;
}

// Calculate packaging breakdown for a weekly order (individually packaged per smoothie)
export function calculatePackaging(smoothies: TimeOptimizedSmoothie[]): IngredientPackaging {
  const freshMap = new Map<string, number>();
  const dryMap = new Map<string, number>();
  
  // Create individual packages for each smoothie
  const packages: SmoothiePackage[] = smoothies.map(smoothie => {
    const packagedIngredients = smoothie.ingredients.map(ingredient => {
      const category = categorizeIngredient(ingredient.name);
      const grams = quantityToGrams(ingredient.quantity);
      const key = ingredient.name.toLowerCase();
      
      // Track totals for summary
      if (category === 'fresh') {
        freshMap.set(key, (freshMap.get(key) || 0) + grams);
      } else {
        dryMap.set(key, (dryMap.get(key) || 0) + grams);
      }
      
      return {
        name: ingredient.name,
        quantity: ingredient.quantity,
        grams,
        category
      };
    });
    
    return {
      smoothieId: smoothie.id,
      smoothieName: smoothie.name,
      ingredients: packagedIngredients
    };
  });

  const freshIngredients = Array.from(freshMap.entries()).map(([name, totalGrams]) => ({
    name,
    totalGrams,
    storage: 'Refrigerate upon delivery'
  }));

  const dryIngredients = Array.from(dryMap.entries()).map(([name, totalGrams]) => ({
    name,
    totalGrams,
    storage: 'Store in cool, dry place'
  }));

  return {
    packages,
    totalPackages: smoothies.length, // One package per smoothie
    freshIngredients,
    dryIngredients,
    totalFreshPackages: Math.ceil(freshIngredients.length / 5), // 5 ingredients per vacuum bag
    totalDryPackages: Math.ceil(dryIngredients.length / 8) // 8 ingredients per vacuum bag
  };
}

// Create empty weekly plan
export function createEmptyWeeklyPlan(): WeeklySmoothiePlan {
  const plan: WeeklySmoothiePlan = {};
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const times: TimeOfDay[] = ['morning', 'afternoon', 'evening'];

  days.forEach(day => {
    times.forEach(time => {
      plan[`${day}-${time}`] = { smoothie: null };
    });
  });

  return plan;
}
