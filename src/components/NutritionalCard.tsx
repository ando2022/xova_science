import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Activity, Target, Zap, Brain, Heart, Shield, TrendingUp } from 'lucide-react';
import { UserProfile } from '../lib/mock-auth';

interface NutritionalCardProps {
  profile: UserProfile;
  onGenerateSmoothie: () => void;
}

interface DailyNutritionalNeeds {
  calories: { current: number; target: number; percentage: number };
  protein: { current: number; target: number; percentage: number };
  carbs: { current: number; target: number; percentage: number };
  fiber: { current: number; target: number; percentage: number };
  vitamins: { missing: string[]; adequate: string[] };
  minerals: { missing: string[]; adequate: string[] };
  focusAreas: string[];
  recommendations: string[];
}

export function NutritionalCard({ profile, onGenerateSmoothie }: NutritionalCardProps) {
  const [nutritionalNeeds, setNutritionalNeeds] = useState<DailyNutritionalNeeds | null>(null);

  useEffect(() => {
    if (profile) {
      calculateDailyNeeds();
    }
  }, [profile]);

  const calculateDailyNeeds = () => {
    if (!profile) {
      return;
    }

    // Calculate baseline needs based on profile
    const baseCalories = profile.activityLevel === 'athlete' ? 2500 : 
                        profile.activityLevel === 'very-active' ? 2200 : 
                        profile.activityLevel === 'moderate' ? 2000 : 1800;
    
    const baseProtein = (profile.healthGoals && profile.healthGoals.includes('muscle-gain')) ? 120 : 
                       profile.activityLevel === 'athlete' ? 100 : 80;
    
    const baseCarbs = profile.activityLevel === 'athlete' ? 300 : 250;
    const baseFiber = 30;

    // Adjust for current day (mock data - in real app this would come from food tracking)
    const currentCalories = Math.floor(baseCalories * 0.3); // User has had 30% of daily needs
    const currentProtein = Math.floor(baseProtein * 0.25);
    const currentCarbs = Math.floor(baseCarbs * 0.35);
    const currentFiber = Math.floor(baseFiber * 0.2);

    // Identify missing nutrients based on health goals and activity level
    const missingVitamins = [];
    const adequateVitamins = ['C', 'A'];
    
    if ((profile.healthGoals && profile.healthGoals.includes('energy')) || profile.activityLevel === 'very-active') {
      missingVitamins.push('B6', 'B12', 'Folate');
    }
    if (profile.healthGoals && profile.healthGoals.includes('immunity')) {
      missingVitamins.push('D', 'E');
    }
    if (profile.healthGoals && profile.healthGoals.includes('skin-health')) {
      missingVitamins.push('E', 'Biotin');
    }

    const missingMinerals = [];
    const adequateMinerals = ['Calcium'];
    
    if (profile.activityLevel === 'athlete' || (profile.healthGoals && profile.healthGoals.includes('muscle-gain'))) {
      missingMinerals.push('Magnesium', 'Zinc', 'Iron');
    }
    if (profile.stressLevel === 'high') {
      missingMinerals.push('Magnesium');
    }

    // Generate focus areas based on current gaps and goals
    const focusAreas = [];
    if (missingVitamins.includes('B6') || missingVitamins.includes('B12')) {
      focusAreas.push('Energy Metabolism');
    }
    if (missingMinerals.includes('Magnesium')) {
      focusAreas.push('Stress Management');
    }
    if (profile.healthGoals && profile.healthGoals.includes('muscle-gain')) {
      focusAreas.push('Muscle Recovery');
    }
    if (missingVitamins.includes('D') || missingVitamins.includes('E')) {
      focusAreas.push('Immune Support');
    }

    // Generate recommendations
    const recommendations = [];
    if (currentProtein / baseProtein < 0.5) {
      recommendations.push('Increase protein intake for muscle support');
    }
    if (currentFiber / baseFiber < 0.3) {
      recommendations.push('Add more fiber-rich foods for digestive health');
    }
    if (missingVitamins.length > 0) {
      recommendations.push(`Focus on vitamins: ${missingVitamins.join(', ')}`);
    }
    if (missingMinerals.length > 0) {
      recommendations.push(`Prioritize minerals: ${missingMinerals.join(', ')}`);
    }

    setNutritionalNeeds({
      calories: {
        current: currentCalories,
        target: baseCalories,
        percentage: Math.round((currentCalories / baseCalories) * 100)
      },
      protein: {
        current: currentProtein,
        target: baseProtein,
        percentage: Math.round((currentProtein / baseProtein) * 100)
      },
      carbs: {
        current: currentCarbs,
        target: baseCarbs,
        percentage: Math.round((currentCarbs / baseCarbs) * 100)
      },
      fiber: {
        current: currentFiber,
        target: baseFiber,
        percentage: Math.round((currentFiber / baseFiber) * 100)
      },
      vitamins: {
        missing: missingVitamins,
        adequate: adequateVitamins
      },
      minerals: {
        missing: missingMinerals,
        adequate: adequateMinerals
      },
      focusAreas,
      recommendations
    });
  };

  if (!nutritionalNeeds) {
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

  const getMacroColor = (percentage: number) => {
    if (percentage >= 80) {
      return 'text-green-600';
    }
    if (percentage >= 50) {
      return 'text-yellow-600';
    }
    return 'text-red-600';
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-xova-primary/20 to-xova-secondary/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-xova-primary" />
        </div>
        <h1 className="text-4xl mb-2">Your Daily Nutritional Needs</h1>
        <p className="text-xl text-muted-foreground">
          Personalized nutrition plan based on your profile and current intake
        </p>
      </div>

      {/* Macro Nutrients */}
      <Card className="p-6">
        <h2 className="text-2xl mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-xova-primary" />
          Daily Macronutrients
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calories */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Calories</span>
              <span className={`font-bold ${getMacroColor(nutritionalNeeds.calories.percentage)}`}>
                {nutritionalNeeds.calories.current} / {nutritionalNeeds.calories.target}
              </span>
            </div>
            <Progress 
              value={nutritionalNeeds.calories.percentage} 
              className="h-3"
            />
            <div className="text-sm text-muted-foreground">
              {nutritionalNeeds.calories.target - nutritionalNeeds.calories.current} calories needed today
            </div>
          </div>

          {/* Protein */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Protein</span>
              <span className={`font-bold ${getMacroColor(nutritionalNeeds.protein.percentage)}`}>
                {nutritionalNeeds.protein.current}g / {nutritionalNeeds.protein.target}g
              </span>
            </div>
            <Progress 
              value={nutritionalNeeds.protein.percentage} 
              className="h-3"
            />
            <div className="text-sm text-muted-foreground">
              {nutritionalNeeds.protein.target - nutritionalNeeds.protein.current}g protein needed
            </div>
          </div>

          {/* Carbs */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Carbohydrates</span>
              <span className={`font-bold ${getMacroColor(nutritionalNeeds.carbs.percentage)}`}>
                {nutritionalNeeds.carbs.current}g / {nutritionalNeeds.carbs.target}g
              </span>
            </div>
            <Progress 
              value={nutritionalNeeds.carbs.percentage} 
              className="h-3"
            />
            <div className="text-sm text-muted-foreground">
              {nutritionalNeeds.carbs.target - nutritionalNeeds.carbs.current}g carbs needed
            </div>
          </div>

          {/* Fiber */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Fiber</span>
              <span className={`font-bold ${getMacroColor(nutritionalNeeds.fiber.percentage)}`}>
                {nutritionalNeeds.fiber.current}g / {nutritionalNeeds.fiber.target}g
              </span>
            </div>
            <Progress 
              value={nutritionalNeeds.fiber.percentage} 
              className="h-3"
            />
            <div className="text-sm text-muted-foreground">
              {nutritionalNeeds.fiber.target - nutritionalNeeds.fiber.current}g fiber needed
            </div>
          </div>
        </div>
      </Card>

      {/* Micronutrients */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vitamins */}
        <Card className="p-6">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Vitamins Status
          </h3>
          
          {nutritionalNeeds.vitamins.missing.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-red-600 mb-2">Need More:</p>
              <div className="flex flex-wrap gap-2">
                {nutritionalNeeds.vitamins.missing.map(vitamin => (
                  <Badge key={vitamin} variant="destructive" className="text-xs">
                    Vitamin {vitamin}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {nutritionalNeeds.vitamins.adequate.length > 0 && (
            <div>
              <p className="text-sm font-medium text-green-600 mb-2">Adequate:</p>
              <div className="flex flex-wrap gap-2">
                {nutritionalNeeds.vitamins.adequate.map(vitamin => (
                  <Badge key={vitamin} variant="secondary" className="text-xs bg-green-100 text-green-700">
                    Vitamin {vitamin}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Minerals */}
        <Card className="p-6">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Minerals Status
          </h3>
          
          {nutritionalNeeds.minerals.missing.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-red-600 mb-2">Need More:</p>
              <div className="flex flex-wrap gap-2">
                {nutritionalNeeds.minerals.missing.map(mineral => (
                  <Badge key={mineral} variant="destructive" className="text-xs">
                    {mineral}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {nutritionalNeeds.minerals.adequate.length > 0 && (
            <div>
              <p className="text-sm font-medium text-green-600 mb-2">Adequate:</p>
              <div className="flex flex-wrap gap-2">
                {nutritionalNeeds.minerals.adequate.map(mineral => (
                  <Badge key={mineral} variant="secondary" className="text-xs bg-green-100 text-green-700">
                    {mineral}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Focus Areas */}
      <Card className="p-6">
        <h3 className="text-xl mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Today's Focus Areas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nutritionalNeeds.focusAreas.map((area, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-xova-primary/10 to-xova-secondary/10 rounded-lg border border-xova-primary/20">
              <div className="flex items-center gap-2 mb-2">
                {area === 'Energy Metabolism' && <Zap className="w-4 h-4 text-yellow-600" />}
                {area === 'Stress Management' && <Heart className="w-4 h-4 text-pink-600" />}
                {area === 'Muscle Recovery' && <Activity className="w-4 h-4 text-blue-600" />}
                {area === 'Immune Support' && <Shield className="w-4 h-4 text-green-600" />}
                <span className="font-medium text-xova-primary">{area}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {area === 'Energy Metabolism' && 'B-vitamins and complex carbs for sustained energy'}
                {area === 'Stress Management' && 'Magnesium and adaptogens for relaxation'}
                {area === 'Muscle Recovery' && 'Protein and amino acids for repair'}
                {area === 'Immune Support' && 'Antioxidants and immune-boosting nutrients'}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 border-2 border-xova-accent/30 bg-gradient-to-br from-white to-xova-accent/5">
        <h3 className="text-xl mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-xova-accent" />
          Personalized Recommendations
        </h3>
        
        <div className="space-y-3">
          {nutritionalNeeds.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-xova-accent/20">
              <div className="w-2 h-2 bg-xova-accent rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{recommendation}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Generate Smoothie Button */}
      <Card className="p-6 text-center bg-gradient-to-r from-xova-primary/5 to-xova-secondary/5">
        <h3 className="text-xl mb-2">Ready to Optimize Your Nutrition?</h3>
        <p className="text-muted-foreground mb-6">
          Generate a personalized smoothie that addresses your specific nutritional gaps and goals
        </p>
        <button
          onClick={onGenerateSmoothie}
          className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-xova-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-xova-primary/30"
        >
          Generate My Personalized Smoothie
        </button>
      </Card>
    </div>
  );
}
