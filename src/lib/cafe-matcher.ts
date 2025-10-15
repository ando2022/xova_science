import { CafeSmoothie, Cafe } from './cafe-database';
import { UserProfile } from './auth';

export interface SmoothieMatch {
  smoothie: CafeSmoothie;
  cafe: Cafe;
  matchScore: number; // 0-100
  matchReasons: string[];
  concerns: string[];
  benefitsForToday: string[];
  profileAlignment: string; // Detailed explanation of how this matches the user's complete profile
}

export interface CafeMatchResult {
  cafe: Cafe;
  topMatches: SmoothieMatch[];
  averageMatchScore: number;
}

// Calculate how well a café smoothie matches the user's profile
export function calculateSmoothieMatch(
  smoothie: CafeSmoothie,
  cafe: Cafe,
  userProfile: UserProfile,
  dailyCheckin?: {
    energy: number;
    mood: number;
    appetite: number;
  }
): SmoothieMatch {
  let score = 40; // Base score (lowered to allow more variation)
  const matchReasons: string[] = [];
  const concerns: string[] = [];
  const benefitsForToday: string[] = [];

  // Factor in distance - closer cafés get a small boost
  if (cafe.distance !== undefined) {
    if (cafe.distance < 0.5) {
      score += 8;
      matchReasons.push('Very close to you (< 500m)');
    } else if (cafe.distance < 1.0) {
      score += 5;
      matchReasons.push('Nearby (< 1km)');
    } else if (cafe.distance < 2.0) {
      score += 2;
    } else if (cafe.distance > 5.0) {
      score -= 5;
      concerns.push(`Quite far (${cafe.distance.toFixed(1)}km away)`);
    }
  }

  // Check dietary restrictions (highest priority - can disqualify)
  if (userProfile.dietaryRestrictions && userProfile.dietaryRestrictions.length > 0) {
    const ingredients = smoothie.ingredients.map(i => i.toLowerCase());

    if (userProfile.dietaryRestrictions.includes('vegan')) {
      const nonVeganIngredients = ['milk', 'yogurt', 'greek yogurt', 'whey protein', 'honey'];
      const hasNonVegan = ingredients.some(ing => 
        nonVeganIngredients.some(nv => ing.includes(nv))
      );
      if (hasNonVegan) {
        score -= 40;
        concerns.push('Contains non-vegan ingredients');
      } else {
        score += 10;
        matchReasons.push('Vegan-friendly');
      }
    }

    if (userProfile.dietaryRestrictions.includes('gluten-free')) {
      const hasGluten = ingredients.some(ing => ing.includes('oat') || ing.includes('granola'));
      if (hasGluten) {
        score -= 35;
        concerns.push('May contain gluten');
      } else {
        score += 5;
        matchReasons.push('Gluten-free');
      }
    }

    if (userProfile.dietaryRestrictions.includes('nut-free')) {
      const hasNuts = ingredients.some(ing => 
        ing.includes('almond') || ing.includes('peanut') || 
        ing.includes('cashew') || ing.includes('walnut')
      );
      if (hasNuts) {
        score -= 50;
        concerns.push('Contains nuts - ALLERGEN');
      } else {
        score += 8;
        matchReasons.push('Nut-free');
      }
    }

    if (userProfile.dietaryRestrictions.includes('dairy-free')) {
      const hasDairy = ingredients.some(ing => 
        (ing.includes('milk') && !ing.includes('almond milk') && 
        !ing.includes('oat milk') && !ing.includes('coconut milk')) ||
        ing.includes('yogurt')
      );
      if (hasDairy) {
        score -= 30;
        concerns.push('Contains dairy');
      } else {
        score += 8;
        matchReasons.push('Dairy-free');
      }
    }

    if (userProfile.dietaryRestrictions.includes('low-sugar')) {
      if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.sugar > 35) {
        score -= 20;
        concerns.push(`High sugar content (${smoothie.nutritionalInfo.sugar}g)`);
      } else if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.sugar < 20) {
        score += 12;
        matchReasons.push('Low sugar content');
      }
    }
  }

  // Match ingredients to health goals
  if (userProfile.healthGoals && userProfile.healthGoals.length > 0) {
    const ingredients = smoothie.ingredients.map(i => i.toLowerCase());

    if (userProfile.healthGoals.includes('weight-loss')) {
      if (smoothie.nutritionalInfo) {
        if (smoothie.nutritionalInfo.calories < 250) {
          score += 15;
          matchReasons.push('Low calorie for weight management');
        } else if (smoothie.nutritionalInfo.calories > 400) {
          score -= 10;
          concerns.push('Higher calorie content');
        }

        if (smoothie.nutritionalInfo.fiber > 8) {
          score += 10;
          matchReasons.push('High fiber for satiety');
        }
      }

      const weightLossIngredients = ['kale', 'spinach', 'cucumber', 'celery', 'ginger', 'green apple'];
      const hasWeightLossIngredients = ingredients.filter(ing => 
        weightLossIngredients.some(wl => ing.includes(wl))
      ).length;
      if (hasWeightLossIngredients > 0) {
        score += hasWeightLossIngredients * 3;
        matchReasons.push('Contains ingredients that support weight management');
      }
    }

    if (userProfile.healthGoals.includes('muscle-gain')) {
      if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.protein > 15) {
        score += 18;
        matchReasons.push(`High protein (${smoothie.nutritionalInfo.protein}g) for muscle building`);
      } else if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.protein < 6) {
        score -= 12;
        concerns.push('Low protein content');
      }

      const proteinIngredients = ['protein', 'peanut butter', 'almond butter', 'yogurt', 'hemp seeds', 'chia seeds'];
      const hasProtein = ingredients.filter(ing => 
        proteinIngredients.some(p => ing.includes(p))
      ).length;
      if (hasProtein > 0) {
        score += hasProtein * 4;
        matchReasons.push('Contains protein-rich ingredients');
      }
    }

    if (userProfile.healthGoals.includes('energy-boost')) {
      const energyIngredients = ['banana', 'dates', 'maca', 'matcha', 'espresso', 'spirulina', 'cacao'];
      const hasEnergy = ingredients.filter(ing => 
        energyIngredients.some(e => ing.includes(e))
      ).length;
      if (hasEnergy > 0) {
        score += hasEnergy * 5;
        matchReasons.push('Contains natural energy-boosting ingredients');
      }
    }

    if (userProfile.healthGoals.includes('immunity-boost')) {
      const immuneIngredients = ['ginger', 'turmeric', 'orange', 'berries', 'kale', 'spinach', 'sea buckthorn'];
      const hasImmune = ingredients.filter(ing => 
        immuneIngredients.some(i => ing.includes(i))
      ).length;
      if (hasImmune > 0) {
        score += hasImmune * 5;
        matchReasons.push('Rich in immune-supporting nutrients');
      }
    }

    if (userProfile.healthGoals.includes('digestive-health')) {
      const digestiveIngredients = ['yogurt', 'ginger', 'papaya', 'pineapple', 'chia seeds'];
      const hasDigestive = ingredients.filter(ing => 
        digestiveIngredients.some(d => ing.includes(d))
      ).length;
      if (hasDigestive > 0) {
        score += hasDigestive * 5;
        matchReasons.push('Supports digestive health');
      }

      if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.fiber > 6) {
        score += 8;
        matchReasons.push('High fiber for digestive health');
      }
    }

    if (userProfile.healthGoals.includes('stress-reduction')) {
      const calmingIngredients = ['ashwagandha', 'maca', 'banana', 'cacao', 'berries'];
      const hasCalming = ingredients.filter(ing => 
        calmingIngredients.some(c => ing.includes(c))
      ).length;
      if (hasCalming > 0) {
        score += hasCalming * 5;
        matchReasons.push('Contains stress-reducing adaptogens');
      }
    }
  }

  // Match flavor preferences
  if (userProfile.flavorPreferences && userProfile.flavorPreferences.length > 0) {
    const ingredients = smoothie.ingredients.map(i => i.toLowerCase());
    
    if (userProfile.flavorPreferences.includes('sweet')) {
      const sweetIngredients = ['banana', 'mango', 'berries', 'strawberries', 'dates', 'honey', 'peach'];
      const hasSweetIngredients = ingredients.filter(ing => 
        sweetIngredients.some(s => ing.includes(s))
      ).length;
      if (hasSweetIngredients > 0) {
        score += hasSweetIngredients * 2;
        matchReasons.push('Matches your sweet flavor preference');
      }
    }
    
    if (userProfile.flavorPreferences.includes('berry')) {
      const berryIngredients = ['strawberries', 'blueberries', 'raspberries', 'blackberries', 'berries', 'acai'];
      const hasBerryIngredients = ingredients.filter(ing => 
        berryIngredients.some(b => ing.includes(b))
      ).length;
      if (hasBerryIngredients > 0) {
        score += hasBerryIngredients * 4;
        matchReasons.push('Contains your preferred berry flavors');
      }
    }
    
    if (userProfile.flavorPreferences.includes('tropical')) {
      const tropicalIngredients = ['mango', 'pineapple', 'coconut', 'passion fruit', 'papaya'];
      const hasTropicalIngredients = ingredients.filter(ing => 
        tropicalIngredients.some(t => ing.includes(t))
      ).length;
      if (hasTropicalIngredients > 0) {
        score += hasTropicalIngredients * 4;
        matchReasons.push('Tropical flavors you enjoy');
      }
    }
    
    if (userProfile.flavorPreferences.includes('green')) {
      const greenIngredients = ['kale', 'spinach', 'cucumber', 'celery', 'matcha', 'spirulina'];
      const hasGreenIngredients = ingredients.filter(ing => 
        greenIngredients.some(g => ing.includes(g))
      ).length;
      if (hasGreenIngredients > 0) {
        score += hasGreenIngredients * 3;
        matchReasons.push('Green flavors you prefer');
      }
    }
  }

  // Consider today's check-in state
  if (dailyCheckin) {
    if (dailyCheckin.energy < 4) {
      // Low energy - prioritize energy boosting
      const hasEnergy = smoothie.ingredients.some(ing => 
        ['banana', 'dates', 'maca', 'matcha', 'espresso', 'cacao'].includes(ing.toLowerCase())
      );
      if (hasEnergy) {
        score += 12;
        benefitsForToday.push('Boosts energy levels when you need it most');
      }
    }

    if (dailyCheckin.mood < 4) {
      // Low mood - prioritize mood-enhancing ingredients
      const hasMoodBoost = smoothie.ingredients.some(ing => 
        ['cacao', 'banana', 'berries', 'maca'].includes(ing.toLowerCase())
      );
      if (hasMoodBoost) {
        score += 10;
        benefitsForToday.push('Contains mood-enhancing ingredients');
      }
    }

    if (dailyCheckin.appetite < 4) {
      // Low appetite - prefer lighter options
      if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.calories < 300) {
        score += 8;
        benefitsForToday.push('Light and easy to consume');
      }
    } else if (dailyCheckin.appetite > 6) {
      // High appetite - prefer more substantial options
      if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.calories > 350) {
        score += 8;
        benefitsForToday.push('Substantial and filling');
      }
    }
  }

  // Normalize score to 0-100
  score = Math.max(0, Math.min(100, score));

  // Generate comprehensive profile alignment explanation
  const profileAlignment = generateProfileAlignment(
    smoothie,
    cafe,
    userProfile,
    dailyCheckin,
    matchReasons,
    concerns,
    score
  );

  return {
    smoothie,
    cafe,
    matchScore: Math.round(score),
    matchReasons: [...new Set(matchReasons)], // Remove duplicates
    concerns: [...new Set(concerns)],
    benefitsForToday: [...new Set(benefitsForToday)].slice(0, 3), // Top 3 benefits
    profileAlignment
  };
}

// Generate detailed explanation of how smoothie matches user's complete profile
function generateProfileAlignment(
  smoothie: CafeSmoothie,
  cafe: Cafe,
  userProfile: UserProfile,
  dailyCheckin: { energy: number; mood: number; appetite: number; } | undefined,
  matchReasons: string[],
  concerns: string[],
  score: number
): string {
  const parts: string[] = [];
  
  // Start with match quality
  if (score >= 80) {
    parts.push("⭐ **Excellent Match** for your profile.");
  } else if (score >= 65) {
    parts.push("✓ **Good Match** for your needs.");
  } else if (score >= 50) {
    parts.push("→ **Moderate Match** with some considerations.");
  } else {
    parts.push("⚠ **Limited Match** - review concerns below.");
  }

  // Health goals alignment
  if (userProfile.healthGoals && userProfile.healthGoals.length > 0) {
    const goalsPart = `**Your Goals** (${userProfile.healthGoals.map(g => g.replace('-', ' ')).join(', ')}):`;
    const ingredients = smoothie.ingredients.map(i => i.toLowerCase());
    const goalMatches: string[] = [];

    userProfile.healthGoals.forEach(goal => {
      if (goal === 'weight-loss') {
        if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.calories < 250) {
          goalMatches.push(`Low calorie (${smoothie.nutritionalInfo.calories}kcal) supports weight management`);
        } else if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.fiber > 7) {
          goalMatches.push(`High fiber (${smoothie.nutritionalInfo.fiber}g) promotes satiety`);
        }
      } else if (goal === 'muscle-gain') {
        if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.protein > 15) {
          goalMatches.push(`Protein-rich (${smoothie.nutritionalInfo.protein}g) for muscle building`);
        }
      } else if (goal === 'energy' || goal === 'energy-boost') {
        if (ingredients.some(i => ['banana', 'dates', 'maca', 'matcha', 'espresso'].some(e => i.includes(e)))) {
          goalMatches.push('Natural energy boosters included');
        }
      } else if (goal === 'immunity' || goal === 'immunity-boost') {
        if (ingredients.some(i => ['ginger', 'turmeric', 'orange', 'berries'].some(im => i.includes(im)))) {
          goalMatches.push('Immune-supporting ingredients present');
        }
      } else if (goal === 'digestive-health' || goal === 'digestion') {
        if (ingredients.some(i => ['ginger', 'papaya', 'pineapple', 'yogurt'].some(d => i.includes(d)))) {
          goalMatches.push('Digestive-friendly ingredients included');
        }
      }
    });

    if (goalMatches.length > 0) {
      parts.push(goalsPart + ' ' + goalMatches.join('; '));
    }
  }

  // Dietary restrictions compliance
  if (userProfile.dietaryRestrictions && userProfile.dietaryRestrictions.length > 0) {
    const restrictions = `**Dietary Needs** (${userProfile.dietaryRestrictions.join(', ')}):`;
    const complianceNotes: string[] = [];

    if (concerns.some(c => c.toLowerCase().includes('allergen') || c.toLowerCase().includes('non-vegan') || c.toLowerCase().includes('dairy') || c.toLowerCase().includes('gluten'))) {
      complianceNotes.push('⚠ See concerns - may not meet all restrictions');
    } else {
      complianceNotes.push('✓ Complies with your dietary requirements');
    }

    parts.push(restrictions + ' ' + complianceNotes.join('; '));
  }

  // Activity level consideration
  if (userProfile.activityLevel) {
    const activityMap: Record<string, string> = {
      'sedentary': 'light nutritional needs',
      'lightly-active': 'moderate nutritional needs',
      'light': 'moderate nutritional needs',
      'moderate': 'balanced nutritional needs',
      'very-active': 'higher energy requirements',
      'athlete': 'high performance nutrition needs'
    };
    
    if (smoothie.nutritionalInfo) {
      const calories = smoothie.nutritionalInfo.calories;
      const protein = smoothie.nutritionalInfo.protein;
      
      if (['very-active', 'athlete'].includes(userProfile.activityLevel)) {
        if (calories > 350 && protein > 12) {
          parts.push(`**Activity Level** (${activityMap[userProfile.activityLevel]}): Well-suited for your active lifestyle with ${calories}kcal and ${protein}g protein.`);
        } else if (calories < 250) {
          parts.push(`**Activity Level** (${activityMap[userProfile.activityLevel]}): May be light for your activity level - consider as an afternoon smoothie.`);
        }
      } else if (userProfile.activityLevel === 'sedentary') {
        if (calories < 300) {
          parts.push(`**Activity Level** (${activityMap[userProfile.activityLevel]}): Appropriate calorie level (${calories}kcal) for your activity.`);
        }
      }
    }
  }

  // Today's state consideration
  if (dailyCheckin) {
    const todayParts: string[] = [];
    
    if (dailyCheckin.energy < 4) {
      todayParts.push('feeling low energy → energy-boosting ingredients recommended');
    } else if (dailyCheckin.energy > 6) {
      todayParts.push('high energy → balanced nutrition to maintain');
    }
    
    if (dailyCheckin.mood < 4) {
      todayParts.push('mood support needed → mood-enhancing ingredients beneficial');
    }
    
    if (dailyCheckin.appetite < 4) {
      if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.calories < 300) {
        todayParts.push('lower appetite → this lighter option is ideal');
      }
    } else if (dailyCheckin.appetite > 6) {
      if (smoothie.nutritionalInfo && smoothie.nutritionalInfo.calories > 350) {
        todayParts.push('good appetite → substantial enough to satisfy');
      }
    }

    if (todayParts.length > 0) {
      parts.push(`**Today's Check-in:** ${todayParts.join('; ')}.`);
    }
  }

  // Flavor preferences
  if (userProfile.flavorPreferences && userProfile.flavorPreferences.length > 0) {
    const ingredients = smoothie.ingredients.map(i => i.toLowerCase());
    const flavorMatches: string[] = [];

    userProfile.flavorPreferences.forEach(pref => {
      if (pref === 'sweet' && ingredients.some(i => ['banana', 'mango', 'dates', 'honey'].some(s => i.includes(s)))) {
        flavorMatches.push('sweet');
      } else if (pref === 'berry' && ingredients.some(i => ['strawberr', 'blueberr', 'raspberr', 'berries', 'açai', 'acai'].some(b => i.includes(b)))) {
        flavorMatches.push('berry');
      } else if (pref === 'tropical' && ingredients.some(i => ['mango', 'pineapple', 'coconut', 'passion'].some(t => i.includes(t)))) {
        flavorMatches.push('tropical');
      } else if (pref === 'green' && ingredients.some(i => ['kale', 'spinach', 'matcha', 'spirulina'].some(g => i.includes(g)))) {
        flavorMatches.push('green');
      } else if (pref === 'nutty' && ingredients.some(i => ['almond', 'peanut'].some(n => i.includes(n)))) {
        flavorMatches.push('nutty');
      } else if (pref === 'chocolatey' && ingredients.some(i => ['cacao', 'chocolate'].some(c => i.includes(c)))) {
        flavorMatches.push('chocolatey');
      }
    });

    if (flavorMatches.length > 0) {
      parts.push(`**Flavor Profile:** Matches your preferences for ${flavorMatches.join(', ')} flavors.`);
    }
  }

  // Location convenience
  if (cafe.distance !== undefined) {
    if (cafe.distance < 0.5) {
      parts.push(`📍 **Location:** Very convenient - only ${(cafe.distance * 1000).toFixed(0)}m away.`);
    } else if (cafe.distance < 2) {
      parts.push(`📍 **Location:** Nearby - ${cafe.distance.toFixed(1)}km from you.`);
    } else if (cafe.distance > 5) {
      parts.push(`📍 **Location:** ${cafe.distance.toFixed(1)}km away - plan your trip.`);
    }
  }

  return parts.join('\n\n');
}

// Get best matches across all cafés
export function findBestCafeMatches(
  cafes: Cafe[],
  userProfile: UserProfile,
  dailyCheckin?: {
    energy: number;
    mood: number;
    appetite: number;
  },
  limit: number = 10
): SmoothieMatch[] {
  const allMatches: SmoothieMatch[] = [];

  cafes.forEach(cafe => {
    cafe.smoothies.forEach(smoothie => {
      const match = calculateSmoothieMatch(smoothie, cafe, userProfile, dailyCheckin);
      allMatches.push(match);
    });
  });

  // Sort by match score and return top matches
  return allMatches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

// Get matches organized by café
export function getCafeMatchResults(
  cafes: Cafe[],
  userProfile: UserProfile,
  dailyCheckin?: {
    energy: number;
    mood: number;
    appetite: number;
  }
): CafeMatchResult[] {
  return cafes.map(cafe => {
    const smoothieMatches = cafe.smoothies.map(smoothie =>
      calculateSmoothieMatch(smoothie, cafe, userProfile, dailyCheckin)
    );

    const topMatches = smoothieMatches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

    const averageMatchScore = Math.round(
      smoothieMatches.reduce((sum, match) => sum + match.matchScore, 0) / smoothieMatches.length
    );

    return {
      cafe,
      topMatches,
      averageMatchScore
    };
  }).sort((a, b) => b.averageMatchScore - a.averageMatchScore);
}
