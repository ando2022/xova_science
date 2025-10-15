import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { createClient } from '@supabase/supabase-js';
import { User, Settings, LogOut, Package, Calendar, TrendingUp, CreditCard, Bell, Plus, Target } from 'lucide-react';
import { HealthQuestionnaire } from './HealthQuestionnaire';
import { NutritionalProfileDisplay } from './NutritionalProfileDisplay';
import { mockNutritionalProfile } from '../lib/mock-profile';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
  onStartSmoothieSelection: (profile: any) => void;
}

export function UserDashboard({ user, onLogout, onStartSmoothieSelection }: UserDashboardProps) {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showProfileDisplay, setShowProfileDisplay] = useState(false);
  const [generatedProfile, setGeneratedProfile] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      console.log('Loading user data for user:', user.id);
      
      // Load user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error loading profile:', profileError);
        // If profile doesn't exist, create a default one
        if (profileError.code === 'PGRST116') {
          console.log('Profile does not exist yet, will be created during questionnaire');
          setUserProfile(null);
        } else {
          setUserProfile(null);
        }
      } else {
        console.log('Profile loaded:', profile);
        setUserProfile(profile);
      }

      // Load orders (mock data for now)
      setOrders([
        {
          id: 1,
          date: '2024-10-12',
          items: ['Energizing Berry Boost', 'Green Power Smoothie'],
          total: 24,
          status: 'delivered'
        },
        {
          id: 2,
          date: '2024-10-10',
          items: ['Protein Recovery Blend'],
          total: 12,
          status: 'delivered'
        }
      ]);

      // Load subscription (mock data for now)
      setSubscription({
        type: 'weekly',
        status: 'active',
        nextDelivery: '2024-10-15',
        price: 84
      });

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

  const handleProfileComplete = (profile: any) => {
    console.log('Profile completed:', profile);
    setGeneratedProfile(profile);
    setShowQuestionnaire(false);
    setShowProfileDisplay(true);
    // Reload user data to get updated profile
    loadUserData();
  };

  const handleProfileEdit = () => {
    setShowProfileDisplay(false);
    setShowQuestionnaire(true);
  };

  const handleContinueToSmoothies = () => {
    setShowProfileDisplay(false);
    // Navigate to smoothie selection
    onStartSmoothieSelection(generatedProfile || mockNutritionalProfile);
  };

  // Check if user has completed questionnaire
  const hasCompletedProfile = userProfile && userProfile.health_goals && userProfile.health_goals.length > 0;
  
  // Debug logging
  console.log('UserDashboard render:', {
    userProfile,
    hasCompletedProfile,
    showQuestionnaire,
    showProfileDisplay,
    generatedProfile: !!generatedProfile
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show questionnaire if user hasn't completed profile
  if (showQuestionnaire) {
    return (
      <HealthQuestionnaire 
        onComplete={handleProfileComplete}
        onSkip={() => setShowQuestionnaire(false)}
      />
    );
  }

  // Show profile display after questionnaire completion
  if (showProfileDisplay && generatedProfile) {
    console.log('Showing profile display with profile:', generatedProfile);
    return (
      <NutritionalProfileDisplay 
        profile={generatedProfile}
        onContinue={handleContinueToSmoothies}
        onEdit={handleProfileEdit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white" data-testid="user-dashboard">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-xova-primary/20">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl bg-gradient-to-r from-xova-primary via-xova-accent to-xova-secondary bg-clip-text text-transparent font-bold">
              XOVA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {userProfile?.name || user.email}! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Here's your XOVA dashboard overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="w-8 h-8 text-xova-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">CHF {orders.reduce((sum, order) => sum + order.total, 0)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-xova-accent" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Smoothies This Week</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <TrendingUp className="w-8 h-8 text-xova-success" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Delivery</p>
                <p className="text-2xl font-bold">Mon 15</p>
              </div>
              <Calendar className="w-8 h-8 text-xova-warning" />
            </div>
          </Card>
        </div>

        {/* Health Profile Section */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-xova-primary" />
              <h2 className="text-xl font-bold">Your Health Profile</h2>
            </div>
            {hasCompletedProfile ? (
              <Badge className="bg-green-100 text-green-800">Complete</Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-800">Incomplete</Badge>
            )}
          </div>
          
          {hasCompletedProfile ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Activity Level</p>
                  <p className="font-semibold">{userProfile.activity_level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Health Goals</p>
                  <p className="font-semibold">{userProfile.health_goals?.length || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dietary Restrictions</p>
                  <p className="font-semibold">{userProfile.dietary_restrictions?.length || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Allergens</p>
                  <p className="font-semibold">{userProfile.allergens?.length || 0}</p>
                </div>
              </div>
              <Button 
                onClick={() => setShowQuestionnaire(true)}
                variant="outline"
                className="w-full"
              >
                Update Profile
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Complete your health profile to get personalized smoothie recommendations
              </p>
              <Button 
                onClick={() => {
                  console.log('Complete Profile button clicked');
                  setShowQuestionnaire(true);
                }}
                className="bg-gradient-to-r from-xova-primary to-xova-secondary"
                data-testid="complete-profile-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Complete Health Profile
              </Button>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Status */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Subscription Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Plan</span>
                <Badge className="bg-xova-primary/10 text-xova-primary">
                  {subscription?.type} Plan
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Status</span>
                <Badge className="bg-green-100 text-green-800">
                  {subscription?.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Next Delivery</span>
                <span>{subscription?.nextDelivery}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Price</span>
                <span className="font-bold">CHF {subscription?.price}/week</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-xova-primary to-xova-accent">
                Manage Subscription
              </Button>
            </div>
          </Card>

          {/* Recent Orders */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border-b border-border/50 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Order #{order.id}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {order.date}
                  </div>
                  <div className="text-sm mb-2">
                    {order.items.join(', ')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">CHF {order.total}</span>
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-16 bg-gradient-to-r from-xova-primary to-xova-accent"
              onClick={() => {
                if (hasCompletedProfile) {
                  onStartSmoothieSelection(generatedProfile || userProfile);
                } else {
                  // Use mock profile for demo purposes
                  onStartSmoothieSelection(mockNutritionalProfile);
                }
              }}
            >
              <Package className="w-5 h-5 mr-2" />
              Order New Smoothie
            </Button>
            <Button variant="outline" className="h-16">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Delivery
            </Button>
            <Button variant="outline" className="h-16">
              <TrendingUp className="w-5 h-5 mr-2" />
              View Progress
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
