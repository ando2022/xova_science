export const mockNutritionalProfile = {
  user_id: 'mock-user-id',
  activity_level: 'moderate',
  health_goals: ['energy', 'weight-loss', 'muscle-gain'],
  dietary_restrictions: ['vegetarian'],
  allergens: ['nuts'],
  preferences: ['sweet', 'creamy'],
  
  // Generated targets (matching NutritionalProfileDisplay interface)
  daily_targets: {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fiber: 25,
    iron: 18,
    vitamin_c: 90,
    calcium: 1000,
    magnesium: 400,
    omega3: 2
  },
  
  // Scientific rationale
  scientific_rationale: 'This profile is optimized for energy and weight management with higher protein intake for muscle support and iron for oxygen transport.',
  
  // Priority nutrients
  priority_nutrients: ['Protein', 'Iron', 'Vitamin C', 'Fiber']
};

