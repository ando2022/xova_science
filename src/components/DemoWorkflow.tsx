import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Sparkles, Clock, Sun, Activity, Zap, Moon, Target, Brain, Heart, Shield, MapPin, Package, Users, AlertCircle } from 'lucide-react';

interface DemoWorkflowProps {
  onNavigate: (page: string) => void;
}

// Default demo profile - transparent about being demo
const DEMO_PROFILE = {
  age: 30,
  gender: 'non-binary',
  activityLevel: 'moderate' as const,
  healthGoals: ['energy', 'immunity', 'stress-reduction'],
  dietaryRestrictions: ['none'],
  allergens: ['none'],
  flavorPreferences: ['sweet', 'fruity'],
  stressLevel: 'moderate' as const,
  sleepQuality: 'good' as const,
  isDemo: true // Flag to indicate this is a demo
};

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

export function DemoWorkflow({ onNavigate }: DemoWorkflowProps) {
  const [step, setStep] = useState<'nutrition' | 'smoothie' | 'options'>('nutrition');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mealTargets, setMealTargets] = useState<MealNutrientTargets | null>(null);

  useEffect(() => {
    calculateMealTargets();
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const calculateMealTargets = () => {
    const hour = currentTime.getHours();
    let mealType: 'breakfast' | 'lunch' | 'dinner' | 'nutritional-target';
    let timeContext: string;
    let calorieMultiplier: number;

    // Determine meal type and context based on time of day
    if (hour >= 6 && hour < 11) {
      mealType = 'breakfast';
      timeContext = 'Morning Energy Boost';
      calorieMultiplier = 0.25;
    } else if (hour >= 11 && hour < 15) {
      mealType = 'lunch';
      timeContext = 'Midday Sustenance';
      calorieMultiplier = 0.35;
    } else if (hour >= 15 && hour < 19) {
      mealType = 'nutritional-target';
      timeContext = 'Afternoon Energy Smoothie';
      calorieMultiplier = 0.15;
    } else {
      mealType = 'dinner';
      timeContext = 'Evening Recovery';
      calorieMultiplier = 0.25;
    }

    // Calculate targets for demo profile (moderate activity, 30 years old)
    const baseCalories = 2000;
    const baseProtein = 80;
    const baseCarbs = 250;
    const baseFiber = 30;

    const mealCalories = Math.round(baseCalories * calorieMultiplier);
    const mealProtein = Math.round(baseProtein * calorieMultiplier);
    const mealCarbs = Math.round(baseCarbs * calorieMultiplier);
    const mealFiber = Math.round(baseFiber * calorieMultiplier);

    // Determine focus nutrients based on meal type and demo profile
    const focusNutrients = [];
    const mealGoals = [];

    if (mealType === 'breakfast') {
      focusNutrients.push('B-Vitamins', 'Iron', 'Vitamin C');
      mealGoals.push('Sustained Energy', 'Mental Clarity', 'Immune Support');
    } else if (mealType === 'lunch') {
      focusNutrients.push('Protein', 'Complex Carbs', 'Antioxidants');
      mealGoals.push('Satiety', 'Stable Blood Sugar', 'Cognitive Performance');
    } else if (mealType === 'nutritional-target') {
      focusNutrients.push('Magnesium', 'Healthy Fats', 'Fiber');
      mealGoals.push('Sustained Energy', 'Mental Focus', 'Digestive Health');
    } else {
      focusNutrients.push('Tryptophan', 'Magnesium', 'Antioxidants');
      mealGoals.push('Recovery', 'Sleep Quality', 'Muscle Repair');
    }

    // Add demo profile specific nutrients
    if (DEMO_PROFILE.healthGoals.includes('energy')) {
      if (!focusNutrients.includes('B-Vitamins')) {
        focusNutrients.push('B-Vitamins');
      }
      if (!mealGoals.includes('Energy Metabolism')) {
        mealGoals.push('Energy Metabolism');
      }
    }
    
    if (DEMO_PROFILE.healthGoals.includes('immunity')) {
      if (!focusNutrients.includes('Vitamin C')) {
        focusNutrients.push('Vitamin C');
      }
      if (!mealGoals.includes('Immune Support')) {
        mealGoals.push('Immune Support');
      }
    }
    
    if (DEMO_PROFILE.stressLevel === 'moderate') {
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
      calories: { target: mealCalories, percentage: 0 },
      protein: { target: mealProtein, percentage: 0 },
      carbs: { target: mealCarbs, percentage: 0 },
      fiber: { target: mealFiber, percentage: 0 },
      focusNutrients,
      mealGoals
    });
  };

  const getMealIcon = () => {
    if (!mealTargets) return <Clock className="w-8 h-8" />;
    
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
    if (!mealTargets) {
      return 'from-xova-primary to-xova-secondary';
    }
    
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p>Loading your demo experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-xova-primary/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary bg-clip-text text-transparent font-bold">
              XOVA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-xova-accent/10 text-xova-accent border-xova-accent/20">
              <Users className="w-3 h-3 mr-1" />
              Demo Mode
            </Badge>
            <Button variant="outline" onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 'nutrition' && (
          <div className="space-y-6">
            {/* Demo Notice */}
            <Card className="p-6 border-2 border-xova-accent/30 bg-gradient-to-r from-xova-accent/5 to-xova-success/5">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-xova-accent" />
                <h3 className="text-lg font-semibold text-xova-accent">Demo Experience</h3>
              </div>
              <p className="text-gray-700 mb-4">
                You're exploring XOVA with a sample profile: 30-year-old, moderate activity level, focusing on energy and immunity. 
                This shows how personalized nutrition works for someone with similar goals to yours.
              </p>
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary"
                >
                  Create Account for Your Profile
                </Button>
                <span className="text-sm text-muted-foreground">or continue exploring the demo</span>
              </div>
            </Card>

            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-xova-primary/20 to-xova-secondary/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
                {getMealIcon()}
              </div>
              <h1 className="text-4xl mb-2">Your {mealTargets.timeContext} Plan</h1>
              <p className="text-xl text-muted-foreground">
                Personalized nutrition targets for your {mealTargets.mealType} based on the time of day
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

              {/* Focus Nutrients */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-xova-primary" />
                  Key Nutrients for This Meal
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mealTargets.focusNutrients.map((nutrient, index) => (
                    <Badge key={index} className="bg-xova-primary/10 text-xova-primary border-xova-primary/20">
                      {nutrient}
                    </Badge>
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

            {/* Demo Profile Insights */}
            <Card className="p-6">
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-xova-success" />
                Based on Demo Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Activity Level: Moderate</h4>
                  <p className="text-sm text-green-700">
                    Balanced macro targets for sustained energy throughout the day with moderate protein for muscle maintenance.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Health Goals: Energy & Immunity</h4>
                  <p className="text-sm text-blue-700">
                    Focus on B-vitamins for energy metabolism and vitamin C for immune support, with stress-reduction nutrients.
                  </p>
                </div>
              </div>
            </Card>

            {/* Generate Smoothie Button */}
            <Card className="p-6 text-center bg-gradient-to-r from-xova-primary/5 to-xova-secondary/5">
              <h3 className="text-xl mb-2">Ready to See Your Perfect {mealTargets.mealType}?</h3>
              <p className="text-muted-foreground mb-6">
                Our AI will generate a smoothie recipe that meets these {mealTargets.mealType} targets
              </p>
              <button
                onClick={() => setStep('smoothie')}
                className={`w-full bg-gradient-to-r ${getMealColor()} hover:opacity-90 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl`}
              >
                Generate Demo Smoothie
              </button>
            </Card>
          </div>
        )}

        {step === 'smoothie' && (
          <div className="space-y-6">
            {/* Demo Notice */}
            <Card className="p-6 border-2 border-xova-accent/30 bg-gradient-to-r from-xova-accent/5 to-xova-success/5">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-xova-accent" />
                <h3 className="text-lg font-semibold text-xova-accent">Demo Smoothie Generated</h3>
              </div>
              <p className="text-gray-700">
                This smoothie is optimized for the demo profile. With your own account, it would be personalized to your specific health goals, dietary restrictions, and preferences.
              </p>
            </Card>

            {/* Smoothie Recipe */}
            <Card className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl mb-2">Energizing Berry Boost</h1>
                <p className="text-xl text-gray-600">Your AI-generated smoothie recipe</p>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h2 className="text-2xl mb-4">Ingredients</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Frozen mixed berries</span>
                      <span className="text-xova-primary">150g</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Banana</span>
                      <span className="text-xova-primary">1 medium</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Greek yogurt</span>
                      <span className="text-xova-primary">200ml</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Chia seeds</span>
                      <span className="text-xova-primary">15g</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Honey</span>
                      <span className="text-xova-primary">1 tsp</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Almond milk</span>
                      <span className="text-xova-primary">150ml</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nutritional Info */}
              <div className="mb-8">
                <h2 className="text-2xl mb-4">Nutritional Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-xova-primary/10 rounded-lg border border-xova-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Calories</p>
                    <p className="text-2xl text-xova-primary">485</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Protein</p>
                    <p className="text-2xl text-blue-700">22g</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Carbs</p>
                    <p className="text-2xl text-purple-700">78g</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Fiber</p>
                    <p className="text-2xl text-orange-700">12g</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h2 className="text-2xl mb-4">Why This Works</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Energy Boost</h3>
                    <p className="text-sm text-green-700">Complex carbs from berries and banana provide sustained energy, while B-vitamins support metabolism.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Immune Support</h3>
                    <p className="text-sm text-blue-700">High vitamin C content from berries supports immune function and antioxidant protection.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">Stress Reduction</h3>
                    <p className="text-sm text-purple-700">Magnesium from chia seeds and natural sugars help regulate stress hormones and mood.</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button 
                  onClick={() => setStep('nutrition')}
                  variant="outline"
                  className="flex-1"
                >
                  Back to Nutrition
                </Button>
                <Button 
                  onClick={() => setStep('options')}
                  className="bg-gradient-to-r from-xova-success to-xova-accent hover:from-xova-success/90 hover:to-xova-accent/90 shadow-lg shadow-xova-success/25 flex-1"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  See Your Options
                </Button>
              </div>
            </Card>
          </div>
        )}

        {step === 'options' && (
          <div className="space-y-6">
            {/* Demo Notice */}
            <Card className="p-6 border-2 border-xova-accent/30 bg-gradient-to-r from-xova-accent/5 to-xova-success/5">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-xova-accent" />
                <h3 className="text-lg font-semibold text-xova-accent">Demo Options</h3>
              </div>
              <p className="text-gray-700">
                See how XOVA connects your personalized smoothie to real cafés and delivery options. 
                With your own account, you'd be able to place actual orders and track your nutrition progress.
              </p>
            </Card>

            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-xova-success/20 to-xova-accent/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-xova-success" />
              </div>
              <h1 className="text-4xl mb-2">Perfect! Your "Energizing Berry Boost" is Ready</h1>
              <p className="text-xl text-muted-foreground">
                Now see how you can get your personalized smoothie
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Café Matching Option */}
              <Card className="p-8 cursor-pointer hover:shadow-xl hover:shadow-xova-secondary/10 transition-all duration-300 border-2 hover:border-xova-secondary/40 bg-gradient-to-br from-white via-xova-secondary/5 to-xova-warning/10 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-xova-secondary/5 via-transparent to-xova-warning/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-xova-secondary via-xova-warning to-xova-accent rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-xova-secondary/30 group-hover:scale-110 transition-transform duration-300 mb-6">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl mb-4 group-hover:text-xova-secondary transition-colors">Find Café Matches</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Discover cafés in Zurich & Aarau that have smoothies similar to your personalized recipe. 
                    Get location-based recommendations and pre-order options.
                  </p>
                  
                  {/* Demo Café Match */}
                  <div className="w-full mb-6 p-4 bg-white/50 rounded-lg border border-xova-secondary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Café Central</h3>
                      <Badge className="bg-xova-success/10 text-xova-success">85% Match</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">"Berry Power Smoothie" - CHF 12.50</p>
                    <p className="text-xs text-muted-foreground">0.8km away • 4.5★ rating</p>
                  </div>
                  
                  <Button 
                    onClick={() => onNavigate('cafe-matching')}
                    className="w-full bg-gradient-to-r from-xova-secondary to-xova-warning hover:from-xova-secondary/90 hover:to-xova-warning/90 shadow-lg shadow-xova-secondary/25 group-hover:shadow-xova-secondary/40 transition-all"
                    size="lg"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Browse Café Options
                  </Button>
                </div>
              </Card>

              {/* Weekly Delivery Option */}
              <Card className="p-8 cursor-pointer hover:shadow-xl hover:shadow-xova-success/10 transition-all duration-300 border-2 hover:border-xova-success/40 bg-gradient-to-br from-white via-xova-success/5 to-xova-accent/10 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-xova-success/5 via-transparent to-xova-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-xova-success via-xova-accent to-xova-primary rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-xova-success/30 group-hover:scale-110 transition-transform duration-300 mb-6">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl mb-4 group-hover:text-xova-success transition-colors">Weekly Delivery Plan</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Get pre-portioned smoothie ingredients delivered weekly. 
                    Customized to your nutritional needs with 7 or 14 smoothies per week.
                  </p>
                  
                  {/* Demo Pricing */}
                  <div className="w-full mb-6 p-4 bg-white/50 rounded-lg border border-xova-success/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">7-Day Plan</h3>
                      <span className="text-lg font-bold text-xova-success">CHF 84</span>
                    </div>
                    <p className="text-sm text-muted-foreground">12 CHF per smoothie • Save 25% vs cafés</p>
                    <p className="text-xs text-muted-foreground">Free delivery • Next Monday</p>
                  </div>
                  
                  <Button 
                    onClick={() => onNavigate('weekly-delivery')}
                    className="w-full bg-gradient-to-r from-xova-success to-xova-accent hover:from-xova-success/90 hover:to-xova-accent/90 shadow-lg shadow-xova-success/25 group-hover:shadow-xova-success/40 transition-all"
                    size="lg"
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Start Weekly Plan
                  </Button>
                </div>
              </Card>
            </div>

            {/* Create Account CTA */}
            <Card className="p-8 text-center bg-gradient-to-r from-xova-primary/5 to-xova-secondary/5 border-2 border-xova-primary/20">
              <h3 className="text-2xl mb-4">Ready to Make It Personal?</h3>
              <p className="text-muted-foreground mb-6">
                Create your account to get personalized recommendations based on your actual health goals, 
                dietary restrictions, and preferences. Save your favorite recipes and track your nutrition progress.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => onNavigate('signup')}
                  className="bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25"
                  size="lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Create My Account
                </Button>
                <Button 
                  onClick={() => onNavigate('home')}
                  variant="outline"
                  className="border-xova-primary/20 hover:border-xova-primary/40 hover:bg-xova-primary/5"
                >
                  Explore More Demos
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
