import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Sparkles, ArrowLeft, Save, User } from 'lucide-react';
import { getCurrentUser, updateUserProfile, UserProfile } from '../lib/mock-auth';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const user = await getCurrentUser();
      if (user?.profile) {
        setProfile(user.profile);
      }
      setIsLoading(false);
    };
    loadProfile();
  }, []);

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
    if (!profile) return;
    const current = profile[category] as string[] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setProfile({ ...profile, [category]: updated });
  };

  const handleSave = async () => {
    if (profile) {
      try {
        // Ensure user is authenticated before saving
        const user = await getCurrentUser();
        if (!user) {
          throw new Error('Please log in again to save your profile.');
        }
        
        await updateUserProfile(profile);
        setSaved(true);
        toast.success('Profile updated successfully!');
        setTimeout(() => setSaved(false), 3000);
      } catch (error: any) {
        console.error('Error updating profile:', error);
        toast.error(error?.message || 'Failed to update profile. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white flex items-center justify-center">
        <Card className="p-8">
          <p>Loading profile...</p>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white flex items-center justify-center p-4">
        <Card className="p-8 max-w-2xl w-full">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-xova-warning/20 to-xova-warning/10 rounded-2xl mx-auto flex items-center justify-center">
              <User className="w-8 h-8 text-xova-warning" />
            </div>
            <div>
              <h2 className="text-2xl mb-3">No Profile Found</h2>
              <p className="text-muted-foreground mb-6">
                You haven't completed your health profile yet. Complete the onboarding questionnaire to personalize your XOVA experience.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                Back to Dashboard
              </Button>
              <Button 
                className="bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary"
                onClick={() => onNavigate('onboarding')}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </Card>
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
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Profile Settings</h1>
          <p className="text-xl text-gray-600">Update your preferences and health information</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-xova-success/10 border border-xova-success/30 text-xova-success rounded-lg">
            ✓ Profile saved successfully!
          </div>
        )}

        <div className="space-y-6">
          {/* Health Goals */}
          <Card className="p-6">
            <h2 className="text-2xl mb-4">Health Goals</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {healthGoalOptions.map(option => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
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
          </Card>

          {/* Dietary Restrictions */}
          <Card className="p-6">
            <h2 className="text-2xl mb-2">Dietary Restrictions</h2>
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
          </Card>

          {/* Allergens */}
          <Card className="p-6">
            <h2 className="text-2xl mb-2">Allergens (Important!)</h2>
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
          </Card>

          {/* Flavor Preferences */}
          <Card className="p-6">
            <h2 className="text-2xl mb-4">Flavor Preferences</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {flavorOptions.map(option => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
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
          </Card>

          {/* Lifestyle */}
          <Card className="p-6">
            <h2 className="text-2xl mb-4">Lifestyle</h2>
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
                  Special Instructions
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
          </Card>
        </div>

        <div className="mt-8 flex gap-4">
          <Button 
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
}
