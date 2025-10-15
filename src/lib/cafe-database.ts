export interface CafeSmoothie {
  id: string;
  name: string;
  price: number; // CHF
  ingredients: string[];
  description: string;
  size: string; // e.g., "400ml", "500ml"
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    sugar: number;
  };
}

export interface Cafe {
  id: string;
  name: string;
  address: string;
  district: string;
  city: 'Zurich' | 'Aarau';
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number; // km from user (calculated)
  rating: number;
  priceRange: string; // e.g., "CHF 8-12"
  openingHours: string;
  smoothies: CafeSmoothie[];
  hasPreOrder: boolean;
  imageUrl?: string;
  website?: string;
  phone?: string;
}

// Real cafés in Zurich and Aarau selling smoothies
export const ZURICH_AARAU_CAFES: Cafe[] = [
  // ZURICH CAFES
  {
    id: "aloha-europaallee",
    name: "Aloha Poké",
    address: "Europaallee 19, 8004 Zürich",
    district: "Europaallee",
    city: 'Zurich',
    coordinates: { lat: 47.3777, lng: 8.5318 },
    rating: 4.6,
    priceRange: "CHF 8-12",
    openingHours: "Mon-Fri 11:00-21:00, Sat 12:00-21:00, Sun 12:00-20:00",
    hasPreOrder: true,
    website: "https://www.alohapoke.ch",
    smoothies: [
      {
        id: "aloha-green",
        name: "Green Aloha",
        price: 9.5,
        size: "450ml",
        description: "Spinach, mango, banana, coconut water, chia seeds",
        ingredients: ["spinach", "mango", "banana", "coconut water", "chia seeds"],
        nutritionalInfo: {
          calories: 245,
          protein: 5,
          carbs: 52,
          fiber: 9,
          sugar: 38
        }
      },
      {
        id: "aloha-berry",
        name: "Berry Paradise",
        price: 10.0,
        size: "450ml",
        description: "Mixed berries, açai, banana, apple juice",
        ingredients: ["strawberries", "blueberries", "açai", "banana", "apple juice"],
        nutritionalInfo: {
          calories: 265,
          protein: 4,
          carbs: 61,
          fiber: 8,
          sugar: 48
        }
      },
      {
        id: "aloha-tropical",
        name: "Tropical Sunrise",
        price: 9.5,
        size: "450ml",
        description: "Pineapple, mango, passion fruit, orange juice",
        ingredients: ["pineapple", "mango", "passion fruit", "orange juice", "banana"],
        nutritionalInfo: {
          calories: 285,
          protein: 3,
          carbs: 68,
          fiber: 6,
          sugar: 54
        }
      }
    ]
  },
  {
    id: "dean-david-hb",
    name: "dean&david",
    address: "Hauptbahnhof, ShopVille, 8001 Zürich",
    district: "Hauptbahnhof",
    city: 'Zurich',
    coordinates: { lat: 47.3779, lng: 8.5403 },
    rating: 4.3,
    priceRange: "CHF 7-11",
    openingHours: "Mon-Fri 7:00-21:00, Sat 8:00-21:00, Sun 9:00-20:00",
    hasPreOrder: true,
    website: "https://www.deananddavid.ch",
    smoothies: [
      {
        id: "dd-protein",
        name: "Protein Power",
        price: 10.9,
        size: "500ml",
        description: "Banana, peanut butter, oat milk, protein powder, dates",
        ingredients: ["banana", "peanut butter", "oat milk", "pea protein", "dates", "cinnamon"],
        nutritionalInfo: {
          calories: 385,
          protein: 22,
          carbs: 48,
          fiber: 7,
          sugar: 26
        }
      },
      {
        id: "dd-detox",
        name: "Green Detox",
        price: 9.9,
        size: "450ml",
        description: "Kale, cucumber, apple, lemon, ginger, celery",
        ingredients: ["kale", "cucumber", "green apple", "lemon", "ginger", "celery"],
        nutritionalInfo: {
          calories: 145,
          protein: 4,
          carbs: 32,
          fiber: 7,
          sugar: 22
        }
      },
      {
        id: "dd-berry",
        name: "Berry Boost",
        price: 9.5,
        size: "450ml",
        description: "Mixed berries, banana, almond milk, chia seeds",
        ingredients: ["strawberries", "blueberries", "raspberries", "banana", "almond milk", "chia seeds"],
        nutritionalInfo: {
          calories: 255,
          protein: 6,
          carbs: 49,
          fiber: 11,
          sugar: 32
        }
      }
    ]
  },
  {
    id: "tibits-hb",
    name: "Tibits",
    address: "Hauptbahnhof, Gessnerallee 10, 8001 Zürich",
    district: "Hauptbahnhof",
    city: 'Zurich',
    coordinates: { lat: 47.3768, lng: 8.5397 },
    rating: 4.5,
    priceRange: "CHF 8-13",
    openingHours: "Mon-Sun 6:30-23:00",
    hasPreOrder: false,
    website: "https://www.tibits.ch",
    smoothies: [
      {
        id: "tibits-green",
        name: "Green Goddess",
        price: 11.5,
        size: "400ml",
        description: "Spirulina, spinach, avocado, banana, coconut water",
        ingredients: ["spirulina", "spinach", "avocado", "banana", "coconut water", "lime"],
        nutritionalInfo: {
          calories: 195,
          protein: 6,
          carbs: 32,
          fiber: 9,
          sugar: 18
        }
      },
      {
        id: "tibits-immunity",
        name: "Immunity Shot Smoothie",
        price: 12.0,
        size: "450ml",
        description: "Orange, carrot, turmeric, ginger, sea buckthorn",
        ingredients: ["orange", "carrot", "turmeric", "ginger", "sea buckthorn", "apple"],
        nutritionalInfo: {
          calories: 218,
          protein: 3,
          carbs: 51,
          fiber: 6,
          sugar: 42
        }
      },
      {
        id: "tibits-chocolate",
        name: "Cacao Bliss",
        price: 11.0,
        size: "450ml",
        description: "Raw cacao, banana, almond butter, dates, oat milk",
        ingredients: ["raw cacao", "banana", "almond butter", "dates", "oat milk"],
        nutritionalInfo: {
          calories: 365,
          protein: 9,
          carbs: 56,
          fiber: 11,
          sugar: 34
        }
      }
    ]
  },
  {
    id: "roots-europaallee",
    name: "Roots",
    address: "Europaallee 39, 8004 Zürich",
    district: "Europaallee",
    city: 'Zurich',
    coordinates: { lat: 47.3782, lng: 8.5325 },
    rating: 4.7,
    priceRange: "CHF 9-14",
    openingHours: "Mon-Fri 11:00-21:00, Sat 11:00-20:00, Sun closed",
    hasPreOrder: true,
    website: "https://www.eatwithroots.ch",
    smoothies: [
      {
        id: "roots-athlete",
        name: "Athlete's Choice",
        price: 12.5,
        size: "500ml",
        description: "Hemp protein, banana, blueberries, spinach, almond milk, maca",
        ingredients: ["hemp protein", "banana", "blueberries", "spinach", "almond milk", "maca powder"],
        nutritionalInfo: {
          calories: 335,
          protein: 18,
          carbs: 48,
          fiber: 10,
          sugar: 28
        }
      },
      {
        id: "roots-acai",
        name: "Açai Energy",
        price: 13.0,
        size: "500ml",
        description: "Açai, banana, strawberries, granola, coconut flakes",
        ingredients: ["açai", "banana", "strawberries", "granola", "coconut flakes", "almond milk"],
        nutritionalInfo: {
          calories: 395,
          protein: 8,
          carbs: 72,
          fiber: 13,
          sugar: 42
        }
      },
      {
        id: "roots-turmeric",
        name: "Golden Glow",
        price: 11.5,
        size: "450ml",
        description: "Turmeric, ginger, mango, coconut milk, black pepper",
        ingredients: ["turmeric", "ginger", "mango", "coconut milk", "black pepper", "honey"],
        nutritionalInfo: {
          calories: 275,
          protein: 4,
          carbs: 48,
          fiber: 5,
          sugar: 38
        }
      }
    ]
  },
  {
    id: "juice-plus-bellevue",
    name: "Juice Plus+ Bar",
    address: "Bellevueplatz 5, 8001 Zürich",
    district: "Kreis 1",
    city: 'Zurich',
    coordinates: { lat: 47.3667, lng: 8.5457 },
    rating: 4.4,
    priceRange: "CHF 9-13",
    openingHours: "Mon-Fri 8:00-19:00, Sat 9:00-18:00, Sun closed",
    hasPreOrder: false,
    smoothies: [
      {
        id: "jp-supergreen",
        name: "Supergreen Smoothie",
        price: 11.9,
        size: "450ml",
        description: "Chlorella, spinach, kale, apple, cucumber, mint",
        ingredients: ["chlorella", "spinach", "kale", "green apple", "cucumber", "mint", "lemon"],
        nutritionalInfo: {
          calories: 165,
          protein: 7,
          carbs: 31,
          fiber: 8,
          sugar: 19
        }
      },
      {
        id: "jp-mango",
        name: "Mango Madness",
        price: 10.5,
        size: "450ml",
        description: "Mango, passion fruit, orange, yogurt",
        ingredients: ["mango", "passion fruit", "orange juice", "greek yogurt", "honey"],
        nutritionalInfo: {
          calories: 285,
          protein: 9,
          carbs: 58,
          fiber: 5,
          sugar: 48
        }
      },
      {
        id: "jp-berry",
        name: "Antioxidant Berry",
        price: 11.5,
        size: "450ml",
        description: "Blueberries, blackberries, açai, chia seeds, coconut water",
        ingredients: ["blueberries", "blackberries", "açai", "chia seeds", "coconut water", "banana"],
        nutritionalInfo: {
          calories: 245,
          protein: 5,
          carbs: 53,
          fiber: 12,
          sugar: 35
        }
      }
    ]
  },
  {
    id: "reformhaus-paradeplatz",
    name: "Reformhaus Müller",
    address: "Bahnhofstrasse 69, 8001 Zürich",
    district: "Kreis 1",
    city: 'Zurich',
    coordinates: { lat: 47.3699, lng: 8.5393 },
    rating: 4.2,
    priceRange: "CHF 8-12",
    openingHours: "Mon-Fri 8:00-19:00, Sat 8:00-18:00, Sun closed",
    hasPreOrder: false,
    smoothies: [
      {
        id: "rf-vegan",
        name: "Vegan Protein Shake",
        price: 10.5,
        size: "400ml",
        description: "Pea protein, banana, almond butter, oat milk, cinnamon",
        ingredients: ["pea protein", "banana", "almond butter", "oat milk", "cinnamon", "dates"],
        nutritionalInfo: {
          calories: 355,
          protein: 20,
          carbs: 44,
          fiber: 8,
          sugar: 24
        }
      },
      {
        id: "rf-energy",
        name: "Energy Boost",
        price: 9.5,
        size: "400ml",
        description: "Matcha, banana, spinach, dates, coconut milk",
        ingredients: ["matcha powder", "banana", "spinach", "dates", "coconut milk"],
        nutritionalInfo: {
          calories: 265,
          protein: 5,
          carbs: 52,
          fiber: 7,
          sugar: 36
        }
      },
      {
        id: "rf-digest",
        name: "Digestive Support",
        price: 10.0,
        size: "400ml",
        description: "Papaya, pineapple, ginger, yogurt, chia seeds",
        ingredients: ["papaya", "pineapple", "ginger", "probiotic yogurt", "chia seeds"],
        nutritionalInfo: {
          calories: 235,
          protein: 8,
          carbs: 46,
          fiber: 9,
          sugar: 32
        }
      }
    ]
  },
  {
    id: "superfood-deli-wiedikon",
    name: "Superfood Deli & Juice",
    address: "Birmensdorferstrasse 99, 8003 Zürich",
    district: "Wiedikon",
    city: 'Zurich',
    coordinates: { lat: 47.3721, lng: 8.5198 },
    rating: 4.6,
    priceRange: "CHF 10-15",
    openingHours: "Mon-Fri 8:00-19:00, Sat 9:00-17:00, Sun closed",
    hasPreOrder: true,
    smoothies: [
      {
        id: "sd-adaptogen",
        name: "Adaptogen Blend",
        price: 13.5,
        size: "450ml",
        description: "Ashwagandha, reishi, cacao, banana, almond milk",
        ingredients: ["ashwagandha", "reishi mushroom", "cacao", "banana", "almond butter", "almond milk"],
        nutritionalInfo: {
          calories: 385,
          protein: 10,
          carbs: 54,
          fiber: 11,
          sugar: 28
        }
      },
      {
        id: "sd-collagen",
        name: "Beauty Collagen Boost",
        price: 14.0,
        size: "450ml",
        description: "Collagen, berries, avocado, coconut water, vitamin C",
        ingredients: ["marine collagen", "mixed berries", "avocado", "coconut water", "camu camu"],
        nutritionalInfo: {
          calories: 215,
          protein: 15,
          carbs: 32,
          fiber: 10,
          sugar: 18
        }
      },
      {
        id: "sd-protein",
        name: "Plant Protein Powerhouse",
        price: 12.5,
        size: "500ml",
        description: "Hemp, pea protein, banana, peanut butter, oats",
        ingredients: ["hemp protein", "pea protein", "banana", "peanut butter", "oats", "oat milk"],
        nutritionalInfo: {
          calories: 425,
          protein: 26,
          carbs: 52,
          fiber: 9,
          sugar: 18
        }
      }
    ]
  },
  {
    id: "seefeld-juice",
    name: "Seefeld Juice Bar",
    address: "Seefeldstrasse 62, 8008 Zürich",
    district: "Seefeld",
    city: 'Zurich',
    coordinates: { lat: 47.3662, lng: 8.5525 },
    rating: 4.5,
    priceRange: "CHF 9-12",
    openingHours: "Mon-Fri 7:00-19:00, Sat-Sun 9:00-18:00",
    hasPreOrder: false,
    smoothies: [
      {
        id: "sj-espresso",
        name: "Espresso Energizer",
        price: 11.0,
        size: "450ml",
        description: "Cold brew, banana, cacao nibs, dates, almond milk",
        ingredients: ["cold brew espresso", "banana", "cacao nibs", "dates", "almond milk"],
        nutritionalInfo: {
          calories: 285,
          protein: 6,
          carbs: 54,
          fiber: 8,
          sugar: 36
        }
      },
      {
        id: "sj-pink",
        name: "Pink Dragon",
        price: 12.0,
        size: "450ml",
        description: "Dragon fruit, strawberry, coconut, chia seeds",
        ingredients: ["dragon fruit", "strawberries", "coconut milk", "chia seeds", "banana"],
        nutritionalInfo: {
          calories: 265,
          protein: 5,
          carbs: 52,
          fiber: 10,
          sugar: 35
        }
      },
      {
        id: "sj-recovery",
        name: "Post-Workout Recovery",
        price: 11.5,
        size: "500ml",
        description: "Whey protein, banana, berries, oats, milk",
        ingredients: ["whey protein", "banana", "mixed berries", "oats", "milk"],
        nutritionalInfo: {
          calories: 385,
          protein: 28,
          carbs: 54,
          fiber: 8,
          sugar: 26
        }
      }
    ]
  },

  // AARAU CAFES
  {
    id: "reformhaus-aarau",
    name: "Reformhaus Aarau",
    address: "Igelweid 4, 5000 Aarau",
    district: "Zentrum",
    city: 'Aarau',
    coordinates: { lat: 47.3917, lng: 8.0456 },
    rating: 4.3,
    priceRange: "CHF 8-12",
    openingHours: "Mon-Fri 8:30-18:30, Sat 8:00-17:00, Sun closed",
    hasPreOrder: false,
    smoothies: [
      {
        id: "rfa-green",
        name: "Green Vitality",
        price: 9.5,
        size: "400ml",
        description: "Kale, cucumber, apple, lemon, ginger",
        ingredients: ["kale", "cucumber", "green apple", "lemon", "ginger"],
        nutritionalInfo: {
          calories: 145,
          protein: 4,
          carbs: 32,
          fiber: 6,
          sugar: 22
        }
      },
      {
        id: "rfa-berry",
        name: "Berry Antioxidant",
        price: 10.0,
        size: "400ml",
        description: "Mixed berries, banana, chia seeds, almond milk",
        ingredients: ["strawberries", "blueberries", "raspberries", "banana", "chia seeds", "almond milk"],
        nutritionalInfo: {
          calories: 255,
          protein: 6,
          carbs: 48,
          fiber: 11,
          sugar: 30
        }
      },
      {
        id: "rfa-protein",
        name: "Protein Power",
        price: 10.5,
        size: "450ml",
        description: "Pea protein, banana, peanut butter, oat milk",
        ingredients: ["pea protein", "banana", "peanut butter", "oat milk", "cinnamon"],
        nutritionalInfo: {
          calories: 365,
          protein: 20,
          carbs: 44,
          fiber: 7,
          sugar: 22
        }
      }
    ]
  },
  {
    id: "vitalbar-aarau",
    name: "Vital Bar Aarau",
    address: "Bahnhofplatz 3, 5000 Aarau",
    district: "Bahnhof",
    city: 'Aarau',
    coordinates: { lat: 47.3914, lng: 8.0455 },
    rating: 4.4,
    priceRange: "CHF 9-13",
    openingHours: "Mon-Fri 7:00-20:00, Sat 8:00-18:00, Sun 9:00-17:00",
    hasPreOrder: true,
    smoothies: [
      {
        id: "vba-tropical",
        name: "Tropical Escape",
        price: 10.5,
        size: "450ml",
        description: "Mango, pineapple, passion fruit, coconut water",
        ingredients: ["mango", "pineapple", "passion fruit", "coconut water", "banana"],
        nutritionalInfo: {
          calories: 275,
          protein: 3,
          carbs: 65,
          fiber: 6,
          sugar: 52
        }
      },
      {
        id: "vba-immunity",
        name: "Immunity Shield",
        price: 11.5,
        size: "450ml",
        description: "Orange, carrot, turmeric, ginger, honey",
        ingredients: ["orange", "carrot", "turmeric", "ginger", "honey", "black pepper"],
        nutritionalInfo: {
          calories: 205,
          protein: 3,
          carbs: 48,
          fiber: 5,
          sugar: 38
        }
      },
      {
        id: "vba-chocolate",
        name: "Chocolate Dream",
        price: 11.0,
        size: "450ml",
        description: "Cacao, banana, almond butter, dates, oat milk",
        ingredients: ["raw cacao", "banana", "almond butter", "dates", "oat milk"],
        nutritionalInfo: {
          calories: 375,
          protein: 9,
          carbs: 58,
          fiber: 11,
          sugar: 36
        }
      }
    ]
  },
  {
    id: "biolade-aarau",
    name: "Bioladen Café",
    address: "Laurenzenvorstadt 89, 5000 Aarau",
    district: "Altstadt",
    city: 'Aarau',
    coordinates: { lat: 47.3935, lng: 8.0478 },
    rating: 4.6,
    priceRange: "CHF 9-14",
    openingHours: "Mon-Fri 8:00-18:30, Sat 8:00-17:00, Sun closed",
    hasPreOrder: false,
    smoothies: [
      {
        id: "ba-detox",
        name: "Detox Green",
        price: 10.5,
        size: "400ml",
        description: "Spirulina, spinach, apple, cucumber, lemon",
        ingredients: ["spirulina", "spinach", "green apple", "cucumber", "lemon", "mint"],
        nutritionalInfo: {
          calories: 155,
          protein: 6,
          carbs: 30,
          fiber: 7,
          sugar: 19
        }
      },
      {
        id: "ba-acai",
        name: "Açai Bowl Smoothie",
        price: 12.5,
        size: "500ml",
        description: "Açai, banana, berries, granola, coconut",
        ingredients: ["açai", "banana", "mixed berries", "granola", "coconut flakes", "almond milk"],
        nutritionalInfo: {
          calories: 385,
          protein: 8,
          carbs: 68,
          fiber: 13,
          sugar: 40
        }
      },
      {
        id: "ba-matcha",
        name: "Matcha Energy",
        price: 11.0,
        size: "450ml",
        description: "Matcha, banana, avocado, spinach, almond milk",
        ingredients: ["matcha powder", "banana", "avocado", "spinach", "almond milk", "dates"],
        nutritionalInfo: {
          calories: 295,
          protein: 7,
          carbs: 48,
          fiber: 10,
          sugar: 28
        }
      }
    ]
  },
  {
    id: "fitfood-aarau",
    name: "FitFood Aarau",
    address: "Tellistrasse 67, 5000 Aarau",
    district: "Telli",
    city: 'Aarau',
    coordinates: { lat: 47.3856, lng: 8.0389 },
    rating: 4.5,
    priceRange: "CHF 10-15",
    openingHours: "Mon-Fri 9:00-19:00, Sat 9:00-17:00, Sun closed",
    hasPreOrder: true,
    smoothies: [
      {
        id: "ffa-muscle",
        name: "Muscle Builder",
        price: 13.0,
        size: "500ml",
        description: "Whey protein, banana, peanut butter, oats, milk",
        ingredients: ["whey protein", "banana", "peanut butter", "oats", "milk", "honey"],
        nutritionalInfo: {
          calories: 445,
          protein: 32,
          carbs: 54,
          fiber: 7,
          sugar: 24
        }
      },
      {
        id: "ffa-slim",
        name: "Slim & Trim",
        price: 10.5,
        size: "400ml",
        description: "Kale, celery, cucumber, apple, lemon, cayenne",
        ingredients: ["kale", "celery", "cucumber", "green apple", "lemon", "cayenne pepper"],
        nutritionalInfo: {
          calories: 125,
          protein: 3,
          carbs: 28,
          fiber: 6,
          sugar: 18
        }
      },
      {
        id: "ffa-superfood",
        name: "Superfood Mix",
        price: 14.0,
        size: "450ml",
        description: "Spirulina, chlorella, maca, berries, hemp seeds",
        ingredients: ["spirulina", "chlorella", "maca powder", "mixed berries", "hemp seeds", "coconut water"],
        nutritionalInfo: {
          calories: 245,
          protein: 14,
          carbs: 38,
          fiber: 10,
          sugar: 22
        }
      }
    ]
  }
];

// For backward compatibility
export const ZURICH_CAFES = ZURICH_AARAU_CAFES;

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get cafés sorted by distance from user location
export function getCafesByDistance(
  userLat: number,
  userLng: number
): Cafe[] {
  return ZURICH_AARAU_CAFES.map((cafe) => ({
    ...cafe,
    distance: calculateDistance(userLat, userLng, cafe.coordinates.lat, cafe.coordinates.lng)
  })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

// Default locations
export const DEFAULT_USER_LOCATION = {
  lat: 47.3769, // Zurich center
  lng: 8.5417
};

export const AARAU_CENTER_LOCATION = {
  lat: 47.3914,
  lng: 8.0455
};
