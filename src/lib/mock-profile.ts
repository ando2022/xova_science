import { NutritionalProfile } from './smoothie-generator';

export const mockNutritionalProfile: NutritionalProfile = {
  activity_level: 'moderate',
  health_goals: ['energy', 'weight-loss', 'muscle-gain'],
  dietary_restrictions: ['vegetarian'],
  allergens: ['nuts'],
  preferences: ['sweet', 'creamy'],
  stress_level: 'moderate',
  sleep_quality: 'good',
  meal_timing: 'morning',
  budget_preference: 'mid-range',
  cooking_time: 'quick',
  // Nutritional targets (mock data)
  daily_calories: 2000,
  protein_target: 120,
  fiber_target: 25,
  vitamin_c_target: 90,
  iron_target: 18,
  calcium_target: 1000,
  // Priority nutrients based on profile
  priority_nutrients: ['protein', 'iron', 'vitamin_c', 'fiber'],
  // Deficiency risks
  deficiency_risks: ['iron', 'vitamin_d'],
  // Health conditions
  health_conditions: [],
  // Medication interactions
  medication_interactions: [],
  // Lifestyle factors
  lifestyle_factors: {
    exercise_frequency: '3-4 times per week',
    work_stress: 'moderate',
    sleep_schedule: 'regular'
  }
};

