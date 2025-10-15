import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { 
  Heart, 
  User, 
  Activity, 
  Apple, 
  AlertTriangle, 
  Smile,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import type { UserProfile, DailyCheckin } from '../lib/mock-auth';

interface OnboardingData {
  profile: Partial<UserProfile>;
}

interface OnboardingQuestionnaireProps {
  onComplete: (data: OnboardingData) => void;
  onSkip?: () => void;
  isFreeTier?: boolean;
}

type Step = 'welcome' | 'basic' | 'health' | 'dietary' | 'lifestyle' | 'complete';

export function OnboardingQuestionnaire({ onComplete, onSkip, isFreeTier = true }: OnboardingQuestionnaireProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    healthGoals: [],
    dietaryRestrictions: [],
    allergens: [],
    flavorPreferences: []
  });

  const steps: Step[] = ['welcome', 'basic', 'health', 'dietary', 'lifestyle', 'complete'];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const healthGoalOptions = [
    { value: 'weight-loss', label: 'Weight Loss', icon: '⚖️' },
    { value: 'muscle-gain', label: 'Muscle Gain', icon: '💪' },
    { value: 'energy-boost', label: 'Energy Boost', icon: '⚡' },
    { value: 'immunity-boost', label: 'Immunity Boost', icon: '🛡️' },
    { value: 'digestive-health', label: 'Digestive Health', icon: '🌿' },
    { value: 'skin-health', label: 'Skin Health', icon: '✨' },
    { value: 'mental-clarity', label: 'Mental Clarity', icon: '🧠' },
    { value: 'detox', label: 'Detox', icon: '🍃' }
  ];

  const dietaryOptions = [
    { value: 'vegan', label: 'Vegan', icon: '🌱' },
    { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { value: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
    { value: 'dairy-free', label: 'Dairy-Free', icon: '🥛' },
    { value: 'low-sugar', label: 'Low Sugar', icon: '🍬' },
    { value: 'keto', label: 'Keto', icon: '🥑' },
    { value: 'paleo', label: 'Paleo', icon: '🍖' }
  ];

  const allergenOptions = [
    { value: 'nuts', label: 'Nuts', icon: '🥜' },
    { value: 'dairy', label: 'Dairy', icon: '🥛' },
    { value: 'soy', label: 'Soy', icon: '🫘' },
    { value: 'gluten', label: 'Gluten', icon: '🌾' },
    { value: 'shellfish', label: 'Shellfish', icon: '🦐' }
  ];

  const flavorOptions = [
    { value: 'sweet', label: 'Sweet', icon: '🍓' },
    { value: 'berry', label: 'Berry', icon: '🫐' },
    { value: 'tropical', label: 'Tropical', icon: '🥭' },
    { value: 'citrus', label: 'Citrus', icon: '🍊' },
    { value: 'green', label: 'Green', icon: '🥬' },
    { value: 'nutty', label: 'Nutty', icon: '🌰' },
    { value: 'chocolatey', label: 'Chocolate', icon: '🍫' }
  ];

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { value: 'lightly-active', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
    { value: 'very-active', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'athlete', label: 'Athlete', description: 'Very hard exercise & physical job' }
  ];

  const toggleArrayValue = (array: string[], value: string) => {
    if (array.includes(value)) {
      return array.filter(v => v !== value);
    }
    return [...array, value];
  };

  const handleComplete = () => {
    onComplete({
      profile: {
        ...profile,
        deliveryPreferences: {
          baselinePreferences: [],
          allowAIVariations: true,
          preferredDeliveryDay: 'monday',
          specialInstructions: ''
        }
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-3xl mx-auto flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl mb-3">Welcome to XOVA!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Let's create your personalized health profile to find the perfect smoothies for you.
              </p>
            </div>
            <Card className="p-4 bg-gradient-to-br from-xova-primary/5 to-xova-accent/5 border-xova-primary/20 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                {isFreeTier ? (
                  <>
                    <strong className="text-xova-primary">Free Access:</strong> Your profile will be saved and you'll get personalized smoothie recommendations. 
                    Upgrade to Premium (CHF 10/week) to unlock full recipes with exact proportions and café matching!
                  </>
                ) : (
                  <>
                    <strong className="text-xova-primary">Premium Access:</strong> Your complete profile will be saved with full access to all features including 
                    exact recipes, scientific explanations, and café matching across Zurich.
                  </>
                )}
              </p>
            </Card>
            <div className="flex gap-2 justify-center text-sm text-muted-foreground">
              <span>⏱️ Takes 2-3 minutes</span>
              <span>•</span>
              <span>📊 7 quick steps</span>
            </div>
          </div>
        );

      case 'basic':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-xova-primary/10 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <User className="w-8 h-8 text-xova-primary" />
              </div>
              <h3 className="text-xl mb-2">Basic Information</h3>
              <p className="text-sm text-muted-foreground">Help us understand your profile</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  type="number"
                  placeholder="28"
                  value={profile.age || ''}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <div className="flex gap-2">
                  {['male', 'female', 'other'].map((g) => (
                    <Button
                      key={g}
                      type="button"
                      variant={profile.gender === g ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setProfile({ ...profile, gender: g as any })}
                      className="flex-1 capitalize"
                    >
                      {g}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input
                  type="number"
                  placeholder="175"
                  value={profile.height || ''}
                  onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) || 0 })}
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input
                  type="number"
                  placeholder="70"
                  value={profile.weight || ''}
                  onChange={(e) => setProfile({ ...profile, weight: parseInt(e.target.value) || 0 })}
                  className="bg-input-background"
                />
              </div>
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-xova-accent/10 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-xova-accent" />
              </div>
              <h3 className="text-xl mb-2">Health Goals</h3>
              <p className="text-sm text-muted-foreground">What are you looking to achieve? (Select all that apply)</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {healthGoalOptions.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setProfile({
                    ...profile,
                    healthGoals: toggleArrayValue(profile.healthGoals || [], goal.value)
                  })}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    profile.healthGoals?.includes(goal.value)
                      ? 'border-xova-accent bg-xova-accent/10'
                      : 'border-border hover:border-xova-accent/50'
                  }`}
                >
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <div className="text-xs">{goal.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'dietary':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-xova-secondary/10 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <Apple className="w-8 h-8 text-xova-secondary" />
              </div>
              <h3 className="text-xl mb-2">Dietary Preferences</h3>
              <p className="text-sm text-muted-foreground">Any dietary restrictions or preferences?</p>
            </div>

            <div>
              <Label className="mb-3 block">Dietary Restrictions</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dietaryOptions.map((diet) => (
                  <button
                    key={diet.value}
                    type="button"
                    onClick={() => setProfile({
                      ...profile,
                      dietaryRestrictions: toggleArrayValue(profile.dietaryRestrictions || [], diet.value)
                    })}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      profile.dietaryRestrictions?.includes(diet.value)
                        ? 'border-xova-secondary bg-xova-secondary/10'
                        : 'border-border hover:border-xova-secondary/50'
                    }`}
                  >
                    <div className="text-xl mb-1">{diet.icon}</div>
                    <div className="text-xs">{diet.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label className="mb-3 block flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-xova-warning" />
                Allergens to Avoid
              </Label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {allergenOptions.map((allergen) => (
                  <button
                    key={allergen.value}
                    type="button"
                    onClick={() => setProfile({
                      ...profile,
                      allergens: toggleArrayValue(profile.allergens || [], allergen.value)
                    })}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      profile.allergens?.includes(allergen.value)
                        ? 'border-xova-warning bg-xova-warning/10'
                        : 'border-border hover:border-xova-warning/50'
                    }`}
                  >
                    <div className="text-xl mb-1">{allergen.icon}</div>
                    <div className="text-xs">{allergen.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label className="mb-3 block">Flavor Preferences</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {flavorOptions.map((flavor) => (
                  <button
                    key={flavor.value}
                    type="button"
                    onClick={() => setProfile({
                      ...profile,
                      flavorPreferences: toggleArrayValue(profile.flavorPreferences || [], flavor.value)
                    })}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      profile.flavorPreferences?.includes(flavor.value)
                        ? 'border-xova-accent bg-xova-accent/10'
                        : 'border-border hover:border-xova-accent/50'
                    }`}
                  >
                    <div className="text-xl mb-1">{flavor.icon}</div>
                    <div className="text-xs">{flavor.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'lifestyle':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-xova-info/10 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <Activity className="w-8 h-8 text-xova-info" />
              </div>
              <h3 className="text-xl mb-2">Lifestyle & Activity</h3>
              <p className="text-sm text-muted-foreground">Tell us about your daily routine</p>
            </div>

            <div className="space-y-3">
              <Label>Activity Level</Label>
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setProfile({ ...profile, activityLevel: level.value as any })}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    profile.activityLevel === level.value
                      ? 'border-xova-info bg-xova-info/10'
                      : 'border-border hover:border-xova-info/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-muted-foreground">{level.description}</div>
                    </div>
                    {profile.activityLevel === level.value && (
                      <div className="w-5 h-5 rounded-full bg-xova-info flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-xova-accent to-xova-success rounded-3xl mx-auto flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl mb-3">Profile Complete!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your permanent health profile is saved. When you generate smoothies, you'll provide your daily state (energy, mood, appetite) for personalized recommendations.
              </p>
            </div>
            <Card className="p-4 bg-gradient-to-br from-xova-primary/5 to-xova-accent/5 border-xova-primary/20 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-3">
                {isFreeTier ? (
                  <>
                    ✨ <strong>Profile saved!</strong> You'll see basic smoothie info. Want full recipes with exact measurements and café matching?
                  </>
                ) : (
                  <>
                    ✨ <strong>Welcome to Premium!</strong> You have full access to all features including exact recipes and café matching.
                  </>
                )}
              </p>
              {isFreeTier && (
                <Button size="sm" variant="outline" className="w-full border-xova-primary/30 hover:bg-xova-primary/5">
                  Upgrade to Premium - CHF 10/week
                </Button>
              )}
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 'welcome':
        return true;
      case 'basic':
        return profile.age && profile.gender && profile.height && profile.weight;
      case 'health':
        return (profile.healthGoals?.length || 0) > 0;
      case 'dietary':
        return true; // Optional
      case 'lifestyle':
        return profile.activityLevel;
      case 'complete':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-xova-primary/5 to-xova-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <div className="flex items-center gap-3">
              {onSkip && step !== 'complete' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip for now
                </Button>
              )}
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t">
          {step !== 'welcome' && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-xova-primary hover:bg-xova-primary-dark"
          >
            {step === 'complete' ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
