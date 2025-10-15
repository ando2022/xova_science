import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check, Sparkles, TrendingUp, MapPin, Package, Leaf, Zap, Brain, ArrowRight, Clock, Target, Users } from 'lucide-react';

interface CleanLandingPageProps {
  onNavigate: (page: string) => void;
}

export function CleanLandingPage({ onNavigate }: CleanLandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-xova-primary/3 via-white to-xova-accent/3">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-xova-primary/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary bg-clip-text text-transparent">
              XOVA
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onNavigate('login')} className="border-xova-primary/20 hover:border-xova-primary/40 hover:bg-xova-primary/5">
              Log In
            </Button>
            <Button onClick={() => onNavigate('signup')} className="bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25">
              Sign Up Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-block px-5 py-2 bg-gradient-to-r from-xova-primary/10 to-xova-secondary/10 border border-xova-primary/20 rounded-full mb-8 backdrop-blur-sm">
          <span className="bg-gradient-to-r from-xova-primary to-xova-secondary bg-clip-text text-transparent font-medium">AI-Powered Nutrition</span>
        </div>
        <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary bg-clip-text text-transparent leading-tight">
          Your shortcut to mindful eating
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
          Packed with balanced nutrients to fit your goals. Consistency to stick to your routine no matter the chaos. You can make it at home, pick up at nearby coffee places, or order weekly delivery.
        </p>
        
        {/* Pricing Highlight */}
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-xova-success/10 to-xova-accent/10 border border-xova-success/20 rounded-full mb-10 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-xova-success to-xova-accent bg-clip-text text-transparent">12 CHF</span>
            <span className="text-muted-foreground">per smoothie</span>
            <span className="text-sm bg-xova-success/20 text-xova-success px-2 py-1 rounded-full">Save 25% vs cafés</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Free delivery • Minimum 7 smoothies per week
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => onNavigate('demo')} className="bg-gradient-to-r from-xova-accent to-xova-success hover:from-xova-accent/90 hover:to-xova-success/90 shadow-lg shadow-xova-accent/25">
            <Zap className="w-5 h-5 mr-2" />
            Try Demo
          </Button>
          <Button size="lg" onClick={() => onNavigate('signup')} className="bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25">
            Create Free Account
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          No credit card required • Try the full experience before signing up
        </p>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-xova-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to personalized smoothies that fit your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="p-8 text-center hover:shadow-lg transition-all border-2 border-xova-primary/20 bg-gradient-to-br from-white to-xova-primary/5 flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-xova-primary/30">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Scientific Questionnaire</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                We gather your health goals, activity level, and preferences through a scientifically-designed questionnaire to create your personalized nutritional profile.
              </p>
              <div className="flex items-center justify-center text-sm text-xova-primary">
                <span className="w-2 h-2 bg-xova-primary rounded-full mr-2"></span>
                Personalized nutrition planning
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="p-8 text-center hover:shadow-lg transition-all border-2 border-xova-accent/20 bg-gradient-to-br from-white to-xova-accent/5 flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-br from-xova-accent to-xova-success rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-xova-accent/30">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. AI Smoothie Generation</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Our AI creates the perfect smoothie recipe that maximizes your nutritional needs and tastes great.
              </p>
              <div className="flex items-center justify-center text-sm text-xova-accent">
                <span className="w-2 h-2 bg-xova-accent rounded-full mr-2"></span>
                Scientifically optimized
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="p-8 text-center hover:shadow-lg transition-all border-2 border-xova-secondary/20 bg-gradient-to-br from-white to-xova-secondary/5 flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-br from-xova-secondary to-xova-warning rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-xova-secondary/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Find Your Options</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Choose from nearby cafés with similar smoothies or get pre-portioned ingredients delivered to your door.
              </p>
              <div className="flex items-center justify-center text-sm text-xova-secondary">
                <span className="w-2 h-2 bg-xova-secondary rounded-full mr-2"></span>
                Multiple fulfillment options
              </div>
            </Card>

            {/* Step 4 */}
            <Card className="p-8 text-center hover:shadow-lg transition-all border-2 border-xova-success/20 bg-gradient-to-br from-white to-xova-success/5 flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-br from-xova-success to-xova-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-xova-success/30">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">4. Enjoy & Track</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Get your personalized smoothie and track how it supports your health goals over time.
              </p>
              <div className="flex items-center justify-center text-sm text-xova-success">
                <span className="w-2 h-2 bg-xova-success rounded-full mr-2"></span>
                Continuous optimization
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose XOVA?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Science-backed smoothies that adapt to your lifestyle and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <Card className="p-8 hover:shadow-lg transition-all border-2 border-xova-primary/20">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-primary to-xova-accent rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-xova-primary/30">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized for You</h3>
              <p className="text-muted-foreground">
                Every smoothie is tailored to your specific health goals, dietary restrictions, activity level, and taste preferences. No generic recipes.
              </p>
            </Card>

            {/* Benefit 2 */}
            <Card className="p-8 hover:shadow-lg transition-all border-2 border-xova-accent/20">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-accent to-xova-success rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-xova-accent/30">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Consistent Routine</h3>
              <p className="text-muted-foreground">
                Stick to your health routine no matter the chaos. Our personalized approach ensures you get the nutrition you need, when you need it.
              </p>
            </Card>

            {/* Benefit 3 */}
            <Card className="p-8 hover:shadow-lg transition-all border-2 border-xova-secondary/20">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-secondary to-xova-warning rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-xova-secondary/30">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Flexible Fulfillment</h3>
              <p className="text-muted-foreground">
                Choose how you want your smoothie - make at home, pick up at nearby coffee places, or order weekly delivery.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-xova-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your lifestyle. All plans include AI personalization and scientific optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Weekly Plan - Most Popular */}
            <Card className="p-8 text-center hover:shadow-lg transition-all border-2 border-xova-primary/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-xova-primary to-xova-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Weekly Plan</h3>
                <div className="text-3xl font-bold mb-2">84 CHF</div>
                <p className="text-sm text-muted-foreground">7 smoothies per week</p>
                <p className="text-xs text-xova-accent mt-1">12 CHF per smoothie</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-xova-success flex-shrink-0" />
                  <span className="text-sm">7 AI-personalized recipes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-xova-success flex-shrink-0" />
                  <span className="text-sm">Weekly meal planning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-xova-success flex-shrink-0" />
                  <span className="text-sm">Free delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-xova-success flex-shrink-0" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button 
                onClick={() => onNavigate('pricing')} 
                className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary/90 hover:to-xova-secondary/90"
              >
                Choose Plan
              </Button>
            </Card>

            {/* 14-Day Plan */}
            <Card className="p-8 text-center hover:shadow-lg transition-all border-2 border-border/50">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">14-Day Plan</h3>
                <div className="text-3xl font-bold mb-2">154 CHF</div>
                <p className="text-sm text-muted-foreground">14 smoothies every 2 weeks</p>
                <p className="text-xs text-xova-accent mt-1">11 CHF per smoothie</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-xova-success flex-shrink-0" />
                  <span className="text-sm">14 AI-personalized recipes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-xova-success flex-shrink-0" />
                  <span className="text-sm">Two-week meal planning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-xova-success flex-shrink-0" />
                  <span className="text-sm">Free delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-xova-success flex-shrink-0" />
                  <span className="text-sm">Save 1 CHF per smoothie</span>
                </li>
              </ul>
              <Button 
                onClick={() => onNavigate('pricing')} 
                className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary/90 hover:to-xova-secondary/90"
              >
                Choose Plan
              </Button>
            </Card>
          </div>

          {/* Delivery Policy */}
          <div className="mt-12 text-center">
            <div className="inline-block p-6 bg-gradient-to-r from-xova-accent/10 to-xova-success/10 border border-xova-accent/20 rounded-xl">
              <h3 className="font-semibold mb-2">Delivery Policy</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Free delivery</strong> on all weekly and 14-day plans<br/>
                Minimum order: 7 smoothies per week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl text-white mb-6">Ready to Optimize Your Smoothies?</h2>
          <p className="text-xl text-white/90 mb-8">
            Try our demo to see how personalized smoothies work, or create an account to save your preferences and track your progress.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('demo')} className="bg-white text-xova-primary hover:bg-white/90 shadow-xl shadow-black/20">
              <Zap className="w-5 h-5 mr-2" />
              Try Demo First
            </Button>
            <Button size="lg" onClick={() => onNavigate('signup')} className="bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 shadow-xl shadow-black/20">
              <ArrowRight className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-6">
            Demo users can explore the full experience • Account holders get personalized recommendations
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-xova-primary to-xova-secondary bg-clip-text text-transparent">
                XOVA
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-xova-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-xova-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-xova-primary transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground space-y-2">
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
// Complete rebuild trigger - Wed Oct 15 19:35:02 CEST 2025
