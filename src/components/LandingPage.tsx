import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check, Sparkles, TrendingUp, MapPin, Package, Leaf, Zap, Brain } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
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
            <Button onClick={() => onNavigate('enhanced-generate')} className="bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25">
              Get Started
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
          Your Personal Nutrient Intelligence
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Get a personalized nutrient plan based on your health profile, goals, and mood. Then choose smoothies or café options that fit your plan.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => onNavigate('enhanced-generate')} className="bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="border-xova-primary/20 hover:border-xova-primary/40 hover:bg-xova-primary/5">
            See How It Works
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          No credit card required • Full access to nutrient planning
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">How XOVA Works</h2>
          <p className="text-xl text-muted-foreground">Three powerful features for your health journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="p-8 border-2 hover:border-xova-primary/40 transition-all hover:shadow-xl hover:shadow-xova-primary/15 bg-white group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-xova-primary to-xova-accent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-xova-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-block px-3 py-1 bg-xova-primary/10 rounded-full mb-4">
                <span className="text-sm text-xova-primary">AI-Powered</span>
              </div>
              <h3 className="text-2xl mb-4">AI Nutrient Plan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate your daily nutrient targets — protein, fiber, omega-3, vitamins — tailored to your profile. Get exact recommendations based on your health goals and daily state.
              </p>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="p-8 border-2 hover:border-xova-secondary/40 transition-all hover:shadow-xl hover:shadow-xova-secondary/15 bg-white group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-xova-secondary to-xova-warning"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-xova-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-block px-3 py-1 bg-xova-secondary/10 rounded-full mb-4">
                <span className="text-sm text-xova-secondary">Zurich Cafés</span>
              </div>
              <h3 className="text-2xl mb-4">Café Menu Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                See which café smoothies best match your nutrient plan. Browse menus from Zurich & Aarau cafés with nutrient alignment scores and pre-order options.
              </p>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="p-8 border-2 hover:border-xova-accent/40 transition-all hover:shadow-xl hover:shadow-xova-accent/15 bg-white group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-xova-accent to-xova-success"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-xova-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-block px-3 py-1 bg-xova-accent/10 rounded-full mb-4">
                <span className="text-sm text-xova-accent">12 CHF per smoothie</span>
              </div>
              <h3 className="text-2xl mb-4">Weekly Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive a weekly pack of smoothies designed to cover your nutrient plan. Frozen packs or café pickup available. Free delivery from 10+ smoothies per week.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Smart Delivery System */}
      <section className="bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-xova-secondary/3 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--xova-primary)/0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--xova-accent)/0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Smart Weekly Delivery System</h2>
            <p className="text-xl text-muted-foreground">Balancing advance planning with daily flexibility</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-xova-primary/20 hover:border-xova-primary/40 hover:shadow-lg hover:shadow-xova-primary/10 transition-all group">
              <div className="w-8 h-1 bg-gradient-to-r from-xova-primary to-xova-accent rounded-full mb-4"></div>
              <h3 className="text-lg mb-2 group-hover:text-xova-primary transition-colors">Baseline Preferences</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Set your core health goals and flavor preferences for consistent nutrition
              </p>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-xova-secondary/20 hover:border-xova-secondary/40 hover:shadow-lg hover:shadow-xova-secondary/10 transition-all group">
              <div className="w-8 h-1 bg-gradient-to-r from-xova-secondary to-xova-warning rounded-full mb-4"></div>
              <h3 className="text-lg mb-2 group-hover:text-xova-secondary transition-colors">Smart Nutrient Targets</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Daily nutrient ranges generated from your profile and health goals
              </p>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-xova-accent/20 hover:border-xova-accent/40 hover:shadow-lg hover:shadow-xova-accent/10 transition-all group">
              <div className="w-8 h-1 bg-gradient-to-r from-xova-accent to-xova-success rounded-full mb-4"></div>
              <h3 className="text-lg mb-2 group-hover:text-xova-accent transition-colors">Mid-Week Adjustment</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Modify remaining smoothies based on how the week is going
              </p>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-xova-success/20 hover:border-xova-success/40 hover:shadow-lg hover:shadow-xova-success/10 transition-all group">
              <div className="w-8 h-1 bg-gradient-to-r from-xova-success to-xova-accent rounded-full mb-4"></div>
              <h3 className="text-lg mb-2 group-hover:text-xova-success transition-colors">Live Feedback Loop</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Rate each smoothie to continuously improve future recommendations
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">From nutrient planning to complete delivery</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <Card className="p-8 border-2">
            <h3 className="text-2xl mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl">CHF 0</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-success mt-0.5 flex-shrink-0" />
                <span>Basic nutrient plan</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-success mt-0.5 flex-shrink-0" />
                <span>General nutritional targets</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-success mt-0.5 flex-shrink-0" />
                <span>Simple smoothie recipes</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">No exact nutrient targets</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">No café matching</span>
              </li>
            </ul>
            <Button className="w-full" variant="outline" onClick={() => onNavigate('enhanced-generate')}>
              Start Free
            </Button>
          </Card>

          {/* Premium Tier */}
          <Card className="p-8 border-2 border-xova-primary relative shadow-xl shadow-xova-primary/20 ring-2 ring-xova-primary/10 bg-gradient-to-br from-white to-xova-primary/5">
            <h3 className="text-2xl mb-2">Premium</h3>
            <div className="mb-6">
              <span className="text-4xl">CHF 10</span>
              <span className="text-muted-foreground">/week</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-primary mt-0.5 flex-shrink-0" />
                <span>Exact nutrient targets (daily)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-primary mt-0.5 flex-shrink-0" />
                <span>Precise smoothie recipes with proportions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-primary mt-0.5 flex-shrink-0" />
                <span>Scientific explanations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-primary mt-0.5 flex-shrink-0" />
                <span>Café menu matching (Zurich & Aarau)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-primary mt-0.5 flex-shrink-0" />
                <span>Pre-order functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-primary mt-0.5 flex-shrink-0" />
                <span>Unlimited nutrient plan generation</span>
              </li>
            </ul>
            <Button className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25" onClick={() => onNavigate('enhanced-generate')}>
              Get Premium
            </Button>
          </Card>

          {/* Delivery Tier */}
          <Card className="p-8 border-2 border-xova-accent/30 bg-gradient-to-br from-white to-xova-accent/5">
            <h3 className="text-2xl mb-2">Weekly Delivery</h3>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl text-xova-accent">CHF 12</span>
              </div>
              <span className="text-muted-foreground">/smoothie</span>
              <p className="text-xs text-xova-success mt-1">Up to 33% off with volume pricing</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-accent mt-0.5 flex-shrink-0" />
                <span><strong>All Premium features included</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-accent mt-0.5 flex-shrink-0" />
                <span>Smoothies matched to your nutrient plan</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-accent mt-0.5 flex-shrink-0" />
                <span>Frozen packs or café pickup</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-accent mt-0.5 flex-shrink-0" />
                <span>Min. 7 smoothies/week (CHF 12 each)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-accent mt-0.5 flex-shrink-0" />
                <span>Free delivery from 10+ smoothies/week</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-xova-accent mt-0.5 flex-shrink-0" />
                <span>Individually packaged per smoothie</span>
              </li>
            </ul>
            <Button className="w-full bg-gradient-to-r from-xova-accent to-xova-success hover:from-xova-accent/90 hover:to-xova-success/90" onClick={() => onNavigate('enhanced-generate')}>
              Start Delivery
            </Button>
            <p className="text-sm text-muted-foreground mt-3 text-center">Save vs. café prices (avg. CHF 14/smoothie)</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl text-white mb-6">Ready to Optimize Your Nutrient Intake?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join XOVA today and get your personalized nutrient plan
          </p>
          <Button size="lg" onClick={() => onNavigate('enhanced-generate')} className="bg-white text-xova-primary hover:bg-white/90 shadow-xl shadow-black/20">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 XOVA. Testing Platform - For demonstration purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
