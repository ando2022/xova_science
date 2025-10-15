# Google OAuth Setup Guide

## The Problem
Google OAuth login is not working because it needs to be configured in Supabase.

## Quick Fix (10 minutes)

### Step 1: Create Google OAuth App
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client IDs**
5. Select **Web application**
6. Add these **Authorized redirect URIs**:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
   (Replace `your-project-ref` with your actual Supabase project reference)

### Step 2: Configure Supabase
1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **Google** and click **Configure**
4. Enable Google provider
5. Add your **Client ID** and **Client Secret** from Google Cloud Console
6. Save the configuration

### Step 3: Update Site URL (Important!)
1. In Supabase, go to **Authentication** → **URL Configuration**
2. Make sure **Site URL** is set to:
   ```
   https://xova.ch
   ```
3. Add **Redirect URLs**:
   ```
   https://xova.ch
   https://www.xova.ch
   https://xova.ch/dashboard
   ```

### Step 4: Test
1. Try logging in with Google
2. Check Supabase logs for any errors
3. Verify user is created in **Authentication** → **Users**

## Alternative: Disable Google OAuth Temporarily

If you want to test without Google OAuth:

1. In Supabase, go to **Authentication** → **Providers**
2. **Disable** Google provider
3. Users can still sign up with email/password

## Common Issues

### "Invalid redirect URI"
- Make sure the redirect URI in Google Console exactly matches Supabase
- Format: `https://your-project-ref.supabase.co/auth/v1/callback`

### "Access blocked"
- Google app might need verification for production
- For testing, add your email to "Test users" in Google Console

### "OAuth consent screen not configured"
- Go to **OAuth consent screen** in Google Console
- Fill out required fields (app name, support email)
- Add your email as a test user

## Success Indicators

After setup, you should see:
- ✅ Google login button works
- ✅ User is redirected to Google
- ✅ After Google auth, user returns to your site
- ✅ User appears in Supabase Users table
- ✅ User can access dashboard

## Need Help?

If you're still having issues:
1. Check Supabase logs in **Logs** → **Auth**
2. Check browser console for JavaScript errors
3. Verify environment variables are set correctly
4. Make sure your domain is properly configured in both Google and Supabase

