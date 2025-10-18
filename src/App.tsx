// Force rebuild - Fixed Vercel output directory
import { useState, useEffect } from 'react';
import { AuthSystem } from './components/AuthSystem';
import { MVPDashboard } from './components/MVPDashboard';
import { PricingDisplay } from './components/PricingDisplay';
import { CheckoutPage } from './components/CheckoutPage';
import { NewLandingPage } from './components/NewLandingPage';
import { NewQuestionnaire } from './components/NewQuestionnaire';
import { RecipeAndOffer } from './components/RecipeAndOffer';
import { DemoPage } from './components/DemoPage';
import { SmoothieSelection } from './components/SmoothieSelection';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { createClient } from '@supabase/supabase-js';
import { Sparkles, User, Package, TrendingUp } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type AppState = 'landing' | 'auth' | 'dashboard' | 'pricing' | 'checkout' | 'demo' | 'smoothie-selection' | 'questionnaire' | 'recipe-offer';
type AuthMode = 'login' | 'signup';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<'weeklyPlan' | 'fortnightlyPlan'>('weeklyPlan');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [questionnaireProfile, setQuestionnaireProfile] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setCurrentState('dashboard');
      }
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentState('dashboard');
      } else {
        setUser(null);
        setCurrentState('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = (user: any) => {
    setUser(user);
    setCurrentState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setUserProfile(null);
    setCurrentState('landing');
  };

  const handleStartSmoothieSelection = (profile: any) => {
    setUserProfile(profile);
    setCurrentState('smoothie-selection');
  };

  const handleSmoothieSelectionComplete = (selectedSmoothies: any[], planType: '7-day' | '14-day') => {
    console.log('Selected smoothies:', selectedSmoothies);
    console.log('Plan type:', planType);
    // Map to our product types
    const productMap: { [key: string]: 'weeklyPlan' | 'fortnightlyPlan' } = {
      '7-day': 'weeklyPlan',
      '14-day': 'fortnightlyPlan'
    };
    setSelectedProduct(productMap[planType] || 'weeklyPlan');
    setCurrentState('checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p>Loading XOVA...</p>
        </div>
      </div>
    );
  }

  // Landing Page
  if (currentState === 'landing') {
    return (
      <NewLandingPage onNavigate={(page: string) => {
        if (page === 'pricing') {
          setCurrentState('pricing');
        } else if (page === 'signup') {
          setAuthMode('signup');
          setCurrentState('auth');
        } else if (page === 'login') {
          setAuthMode('login');
          setCurrentState('auth');
        } else if (page === 'demo') {
          setCurrentState('demo');
        } else if (page === 'questionnaire') {
          setCurrentState('questionnaire');
        } else if (page === 'smoothie-selection') {
          setCurrentState('smoothie-selection');
        } else {
          // Default fallback - if unknown page, stay on landing
          console.log('Unknown navigation page:', page);
        }
      }} />
    );
  }

  // Auth System
  if (currentState === 'auth') {
    return (
      <AuthSystem 
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess} 
        onNavigate={(page) => {
          if (page === 'landing') {
            setCurrentState('landing');
          }
        }}
      />
    );
  }

  // User Dashboard
  if (currentState === 'dashboard' && user) {
    return <MVPDashboard onLogout={handleLogout} onStartSmoothieSelection={handleStartSmoothieSelection} />;
  }

  // Pricing Display
  if (currentState === 'pricing') {
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
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setCurrentState('landing')}>
                Back to Home
              </Button>
              <Button onClick={() => setCurrentState('auth')}>
                Get Started
              </Button>
            </div>
          </div>
        </header>

        <PricingDisplay onSelectPlan={(plan) => {
          // Map plan names to product types
          const productMap: { [key: string]: 'weeklyPlan' | 'fortnightlyPlan' } = {
            'Weekly Plan': 'weeklyPlan',
            '14-Day Plan': 'fortnightlyPlan'
          };
          
          setSelectedProduct(productMap[plan] || 'weeklyPlan');
          setCurrentState('checkout');
        }} />
      </div>
    );
  }

  // Demo Page
  if (currentState === 'demo') {
    return (
      <DemoPage onNavigate={(page) => {
        if (page === 'landing') {
          setCurrentState('landing');
        } else if (page === 'auth') {
          setCurrentState('auth');
        } else if (page === 'pricing') {
          setCurrentState('pricing');
        }
      }} />
    );
  }

  // Smoothie Selection
  if (currentState === 'smoothie-selection') {
    // Create a test profile if none exists
    const testProfile = userProfile || {
      primaryGoal: 'energy',
      timeOfDay: 'morning',
      healthConditions: [],
      caffeinePreference: 'medium',
      dietaryRestrictions: [],
      stressLevel: 5,
      vegetableIntake: 'medium',
      medications: '',
      flavorPreference: 'fruity',
      budgetTier: 'essential'
    };
    
    return (
      <SmoothieSelection
        profile={testProfile}
        onSelectionComplete={handleSmoothieSelectionComplete}
        onBack={() => setCurrentState('dashboard')}
      />
    );
  }

  // Questionnaire
  if (currentState === 'questionnaire') {
    return (
      <NewQuestionnaire
        onComplete={(profile) => {
          setQuestionnaireProfile(profile);
          setCurrentState('recipe-offer');
        }}
        onBack={() => setCurrentState('landing')}
      />
    );
  }

  // Recipe and Offer
  if (currentState === 'recipe-offer' && questionnaireProfile) {
    return (
      <RecipeAndOffer
        profile={questionnaireProfile}
        onBack={() => setCurrentState('questionnaire')}
        onOrderSuperfoods={(order) => {
          console.log('Superfood order:', order);
          // For now, just show success - in real app, integrate with payment
          alert(`Order placed! ${order.plan} superfood mix for CHF ${order.plan === '7-day' ? '28' : '56'}`);
        }}
      />
    );
  }

  // Checkout Page
  if (currentState === 'checkout') {
    return (
      <CheckoutPage
        productType={selectedProduct}
        onBack={() => setCurrentState('smoothie-selection')}
        onPaymentSuccess={(paymentIntentId) => {
          console.log('Payment successful:', paymentIntentId);
          // In a real app, you'd redirect to dashboard or show success
          setCurrentState('dashboard');
        }}
      />
    );
  }

  return null;
}

export default App;// Manual rebuild trigger - Wed Oct 15 19:29:51 CEST 2025
// Fixed build output directory - Wed Oct 15 19:32:40 CEST 2025
// Fixed Supabase configuration - Wed Oct 15 21:38:24 CEST 2025
