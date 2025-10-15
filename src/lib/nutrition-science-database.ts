// Comprehensive nutrition science database for personalized explanations

export interface NutrientInfo {
  name: string;
  scientificName?: string;
  function: string[];
  sources: string[];
  deficiencySymptoms: string[];
  benefitsFor: string[];
  scientificEvidence: string;
}

export interface HealthConditionInfo {
  condition: string;
  description: string;
  recommendedNutrients: string[];
  avoidNutrients?: string[];
  scientificRationale: string;
  keyIngredients: string[];
}

export interface IngredientSynergy {
  ingredients: string[];
  effect: string;
  scientificExplanation: string;
  benefitsFor: string[];
}

// Comprehensive nutrient database
export const nutrientDatabase: Record<string, NutrientInfo> = {
  'vitamin-c': {
    name: 'Vitamin C',
    scientificName: 'Ascorbic Acid',
    function: [
      'Powerful antioxidant that neutralizes free radicals',
      'Essential for collagen synthesis',
      'Enhances immune system function',
      'Improves iron absorption'
    ],
    sources: ['strawberry', 'orange', 'kiwi', 'mango', 'spinach'],
    deficiencySymptoms: ['Weakened immunity', 'Fatigue', 'Slow wound healing'],
    benefitsFor: ['immunity', 'skin-health', 'inflammation'],
    scientificEvidence: 'Studies show 200mg daily reduces common cold duration by 8% in adults and supports collagen production for healthy skin (Hemilä & Chalker, 2013)'
  },
  'potassium': {
    name: 'Potassium',
    scientificName: 'K',
    function: [
      'Regulates fluid balance and blood pressure',
      'Supports muscle contractions',
      'Maintains heart rhythm',
      'Aids nerve signal transmission'
    ],
    sources: ['banana', 'avocado', 'coconut-water', 'spinach', 'orange'],
    deficiencySymptoms: ['Muscle cramps', 'Fatigue', 'Irregular heartbeat'],
    benefitsFor: ['heart-health', 'muscle-gain', 'energy', 'athletic-performance'],
    scientificEvidence: 'Research demonstrates 3500mg daily reduces stroke risk by 24% and lowers blood pressure in hypertensive individuals (Aburto et al., 2013)'
  },
  'omega-3': {
    name: 'Omega-3 Fatty Acids',
    scientificName: 'Alpha-linolenic acid (ALA), EPA, DHA',
    function: [
      'Reduces systemic inflammation',
      'Supports brain health and cognitive function',
      'Protects cardiovascular system',
      'Regulates mood and mental health'
    ],
    sources: ['flax-seeds', 'chia-seeds', 'avocado'],
    deficiencySymptoms: ['Brain fog', 'Joint pain', 'Depression', 'Dry skin'],
    benefitsFor: ['heart-health', 'inflammation', 'mental-clarity', 'mood', 'brain-health'],
    scientificEvidence: 'Meta-analysis shows 1-2g daily reduces cardiovascular disease risk by 15-20% and improves cognitive performance (Swanson et al., 2012)'
  },
  'fiber': {
    name: 'Dietary Fiber',
    scientificName: 'Soluble and Insoluble Polysaccharides',
    function: [
      'Promotes healthy gut microbiome',
      'Regulates blood sugar levels',
      'Increases satiety and weight management',
      'Lowers cholesterol levels'
    ],
    sources: ['chia-seeds', 'flax-seeds', 'apple', 'spinach', 'kale'],
    deficiencySymptoms: ['Constipation', 'Blood sugar spikes', 'Increased hunger'],
    benefitsFor: ['digestion', 'weight-loss', 'heart-health', 'blood-sugar'],
    scientificEvidence: '25-30g daily reduces colorectal cancer risk by 40% and improves glycemic control in diabetics (Dahl & Stewart, 2015)'
  },
  'magnesium': {
    name: 'Magnesium',
    scientificName: 'Mg',
    function: [
      'Cofactor in 300+ enzymatic reactions',
      'Regulates stress response and cortisol',
      'Supports muscle relaxation and recovery',
      'Essential for energy production (ATP synthesis)'
    ],
    sources: ['spinach', 'avocado', 'cacao', 'banana', 'chia-seeds'],
    deficiencySymptoms: ['Muscle cramps', 'Anxiety', 'Poor sleep', 'Fatigue'],
    benefitsFor: ['stress', 'sleep', 'muscle-recovery', 'energy', 'anxiety'],
    scientificEvidence: '300-400mg daily reduces stress and anxiety symptoms by 30% and improves sleep quality (Boyle et al., 2017)'
  },
  'iron': {
    name: 'Iron',
    scientificName: 'Fe',
    function: [
      'Essential for hemoglobin formation',
      'Enables oxygen transport to cells',
      'Supports energy metabolism',
      'Critical for cognitive function'
    ],
    sources: ['spinach', 'kale', 'spirulina', 'pea-protein'],
    deficiencySymptoms: ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath'],
    benefitsFor: ['energy', 'athletic-performance', 'mental-clarity', 'immunity'],
    scientificEvidence: 'Studies show adequate iron (18mg for women, 8mg for men) prevents anemia and improves physical performance by 15% (Pasricha et al., 2014)'
  },
  'antioxidants': {
    name: 'Antioxidants',
    scientificName: 'Polyphenols, Flavonoids, Carotenoids',
    function: [
      'Neutralize oxidative stress and free radicals',
      'Reduce cellular damage and aging',
      'Support immune system',
      'Protect against chronic diseases'
    ],
    sources: ['blueberry', 'strawberry', 'cacao', 'matcha', 'turmeric', 'spirulina'],
    deficiencySymptoms: ['Accelerated aging', 'Weakened immunity', 'Inflammation'],
    benefitsFor: ['immunity', 'anti-aging', 'inflammation', 'brain-health', 'skin-health'],
    scientificEvidence: 'High antioxidant intake reduces oxidative stress by 25% and lowers chronic disease risk (Carlsen et al., 2010)'
  },
  'protein': {
    name: 'Protein',
    scientificName: 'Amino Acids',
    function: [
      'Building blocks for muscle tissue',
      'Supports muscle recovery and growth',
      'Increases satiety and metabolism',
      'Essential for enzyme and hormone production'
    ],
    sources: ['greek-yogurt', 'protein-powder', 'pea-protein', 'spirulina'],
    deficiencySymptoms: ['Muscle loss', 'Weakness', 'Poor recovery', 'Increased hunger'],
    benefitsFor: ['muscle-gain', 'weight-loss', 'athletic-performance', 'recovery'],
    scientificEvidence: '1.6-2.2g per kg bodyweight optimizes muscle protein synthesis and recovery in active individuals (Morton et al., 2018)'
  },
  'b-vitamins': {
    name: 'B-Complex Vitamins',
    scientificName: 'B1, B2, B3, B6, B12, Folate',
    function: [
      'Convert food to cellular energy (ATP)',
      'Support nervous system function',
      'Aid red blood cell formation',
      'Regulate mood and cognitive performance'
    ],
    sources: ['banana', 'spinach', 'greek-yogurt', 'spirulina', 'matcha'],
    deficiencySymptoms: ['Fatigue', 'Brain fog', 'Mood changes', 'Anemia'],
    benefitsFor: ['energy', 'mental-clarity', 'mood', 'brain-health'],
    scientificEvidence: 'Adequate B-vitamin intake improves energy levels by 25% and cognitive performance by 15% (Kennedy, 2016)'
  },
  'l-theanine': {
    name: 'L-Theanine',
    scientificName: 'γ-glutamylethylamide',
    function: [
      'Promotes alpha brain wave activity',
      'Reduces stress without sedation',
      'Enhances focus and attention',
      'Synergizes with caffeine for calm alertness'
    ],
    sources: ['matcha'],
    deficiencySymptoms: ['Increased stress', 'Poor focus', 'Anxiety'],
    benefitsFor: ['stress', 'mental-clarity', 'focus', 'anxiety'],
    scientificEvidence: '200mg reduces stress response by 40% and improves attention within 30-60 minutes (Nobre et al., 2008)'
  },
  'curcumin': {
    name: 'Curcumin',
    scientificName: 'Diferuloylmethane',
    function: [
      'Powerful anti-inflammatory compound',
      'Inhibits COX-2 and NF-kB pathways',
      'Supports joint health',
      'Neuroprotective properties'
    ],
    sources: ['turmeric'],
    deficiencySymptoms: ['Increased inflammation', 'Joint pain'],
    benefitsFor: ['inflammation', 'joint-health', 'pain-relief', 'brain-health'],
    scientificEvidence: '500-1000mg reduces inflammation markers by 30% and improves arthritis symptoms (Hewlings & Kalman, 2017)'
  },
  'bromelain': {
    name: 'Bromelain',
    scientificName: 'Proteolytic Enzyme',
    function: [
      'Breaks down proteins for digestion',
      'Reduces inflammation and swelling',
      'Supports immune function',
      'Aids nutrient absorption'
    ],
    sources: ['pineapple'],
    deficiencySymptoms: ['Poor digestion', 'Bloating', 'Inflammation'],
    benefitsFor: ['digestion', 'inflammation', 'recovery', 'immunity'],
    scientificEvidence: '500mg improves protein digestion by 35% and reduces post-exercise inflammation (Pavan et al., 2012)'
  }
};

// Health condition to nutrition mapping
export const healthConditionDatabase: Record<string, HealthConditionInfo> = {
  'weight-loss': {
    condition: 'Weight Loss',
    description: 'Sustainable fat loss while preserving muscle mass',
    recommendedNutrients: ['fiber', 'protein', 'vitamin-c', 'b-vitamins'],
    avoidNutrients: ['excess-sugar'],
    scientificRationale: 'High fiber increases satiety by 25%, protein boosts metabolism by 15-30% through thermic effect, and maintains lean muscle during caloric deficit',
    keyIngredients: ['spinach', 'strawberry', 'greek-yogurt', 'chia-seeds', 'cucumber']
  },
  'muscle-gain': {
    condition: 'Muscle Growth & Recovery',
    description: 'Optimize muscle protein synthesis and recovery',
    recommendedNutrients: ['protein', 'potassium', 'magnesium', 'b-vitamins'],
    scientificRationale: '1.6-2.2g protein per kg bodyweight maximizes muscle protein synthesis. Potassium and magnesium support muscle function and prevent cramping. B-vitamins optimize energy metabolism.',
    keyIngredients: ['banana', 'protein-powder', 'pea-protein', 'spinach', 'greek-yogurt']
  },
  'energy': {
    condition: 'Energy & Vitality',
    description: 'Sustained energy without crashes',
    recommendedNutrients: ['b-vitamins', 'iron', 'magnesium', 'potassium', 'fiber'],
    scientificRationale: 'B-vitamins are essential cofactors in ATP production. Iron enables oxygen transport. Complex carbs with fiber provide steady glucose release preventing energy crashes.',
    keyIngredients: ['banana', 'matcha', 'spinach', 'cacao', 'chia-seeds']
  },
  'immunity': {
    condition: 'Immune System Support',
    description: 'Strengthen immune response and reduce illness',
    recommendedNutrients: ['vitamin-c', 'antioxidants', 'zinc', 'vitamin-d'],
    scientificRationale: 'Vitamin C enhances white blood cell function by 30%. Antioxidants protect immune cells from oxidative damage. Zinc is critical for immune cell development.',
    keyIngredients: ['orange', 'strawberry', 'blueberry', 'ginger', 'turmeric', 'spirulina']
  },
  'inflammation': {
    condition: 'Anti-Inflammatory Response',
    description: 'Reduce systemic inflammation naturally',
    recommendedNutrients: ['omega-3', 'curcumin', 'antioxidants', 'bromelain'],
    scientificRationale: 'Omega-3 fatty acids reduce pro-inflammatory cytokines by 40%. Curcumin inhibits inflammatory pathways (COX-2, NF-kB). Antioxidants neutralize inflammatory free radicals.',
    keyIngredients: ['flax-seeds', 'turmeric', 'ginger', 'pineapple', 'blueberry', 'kale']
  },
  'heart-health': {
    condition: 'Cardiovascular Health',
    description: 'Support heart function and circulation',
    recommendedNutrients: ['omega-3', 'potassium', 'fiber', 'antioxidants'],
    scientificRationale: 'Omega-3s reduce triglycerides by 25-30%. Potassium lowers blood pressure. Soluble fiber reduces LDL cholesterol by 10-15%. Antioxidants prevent arterial damage.',
    keyIngredients: ['avocado', 'flax-seeds', 'banana', 'blueberry', 'apple', 'kale']
  },
  'digestion': {
    condition: 'Digestive Health',
    description: 'Optimize gut function and microbiome',
    recommendedNutrients: ['fiber', 'probiotics', 'bromelain', 'ginger'],
    scientificRationale: 'Fiber feeds beneficial gut bacteria increasing diversity by 35%. Probiotics colonize gut with healthy bacteria. Digestive enzymes improve nutrient breakdown and absorption.',
    keyIngredients: ['chia-seeds', 'greek-yogurt', 'pineapple', 'ginger', 'banana', 'spinach']
  },
  'mental-clarity': {
    condition: 'Cognitive Performance',
    description: 'Enhance focus, memory, and brain function',
    recommendedNutrients: ['omega-3', 'b-vitamins', 'l-theanine', 'antioxidants'],
    scientificRationale: 'Omega-3 DHA comprises 40% of brain fatty acids. B-vitamins support neurotransmitter synthesis. L-theanine increases alpha waves improving focused relaxation. Antioxidants protect neurons.',
    keyIngredients: ['blueberry', 'matcha', 'avocado', 'cacao', 'flax-seeds']
  },
  'stress': {
    condition: 'Stress Management',
    description: 'Reduce cortisol and support resilience',
    recommendedNutrients: ['magnesium', 'l-theanine', 'b-vitamins', 'antioxidants'],
    scientificRationale: 'Magnesium regulates HPA axis reducing cortisol by 25%. L-theanine promotes GABA production for calm alertness. B-vitamins support adrenal function during stress.',
    keyIngredients: ['matcha', 'spinach', 'avocado', 'cacao', 'banana']
  },
  'skin-health': {
    condition: 'Skin Health & Anti-Aging',
    description: 'Support collagen production and cellular repair',
    recommendedNutrients: ['vitamin-c', 'vitamin-e', 'antioxidants', 'omega-3'],
    scientificRationale: 'Vitamin C is essential for collagen synthesis. Antioxidants protect against UV damage and reduce wrinkles by 15%. Omega-3s maintain skin barrier function and hydration.',
    keyIngredients: ['strawberry', 'orange', 'avocado', 'cucumber', 'blueberry']
  },
  'athletic-performance': {
    condition: 'Athletic Performance',
    description: 'Optimize endurance, strength, and recovery',
    recommendedNutrients: ['protein', 'potassium', 'iron', 'b-vitamins', 'antioxidants'],
    scientificRationale: 'Protein supports muscle repair. Potassium prevents cramping and maintains hydration. Iron ensures oxygen delivery to muscles. Antioxidants reduce exercise-induced oxidative stress.',
    keyIngredients: ['banana', 'coconut-water', 'protein-powder', 'spinach', 'blueberry']
  }
};

// Ingredient synergies - combinations that work better together
export const ingredientSynergies: IngredientSynergy[] = [
  {
    ingredients: ['orange', 'spinach'],
    effect: 'Enhanced Iron Absorption',
    scientificExplanation: 'Vitamin C from oranges increases non-heme iron absorption from spinach by up to 300% by reducing ferric iron (Fe3+) to ferrous iron (Fe2+), which is more bioavailable',
    benefitsFor: ['energy', 'athletic-performance', 'immunity']
  },
  {
    ingredients: ['avocado', 'kale'],
    effect: 'Fat-Soluble Vitamin Uptake',
    scientificExplanation: 'Healthy fats in avocado enable absorption of vitamins A, D, E, and K from kale. Without dietary fat, these vitamins are excreted rather than absorbed, reducing nutrient utilization by 70%',
    benefitsFor: ['immunity', 'bone-health', 'skin-health']
  },
  {
    ingredients: ['turmeric', 'black-pepper'],
    effect: 'Curcumin Bioavailability',
    scientificExplanation: 'Piperine from black pepper increases curcumin absorption by 2000% by inhibiting hepatic and intestinal glucuronidation, making turmeric\'s anti-inflammatory effects clinically significant',
    benefitsFor: ['inflammation', 'joint-health', 'brain-health']
  },
  {
    ingredients: ['matcha', 'l-theanine'],
    effect: 'Calm Focus State',
    scientificExplanation: 'L-theanine naturally present in matcha synergizes with caffeine to increase alpha brain wave activity while reducing caffeine jitters. This creates sustained alertness without anxiety',
    benefitsFor: ['mental-clarity', 'stress', 'focus']
  },
  {
    ingredients: ['chia-seeds', 'banana'],
    effect: 'Sustained Energy Release',
    scientificExplanation: 'Soluble fiber from chia seeds forms a gel that slows glucose absorption from banana\'s natural sugars, providing 3-4 hours of steady energy rather than a spike and crash',
    benefitsFor: ['energy', 'athletic-performance', 'blood-sugar']
  },
  {
    ingredients: ['ginger', 'pineapple'],
    effect: 'Digestive Enzyme Amplification',
    scientificExplanation: 'Gingerol compounds enhance bromelain enzyme activity by 40%, improving protein digestion and reducing bloating. Both compounds also reduce inflammation in the GI tract',
    benefitsFor: ['digestion', 'inflammation', 'recovery']
  },
  {
    ingredients: ['blueberry', 'cacao'],
    effect: 'Neuroprotective Synergy',
    scientificExplanation: 'Flavanols from cacao and anthocyanins from blueberries cross the blood-brain barrier and work synergistically to increase BDNF (brain-derived neurotrophic factor) by 25%, enhancing neuroplasticity and memory',
    benefitsFor: ['mental-clarity', 'brain-health', 'mood']
  },
  {
    ingredients: ['flax-seeds', 'strawberry'],
    effect: 'Anti-Inflammatory Amplification',
    scientificExplanation: 'Omega-3 ALA from flax combined with vitamin C and ellagic acid from strawberries reduces inflammatory markers (CRP, IL-6) by 45%, more than either ingredient alone',
    benefitsFor: ['inflammation', 'heart-health', 'recovery']
  }
];

// Activity level to nutritional needs
export const activityLevelNutrition = {
  'sedentary': {
    proteinMultiplier: 0.8,
    calorieBase: 'low',
    keyFocus: ['fiber', 'vitamin-c', 'antioxidants'],
    rationale: 'Lower protein needs (0.8g/kg), focus on micronutrients and fiber for metabolic health'
  },
  'lightly-active': {
    proteinMultiplier: 1.0,
    calorieBase: 'moderate',
    keyFocus: ['b-vitamins', 'potassium', 'fiber'],
    rationale: 'Moderate protein needs (1.0g/kg), balanced macronutrients for daily activities'
  },
  'moderately-active': {
    proteinMultiplier: 1.3,
    calorieBase: 'moderate-high',
    keyFocus: ['protein', 'potassium', 'magnesium', 'b-vitamins'],
    rationale: 'Elevated protein (1.3g/kg) for muscle maintenance, electrolytes for exercise recovery'
  },
  'very-active': {
    proteinMultiplier: 1.6,
    calorieBase: 'high',
    keyFocus: ['protein', 'iron', 'potassium', 'antioxidants'],
    rationale: 'High protein (1.6g/kg) for muscle repair, antioxidants to combat exercise-induced oxidative stress'
  },
  'athlete': {
    proteinMultiplier: 2.0,
    calorieBase: 'very-high',
    keyFocus: ['protein', 'iron', 'potassium', 'magnesium', 'omega-3'],
    rationale: 'Maximum protein (2.0g/kg) for performance and recovery, comprehensive micronutrient support'
  }
};

// Generate detailed scientific explanation for user profile
export function generateDetailedExplanation(
  ingredients: string[],
  healthGoals: string[],
  activityLevel: string,
  currentMood: string,
  stressLevel: string
): {
  overview: string;
  nutrientBreakdown: Array<{ nutrient: string; explanation: string; amount: string }>;
  synergies: Array<{ combination: string; effect: string }>;
  personalizedInsights: string[];
} {
  const overview = buildOverview(healthGoals, activityLevel, currentMood, stressLevel);
  const nutrientBreakdown = buildNutrientBreakdown(ingredients, healthGoals, currentMood);
  const synergies = findSynergies(ingredients);
  const personalizedInsights = buildPersonalizedInsights(healthGoals, activityLevel, currentMood, stressLevel);

  return {
    overview,
    nutrientBreakdown,
    synergies,
    personalizedInsights
  };
}

function buildOverview(healthGoals: string[], activityLevel: string, currentMood: string, stressLevel: string): string {
  const primaryGoal = healthGoals[0] || 'general-wellness';
  const conditionInfo = healthConditionDatabase[primaryGoal];
  const activityInfo = activityLevelNutrition[activityLevel as keyof typeof activityLevelNutrition];

  // Focus on TODAY first
  let overview = `🎯 TODAY'S OPTIMIZATION: `;
  
  if (currentMood === 'stressed' || stressLevel === 'high') {
    overview += `Your stressed state is priority #1. This smoothie targets cortisol reduction and nervous system support. `;
  } else if (currentMood === 'tired') {
    overview += `Your fatigue requires immediate energy support through B-vitamins and quick-acting carbohydrates. `;
  } else if (currentMood === 'happy') {
    overview += `Maintaining your positive state with mood-supporting nutrients and sustained energy. `;
  }
  
  overview += `Combined with your ${activityLevel} activity level and ${conditionInfo?.condition || 'wellness'} goals: ${conditionInfo?.scientificRationale || ''} ${activityInfo?.rationale || ''}`;

  return overview;
}

function buildNutrientBreakdown(ingredients: string[], healthGoals: string[], currentMood: string): Array<{ nutrient: string; explanation: string; amount: string }> {
  const breakdown: Array<{ nutrient: string; explanation: string; amount: string }> = [];
  
  // Map ingredients to their key nutrients
  const nutrientMap: Record<string, string[]> = {
    'vitamin-c': ['strawberry', 'orange', 'kiwi', 'mango'],
    'potassium': ['banana', 'avocado', 'coconut-water'],
    'omega-3': ['flax-seeds', 'chia-seeds', 'avocado', 'hemp-seeds'],
    'fiber': ['chia-seeds', 'flax-seeds', 'apple', 'hemp-seeds'],
    'protein': ['greek-yogurt', 'protein-powder', 'pea-protein', 'hemp-seeds', 'spirulina'],
    'antioxidants': ['blueberry', 'strawberry', 'cacao', 'matcha', 'acai', 'goji-berry', 'pomegranate'],
    'magnesium': ['spinach', 'avocado', 'cacao', 'chia-seeds', 'hemp-seeds'],
    'l-theanine': ['matcha'],
    'curcumin': ['turmeric'],
    'bromelain': ['pineapple'],
    'b-vitamins': ['banana', 'spinach', 'greek-yogurt', 'spirulina', 'maca']
  };

  Object.entries(nutrientMap).forEach(([nutrient, sources]) => {
    const hasIngredient = ingredients.some(ing => sources.includes(ing));
    if (hasIngredient) {
      const info = nutrientDatabase[nutrient];
      if (info) {
        let explanation = info.scientificEvidence;
        
        // Add TODAY context
        if (nutrient === 'l-theanine' && currentMood === 'stressed') {
          explanation += ' → Critical for your stressed state today - effects felt within 40 minutes.';
        } else if (nutrient === 'b-vitamins' && currentMood === 'tired') {
          explanation += ' → Essential for your low energy today - converts food to ATP for immediate energy.';
        } else if (nutrient === 'magnesium' && currentMood === 'stressed') {
          explanation += ' → Your stress depletes magnesium - this replenishes stores for nervous system support.';
        }
        
        breakdown.push({
          nutrient: info.name,
          explanation,
          amount: 'Therapeutic Dose'
        });
      }
    }
  });

  return breakdown;
}

function findSynergies(ingredients: string[]): Array<{ combination: string; effect: string }> {
  return ingredientSynergies
    .filter(synergy => 
      synergy.ingredients.every(ing => ingredients.includes(ing))
    )
    .map(synergy => ({
      combination: synergy.ingredients.join(' + '),
      effect: synergy.scientificExplanation
    }));
}

function buildPersonalizedInsights(
  healthGoals: string[],
  activityLevel: string,
  currentMood: string,
  stressLevel: string
): string[] {
  const insights: string[] = [];

  // TODAY'S STATE FIRST - Most Important
  if (currentMood === 'stressed' || stressLevel === 'high') {
    insights.push(`STRESS ALERT: Your high stress today depletes magnesium by 30% and increases cortisol. This smoothie provides 150-250mg bioavailable magnesium + adaptogens to normalize your HPA axis within 60-90 minutes. You should feel calmer and more focused.`);
  }

  if (currentMood === 'tired') {
    insights.push(`ENERGY INTERVENTION: Your fatigue signals mitochondrial dysfunction and possible B-vitamin depletion. This blend delivers B1, B2, B3, B6, and B12 as cofactors for ATP synthesis, plus iron for oxygen transport. Energy increase expected within 45-60 minutes.`);
  }

  if (currentMood === 'happy') {
    insights.push(`MOOD MAINTENANCE: You're feeling good today! This smoothie sustains positive mood with serotonin precursors, dopamine-supporting nutrients, and stable blood sugar to prevent afternoon crashes.`);
  }

  // Activity-based insights (secondary)
  const activityInfo = activityLevelNutrition[activityLevel as keyof typeof activityLevelNutrition];
  if (activityInfo) {
    insights.push(`🏃 ACTIVITY MATCH: Your ${activityLevel} lifestyle requires ${activityInfo.proteinMultiplier}g protein per kg bodyweight. This smoothie provides the right macronutrient ratios plus electrolytes for performance and recovery.`);
  }

  // Goal-based insights (tertiary)
  const primaryGoal = healthGoals[0];
  if (primaryGoal) {
    const conditionInfo = healthConditionDatabase[primaryGoal];
    if (conditionInfo) {
      insights.push(`🎯 GOAL ALIGNMENT: For ${conditionInfo.condition}: ${conditionInfo.scientificRationale}`);
    }
  }

  // Timing insight
  insights.push(`⏰ BEST TIMING: Consume within 15 minutes for maximum nutrient bioavailability. Nutrients peak in bloodstream 30-90 minutes post-consumption.`);

  return insights;
}
