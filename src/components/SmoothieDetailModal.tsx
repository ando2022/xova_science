import React from 'react';
import ReactDOM from 'react-dom';
import { X, Star, Target, Heart, Zap, CheckCircle, Clock, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { SmoothieRecipe } from '../lib/smoothie-generator';

interface SmoothieDetailModalProps {
  smoothie: SmoothieRecipe | null;
  profile: any;
  onClose: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

export function SmoothieDetailModal({ smoothie, profile, onClose, onSelect, isSelected }: SmoothieDetailModalProps) {
  console.log('SmoothieDetailModal render:', { smoothie: !!smoothie, profile: !!profile });
  
  if (!smoothie) {
    console.log('No smoothie provided to modal');
    return null;
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium':
        return 'from-purple-500 to-pink-500';
      case 'enhanced':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-green-500 to-emerald-500';
    }
  };

  const getGoalIcon = (goal: string) => {
    switch (goal) {
      case 'energy':
        return <Zap className="w-4 h-4" />;
      case 'muscle-gain':
        return <Target className="w-4 h-4" />;
      case 'weight-loss':
        return <Target className="w-4 h-4" />;
      case 'immune-support':
        return <Heart className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getTierColor(smoothie.tier)} p-6 rounded-t-2xl text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-2">
                {smoothie.tier === 'premium' ? 'Premium' : smoothie.tier === 'enhanced' ? 'Enhanced' : 'Essential'}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{smoothie.name}</h1>
              <p className="text-white/90 text-lg">{smoothie.flavor_profile}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">CHF {smoothie.price.seven_day}</div>
              <div className="text-white/80 text-sm">14-day: CHF {smoothie.price.fourteen_day}</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* How This Fits Your Goals */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-xova-primary" />
              How This Fits Your Nutritional Profile
            </h2>
            <div className="space-y-6">
              {/* Goals Alignment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Your Health Goals:</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.health_goals?.map((goal: string) => (
                      <Badge key={goal} variant="outline" className="flex items-center gap-1">
                        {getGoalIcon(goal)}
                        {goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Smoothie Benefits:</h3>
                  <div className="flex flex-wrap gap-2">
                    {smoothie.health_benefits.slice(0, 4).map((benefit, index) => (
                      <Badge key={index} className="bg-xova-primary/10 text-xova-primary border-xova-primary/20">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nutritional Fit Analysis */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Nutritional Fit Score</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-gray-600">Goal Alignment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">88%</div>
                    <div className="text-gray-600">Nutrient Coverage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-gray-600">Profile Match</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">90%</div>
                    <div className="text-gray-600">Time Optimization</div>
                  </div>
                </div>
              </div>

              {/* Key Nutrients for Your Goals */}
              <div>
                <h3 className="font-semibold mb-3">Key Nutrients for Your Goals:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.health_goals?.map((goal, index) => {
                    const nutrientMap = {
                      'energy': ['Iron', 'Vitamin C', 'B-Complex'],
                      'weight-loss': ['Protein', 'Fiber', 'Magnesium'],
                      'muscle-gain': ['Protein', 'Creatine', 'BCAAs'],
                      'immune-support': ['Vitamin C', 'Zinc', 'Antioxidants'],
                      'heart-health': ['Omega-3', 'Potassium', 'Folate'],
                      'stress-relief': ['Magnesium', 'B-Vitamins', 'Adaptogens']
                    };
                    const nutrients = nutrientMap[goal] || ['Essential Nutrients'];
                    
                    return (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="font-medium text-gray-800 mb-2">
                          {goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        <div className="text-sm text-gray-600">
                          {nutrients.join(' • ')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Ingredients & Nutrition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ingredients */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-xova-primary" />
                Ingredients
              </h2>
              <div className="space-y-3">
                {smoothie.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-xova-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-xova-primary">
                          {ingredient.amount_grams}g
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{ingredient.ingredient.display_name}</div>
                        <div className="text-sm text-gray-600">{ingredient.ingredient.category}</div>
                      </div>
                    </div>
                    {ingredient.ingredient.functional_tags && (
                      <div className="flex gap-1">
                        {ingredient.ingredient.functional_tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Nutritional Breakdown */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-xova-primary" />
                Nutritional Profile
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{smoothie.nutritional_breakdown.calories}</div>
                  <div className="text-sm text-blue-800">Calories</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{smoothie.nutritional_breakdown.protein}g</div>
                  <div className="text-sm text-green-800">Protein</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{smoothie.nutritional_breakdown.carbs}g</div>
                  <div className="text-sm text-orange-800">Carbs</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{smoothie.nutritional_breakdown.fiber}g</div>
                  <div className="text-sm text-purple-800">Fiber</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold mb-2">Key Micronutrients:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Iron:</span>
                    <span className="font-medium">{smoothie.nutritional_breakdown.iron}mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vitamin C:</span>
                    <span className="font-medium">{smoothie.nutritional_breakdown.vitamin_c}mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calcium:</span>
                    <span className="font-medium">{smoothie.nutritional_breakdown.calcium}mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Magnesium:</span>
                    <span className="font-medium">{smoothie.nutritional_breakdown.magnesium}mg</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Scientific Explanation */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-xova-primary" />
              Why This Works for You
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {smoothie.scientific_rationale}
              </p>
            </div>
          </Card>

          {/* Preparation Instructions */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-xova-primary" />
              Preparation Instructions
            </h2>
            <ol className="space-y-2">
              {smoothie.preparation_instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-xova-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ol>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              onClick={onSelect}
              className={`flex-1 ${
                isSelected
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary'
              }`}
            >
              {isSelected ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Selected
                </>
              ) : (
                'Select This Smoothie'
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render in portal to avoid stacking/overflow issues
  const portalRoot = document.body;
  return ReactDOM.createPortal(modalContent, portalRoot);
}
