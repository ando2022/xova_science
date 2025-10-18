# XOVA Payment System Test Guide

## Test Environment Setup

### Stripe Test Mode
- Use Stripe test keys (publishable key starts with `pk_test_`)
- All transactions are simulated - no real money is charged

### Test Card Numbers (Stripe)
Use these test card numbers to simulate different scenarios:

#### Successful Payments
- **Visa**: 4242 4242 4242 4242
- **Visa (debit)**: 4000 0566 5566 5556
- **Mastercard**: 5555 5555 5555 4444
- **American Express**: 3782 822463 10005

#### Declined Payments
- **Generic decline**: 4000 0000 0000 0002
- **Insufficient funds**: 4000 0000 0000 9995
- **Lost card**: 4000 0000 0000 9987
- **Stolen card**: 4000 0000 0000 9979

#### 3D Secure Authentication
- **Authentication required**: 4000 0025 0000 3155
- **Authentication fails**: 4000 0000 0000 3220

### Test Details
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP/Postal Code**: Any valid code (e.g., 12345)

## Testing Steps

1. **Navigate to Checkout**: Complete smoothie selection and proceed to checkout
2. **Select Test Product**: Choose weekly plan or 14-day plan
3. **Use Test Card**: Enter one of the test card numbers above
4. **Complete Payment**: Fill in test details and submit
5. **Verify Success**: Check that payment confirmation appears

## Expected Behavior

### Successful Payment
- Payment form submits without errors
- Success page displays with payment ID
- Order is saved to database
- User is redirected to dashboard

### Declined Payment
- Error message appears
- User can retry with different card
- No charge is processed

## Environment Variables Required

Make sure these are set in Vercel:
- `VITE_STRIPE_PUBLISHABLE_KEY` (starts with `pk_test_` for test mode)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Test Products

Current test products configured:
- **Weekly Plan**: CHF 84.00 (7 smoothies)
- **14-Day Plan**: CHF 168.00 (14 smoothies)

## Troubleshooting

If payment fails:
1. Check browser console for errors
2. Verify environment variables are set
3. Confirm Stripe keys are in test mode
4. Check network tab for API calls
5. Verify Supabase connection for order storage

