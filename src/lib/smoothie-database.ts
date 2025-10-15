// Smoothie ingredient database with nutritional information and benefits

export interface Ingredient {
  id: string;
  name: string;
  category: 'fruit' | 'vegetable' | 'liquid' | 'protein' | 'supplement' | 'extra';
  calories: number; // per 100g
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fiber: number; // grams per 100g
  vitamins: string[];
  minerals: string[];
  benefits: string[];
  allergens: string[];
  goodFor: string[]; // health goals
  flavor: 'sweet' | 'neutral' | 'earthy' | 'citrus' | 'tropical';
}

export const ingredients: Ingredient[] = [
  // Fruits
  {
    id: 'banana',
    name: 'Banana',
    category: 'fruit',
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fiber: 2.6,
    vitamins: ['B6', 'C', 'Folate'],
    minerals: ['Potassium', 'Magnesium'],
    benefits: ['Energy boost', 'Digestive health', 'Heart health'],
    allergens: [],
    goodFor: ['energy', 'muscle-gain', 'digestion'],
    flavor: 'sweet'
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    category: 'fruit',
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fiber: 2.0,
    vitamins: ['C', 'Folate', 'Manganese'],
    minerals: ['Potassium'],
    benefits: ['Antioxidant power', 'Immune support', 'Skin health'],
    allergens: [],
    goodFor: ['weight-loss', 'immunity', 'skin-health'],
    flavor: 'sweet'
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    category: 'fruit',
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fiber: 2.4,
    vitamins: ['C', 'K', 'Manganese'],
    minerals: [],
    benefits: ['Brain health', 'Antioxidants', 'Anti-inflammatory'],
    allergens: [],
    goodFor: ['mental-clarity', 'immunity', 'inflammation'],
    flavor: 'sweet'
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'fruit',
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fiber: 1.6,
    vitamins: ['A', 'C', 'Folate'],
    minerals: ['Potassium'],
    benefits: ['Immune support', 'Eye health', 'Digestive health'],
    allergens: [],
    goodFor: ['immunity', 'digestion', 'skin-health'],
    flavor: 'tropical'
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    category: 'fruit',
    calories: 50,
    protein: 0.5,
    carbs: 13.1,
    fiber: 1.4,
    vitamins: ['C', 'B6', 'Thiamin'],
    minerals: ['Manganese'],
    benefits: ['Anti-inflammatory', 'Digestive enzymes', 'Immune support'],
    allergens: [],
    goodFor: ['digestion', 'immunity', 'inflammation'],
    flavor: 'tropical'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'fruit',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fiber: 6.7,
    vitamins: ['K', 'E', 'C', 'B5', 'B6'],
    minerals: ['Potassium', 'Magnesium'],
    benefits: ['Healthy fats', 'Heart health', 'Satiety'],
    allergens: [],
    goodFor: ['heart-health', 'energy', 'weight-loss'],
    flavor: 'neutral'
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'fruit',
    calories: 47,
    protein: 0.9,
    carbs: 11.8,
    fiber: 2.4,
    vitamins: ['C', 'Thiamin', 'Folate'],
    minerals: ['Potassium'],
    benefits: ['Immune support', 'Hydration', 'Skin health'],
    allergens: [],
    goodFor: ['immunity', 'skin-health', 'energy'],
    flavor: 'citrus'
  },
  {
    id: 'apple',
    name: 'Apple',
    category: 'fruit',
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fiber: 2.4,
    vitamins: ['C'],
    minerals: ['Potassium'],
    benefits: ['Heart health', 'Digestive health', 'Weight management'],
    allergens: [],
    goodFor: ['heart-health', 'digestion', 'weight-loss'],
    flavor: 'sweet'
  },
  
  // Vegetables
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'vegetable',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fiber: 2.2,
    vitamins: ['A', 'C', 'K', 'Folate'],
    minerals: ['Iron', 'Calcium', 'Magnesium'],
    benefits: ['Iron source', 'Bone health', 'Eye health'],
    allergens: [],
    goodFor: ['energy', 'immunity', 'bone-health'],
    flavor: 'earthy'
  },
  {
    id: 'kale',
    name: 'Kale',
    category: 'vegetable',
    calories: 49,
    protein: 4.3,
    carbs: 8.8,
    fiber: 3.6,
    vitamins: ['A', 'K', 'C'],
    minerals: ['Calcium', 'Potassium', 'Iron'],
    benefits: ['Antioxidants', 'Anti-inflammatory', 'Heart health'],
    allergens: [],
    goodFor: ['immunity', 'heart-health', 'inflammation'],
    flavor: 'earthy'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    category: 'vegetable',
    calories: 16,
    protein: 0.7,
    carbs: 3.6,
    fiber: 0.5,
    vitamins: ['K', 'C'],
    minerals: ['Potassium', 'Magnesium'],
    benefits: ['Hydration', 'Anti-inflammatory', 'Skin health'],
    allergens: [],
    goodFor: ['skin-health', 'hydration', 'weight-loss'],
    flavor: 'neutral'
  },
  {
    id: 'celery',
    name: 'Celery',
    category: 'vegetable',
    calories: 16,
    protein: 0.7,
    carbs: 3,
    fiber: 1.6,
    vitamins: ['K', 'A', 'Folate'],
    minerals: ['Potassium'],
    benefits: ['Hydration', 'Anti-inflammatory', 'Digestive health'],
    allergens: [],
    goodFor: ['digestion', 'inflammation', 'weight-loss'],
    flavor: 'neutral'
  },
  
  // Liquids
  {
    id: 'almond-milk',
    name: 'Almond Milk',
    category: 'liquid',
    calories: 17,
    protein: 0.6,
    carbs: 0.6,
    fiber: 0.2,
    vitamins: ['E', 'D', 'A'],
    minerals: ['Calcium'],
    benefits: ['Low calorie', 'Vitamin E', 'Lactose-free'],
    allergens: ['nuts'],
    goodFor: ['weight-loss', 'lactose-intolerant'],
    flavor: 'neutral'
  },
  {
    id: 'coconut-water',
    name: 'Coconut Water',
    category: 'liquid',
    calories: 19,
    protein: 0.7,
    carbs: 3.7,
    fiber: 1.1,
    vitamins: ['C'],
    minerals: ['Potassium', 'Magnesium', 'Sodium'],
    benefits: ['Hydration', 'Electrolytes', 'Post-workout recovery'],
    allergens: [],
    goodFor: ['hydration', 'energy', 'muscle-gain'],
    flavor: 'tropical'
  },
  {
    id: 'oat-milk',
    name: 'Oat Milk',
    category: 'liquid',
    calories: 47,
    protein: 1,
    carbs: 7.6,
    fiber: 0.8,
    vitamins: ['D', 'B12', 'A'],
    minerals: ['Calcium'],
    benefits: ['Heart health', 'Fiber', 'Lactose-free'],
    allergens: ['gluten'],
    goodFor: ['heart-health', 'energy'],
    flavor: 'neutral'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    category: 'liquid',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fiber: 0,
    vitamins: ['B12', 'B2'],
    minerals: ['Calcium', 'Phosphorus'],
    benefits: ['Protein', 'Probiotics', 'Bone health'],
    allergens: ['dairy'],
    goodFor: ['muscle-gain', 'digestion', 'bone-health'],
    flavor: 'neutral'
  },
  
  // Protein
  {
    id: 'protein-powder',
    name: 'Protein Powder (Whey)',
    category: 'protein',
    calories: 400,
    protein: 80,
    carbs: 8,
    fiber: 0,
    vitamins: ['B12'],
    minerals: ['Calcium'],
    benefits: ['Muscle recovery', 'Protein source', 'Satiety'],
    allergens: ['dairy'],
    goodFor: ['muscle-gain', 'weight-loss', 'energy'],
    flavor: 'neutral'
  },
  {
    id: 'pea-protein',
    name: 'Pea Protein',
    category: 'protein',
    calories: 360,
    protein: 85,
    carbs: 7,
    fiber: 6,
    vitamins: [],
    minerals: ['Iron'],
    benefits: ['Muscle recovery', 'Plant-based protein', 'Iron source'],
    allergens: [],
    goodFor: ['muscle-gain', 'vegan', 'energy'],
    flavor: 'neutral'
  },
  
  // Supplements & Extras
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    category: 'supplement',
    calories: 486,
    protein: 16.5,
    carbs: 42.1,
    fiber: 34.4,
    vitamins: ['B1', 'B3'],
    minerals: ['Calcium', 'Magnesium', 'Phosphorus'],
    benefits: ['Omega-3', 'Fiber', 'Energy'],
    allergens: [],
    goodFor: ['heart-health', 'digestion', 'energy'],
    flavor: 'neutral'
  },
  {
    id: 'flax-seeds',
    name: 'Flax Seeds',
    category: 'supplement',
    calories: 534,
    protein: 18.3,
    carbs: 28.9,
    fiber: 27.3,
    vitamins: ['B1'],
    minerals: ['Magnesium', 'Phosphorus'],
    benefits: ['Omega-3', 'Fiber', 'Heart health'],
    allergens: [],
    goodFor: ['heart-health', 'digestion', 'inflammation'],
    flavor: 'neutral'
  },
  {
    id: 'spirulina',
    name: 'Spirulina',
    category: 'supplement',
    calories: 290,
    protein: 57,
    carbs: 23.9,
    fiber: 3.6,
    vitamins: ['B1', 'B2', 'B3'],
    minerals: ['Iron', 'Copper'],
    benefits: ['Antioxidants', 'Protein', 'Detox'],
    allergens: [],
    goodFor: ['immunity', 'energy', 'detox'],
    flavor: 'earthy'
  },
  {
    id: 'ginger',
    name: 'Ginger',
    category: 'extra',
    calories: 80,
    protein: 1.8,
    carbs: 17.8,
    fiber: 2,
    vitamins: ['C', 'B6'],
    minerals: ['Potassium', 'Magnesium'],
    benefits: ['Anti-inflammatory', 'Digestive health', 'Immune support'],
    allergens: [],
    goodFor: ['digestion', 'immunity', 'inflammation'],
    flavor: 'earthy'
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    category: 'extra',
    calories: 312,
    protein: 9.7,
    carbs: 67.1,
    fiber: 22.7,
    vitamins: ['C', 'E', 'K'],
    minerals: ['Iron', 'Potassium', 'Magnesium'],
    benefits: ['Anti-inflammatory', 'Antioxidants', 'Joint health'],
    allergens: [],
    goodFor: ['inflammation', 'immunity', 'joint-health'],
    flavor: 'earthy'
  },
  {
    id: 'cacao',
    name: 'Raw Cacao',
    category: 'extra',
    calories: 228,
    protein: 19.6,
    carbs: 57.9,
    fiber: 33,
    vitamins: ['B1', 'B2', 'B3'],
    minerals: ['Magnesium', 'Iron', 'Potassium'],
    benefits: ['Antioxidants', 'Mood boost', 'Magnesium'],
    allergens: [],
    goodFor: ['mental-clarity', 'energy', 'mood'],
    flavor: 'sweet'
  },
  {
    id: 'honey',
    name: 'Honey',
    category: 'extra',
    calories: 304,
    protein: 0.3,
    carbs: 82.4,
    fiber: 0.2,
    vitamins: ['C'],
    minerals: ['Calcium', 'Iron'],
    benefits: ['Natural sweetener', 'Antioxidants', 'Energy'],
    allergens: [],
    goodFor: ['energy', 'immunity'],
    flavor: 'sweet'
  },
  {
    id: 'matcha',
    name: 'Matcha Green Tea',
    category: 'supplement',
    calories: 324,
    protein: 29.6,
    carbs: 38.5,
    fiber: 38.5,
    vitamins: ['A', 'C', 'E', 'K'],
    minerals: ['Potassium', 'Calcium'],
    benefits: ['Energy', 'Antioxidants', 'Mental clarity'],
    allergens: [],
    goodFor: ['energy', 'mental-clarity', 'immunity'],
    flavor: 'earthy'
  },
  {
    id: 'acai',
    name: 'Acai Berry',
    category: 'fruit',
    calories: 70,
    protein: 2,
    carbs: 4,
    fiber: 2,
    vitamins: ['A', 'C', 'E'],
    minerals: ['Calcium', 'Iron'],
    benefits: ['Powerful antioxidants', 'Heart health', 'Brain function'],
    allergens: [],
    goodFor: ['immunity', 'heart-health', 'mental-clarity', 'anti-aging'],
    flavor: 'sweet'
  },
  {
    id: 'hemp-seeds',
    name: 'Hemp Seeds',
    category: 'supplement',
    calories: 553,
    protein: 31.6,
    carbs: 8.7,
    fiber: 4,
    vitamins: ['E', 'B1', 'B6'],
    minerals: ['Magnesium', 'Zinc', 'Iron'],
    benefits: ['Complete protein', 'Omega-3', 'Heart health'],
    allergens: [],
    goodFor: ['muscle-gain', 'heart-health', 'inflammation'],
    flavor: 'neutral'
  },
  {
    id: 'beetroot',
    name: 'Beetroot',
    category: 'vegetable',
    calories: 43,
    protein: 1.6,
    carbs: 9.6,
    fiber: 2.8,
    vitamins: ['C', 'Folate'],
    minerals: ['Potassium', 'Iron', 'Manganese'],
    benefits: ['Blood flow', 'Athletic performance', 'Blood pressure'],
    allergens: [],
    goodFor: ['athletic-performance', 'heart-health', 'energy'],
    flavor: 'earthy'
  },
  {
    id: 'goji-berry',
    name: 'Goji Berry',
    category: 'fruit',
    calories: 349,
    protein: 14.3,
    carbs: 77.1,
    fiber: 13,
    vitamins: ['A', 'C'],
    minerals: ['Iron', 'Zinc'],
    benefits: ['Eye health', 'Immune support', 'Anti-aging'],
    allergens: [],
    goodFor: ['immunity', 'skin-health', 'anti-aging'],
    flavor: 'sweet'
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    category: 'supplement',
    calories: 245,
    protein: 3.3,
    carbs: 49.9,
    fiber: 32.3,
    vitamins: [],
    minerals: ['Iron'],
    benefits: ['Stress reduction', 'Cortisol regulation', 'Energy'],
    allergens: [],
    goodFor: ['stress', 'anxiety', 'sleep', 'energy'],
    flavor: 'earthy'
  },
  {
    id: 'maca',
    name: 'Maca Powder',
    category: 'supplement',
    calories: 325,
    protein: 14,
    carbs: 71,
    fiber: 7,
    vitamins: ['C', 'B6'],
    minerals: ['Iron', 'Potassium', 'Copper'],
    benefits: ['Energy', 'Hormonal balance', 'Endurance'],
    allergens: [],
    goodFor: ['energy', 'athletic-performance', 'hormonal-health'],
    flavor: 'earthy'
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    category: 'fruit',
    calories: 83,
    protein: 1.7,
    carbs: 18.7,
    fiber: 4,
    vitamins: ['C', 'K'],
    minerals: ['Potassium'],
    benefits: ['Heart health', 'Anti-inflammatory', 'Antioxidants'],
    allergens: [],
    goodFor: ['heart-health', 'inflammation', 'immunity'],
    flavor: 'sweet'
  },
  {
    id: 'dragon-fruit',
    name: 'Dragon Fruit',
    category: 'fruit',
    calories: 60,
    protein: 1.2,
    carbs: 13,
    fiber: 3,
    vitamins: ['C'],
    minerals: ['Iron', 'Magnesium'],
    benefits: ['Digestion', 'Immune support', 'Skin health'],
    allergens: [],
    goodFor: ['digestion', 'immunity', 'skin-health'],
    flavor: 'tropical'
  },
  {
    id: 'collagen',
    name: 'Collagen Peptides',
    category: 'protein',
    calories: 360,
    protein: 90,
    carbs: 0,
    fiber: 0,
    vitamins: [],
    minerals: [],
    benefits: ['Skin elasticity', 'Joint health', 'Hair & nail strength'],
    allergens: [],
    goodFor: ['skin-health', 'joint-health', 'anti-aging'],
    flavor: 'neutral'
  }
];

export function getIngredientById(id: string): Ingredient | undefined {
  return ingredients.find(i => i.id === id);
}

export function getIngredientsByCategory(category: Ingredient['category']): Ingredient[] {
  return ingredients.filter(i => i.category === category);
}

export function getIngredientsByGoal(goal: string): Ingredient[] {
  return ingredients.filter(i => i.goodFor.includes(goal));
}

export function filterByAllergens(allergens: string[]): Ingredient[] {
  if (allergens.length === 0) return ingredients;
  return ingredients.filter(ingredient => 
    !ingredient.allergens.some(allergen => allergens.includes(allergen))
  );
}

// Pre-made smoothie catalog for weekly delivery
export interface CatalogSmoothie {
  id: string;
  name: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    fat: number;
  };
  instructions: string[];
  scientificExplanation: {
    overview: string;
    breakdown: Array<{ ingredient: string; benefit: string }>;
  };
  matchScore: number; // Will be calculated based on user profile
}

export const SMOOTHIE_CATALOG: CatalogSmoothie[] = [
  {
    id: 'green-power',
    name: 'Green Power Smoothie',
    description: 'Nutrient-dense green smoothie with spinach, avocado, and spirulina for sustained energy',
    ingredients: [
      { name: 'Spinach', amount: '50g' },
      { name: 'Avocado', amount: '50g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Spirulina', amount: '5g' },
      { name: 'Almond Milk', amount: '250ml' },
      { name: 'Chia Seeds', amount: '10g' }
    ],
    macros: { calories: 295, protein: 12, carbs: 38, fiber: 11, fat: 12 },
    instructions: ['Add all ingredients to blender', 'Blend until smooth', 'Serve immediately'],
    scientificExplanation: {
      overview: 'Rich in iron, antioxidants, and healthy fats for sustained energy',
      breakdown: [
        { ingredient: 'Spinach', benefit: 'High in iron and vitamins A, C, K' },
        { ingredient: 'Spirulina', benefit: 'Complete protein source with antioxidants' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast Antioxidant',
    description: 'Mixed berry smoothie packed with antioxidants and vitamin C',
    ingredients: [
      { name: 'Blueberry', amount: '75g' },
      { name: 'Strawberry', amount: '75g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Greek Yogurt', amount: '100g' },
      { name: 'Honey', amount: '10g' },
      { name: 'Coconut Water', amount: '200ml' }
    ],
    macros: { calories: 285, protein: 13, carbs: 55, fiber: 8, fat: 2 },
    instructions: ['Combine all ingredients', 'Blend on high speed', 'Enjoy chilled'],
    scientificExplanation: {
      overview: 'Powerful antioxidants from berries support immune function',
      breakdown: [
        { ingredient: 'Blueberries', benefit: 'Brain health and memory support' },
        { ingredient: 'Greek Yogurt', benefit: 'Probiotics for gut health' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'protein-power',
    name: 'Protein Power Builder',
    description: 'High-protein smoothie for muscle recovery and growth',
    ingredients: [
      { name: 'Pea Protein', amount: '30g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Peanut Butter', amount: '20g' },
      { name: 'Oat Milk', amount: '250ml' },
      { name: 'Cacao', amount: '10g' },
      { name: 'Hemp Seeds', amount: '10g' }
    ],
    macros: { calories: 420, protein: 32, carbs: 45, fiber: 10, fat: 15 },
    instructions: ['Add liquid first', 'Add remaining ingredients', 'Blend until creamy'],
    scientificExplanation: {
      overview: 'Complete protein profile with healthy fats for muscle recovery',
      breakdown: [
        { ingredient: 'Pea Protein', benefit: 'Plant-based complete protein' },
        { ingredient: 'Hemp Seeds', benefit: 'Omega-3 fatty acids' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'tropical-energy',
    name: 'Tropical Energy Boost',
    description: 'Mango and pineapple smoothie with natural energy boosters',
    ingredients: [
      { name: 'Mango', amount: '100g' },
      { name: 'Pineapple', amount: '100g' },
      { name: 'Banana', amount: '50g' },
      { name: 'Coconut Water', amount: '250ml' },
      { name: 'Maca Powder', amount: '5g' },
      { name: 'Ginger', amount: '5g' }
    ],
    macros: { calories: 245, protein: 4, carbs: 58, fiber: 7, fat: 1 },
    instructions: ['Blend all ingredients together', 'Add ice if desired', 'Serve fresh'],
    scientificExplanation: {
      overview: 'Natural sugars and adaptogens for quick, sustained energy',
      breakdown: [
        { ingredient: 'Maca', benefit: 'Enhances energy and endurance' },
        { ingredient: 'Ginger', benefit: 'Anti-inflammatory and digestive support' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'detox-green',
    name: 'Detox Green Cleanse',
    description: 'Cleansing green smoothie with cucumber, celery, and lemon',
    ingredients: [
      { name: 'Cucumber', amount: '100g' },
      { name: 'Celery', amount: '50g' },
      { name: 'Spinach', amount: '50g' },
      { name: 'Green Apple', amount: '100g' },
      { name: 'Lemon', amount: '15g' },
      { name: 'Coconut Water', amount: '250ml' }
    ],
    macros: { calories: 165, protein: 3, carbs: 38, fiber: 7, fat: 1 },
    instructions: ['Wash all produce thoroughly', 'Blend until smooth', 'Drink immediately'],
    scientificExplanation: {
      overview: 'Hydrating and alkalizing for natural detoxification',
      breakdown: [
        { ingredient: 'Cucumber', benefit: 'Hydration and skin health' },
        { ingredient: 'Lemon', benefit: 'Vitamin C and alkalizing properties' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'chocolate-dream',
    name: 'Chocolate Dream Smoothie',
    description: 'Indulgent cacao smoothie with mood-boosting properties',
    ingredients: [
      { name: 'Banana', amount: '100g' },
      { name: 'Cacao Powder', amount: '15g' },
      { name: 'Almond Butter', amount: '20g' },
      { name: 'Oat Milk', amount: '250ml' },
      { name: 'Dates', amount: '20g' },
      { name: 'Vanilla', amount: '2g' }
    ],
    macros: { calories: 385, protein: 11, carbs: 58, fiber: 12, fat: 15 },
    instructions: ['Soak dates briefly', 'Blend all ingredients', 'Enjoy as a nutritious smoothie'],
    scientificExplanation: {
      overview: 'Cacao provides mood-boosting compounds and antioxidants',
      breakdown: [
        { ingredient: 'Cacao', benefit: 'Natural mood enhancer with magnesium' },
        { ingredient: 'Dates', benefit: 'Natural sweetness with fiber' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'immune-boost',
    name: 'Immune Boost Citrus',
    description: 'Vitamin C-rich smoothie with orange, ginger, and turmeric',
    ingredients: [
      { name: 'Orange', amount: '150g' },
      { name: 'Mango', amount: '100g' },
      { name: 'Turmeric', amount: '5g' },
      { name: 'Ginger', amount: '5g' },
      { name: 'Coconut Water', amount: '200ml' },
      { name: 'Black Pepper', amount: '1g' }
    ],
    macros: { calories: 210, protein: 3, carbs: 50, fiber: 7, fat: 1 },
    instructions: ['Peel citrus and ginger', 'Blend until smooth', 'Add black pepper for absorption'],
    scientificExplanation: {
      overview: 'Powerful immune-supporting nutrients and anti-inflammatory compounds',
      breakdown: [
        { ingredient: 'Turmeric', benefit: 'Curcumin reduces inflammation' },
        { ingredient: 'Orange', benefit: 'High vitamin C for immune function' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'acai-power',
    name: 'Açaí Power Bowl Smoothie',
    description: 'Antioxidant-rich açaí smoothie with superfoods',
    ingredients: [
      { name: 'Açaí Berry', amount: '100g' },
      { name: 'Blueberry', amount: '75g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Almond Milk', amount: '200ml' },
      { name: 'Goji Berry', amount: '10g' },
      { name: 'Hemp Seeds', amount: '10g' }
    ],
    macros: { calories: 315, protein: 10, carbs: 52, fiber: 12, fat: 10 },
    instructions: ['Use frozen açaí for best texture', 'Blend until thick', 'Top with granola if desired'],
    scientificExplanation: {
      overview: 'Extremely high antioxidant content for cellular protection',
      breakdown: [
        { ingredient: 'Açaí', benefit: 'Highest ORAC value of any fruit' },
        { ingredient: 'Goji Berry', benefit: 'Vision and immune support' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'golden-turmeric',
    name: 'Golden Turmeric Latte Smoothie',
    description: 'Anti-inflammatory golden milk smoothie',
    ingredients: [
      { name: 'Banana', amount: '100g' },
      { name: 'Turmeric', amount: '7g' },
      { name: 'Ginger', amount: '5g' },
      { name: 'Cinnamon', amount: '3g' },
      { name: 'Oat Milk', amount: '250ml' },
      { name: 'Black Pepper', amount: '1g' }
    ],
    macros: { calories: 220, protein: 5, carbs: 42, fiber: 6, fat: 4 },
    instructions: ['Combine all spices', 'Blend with liquid and banana', 'Serve warm or cold'],
    scientificExplanation: {
      overview: 'Powerful anti-inflammatory properties for joint and overall health',
      breakdown: [
        { ingredient: 'Turmeric', benefit: 'Curcumin for inflammation' },
        { ingredient: 'Black Pepper', benefit: 'Increases curcumin absorption by 2000%' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'beetroot-energy',
    name: 'Beetroot Energy Enhancer',
    description: 'Pre-workout beetroot smoothie for performance',
    ingredients: [
      { name: 'Beetroot', amount: '100g' },
      { name: 'Strawberry', amount: '100g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Orange Juice', amount: '200ml' },
      { name: 'Ginger', amount: '5g' }
    ],
    macros: { calories: 255, protein: 5, carbs: 60, fiber: 9, fat: 1 },
    instructions: ['Use cooked or raw beetroot', 'Blend until smooth', 'Drink 1-2 hours before exercise'],
    scientificExplanation: {
      overview: 'Nitrates improve blood flow and athletic performance',
      breakdown: [
        { ingredient: 'Beetroot', benefit: 'Natural nitrates for endurance' },
        { ingredient: 'Strawberry', benefit: 'Antioxidants for recovery' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'stress-relief',
    name: 'Calm & Centered Stress Relief',
    description: 'Ashwagandha and berry smoothie to reduce stress and cortisol',
    ingredients: [
      { name: 'Blueberry', amount: '100g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Ashwagandha', amount: '5g' },
      { name: 'Almond Butter', amount: '15g' },
      { name: 'Almond Milk', amount: '250ml' },
      { name: 'Cinnamon', amount: '2g' }
    ],
    macros: { calories: 320, protein: 8, carbs: 48, fiber: 9, fat: 12 },
    instructions: ['Combine all ingredients', 'Blend until creamy', 'Enjoy during stressful moments'],
    scientificExplanation: {
      overview: 'Adaptogens help regulate stress hormones and promote mental balance',
      breakdown: [
        { ingredient: 'Ashwagandha', benefit: 'Reduces cortisol and anxiety' },
        { ingredient: 'Blueberry', benefit: 'Antioxidants support brain health' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'beauty-glow',
    name: 'Beauty Glow Collagen Boost',
    description: 'Collagen and berry smoothie for radiant skin and anti-aging',
    ingredients: [
      { name: 'Strawberry', amount: '100g' },
      { name: 'Pomegranate', amount: '75g' },
      { name: 'Collagen Peptides', amount: '15g' },
      { name: 'Greek Yogurt', amount: '100g' },
      { name: 'Coconut Water', amount: '200ml' },
      { name: 'Goji Berry', amount: '10g' }
    ],
    macros: { calories: 285, protein: 22, carbs: 42, fiber: 7, fat: 3 },
    instructions: ['Mix all ingredients', 'Blend on high', 'Best consumed in the morning'],
    scientificExplanation: {
      overview: 'Collagen and antioxidants support skin elasticity and cellular health',
      breakdown: [
        { ingredient: 'Collagen', benefit: 'Improves skin hydration and elasticity' },
        { ingredient: 'Pomegranate', benefit: 'Powerful antioxidants for anti-aging' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'matcha-focus',
    name: 'Matcha Mind Focus',
    description: 'Green tea matcha smoothie for mental clarity and sustained focus',
    ingredients: [
      { name: 'Matcha Powder', amount: '5g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Spinach', amount: '30g' },
      { name: 'Mango', amount: '75g' },
      { name: 'Oat Milk', amount: '250ml' },
      { name: 'Honey', amount: '10g' }
    ],
    macros: { calories: 275, protein: 7, carbs: 55, fiber: 6, fat: 3 },
    instructions: ['Whisk matcha with a bit of milk first', 'Add remaining ingredients', 'Blend until smooth'],
    scientificExplanation: {
      overview: 'L-theanine and caffeine work synergistically for calm focus',
      breakdown: [
        { ingredient: 'Matcha', benefit: 'L-theanine for calm alertness' },
        { ingredient: 'Spinach', benefit: 'Iron for cognitive function' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'dragon-fruit-hydration',
    name: 'Pink Dragon Hydration',
    description: 'Exotic dragon fruit smoothie for hydration and electrolytes',
    ingredients: [
      { name: 'Dragon Fruit', amount: '150g' },
      { name: 'Pineapple', amount: '100g' },
      { name: 'Lime', amount: '10g' },
      { name: 'Coconut Water', amount: '250ml' },
      { name: 'Mint', amount: '5g' },
      { name: 'Chia Seeds', amount: '10g' }
    ],
    macros: { calories: 225, protein: 5, carbs: 48, fiber: 10, fat: 3 },
    instructions: ['Freeze dragon fruit for best color', 'Blend all ingredients', 'Serve immediately for vibrant color'],
    scientificExplanation: {
      overview: 'Rich in electrolytes and fiber for optimal hydration',
      breakdown: [
        { ingredient: 'Dragon Fruit', benefit: 'Prebiotic fiber for gut health' },
        { ingredient: 'Coconut Water', benefit: 'Natural electrolytes' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'peanut-butter-delight',
    name: 'Peanut Butter Power',
    description: 'Creamy peanut butter smoothie with protein and healthy fats',
    ingredients: [
      { name: 'Peanut Butter', amount: '30g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Oats', amount: '40g' },
      { name: 'Protein Powder', amount: '25g' },
      { name: 'Almond Milk', amount: '250ml' },
      { name: 'Cinnamon', amount: '2g' }
    ],
    macros: { calories: 465, protein: 28, carbs: 52, fiber: 9, fat: 18 },
    instructions: ['Soak oats for 5 minutes', 'Blend all ingredients until creamy', 'Perfect post-workout meal'],
    scientificExplanation: {
      overview: 'Complete macronutrient profile for muscle recovery and satiety',
      breakdown: [
        { ingredient: 'Peanut Butter', benefit: 'Healthy fats and protein' },
        { ingredient: 'Oats', benefit: 'Slow-release carbohydrates' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'kale-detox',
    name: 'Kale Cleanse Detox',
    description: 'Alkalizing kale smoothie with apple and lemon',
    ingredients: [
      { name: 'Kale', amount: '60g' },
      { name: 'Green Apple', amount: '100g' },
      { name: 'Cucumber', amount: '75g' },
      { name: 'Lemon', amount: '15g' },
      { name: 'Ginger', amount: '5g' },
      { name: 'Coconut Water', amount: '250ml' }
    ],
    macros: { calories: 155, protein: 4, carbs: 35, fiber: 7, fat: 1 },
    instructions: ['Remove kale stems', 'Blend greens first with liquid', 'Add fruits and blend again'],
    scientificExplanation: {
      overview: 'Chlorophyll and antioxidants support natural detoxification',
      breakdown: [
        { ingredient: 'Kale', benefit: 'High in vitamins A, K, C and antioxidants' },
        { ingredient: 'Lemon', benefit: 'Alkalizing and vitamin C' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'cherry-recovery',
    name: 'Cherry Recovery Blend',
    description: 'Tart cherry smoothie for muscle recovery and better sleep',
    ingredients: [
      { name: 'Tart Cherry', amount: '150g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Greek Yogurt', amount: '100g' },
      { name: 'Almond Milk', amount: '200ml' },
      { name: 'Vanilla Extract', amount: '2g' },
      { name: 'Honey', amount: '10g' }
    ],
    macros: { calories: 315, protein: 15, carbs: 58, fiber: 6, fat: 3 },
    instructions: ['Use frozen cherries', 'Blend until smooth', 'Drink before bed for better sleep'],
    scientificExplanation: {
      overview: 'Natural melatonin and anti-inflammatory compounds aid recovery',
      breakdown: [
        { ingredient: 'Tart Cherry', benefit: 'Natural melatonin for sleep quality' },
        { ingredient: 'Greek Yogurt', benefit: 'Casein protein for overnight recovery' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'avocado-creamy',
    name: 'Creamy Avocado Dream',
    description: 'Ultra-creamy avocado smoothie with healthy fats',
    ingredients: [
      { name: 'Avocado', amount: '100g' },
      { name: 'Banana', amount: '100g' },
      { name: 'Spinach', amount: '40g' },
      { name: 'Lime', amount: '10g' },
      { name: 'Coconut Water', amount: '250ml' },
      { name: 'Hemp Seeds', amount: '15g' }
    ],
    macros: { calories: 340, protein: 9, carbs: 38, fiber: 12, fat: 18 },
    instructions: ['Scoop avocado from skin', 'Blend with liquid first', 'Add remaining ingredients'],
    scientificExplanation: {
      overview: 'Monounsaturated fats support heart health and nutrient absorption',
      breakdown: [
        { ingredient: 'Avocado', benefit: 'Healthy fats for satiety and heart health' },
        { ingredient: 'Hemp Seeds', benefit: 'Complete plant protein and omega-3' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'ginger-digestive',
    name: 'Ginger Digestive Aid',
    description: 'Soothing ginger and papaya smoothie for digestive comfort',
    ingredients: [
      { name: 'Papaya', amount: '150g' },
      { name: 'Pineapple', amount: '100g' },
      { name: 'Ginger', amount: '10g' },
      { name: 'Mint', amount: '5g' },
      { name: 'Coconut Water', amount: '200ml' },
      { name: 'Lime', amount: '10g' }
    ],
    macros: { calories: 195, protein: 3, carbs: 47, fiber: 6, fat: 1 },
    instructions: ['Peel and seed papaya', 'Blend all ingredients', 'Best consumed after meals'],
    scientificExplanation: {
      overview: 'Digestive enzymes and anti-inflammatory compounds soothe the gut',
      breakdown: [
        { ingredient: 'Papaya', benefit: 'Papain enzyme aids protein digestion' },
        { ingredient: 'Ginger', benefit: 'Reduces nausea and inflammation' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'mocha-energizer',
    name: 'Mocha Morning Energizer',
    description: 'Coffee-infused chocolate smoothie for morning energy',
    ingredients: [
      { name: 'Cold Brew Coffee', amount: '150ml' },
      { name: 'Banana', amount: '100g' },
      { name: 'Cacao Powder', amount: '15g' },
      { name: 'Oat Milk', amount: '150ml' },
      { name: 'Dates', amount: '20g' },
      { name: 'Protein Powder', amount: '20g' }
    ],
    macros: { calories: 330, protein: 20, carbs: 52, fiber: 10, fat: 5 },
    instructions: ['Brew coffee and cool', 'Blend all ingredients', 'Perfect morning meal replacement'],
    scientificExplanation: {
      overview: 'Caffeine and protein provide sustained energy and focus',
      breakdown: [
        { ingredient: 'Coffee', benefit: 'Natural caffeine for alertness' },
        { ingredient: 'Cacao', benefit: 'Theobromine for mood and energy' }
      ]
    },
    matchScore: 50
  },
  {
    id: 'peach-glow',
    name: 'Peachy Keen Radiance',
    description: 'Creamy peach smoothie with vanilla and probiotics for gut and skin health',
    ingredients: [
      { name: 'Peach', amount: '200g' },
      { name: 'Kefir', amount: '150ml' },
      { name: 'Oats', amount: '30g' },
      { name: 'Flax Seeds', amount: '10g' },
      { name: 'Vanilla Extract', amount: '3g' },
      { name: 'Cinnamon', amount: '2g' }
    ],
    macros: { calories: 295, protein: 11, carbs: 48, fiber: 9, fat: 7 },
    instructions: ['Use frozen or fresh peaches', 'Blend until silky smooth', 'Best consumed for breakfast'],
    scientificExplanation: {
      overview: 'Probiotics and soluble fiber support gut microbiome and skin radiance',
      breakdown: [
        { ingredient: 'Kefir', benefit: 'Probiotic cultures for digestive and immune health' },
        { ingredient: 'Flax Seeds', benefit: 'Omega-3 and lignans for skin health' }
      ]
    },
    matchScore: 50
  }
];
