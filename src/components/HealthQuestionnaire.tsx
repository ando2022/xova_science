import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, ArrowLeft, Target, Activity, Utensils, AlertTriangle, Clock, Heart } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface QuestionnaireData {
  // Basic Info
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  
  // Health Goals
  health_goals: string[];
  
  // Activity Level
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  
  // Dietary Restrictions
  dietary_restrictions: string[];
  
  // Allergens
  allergens: string[];
  
  // Preferences & Dislikes
  preferences: string[];
  
  // Lifestyle
  wake_time: string;
  workout_time: string;
  stress_level: 'low' | 'moderate' | 'high';
}

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

const HEALTH_GOALS = [
  { id: 'energy', label: 'Energy Boost', icon: '⚡', description: 'More sustained energy throughout the day' },
  { id: 'weight-loss', label: 'Weight Management', icon: '⚖️', description: 'Healthy weight loss or maintenance' },
  { id: 'muscle-gain', label: 'Muscle Building', icon: '💪', description: 'Support muscle growth and recovery' },
  { id: 'stress-relief', label: 'Stress Relief', icon: '🧘', description: 'Better stress management and relaxation' },
  { id: 'immune-support', label: 'Immune Support', icon: '🛡️', description: 'Strengthen immune system' },
  { id: 'heart-health', label: 'Heart Health', icon: '❤️', description: 'Cardiovascular health and circulation' },
  { id: 'digestive-health', label: 'Digestive Health', icon: '🌱', description: 'Improve digestion and gut health' },
  { id: 'anti-aging', label: 'Anti-Aging', icon: '✨', description: 'Healthy aging and skin health' }
];

const DIETARY_RESTRICTIONS = [
  { id: 'vegan', label: 'Vegan', description: 'No animal products' },
  { id: 'vegetarian', label: 'Vegetarian', description: 'No meat, fish, or poultry' },
  { id: 'keto', label: 'Keto', description: 'Very low carb, high fat' },
  { id: 'paleo', label: 'Paleo', description: 'Whole foods, no processed items' },
  { id: 'gluten-free', label: 'Gluten-Free', description: 'No gluten-containing foods' },
  { id: 'dairy-free', label: 'Dairy-Free', description: 'No dairy products' }
];

const ALLERGENS = [
  { id: 'nuts', label: 'Tree Nuts', description: 'Almonds, walnuts, cashews, etc.' },
  { id: 'peanuts', label: 'Peanuts', description: 'Peanuts and peanut products' },
  { id: 'dairy', label: 'Dairy', description: 'Milk, cheese, yogurt, etc.' },
  { id: 'soy', label: 'Soy', description: 'Soybeans and soy products' },
  { id: 'eggs', label: 'Eggs', description: 'Chicken eggs and egg products' },
  { id: 'fish', label: 'Fish', description: 'Fish and fish products' },
  { id: 'shellfish', label: 'Shellfish', description: 'Shrimp, crab, lobster, etc.' }
];

interface HealthQuestionnaireProps {
  onComplete: (profile: NutritionalProfile) => void;
  onSkip?: () => void;
}

export function HealthQuestionnaire({ onComplete, onSkip }: HealthQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<QuestionnaireData>({
    age: 30,
    weight: 70,
    height: 170,
    gender: 'other',
    health_goals: [],
    activity_level: 'moderate',
    dietary_restrictions: [],
    allergens: [],
    preferences: [],
    wake_time: '07:00',
    workout_time: '08:00',
    stress_level: 'moderate'
  });

  const totalSteps = 7; // Added one step for basic info

  const handleGoalToggle = (goalId: string) => {
    setData(prev => ({
      ...prev,
      health_goals: prev.health_goals.includes(goalId)
        ? prev.health_goals.filter(id => id !== goalId)
        : [...prev.health_goals, goalId]
    }));
  };

  const handleRestrictionToggle = (restrictionId: string) => {
    setData(prev => ({
      ...prev,
      dietary_restrictions: prev.dietary_restrictions.includes(restrictionId)
        ? prev.dietary_restrictions.filter(id => id !== restrictionId)
        : [...prev.dietary_restrictions, restrictionId]
    }));
  };

  const handleAllergenToggle = (allergenId: string) => {
    setData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergenId)
        ? prev.allergens.filter(id => id !== allergenId)
        : [...prev.allergens, allergenId]
    }));
  };

  const generateNutritionalProfile = async (): Promise<NutritionalProfile> => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Calculate targets based on data
    const baseTargets = {
      calories: 2000,
      protein: 60,
      carbs: 250,
      fiber: 25,
      iron: 18,
      vitamin_c: 90,
      calcium: 1000,
      magnesium: 400,
      omega3: 2
    };

    // Adjust based on activity level
    const activityMultipliers = {
      'sedentary': 0.8,
      'light': 0.9,
      'moderate': 1.0,
      'active': 1.2,
      'very-active': 1.4
    };

    const multiplier = activityMultipliers[data.activity_level];
    
    // Adjust based on health goals
    const goalAdjustments = {
      'energy': { calories: 1.1, iron: 1.3, vitamin_c: 1.2 },
      'weight-loss': { protein: 1.2, fiber: 1.3, calories: 0.85 },
      'muscle-gain': { protein: 1.5, calories: 1.2, calcium: 1.1 },
      'stress-relief': { magnesium: 1.4, vitamin_c: 1.1, omega3: 1.2 },
      'immune-support': { vitamin_c: 1.8, vitamin_a: 1.3 },
      'heart-health': { omega3: 1.6, fiber: 1.2, potassium: 1.2 },
      'digestive-health': { fiber: 1.5, probiotics: 1.2 },
      'anti-aging': { vitamin_c: 1.5, omega3: 1.3, antioxidants: 1.4 }
    };

    const adjustedTargets = { ...baseTargets };
    
    for (const goal of data.health_goals) {
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

    // Generate scientific rationale
    const rationales = [];
    
    if (data.health_goals.includes('energy')) {
      rationales.push('Optimized for sustained energy through balanced macronutrients and iron for oxygen transport.');
    }
    
    if (data.health_goals.includes('muscle-gain')) {
      rationales.push('Higher protein targets support muscle protein synthesis and recovery.');
    }
    
    if (data.health_goals.includes('stress-relief')) {
      rationales.push('Increased magnesium and omega-3 support nervous system function and stress resilience.');
    }
    
    if (data.activity_level === 'very-active' || data.activity_level === 'active') {
      rationales.push('Elevated caloric and micronutrient targets support increased metabolic demands.');
    }

    const scientific_rationale = rationales.length > 0 
      ? rationales.join(' ') 
      : 'Balanced nutritional targets based on your lifestyle and preferences.';

    // Priority nutrients
    const priority_nutrients = [];
    if (data.health_goals.includes('energy')) priority_nutrients.push('Iron', 'B-vitamins');
    if (data.health_goals.includes('muscle-gain')) priority_nutrients.push('Protein', 'Calcium');
    if (data.health_goals.includes('stress-relief')) priority_nutrients.push('Magnesium', 'Omega-3');
    if (data.health_goals.includes('immune-support')) priority_nutrients.push('Vitamin C', 'Zinc');

    const profile: NutritionalProfile = {
      user_id: user.id,
      activity_level: data.activity_level,
      health_goals: data.health_goals,
      dietary_restrictions: data.dietary_restrictions,
      allergens: data.allergens,
      preferences: data.preferences,
      daily_targets: adjustedTargets,
      scientific_rationale,
      priority_nutrients: [...new Set(priority_nutrients)]
    };

    // Save to database
    console.log('Saving profile to database...');
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email,
        activity_level: data.activity_level,
        health_goals: data.health_goals,
        dietary_restrictions: data.dietary_restrictions,
        allergens: data.allergens,
        preferences: data.preferences
      });

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    console.log('Profile saved successfully to database');

    return profile;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Check if user is authenticated first
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error('User not authenticated:', authError);
        alert('Please log in to complete your profile. You will be redirected to the login page.');
        // Redirect to login or handle authentication
        return;
      }

      console.log('User authenticated:', user.email);
      const profile = await generateNutritionalProfile();
      console.log('Profile generated successfully:', profile);
      onComplete(profile);
    } catch (error) {
      console.error('Error generating profile:', error);
      alert(`Error completing profile: ${error.message || 'Unknown error'}. Please try again or contact support.`);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return data.age > 0 && data.weight > 0 && data.height > 0 && data.gender;
      case 2: return data.health_goals.length > 0;
      case 3: return data.activity_level;
      case 4: return true; // Dietary restrictions are optional
      case 5: return true; // Allergens are optional
      case 6: return true; // Preferences are optional
      case 7: return true; // Lifestyle info is optional
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-xova-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Tell us about yourself</h3>
              <p className="text-muted-foreground">We need your basic info to calculate precise nutritional needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={data.age}
                  onChange={(e) => setData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={data.weight}
                  onChange={(e) => setData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                  placeholder="Enter your weight"
                  min="1"
                  max="300"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={data.height}
                  onChange={(e) => setData(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter your height"
                  min="100"
                  max="250"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  value={data.gender}
                  onChange={(e) => setData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' | 'other' }))}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="other">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-xova-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">What are your health goals?</h3>
              <p className="text-muted-foreground">Select all that apply - we'll optimize your nutrition accordingly</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HEALTH_GOALS.map((goal) => (
                <Card 
                  key={goal.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    data.health_goals.includes(goal.id) 
                      ? 'border-xova-primary bg-xova-primary/5' 
                      : 'border-border hover:border-xova-primary/50'
                  }`}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <div>
                      <h4 className="font-semibold">{goal.label}</h4>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Activity className="w-12 h-12 text-xova-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">How active are you?</h3>
              <p className="text-muted-foreground">This helps us calculate your energy needs</p>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise, desk job' },
                { id: 'light', label: 'Light Activity', description: 'Light exercise 1-3 days/week' },
                { id: 'moderate', label: 'Moderate Activity', description: 'Moderate exercise 3-5 days/week' },
                { id: 'active', label: 'Active', description: 'Heavy exercise 6-7 days/week' },
                { id: 'very-active', label: 'Very Active', description: 'Very heavy exercise, physical job' }
              ].map((level) => (
                <Card 
                  key={level.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    data.activity_level === level.id 
                      ? 'border-xova-primary bg-xova-primary/5' 
                      : 'border-border hover:border-xova-primary/50'
                  }`}
                  onClick={() => setData(prev => ({ ...prev, activity_level: level.id as any }))}
                >
                  <div>
                    <h4 className="font-semibold">{level.label}</h4>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Utensils className="w-12 h-12 text-xova-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Any dietary restrictions?</h3>
              <p className="text-muted-foreground">Select any that apply to you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIETARY_RESTRICTIONS.map((restriction) => (
                <Card 
                  key={restriction.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    data.dietary_restrictions.includes(restriction.id) 
                      ? 'border-xova-primary bg-xova-primary/5' 
                      : 'border-border hover:border-xova-primary/50'
                  }`}
                  onClick={() => handleRestrictionToggle(restriction.id)}
                >
                  <div>
                    <h4 className="font-semibold">{restriction.label}</h4>
                    <p className="text-sm text-muted-foreground">{restriction.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-xova-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Any food allergies?</h3>
              <p className="text-muted-foreground">Important for your safety - we'll avoid these ingredients</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALLERGENS.map((allergen) => (
                <Card 
                  key={allergen.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    data.allergens.includes(allergen.id) 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-border hover:border-red-300'
                  }`}
                  onClick={() => handleAllergenToggle(allergen.id)}
                >
                  <div>
                    <h4 className="font-semibold">{allergen.label}</h4>
                    <p className="text-sm text-muted-foreground">{allergen.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="w-12 h-12 text-xova-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Food preferences & dislikes</h3>
              <p className="text-muted-foreground">Help us personalize your smoothies</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="preferences">What flavors do you prefer?</Label>
                <Input
                  id="preferences"
                  placeholder="e.g., sweet, tart, creamy, fruity..."
                  value={data.preferences.join(', ')}
                  onChange={(e) => setData(prev => ({ 
                    ...prev, 
                    preferences: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  }))}
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Common preferences:</h4>
                <div className="flex flex-wrap gap-2">
                  {['sweet', 'tart', 'creamy', 'fruity', 'chocolate', 'vanilla', 'natural', 'spicy'].map((pref) => (
                    <button
                      key={pref}
                      className={`px-3 py-1 rounded-full text-sm ${
                        data.preferences.includes(pref)
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                      onClick={() => handlePreferenceToggle(pref)}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="w-12 h-12 text-xova-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Your daily routine</h3>
              <p className="text-muted-foreground">This helps us time your smoothies perfectly</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="wake_time">What time do you usually wake up?</Label>
                <Input
                  id="wake_time"
                  type="time"
                  value={data.wake_time}
                  onChange={(e) => setData(prev => ({ ...prev, wake_time: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="workout_time">When do you typically exercise?</Label>
                <Input
                  id="workout_time"
                  type="time"
                  value={data.workout_time}
                  onChange={(e) => setData(prev => ({ ...prev, workout_time: e.target.value }))}
                />
              </div>
              
              <div>
                <Label>How would you rate your stress level?</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { id: 'low', label: 'Low', description: 'Generally relaxed and calm' },
                    { id: 'moderate', label: 'Moderate', description: 'Some stress, manageable' },
                    { id: 'high', label: 'High', description: 'Frequently stressed or overwhelmed' }
                  ].map((level) => (
                    <Card 
                      key={level.id}
                      className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                        data.stress_level === level.id 
                          ? 'border-xova-primary bg-xova-primary/5' 
                          : 'border-border hover:border-xova-primary/50'
                      }`}
                      onClick={() => setData(prev => ({ ...prev, stress_level: level.id as any }))}
                    >
                      <div>
                        <h4 className="font-semibold">{level.label}</h4>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handlePreferenceToggle = (pref: string) => {
    setData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6" data-testid="health-questionnaire">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-xova-primary to-xova-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8 mb-8">
        {renderStep()}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          {onSkip && (
            <Button variant="ghost" onClick={onSkip}>
              Skip for now
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-xova-primary to-xova-secondary"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!canProceed() || loading}
              className="bg-gradient-to-r from-xova-primary to-xova-secondary"
            >
              {loading ? 'Generating Profile...' : 'Complete Profile'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

