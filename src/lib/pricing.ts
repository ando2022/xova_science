// XOVA Pricing Structure

export type SubscriptionTier = 'free' | 'premium' | 'delivery';

export interface PricingTier {
  id: SubscriptionTier;
  name: string;
  pricePerWeek: number; // CHF
  description: string;
  features: string[];
  restrictions: string[];
  popular?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free Access',
    pricePerWeek: 0,
    description: 'Basic smoothie information only',
    features: [
      'Browse smoothie catalog',
      'View basic nutritional info',
      'Access to ingredient database'
    ],
    restrictions: [
      'No AI generation',
      'No scientific explanations',
      'No café matching',
      'No delivery access',
      'No personalization'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    pricePerWeek: 10,
    description: 'Full AI recipes with scientific transparency',
    features: [
      'Unlimited AI-generated smoothies',
      'Exact proportions & instructions',
      'Full scientific explanations',
      'Café menu matching with GPS',
      'Daily profile check-ins',
      'Weekly planning tool',
      'Unlimited favorites',
      'Priority support'
    ],
    restrictions: [
      'No ingredient delivery'
    ],
    popular: true
  },
  {
    id: 'delivery',
    name: 'Weekly Delivery',
    pricePerWeek: 0, // Variable based on smoothies ordered
    description: 'Premium + Fresh ingredients delivered weekly',
    features: [
      'All Premium features included',
      'Fresh ingredients delivered weekly',
      'Vacuum-sealed packaging',
      'Volume-based discounts',
      'Smart meal planning',
      'Free delivery on 10+ smoothies/week',
      'Flexible weekly scheduling'
    ],
    restrictions: []
  }
];

// Volume-based pricing for delivery
export interface DeliveryPricingTier {
  minSmoothies: number;
  maxSmoothies: number;
  pricePerSmoothie: number; // CHF
  label: string;
  savingsPercent?: number;
}

export const DELIVERY_PRICING: DeliveryPricingTier[] = [
  {
    minSmoothies: 1,
    maxSmoothies: 3,
    pricePerSmoothie: 12,
    label: '1-3 smoothies/week',
    savingsPercent: 0
  },
  {
    minSmoothies: 4,
    maxSmoothies: 7,
    pricePerSmoothie: 11,
    label: '4-7 smoothies/week',
    savingsPercent: 8
  },
  {
    minSmoothies: 8,
    maxSmoothies: 14,
    pricePerSmoothie: 9.50,
    label: '8-14 smoothies/week',
    savingsPercent: 21
  },
  {
    minSmoothies: 15,
    maxSmoothies: 21,
    pricePerSmoothie: 8,
    label: '15-21 smoothies/week',
    savingsPercent: 33
  }
];

export const FREE_DELIVERY_SMOOTHIE_COUNT = 10; // Free delivery from 10 smoothies
export const DELIVERY_FEE = 8; // CHF
export const BAG_DEPOSIT = 15; // CHF (one-time, refundable)

// Calculate price per smoothie based on quantity
export function calculatePricePerSmoothie(quantity: number): number {
  const tier = DELIVERY_PRICING.find(
    t => quantity >= t.minSmoothies && quantity <= t.maxSmoothies
  );
  
  if (!tier) {
    // If more than max, use best tier
    return DELIVERY_PRICING[DELIVERY_PRICING.length - 1].pricePerSmoothie;
  }
  
  return tier.pricePerSmoothie;
}

// Calculate total delivery cost
export function calculateDeliveryTotal(quantity: number, isFirstOrder: boolean = false): {
  subtotal: number;
  pricePerSmoothie: number;
  deliveryFee: number;
  bagDeposit: number;
  total: number;
  tier: DeliveryPricingTier | null;
  freeDelivery: boolean;
} {
  const pricePerSmoothie = calculatePricePerSmoothie(quantity);
  const subtotal = pricePerSmoothie * quantity;
  // Free delivery from 10 smoothies onwards
  const freeDelivery = quantity >= FREE_DELIVERY_SMOOTHIE_COUNT;
  const deliveryFee = freeDelivery ? 0 : DELIVERY_FEE;
  const bagDeposit = isFirstOrder ? BAG_DEPOSIT : 0;
  const total = subtotal + deliveryFee + bagDeposit;
  
  const tier = DELIVERY_PRICING.find(
    t => quantity >= t.minSmoothies && quantity <= t.maxSmoothies
  ) || null;
  
  return {
    subtotal,
    pricePerSmoothie,
    deliveryFee,
    bagDeposit,
    total,
    tier,
    freeDelivery
  };
}

// Get pricing tier by ID
export function getPricingTier(tierId: SubscriptionTier): PricingTier | undefined {
  return PRICING_TIERS.find(t => t.id === tierId);
}

// Format currency in CHF
export function formatCHF(amount: number, decimals: number = 2): string {
  return `CHF ${amount.toFixed(decimals)}`;
}

// Calculate weekly savings compared to café prices (average CHF 14 per smoothie)
export const AVERAGE_CAFE_PRICE = 14; // CHF

export function calculateWeeklySavings(quantity: number): number {
  const cafeTotal = AVERAGE_CAFE_PRICE * quantity;
  const deliveryTotal = calculateDeliveryTotal(quantity).total;
  return cafeTotal - deliveryTotal;
}
