import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  CheckCircle, 
  Beaker, 
  Leaf, 
  Zap, 
  Heart, 
  Brain, 
  Shield,
  Award,
  Clock,
  ShoppingCart,
  ArrowRight,
  Star,
  Target
} from 'lucide-react';

interface RecipeAndOfferProps {
  profile: any;
  onBack: () => void;
  onOrderSuperfoods: (order: any) => void;
}

export function RecipeAndOffer({ profile, onBack, onOrderSuperfoods }: RecipeAndOfferProps) {
  const [recipe, setRecipe] = useState<any>(null);
  const [superfoodMix, setSuperfoodMix] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'7-day' | '14-day'>('7-day');

  useEffect(() => {
    generateRecipeAndSuperfoods();
  }, []);

  const generateRecipeAndSuperfoods = async () => {
    setLoading(true);
    
    // Simulate API call to generate recipe and superfood mix
    setTimeout(() => {
      const generatedRecipe = {
        name: "Energy Boost Green Smoothie",
        ingredients: [
          { name: "Spinach", amount: "2 cups", benefit: "Iron, folate, antioxidants" },
          { name: "Banana", amount: "1 medium", benefit: "Potassium, natural sweetness" },
          { name: "Mango", amount: "1/2 cup", benefit: "Vitamin C, beta-carotene" },
          { name: "Almond Milk", amount: "1 cup", benefit: "Calcium, vitamin E" },
          { name: "Chia Seeds", amount: "1 tbsp", benefit: "Omega-3, fiber" }
        ],
        instructions: [
          "Add spinach and almond milk to blender first",
          "Add banana and mango",
          "Sprinkle in chia seeds",
          "Blend on high for 60 seconds until smooth",
          "Add ice if desired and blend again"
        ],
        nutrition: {
          calories: 320,
          protein: 12,
          fiber: 8,
          vitaminC: 85,
          iron: 4.2
        },
        benefits: [
          "Sustained energy throughout the day",
          "Supports immune system function",
          "Promotes healthy digestion",
          "Rich in antioxidants"
        ]
      };

      const generatedSuperfoods = {
        name: "Personalized Superfood Mix",
        ingredients: [
          { 
            name: "Spirulina", 
            amount: "2g", 
            benefit: "Complete protein, B-vitamins", 
            science: "Contains all essential amino acids and is 60% protein by weight",
            goal: "Energy & Muscle Building"
          },
          { 
            name: "Maca Powder", 
            amount: "1g", 
            benefit: "Adaptogen, hormone balance", 
            science: "Clinical studies show improved energy and mood in 6-12 weeks",
            goal: "Energy & Stress Relief"
          },
          { 
            name: "Ashwagandha", 
            amount: "500mg", 
            benefit: "Stress reduction, cortisol management", 
            science: "Reduces cortisol by 23% and improves sleep quality in clinical trials",
            goal: "Stress Relief & Sleep"
          },
          { 
            name: "Lion's Mane", 
            amount: "1g", 
            benefit: "Cognitive function, nerve growth", 
            science: "Stimulates NGF (Nerve Growth Factor) production for brain health",
            goal: "Brain Health"
          }
        ],
        totalBenefits: [
          "Enhanced energy without crashes",
          "Improved stress resilience",
          "Better cognitive function",
          "Support for your specific health goals"
        ],
        scientificBacking: "Each ingredient is backed by peer-reviewed research and clinical studies"
      };

      setRecipe(generatedRecipe);
      setSuperfoodMix(generatedSuperfoods);
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold mb-2">Generating Your Recipe</p>
          <p className="text-gray-600">Creating your personalized smoothie and superfood mix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Questionnaire
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Your Personalized Nutrition Plan</h1>
            <p className="text-sm text-gray-600">Recipe + Superfood Mix</p>
          </div>
          <div className="w-32"></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Free Recipe is Ready! 🎉
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your health goals and preferences, here's your personalized smoothie recipe. 
            Plus, discover how our superfood mix can amplify your results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Free Recipe */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Beaker className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Your Free Recipe</h3>
                <Badge className="bg-emerald-100 text-emerald-800">100% Free</Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{recipe.name}</h4>
                <p className="text-gray-600">Perfectly tailored to your health goals and taste preferences</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Ingredients:</h5>
                <div className="space-y-2">
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-gray-600 ml-2">({ingredient.amount})</span>
                      </div>
                      <span className="text-sm text-gray-500">{ingredient.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Instructions:</h5>
                <ol className="space-y-2">
                  {recipe.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Nutritional Benefits:</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{recipe.nutrition.calories}</div>
                    <div className="text-sm text-blue-800">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{recipe.nutrition.protein}g</div>
                    <div className="text-sm text-green-800">Protein</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Superfood Mix Offer */}
          <Card className="p-8 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Superfood Mix</h3>
                <Badge className="bg-emerald-500 text-white">Personalized for You</Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">What's in Your Mix:</h4>
                <div className="space-y-3">
                  {superfoodMix.ingredients.map((ingredient: any, index: number) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-emerald-200">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-gray-900">{ingredient.name}</h5>
                        <Badge className="bg-emerald-100 text-emerald-800 text-xs">{ingredient.amount}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ingredient.benefit}</p>
                      <div className="text-xs text-emerald-700 bg-emerald-100 p-2 rounded">
                        <strong>Science:</strong> {ingredient.science}
                      </div>
                      <div className="text-xs text-blue-700 mt-1">
                        <strong>Goal:</strong> {ingredient.goal}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-emerald-200">
                <h5 className="font-semibold text-gray-900 mb-3">Key Benefits:</h5>
                <ul className="space-y-2">
                  {superfoodMix.totalBenefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Scientific Backing</span>
                </div>
                <p className="text-sm text-blue-700">{superfoodMix.scientificBacking}</p>
              </div>

              {/* Pricing */}
              <div className="bg-white p-6 rounded-lg border-2 border-emerald-300">
                <h5 className="font-semibold text-gray-900 mb-4">Choose Your Plan:</h5>
                <div className="space-y-3">
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedPlan === '7-day' ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => setSelectedPlan('7-day')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h6 className="font-semibold">7-Day Supply</h6>
                        <p className="text-sm text-gray-600">Perfect for trying</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">CHF 28</div>
                        <div className="text-sm text-gray-600">CHF 4/day</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedPlan === '14-day' ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => setSelectedPlan('14-day')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h6 className="font-semibold">14-Day Supply</h6>
                        <p className="text-sm text-gray-600">Best value</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">CHF 56</div>
                        <div className="text-sm text-gray-600">CHF 4/day</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => onOrderSuperfoods({ plan: selectedPlan, superfoods: superfoodMix })}
                  className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Superfood Mix
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Why Choose XOVA */}
        <Card className="p-8 mt-12 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why XOVA is Different</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalized</h4>
              <p className="text-sm text-gray-600">Every ingredient chosen specifically for your health goals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Scientifically Proven</h4>
              <p className="text-sm text-gray-600">No marketing hype - only evidence-based ingredients</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Transparent</h4>
              <p className="text-sm text-gray-600">Know exactly what you're taking and why it works</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

