import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Package, Clock, MapPin, Calendar, AlertCircle, 
  CheckCircle, Truck, Home, RefreshCw, ThermometerSnowflake,
  Timer, Phone, ArrowLeft
} from 'lucide-react';
import { Separator } from './ui/separator';

interface DeliveryTermsProps {
  onBack?: () => void;
}

export function DeliveryTerms({ onBack }: DeliveryTermsProps) {
  return (
    <div className="space-y-6">
      {onBack && (
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      )}
      {/* Main Delivery Info */}
      <Card className="p-6 bg-gradient-to-br from-xova-primary/5 to-white border-xova-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-xova-primary rounded-xl">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xova-primary">Delivery Conditions</h2>
        </div>
        <p className="text-muted-foreground">
          Our weekly delivery service ensures fresh, high-quality ingredients arrive safely to your door. 
          Please review our delivery conditions to ensure a smooth experience.
        </p>
      </Card>

      {/* Delivery Schedule */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-xova-accent rounded-xl">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h3>Delivery Schedule</h3>
        </div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-xova-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Order Cutoff: Every Sunday at 20:00</p>
              <p className="text-sm text-muted-foreground">
                Place your order before Sunday 8 PM to receive delivery the following week
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-xova-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Delivery Day: Every Monday</p>
              <p className="text-sm text-muted-foreground">
                All orders are delivered on Mondays between 06:00 - 10:00
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-xova-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Delivery Window: 06:00 - 10:00</p>
              <p className="text-sm text-muted-foreground">
                Early morning delivery ensures ingredients stay fresh throughout the week
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-xova-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Delivery Zone: Zurich City & Surroundings</p>
              <p className="text-sm text-muted-foreground">
                Currently delivering to Zurich postcodes: 8000-8099
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Reception Requirements */}
      <Card className="p-6 bg-gradient-to-br from-xova-warning/5 to-white border-xova-warning/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-xova-warning rounded-xl">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h3>Reception Requirements</h3>
            <Badge className="bg-xova-warning/20 text-xova-warning border-xova-warning/40">
              Important
            </Badge>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-xova-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Someone Must Be Home</p>
              <p className="text-sm text-muted-foreground">
                Due to fresh ingredients requiring immediate refrigeration, someone must be present to receive the delivery. 
                Perishable items cannot be left unattended.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <ThermometerSnowflake className="w-5 h-5 text-xova-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Immediate Refrigeration Required</p>
              <p className="text-sm text-muted-foreground">
                Fresh ingredients must be refrigerated within 30 minutes of delivery to maintain quality and food safety standards.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Timer className="w-5 h-5 text-xova-secondary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Delivery Attempt Window: 4 Hours</p>
              <p className="text-sm text-muted-foreground">
                If no one is available during first delivery attempt, we'll try again within the 4-hour window. 
                After that, the order will be returned and no refund will be issued.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-xova-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Contact Number Required</p>
              <p className="text-sm text-muted-foreground">
                Please provide a valid mobile number. Our delivery partner will call 5 minutes before arrival.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Packaging & Returns */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-xova-info rounded-xl">
            <RefreshCw className="w-5 h-5 text-white" />
          </div>
          <h3>Packaging & Returns</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Reusable Delivery Bag (CHF 15 deposit)</p>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-xova-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  First order includes a high-quality insulated delivery bag (CHF 15 deposit)
                </p>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-xova-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Keep the bag and return it empty on your next delivery
                </p>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-xova-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Return the bag clean and in good condition on each delivery day
                </p>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-xova-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Full deposit refunded if you cancel subscription and return the bag within 14 days
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="font-medium mb-2">Vacuum-Sealed Ingredient Bags</p>
            <div className="space-y-2 ml-4">
              <div className="flex gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-xova-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Fresh ingredients:</strong> Vacuum-sealed, must be refrigerated immediately (fruits, vegetables, protein)
                </p>
              </div>
              <div className="flex gap-2">
                <Package className="w-4 h-4 text-xova-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Dry ingredients:</strong> Vacuum-sealed, store in cool dry place (powders, seeds, nuts)
                </p>
              </div>
              <div className="flex gap-2">
                <RefreshCw className="w-4 h-4 text-xova-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Ingredient bags are biodegradable, dispose in compost or recycling
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="p-3 bg-xova-warning/10 rounded-lg border border-xova-warning/30">
            <p className="text-sm font-medium text-xova-warning mb-1">Bag Return Policy</p>
            <p className="text-sm text-muted-foreground">
              If the delivery bag is not returned for 3 consecutive deliveries, the CHF 15 deposit will be forfeited. 
              The bag must be clean, dry, and in usable condition.
            </p>
          </div>
        </div>
      </Card>

      {/* Cancellation & Changes */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-xova-secondary rounded-xl">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <h3>Changes & Cancellations</h3>
        </div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-xova-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Order Modifications</p>
              <p className="text-sm text-muted-foreground">
                Modify or cancel your weekly order until Sunday 20:00 at no charge
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-xova-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Late Cancellations</p>
              <p className="text-sm text-muted-foreground">
                Cancellations after Sunday 20:00 will be charged 50% of order value (ingredients already prepared)
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-xova-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Vacation Pause</p>
              <p className="text-sm text-muted-foreground">
                Pause your subscription up to 4 weeks per year at no charge (must notify by Sunday 20:00)
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quality Guarantee */}
      <Card className="p-6 bg-gradient-to-br from-xova-success/5 to-white border-xova-success/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-xova-success rounded-xl">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h3>Quality Guarantee</h3>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            We guarantee the freshness and quality of all ingredients. If you're not satisfied:
          </p>
          <div className="space-y-2 ml-4">
            <div className="flex gap-2">
              <CheckCircle className="w-4 h-4 text-xova-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Report quality issues within 24 hours of delivery
              </p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="w-4 h-4 text-xova-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                We'll provide a full refund or replacement for any defective items
              </p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="w-4 h-4 text-xova-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                No questions asked if ingredients arrive damaged or spoiled
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact Support */}
      <Card className="p-6 bg-gradient-to-br from-xova-primary/5 to-white border-xova-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-xova-primary rounded-xl">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <h3>Need Help?</h3>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong>Customer Support:</strong> support@xova.ch
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Delivery Hotline:</strong> +41 44 123 4567 (Mon 06:00-12:00)
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>WhatsApp:</strong> +41 79 123 4567 (24/7 automated support)
          </p>
        </div>
      </Card>
    </div>
  );
}
