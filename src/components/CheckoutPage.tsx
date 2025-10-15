import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PaymentForm } from './PaymentForm';
import { ArrowLeft, Check, Package, Calendar, CreditCard } from 'lucide-react';
import { PRODUCTS, formatPrice } from '../lib/stripe';

interface CheckoutPageProps {
  productType: 'singleSmoothie' | 'weeklyPlan' | 'fortnightlyPlan';
  onBack: () => void;
  onPaymentSuccess: (paymentIntentId: string) => void;
}

export function CheckoutPage({ productType, onBack, onPaymentSuccess }: CheckoutPageProps) {
  const [paymentStep, setPaymentStep] = useState<'summary' | 'payment' | 'success'>('summary');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

  const product = PRODUCTS[productType];

  const handlePaymentSuccess = (paymentId: string) => {
    setPaymentIntentId(paymentId);
    setPaymentStep('success');
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // In a real app, you'd show this error to the user
  };

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white p-4">
        <Card className="p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Payment ID:</strong> {paymentIntentId}
            </p>
            <p className="text-sm text-green-800 mt-1">
              <strong>Amount:</strong> {formatPrice(product.price)}
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary"
              onClick={() => {
                onPaymentSuccess(paymentIntentId);
              }}
            >
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pricing
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (paymentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white p-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Button variant="outline" onClick={() => setPaymentStep('summary')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Summary
          </Button>
        </div>

        <PaymentForm
          productType={productType}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Review your order and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-xova-primary to-xova-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  {product.recurring && (
                    <Badge className="mt-2 bg-blue-100 text-blue-800">
                      Recurring Subscription
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatPrice(product.price)}</p>
                  {product.recurring && (
                    <p className="text-sm text-muted-foreground">per {product.interval}</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(product.price)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{formatPrice(product.price)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Options */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Payment Information</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-xova-primary" />
                  <span className="font-medium">Credit/Debit Card</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Secure payment powered by Stripe. We accept Visa, Mastercard, and American Express.
                </p>
                <Button 
                  onClick={() => setPaymentStep('payment')}
                  className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary"
                >
                  Pay with Card
                </Button>
              </div>

              <div className="p-4 border border-border rounded-lg opacity-50">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-400">Pay Later</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Coming soon: Pay upon delivery or monthly billing.
                </p>
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Your Payment is Secure</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Encrypted with 256-bit SSL</li>
                <li>• PCI DSS compliant</li>
                <li>• No card details stored on our servers</li>
                <li>• Protected by Stripe's fraud detection</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
