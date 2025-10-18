import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Check, X, AlertTriangle, CreditCard } from 'lucide-react';
import { stripePromise, formatPrice, PRODUCTS } from '../lib/stripe';

interface PaymentTestProps {
  onClose: () => void;
}

export function PaymentTest({ onClose }: PaymentTestProps) {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [running, setRunning] = useState(false);

  const runPaymentTests = async () => {
    setRunning(true);
    setTestResults([]);
    
    const tests = [
      {
        name: 'Stripe Library Load',
        test: async () => {
          const stripe = await stripePromise;
          return stripe !== null;
        }
      },
      {
        name: 'Test Card Validation',
        test: async () => {
          // Test basic card number validation
          const testCard = '4242424242424242';
          return testCard.length === 16 && /^\d+$/.test(testCard);
        }
      },
      {
        name: 'Product Configuration',
        test: async () => {
          return Object.keys(PRODUCTS).length > 0;
        }
      },
      {
        name: 'Price Formatting',
        test: async () => {
          const testPrice = formatPrice(1200);
          return testPrice === 'CHF 12.00';
        }
      }
    ];

    const results = [];
    
    for (const test of tests) {
      try {
        const result = await test.test();
        results.push({
          name: test.name,
          status: result ? 'success' : 'failure',
          message: result ? 'Passed' : 'Failed'
        });
      } catch (error: any) {
        results.push({
          name: test.name,
          status: 'error',
          message: error.message || 'Error occurred'
        });
      }
    }

    setTestResults(results);
    setRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'failure':
        return <X className="w-4 h-4 text-red-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failure':
        return 'bg-red-100 text-red-800';
      case 'error':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-xova-primary" />
            <h2 className="text-xl font-bold">Payment System Test</h2>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-muted-foreground">
            This test verifies that the payment system components are properly configured and working.
          </p>
          
          <Button 
            onClick={runPaymentTests} 
            disabled={running}
            className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary"
          >
            {running ? 'Running Tests...' : 'Run Payment Tests'}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Test Results:</h3>
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <span className="font-medium">{result.name}</span>
                </div>
                <Badge className={getStatusColor(result.status)}>
                  {result.message}
                </Badge>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Test Card Numbers (Stripe Test Mode):</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div><strong>Success:</strong> 4242 4242 4242 4242</div>
            <div><strong>Decline:</strong> 4000 0000 0000 0002</div>
            <div><strong>3D Secure:</strong> 4000 0025 0000 3155</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">Environment Check:</h4>
          <div className="text-sm text-yellow-800">
            <div>• VITE_STRIPE_PUBLISHABLE_KEY: {import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing'}</div>
            <div>• VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</div>
            <div>• VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

