import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapPin, Star, Clock, CheckCircle, AlertCircle, Sparkles, TrendingUp, ChevronRight, User } from 'lucide-react';
import { getCurrentUser, type User } from '../lib/mock-auth';
import { ZURICH_CAFES, getCafesByDistance, DEFAULT_USER_LOCATION, Cafe } from '../lib/cafe-database';
import { findBestCafeMatches, getCafeMatchResults, SmoothieMatch, CafeMatchResult } from '../lib/cafe-matcher';
import { toast } from 'sonner@2.0.3';

interface CafeMatchingProps {
  onNavigate: (page: string) => void;
}

export function CafeMatching({ onNavigate }: CafeMatchingProps) {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [topMatches, setTopMatches] = useState<SmoothieMatch[]>([]);
  const [cafeResults, setCafeResults] = useState<CafeMatchResult[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [activeTab, setActiveTab] = useState<'top-matches' | 'by-cafe' | 'nearby'>('top-matches');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState<'All' | 'Zurich' | 'Aarau'>('All');

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    
    if (!currentUser || !currentUser.profile) {
      setIsLoading(false);
      onNavigate('settings');
      return;
    }
    
    setIsLoading(false);

    // Try to get user's actual GPS location
    if (navigator.geolocation) {
      toast.info('Getting your location...', { duration: 2000 });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          toast.success('Location found! Showing nearby cafés', { duration: 2000 });
          
          // Get cafés sorted by actual user distance
          const sortedCafes = getCafesByDistance(latitude, longitude);
          setCafes(sortedCafes);

          // Get user's latest check-in
          const latestCheckin = currentUser.dailyCheckins && currentUser.dailyCheckins.length > 0
            ? currentUser.dailyCheckins[currentUser.dailyCheckins.length - 1]
            : undefined;

          // Calculate matches
          const matches = findBestCafeMatches(sortedCafes, currentUser.profile!, latestCheckin, 15);
          setTopMatches(matches);

          const results = getCafeMatchResults(sortedCafes, currentUser.profile!, latestCheckin);
          setCafeResults(results);
        },
        (error) => {
          // Geolocation failed or denied - use default Zurich location
          let errorMsg = 'Using default location (Zurich center)';
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = 'Location access denied. ' + errorMsg;
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = 'Location unavailable. ' + errorMsg;
          }
          
          setLocationError(errorMsg);
          toast.warning(errorMsg, { duration: 3000 });
          
          // Use default location
          setUserLocation(DEFAULT_USER_LOCATION);
          const sortedCafes = getCafesByDistance(
            DEFAULT_USER_LOCATION.lat,
            DEFAULT_USER_LOCATION.lng
          );
          setCafes(sortedCafes);

          const latestCheckin = currentUser.dailyCheckins && currentUser.dailyCheckins.length > 0
            ? currentUser.dailyCheckins[currentUser.dailyCheckins.length - 1]
            : undefined;

          const matches = findBestCafeMatches(sortedCafes, currentUser.profile!, latestCheckin, 15);
          setTopMatches(matches);

          const results = getCafeMatchResults(sortedCafes, currentUser.profile!, latestCheckin);
          setCafeResults(results);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      // Browser doesn't support geolocation - use default
      setLocationError('Geolocation not supported. Using default location (Zurich center)');
      toast.warning('Geolocation not supported. Using default location', { duration: 3000 });
      
      setUserLocation(DEFAULT_USER_LOCATION);
      const sortedCafes = getCafesByDistance(
        DEFAULT_USER_LOCATION.lat,
        DEFAULT_USER_LOCATION.lng
      );
      setCafes(sortedCafes);

      const latestCheckin = currentUser.dailyCheckins && currentUser.dailyCheckins.length > 0
        ? currentUser.dailyCheckins[currentUser.dailyCheckins.length - 1]
        : undefined;

      const matches = findBestCafeMatches(sortedCafes, currentUser.profile!, latestCheckin, 15);
      setTopMatches(matches);

      const results = getCafeMatchResults(sortedCafes, currentUser.profile!, latestCheckin);
      setCafeResults(results);
    }
    };
    
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const handlePreOrder = (match: SmoothieMatch) => {
    if (!match.cafe.hasPreOrder) {
      toast.error(`${match.cafe.name} doesn't support pre-orders yet`);
      return;
    }

    // Mock pre-order functionality
    toast.success(`Pre-order placed at ${match.cafe.name}!`, {
      description: `${match.smoothie.name} - CHF ${match.smoothie.price.toFixed(2)}`
    });
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-xova-success';
    if (score >= 60) return 'text-xova-accent';
    if (score >= 40) return 'text-xova-warning';
    return 'text-muted-foreground';
  };

  const getMatchBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-xova-success/10 text-xova-success border-xova-success/20">Excellent Match</Badge>;
    if (score >= 60) return <Badge className="bg-xova-accent/10 text-xova-accent border-xova-accent/20">Good Match</Badge>;
    if (score >= 40) return <Badge className="bg-xova-warning/10 text-xova-warning border-xova-warning/20">Fair Match</Badge>;
    return <Badge variant="outline">Low Match</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-xova-secondary/3 via-white to-xova-accent/3">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-xova-secondary to-xova-accent rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <p>Finding nearby cafés...</p>
        </div>
      </div>
    );
  }

  if (!user || !user.profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-xova-secondary/3 via-white to-xova-accent/3">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl bg-gradient-to-r from-xova-secondary via-xova-warning to-xova-accent bg-clip-text text-transparent">
                Café Menu Matching
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-muted-foreground">
                  Find smoothies at cafés in Zurich & Aarau that match your health profile
                </p>
                {userLocation && !locationError && (
                  <Badge variant="outline" className="bg-xova-success/10 text-xova-success border-xova-success/30">
                    <MapPin className="w-3 h-3 mr-1" />
                    Using your location
                  </Badge>
                )}
                {locationError && (
                  <Badge variant="outline" className="bg-xova-warning/10 text-xova-warning border-xova-warning/30">
                    <MapPin className="w-3 h-3 mr-1" />
                    Default location
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="outline" onClick={() => onNavigate('dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-xova-secondary/5 to-white border-xova-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cafés Found</p>
                <p className="text-2xl text-xova-secondary mt-1">{cafes.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-xova-secondary/30" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-xova-accent/5 to-white border-xova-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Options</p>
                <p className="text-2xl text-xova-accent mt-1">
                  {cafes.reduce((sum, cafe) => sum + cafe.smoothies.length, 0)}
                </p>
              </div>
              <Sparkles className="w-8 h-8 text-xova-accent/30" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-xova-success/5 to-white border-xova-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Match Score</p>
                <p className="text-2xl text-xova-success mt-1">
                  {topMatches.length > 0 ? topMatches[0].matchScore : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-xova-success/30" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-xova-warning/5 to-white border-xova-warning/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nearest Café</p>
                <p className="text-2xl text-xova-warning mt-1">
                  {cafes.length > 0 && cafes[0].distance ? `${cafes[0].distance.toFixed(1)}km` : 'N/A'}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-xova-warning/30" />
            </div>
          </Card>
        </div>

        {/* City Filter */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Filter by city:</span>
          <div className="flex gap-2">
            {(['All', 'Zurich', 'Aarau'] as const).map((city) => (
              <Button
                key={city}
                variant={cityFilter === city ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCityFilter(city)}
                className={cityFilter === city ? 'bg-xova-primary hover:bg-xova-primary-dark' : ''}
              >
                {city}
              </Button>
            ))}
          </div>
          <div className="flex-1" />
          <Badge variant="outline" className="bg-xova-info/10 text-xova-info border-xova-info/30">
            <MapPin className="w-3 h-3 mr-1" />
            {cafes.filter(c => cityFilter === 'All' || c.city === cityFilter).length} cafés found
          </Badge>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="top-matches">Top Matches</TabsTrigger>
            <TabsTrigger value="by-cafe">By Café</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>

          {/* Top Matches Tab */}
          <TabsContent value="top-matches" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl mb-2">Best Matches For You</h2>
              <p className="text-muted-foreground">
                Based on your health profile, dietary restrictions, and today's check-in
              </p>
            </div>

            {topMatches.filter(match => cityFilter === 'All' || match.cafe.city === cityFilter).map((match, index) => (
              <Card key={`${match.cafe.id}-${match.smoothie.id}`} className="p-6 hover:shadow-lg transition-all border-2">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left: Smoothie Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl mb-1">{match.smoothie.name}</h3>
                        <p className="text-sm text-muted-foreground">{match.cafe.name} • {match.cafe.district}, {match.cafe.city}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl">CHF {match.smoothie.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{match.smoothie.size}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{match.smoothie.description}</p>

                    {/* Match Score */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`text-3xl ${getMatchColor(match.matchScore)}`}>
                          {match.matchScore}%
                        </div>
                        <span className="text-muted-foreground">Match</span>
                      </div>
                      {getMatchBadge(match.matchScore)}
                    </div>

                    {/* Nutritional Info */}
                    {match.smoothie.nutritionalInfo && (
                      <div className="flex gap-4 text-sm mb-4 flex-wrap">
                        <div>
                          <span className="text-muted-foreground">Calories:</span>{' '}
                          <span>{match.smoothie.nutritionalInfo.calories}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Protein:</span>{' '}
                          <span>{match.smoothie.nutritionalInfo.protein}g</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fiber:</span>{' '}
                          <span>{match.smoothie.nutritionalInfo.fiber}g</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Sugar:</span>{' '}
                          <span>{match.smoothie.nutritionalInfo.sugar}g</span>
                        </div>
                      </div>
                    )}

                    {/* Ingredients */}
                    <div className="mb-4">
                      <p className="text-sm mb-2">Ingredients:</p>
                      <div className="flex flex-wrap gap-2">
                        {match.smoothie.ingredients.map((ing, i) => (
                          <Badge key={i} variant="outline" className="bg-xova-primary/5">
                            {ing}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Match Details */}
                  <div className="lg:w-80 space-y-4">
                    {/* Profile Alignment - Comprehensive Explanation */}
                    {match.profileAlignment && (
                      <div className="bg-gradient-to-br from-xova-primary/5 to-xova-accent/5 border border-xova-primary/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-4 h-4 text-xova-primary" />
                          <span className="text-xova-primary">Your Profile Match</span>
                        </div>
                        <div className="text-sm space-y-2 prose prose-sm max-w-none">
                          {match.profileAlignment.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="whitespace-pre-wrap">{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Why This Matches */}
                    {match.matchReasons.length > 0 && (
                      <div className="bg-xova-success/5 border border-xova-success/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-xova-success" />
                          <span className="text-xova-success">Key Highlights</span>
                        </div>
                        <ul className="space-y-1 text-sm">
                          {match.matchReasons.slice(0, 4).map((reason, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-xova-success mt-0.5">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Benefits for Today */}
                    {match.benefitsForToday.length > 0 && (
                      <div className="bg-xova-accent/5 border border-xova-accent/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-xova-accent" />
                          <span className="text-xova-accent">Benefits for Today</span>
                        </div>
                        <ul className="space-y-1 text-sm">
                          {match.benefitsForToday.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-xova-accent mt-0.5">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Concerns */}
                    {match.concerns.length > 0 && (
                      <div className="bg-xova-warning/5 border border-xova-warning/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-xova-warning" />
                          <span className="text-xova-warning">Please Note</span>
                        </div>
                        <ul className="space-y-1 text-sm">
                          {match.concerns.map((concern, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-xova-warning mt-0.5">•</span>
                              <span>{concern}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Café Info */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-xova-secondary" />
                        <span>{match.cafe.address}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-xova-warning" />
                        <span>{match.cafe.rating} rating</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{match.cafe.openingHours}</span>
                      </div>
                      {match.cafe.distance && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {match.cafe.distance.toFixed(1)}km away
                        </p>
                      )}
                      <Button 
                        className="w-full bg-gradient-to-r from-xova-secondary to-xova-warning hover:from-xova-secondary/90 hover:to-xova-warning/90"
                        onClick={() => handlePreOrder(match)}
                        disabled={!match.cafe.hasPreOrder}
                      >
                        {match.cafe.hasPreOrder ? 'Pre-Order Now' : 'Pre-Order Unavailable'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* By Café Tab */}
          <TabsContent value="by-cafe" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl mb-2">Browse by Café</h2>
              <p className="text-muted-foreground">
                Explore all cafés and their best matches for you
              </p>
            </div>

            {cafeResults.filter(result => cityFilter === 'All' || result.cafe.city === cityFilter).map((result) => (
              <Card key={result.cafe.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl mb-1">{result.cafe.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {result.cafe.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-xova-warning" />
                        {result.cafe.rating}
                      </span>
                      {result.cafe.distance && (
                        <span>{result.cafe.distance.toFixed(1)}km away</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{result.cafe.openingHours}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl text-xova-secondary mb-1">{result.averageMatchScore}%</div>
                    <p className="text-sm text-muted-foreground">Avg Match</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {result.topMatches.map((match) => (
                    <Card key={match.smoothie.id} className="p-4 border-2 hover:border-xova-secondary/30 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="flex-1">{match.smoothie.name}</h4>
                        <div className={`text-xl ${getMatchColor(match.matchScore)}`}>
                          {match.matchScore}%
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{match.smoothie.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg">CHF {match.smoothie.price.toFixed(2)}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePreOrder(match)}
                          disabled={!match.cafe.hasPreOrder}
                        >
                          {match.cafe.hasPreOrder ? 'Order' : 'N/A'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Nearby Tab */}
          <TabsContent value="nearby" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl mb-2">Nearest Cafés</h2>
              <p className="text-muted-foreground">
                Cafés sorted by distance from your location
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {cafes.filter(cafe => cityFilter === 'All' || cafe.city === cityFilter).map((cafe) => (
                <Card key={cafe.id} className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelectedCafe(cafe)}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl mb-1">{cafe.name}</h3>
                      <p className="text-sm text-muted-foreground">{cafe.district}, {cafe.city}</p>
                    </div>
                    <div className="text-right">
                      {cafe.distance && (
                        <div className="text-2xl text-xova-secondary">{cafe.distance.toFixed(1)}km</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{cafe.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-xova-warning" />
                      <span>{cafe.rating} rating • {cafe.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{cafe.openingHours}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {cafe.smoothies.length} smoothie options
                    </span>
                    <div className="flex items-center gap-2">
                      {cafe.hasPreOrder && (
                        <Badge className="bg-xova-success/10 text-xova-success border-xova-success/20">
                          Pre-Order
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
