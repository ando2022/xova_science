# MVP Payment Test Guide

## Complete User Flow Test

### 1. Login/Signup
- Go to `xova.ch`
- Click "Sign Up Free" or "Log In"
- Complete authentication
- Should redirect to MVP Dashboard

### 2. Dashboard
- Should see "Welcome to XOVA" dashboard
- Profile Status: "Basic" (if no profile) or "Complete" (if profile exists)
- Orders: 0
- Ready to Order: "Start your journey"
- Click "Start Your Order" button

### 3. Smoothie Selection
- Should see 3 smoothie variants (Essential, Enhanced, Premium)
- Select 1 smoothie by clicking on it
- Choose plan (7-day or 14-day)
- Click "Continue to Payment"

### 4. Payment
- Should redirect to Stripe Checkout
- Use test card: `4242 4242 4242 4242`
- Any future date, any CVC
- Complete payment

### 5. Success
- Should redirect back to success page
- Order confirmation should show

## Test Cards (Stripe)
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`

## Expected Behavior
1. **Dashboard** → **Smoothie Selection** → **Stripe Checkout** → **Success**
2. All buttons should work
3. No console errors
4. Payment should process successfully with test card

## Environment Variables Required
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY` (in Vercel)

## Troubleshooting
- If login fails: Check Supabase credentials
- If payment fails: Check Stripe credentials
- If smoothie generation fails: Check ingredients database
- If redirect fails: Check Vercel API routes

