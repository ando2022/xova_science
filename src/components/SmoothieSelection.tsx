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
            fat: Math.round(base.nutritional_breakdown.fat * multiplier * 10) / 10,
            iron: Math.round(base.nutritional_breakdown.iron * multiplier * 10) / 10,
            vitamin_c: Math.round(base.nutritional_breakdown.vitamin_c * multiplier * 10) / 10,
            calcium: Math.round(base.nutritional_breakdown.calcium * multiplier * 10) / 10,
            magnesium: Math.round(base.nutritional_breakdown.magnesium * multiplier * 10) / 10,
            omega3: Math.round(base.nutritional_breakdown.omega3 * multiplier * 10) / 10,
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
    <div className="min-h-screen bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">
      {/* Hero Header with Strong Branding */}
      <header className="bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Bold XOVA Branding */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6366f1] to-[#ec4899] rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  XOVA
                </h1>
                <p className="text-sm text-indigo-200 font-semibold">Personalized Nutrition</p>
              </div>
            </div>
            <Button 
              onClick={onBack}
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 font-bold px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Profile
            </Button>
          </div>
          
          {/* Progress Bar - Bold and Visible */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-white font-semibold mb-3">
              <span className="text-lg">Step 2 of 3: Select Your Smoothie</span>
              <span className="text-lg">{selectedSmoothies.length}/{MAX_SELECTION} Selected</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 shadow-inner">
              <div className="bg-gradient-to-r from-[#22c55e] to-[#10b981] h-4 rounded-full transition-all duration-500 shadow-lg" style={{ width: '66%' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Selection Hero Section */}
      <section className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border-4 border-white/50">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-black bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent mb-4">
                Your Perfect Smoothie
              </h2>
              <p className="text-xl text-gray-700 font-semibold">
                One essential recipe tailored to your goals · 7 smoothies per week
              </p>
            </div>

            {error && (
              <div className="mb-8 p-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-xl">
                <p className="text-white text-lg font-bold text-center">{error}</p>
              </div>
            )}

            {/* Tier Options - Bold Color Blocks */}
            <div className="mb-10">
              <h3 className="text-3xl font-black text-gray-900 mb-6 text-center">Choose Your Tier</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#22c55e] to-[#10b981] rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all border-4 border-white">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Star className="w-12 h-12 text-[#22c55e]" />
                  </div>
                  <h4 className="font-black text-2xl mb-3 text-center">Essential</h4>
                  <p className="text-xl font-bold mb-3 text-center">CHF 12 per smoothie</p>
                  <p className="text-base font-semibold text-center text-green-50">Pure, natural ingredients with essential nutrition for daily wellness</p>
                </div>
                <div className="bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all border-4 border-white">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Star className="w-12 h-12 text-[#3b82f6]" />
                  </div>
                  <h4 className="font-black text-2xl mb-3 text-center">Enhanced</h4>
                  <p className="text-xl font-bold mb-3 text-center">CHF 15 per smoothie</p>
                  <p className="text-base font-semibold text-center text-blue-50">Superfoods included for enhanced performance and recovery</p>
                </div>
                <div className="bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all border-4 border-white">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Star className="w-12 h-12 text-[#a855f7]" />
                  </div>
                  <h4 className="font-black text-2xl mb-3 text-center">Premium</h4>
                  <p className="text-xl font-bold mb-3 text-center">CHF 18 per smoothie</p>
                  <p className="text-base font-semibold text-center text-purple-50">Elite superfoods and luxury ingredients for maximum benefits</p>
                </div>
              </div>
            </div>

            {/* Smoothie Cards - Large and Bold */}
            <div className="space-y-6">
              {filteredSmoothies.map((smoothie) => {
                const isSelected = selectedSmoothies.includes(smoothie);
                const canSelect = selectedSmoothies.length < MAX_SELECTION || isSelected;

                return (
                  <div 
                    key={smoothie.id}
                    className={`rounded-3xl p-8 cursor-pointer transition-all transform hover:scale-[1.02] shadow-2xl border-4 ${
                      isSelected 
                        ? 'bg-gradient-to-br from-[#22c55e] to-[#10b981] border-white scale-[1.02]' 
                        : canSelect 
                          ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#6366f1]' 
                          : 'bg-gray-200 border-gray-300 opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => canSelect && handleSmoothieSelect(smoothie)}
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left: Smoothie Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className={`text-4xl font-black mb-3 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                              {smoothie.name}
                            </h3>
                            <div className="flex items-center gap-3 flex-wrap">
                              <Badge 
                                className={`text-base px-4 py-2 font-bold ${
                                  smoothie.tier === 'premium' 
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                                    : smoothie.tier === 'enhanced' 
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                }`}
                              >
                                {smoothie.tier === 'premium' ? 'PREMIUM' : smoothie.tier === 'enhanced' ? 'ENHANCED' : 'ESSENTIAL'}
                              </Badge>
                              <Badge className={`text-base px-4 py-2 font-bold ${isSelected ? 'bg-white text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                {smoothie.flavor_profile}
                              </Badge>
                              <Badge className={`text-base px-4 py-2 font-bold ${isSelected ? 'bg-white text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                {smoothie.time_of_day}
                              </Badge>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                              <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                          )}
                        </div>

                        {/* Ingredients */}
                        <div className="mb-6">
                          <h4 className={`text-xl font-black mb-4 ${isSelected ? 'text-white' : 'text-gray-900'}`}>Ingredients:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {smoothie.ingredients.slice(0, 6).map((ingredient, idx) => (
                              <div key={idx} className={`flex items-center justify-between px-4 py-3 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}>
                                <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>{ingredient.ingredient.display_name}</span>
                                <span className={`font-black ${isSelected ? 'text-white' : 'text-gray-600'}`}>{ingredient.amount_grams}g</span>
                              </div>
                            ))}
                          </div>
                          {smoothie.ingredients.length > 6 && (
                            <p className={`text-base font-bold mt-3 ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                              +{smoothie.ingredients.length - 6} more ingredients
                            </p>
                          )}
                        </div>

                        {/* Nutrition */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                          <div className={`text-center px-4 py-4 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-orange-50'}`}>
                            <p className={`text-3xl font-black ${isSelected ? 'text-white' : 'text-orange-600'}`}>{smoothie.nutritional_breakdown.calories}</p>
                            <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-orange-800'}`}>Calories</p>
                          </div>
                          <div className={`text-center px-4 py-4 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-blue-50'}`}>
                            <p className={`text-3xl font-black ${isSelected ? 'text-white' : 'text-blue-600'}`}>{smoothie.nutritional_breakdown.protein}g</p>
                            <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-blue-800'}`}>Protein</p>
                          </div>
                          <div className={`text-center px-4 py-4 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-green-50'}`}>
                            <p className={`text-3xl font-black ${isSelected ? 'text-white' : 'text-green-600'}`}>{smoothie.nutritional_breakdown.fiber}g</p>
                            <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-green-800'}`}>Fiber</p>
                          </div>
                          <div className={`text-center px-4 py-4 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-purple-50'}`}>
                            <p className={`text-3xl font-black ${isSelected ? 'text-white' : 'text-purple-600'}`}>{smoothie.nutritional_breakdown.vitamin_c}mg</p>
                            <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-purple-800'}`}>Vitamin C</p>
                          </div>
                        </div>

                        {/* Health Benefits */}
                        <div>
                          <h4 className={`text-xl font-black mb-3 ${isSelected ? 'text-white' : 'text-gray-900'}`}>Key Benefits:</h4>
                          <div className="flex flex-wrap gap-3">
                            {smoothie.health_benefits.slice(0, 4).map((benefit, index) => (
                              <Badge key={index} className={`text-base px-4 py-2 font-bold ${isSelected ? 'bg-white text-green-700' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'}`}>
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Pricing and Action */}
                      <div className="lg:w-80 flex flex-col justify-between">
                        <div className={`rounded-2xl p-8 mb-6 ${isSelected ? 'bg-white/20' : 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]'}`}>
                          <p className={`text-lg font-black mb-2 ${isSelected ? 'text-white' : 'text-white'}`}>Price per smoothie:</p>
                          <p className={`text-5xl font-black mb-4 ${isSelected ? 'text-white' : 'text-white'}`}>CHF {smoothie.price.seven_day}</p>
                          <p className={`text-base font-bold ${isSelected ? 'text-white' : 'text-indigo-100'}`}>7-day plan: CHF {smoothie.price.seven_day * 7}</p>
                          <p className={`text-base font-bold ${isSelected ? 'text-white' : 'text-indigo-100'}`}>14-day plan: CHF {smoothie.price.fourteen_day * 14}</p>
                        </div>

                        <div className="space-y-4">
                          <Button
                            onClick={async (e) => {
                              e.stopPropagation();
                              setSelectedSmoothie(smoothie);
                            }}
                            className={`w-full text-lg font-black py-6 rounded-xl shadow-xl transform hover:scale-105 transition-all ${
                              isSelected 
                                ? 'bg-white text-green-700 hover:bg-gray-100' 
                                : 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed]'
                            }`}
                          >
                            <Eye className="w-6 h-6 mr-3" />
                            View Full Details
                          </Button>
                          
                          {isSelected ? (
                            <div className="flex items-center justify-center gap-3 py-4 bg-white rounded-xl shadow-lg">
                              <CheckCircle className="w-8 h-8 text-green-600" />
                              <span className="text-2xl font-black text-green-700">SELECTED</span>
                            </div>
                          ) : canSelect ? (
                            <div className="flex items-center justify-center gap-3 py-4 bg-gray-100 rounded-xl">
                              <Star className="w-6 h-6 text-gray-600" />
                              <span className="text-lg font-bold text-gray-700">Click anywhere to select</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Section - Bold Bottom Bar */}
      {selectedSmoothies.length > 0 && (
        <section className="bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] py-8 sticky bottom-0 shadow-2xl border-t-4 border-white/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Order Summary */}
              <div className="flex items-center gap-8">
                <div className="text-white">
                  <p className="text-lg font-bold text-indigo-200 mb-1">Your Plan</p>
                  <p className="text-3xl font-black">{selectedSmoothies[0].name}</p>
                  <p className="text-xl font-bold text-indigo-300">7 smoothies · CHF {selectedSmoothies[0].price.seven_day} each</p>
                </div>
                <div className="h-20 w-1 bg-white/30"></div>
                <div className="text-white text-center">
                  <p className="text-lg font-bold text-indigo-200 mb-1">Total</p>
                  <p className="text-5xl font-black">CHF {getPlanPrice()}</p>
                  <p className="text-base font-bold text-green-400">✓ Free Delivery</p>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleContinue}
                disabled={selectedSmoothies.length !== MAX_SELECTION}
                className="bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#16a34a] hover:to-[#059669] text-white font-black text-2xl px-12 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all border-4 border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-8 h-8 mr-4" />
                Proceed to Checkout
                <ArrowRight className="w-8 h-8 ml-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

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
