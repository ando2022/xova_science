import React, { useState } from 'react';
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
  const [showModal, setShowModal] = useState<null | 'essential' | 'calm' | 'brain'>(null);

  const variants: Record<string, { title: string; subtitle: string; color: string; gradient: string; ingredients: string[] }>= {
    essential: {
      title: 'Essential Focus',
      subtitle: 'Daily Superfood Mix',
      color: 'from-emerald-600 to-blue-600',
      gradient: 'from-emerald-50 via-white to-blue-50',
      ingredients: ['Spirulina 2g', 'Maca 1g', "Chia 4g", 'Vitamin C 100mg']
    },
    calm: {
      title: 'Calm & Energy',
      subtitle: 'Daily Superfood Mix',
      color: 'from-purple-600 to-pink-600',
      gradient: 'from-purple-50 via-white to-emerald-50',
      ingredients: ["Ashwagandha 500mg", 'Maca 1g', 'Cocoa 3g', 'Magnesium 150mg']
    },
    brain: {
      title: 'Brain & Immune',
      subtitle: 'Daily Superfood Mix',
      color: 'from-blue-600 to-cyan-500',
      gradient: 'from-blue-50 via-white to-emerald-50',
      ingredients: ["Lion's Mane 1g", 'Omega-3 (ALA) 1g', 'Vitamin D 1000 IU', 'Zinc 10mg']
    }
  };
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
            🧪 Personalized. Transparent. Science-Backed.
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Stop Guessing.<br />
          Start Knowing.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          We design your <strong>free personalized smoothie base</strong> first (fruit & vegetables),
          fully adapted to your goals and restrictions. Then we offer an <strong>optional superfood mix</strong>
          tailored to you — with clear scientific explanations and no hype.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
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

        {/* Product Showcase to avoid white space */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Package 1 */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg group hover:shadow-xl transition-shadow">
              <div className={`absolute inset-0 bg-gradient-to-br ${variants.essential.gradient}`} />
              <div className="relative p-6 h-56 flex flex-col items-center justify-center">
                <div className={`w-28 h-36 rounded-2xl bg-gradient-to-br ${variants.essential.color} shadow-2xl shadow-emerald-500/20 scale-100 group-hover:scale-105 transition-transform`} />
                <div className="mt-4 text-center">
                  <p className="text-sm tracking-wider text-gray-500">{variants.essential.subtitle}</p>
                  <p className="text-base font-semibold">{variants.essential.title}</p>
                </div>
                <button onClick={() => setShowModal('essential')} className="mt-3 text-sm font-medium text-emerald-700 hover:text-emerald-800 underline underline-offset-4">View ingredients</button>
              </div>
            </div>

            {/* Package 2 */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg group hover:shadow-xl transition-shadow">
              <div className={`absolute inset-0 bg-gradient-to-br ${variants.calm.gradient}`} />
              <div className="relative p-6 h-56 flex flex-col items-center justify-center">
                <div className={`w-28 h-36 rounded-2xl bg-gradient-to-br ${variants.calm.color} shadow-2xl shadow-purple-500/20 scale-100 group-hover:scale-105 transition-transform`} />
                <div className="mt-4 text-center">
                  <p className="text-sm tracking-wider text-gray-500">{variants.calm.subtitle}</p>
                  <p className="text-base font-semibold">{variants.calm.title}</p>
                </div>
                <button onClick={() => setShowModal('calm')} className="mt-3 text-sm font-medium text-purple-700 hover:text-purple-800 underline underline-offset-4">View ingredients</button>
              </div>
            </div>

            {/* Package 3 */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg group hover:shadow-xl transition-shadow">
              <div className={`absolute inset-0 bg-gradient-to-br ${variants.brain.gradient}`} />
              <div className="relative p-6 h-56 flex flex-col items-center justify-center">
                <div className={`w-28 h-36 rounded-2xl bg-gradient-to-br ${variants.brain.color} shadow-2xl shadow-blue-500/20 scale-100 group-hover:scale-105 transition-transform`} />
                <div className="mt-4 text-center">
                  <p className="text-sm tracking-wider text-gray-500">{variants.brain.subtitle}</p>
                  <p className="text-base font-semibold">{variants.brain.title}</p>
                </div>
                <button onClick={() => setShowModal('brain')} className="mt-3 text-sm font-medium text-blue-700 hover:text-blue-800 underline underline-offset-4">View ingredients</button>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowModal(null)}>
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  {variants[showModal].title}
                </h3>
                <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">Example daily sachet ingredients (may vary based on your profile):</p>
              <ul className="space-y-2 mb-6">
                {variants[showModal].ingredients.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-800 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <Button onClick={() => setShowModal(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

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

      {/* Brand Pillars - No competitor mentions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What You Get With XOVA
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized nutrition with full transparency and scientific clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-emerald-200 bg-emerald-50">
            <div className="flex items-center gap-3 mb-4">
              <Beaker className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold text-emerald-800">Free Personalized Recipe</h3>
            </div>
            <p className="text-emerald-700">We generate a smoothie base tailored to your goals, taste, and restrictions.</p>
          </Card>

          <Card className="p-8 border-blue-200 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-800">Scientific Transparency</h3>
            </div>
            <p className="text-blue-700">Every ingredient includes a plain-language explanation and the level of evidence behind it.</p>
          </Card>

          <Card className="p-8 border-purple-200 bg-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-800">Tailored Superfood Mix</h3>
            </div>
            <p className="text-purple-700">Optional daily mix, pre-measured for you. CHF 4/day • min 7 days.</p>
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

      {/* Superfood Mix Offer (mirrors hero cards) */}
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
              
              {/* Mirror of hero variants */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {(['essential','calm','brain'] as const).map((key) => (
                  <div key={key} className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${variants[key].gradient}`} />
                    <div className="relative p-4 h-44 flex flex-col items-center justify-center">
                      <div className={`w-20 h-28 rounded-xl bg-gradient-to-br ${variants[key].color} shadow-lg scale-100 group-hover:scale-105 transition-transform`} />
                      <div className="mt-3 text-center">
                        <p className="text-xs tracking-wider text-gray-500">{variants[key].subtitle}</p>
                        <p className="text-sm font-semibold">{variants[key].title}</p>
                      </div>
                      <button onClick={() => setShowModal(key)} className="mt-2 text-xs font-medium text-emerald-700 hover:text-emerald-800 underline underline-offset-4">View ingredients</button>
                    </div>
                  </div>
                ))}
              </div>

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
                Get Free Recipe
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
