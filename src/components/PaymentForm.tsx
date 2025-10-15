import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Lock, Check, Loader2 } from 'lucide-react';
import { formatPrice, chfToCents, PRODUCTS, STRIPE_CONFIG } from '../lib/stripe';

interface PaymentFormProps {
  productType: 'singleSmoothie' | 'weeklyPlan' | 'fortnightlyPlan';
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
}

export function PaymentForm({ productType, onPaymentSuccess, onPaymentError }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    email: '',
    name: '',
  });

  const product = PRODUCTS[productType];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real implementation, you would:
      // 1. Create a payment intent on your backend
      // 2. Use Stripe Elements for secure card collection
      // 3. Confirm the payment with Stripe
      
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPaymentIntentId = `pi_mock_${Date.now()}`;
      onPaymentSuccess(mockPaymentIntentId);
      
    } catch (error: any) {
      onPaymentError(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Complete Your Purchase</h2>
        <p className="text-muted-foreground">Secure payment powered by Stripe</p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{product.name}</span>
            <span className="font-medium">{formatPrice(product.price)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(product.price)}</span>
          </div>
        </div>
        
        {product.recurring && (
          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Subscription:</strong> This is a recurring payment. 
              You can cancel anytime from your dashboard.
            </p>
          </div>
        )}
      </div>

      {/* Payment Form */}
      <form onSubmit={handlePayment} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={cardDetails.email}
            onChange={(e) => setCardDetails({ ...cardDetails, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Cardholder Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={cardDetails.name}
            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
            required
          />
        </div>

        {/* Mock Card Input */}
        <div className="space-y-2">
          <Label htmlFor="card">Card Number</Label>
          <div className="relative">
            <Input
              id="card"
              type="text"
              placeholder="4242 4242 4242 4242"
              className="pr-10"
            />
            <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              type="text"
              placeholder="MM/YY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              type="text"
              placeholder="123"
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary/90 hover:to-xova-secondary/90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay {formatPrice(product.price)}
            </>
          )}
        </Button>
      </form>

      {/* Payment Methods */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">We accept</p>
        <div className="flex justify-center gap-4">
          <Badge variant="outline">Visa</Badge>
          <Badge variant="outline">Mastercard</Badge>
          <Badge variant="outline">American Express</Badge>
        </div>
      </div>
    </Card>
  );
}
