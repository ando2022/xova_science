import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Activity, Target, Zap, Brain, Heart, Shield, Clock, Sun, Moon, CheckCircle, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { UserProfile } from '../lib/mock-auth';
import { generateSmoothie, SmoothieRecipe } from '../lib/smoothie-generator';

interface NutritionalOverviewProps {
  profile: UserProfile;
  onGenerateSmoothie: (recipe: SmoothieRecipe) => void;
}

interface MealNutrientTargets {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'nutritional-target';
  timeContext: string;
  calories: { target: number; percentage: number };
  protein: { target: number; percentage: number };
  carbs: { target: number; percentage: number };
  fiber: { target: number; percentage: number };
  focusNutrients: string[];
  mealGoals: string[];
}

export function NutritionalOverview({ profile, onGenerateSmoothie }: NutritionalOverviewProps) {
  const [mealTargets, setMealTargets] = useState<MealNutrientTargets | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [generatedSmoothie, setGeneratedSmoothie] = useState<SmoothieRecipe | null>(null);
  const [showSmoothieAnalysis, setShowSmoothieAnalysis] = useState(false);
  const [multipleRecipes, setMultipleRecipes] = useState<SmoothieRecipe[]>([]);
  const [showMultipleRecipes, setShowMultipleRecipes] = useState(false);

  useEffect(() => {
    if (profile) {
      calculateMealTargets();
    }
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, [profile]);

  const calculateMealTargets = () => {
    if (!profile) {
      return;
    }

    const hour = currentTime.getHours();
    let mealType: 'breakfast' | 'lunch' | 'dinner' | 'nutritional-target';
    let timeContext: string;
    let calorieMultiplier: number;

    // Determine meal type and context based on time of day
    if (hour >= 6 && hour < 11) {
      mealType = 'breakfast';
      timeContext = 'Morning Energy Boost';
      calorieMultiplier = 0.25; // 25% of daily calories for breakfast
    } else if (hour >= 11 && hour < 15) {
      mealType = 'lunch';
      timeContext = 'Midday Sustenance';
      calorieMultiplier = 0.35; // 35% of daily calories for lunch
    } else if (hour >= 15 && hour < 19) {
      mealType = 'nutritional-target';
      timeContext = 'Afternoon Energy Smoothie';
      calorieMultiplier = 0.15; // 15% of daily calories for afternoon smoothie
    } else {
      mealType = 'dinner';
      timeContext = 'Evening Recovery';
      calorieMultiplier = 0.25; // 25% of daily calories for dinner
    }

    // Calculate daily targets based on profile
    const baseCalories = profile.activityLevel === 'athlete' ? 2500 : 
                        profile.activityLevel === 'very-active' ? 2200 : 
                        profile.activityLevel === 'moderate' ? 2000 : 1800;
    
    const baseProtein = (profile.healthGoals && profile.healthGoals.includes('muscle-gain')) ? 120 : 
                       profile.activityLevel === 'athlete' ? 100 : 80;
    
    const baseCarbs = profile.activityLevel === 'athlete' ? 300 : 250;
    const baseFiber = 30;

    // Calculate meal-specific targets
    const mealCalories = Math.round(baseCalories * calorieMultiplier);
    const mealProtein = Math.round(baseProtein * calorieMultiplier);
    const mealCarbs = Math.round(baseCarbs * calorieMultiplier);
    const mealFiber = Math.round(baseFiber * calorieMultiplier);

    // Determine focus nutrients based on meal type and profile
    const focusNutrients = [];
    const mealGoals = [];

    // Time-based nutrient focus
    if (mealType === 'breakfast') {
      focusNutrients.push('B-Vitamins', 'Iron', 'Vitamin C');
      mealGoals.push('Sustained Energy', 'Mental Clarity', 'Immune Support');
    } else if (mealType === 'lunch') {
      focusNutrients.push('Protein', 'Complex Carbs', 'Antioxidants');
      mealGoals.push('Satiety', 'Stable Blood Sugar', 'Cognitive Performance');
    } else if (mealType === 'nutritional-target') {
      focusNutrients.push('Magnesium', 'Healthy Fats', 'Fiber');
      mealGoals.push('Sustained Energy', 'Mental Focus', 'Digestive Health');
    } else { // dinner
      focusNutrients.push('Tryptophan', 'Magnesium', 'Antioxidants');
      mealGoals.push('Recovery', 'Sleep Quality', 'Muscle Repair');
    }

    // Add profile-specific nutrients
    if (profile.healthGoals && profile.healthGoals.includes('energy')) {
      if (!focusNutrients.includes('B-Vitamins')) {
        focusNutrients.push('B-Vitamins');
      }
      if (!mealGoals.includes('Energy Metabolism')) {
        mealGoals.push('Energy Metabolism');
      }
    }
    
    if (profile.healthGoals && profile.healthGoals.includes('muscle-gain')) {
      if (!focusNutrients.includes('Protein')) {
        focusNutrients.push('Protein');
      }
      if (!mealGoals.includes('Muscle Recovery')) {
        mealGoals.push('Muscle Recovery');
      }
    }
    
    if (profile.stressLevel === 'high') {
      if (!focusNutrients.includes('Magnesium')) {
        focusNutrients.push('Magnesium');
      }
      if (!mealGoals.includes('Stress Relief')) {
        mealGoals.push('Stress Relief');
      }
    }

    setMealTargets({
      mealType,
      timeContext,
      calories: { target: mealCalories, percentage: 0 }, // Will be filled by smoothie
      protein: { target: mealProtein, percentage: 0 },
      carbs: { target: mealCarbs, percentage: 0 },
      fiber: { target: mealFiber, percentage: 0 },
      focusNutrients,
      mealGoals
    });
  };

  const generatePersonalizedSmoothie = () => {
    if (!profile || !mealTargets) return;
    
    // Create mood data based on time of day and profile
    const moodData = {
      energyLevel: mealTargets.mealType === 'breakfast' ? 'medium' : 
                  mealTargets.mealType === 'lunch' ? 'high' : 'low',
      mood: mealTargets.mealType === 'breakfast' ? 'happy' : 'calm',
      appetite: mealTargets.mealType === 'breakfast' ? 'normal' : 'light',
      specificNeeds: mealTargets.focusNutrients.map(nutrient => 
        nutrient.toLowerCase().replace(/\s+/g, '-')
      )
    };
    
    const smoothie = generateSmoothie(profile, moodData);
    setGeneratedSmoothie(smoothie);
    setShowSmoothieAnalysis(true);
  };

  // Get personalized nutrient analysis based on user profile
  const getPersonalizedNutrientAnalysis = () => {
    if (!profile) return [];
    
    const analysis = [];
    
    // Activity-based nutrients
    if (profile.activityLevel === 'athlete' || profile.activityLevel === 'very-active') {
      analysis.push({
        nutrient: 'Protein',
        amount: '25-30g',
        reason: 'Essential for muscle repair and recovery after intense workouts',
        scientific: 'Branched-chain amino acids (BCAAs) in protein support muscle protein synthesis and reduce exercise-induced muscle damage',
        deficiency: 'Without adequate protein, your muscles can\'t recover properly, leading to decreased performance and increased injury risk'
      });
      analysis.push({
        nutrient: 'Complex Carbohydrates',
        amount: '45-60g',
        reason: 'Fuel for sustained energy during and after training',
        scientific: 'Glycogen stores in muscles and liver are replenished by complex carbs, providing sustained energy release',
        deficiency: 'Low carb intake leads to muscle glycogen depletion, causing fatigue and poor recovery'
      });
    }
    
    // Health goals-based nutrients
    if (profile.healthGoals?.includes('energy')) {
      analysis.push({
        nutrient: 'B-Vitamins',
        amount: '100-200% RDA',
        reason: 'Critical for energy metabolism and nervous system function',
        scientific: 'B-vitamins act as coenzymes in cellular energy production (ATP synthesis) and help convert food to usable energy',
        deficiency: 'B-vitamin deficiency causes fatigue, brain fog, and poor energy metabolism'
      });
    }
    
    if (profile.healthGoals?.includes('immunity')) {
      analysis.push({
        nutrient: 'Vitamin C',
        amount: '200-500mg',
        reason: 'Supports immune cell function and antioxidant protection',
        scientific: 'Vitamin C enhances white blood cell function, supports collagen synthesis, and acts as a powerful antioxidant',
        deficiency: 'Low vitamin C reduces immune response and increases susceptibility to infections'
      });
    }
    
    if (profile.healthGoals?.includes('stress')) {
      analysis.push({
        nutrient: 'Magnesium',
        amount: '300-400mg',
        reason: 'Essential for stress hormone regulation and muscle relaxation',
        scientific: 'Magnesium regulates cortisol production, supports GABA receptors, and helps muscles relax by blocking calcium channels',
        deficiency: 'Magnesium deficiency increases stress sensitivity, anxiety, and muscle tension'
      });
    }
    
    // Time-based nutrients
    if (mealTargets.mealType === 'breakfast') {
      analysis.push({
        nutrient: 'Iron',
        amount: '8-12mg',
        reason: 'Supports oxygen transport and morning energy',
        scientific: 'Iron is essential for hemoglobin production, which transports oxygen to cells for energy production',
        deficiency: 'Iron deficiency causes fatigue, weakness, and poor cognitive function'
      });
    }
    
    return analysis;
  };

  const nutrientAnalysis = getPersonalizedNutrientAnalysis();

  const generateMultipleRecipes = () => {
    if (!profile || !mealTargets) return;
    
    const recipes = [];
    const variations = [
      { energyLevel: 'high', mood: 'happy', appetite: 'hungry' },
      { energyLevel: 'medium', mood: 'calm', appetite: 'normal' },
      { energyLevel: 'low', mood: 'tired', appetite: 'light' }
    ];
    
    variations.forEach((moodData, index) => {
      const recipe = generateSmoothie(profile, {
        ...moodData,
        specificNeeds: mealTargets.focusNutrients.map(nutrient => 
          nutrient.toLowerCase().replace(/\s+/g, '-')
        )
      });
      recipes.push({
        ...recipe,
        name: `${recipe.name} (Option ${index + 1})`,
        variation: moodData
      });
    });
    
    setMultipleRecipes(recipes);
    setShowMultipleRecipes(true);
  };

  const proceedWithSmoothie = () => {
    if (generatedSmoothie) {
      onGenerateSmoothie(generatedSmoothie);
    }
  };

  const proceedWithWeeklyPlan = () => {
    // Navigate to weekly planning
    // This would be implemented in a separate component
    console.log('Navigate to weekly planning');
  };

  const getMealIcon = () => {
    if (!mealTargets) {
      return <Clock className="w-8 h-8" />;
    }
    
    switch (mealTargets.mealType) {
      case 'breakfast':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'lunch':
        return <Activity className="w-8 h-8 text-blue-500" />;
      case 'nutritional-target':
        return <Zap className="w-8 h-8 text-orange-500" />;
      case 'dinner':
        return <Moon className="w-8 h-8 text-purple-500" />;
      default:
        return <Clock className="w-8 h-8" />;
    }
  };

  const getMealColor = () => {
    if (!mealTargets) return 'from-xova-primary to-xova-secondary';
    
    switch (mealTargets.mealType) {
      case 'breakfast':
        return 'from-yellow-400 to-orange-500';
      case 'lunch':
        return 'from-blue-400 to-blue-600';
      case 'nutritional-target':
        return 'from-orange-400 to-red-500';
      case 'dinner':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-xova-primary to-xova-secondary';
    }
  };

  if (!mealTargets) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-xova-primary/20 to-xova-secondary/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
          {getMealIcon()}
        </div>
        <h1 className="text-4xl mb-2">Your {mealTargets.timeContext} Plan</h1>
        <p className="text-xl text-muted-foreground">
          Personalized nutrition targets for your {mealTargets.mealType} based on the time of day and your profile
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Current time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Meal Overview Card */}
      <Card className="p-6 border-2 border-xova-accent/30 bg-gradient-to-br from-white to-xova-accent/5">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 bg-gradient-to-br ${getMealColor()} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
            {getMealIcon()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold capitalize">{mealTargets.mealType} Targets</h2>
            <p className="text-muted-foreground">{mealTargets.timeContext}</p>
          </div>
        </div>

        {/* Macro Targets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-xova-primary/10 rounded-lg border border-xova-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Calories</p>
            <p className="text-2xl text-xova-primary">{mealTargets.calories.target}</p>
            <p className="text-xs text-muted-foreground">Target</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Protein</p>
            <p className="text-2xl text-blue-700">{mealTargets.protein.target}g</p>
            <p className="text-xs text-muted-foreground">Target</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Carbs</p>
            <p className="text-2xl text-purple-700">{mealTargets.carbs.target}g</p>
            <p className="text-xs text-muted-foreground">Target</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Fiber</p>
            <p className="text-2xl text-orange-700">{mealTargets.fiber.target}g</p>
            <p className="text-xs text-muted-foreground">Target</p>
          </div>
        </div>

        {/* Personalized Nutrient Analysis */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-xova-primary" />
            Your Personalized Nutrient Needs
          </h3>
          <div className="space-y-4">
            {nutrientAnalysis.map((nutrient, index) => (
              <Card key={index} className="p-4 border border-xova-primary/20 bg-gradient-to-r from-white to-xova-primary/5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-xova-primary">{nutrient.nutrient}</h4>
                    <p className="text-sm text-xova-accent font-medium">{nutrient.amount}</p>
                  </div>
                  <Badge className="bg-xova-primary/10 text-xova-primary border-xova-primary/20">
                    {nutrient.reason}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Scientific Basis:</span> {nutrient.scientific}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-800">
                      <span className="font-medium">Why You Need This:</span> {nutrient.deficiency}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Meal Goals */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-xova-accent" />
            Goals for This Meal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mealTargets.mealGoals.map((goal, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-xova-accent/10 to-xova-success/10 rounded-lg border border-xova-accent/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-xova-accent rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{goal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Profile-Based Insights */}
      <Card className="p-6">
        <h3 className="text-xl mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-xova-success" />
          Personalized for Your Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Activity Level: {profile.activityLevel}</h4>
            <p className="text-sm text-green-700">
              {profile.activityLevel === 'athlete' && 'High protein and carb targets for performance and recovery'}
              {profile.activityLevel === 'very-active' && 'Increased protein for muscle maintenance and energy'}
              {profile.activityLevel === 'moderate' && 'Balanced macros for sustained energy throughout the day'}
              {profile.activityLevel === 'light' && 'Moderate targets focused on overall wellness'}
              {profile.activityLevel === 'sedentary' && 'Lower calorie targets with focus on nutrient density'}
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Health Goals</h4>
            <p className="text-sm text-blue-700">
              {profile.healthGoals && profile.healthGoals.length > 0 
                ? `Focusing on: ${profile.healthGoals.join(', ')}`
                : 'General wellness and balanced nutrition'
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Generate Smoothie Section */}
      {!showSmoothieAnalysis ? (
        <Card className="p-6 text-center bg-gradient-to-r from-xova-primary/5 to-xova-secondary/5">
          <h3 className="text-xl mb-2">Ready to Create Your Perfect {mealTargets.mealType === 'nutritional-target' ? 'Afternoon' : mealTargets.mealType} Smoothie?</h3>
          <p className="text-muted-foreground mb-6">
            Generate a personalized smoothie that meets your {mealTargets.mealType === 'nutritional-target' ? 'afternoon nutrition needs' : `${mealTargets.mealType} nutrition targets`} and supports your goals
          </p>
          <div className="space-y-3">
            <Button
              onClick={generatePersonalizedSmoothie}
              className="w-full bg-gradient-to-r from-xova-primary to-xova-accent hover:from-xova-primary/90 hover:to-xova-accent/90 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate My Perfect Smoothie
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={generateMultipleRecipes}
                variant="outline"
                className="border-xova-primary/30 text-xova-primary hover:bg-xova-primary/5"
              >
                <Zap className="w-4 h-4 mr-2" />
                Compare Options
              </Button>
              <Button
                onClick={proceedWithWeeklyPlan}
                variant="outline"
                className="border-xova-accent/30 text-xova-accent hover:bg-xova-accent/5"
              >
                <Clock className="w-4 h-4 mr-2" />
                Weekly Plan
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        /* Smoothie Analysis */
        <Card className="p-8 border-2 border-xova-success/30 bg-gradient-to-br from-white to-xova-success/5">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-xova-success to-xova-accent rounded-2xl mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{generatedSmoothie?.name}</h3>
            <p className="text-muted-foreground">Your AI-generated smoothie recipe</p>
          </div>

          {/* Scientific Analysis */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-xova-success" />
              Why This Smoothie Is Perfect For You
            </h4>
            
            <div className="space-y-4">
              {nutrientAnalysis.map((nutrient, index) => (
                <Card key={index} className="p-4 border border-xova-success/20 bg-gradient-to-r from-white to-xova-success/5">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-semibold text-xova-success">{nutrient.nutrient} Optimization</h5>
                    <Badge className="bg-xova-success/10 text-xova-success">{nutrient.amount}</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">How It Works:</span> {nutrient.scientific}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Your Benefit:</span> {nutrient.reason}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Nutritional Breakdown */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Nutritional Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-xova-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="text-xl font-bold text-xova-primary">{generatedSmoothie?.nutritionalInfo.totalCalories}</p>
                <p className="text-xs text-muted-foreground">of {mealTargets.calories.target} target</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="text-xl font-bold text-blue-700">{generatedSmoothie?.nutritionalInfo.totalProtein}g</p>
                <p className="text-xs text-muted-foreground">of {mealTargets.protein.target}g target</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="text-xl font-bold text-purple-700">{generatedSmoothie?.nutritionalInfo.totalCarbs}g</p>
                <p className="text-xs text-muted-foreground">of {mealTargets.carbs.target}g target</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Fiber</p>
                <p className="text-xl font-bold text-orange-700">{generatedSmoothie?.nutritionalInfo.totalFiber}g</p>
                <p className="text-xs text-muted-foreground">of {mealTargets.fiber.target}g target</p>
              </div>
            </div>
          </div>

          {/* Key Ingredients */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Key Ingredients & Benefits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {generatedSmoothie?.ingredients.slice(0, 4).map((ingredient, index) => (
                <div key={index} className="p-3 bg-white/50 rounded-lg border border-xova-accent/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{ingredient.ingredient.name}</span>
                    <span className="text-sm text-xova-accent">{ingredient.amount}g</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{ingredient.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => setShowSmoothieAnalysis(false)}
              variant="outline"
              className="flex-1"
            >
              Back to Analysis
            </Button>
            <Button
              onClick={proceedWithSmoothie}
              className="flex-1 bg-gradient-to-r from-xova-success to-xova-accent hover:from-xova-success/90 hover:to-xova-accent/90"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Proceed with This Smoothie
            </Button>
          </div>
        </Card>
      )}

      {/* Multiple Recipes Comparison */}
      {showMultipleRecipes && multipleRecipes.length > 0 && (
        <Card className="p-8 border-2 border-xova-primary/30 bg-gradient-to-br from-white to-xova-primary/5">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Compare Your Options</h3>
            <p className="text-muted-foreground">Choose the variation that best fits your current mood and energy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {multipleRecipes.map((recipe, index) => (
              <Card key={index} className="p-4 border border-xova-primary/20 hover:border-xova-primary/40 cursor-pointer transition-all">
                <div className="text-center mb-4">
                  <h4 className="font-semibold mb-2">{recipe.name}</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Energy: <span className="font-medium capitalize">{recipe.variation.energyLevel}</span></p>
                    <p>Mood: <span className="font-medium capitalize">{recipe.variation.mood}</span></p>
                    <p>Appetite: <span className="font-medium capitalize">{recipe.variation.appetite}</span></p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calories:</span>
                    <span className="font-medium">{recipe.nutritionalInfo.totalCalories}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Protein:</span>
                    <span className="font-medium">{recipe.nutritionalInfo.totalProtein}g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Carbs:</span>
                    <span className="font-medium">{recipe.nutritionalInfo.totalCarbs}g</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-xova-primary to-xova-accent hover:from-xova-primary/90 hover:to-xova-accent/90"
                  onClick={() => {
                    setGeneratedSmoothie(recipe);
                    setShowMultipleRecipes(false);
                    setShowSmoothieAnalysis(true);
                  }}
                >
                  Choose This Option
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => setShowMultipleRecipes(false)}
              variant="outline"
              className="flex-1"
            >
              Back to Analysis
            </Button>
            <Button
              onClick={proceedWithWeeklyPlan}
              className="flex-1 bg-gradient-to-r from-xova-accent to-xova-success hover:from-xova-accent/90 hover:to-xova-success/90"
            >
              <Clock className="w-4 h-4 mr-2" />
              Create Weekly Plan
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
