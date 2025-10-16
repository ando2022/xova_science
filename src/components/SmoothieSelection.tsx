import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, ArrowLeft, CheckCircle, Star, Heart, Clock, Zap, Target, ShoppingCart, Filter, Eye } from 'lucide-react';
import { smoothieGenerator, NutritionalProfile, SmoothieRecipe } from '../lib/smoothie-generator';
import { SmoothieDetailModal } from './SmoothieDetailModal';
// MVP: no analytics/db writes for selection flow

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SmoothieSelectionProps {
  profile: NutritionalProfile;
  onSelectionComplete: (selectedSmoothies: SmoothieRecipe[], planType: '7-day' | '14-day') => void;
  onBack: () => void;
}

type FilterType = 'all' | 'essential' | 'enhanced' | 'premium' | 'energy' | 'recovery' | 'weight-management' | 'immune' | 'heart-health';

export function SmoothieSelection({ profile, onSelectionComplete, onBack }: SmoothieSelectionProps) {
  const [smoothies, setSmoothies] = useState<SmoothieRecipe[]>([]);
  const [selectedSmoothies, setSelectedSmoothies] = useState<SmoothieRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  // RADICAL FIX: Force 7-day plan only
  const [planType, setPlanType] = useState<'7-day' | '14-day'>('7-day');
  
  // Override any plan type changes - FORCE 7-day minimum
  useEffect(() => {
    setPlanType('7-day');
  }, []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedSmoothie, setSelectedSmoothie] = useState<SmoothieRecipe | null>(null);
  const [error, setError] = useState<string>('');

  // Radical simplification: select ONE recipe (with tier options)
  const MAX_SELECTION = 1;
  const MINIMUM_ORDER_QUANTITY = 7; // Minimum order is 7 days
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
      
      // Generate a single baseline recipe, then derive Enhanced/Premium variants
      const baseList = await smoothieGenerator.generateSmoothieRecipes(profile, 1);
      const base = baseList[0];

      if (!base) {
        throw new Error('Failed to generate base smoothie');
      }

      const toVariant = (tier: 'essential' | 'enhanced' | 'premium', nameSuffix: string): SmoothieRecipe => {
        const multiplier = tier === 'premium' ? 1.3 : tier === 'enhanced' ? 1.15 : 1.0;
        
        return {
          ...base,
          id: `${base.id}-${tier}`,
          name: `${base.name} · ${nameSuffix}`,
          tier,
          price: tier === 'premium'
            ? { seven_day: 18, fourteen_day: 17 }
            : tier === 'enhanced'
              ? { seven_day: 15, fourteen_day: 14 }
              : { seven_day: 12, fourteen_day: 11 },
          // Scale nutrition based on tier
          nutritional_breakdown: {
            calories: Math.round(base.nutritional_breakdown.calories * multiplier),
            protein: Math.round(base.nutritional_breakdown.protein * multiplier * 10) / 10,
            carbs: Math.round(base.nutritional_breakdown.carbs * multiplier * 10) / 10,
            fiber: Math.round(base.nutritional_breakdown.fiber * multiplier * 10) / 10,
            iron: Math.round(base.nutritional_breakdown.iron * multiplier * 10) / 10,
            vitamin_c: Math.round(base.nutritional_breakdown.vitamin_c * multiplier * 10) / 10,
            calcium: Math.round(base.nutritional_breakdown.calcium * multiplier * 10) / 10,
            magnesium: Math.round(base.nutritional_breakdown.magnesium * multiplier * 10) / 10,
          },
          // Add tier-specific ingredients
          ingredients: tier === 'premium' 
            ? [...base.ingredients, { 
                ingredient: { name: 'Maca Powder', display_name: 'Maca Powder', category: 'Superfood' },
                amount_grams: 15
              }, {
                ingredient: { name: 'Spirulina', display_name: 'Spirulina', category: 'Superfood' },
                amount_grams: 10
              }]
            : tier === 'enhanced'
              ? [...base.ingredients, {
                  ingredient: { name: 'Chia Seeds', display_name: 'Chia Seeds', category: 'Superfood' },
                  amount_grams: 15
                }]
              : base.ingredients,
          health_benefits: tier === 'premium'
            ? [ 'Elite Performance', 'Premium Superfoods', ...base.health_benefits ]
            : tier === 'enhanced'
              ? [ 'Advanced Benefits', ...base.health_benefits ]
              : base.health_benefits,
        };
      };

      // MVP: one option only (Essential)
      setSmoothies([toVariant('essential', 'Essential')]);
    } catch (error: any) {
      console.error('Error generating smoothies:', error);
      setError('Failed to generate smoothies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSmoothieSelect = async (smoothie: SmoothieRecipe) => {
    if (selectedSmoothies.includes(smoothie)) {
      // Remove from selection
      setSelectedSmoothies(selectedSmoothies.filter(s => s.id !== smoothie.id));
    } else if (selectedSmoothies.length < MAX_SELECTION) {
      // Add to selection
      setSelectedSmoothies([...selectedSmoothies, smoothie]);

      // MVP: skip tracking
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
    if (selectedSmoothies.length === 0) return 0;
    
    // RADICAL FIX: Always 7-day plan (7 smoothies at CHF 12 each)
    const smoothie = selectedSmoothies[0]; // We only select 1 smoothie
    const quantity = 7; // FORCE 7 smoothies minimum
    
    // Always use 7-day price (CHF 12 each)
    const unitPrice = smoothie.price.seven_day;
    
    return unitPrice * quantity;
  };

  const getPlanDescription = () => {
    // RADICAL FIX: Always 7-day plan
    return '7 smoothies (CHF 12 each)';
  };

  const handleContinue = async () => {
    if (selectedSmoothies.length !== MAX_SELECTION) {
      setError(`Please select exactly ${MAX_SELECTION} smoothies`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create Stripe Checkout session and redirect (MVP)
      try {
        const totalPrice = getPlanPrice();
        console.log('Sending to Stripe:', { totalPrice, planType: '7-day', selectedSmoothies: selectedSmoothies.length });
        
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            totalAmountChf: totalPrice,
            planType: '7-day', // FORCE 7-day plan
            userEmail: undefined,
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.url) {
          throw new Error(data.error || 'Failed to start checkout');
        }

        window.location.href = data.url;
        return; // stop here; browser will navigate
      } catch (e: any) {
        console.error('Stripe start error:', e);
        // fallback to app checkout if serverless not configured yet
        onSelectionComplete(selectedSmoothies, planType);
      }

    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message || 'Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <span>Choose {MAX_SELECTION} from {smoothies.length} options</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-xova-primary to-xova-secondary h-2 rounded-full transition-all duration-300" style={{ width: '66%' }} />
          </div>
        </div>

        {/* Selection Summary */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Your Smoothie</h1>
              <p className="text-muted-foreground">
                One essential recipe. Your plan will include exactly 7 smoothies total.
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
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-xs">
                      {smoothie.flavor_profile}
                    </Badge>
                    <div className="text-xs text-blue-600 font-medium">
                      {smoothie.time_of_day}
                    </div>
                  </div>
                </div>

                {/* Ingredients List */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-gray-700">Ingredients:</h4>
                  <div className="space-y-1">
                    {smoothie.ingredients.slice(0, 6).map((ingredient, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-gray-700">{ingredient.ingredient.display_name}</span>
                        <span className="text-gray-500 font-medium">{ingredient.amount_grams}g</span>
                      </div>
                    ))}
                    {smoothie.ingredients.length > 6 && (
                      <div className="text-xs text-gray-500 italic">
                        +{smoothie.ingredients.length - 6} more ingredients
                      </div>
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
                    onClick={async (e) => {
                      e.stopPropagation();
                      console.log('View Details clicked for smoothie:', smoothie.name);
                      setSelectedSmoothie(smoothie);
                      
                      // Track smoothie view
                      try {
                        const { data: { user } } = await supabase.auth.getUser();
                        await DataService.trackSmoothieView(user?.id || null, smoothie.id, smoothie.name);
                      } catch (error) {
                        console.error('Error tracking smoothie view:', error);
                      }
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
                      <span className="text-sm">Click to select this version</span>
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

        {/* Basket & Plan Selection */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Your Smoothie Basket</h2>
          
          {/* Selected Smoothies Summary */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Selected Smoothies (3 of 3):</h3>
            <div className="space-y-2">
              {selectedSmoothies.map((smoothie, index) => (
                <div key={smoothie.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-xova-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{smoothie.name}</div>
                      <Badge 
                        className={`text-xs ${
                          smoothie.tier === 'premium' 
                            ? 'bg-purple-100 text-purple-700' 
                            : smoothie.tier === 'enhanced' 
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {smoothie.tier}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      CHF {smoothie.price.seven_day}
                    </div>
                    <div className="text-xs text-gray-500">per smoothie</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Summary (simplified) */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">Plan</div>
                <div className="text-sm text-gray-600">
                  7 smoothies · CHF 12 each
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-xova-primary">CHF {getPlanPrice()}</div>
                <div className="text-sm text-green-600">Free delivery</div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">Total Order</div>
                <div className="text-sm text-gray-600">
                  7 smoothies
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-xova-primary">
                  CHF {getPlanPrice()}
                </div>
                <div className="text-sm text-green-600">
                  Free delivery included
                </div>
              </div>
            </div>
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
                  <span className="text-sm font-semibold">CHF {smoothie.price.seven_day}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total for 7 smoothies:</span>
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
