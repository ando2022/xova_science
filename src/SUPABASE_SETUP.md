# 🚀 XOVA Supabase Setup Guide

## Step 1: Run Database Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `byyxnzeblpbuzvxubhgc`
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase-migrations.sql`
6. Paste it into the SQL editor
7. Click **Run** to execute the migration

This will create:
- ✅ All database tables (profiles, smoothies, check_ins, favorites, delivery_orders, analytics_events)
- ✅ Row Level Security (RLS) policies
- ✅ Database indexes for performance
- ✅ Triggers for automatic timestamps

## Step 2: Update Supabase Configuration

### Option A: Using Environment Variables (Production)

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://byyxnzeblpbuzvxubhgc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Option B: Hardcoded (Development/Figma Make)

Update `/lib/supabase.ts` line 13-14 with your actual anon key:

```typescript
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'YOUR_ACTUAL_ANON_KEY_HERE');
```

**Where to find your Anon Key:**
1. Go to Supabase Dashboard
2. Settings → API
3. Copy the `anon` `public` key

## Step 3: Configure Email Authentication

### Enable Magic Links

1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Email** provider
3. Disable **Confirm email** if you want passwordless signup
4. Configure email templates:
   - **Confirm signup**: Customize if needed
   - **Magic Link**: Customize for your brand

### Email Templates (Optional)

Update the magic link email template in Supabase:

```html
<h2>Welcome to XOVA</h2>
<p>Click the link below to log in:</p>
<p><a href="{{ .ConfirmationURL }}">Log in to XOVA</a></p>
```

## Step 4: Test Authentication

1. Try signing up with a new email
2. Check your email inbox for confirmation
3. Try logging in with magic link
4. Try password login

## Step 5: Verify Database Tables

Run this query in SQL Editor to verify:

```sql
SELECT 
  table_name 
FROM 
  information_schema.tables 
WHERE 
  table_schema = 'public'
ORDER BY 
  table_name;
```

You should see:
- ✅ analytics_events
- ✅ check_ins
- ✅ delivery_orders
- ✅ favorites
- ✅ profiles
- ✅ smoothies

## Step 6: Test Row Level Security

Try creating a profile:

```sql
-- This should work (users can insert their own profile)
INSERT INTO profiles (user_id, age, gender, height, weight, activity_level)
VALUES (auth.uid(), 25, 'male', 175, 70, 'moderate');

-- This should fail (users can't insert profiles for other users)
INSERT INTO profiles (user_id, age, gender, height, weight, activity_level)
VALUES ('00000000-0000-0000-0000-000000000000', 25, 'male', 175, 70, 'moderate');
```

## Next Steps

### Stripe Integration (CHF Payments)

1. **Create Stripe Account** (Switzerland)
   - Go to stripe.com
   - Create account with CHF as base currency
   - Get API keys from Dashboard → Developers → API keys

2. **Create Products in Stripe**
   - Premium Subscription: CHF 10/week
   - Delivery: Variable pricing (CHF 8-12 per smoothie)

3. **Set up Webhooks**
   - Create webhook endpoint
   - Subscribe to: `customer.subscription.created`, `customer.subscription.updated`, `invoice.paid`
   - Add webhook URL: `https://your-domain.com/api/webhooks/stripe`

4. **Implement Checkout**
   - Use Stripe Checkout for subscriptions
   - Use Stripe Payment Links for one-time delivery orders

### Vercel Deployment

1. **Connect to GitHub**
   - Push code to GitHub repository
   - Connect repository to Vercel

2. **Add Environment Variables in Vercel**
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   DATABASE_URL
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET
   ```

3. **Deploy**
   - Automatic deployments on git push
   - Production URL: `xova.vercel.app` (or custom domain)

### Analytics with Metabase

1. **Install Metabase** (Docker or Cloud)
2. **Connect to Supabase PostgreSQL**
   - Host: `db.byyxnzeblpbuzvxubhgc.supabase.co`
   - Port: `5432`
   - Database: `postgres`
   - User: `postgres`
   - Password: Your database password

3. **Create Dashboards**
   - User signups over time
   - Smoothie generation trends
   - Delivery order analytics
   - Revenue metrics

### Background Jobs

**Option 1: Supabase Edge Functions**

```sql
-- Create a scheduled function for daily check-in reminders
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'daily-check-in-reminder',
  '0 8 * * *', -- Every day at 8 AM
  $$
    -- Send reminder logic here
  $$
);
```

**Option 2: Vercel Cron Jobs**

Create `/api/cron/daily-checkin.ts`:

```typescript
export const config = {
  runtime: 'edge',
};

export default async function handler() {
  // Send daily check-in reminders
  return new Response('OK');
}
```

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-checkin",
      "schedule": "0 8 * * *"
    }
  ]
}
```

## Troubleshooting

### Authentication Issues

**Problem**: Login keeps spinning / doesn't redirect to dashboard
- **Solution**: Check browser console for errors
- Run migrations: The `profiles` table might not exist
- Check if auth.users table has your user
- Verify RLS policies allow profile creation

**Problem**: "No user logged in" error when creating profile
- **Solution**: Session not established yet
- Wait 2-3 seconds after signup before creating profile
- Check if Supabase session is being created: Check Application → Cookies in browser devtools
- Clear browser cache and try again

**Problem**: Multiple Supabase projects conflict
- **Solution**: Each app needs its own Supabase project OR use different tables
- Create a new Supabase project for XOVA
- Or use table prefixes like `xova_profiles`, `xova_smoothies`, etc.

**Problem**: Users can't log in
- Check if email confirmation is required
- Verify SITE_URL in Supabase auth settings
- Check RLS policies are enabled
- Go to Authentication → Users to see if user exists

**Problem**: Magic link doesn't work
- Verify email provider is enabled
- Check spam folder
- Verify redirect URL matches your domain

### Database Issues

**Problem**: Can't insert data
- Check RLS policies
- Verify user is authenticated: `SELECT auth.uid();`
- Check table constraints

**Problem**: Slow queries
- Add indexes: Already created in migration
- Check query execution plans
- Consider adding more indexes if needed

### Deployment Issues

**Problem**: Environment variables not working
- Verify variables are set in Vercel dashboard
- Restart deployment after adding variables
- Check variable names match exactly

## Security Checklist

- ✅ Row Level Security enabled on all tables
- ✅ Anon key is public (safe for client-side use)
- ✅ Service role key is NEVER exposed to client
- ✅ CORS configured for your domain
- ✅ Email confirmation enabled (optional but recommended)
- ✅ Rate limiting configured in Supabase
- ✅ SSL/HTTPS enforced

## Success! 🎉

Your XOVA platform is now production-ready with:
- ✅ Secure authentication (magic links + passwords)
- ✅ PostgreSQL database with RLS
- ✅ Analytics event tracking
- ✅ Ready for Stripe integration
- ✅ Ready for Vercel deployment

**Next**: Implement Stripe payments and deploy to production!
