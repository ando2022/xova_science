import { Card } from './ui/card';
import { Button } from './ui/button';
import { Target, Activity, Utensils, AlertTriangle, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface NutritionalProfile {
  user_id: string;
  activity_level: string;
  health_goals: string[];
  dietary_restrictions: string[];
  allergens: string[];
  preferences: string[];
  
  // Generated targets
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
  
  // Scientific rationale
  scientific_rationale: string;
  
  // Priority nutrients
  priority_nutrients: string[];
}

interface NutritionalProfileDisplayProps {
  profile: NutritionalProfile;
  onContinue: () => void;
  onEdit: () => void;
}

export function NutritionalProfileDisplay({ profile, onContinue, onEdit }: NutritionalProfileDisplayProps) {
  const formatActivityLevel = (level: string) => {
    const levels = {
      'sedentary': 'Sedentary',
      'light': 'Light Activity',
      'moderate': 'Moderate Activity',
      'active': 'Active',
      'very-active': 'Very Active'
    };
    return levels[level] || level;
  };

  const formatHealthGoals = (goals: string[]) => {
    const goalLabels = {
      'energy': 'Energy Boost',
      'weight-loss': 'Weight Management',
      'muscle-gain': 'Muscle Building',
      'stress-relief': 'Stress Relief',
      'immune-support': 'Immune Support',
      'heart-health': 'Heart Health',
      'digestive-health': 'Digestive Health',
      'anti-aging': 'Anti-Aging'
    };
    return goals.map(goal => goalLabels[goal] || goal);
  };

  const getNutrientColor = (nutrient: string, value: number) => {
    const ranges = {
      calories: { low: 1500, high: 2500 },
      protein: { low: 50, high: 100 },
      carbs: { low: 150, high: 300 },
      fiber: { low: 20, high: 35 },
      iron: { low: 15, high: 25 },
      vitamin_c: { low: 75, high: 150 },
      calcium: { low: 800, high: 1200 },
      magnesium: { low: 300, high: 500 },
      omega3: { low: 1.5, high: 3 }
    };

    const range = ranges[nutrient];
    if (!range) return 'text-gray-600';

    if (value < range.low) return 'text-red-600';
    if (value > range.high) return 'text-blue-600';
    return 'text-green-600';
  };

  const getNutrientIcon = (nutrient: string) => {
    const icons = {
      calories: '🔥',
      protein: '💪',
      carbs: '🌾',
      fiber: '🌿',
      iron: '🩸',
      vitamin_c: '🍊',
      calcium: '🦴',
      magnesium: '⚡',
      omega3: '🐟'
    };
    return icons[nutrient] || '📊';
  };

  const getNutrientUnit = (nutrient: string) => {
    const units = {
      calories: 'kcal',
      protein: 'g',
      carbs: 'g',
      fiber: 'g',
      iron: 'mg',
      vitamin_c: 'mg',
      calcium: 'mg',
      magnesium: 'mg',
      omega3: 'g'
    };
    return units[nutrient] || '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Your Personalized Nutritional Profile</h1>
        <p className="text-muted-foreground">
          Scientifically optimized for your goals, activity level, and dietary needs
        </p>
      </div>

      {/* Profile Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Activity Level */}
        <Card className="p-6 text-center">
          <Activity className="w-8 h-8 text-xova-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Activity Level</h3>
          <p className="text-sm text-muted-foreground">{formatActivityLevel(profile.activity_level)}</p>
        </Card>

        {/* Health Goals */}
        <Card className="p-6 text-center">
          <Target className="w-8 h-8 text-xova-accent mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Health Goals</h3>
          <p className="text-sm text-muted-foreground">{formatHealthGoals(profile.health_goals).length} selected</p>
        </Card>

        {/* Dietary Profile */}
        <Card className="p-6 text-center">
          <Utensils className="w-8 h-8 text-xova-success mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Dietary Profile</h3>
          <p className="text-sm text-muted-foreground">
            {profile.dietary_restrictions.length > 0 
              ? `${profile.dietary_restrictions.length} restrictions` 
              : 'No restrictions'}
          </p>
        </Card>
      </div>

      {/* Daily Nutritional Targets */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-xova-primary" />
          <h2 className="text-xl font-bold">Daily Nutritional Targets</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(profile.daily_targets).map(([nutrient, value]) => (
            <div key={nutrient} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getNutrientIcon(nutrient)}</span>
                <span className="font-medium capitalize">{nutrient.replace('_', ' ')}</span>
              </div>
              <div className={`text-2xl font-bold ${getNutrientColor(nutrient, value)}`}>
                {value}
                <span className="text-sm text-gray-500 ml-1">{getNutrientUnit(nutrient)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Priority Nutrients */}
      {profile.priority_nutrients.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-xova-success" />
            <h2 className="text-xl font-bold">Priority Nutrients for Your Goals</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {profile.priority_nutrients.map((nutrient) => (
              <span 
                key={nutrient}
                className="px-3 py-1 bg-xova-success/10 text-xova-success rounded-full text-sm font-medium"
              >
                {nutrient}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Scientific Rationale */}
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-blue-600 text-sm">🧬</span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Scientific Foundation</h2>
            <p className="text-gray-700 leading-relaxed">
              {profile.scientific_rationale}
            </p>
          </div>
        </div>
      </Card>

      {/* Dietary Restrictions & Allergens */}
      {(profile.dietary_restrictions.length > 0 || profile.allergens.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dietary Restrictions */}
          {profile.dietary_restrictions.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Utensils className="w-6 h-6 text-xova-accent" />
                <h3 className="font-bold">Dietary Restrictions</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.dietary_restrictions.map((restriction) => (
                  <span 
                    key={restriction}
                    className="px-3 py-1 bg-xova-accent/10 text-xova-accent rounded-full text-sm"
                  >
                    {restriction.charAt(0).toUpperCase() + restriction.slice(1)}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Allergens */}
          {profile.allergens.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="font-bold">Allergens to Avoid</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.allergens.map((allergen) => (
                  <span 
                    key={allergen}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                  >
                    {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Preferences */}
      {profile.preferences.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-pink-500" />
            <h3 className="font-bold">Your Flavor Preferences</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.preferences.map((preference) => (
              <span 
                key={preference}
                className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm"
              >
                {preference.charAt(0).toUpperCase() + preference.slice(1)}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onEdit} className="px-8">
          Edit Profile
        </Button>
        <Button 
          onClick={onContinue}
          className="bg-gradient-to-r from-xova-primary to-xova-secondary px-8"
        >
          Generate My Smoothies
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-xs text-muted-foreground max-w-2xl mx-auto">
        <p>
          This nutritional profile is generated based on scientific guidelines and your personal preferences. 
          Always consult with a healthcare provider before making significant dietary changes.
        </p>
      </div>
    </div>
  );
}

