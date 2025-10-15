import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, LogOut, User, Settings, Zap, Dna, Lightbulb, MapPin, ChefHat, Target, Heart, Activity, Clock, CheckCircle } from 'lucide-react';
import { getCurrentUser, logout, type User as UserType } from '../lib/mock-auth';
import { useState, useEffect } from 'react';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate current meal timing
  const hour = currentTime.getHours();
  const getCurrentMealType = () => {
    if (hour >= 6 && hour < 11) {
      return 'breakfast';
    }
    if (hour >= 11 && hour < 15) {
      return 'lunch';
    }
    if (hour >= 15 && hour < 19) {
      return 'afternoon';
    }
    return 'evening';
  };

  const currentMeal = getCurrentMealType();
  const mealNames = {
    breakfast: 'Morning Energy',
    lunch: 'Midday Fuel',
    afternoon: 'Afternoon Boost',
    evening: 'Evening Recovery'
  };

  // Get user's nutritional priorities
  const getNutritionalPriorities = () => {
    if (!user.profile) return [];
    
    const priorities = [];
    if (user.profile.healthGoals?.includes('energy')) {
      priorities.push('Energy & Focus');
    }
    if (user.profile.healthGoals?.includes('immunity')) {
      priorities.push('Immune Support');
    }
    if (user.profile.healthGoals?.includes('muscle-gain')) {
      priorities.push('Muscle Building');
    }
    if (user.profile.healthGoals?.includes('weight-loss')) {
      priorities.push('Weight Management');
    }
    if (user.profile.healthGoals?.includes('skin-health')) {
      priorities.push('Skin & Beauty');
    }
    if (user.profile.healthGoals?.includes('stress')) {
      priorities.push('Stress Relief');
    }
    
    return priorities.length > 0 ? priorities : ['General Wellness'];
  };

  const nutritionalPriorities = getNutritionalPriorities();

  // Mock recent smoothies (in real app, this would come from user data)
  const recentSmoothies = user.favoriteSmoothies?.slice(0, 3) || [
    { name: "Energizing Berry Boost", date: "Today", calories: 285 },
    { name: "Green Power Smoothie", date: "Yesterday", calories: 320 },
    { name: "Protein Recovery Blend", date: "2 days ago", calories: 410 }
  ];

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
            <Button variant="outline" onClick={() => onNavigate('settings')}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Incomplete Warning */}
        {!user.profile && (
          <Card className="mb-8 p-6 bg-gradient-to-br from-xova-warning/10 to-white border-xova-warning/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-xova-warning/20 rounded-lg">
                <Lightbulb className="w-6 h-6 text-xova-warning" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-xova-warning mb-2">Complete Your Profile</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your personalized health profile to unlock AI nutrient planning, café matching, and weekly delivery features.
                </p>
                <Button 
                  className="bg-gradient-to-r from-xova-warning to-xova-secondary hover:from-xova-warning/90 hover:to-xova-secondary/90"
                  onClick={() => onNavigate('onboarding')}
                >
                  Complete Profile Now
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-xl text-muted-foreground">Here's your personalized smoothie overview</p>
        </div>

        {/* Current Time & Meal Context */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-xova-primary/10 to-xova-accent/10 border-xova-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-primary to-xova-accent rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{mealNames[currentMeal as keyof typeof mealNames]}</h2>
                <p className="text-muted-foreground">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Perfect time for your next smoothie
                </p>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate('enhanced-generate')}
              className="bg-gradient-to-r from-xova-primary to-xova-accent hover:from-xova-primary/90 hover:to-xova-accent/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Now
            </Button>
          </div>
        </Card>

        {/* Your Nutritional Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Your Nutritional Priorities */}
          <Card className="p-6 bg-gradient-to-br from-white via-xova-primary/5 to-xova-accent/10 border-xova-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-primary to-xova-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-3">Your Nutritional Priorities</h2>
                <p className="text-muted-foreground mb-4 text-sm">
                  Based on your health goals and activity level
                </p>
                
                <div className="space-y-2">
                  {nutritionalPriorities.map((priority, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-xova-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Smoothies */}
          <Card className="p-6 bg-gradient-to-br from-white via-xova-accent/5 to-xova-success/10 border-xova-accent/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-accent to-xova-success rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-3">Recent Smoothies</h2>
                <p className="text-muted-foreground mb-4 text-sm">
                  Your latest personalized creations
                </p>
                
                <div className="space-y-2">
                  {recentSmoothies.map((smoothie, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium">{smoothie.name}</span>
                        <p className="text-xs text-muted-foreground">{smoothie.date}</p>
                      </div>
                      <span className="text-xs text-xova-accent">{smoothie.calories} cal</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Generate New Smoothie */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-xova-primary/20 hover:border-xova-primary/40 bg-gradient-to-br from-white to-xova-primary/5">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-primary to-xova-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate New Smoothie</h3>
              <p className="text-sm text-muted-foreground mb-4">Create a personalized smoothie for right now</p>
              <Button 
                onClick={() => onNavigate('enhanced-generate')}
                className="w-full bg-gradient-to-r from-xova-primary to-xova-accent hover:from-xova-primary/90 hover:to-xova-accent/90"
              >
                Generate
              </Button>
            </div>
          </Card>

          {/* Café Matching */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-xova-secondary/20 hover:border-xova-secondary/40 bg-gradient-to-br from-white to-xova-secondary/5">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-secondary to-xova-warning rounded-xl mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Find Nearby Cafés</h3>
              <p className="text-sm text-muted-foreground mb-4">Discover cafés with matching smoothies</p>
              <Button 
                onClick={() => onNavigate('cafe-matching')}
                className="w-full bg-gradient-to-r from-xova-secondary to-xova-warning hover:from-xova-secondary/90 hover:to-xova-warning/90"
              >
                Browse Cafés
              </Button>
            </div>
          </Card>

          {/* Weekly Delivery */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-xova-success/20 hover:border-xova-success/40 bg-gradient-to-br from-white to-xova-success/5">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-xova-success to-xova-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Weekly Delivery</h3>
              <p className="text-sm text-muted-foreground mb-4">Get pre-portioned smoothie kits</p>
              <Button 
                onClick={() => onNavigate('weekly-delivery')}
                className="w-full bg-gradient-to-r from-xova-success to-xova-accent hover:from-xova-success/90 hover:to-xova-accent/90"
              >
                Start Planning
              </Button>
            </div>
          </Card>
        </div>

        {/* Profile Summary */}
        {user?.profile && (
          <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl bg-gradient-to-r from-xova-primary to-xova-secondary bg-clip-text text-transparent">Your Health Profile</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('settings')}
                className="border-xova-primary/30 text-xova-primary hover:bg-xova-primary/5"
              >
                Edit Profile
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-xova-primary/10 to-xova-primary/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-xova-primary" />
                  </div>
                  <h3 className="font-semibold">Activity Level</h3>
                </div>
                <p className="text-sm text-muted-foreground capitalize">{user.profile.activityLevel}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-xova-accent/10 to-xova-accent/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-xova-accent" />
                  </div>
                  <h3 className="font-semibold">Health Goals</h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {user.profile.healthGoals?.slice(0, 3).map((goal, index) => (
                    <Badge key={index} className="text-xs bg-xova-accent/10 text-xova-accent border-xova-accent/20">
                      {goal.replace('-', ' ')}
                    </Badge>
                  ))}
                  {user.profile.healthGoals && user.profile.healthGoals.length > 3 && (
                    <Badge className="text-xs bg-gray-100 text-gray-600">
                      +{user.profile.healthGoals.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-xova-secondary/10 to-xova-secondary/20 flex items-center justify-center">
                    <Dna className="w-4 h-4 text-xova-secondary" />
                  </div>
                  <h3 className="font-semibold">Dietary Profile</h3>
                </div>
                <div className="space-y-1">
                  {user.profile.dietaryRestrictions?.length ? (
                    user.profile.dietaryRestrictions.map((restriction, index) => (
                      <Badge key={index} className="text-xs bg-xova-secondary/10 text-xova-secondary border-xova-secondary/20">
                        {restriction}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No restrictions</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}