import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, ArrowLeft, CheckCircle, Star, Heart, Clock, Zap, Target, ShoppingCart, Filter, Eye } from 'lucide-react';
import { smoothieGenerator, NutritionalProfile, SmoothieRecipe } from '../lib/smoothie-generator';
import { SmoothieDetailModal } from './SmoothieDetailModal';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SmoothieSelectionProps {
  profile: NutritionalProfile;
  onSelectionComplete: (selectedSmoothies: SmoothieRecipe[], planType: 'first-order' | 'weekly') => void;
  onBack: () => void;
}

type FilterType = 'all' | 'essential' | 'enhanced' | 'premium' | 'energy' | 'recovery' | 'weight-management' | 'immune' | 'heart-health';

export function SmoothieSelection({ profile, onSelectionComplete, onBack }: SmoothieSelectionProps) {
  const [smoothies, setSmoothies] = useState<SmoothieRecipe[]>([]);
  const [selectedSmoothies, setSelectedSmoothies] = useState<SmoothieRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [planType, setPlanType] = useState<'first-order' | 'weekly'>('first-order');
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedSmoothie, setSelectedSmoothie] = useState<SmoothieRecipe | null>(null);
  const [error, setError] = useState<string>('');

  const MAX_SELECTION = 3;
  const FIRST_ORDER_QUANTITY = 14;
  const WEEKLY_QUANTITY = 7;

  useEffect(() => {
    generateSmoothies();
  }, []);

  const generateSmoothies = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load ingredients first
      await smoothieGenerator.loadIngredients();
      
      // Generate 21 smoothie variations
      const generatedSmoothies = await smoothieGenerator.generateSmoothieRecipes(profile, 21);
      
      setSmoothies(generatedSmoothies);
    } catch (error: any) {
      console.error('Error generating smoothies:', error);
      setError('Failed to generate smoothies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSmoothieSelect = (smoothie: SmoothieRecipe) => {
    if (selectedSmoothies.includes(smoothie)) {
      // Remove from selection
      setSelectedSmoothies(selectedSmoothies.filter(s => s.id !== smoothie.id));
    } else if (selectedSmoothies.length < MAX_SELECTION) {
      // Add to selection
      setSelectedSmoothies([...selectedSmoothies, smoothie]);
    }
  };

  const filteredSmoothies = smoothies.filter(smoothie => {
    if (filter === 'all') {
      return true;
    }
    
    // Filter by tier first
    if (filter === 'essential' || filter === 'enhanced' || filter === 'premium') {
      return smoothie.tier === filter;
    }
    
    // Then filter by health benefits
    return smoothie.health_benefits.some(benefit => {
      switch (filter) {
        case 'energy':
          return benefit.toLowerCase().includes('energy');
        case 'recovery':
          return benefit.toLowerCase().includes('recovery') || benefit.toLowerCase().includes('muscle');
        case 'weight-management':
          return benefit.toLowerCase().includes('weight') || benefit.toLowerCase().includes('metabolism');
        case 'immune':
          return benefit.toLowerCase().includes('immune');
        case 'heart-health':
          return benefit.toLowerCase().includes('heart') || benefit.toLowerCase().includes('cardiovascular');
        default:
          return true;
      }
    });
  });

  const getFilterIcon = (filterType: FilterType) => {
    const icons = {
      'all': Filter,
      'essential': Star,
      'enhanced': Star,
      'premium': Star,
      'energy': Zap,
      'recovery': Target,
      'weight-management': Target,
      'immune': Heart,
      'heart-health': Heart
    };
    const Icon = icons[filterType];
    return <Icon className="w-4 h-4" />;
  };

  const getPlanPrice = () => {
    const quantity = planType === 'first-order' ? FIRST_ORDER_QUANTITY : WEEKLY_QUANTITY;
    const pricePerSmoothie = 12;
    return quantity * pricePerSmoothie;
  };

  const getPlanDescription = () => {
    if (planType === 'first-order') {
      return `${FIRST_ORDER_QUANTITY} smoothies over 2 weeks (${FIRST_ORDER_QUANTITY / 2} per week)`;
    } else {
      return `${WEEKLY_QUANTITY} smoothies per week`;
    }
  };

  const handleContinue = () => {
    if (selectedSmoothies.length !== MAX_SELECTION) {
      setError(`Please select exactly ${MAX_SELECTION} smoothies`);
      return;
    }

    onSelectionComplete(selectedSmoothies, planType);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p className="text-lg font-semibold mb-2">Generating Your Smoothies</p>
          <p className="text-muted-foreground">Creating 21 personalized options based on your profile...</p>
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
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary bg-clip-text text-transparent">
              XOVA
            </span>
          </div>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Step 2 of 3: Select Your Smoothies</span>
            <span>Choose 3 from 21 options</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-xova-primary to-xova-secondary h-2 rounded-full transition-all duration-300" style={{ width: '66%' }} />
          </div>
        </div>

        {/* Selection Summary */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Choose Your Perfect Smoothies</h1>
              <p className="text-muted-foreground">
                Select {MAX_SELECTION} smoothies from {smoothies.length} personalized options
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-xova-primary">
                {selectedSmoothies.length}/{MAX_SELECTION}
              </div>
              <p className="text-sm text-muted-foreground">Selected</p>
            </div>
          </div>
        </Card>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Tier Explanation */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Choose Your Smoothie Tier</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-green-800 mb-2">Essential</h3>
              <p className="text-sm text-green-700 mb-2">CHF 12/11 per smoothie</p>
              <p className="text-xs text-green-600">Pure, natural ingredients with essential nutrition for daily wellness</p>
            </div>
            <div className="text-center p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-blue-800 mb-2">Enhanced</h3>
              <p className="text-sm text-blue-700 mb-2">CHF 15/14 per smoothie</p>
              <p className="text-xs text-blue-600">Superfoods included for enhanced performance and recovery</p>
            </div>
            <div className="text-center p-4 border border-purple-200 rounded-lg bg-purple-50">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-purple-800 mb-2">Premium</h3>
              <p className="text-sm text-purple-700 mb-2">CHF 18/17 per smoothie</p>
              <p className="text-xs text-purple-600">Elite superfoods and luxury ingredients for maximum benefits</p>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Smoothies' },
              { id: 'essential', label: 'Essential (CHF 12/11)' },
              { id: 'enhanced', label: 'Enhanced (CHF 15/14)' },
              { id: 'premium', label: 'Premium (CHF 18/17)' },
              { id: 'energy', label: 'Energy Boost' },
              { id: 'recovery', label: 'Recovery' },
              { id: 'weight-management', label: 'Weight Management' },
              { id: 'immune', label: 'Immune Support' },
              { id: 'heart-health', label: 'Heart Health' }
            ].map((filterOption) => (
              <Button
                key={filterOption.id}
                variant={filter === filterOption.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterOption.id as FilterType)}
                className={filter === filterOption.id ? 'bg-xova-primary' : ''}
              >
                {getFilterIcon(filterOption.id as FilterType)}
                <span className="ml-2">{filterOption.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Smoothie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSmoothies.map((smoothie) => {
            const isSelected = selectedSmoothies.includes(smoothie);
            const canSelect = selectedSmoothies.length < MAX_SELECTION || isSelected;

            return (
              <Card 
                key={smoothie.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  isSelected 
                    ? 'border-xova-primary bg-xova-primary/5 shadow-lg' 
                    : canSelect 
                      ? 'border-border hover:border-xova-primary/50' 
                      : 'border-gray-200 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => canSelect && handleSmoothieSelect(smoothie)}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-xova-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

                {/* Smoothie Name & Flavor */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold">{smoothie.name}</h3>
                    <Badge 
                      className={`text-xs ${
                        smoothie.tier === 'premium' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : smoothie.tier === 'enhanced' 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      }`}
                    >
                      {smoothie.tier === 'premium' ? 'Premium' : smoothie.tier === 'enhanced' ? 'Enhanced' : 'Essential'}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {smoothie.flavor_profile}
                  </Badge>
                </div>

                {/* Key Ingredients Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-gray-700">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {smoothie.ingredients.slice(0, 4).map((ingredient, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {ingredient.ingredient.display_name}
                      </Badge>
                    ))}
                    {smoothie.ingredients.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{smoothie.ingredients.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Key Nutrients */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span>Calories:</span>
                    <span className="font-semibold">{smoothie.nutritional_breakdown.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protein:</span>
                    <span className="font-semibold">{smoothie.nutritional_breakdown.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fiber:</span>
                    <span className="font-semibold">{smoothie.nutritional_breakdown.fiber}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vitamin C:</span>
                    <span className="font-semibold">{smoothie.nutritional_breakdown.vitamin_c}mg</span>
                  </div>
                </div>

                {/* Health Benefits */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {smoothie.health_benefits.slice(0, 2).map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                    {smoothie.health_benefits.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{smoothie.health_benefits.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-semibold ml-1">CHF {smoothie.price.seven_day}</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    14-day: CHF {smoothie.price.fourteen_day}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSmoothie(smoothie);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {isSelected ? (
                    <div className="flex items-center text-xova-primary">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  ) : canSelect ? (
                    <div className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 mr-2" />
                      <span className="text-sm">Click to select</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400">
                      <span className="text-sm">Selection full</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Plan Selection */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className={`p-4 cursor-pointer transition-all ${
                planType === 'first-order' 
                  ? 'border-xova-primary bg-xova-primary/5' 
                  : 'border-border hover:border-xova-primary/50'
              }`}
              onClick={() => setPlanType('first-order')}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">First Order (Recommended)</h3>
                {planType === 'first-order' && (
                  <CheckCircle className="w-5 h-5 text-xova-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {getPlanDescription()}
              </p>
              <div className="text-2xl font-bold text-xova-primary">
                CHF {getPlanPrice()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {FIRST_ORDER_QUANTITY / 2} smoothies per week
              </p>
            </Card>

            <Card 
              className={`p-4 cursor-pointer transition-all ${
                planType === 'weekly' 
                  ? 'border-xova-primary bg-xova-primary/5' 
                  : 'border-border hover:border-xova-primary/50'
              }`}
              onClick={() => setPlanType('weekly')}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Weekly Plan</h3>
                {planType === 'weekly' && (
                  <CheckCircle className="w-5 h-5 text-xova-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {getPlanDescription()}
              </p>
              <div className="text-2xl font-bold text-xova-primary">
                CHF {getPlanPrice()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Recurring weekly delivery
              </p>
            </Card>
          </div>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={selectedSmoothies.length !== MAX_SELECTION}
            className="bg-gradient-to-r from-xova-primary to-xova-secondary px-8 py-3 text-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Continue to Checkout
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Selection Summary */}
        {selectedSmoothies.length > 0 && (
          <Card className="p-4 mt-8">
            <h3 className="font-semibold mb-3">Your Selection Summary</h3>
            <div className="space-y-2">
              {selectedSmoothies.map((smoothie, index) => (
                <div key={smoothie.id} className="flex items-center justify-between">
                  <span className="text-sm">{index + 1}. {smoothie.name}</span>
                  <span className="text-sm font-semibold">CHF {smoothie.cost_breakdown.total_cost}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total for {planType === 'first-order' ? FIRST_ORDER_QUANTITY : WEEKLY_QUANTITY} smoothies:</span>
                  <span>CHF {getPlanPrice()}</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Smoothie Detail Modal */}
      <SmoothieDetailModal
        smoothie={selectedSmoothie}
        profile={profile}
        onClose={() => setSelectedSmoothie(null)}
        onSelect={() => {
          if (selectedSmoothie) {
            handleSmoothieSelect(selectedSmoothie);
            setSelectedSmoothie(null);
          }
        }}
        isSelected={selectedSmoothie ? selectedSmoothies.some(s => s.id === selectedSmoothie.id) : false}
      />
    </div>
  );
}
