import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Sparkles, Zap, Clock } from 'lucide-react';

interface PricingDisplayProps {
  onSelectPlan?: (plan: string) => void;
}

export function PricingDisplay({ onSelectPlan }: PricingDisplayProps) {
  const pricingPlans = [
    {
      name: 'Weekly Plan',
      price: 84,
      period: 'per week',
      description: '7 smoothies delivered weekly',
      features: [
        '7 personalized smoothies (12 CHF each)',
        'Free delivery included',
        'Recipe variety guaranteed',
        'Priority customer support',
        'Nutritional progress tracking'
      ],
      popular: true,
      savings: 'Save 25% vs café prices'
    },
    {
      name: '14-Day Plan',
      price: 154,
      period: 'per 2 weeks',
      description: '14 smoothies for maximum savings',
      features: [
        '14 personalized smoothies (11 CHF each)',
        'Free delivery included',
        'Maximum recipe variety',
        'VIP customer support',
        'Advanced nutrition analytics',
        'Save 1 CHF per smoothie vs weekly'
      ],
      popular: false,
      savings: 'Save 25% vs café prices'
    }
  ];

  const competitorPrice = 16; // Average café price

  return (
    <div className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the plan that works for you. All plans include personalized nutrition targeting.
          </p>
          
          {/* Savings Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-full px-6 py-3 mb-8">
            <Zap className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">
              Save up to 25% vs café prices (CHF {competitorPrice} per smoothie)
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 ${plan.popular ? 'border-2 border-xova-primary shadow-lg shadow-xova-primary/20' : 'border border-border'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-xova-primary to-xova-secondary text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold">CHF {plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>

                {plan.savings && (
                  <Badge className="bg-green-100 text-green-800 mb-4">
                    {plan.savings}
                  </Badge>
                )}
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${plan.popular 
                  ? 'bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary/90 hover:to-xova-secondary/90' 
                  : 'bg-gray-900 hover:bg-gray-800'
                }`}
                onClick={() => onSelectPlan?.(plan.name)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Choose {plan.name}
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <h3 className="text-2xl font-bold mb-4">What's Included in Every Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-xova-primary to-xova-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Personalized Recipes</h4>
                <p className="text-sm text-muted-foreground">
                  Personalized smoothies based on your health profile and goals
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-xova-accent to-xova-success rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Free Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Free delivery on all orders CHF 12 and above
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-xova-success to-xova-warning rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Quality Guarantee</h4>
                <p className="text-sm text-muted-foreground">
                  Fresh ingredients, precise measurements, and nutritional optimization
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Cost Breakdown */}
        <div className="mt-16">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Cost Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">XOVA Pricing</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Raw ingredients (per smoothie)</span>
                    <span className="font-medium">≤ CHF 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preparation & packaging</span>
                    <span className="font-medium">CHF 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery & service</span>
                    <span className="font-medium">CHF 5</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Your price per smoothie</span>
                    <span>CHF 12</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">vs. Café Prices</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Average café smoothie</span>
                    <span className="font-medium">CHF 16</span>
                  </div>
                  <div className="flex justify-between">
                    <span>XOVA smoothie</span>
                    <span className="font-medium">CHF 12</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-green-600 border-t pt-3">
                    <span>Your savings</span>
                    <span>CHF 4 (25%)</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
