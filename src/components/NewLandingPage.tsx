import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Sparkles, 
  CheckCircle, 
  X, 
  Beaker, 
  Target, 
  Shield, 
  Heart,
  ArrowRight,
  Leaf,
  Zap,
  Brain,
  Award
} from 'lucide-react';

interface NewLandingPageProps {
  onNavigate: (page: string) => void;
}

export function NewLandingPage({ onNavigate }: NewLandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              XOVA
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onNavigate('login')}>
              Log In
            </Button>
            <Button onClick={() => onNavigate('questionnaire')} className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
              Get Your Free Recipe
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-200 rounded-full mb-8">
          <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent font-semibold">
            🧪 Science-Based Nutrition
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Stop Guessing.<br />
          Start Knowing.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          Get your <strong>free personalized smoothie recipe</strong> based on your health goals, 
          then add our <strong>scientifically-proven superfood mix</strong> for maximum benefits.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            onClick={() => onNavigate('questionnaire')}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-8 py-4 text-lg"
          >
            <Beaker className="w-5 h-5 mr-2" />
            Get Free Recipe
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onNavigate('demo')}
            className="px-8 py-4 text-lg"
          >
            See How It Works
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            <span className="text-gray-700 font-medium">Free Recipe Generation</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700 font-medium">Scientifically Proven</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-6 h-6 text-purple-600" />
            <span className="text-gray-700 font-medium">Personalized for You</span>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why XOVA is Different
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While others sell you mystery powders, we give you transparency, science, and control.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* The Problem */}
          <Card className="p-8 border-red-200 bg-red-50">
            <div className="flex items-center gap-3 mb-6">
              <X className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl font-bold text-red-800">The Problem with Others</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800">Huel & Competitors</h4>
                  <p className="text-red-700">Mystery ingredients, no personalization, one-size-fits-all approach</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800">Generic Supplements</h4>
                  <p className="text-red-700">No scientific justification, marketing hype over evidence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800">Guesswork</h4>
                  <p className="text-red-700">You're left wondering what actually works for your specific needs</p>
                </div>
              </div>
            </div>
          </Card>

          {/* The Solution */}
          <Card className="p-8 border-emerald-200 bg-emerald-50">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <h3 className="text-2xl font-bold text-emerald-800">The XOVA Solution</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-800">Free Personalized Recipe</h4>
                  <p className="text-emerald-700">Get your custom smoothie recipe based on your health goals and restrictions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-800">Scientifically-Proven Superfoods</h4>
                  <p className="text-emerald-700">Evidence-based ingredients with clear explanations of benefits</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-800">Complete Transparency</h4>
                  <p className="text-emerald-700">Know exactly what you're taking and why it works for you</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to personalized nutrition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. Tell Us About You</h3>
            <p className="text-gray-600 mb-6">
              Complete our scientific questionnaire about your health goals, dietary restrictions, and preferences.
            </p>
            <Badge className="bg-emerald-100 text-emerald-800">Free</Badge>
          </Card>

          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Beaker className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Get Your Recipe</h3>
            <p className="text-gray-600 mb-6">
              Receive your personalized smoothie recipe with scientific explanations for each ingredient choice.
            </p>
            <Badge className="bg-blue-100 text-blue-800">Free</Badge>
          </Card>

          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. Add Superfoods (Optional)</h3>
            <p className="text-gray-600 mb-6">
              Order your personalized superfood mix, pre-measured and tailored to your specific health goals.
            </p>
            <Badge className="bg-purple-100 text-purple-800">CHF 4/day</Badge>
          </Card>
        </div>
      </section>

      {/* Superfood Mix Offer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Your Personalized Superfood Mix
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scientifically-proven ingredients, pre-measured for your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Premium Ingredients</h4>
                  <p className="text-gray-600">High-quality superfoods like spirulina, maca, ashwagandha, and more</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Scientific Justification</h4>
                  <p className="text-gray-600">Clear explanations of why each ingredient works for your specific goals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Pre-Measured</h4>
                  <p className="text-gray-600">Exact amounts for optimal benefits, no guesswork required</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Guaranteed</h4>
                  <p className="text-gray-600">Third-party tested, organic when possible, no fillers or additives</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Superfood Mix</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-2">CHF 4</div>
              <div className="text-gray-600 mb-6">per day • minimum 7 days</div>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between">
                  <span>7-day supply:</span>
                  <span className="font-semibold">CHF 28</span>
                </div>
                <div className="flex justify-between">
                  <span>14-day supply:</span>
                  <span className="font-semibold">CHF 56</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Free shipping:</span>
                  <span className="font-semibold text-emerald-600">✓</span>
                </div>
              </div>

              <Button 
                onClick={() => onNavigate('questionnaire')}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
              >
                Get Started Free
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="p-12 text-center bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Stop Guessing?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get your free personalized smoothie recipe and discover the power of science-based nutrition.
          </p>
          <Button 
            onClick={() => onNavigate('questionnaire')}
            size="lg"
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            <Beaker className="w-5 h-5 mr-2" />
            Get Your Free Recipe Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Beaker className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">XOVA</span>
            </div>
            <p className="text-gray-600 mb-4">
              Science-based nutrition. Transparency guaranteed.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 XOVA. Personalized nutrition backed by science.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
