import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { updateUserProfile, UserProfile, getCurrentUser } from '../lib/mock-auth';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

interface ProfileBuilderProps {
  onNavigate: (page: string) => void;
  onComplete: () => void;
}

export function ProfileBuilder({ onNavigate, onComplete }: ProfileBuilderProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    age: undefined,
    gender: '',
    height: undefined,
    weight: undefined,
    healthGoals: [],
    dietaryRestrictions: [],
    allergens: [],
    flavorPreferences: [],
    activityLevel: 'moderate',
    sleepQuality: 'good',
    stressLevel: 'moderate',
    deliveryPreferences: {
      baselinePreferences: [],
      allowAIVariations: true,
      preferredDeliveryDay: 'monday',
      specialInstructions: ''
    }
  });

  const healthGoalOptions = [
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'energy', label: 'More Energy' },
    { value: 'immunity', label: 'Boost Immunity' },
    { value: 'digestion', label: 'Better Digestion' },
    { value: 'skin-health', label: 'Skin Health' },
    { value: 'heart-health', label: 'Heart Health' },
    { value: 'mental-clarity', label: 'Mental Clarity' },
    { value: 'inflammation', label: 'Reduce Inflammation' }
  ];

  const dietaryOptions = [
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'nut-free', label: 'Nut-Free' },
    { value: 'soy-free', label: 'Soy-Free' },
    { value: 'low-sugar', label: 'Low Sugar' },
    { value: 'low-carb', label: 'Low Carb' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'low-fodmap', label: 'Low FODMAP' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'halal', label: 'Halal' }
  ];

  const allergenOptions = [
    { value: 'dairy', label: 'Dairy / Lactose' },
    { value: 'tree-nuts', label: 'Tree Nuts (Almonds, Cashews, etc.)' },
    { value: 'peanuts', label: 'Peanuts' },
    { value: 'gluten', label: 'Gluten / Wheat' },
    { value: 'soy', label: 'Soy' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'fish', label: 'Fish' },
    { value: 'sesame', label: 'Sesame' },
    { value: 'sulfites', label: 'Sulfites' },
    { value: 'mustard', label: 'Mustard' },
    { value: 'celery', label: 'Celery' },
    { value: 'lupin', label: 'Lupin' },
    { value: 'coconut', label: 'Coconut' },
    { value: 'banana', label: 'Banana' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'avocado', label: 'Avocado' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'citrus', label: 'Citrus Fruits' },
    { value: 'nightshades', label: 'Nightshades (Tomatoes, etc.)' }
  ];

  const flavorOptions = [
    { value: 'sweet', label: 'Sweet' },
    { value: 'tropical', label: 'Tropical' },
    { value: 'citrus', label: 'Citrus' },
    { value: 'earthy', label: 'Earthy' },
    { value: 'neutral', label: 'Neutral' }
  ];

  const toggleSelection = (category: keyof UserProfile, value: string) => {
    const current = profile[category] as string[] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setProfile({ ...profile, [category]: updated });
  };

  const handleNext = async () => {
    // Validation for step 1 (Basic Info)
    if (step === 1) {
      if (!profile.age || !profile.gender || !profile.height || !profile.weight) {
        alert('Please fill in all basic information fields');
        return;
      }
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      try {
        // Ensure user is authenticated before saving
        const user = await getCurrentUser();
        if (!user) {
          throw new Error('Please log in again to save your profile.');
        }
        
        await updateUserProfile(profile as UserProfile);
        toast.success('Profile created successfully!');
        onComplete();
        onNavigate('dashboard');
      } catch (error: any) {
        console.error('Error saving profile:', error);
        toast.error(error?.message || 'Failed to save profile. Please try again.');
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-xova-primary/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary bg-clip-text text-transparent font-bold">
            XOVA
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">Build Your Health Profile</h1>
          <p className="text-gray-600">Step {step} of 4</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-muted rounded-full">
            <div 
              className="h-2 bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl mb-2">Basic Information</h2>
              <p className="text-gray-600 mb-6">Tell us about yourself</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || undefined })}
                    placeholder="25"
                    min="13"
                    max="120"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={profile.gender || ''}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-input-background"
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height || ''}
                    onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) || undefined })}
                    placeholder="170"
                    min="100"
                    max="250"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight || ''}
                    onChange={(e) => setProfile({ ...profile, weight: parseInt(e.target.value) || undefined })}
                    placeholder="70"
                    min="30"
                    max="300"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl mb-2">What are your health goals?</h2>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              <div className="grid md:grid-cols-2 gap-4">
                {healthGoalOptions.map(option => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      profile.healthGoals?.includes(option.value)
                        ? 'border-xova-primary bg-xova-primary/10 shadow-sm'
                        : 'border-border hover:border-xova-primary/40 hover:bg-xova-primary/5'
                    }`}
                  >
                    <Checkbox
                      checked={profile.healthGoals?.includes(option.value)}
                      onCheckedChange={() => toggleSelection('healthGoals', option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl mb-2">Dietary Restrictions & Allergens</h2>
              <p className="text-gray-600 mb-6">Help us personalize your smoothies safely</p>
              
              <div className="mb-8">
                <h3 className="mb-2">Dietary Restrictions</h3>
                <p className="text-sm text-muted-foreground mb-4">Choose your dietary preferences and lifestyle</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {dietaryOptions.map(option => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        profile.dietaryRestrictions?.includes(option.value)
                          ? 'border-xova-secondary bg-xova-secondary/10 shadow-sm'
                          : 'border-border hover:border-xova-secondary/40 hover:bg-xova-secondary/5'
                      }`}
                    >
                      <Checkbox
                        checked={profile.dietaryRestrictions?.includes(option.value)}
                        onCheckedChange={() => toggleSelection('dietaryRestrictions', option.value)}
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2">Allergens (Important!)</h3>
                <p className="text-sm text-muted-foreground mb-4">Select any ingredients you're allergic to or must avoid</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {allergenOptions.map(option => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        profile.allergens?.includes(option.value)
                          ? 'border-destructive bg-destructive/10 shadow-sm'
                          : 'border-border hover:border-destructive/40 hover:bg-destructive/5'
                      }`}
                    >
                      <Checkbox
                        checked={profile.allergens?.includes(option.value)}
                        onCheckedChange={() => toggleSelection('allergens', option.value)}
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl mb-2">Lifestyle & Preferences</h2>
              <p className="text-gray-600 mb-6">What flavors do you enjoy?</p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {flavorOptions.map(option => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      profile.flavorPreferences?.includes(option.value)
                        ? 'border-xova-accent bg-xova-accent/10 shadow-sm'
                        : 'border-border hover:border-xova-accent/40 hover:bg-xova-accent/5'
                    }`}
                  >
                    <Checkbox
                      checked={profile.flavorPreferences?.includes(option.value)}
                      onCheckedChange={() => toggleSelection('flavorPreferences', option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl mb-2">Lifestyle Information</h2>
              <p className="text-gray-600 mb-6">This helps us optimize your nutrition</p>
              
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Activity Level</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['sedentary', 'light', 'moderate', 'very-active', 'athlete'].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setProfile({ ...profile, activityLevel: level as any })}
                        className={`p-3 border-2 rounded-lg transition-all capitalize ${
                          profile.activityLevel === level
                            ? 'border-xova-primary bg-xova-primary/10 shadow-sm'
                            : 'border-border hover:border-xova-primary/40 hover:bg-xova-primary/5'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Sleep Quality</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {['poor', 'fair', 'good', 'excellent'].map(quality => (
                      <button
                        key={quality}
                        type="button"
                        onClick={() => setProfile({ ...profile, sleepQuality: quality as any })}
                        className={`p-3 border-2 rounded-lg transition-all capitalize ${
                          profile.sleepQuality === quality
                            ? 'border-xova-secondary bg-xova-secondary/10 shadow-sm'
                            : 'border-border hover:border-xova-secondary/40 hover:bg-xova-secondary/5'
                        }`}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Stress Level</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'moderate', 'high'].map(stress => (
                      <button
                        key={stress}
                        type="button"
                        onClick={() => setProfile({ ...profile, stressLevel: stress as any })}
                        className={`p-3 border-2 rounded-lg transition-all capitalize ${
                          profile.stressLevel === stress
                            ? 'border-xova-accent bg-xova-accent/10 shadow-sm'
                            : 'border-border hover:border-xova-accent/40 hover:bg-xova-accent/5'
                        }`}
                      >
                        {stress}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions" className="mb-3 block">
                    Special Instructions (Optional)
                  </Label>
                  <Textarea
                    id="instructions"
                    value={profile.deliveryPreferences?.specialInstructions || ''}
                    onChange={(e) => setProfile({
                      ...profile,
                      deliveryPreferences: {
                        ...profile.deliveryPreferences!,
                        specialInstructions: e.target.value
                      }
                    })}
                    placeholder="Any specific preferences or requirements for your smoothies..."
                    className="h-24"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25"
            >
              {isLoading ? 'Saving...' : step === 4 ? 'Complete Profile' : 'Next'}
              {step < 4 && !isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
