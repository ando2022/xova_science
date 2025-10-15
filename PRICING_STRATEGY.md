# XOVA Pricing Strategy & Cost Management

## Current Pricing Structure
- **7-day plan**: CHF 12 per smoothie (CHF 84 total)
- **14-day plan**: CHF 11 per smoothie (CHF 154 total)
- **Free delivery** on both plans

## Target Profit Margins
- **Minimum margin**: 60% (CHF 7.20 profit per CHF 12 smoothie)
- **Maximum ingredient cost**: CHF 4.80 per smoothie (40% of selling price)
- **Labor cost**: CHF 2.00 per smoothie
- **Available for ingredients**: CHF 2.80 per smoothie

## Proposed Ingredient Tiers

### Tier 1: Base Ingredients (Included in CHF 12/11)
**Cost cap: CHF 2.80 per smoothie**
- Fresh fruits (banana, apple, orange, berries)
- Basic vegetables (spinach, kale, cucumber)
- Standard liquids (water, almond milk, coconut milk)
- Basic protein powder (whey or plant-based)
- Natural sweeteners (honey, dates)

### Tier 2: Premium Ingredients (Additional CHF 2-3)
**Superfoods & Specialty Items**
- Acai, goji berries, spirulina
- Maca powder, cacao powder, turmeric
- Chia seeds, hemp seeds, flax seeds
- Organic specialty fruits
- Premium protein powders

### Tier 3: Luxury Ingredients (Additional CHF 4-5)
**Rare & Expensive Superfoods**
- Rare berries (maqui, camu camu)
- Premium adaptogens (ashwagandha, reishi)
- Luxury nuts (macadamia, pine nuts)
- Exotic fruits (dragon fruit, passion fruit)

## Recommended Pricing Model

### Option 1: Tiered Pricing (Recommended)
```
Base Smoothie (Tier 1 only): CHF 12/11
Premium Smoothie (+ Tier 2): CHF 15/14
Luxury Smoothie (+ Tier 3): CHF 18/17
```

### Option 2: Add-On Model
```
Base Smoothie: CHF 12/11
+ Premium Superfoods: +CHF 2-3
+ Luxury Superfoods: +CHF 4-5
```

### Option 3: Category-Based Pricing
```
Energy Boost: CHF 12/11 (basic ingredients)
Recovery Blend: CHF 14/13 (includes protein + basic superfoods)
Superfood Power: CHF 16/15 (includes premium superfoods)
```

## Cost Management Rules

### Maximum Ingredient Quantities (Per Smoothie)
- **Fruits**: 150g total (CHF 1.50 max)
- **Vegetables**: 80g total (CHF 0.80 max)
- **Protein powder**: 30g (CHF 0.75 max)
- **Liquid base**: 200ml (CHF 0.30 max)
- **Sweeteners**: 15g (CHF 0.12 max)
- **Total base cost**: CHF 3.47 max

### Superfood Add-Ons
- **Tier 2 additions**: +CHF 2-3 per smoothie
- **Tier 3 additions**: +CHF 4-5 per smoothie

## Implementation Strategy

### 1. Hide Cost Information from Users
- Remove all cost breakdown displays
- Show only "Premium" or "Luxury" badges
- Focus on health benefits and nutrition

### 2. Smart Recipe Generation
- Generate recipes within cost constraints
- Automatically upgrade to premium tiers when needed
- Suggest alternatives if budget exceeded

### 3. Upselling Strategy
- Show premium options as "recommended for your goals"
- Highlight superfood benefits
- Offer upgrade during selection process

## Recommended Approach

**Go with Option 1: Tiered Pricing**
- Simplest for customers to understand
- Clear value proposition
- Easy to implement in UI
- Maintains profit margins

**Pricing Structure:**
- **Essential**: CHF 12/11 (basic nutrition)
- **Enhanced**: CHF 15/14 (superfoods included)
- **Premium**: CHF 18/17 (luxury ingredients)

This gives you:
- 60% margin on Essential
- 65% margin on Enhanced  
- 70% margin on Premium
- Clear upgrade path for customers
- Cost control built-in
