# 🚨 Email Verification Fix Guide

## The Problem
- Emails are being sent (good!)
- But verification links expire quickly
- Links point to `localhost:3000` instead of your live site
- This causes "Email link is invalid or has expired" errors

## Quick Fix (5 minutes)

### Step 1: Fix Supabase Site URL
1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Update these settings:

**Site URL:** 
```
https://xova-nfyucwjbc-lifegenix.vercel.app
```

**Redirect URLs:** Add these URLs (one per line):
```
https://xova-nfyucwjbc-lifegenix.vercel.app
https://xova-nfyucwjbc-lifegenix.vercel.app/dashboard
https://xova-nfyucwjbc-lifegenix.vercel.app/auth
```

### Step 2: Increase Email Link Expiry
1. In Supabase, go to **Authentication** → **Settings**
2. Find **Email Link Expiry** setting
3. Change from default (1 hour) to **24 hours** or **48 hours**

### Step 3: Check Email Templates
1. Go to **Authentication** → **Email Templates**
2. Click on **Confirm signup** template
3. Make sure it's **enabled**
4. The template should look like this:

```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
```

### Step 4: Test Email Delivery
1. Try creating a new account
2. Check your email (including spam folder)
3. The verification link should now point to your live site

## Alternative: Disable Email Confirmation (Quick Test)

If you want to test the app immediately:

1. Go to **Authentication** → **Settings**
2. Find **Enable email confirmations**
3. **Disable** this setting temporarily
4. Users can now sign up without email verification

**⚠️ Remember to re-enable this for production!**

## Check Supabase Logs

If emails still don't arrive:

1. Go to **Logs** in Supabase dashboard
2. Filter by **Auth** service
3. Look for errors related to email sending
4. Common issues:
   - Email provider not configured
   - Rate limiting
   - Invalid email addresses

## Environment Variables Check

Make sure these are set in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify these exist:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Success Indicators

After the fix, you should see:
- ✅ Verification emails arrive in inbox
- ✅ Links point to your live site (not localhost)
- ✅ Links don't expire immediately
- ✅ Clicking links successfully verifies the account

## Next Steps After Fix

Once email verification works:
1. Test the complete signup → verification → login flow
2. Re-enable email confirmation if you disabled it
3. Set up proper email templates with your branding
4. Configure custom SMTP if needed for production

