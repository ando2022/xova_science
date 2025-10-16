import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { createClient } from '@supabase/supabase-js';
import { 
  ArrowRight, 
  User, 
  ShoppingCart, 
  CheckCircle, 
  Sparkles,
  LogOut,
  Package,
  Target
} from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface MVPDashboardProps {
  onStartSmoothieSelection: (profile: any) => void;
  onLogout: () => void;
}

export function MVPDashboard({ onStartSmoothieSelection, onLogout }: MVPDashboardProps) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('User not authenticated:', authError);
        return;
      }
      setUser(user);

      // Try to load profile, but don't fail if it doesn't exist
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile error:', profileError);
      } else if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleStartOrder = () => {
    // Create a basic profile for MVP
    const basicProfile = profile || {
      user_id: user?.id,
      health_goals: ['energy'],
      activity_level: 'moderate',
      dietary_restrictions: [],
      allergens: [],
      preferences: ['sweet']
    };
    onStartSmoothieSelection(basicProfile);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
              XOVA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to XOVA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized smoothie platform. Let's create your first order!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Profile Status</h3>
            <Badge className={profile ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
              {profile ? 'Complete' : 'Basic'}
            </Badge>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Orders</h3>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600">No orders yet</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ready to Order</h3>
            <p className="text-sm text-gray-600">Start your journey</p>
          </Card>
        </div>

        {/* Main Action */}
        <Card className="p-8 text-center bg-gradient-to-r from-purple-50 to-green-50 border-2 border-purple-200">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Create Your First Smoothie Order
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We'll generate personalized smoothie options based on your preferences. 
            Choose your favorite and complete your order!
          </p>
          <Button 
            onClick={handleStartOrder}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 px-8 py-3 text-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Start Your Order
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>

        {/* Simple Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">How It Works</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. We generate smoothie options for you</li>
              <li>2. You pick your favorite</li>
              <li>3. Complete secure payment</li>
              <li>4. Get your personalized recipe!</li>
            </ol>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">What You Get</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Personalized smoothie recipe</li>
              <li>• Nutritional breakdown</li>
              <li>• Preparation instructions</li>
              <li>• Goal-specific optimization</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
