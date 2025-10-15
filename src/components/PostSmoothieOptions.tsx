import { Card } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Package, Clock, Star, Zap, Heart, TrendingUp } from 'lucide-react';

interface PostSmoothieOptionsProps {
  onNavigate: (page: string) => void;
  smoothieName: string;
}

export function PostSmoothieOptions({ onNavigate, smoothieName }: PostSmoothieOptionsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-xova-success/20 to-xova-accent/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 text-xova-success" />
        </div>
        <h1 className="text-4xl mb-2">Perfect! Your "{smoothieName}" is Ready</h1>
        <p className="text-xl text-muted-foreground">
          Now choose how you'd like to get your personalized smoothie
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Café Matching Option */}
        <Card className="p-8 cursor-pointer hover:shadow-xl hover:shadow-xova-secondary/10 transition-all duration-300 border-2 hover:border-xova-secondary/40 bg-gradient-to-br from-white via-xova-secondary/5 to-xova-warning/10 group relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-xova-secondary/5 via-transparent to-xova-warning/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-xova-secondary via-xova-warning to-xova-accent rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-xova-secondary/30 group-hover:scale-110 transition-transform duration-300 mb-6">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl mb-4 group-hover:text-xova-secondary transition-colors">Find Café Matches</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Discover cafés in Zurich & Aarau that have smoothies similar to your personalized recipe. 
              Get location-based recommendations and pre-order options.
            </p>
            
            {/* Features */}
            <div className="space-y-3 mb-8 w-full">
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <MapPin className="w-5 h-5 text-xova-secondary" />
                <span className="text-sm">Location-based recommendations</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <Star className="w-5 h-5 text-xova-warning" />
                <span className="text-sm">Quality ratings and reviews</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <Clock className="w-5 h-5 text-xova-accent" />
                <span className="text-sm">Pre-order and pickup options</span>
              </div>
            </div>
            
            <Button 
              onClick={() => onNavigate('cafe-matching')}
              className="w-full bg-gradient-to-r from-xova-secondary to-xova-warning hover:from-xova-secondary/90 hover:to-xova-warning/90 shadow-lg shadow-xova-secondary/25 group-hover:shadow-xova-secondary/40 transition-all"
              size="lg"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Browse Café Options
            </Button>
          </div>
        </Card>

        {/* Weekly Delivery Option */}
        <Card className="p-8 cursor-pointer hover:shadow-xl hover:shadow-xova-success/10 transition-all duration-300 border-2 hover:border-xova-success/40 bg-gradient-to-br from-white via-xova-success/5 to-xova-accent/10 group relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-xova-success/5 via-transparent to-xova-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-xova-success via-xova-accent to-xova-primary rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-xova-success/30 group-hover:scale-110 transition-transform duration-300 mb-6">
              <Package className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl mb-4 group-hover:text-xova-success transition-colors">Weekly Delivery Plan</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Get pre-portioned smoothie ingredients delivered weekly. 
              Customized to your nutritional needs with 7 or 14 smoothies per week.
            </p>
            
            {/* Features */}
            <div className="space-y-3 mb-8 w-full">
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <Package className="w-5 h-5 text-xova-success" />
                <span className="text-sm">Pre-portioned daily bags</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <Heart className="w-5 h-5 text-xova-accent" />
                <span className="text-sm">Customized to your profile</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-xova-primary" />
                <span className="text-sm">Save vs. café prices (12 CHF/smoothie)</span>
              </div>
            </div>
            
            <Button 
              onClick={() => onNavigate('weekly-delivery')}
              className="w-full bg-gradient-to-r from-xova-success to-xova-accent hover:from-xova-success/90 hover:to-xova-accent/90 shadow-lg shadow-xova-success/25 group-hover:shadow-xova-success/40 transition-all"
              size="lg"
            >
              <Package className="w-5 h-5 mr-2" />
              Start Weekly Plan
            </Button>
          </div>
        </Card>
      </div>

      {/* Comparison Section */}
      <Card className="p-6 border-2 border-xova-info/30 bg-gradient-to-br from-white to-xova-info/5">
        <h3 className="text-xl mb-4 text-center">Which Option is Right for You?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <h4 className="font-semibold text-xova-secondary mb-2">Choose Café Matching If:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• You prefer immediate gratification</li>
              <li>• You enjoy the café experience</li>
              <li>• You want to try different options</li>
              <li>• You're in Zurich or Aarau</li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-xova-success mb-2">Choose Weekly Delivery If:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• You want consistent nutrition</li>
              <li>• You prefer convenience at home</li>
              <li>• You want to save money long-term</li>
              <li>• You like meal prep and planning</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Back Option */}
      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={() => onNavigate('enhanced-generate')}
          className="border-xova-primary/20 hover:border-xova-primary/40 hover:bg-xova-primary/5"
        >
          Generate Different Smoothie
        </Button>
      </div>
    </div>
  );
}
