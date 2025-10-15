import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Missing Stripe publishable key - payment features will be disabled');
}

// Only load Stripe if key is available
export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : Promise.resolve(null);

// Stripe configuration
export const STRIPE_CONFIG = {
  currency: 'chf',
  country: 'CH',
  locale: 'en-CH',
};

// Product configurations
export const PRODUCTS = {
  singleSmoothie: {
    name: 'Single Smoothie',
    price: 1200, // 12 CHF in cents
    description: 'One personalized smoothie delivered fresh',
    recurring: false,
  },
  weeklyPlan: {
    name: 'Weekly Plan',
    price: 8400, // 84 CHF in cents
    description: '7 personalized smoothies delivered weekly',
    recurring: true,
    interval: 'week',
  },
  fortnightlyPlan: {
    name: '14-Day Plan',
    price: 16800, // 168 CHF in cents
    description: '14 personalized smoothies delivered bi-weekly',
    recurring: true,
    interval: 'week',
    intervalCount: 2,
  },
};

// Helper function to format price
export const formatPrice = (priceInCents: number): string => {
  return `CHF ${(priceInCents / 100).toFixed(2)}`;
};

// Helper function to convert CHF to cents
export const chfToCents = (chf: number): number => {
  return Math.round(chf * 100);
};
