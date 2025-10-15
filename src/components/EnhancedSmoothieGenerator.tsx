import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, ArrowLeft, Download, Share2, ChevronDown, ChevronUp, Lightbulb, Dna, Target, Zap, MapPin } from 'lucide-react';
import { getUserProfile, getCurrentUser } from '../lib/mock-auth';
import { SmoothieRecipe } from '../lib/smoothie-generator';
import { NutritionalOverview } from './NutritionalOverview';
import { PostSmoothieOptions } from './PostSmoothieOptions';

interface EnhancedSmoothieGeneratorProps {
  onNavigate: (page: string) => void;
}

export function EnhancedSmoothieGenerator({ onNavigate }: EnhancedSmoothieGeneratorProps) {
  const [step, setStep] = useState<'nutrition' | 'result' | 'options'>('nutrition');
  const [recipe, setRecipe] = useState<SmoothieRecipe | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState({
    instructions: true,
    nutrition: true,
    scientific: true
  });

  const [moodData, setMoodData] = useState<MoodData>({
    energyLevel: 'medium',
    mood: 'calm',
    appetite: 'normal',
    specificNeeds: []
  });

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getUserProfile();
      const user = await getCurrentUser();
      setUserProfile(profile);
      setIsPremium(user?.subscriptionTier === 'premium' || user?.subscriptionTier === 'delivery');
    };
    loadProfile();
  }, []);

  const specificNeedsOptions = [
    { value: 'anti-inflammatory', label: 'Anti-inflammatory' },
    { value: 'immune-boost', label: 'Immune Boost' },
    { value: 'detox', label: 'Detox' },
    { value: 'energy-boost', label: 'Energy Boost' },
    { value: 'focus', label: 'Mental Focus' },
    { value: 'recovery', label: 'Post-Workout Recovery' }
  ];

  const toggleNeed = (value: string) => {
    setMoodData({
      ...moodData,
      specificNeeds: moodData.specificNeeds.includes(value)
        ? moodData.specificNeeds.filter(n => n !== value)
        : [...moodData.specificNeeds, value]
    });
  };

  const handleGenerate = async () => {
    if (!userProfile) {
      onNavigate('settings');
      return;
    }

    const generatedRecipe = generateSmoothie(userProfile, moodData);
    setRecipe(generatedRecipe);
    setStep('result');
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {step === 'nutrition' && userProfile && (
                  <NutritionalOverview 
                    profile={userProfile} 
                    onGenerateSmoothie={(recipe: SmoothieRecipe) => {
                      setRecipe(recipe);
                      setStep('result');
                    }} 
                  />
                )}

        {false && step === 'mood' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-xova-accent/20 to-xova-success/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-xova-accent" />
              </div>
              <h1 className="text-4xl mb-2">How Are You Feeling Right Now?</h1>
              <p className="text-xl text-muted-foreground">
                Your daily state helps us fine-tune your personalized smoothie
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                💡 Based on your nutritional needs, we'll optimize ingredients for today
              </p>
            </div>

            <Card className="p-8">
              <div className="space-y-8">
                {/* Energy Level */}
                <div>
                  <Label className="mb-3 block text-lg">Energy Level</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['low', 'medium', 'high'] as const).map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setMoodData({ ...moodData, energyLevel: level })}
                        className={`p-4 border-2 rounded-lg transition-all capitalize ${
                          moodData.energyLevel === level
                            ? 'border-xova-primary bg-xova-primary/10 shadow-sm'
                            : 'border-border hover:border-xova-primary/40 hover:bg-xova-primary/5'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div>
                  <Label className="mb-3 block text-lg">Current Mood</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(['stressed', 'calm', 'happy', 'tired'] as const).map(mood => (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => setMoodData({ ...moodData, mood })}
                        className={`p-4 border-2 rounded-lg transition-all capitalize ${
                          moodData.mood === mood
                            ? 'border-xova-secondary bg-xova-secondary/10 shadow-sm'
                            : 'border-border hover:border-xova-secondary/40 hover:bg-xova-secondary/5'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Appetite */}
                <div>
                  <Label className="mb-3 block text-lg">Appetite</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['light', 'normal', 'hungry'] as const).map(appetite => (
                      <button
                        key={appetite}
                        type="button"
                        onClick={() => setMoodData({ ...moodData, appetite })}
                        className={`p-4 border-2 rounded-lg transition-all capitalize ${
                          moodData.appetite === appetite
                            ? 'border-xova-accent bg-xova-accent/10 shadow-sm'
                            : 'border-border hover:border-xova-accent/40 hover:bg-xova-accent/5'
                        }`}
                      >
                        {appetite}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specific Needs */}
                <div>
                  <Label className="mb-3 block text-lg">Specific Needs (Optional)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {specificNeedsOptions.map(option => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          moodData.specificNeeds.includes(option.value)
                            ? 'border-xova-success bg-xova-success/10 shadow-sm'
                            : 'border-border hover:border-xova-success/40 hover:bg-xova-success/5'
                        }`}
                      >
                        <Checkbox
                          checked={moodData.specificNeeds.includes(option.value)}
                          onCheckedChange={() => toggleNeed(option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-center text-muted-foreground mb-4">
                  ✓ Optimized for your nutritional gaps and health goals
                </p>
                <Button 
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate My Optimized Smoothie
                </Button>
              </div>
            </Card>
          </div>
        )}

        {step === 'result' && recipe && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl mb-2">{recipe.name}</h1>
              <p className="text-xl text-gray-600">Your nutritionally optimized smoothie</p>
            </div>

            {/* Nutrition Match Indicator */}
            <Card className="p-6 mb-6 border-2 border-xova-success/30 bg-gradient-to-r from-xova-success/5 to-xova-accent/5">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-xova-success" />
                <h2 className="text-xl font-semibold text-xova-success">Nutritional Optimization</h2>
              </div>
              <p className="text-gray-700">
                This smoothie is specifically designed to address your daily nutritional gaps and support your current mood and energy levels. 
                Each ingredient was selected based on your profile and today's specific needs.
              </p>
            </Card>

            {/* Ingredients */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl mb-4">Ingredients</h2>
              <div className="space-y-4">
                {recipe.ingredients.map((ri, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{ri.ingredient.name}</span>
                        {isPremium ? (
                          <span className="text-xova-primary">{ri.amount}g</span>
                        ) : (
                          <span className="text-muted-foreground">Premium only</span>
                        )}
                      </div>
                      {isPremium && (
                        <p className="text-sm text-gray-600">{ri.reason}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {!isPremium && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800">
                    <strong>Upgrade to Premium</strong> to see exact proportions and detailed explanations
                  </p>
                </div>
              )}
            </Card>

            {/* Nutritional Info */}
            <Card className="p-8 mb-6">
              <button
                onClick={() => toggleSection('nutrition')}
                className="flex items-center justify-between w-full mb-4"
              >
                <h2 className="text-2xl">Nutritional Information</h2>
                {expandedSections.nutrition ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
              {expandedSections.nutrition && (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-xova-primary/10 rounded-lg border border-xova-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Calories</p>
                      <p className="text-2xl text-xova-primary">
                        {isPremium ? recipe.nutritionalInfo.totalCalories : '---'}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Protein</p>
                      <p className="text-2xl text-blue-700">
                        {isPremium ? `${recipe.nutritionalInfo.totalProtein}g` : '---'}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Carbs</p>
                      <p className="text-2xl text-purple-700">
                        {isPremium ? `${recipe.nutritionalInfo.totalCarbs}g` : '---'}
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Fiber</p>
                      <p className="text-2xl text-orange-700">
                        {isPremium ? `${recipe.nutritionalInfo.totalFiber}g` : '---'}
                      </p>
                    </div>
                  </div>

                  {isPremium && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="mb-3 text-gray-600">Vitamins</h3>
                        <div className="flex flex-wrap gap-2">
                          {recipe.nutritionalInfo.vitamins.map(vitamin => (
                            <span key={vitamin} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              Vitamin {vitamin}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-3 text-gray-600">Minerals</h3>
                        <div className="flex flex-wrap gap-2">
                          {recipe.nutritionalInfo.minerals.map(mineral => (
                            <span key={mineral} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {mineral}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Scientific Explanation */}
            {isPremium && (
              <Card className="p-8 mb-6 border-2 border-xova-accent/30 bg-gradient-to-br from-white to-xova-accent/5">
                <button
                  onClick={() => toggleSection('scientific')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <div className="flex items-center gap-2">
                    <Dna className="w-6 h-6 text-xova-accent" />
                    <h2 className="text-2xl">Scientific Transparency</h2>
                  </div>
                  {expandedSections.scientific ? (
                    <ChevronUp className="w-6 h-6 text-xova-accent" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-xova-accent" />
                  )}
                </button>
                {expandedSections.scientific && (
                  <div className="space-y-6">
                    {/* Overview */}
                    <div className="p-4 bg-white rounded-lg border border-xova-accent/20">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-xova-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="mb-2 text-xova-accent">Why This Recipe Works For You</h3>
                          <p className="text-gray-700 leading-relaxed">
                            {recipe.detailedScience.overview}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Nutrient Breakdown */}
                    {recipe.detailedScience.nutrientBreakdown.length > 0 && (
                      <div>
                        <h3 className="mb-3 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-xova-primary" />
                          <span className="text-xova-primary">Key Nutrients & Scientific Evidence</span>
                        </h3>
                        <div className="space-y-3">
                          {recipe.detailedScience.nutrientBreakdown.map((nutrient, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg border border-xova-primary/20">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-xova-primary">{nutrient.nutrient}</span>
                                <span className="text-sm px-2 py-1 bg-xova-primary/10 text-xova-primary rounded">
                                  {nutrient.amount}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {nutrient.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Benefits */}
                    <div>
                      <h3 className="mb-3 text-gray-600">Key Benefits</h3>
                      <div className="flex flex-wrap gap-2">
                        {recipe.benefits.map(benefit => (
                          <span key={benefit} className="px-3 py-1 bg-xova-success/10 text-xova-success border border-xova-success/20 rounded-full text-sm">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setStep('nutrition')}
                variant="outline"
                className="flex-1 min-w-[120px]"
              >
                Start Over
              </Button>
              <Button 
                onClick={() => setStep('options')}
                className="bg-gradient-to-r from-xova-success to-xova-accent hover:from-xova-success/90 hover:to-xova-accent/90 shadow-lg shadow-xova-success/25"
              >
                <Zap className="w-4 h-4 mr-2" />
                Choose How to Get It
              </Button>
              {isPremium && (
                <>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {step === 'options' && recipe && (
          <PostSmoothieOptions 
            onNavigate={onNavigate}
            smoothieName={recipe.name}
          />
        )}
      </main>
    </div>
  );
}
