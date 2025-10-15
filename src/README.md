# 🥤 XOVA - Personalized Smoothie Platform

A modern web application offering personalized health profiling, AI-generated smoothie recipes with scientific transparency, café matching in Zurich, and weekly delivery service.

## ✨ Features

### 🔐 Authentication
- **Magic Link Login**: Passwordless authentication via email
- **Traditional Login**: Email/password authentication
- **Secure**: Powered by Supabase Auth with Row Level Security

### 👤 User Profile System
- **4-Step Profile Builder**:
  1. Basic Info (age, gender, height, weight)
  2. Health Goals (weight loss, energy, immunity, etc.)
  3. Dietary Restrictions & Allergens
  4. Lifestyle & Preferences (activity level, sleep quality, stress)

### 🧪 AI Smoothie Generation
- **Personalized Recipes**: Based on your health profile
- **Scientific Transparency**: Detailed explanations linking ingredients to health goals
- **Exact Proportions**: Precise measurements for every ingredient
- **Nutritional Breakdown**: Complete macros and micronutrients

### ☕ Café Menu Matching
- **Real GPS Tracking**: Finds nearby cafés in Zurich
- **Menu Matching**: Shows which cafés serve your recommended smoothies
- **Pre-ordering**: Order ahead for pickup

### 📦 Weekly Delivery Service
- **Volume-Based Pricing**:
  - 1-3 smoothies/week: CHF 12 each
  - 4-7 smoothies/week: CHF 11 each
  - 8-14 smoothies/week: CHF 9.50 each
  - 15-21 smoothies/week: CHF 8 each
- **20 Personalized Choices**: AI-generated weekly options
- **Favorites Management**: Save and reorder your favorites
- **Smart Packaging**: Fresh ingredients + vacuum-sealed dry ingredients

## 💰 Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | CHF 0 | Basic smoothie info only |
| **Premium** | CHF 10/week | Full recipes, proportions, café matching |
| **Delivery** | CHF 8-12/smoothie | All premium + weekly delivery |

## 🏗️ Tech Stack

### Frontend
- **React** + **TypeScript**: Modern component-based UI
- **Tailwind CSS v4**: Utility-first styling with XOVA brand colors
- **Shadcn/UI**: Accessible component library

### Backend
- **Supabase**: PostgreSQL database, authentication, real-time subscriptions
- **Row Level Security**: User data isolation and security

### Infrastructure (Production Ready)
- **Vercel**: Frontend hosting with automatic deployments
- **Stripe**: Payment processing (CHF currency)
- **Metabase**: Analytics dashboard
- **Vercel Cron**: Background jobs (daily check-ins, delivery reminders)

## 🚀 Quick Start

### 1. Database Setup

Run the migration in your Supabase SQL Editor:

```bash
# Copy the contents of supabase-migrations.sql
# Paste into: Supabase Dashboard → SQL Editor → New Query → Run
```

This creates:
- ✅ `profiles` - User health profiles
- ✅ `smoothies` - Generated smoothie recipes
- ✅ `check_ins` - Daily wellness tracking
- ✅ `favorites` - Saved smoothies
- ✅ `delivery_orders` - Weekly delivery orders
- ✅ `analytics_events` - Usage analytics

### 2. Verify Configuration

The Supabase client is already configured in `/lib/supabase.ts`:
- ✅ URL: `https://byyxnzeblpbuzvxubhgc.supabase.co`
- ✅ Anon Key: Configured
- ✅ Auto-refresh: Enabled
- ✅ Persistent sessions: Enabled

### 3. Test the App

1. **Sign Up**: Create a new account with magic link or password
2. **Build Profile**: Complete the 4-step profile builder
3. **Generate Smoothies**: Get personalized AI recommendations
4. **Explore Features**: Try café matching and delivery planning

## 📱 Key Components

### Authentication Flow
```
Landing Page → Login/Signup → Profile Builder → Dashboard
```

### Main Pages
- **Dashboard**: Overview, recent smoothies, quick actions
- **Smoothie Generator**: AI-powered recipe creation
- **Café Matching**: Find nearby cafés with GPS
- **Weekly Delivery**: Order management and scheduling
- **Settings**: Profile management and preferences

## 🎨 Design System

### XOVA Brand Colors
```css
Primary:   #7B2CBF (Vibrant Purple)
Secondary: #FF6B6B (Bright Coral)
Accent:    #4ECDC4 (Vivid Emerald)
Success:   #45B7AA (Vibrant Green)
```

### Accessibility
- ✅ Color vision deficiency support
- ✅ High contrast ratios (WCAG AA compliant)
- ✅ Keyboard navigation
- ✅ Screen reader friendly

## 📊 Database Schema

### Profiles Table
```sql
- id: UUID (primary key)
- user_id: UUID (references auth.users)
- age, gender, height, weight
- activity_level, health_goals
- dietary_restrictions, allergies
- flavor_preferences
```

### Smoothies Table
```sql
- id: UUID (primary key)
- user_id: UUID (references auth.users)
- name, ingredients, proportions
- instructions, macros
- scientific_explanation
- health_score
```

### Row Level Security
All tables have RLS enabled - users can only access their own data.

## 🔒 Security Features

- ✅ **Row Level Security**: Enforced at database level
- ✅ **Secure Auth**: Magic links + password hashing
- ✅ **HTTPS Only**: All connections encrypted
- ✅ **API Keys**: Anon key safe for client-side use
- ✅ **Input Validation**: All user inputs sanitized

## 📈 Analytics Events

The app tracks:
- User signups and logins
- Profile completions
- Smoothie generations
- Café searches
- Delivery orders

View in Metabase dashboard (when connected).

## 🚀 Deployment

### Vercel Setup
```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# Import repository on vercel.com

# 3. Add Environment Variables (if needed)
VITE_SUPABASE_URL=https://byyxnzeblpbuzvxubhgc.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

### Stripe Integration (Next Step)
1. Create Stripe account (Switzerland, CHF)
2. Add products: Premium (CHF 10/week), Delivery (variable)
3. Set up webhooks for subscription events
4. Implement checkout flow

## 📚 Documentation

- **Setup Guide**: See `SUPABASE_SETUP.md`
- **API Reference**: See Supabase auto-generated docs
- **Components**: All in `/components` directory
- **Business Logic**: All in `/lib` directory

## 🎯 Roadmap

### Phase 1: Core Platform ✅
- [x] Authentication system
- [x] Profile builder
- [x] AI smoothie generation
- [x] Scientific transparency
- [x] Café matching
- [x] Delivery system

### Phase 2: Payments (In Progress)
- [ ] Stripe integration
- [ ] Premium subscriptions
- [ ] Delivery checkout
- [ ] Invoice generation

### Phase 3: Advanced Features
- [ ] Daily check-in reminders
- [ ] Progress tracking
- [ ] Social sharing
- [ ] Referral program
- [ ] Mobile app

## 🤝 Support

For questions or issues:
1. Check `SUPABASE_SETUP.md` for troubleshooting
2. Review Supabase logs in dashboard
3. Check browser console for errors

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ for a healthier Switzerland** 🇨🇭
