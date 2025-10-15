import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Calendar, Package, Heart, Zap, Sun, Sunset, Moon,
  ChevronRight, Check, Sparkles, ShoppingCart, TrendingDown, FileText, X, RefreshCw
} from 'lucide-react';
import { getCurrentUser, updateUser, type User } from '../lib/mock-auth';
import {
  TimeOptimizedSmoothie,
  WeeklySmoothiePlan,
  DayOfWeek,
  TimeOfDay,
  generateWeeklyRecommendations,
  calculatePackaging,
  createEmptyWeeklyPlan
} from '../lib/delivery-optimizer';
import {
  calculateDeliveryTotal,
  formatCHF,
  calculateWeeklySavings,
  DELIVERY_PRICING
} from '../lib/pricing';
import { toast } from 'sonner@2.0.3';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { DeliveryTerms } from './DeliveryTerms';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './ui/hover-card';

interface WeeklyDeliveryProps {
  onNavigate: (page: string) => void;
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIMES: TimeOfDay[] = ['morning', 'afternoon', 'evening'];

const TIME_ICONS = {
  morning: Sun,
  afternoon: Sunset,
  evening: Moon
};

const TIME_COLORS = {
  morning: 'text-xova-warning',
  afternoon: 'text-xova-secondary',
  evening: 'text-xova-info'
};

// First delivery date - Monday, November 3rd, 2025
const FIRST_DELIVERY_DATE = new Date('2025-11-03T00:00:00');

// Helper function to get next delivery date
const getNextDeliveryDate = () => {
  const now = new Date();
  
  // If we haven't reached the first delivery yet, return first delivery date
  if (now < FIRST_DELIVERY_DATE) {
    return FIRST_DELIVERY_DATE;
  }
  
  // Otherwise calculate next Monday
  const daysUntilMonday = (8 - now.getDay()) % 7;
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + (daysUntilMonday === 0 ? 7 : daysUntilMonday));
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday;
};

// Helper function to get order cutoff date (Thursday 20:00 before next delivery)
const getOrderCutoff = () => {
  const nextDelivery = getNextDeliveryDate();
  const cutoff = new Date(nextDelivery);
  cutoff.setDate(cutoff.getDate() - 4); // Thursday before Monday delivery
  cutoff.setHours(20, 0, 0, 0);
  return cutoff;
};

// Helper function to check if we're past cutoff
const isPastCutoff = () => {
  const now = new Date();
  const cutoff = getOrderCutoff();
  return now > cutoff;
};

export function WeeklyDelivery({ onNavigate }: WeeklyDeliveryProps) {
  const [step, setStep] = useState<'browse' | 'review' | 'terms'>('browse');
  const [recommendations, setRecommendations] = useState<TimeOptimizedSmoothie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<TimeOfDay | 'all'>('all');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<TimeOptimizedSmoothie[]>([]); // Shopping cart for browse mode

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      
      if (!currentUser || !currentUser.profile) {
        onNavigate('settings');
        return;
      }

      // Load favorites
      if (currentUser.favoriteSmoothies) {
        setFavorites(currentUser.favoriteSmoothies);
      }

      // Get latest check-in
      const latestCheckin = currentUser.dailyCheckins && currentUser.dailyCheckins.length > 0
        ? currentUser.dailyCheckins[currentUser.dailyCheckins.length - 1]
        : undefined;

      // Generate recommendations (currentUser.profile is guaranteed to exist at this point)
      const recs = generateWeeklyRecommendations(currentUser.profile!, currentUser.favoriteSmoothies || [], latestCheckin);
      setRecommendations(recs);
    };
    
    loadData();
  }, [onNavigate]);

  const toggleFavorite = (smoothieId: string) => {
    if (!user) return;

    const newFavorites = favorites.includes(smoothieId)
      ? favorites.filter(id => id !== smoothieId)
      : [...favorites, smoothieId];

    setFavorites(newFavorites);
    updateUser(user.id, { favoriteSmoothies: newFavorites });
    
    toast.success(
      favorites.includes(smoothieId) ? 'Removed from favorites' : 'Added to favorites!',
      { duration: 2000 }
    );
  };

  const addToCart = (smoothie: TimeOptimizedSmoothie) => {
    setCartItems(prev => [...prev, smoothie]);
    toast.success(`Added ${smoothie.name} to your selections`, { duration: 2000 });
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    toast.info('Removed from selections', { duration: 1500 });
  };

  const proceedToReview = () => {
    if (cartItems.length === 0) {
      toast.error('Please add at least one smoothie to continue');
      return;
    }
    setStep('review');
  };

  const placeOrder = () => {
    if (!user) return;

    // Check if past cutoff
    if (isPastCutoff()) {
      const nextCutoff = getOrderCutoff();
      const nextDelivery = getNextDeliveryDate();
      toast.error('Order cutoff has passed', {
        description: `Next order deadline: ${nextCutoff.toLocaleDateString()} at 20:00. Delivery: ${nextDelivery.toLocaleDateString()}`,
        duration: 5000
      });
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Please add at least one smoothie to your order');
      return;
    }

    // Calculate packaging
    const packaging = calculatePackaging(cartItems);

    // Use next delivery date
    const nextDelivery = getNextDeliveryDate();

    // Create order
    const order = {
      id: `order-${Date.now()}`,
      orderDate: new Date().toISOString(),
      deliveryDate: nextDelivery.toISOString(),
      smoothies: cartItems.map((smoothie, index) => ({
        smoothieId: smoothie.id,
        smoothieName: smoothie.name,
        dayOfWeek: 'Flexible' as const,
        timeOfDay: smoothie.timeOfDay
      })),
      status: 'pending' as const,
      packagingBreakdown: {
        freshIngredients: packaging.freshIngredients.map(i => i.name),
        dryIngredients: packaging.dryIngredients.map(i => i.name)
      }
    };

    // Save order
    const deliveryHistory = user.deliveryHistory || [];
    updateUser(user.id, { deliveryHistory: [...deliveryHistory, order] });

    toast.success('Weekly delivery order placed!', {
      description: `${cartItems.length} smoothies scheduled for delivery on ${nextDelivery.toLocaleDateString()}`,
      duration: 4000
    });

    // Reset and go back
    setTimeout(() => {
      onNavigate('dashboard');
    }, 2000);
  };

  const filteredRecommendations = selectedTimeFilter === 'all'
    ? recommendations
    : recommendations.filter(r => r.timeOfDay === selectedTimeFilter);

  // Calculate dynamic pricing
  const plannedCount = cartItems.length;
  const isFirstOrder = !user?.deliveryHistory || user.deliveryHistory.length === 0;
  const pricingDetails = calculateDeliveryTotal(plannedCount, isFirstOrder);
  const weeklySavings = calculateWeeklySavings(plannedCount);

  if (!user || !user.profile) {
    return null;
  }

  // Check delivery cutoff and dates
  const pastCutoff = isPastCutoff();
  const nextCutoff = getOrderCutoff();
  const nextDelivery = getNextDeliveryDate();
  const now = new Date();
  const isPreOrder = now < FIRST_DELIVERY_DATE;

  return (
    <div className="min-h-screen bg-gradient-to-b from-xova-accent/5 via-white to-xova-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl bg-gradient-to-r from-xova-accent via-xova-secondary to-xova-primary bg-clip-text text-transparent">
                Weekly Delivery Service
              </h1>
              <p className="text-muted-foreground mt-1">
                Build your personalized weekly smoothie plan • 12 CHF/smoothie • Free delivery from 10+
              </p>
              {!pastCutoff && isPreOrder && (
                <p className="text-sm text-xova-success mt-1">
                  🎉 Pre-order now! Order by Thursday {nextCutoff.toLocaleDateString()} at 20:00 for first delivery on Monday, Nov 3rd
                </p>
              )}
              {!pastCutoff && !isPreOrder && (
                <p className="text-sm text-xova-success mt-1">
                  Order by Thursday {nextCutoff.toLocaleDateString()} at 20:00 for delivery on {nextDelivery.toLocaleDateString()}
                </p>
              )}
              {pastCutoff && (
                <p className="text-sm text-xova-warning mt-1">
                  Cutoff passed. Next deadline: Thursday {nextCutoff.toLocaleDateString()} at 20:00
                </p>
              )}
            </div>
            <Button variant="outline" onClick={() => onNavigate('dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Step Progress */}
      <div className="border-b border-border/30 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setStep('browse')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                step === 'browse'
                  ? 'bg-xova-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>1. Browse & Select</span>
              {cartItems.length > 0 && (
                <Badge className="bg-white text-xova-primary ml-1">
                  {cartItems.length}
                </Badge>
              )}
            </button>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <button
              onClick={() => cartItems.length > 0 && proceedToReview()}
              disabled={cartItems.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                step === 'review'
                  ? 'bg-xova-primary text-white'
                  : cartItems.length > 0
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>2. Review & Order</span>
              {cartItems.length > 0 && (
                <Badge className="bg-white text-xova-primary ml-1">
                  {cartItems.length}
                </Badge>
              )}
            </button>
            <div className="w-full md:w-auto md:ml-auto">
              <Button
                variant={step === 'terms' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStep('terms')}
                className="w-full md:w-auto"
              >
                <FileText className="w-4 h-4 mr-2" />
                Delivery Terms & Conditions
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pre-order Notice */}
        {!pastCutoff && isPreOrder && (
          <Card className="p-6 mb-6 bg-gradient-to-br from-xova-accent/10 to-white border-xova-accent/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-xova-accent/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-xova-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-xova-accent mb-2">🎉 Pre-Order Now for Our Launch!</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Be among the first to experience XOVA! Pre-order your smoothies now for our <strong>first delivery on Monday, November 3rd, 2025</strong>.
                </p>
                <p className="text-sm text-muted-foreground">
                  ⏰ Order deadline: <strong>Thursday, {nextCutoff.toLocaleDateString()} at 20:00</strong>
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Cutoff Warning */}
        {pastCutoff && (
          <Card className="p-6 mb-6 bg-gradient-to-br from-xova-warning/10 to-white border-xova-warning/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-xova-warning/20 rounded-lg">
                <Calendar className="w-6 h-6 text-xova-warning" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-xova-warning mb-2">Order Cutoff Has Passed</h3>
                <p className="text-sm text-muted-foreground">
                  The order deadline for this week's delivery has passed. You can still browse and prepare your selection for next week!
                  Next order deadline: <strong>Thursday {nextCutoff.toLocaleDateString()} at 20:00</strong> for delivery on <strong>{nextDelivery.toLocaleDateString()}</strong>.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Step 1: Browse & Select */}
        {step === 'browse' && (
          <div className="space-y-6">
            {/* Info Card with Cart */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="md:col-span-2 p-6 bg-gradient-to-br from-xova-primary/5 to-white border-xova-primary/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-xova-primary/10 rounded-lg">
                    <Sparkles className="w-6 h-6 text-xova-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-xova-primary mb-2">Your Personalized Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      We've curated 21 smoothies optimized for your health profile, considering time of day and your recent check-ins.
                      Browse and add smoothies to your selections, then review your order!
                    </p>
                  </div>
                </div>
              </Card>

              {/* Shopping Cart Card */}
              <Card className="p-6 bg-gradient-to-br from-xova-accent/5 to-white border-xova-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart className="w-5 h-5 text-xova-accent" />
                  <h3 className="text-sm font-medium text-xova-accent">Your Selections</h3>
                  <Badge variant="outline" className="ml-auto">{cartItems.length}</Badge>
                </div>
                {cartItems.length > 0 ? (
                  <ScrollArea className="h-[120px]">
                    <div className="space-y-2">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded border">
                          <span className="flex-1 truncate">{item.name}</span>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="ml-2 text-xova-secondary hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-xs text-muted-foreground">No smoothies selected yet</p>
                )}
                <Button
                  className="w-full mt-3"
                  size="sm"
                  disabled={cartItems.length === 0 || pastCutoff}
                  onClick={proceedToReview}
                >
                  {pastCutoff ? 'Cutoff Passed' : isPreOrder ? 'Pre-Order Now' : 'Review Order'}
                  {!pastCutoff && <ChevronRight className="w-4 h-4 ml-1" />}
                </Button>
                {pastCutoff && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Next deadline: Thu {nextCutoff.toLocaleDateString()} 20:00
                  </p>
                )}
                {!pastCutoff && isPreOrder && (
                  <p className="text-xs text-center text-xova-accent mt-2">
                    First delivery: Monday, Nov 3rd
                  </p>
                )}
              </Card>
            </div>

            {/* Volume Pricing Info */}
            <Card className="p-4 bg-gradient-to-br from-xova-success/5 to-white border-xova-success/20">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5 text-xova-success" />
                <h3 className="text-sm font-medium text-xova-success">Volume Discounts</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DELIVERY_PRICING.map((tier, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-xs text-muted-foreground">{tier.label}</p>
                    <p className="font-medium">{formatCHF(tier.pricePerSmoothie)}</p>
                    {tier.savingsPercent > 0 && (
                      <Badge variant="outline" className="text-xs bg-xova-success/10 text-xova-success border-xova-success/30 mt-1">
                        -{tier.savingsPercent}%
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Time Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Filter by time:</span>
              <div className="flex gap-2">
                <Button
                  variant={selectedTimeFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeFilter('all')}
                >
                  All Times ({recommendations.length})
                </Button>
                {TIMES.map(time => {
                  const Icon = TIME_ICONS[time];
                  const count = recommendations.filter(r => r.timeOfDay === time).length;
                  return (
                    <Button
                      key={time}
                      variant={selectedTimeFilter === time ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTimeFilter(time)}
                      className="capitalize"
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {time} ({count})
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Smoothie Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((smoothie) => {
                const isFavorite = favorites.includes(smoothie.id);
                const TimeIcon = TIME_ICONS[smoothie.timeOfDay];
                const isInCart = cartItems.some(item => item.id === smoothie.id);
                
                // Determine header background class
                const headerBgClass = smoothie.timeOfDay === 'morning' 
                  ? 'bg-gradient-to-br from-xova-warning/10 to-white'
                  : smoothie.timeOfDay === 'afternoon'
                  ? 'bg-gradient-to-br from-xova-secondary/10 to-white'
                  : 'bg-gradient-to-br from-xova-info/10 to-white';
                
                return (
                  <HoverCard key={`${smoothie.id}-${smoothie.timeOfDay}`}>
                    <HoverCardTrigger asChild>
                      <Card
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        {/* Header */}
                        <div className={`p-4 ${headerBgClass}`}>
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline" className="capitalize">
                              <TimeIcon className="w-3 h-3 mr-1" />
                              {smoothie.timeOfDay}
                            </Badge>
                            <button
                              onClick={() => toggleFavorite(smoothie.id)}
                              className="p-1 hover:scale-110 transition-transform"
                            >
                              <Heart
                                className={`w-5 h-5 ${
                                  isFavorite ? 'fill-xova-secondary text-xova-secondary' : 'text-gray-400'
                                }`}
                              />
                            </button>
                          </div>
                          <h3 className="text-lg">{smoothie.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{smoothie.description}</p>
                        </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      {/* Scores */}
                      <div className="flex gap-2">
                        <Badge className="bg-xova-primary/10 text-xova-primary border-xova-primary/30">
                          {smoothie.matchScore}% Match
                        </Badge>
                        <Badge className="bg-xova-accent/10 text-xova-accent border-xova-accent/30">
                          {smoothie.timeRelevanceScore}% Time-Fit
                        </Badge>
                      </div>

                      {/* Time Reasons */}
                      {smoothie.timeReasons.length > 0 && (
                        <div className="space-y-1">
                          {smoothie.timeReasons.slice(0, 2).map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <Check className="w-3 h-3 text-xova-success mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Ingredients Preview */}
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground mb-1">Ingredients:</p>
                        <p className="text-xs">
                          {smoothie.ingredients.slice(0, 3).map(ing => ing.name).join(', ')}
                          {smoothie.ingredients.length > 3 && ` +${smoothie.ingredients.length - 3} more`}
                        </p>
                      </div>

                      {/* Macros */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Calories</p>
                          <p className="text-sm">{smoothie.macros.calories}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Protein</p>
                          <p className="text-sm">{smoothie.macros.protein}g</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Fiber</p>
                          <p className="text-sm">{smoothie.macros.fiber}g</p>
                        </div>
                      </div>

                        {/* Action Button */}
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => addToCart(smoothie)}
                          disabled={isInCart}
                        >
                          {isInCart ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Added to Selections
                            </>
                          ) : (
                            <>
                              Add to Selections
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80" side="top">
                    <div className="space-y-3">
                      <div>
                        <h4 className="mb-1 text-xova-primary">Ingredients</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {smoothie.ingredients.map((ing, idx) => (
                            <div key={idx} className="flex items-start gap-1 text-xs">
                              <Check className="w-3 h-3 text-xova-success mt-0.5 flex-shrink-0" />
                              <span>
                                <span className="font-medium">{ing.name}</span>
                                <span className="text-muted-foreground"> • {ing.quantity}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {smoothie.scientificExplanation && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            {smoothie.scientificExplanation.overview}
                          </p>
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Review & Order */}
        {step === 'review' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Summary with Dynamic Pricing */}
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-xova-primary" />
                  Order Summary
                </h3>
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {cartItems.map((smoothie, index) => {
                        const TimeIcon = TIME_ICONS[smoothie.timeOfDay];
                        return (
                          <div key={index} className="flex items-start gap-3 pb-3 border-b">
                            <TimeIcon className={`w-5 h-5 mt-1 ${TIME_COLORS[smoothie.timeOfDay]}`} />
                            <div className="flex-1">
                              <p className="text-sm">{smoothie.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Best for {smoothie.timeOfDay}
                              </p>
                            </div>
                            <p className="text-sm">{formatCHF(pricingDetails.pricePerSmoothie)}</p>
                          </div>
                        );
                      })}
                  </div>
                </ScrollArea>
                <Separator className="my-4" />
                
                {/* Pricing Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {plannedCount} smoothies × {formatCHF(pricingDetails.pricePerSmoothie)}
                    </span>
                    <span>{formatCHF(pricingDetails.subtotal)}</span>
                  </div>
                  
                  {pricingDetails.tier && pricingDetails.tier.savingsPercent > 0 && (
                    <div className="flex justify-between text-sm text-xova-success">
                      <span>Volume discount ({pricingDetails.tier.savingsPercent}%)</span>
                      <span>Included</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery fee</span>
                    <span className={pricingDetails.freeDelivery ? 'text-xova-success line-through' : ''}>
                      {pricingDetails.freeDelivery ? (
                        <span>
                          <span className="line-through mr-2">CHF 12.00</span>
                          <span className="text-xova-success">FREE</span>
                        </span>
                      ) : (
                        formatCHF(pricingDetails.deliveryFee)
                      )}
                    </span>
                  </div>
                  
                  {pricingDetails.bagDeposit > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery bag deposit (refundable)
                      </span>
                      <span>{formatCHF(pricingDetails.bagDeposit)}</span>
                    </div>
                  )}
                  
                  {weeklySavings > 0 && (
                    <div className="flex justify-between text-sm bg-xova-success/10 -mx-2 px-2 py-1 rounded">
                      <span className="text-xova-success font-medium">You save vs. cafés</span>
                      <span className="text-xova-success font-medium">{formatCHF(weeklySavings)}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Total</span>
                    {pricingDetails.freeDelivery && (
                      <p className="text-xs text-xova-success">Free delivery applied!</p>
                    )}
                  </div>
                  <span className="text-xl font-medium text-xova-primary">{formatCHF(pricingDetails.total)}</span>
                </div>
                
                {/* Premium Membership Note */}
                <div className="mt-4 p-3 bg-xova-primary/5 rounded-lg border border-xova-primary/20">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-xova-primary">Note:</strong> Weekly delivery includes all premium features
                    (exact proportions, café matching, AI recipe generation)
                  </p>
                </div>
              </Card>

              {/* Packaging Info */}
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-xova-accent" />
                  Individual Smoothie Packages
                </h3>
                
                {(() => {
                  if (cartItems.length === 0) return null;
                  
                  const packaging = calculatePackaging(cartItems);
                  
                  return (
                    <div className="space-y-4">
                      <div className="p-3 bg-xova-primary/5 rounded-lg border border-xova-primary/20">
                        <p className="text-xs text-muted-foreground">
                          <strong className="text-xova-primary">{packaging.totalPackages} individual packages</strong> — Each smoothie's ingredients are separately packaged for maximum freshness and convenience.
                        </p>
                      </div>

                      {/* Individual Packages List */}
                      <ScrollArea className="h-[360px]">
                        <div className="space-y-3 pr-3">
                          {packaging.packages.map((pkg, idx) => (
                            <Card key={idx} className="p-3 bg-gradient-to-br from-xova-accent/5 to-white border-xova-accent/20">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-sm text-xova-primary">Package #{idx + 1}: {pkg.smoothieName}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {pkg.ingredients.length} items
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                {pkg.ingredients.map((ing, ingIdx) => (
                                  <div key={ingIdx} className="flex items-center justify-between text-xs p-1.5 bg-white rounded">
                                    <span className="flex items-center gap-1.5">
                                      {ing.category === 'fresh' ? (
                                        <Zap className="w-3 h-3 text-xova-accent" />
                                      ) : (
                                        <Package className="w-3 h-3 text-xova-secondary" />
                                      )}
                                      <span>{ing.name}</span>
                                    </span>
                                    <span className="text-muted-foreground">{ing.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>

                      <Separator />

                      {/* Environmental Note */}
                      <div className="p-3 bg-xova-success/5 rounded-lg border border-xova-success/20">
                        <p className="text-xs text-muted-foreground">
                          ♻️ <strong className="text-xova-success">Eco-friendly packaging:</strong> Each smoothie is vacuum-sealed in biodegradable packaging. 
                          All materials are recyclable or compostable. Return your insulated delivery bag for CHF 5 deposit refund.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-between">
              <Button
                variant="outline"
                onClick={() => setStep('browse')}
              >
                Back to Browse
              </Button>
              <div className="flex flex-col items-end gap-2">
                <Button
                  size="lg"
                  onClick={placeOrder}
                  className="bg-xova-primary hover:bg-xova-primary-dark"
                  disabled={pastCutoff}
                >
                  {pastCutoff ? 'Cutoff Passed' : `${isPreOrder ? 'Pre-Order' : 'Place Order'} • ${formatCHF(pricingDetails.total)}`}
                  {!pastCutoff && <Check className="w-5 h-5 ml-2" />}
                </Button>
                {isPreOrder && !pastCutoff && (
                  <p className="text-xs text-xova-accent">
                    🎉 First delivery: Nov 3rd, 2025
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Terms & Conditions */}
        {step === 'terms' && (
          <DeliveryTerms onBack={() => setStep('browse')} />
        )}
      </div>
    </div>
  );
}
