import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Sparkles, Target, Brain, MapPin, Package } from 'lucide-react';
import { useEffect } from 'react';

interface DemoPageProps {
  onNavigate: (page: string) => void;
}

export function DemoPage({ onNavigate }: DemoPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <Button variant="outline" onClick={() => onNavigate('landing')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Demo Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-xova-primary/10 to-xova-secondary/10 border border-xova-primary/20 rounded-full mb-8 backdrop-blur-sm">
            <span className="bg-gradient-to-r from-xova-primary to-xova-secondary bg-clip-text text-transparent font-medium">Demo Experience</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary bg-clip-text text-transparent">
            Personalized Nutrition for Consistent Health
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            This is the beginning of personalized nutrition offering - consistency to stick to your routine no matter the chaos
          </p>
          <div className="bg-gradient-to-r from-xova-accent/10 to-xova-success/10 border border-xova-accent/20 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-lg font-medium text-gray-800 mb-4">
              Choose how you want your personalized smoothies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-xova-primary rounded-full"></div>
                <span><strong>Make at home</strong> - Get recipes & ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-xova-accent rounded-full"></div>
                <span><strong>Pick up</strong> - At nearby coffee places</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-xova-success rounded-full"></div>
                <span><strong>Weekly delivery</strong> - Direct to your door</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Step 1 */}
          <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-xova-primary/20 bg-gradient-to-br from-white to-xova-primary/5">
            <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-xova-primary/30">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3">1. Your Profile</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tell us about your health goals, activity level, and preferences
            </p>
          </Card>

          {/* Step 2 */}
          <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-xova-accent/20 bg-gradient-to-br from-white to-xova-accent/5">
            <div className="w-16 h-16 bg-gradient-to-br from-xova-accent to-xova-success rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-xova-accent/30">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3">2. AI Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI analyzes your needs and creates personalized recommendations
            </p>
          </Card>

          {/* Step 3 */}
          <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-xova-secondary/20 bg-gradient-to-br from-white to-xova-secondary/5">
            <div className="w-16 h-16 bg-gradient-to-br from-xova-secondary to-xova-warning rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-xova-secondary/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3">3. Choose Options</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pick from nearby cafés or get ingredients delivered to your door
            </p>
          </Card>

          {/* Step 4 */}
          <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-xova-success/20 bg-gradient-to-br from-white to-xova-success/5">
            <div className="w-16 h-16 bg-gradient-to-br from-xova-success to-xova-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-xova-success/30">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3">4. Enjoy & Track</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get your personalized smoothie and track your health progress
            </p>
          </Card>
        </div>

        {/* Demo Results */}
        <Card className="p-8 mb-16 bg-gradient-to-br from-xova-primary/5 to-xova-accent/5 border-2 border-xova-primary/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Demo Results</h2>
            <p className="text-lg text-muted-foreground">Here's what XOVA would create for Sarah, a 32-year-old marketing manager</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Detailed Profile */}
            <div className="bg-white rounded-lg p-6 border border-border/50">
              <h3 className="text-xl font-bold mb-6 text-xova-primary">Sarah's Complete Profile</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🏃‍♀️ Activity Level</h4>
                  <p className="text-sm text-gray-700">Moderate (3-4x/week) - Mix of yoga, running, and strength training</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Primary Health Goals</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-xova-primary/10 text-xova-primary px-3 py-1 rounded-full text-sm">Energy Boost</span>
                    <span className="bg-xova-accent/10 text-xova-accent px-3 py-1 rounded-full text-sm">Weight Management</span>
                    <span className="bg-xova-secondary/10 text-xova-secondary px-3 py-1 rounded-full text-sm">Stress Relief</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🥗 Dietary Profile</h4>
                  <p className="text-sm text-gray-700 mb-2"><strong>Diet:</strong> Vegetarian (3 years)</p>
                  <p className="text-sm text-gray-700 mb-2"><strong>Allergies:</strong> None known</p>
                  <p className="text-sm text-gray-700"><strong>Dislikes:</strong> Overly sweet drinks, artificial flavors</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⏰ Lifestyle</h4>
                  <p className="text-sm text-gray-700 mb-2"><strong>Wake time:</strong> 6:30 AM</p>
                  <p className="text-sm text-gray-700 mb-2"><strong>Workout time:</strong> 7:00 AM (morning)</p>
                  <p className="text-sm text-gray-700"><strong>Stress level:</strong> High (busy work schedule)</p>
                </div>
              </div>
            </div>

            {/* Detailed Recommendation */}
            <div className="bg-white rounded-lg p-6 border border-border/50">
              <h3 className="text-xl font-bold mb-6 text-xova-accent">Scientifically-Backed Nutritional Profile</h3>
            <p className="text-sm text-muted-foreground mb-4 bg-xova-accent/10 p-3 rounded-lg">
              <strong>Scientific Foundation:</strong> Our AI generates a nutritionally optimized profile that precisely matches your questionnaire responses, backed by peer-reviewed research and nutritional science.
            </p>
            
            {/* Nutritional Profile Building Process */}
            <div className="bg-gradient-to-r from-xova-primary/5 to-xova-accent/5 p-4 rounded-lg mb-6 border border-xova-primary/20">
              <h4 className="font-semibold text-xova-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-xova-primary/20 rounded-full flex items-center justify-center text-xs">📊</span>
                How We Build Your Nutritional Profile
              </h4>
              <p className="text-sm text-gray-700 mb-3">Based on Sarah's questionnaire, we analyze these key elements:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-xova-primary rounded-full"></span>
                  <span>Activity Level & Frequency</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-xova-accent rounded-full"></span>
                  <span>Health Goals & Priorities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-xova-success rounded-full"></span>
                  <span>Dietary Restrictions & Preferences</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span>Allergies & Food Sensitivities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Lifestyle & Schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  <span>Stress Levels & Energy Needs</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3 italic">
                Result: Personalized nutrient targets for protein, vitamins, minerals, and macronutrients
              </p>
            </div>

            {/* Generated Nutritional Profile */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs">🧬</span>
                Sarah's Generated Nutritional Profile
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-semibold text-green-700 mb-2">Daily Targets:</p>
                  <div className="space-y-1 text-gray-700">
                    <p>• <strong>Protein:</strong> 65-80g (post-workout recovery)</p>
                    <p>• <strong>Iron:</strong> 18mg (energy & oxygen transport)</p>
                    <p>• <strong>Vitamin C:</strong> 90mg (stress management)</p>
                    <p>• <strong>Fiber:</strong> 25-30g (satiety & digestion)</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-green-700 mb-2">Priority Nutrients:</p>
                  <div className="space-y-1 text-gray-700">
                    <p>• <strong>B-Vitamins:</strong> Energy metabolism</p>
                    <p>• <strong>Omega-3:</strong> Anti-inflammatory</p>
                    <p>• <strong>Antioxidants:</strong> Stress protection</p>
                    <p>• <strong>Magnesium:</strong> Muscle relaxation</p>
                  </div>
                </div>
              </div>
            </div>
              
              <div className="bg-gradient-to-r from-xova-primary/10 to-xova-accent/10 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-lg mb-2">"Energizing Berry Boost"</h4>
                <p className="text-sm text-gray-700">Perfect for post-workout morning energy</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🥤 Ingredients</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>1 cup</strong> mixed berries (blueberries, strawberries, raspberries)</li>
                    <li>• <strong>1/2 banana</strong> (frozen for creaminess)</li>
                    <li>• <strong>1 cup</strong> spinach (for iron & folate)</li>
                    <li>• <strong>1 tbsp</strong> chia seeds (omega-3 & fiber)</li>
                    <li>• <strong>1 cup</strong> almond milk (protein & calcium)</li>
                    <li>• <strong>1 tsp</strong> vanilla extract</li>
                    <li>• <strong>1 tbsp</strong> almond butter (healthy fats)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Nutritional Breakdown</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Calories:</strong> 285</p>
                      <p><strong>Protein:</strong> 8g</p>
                      <p><strong>Carbs:</strong> 42g</p>
                    </div>
                    <div>
                      <p><strong>Fiber:</strong> 12g</p>
                      <p><strong>Iron:</strong> 3.2mg (18% DV)</p>
                      <p><strong>Vitamin C:</strong> 95mg (105% DV)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🧠 Scientific Matching to Sarah's Profile</h4>
                  <p className="text-xs text-gray-600 mb-3 italic">Each recommendation is scientifically validated against questionnaire responses</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Energy Goal Match:</strong> Natural sugars from berries provide sustained energy (matches "Energy Boost" goal)</li>
                    <li>• <strong>Activity Level Match:</strong> Iron from spinach supports post-workout recovery (matches "Moderate 3-4x/week" activity)</li>
                    <li>• <strong>Weight Goal Match:</strong> High fiber keeps you full longer (matches "Weight Management" goal)</li>
                    <li>• <strong>Stress Level Match:</strong> Vitamin C helps combat stress hormones (matches "High stress level")</li>
                    <li>• <strong>Dietary Preference Match:</strong> Plant-based protein from chia & almond butter (matches "Vegetarian" diet)</li>
                    <li>• <strong>Flavor Preference Match:</strong> Natural sweetness without artificial flavors (matches "Dislikes overly sweet, artificial")</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white rounded-lg p-6 border border-border/50">
            <h3 className="text-xl font-bold mb-6 text-xova-success">Delivery & Fulfillment Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-xova-primary/5 rounded-lg">
                <div className="w-12 h-12 bg-xova-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-xl">🏠</span>
                </div>
                <h4 className="font-semibold mb-2">Make at Home</h4>
                <p className="text-sm text-gray-600 mb-3">Get the complete recipe with shopping list</p>
                <p className="text-xs text-xova-primary font-medium">Cost: Free (ingredients ~CHF 3.50)</p>
              </div>
              
              <div className="text-center p-4 bg-xova-accent/5 rounded-lg">
                <div className="w-12 h-12 bg-xova-accent rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-xl">☕</span>
                </div>
                <h4 className="font-semibold mb-2">Pick Up Nearby</h4>
                <p className="text-sm text-gray-600 mb-3">Find cafés with similar smoothies</p>
                <p className="text-xs text-xova-accent font-medium">Cost: CHF 12-15 at partner cafés</p>
              </div>
              
              <div className="text-center p-4 bg-xova-success/5 rounded-lg">
                <div className="w-12 h-12 bg-xova-success rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-xl">📦</span>
                </div>
                <h4 className="font-semibold mb-2">Weekly Delivery</h4>
                <p className="text-sm text-gray-600 mb-3">Pre-portioned ingredients delivered weekly</p>
                <p className="text-xs text-xova-success font-medium">Cost: CHF 11 per smoothie (14-day plan), free delivery</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Try the Real Thing?</h2>
          <p className="text-muted-foreground mb-8">
            Create an account to get your own personalized smoothie recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('auth')}
              className="bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary/90 hover:to-xova-secondary/90"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Account
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('pricing')}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </main>

      {/* Footer with Disclaimer */}
      <footer className="bg-gray-50 border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xs text-muted-foreground space-y-2">
            <p className="font-semibold">Disclaimer</p>
            <p>
              <strong>Not Medical Advice:</strong> XOVA's nutritional recommendations are for informational purposes only and do not constitute medical advice, diagnosis, or treatment.
            </p>
            <p>
              <strong>Consult Healthcare Provider:</strong> Always consult with your healthcare provider or registered dietitian before making significant dietary changes, especially if you have medical conditions, food allergies, or take medications.
            </p>
            <p>
              <strong>Individual Results May Vary:</strong> Nutritional needs vary by individual. Our AI-generated profiles are general recommendations and should be personalized further with professional guidance.
            </p>
            <p>
              <strong>Emergency Situations:</strong> In case of allergic reactions or medical emergencies related to food consumption, seek immediate medical attention.
            </p>
            <p className="pt-4">&copy; 2025 XOVA. Personalized nutrition.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
