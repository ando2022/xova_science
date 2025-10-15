# XOVA Database Setup Guide

## Quick Setup Steps

### 1. Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your XOVA project
3. Navigate to **SQL Editor** in the left sidebar

### 2. Run the Schema
1. Copy the entire contents of `supabase-setup.sql`
2. Paste into the SQL Editor
3. Click **Run** to execute all commands

### 3. Verify Setup
After running, you should see:
- ✅ Tables created: `user_profiles`, `orders`, `smoothie_recipes`, `user_events`
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Policies created for user data access
- ✅ Triggers set up for automatic profile creation and timestamps
- ✅ Success message: "XOVA database setup completed successfully! ✅"

## Database Schema Overview

### Tables Created

#### `user_profiles`
- Stores user health data from questionnaire
- Links to `auth.users` via UUID
- Fields: activity_level, health_goals, dietary_restrictions, allergens, preferences

#### `orders`
- Tracks user purchases and subscriptions
- Fields: plan_type, status, total_amount, payment_intent_id, delivery_address

#### `smoothie_recipes`
- Stores AI-generated smoothie recipes
- Fields: ingredients (JSONB), nutritional_info (JSONB), calories, protein, carbs, fiber

#### `user_events`
- Analytics tracking for user behavior
- Fields: event_type, event_data (JSONB), session_id

## Security Features

### Row Level Security (RLS)
- Users can only access their own data
- Automatic profile creation on signup
- Secure data isolation between users

### Triggers
- `handle_new_user()`: Creates profile when user signs up
- `update_updated_at_column()`: Auto-updates timestamps

## Testing the Setup

### 1. Test User Creation
```sql
-- This should create a profile automatically
SELECT * FROM user_profiles WHERE email = 'your-test-email@example.com';
```

### 2. Test RLS Policies
```sql
-- This should only return data for the authenticated user
SELECT * FROM orders WHERE user_id = auth.uid();
```

## Next Steps After Setup

1. **Test Authentication**: Create a test account and verify profile creation
2. **Test Database Queries**: Ensure app can read/write user data
3. **Set up Stripe Products**: Configure payment plans in Stripe dashboard
4. **Build Questionnaire**: Create the health questionnaire form
5. **Implement Smoothie Generator**: Build the AI recipe generation system

## Troubleshooting

### Common Issues

**"Permission denied" errors:**
- Ensure RLS policies are correctly created
- Check that user is authenticated before database queries

**Profile not created on signup:**
- Verify trigger `on_auth_user_created` exists
- Check function `handle_new_user()` is working

**Tables not found:**
- Re-run the entire SQL script
- Check for any error messages during execution

### Support
If you encounter issues, check:
1. Supabase logs in the dashboard
2. Browser console for JavaScript errors
3. Network tab for failed API calls

## Environment Variables Required

Make sure these are set in your `.env.local`:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

