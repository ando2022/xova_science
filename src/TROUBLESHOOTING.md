# XOVA Troubleshooting Guide

## Issue: Login/Signup Keeps Loading or Fails

If you're experiencing issues with authentication (infinite loading, login failures, or profile errors), follow these steps:

### 1. Check Your Supabase Project

**IMPORTANT:** Make sure you're using a dedicated Supabase project for XOVA. If you connected an existing project that has other tables, this could cause conflicts.

**Recommended:** Create a new Supabase project specifically for XOVA:
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name it "XOVA" or similar
4. Once created, get the new project URL and anon key
5. Update `/lib/supabase.ts` with the new credentials

### 2. Verify Database Tables Exist

Open your Supabase project dashboard and check the SQL Editor. Run this query to check if tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see these tables:
- `profiles`
- `smoothies`
- `check_ins`
- `favorites`
- `delivery_orders`
- `analytics_events`

### 3. Create Missing Tables

If the tables don't exist, run the migration file:

1. In Supabase Dashboard, go to SQL Editor
2. Open the file `/supabase-migrations.sql` from your project
3. Copy the entire contents
4. Paste into the SQL Editor
5. Click "Run"

### 4. Enable Row Level Security (RLS)

Make sure RLS policies are set up correctly. Run this in SQL Editor:

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

All tables should have `rowsecurity = true`.

### 5. Verify Authentication Settings

In your Supabase Dashboard:
1. Go to Authentication → Settings
2. Check "Enable Email Confirmations" is **OFF** for testing (you can enable it later)
3. Under "Email Auth" make sure it's enabled
4. Site URL should be your app URL (e.g., `http://localhost:5173` for local development)

### 6. Check Browser Console for Errors

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Look for error messages when you try to sign up or log in
4. Common errors:
   - "relation 'profiles' does not exist" → Run the migration SQL
   - "No API key found" → Check your supabase.ts configuration
   - "Invalid login credentials" → Email/password might be wrong
   - "User already registered" → Try logging in instead

### 7. Clear Browser Data

Sometimes cached auth tokens cause issues:
1. Open Developer Tools (F12)
2. Go to Application tab
3. Clear Local Storage for your site
4. Clear Session Storage
5. Refresh the page

### 8. Test with These Steps

1. **Clear all browser data** (Local Storage, Session Storage)
2. **Refresh the page**
3. **Click "Sign Up"**
4. **Fill in the form** with a NEW email address
5. **Watch the browser console** for any errors
6. If it works, you should see:
   - "Attempting signup for: your@email.com"
   - "Signup successful"
   - "Auth state changed: logged in"
   - "User has no profile, navigating to profile builder"
   - The page should navigate to the Profile Builder

### 9. Common Issues and Solutions

#### Issue: "No user logged in" error
**Solution:** The database tables might not exist. Run the migration SQL.

#### Issue: Infinite loading spinner
**Solution:** Check the browser console for errors. Usually means the auth state change listener isn't working.

#### Issue: "profiles table does not exist"
**Solution:** Run the `/supabase-migrations.sql` file in your Supabase SQL Editor.

#### Issue: Connected wrong Supabase project
**Solution:** 
1. Create a new Supabase project
2. Update the credentials in `/lib/supabase.ts`
3. Run the migration SQL in the new project

### 10. Get Help

If you're still having issues:
1. Check the browser console for errors
2. Check the Supabase Dashboard → Logs for database errors
3. Make sure your Supabase project is on a free plan or higher (not paused)
4. Verify your network connection

## Next Steps After Fixing Auth

Once authentication works:
1. Complete your profile in the Profile Builder
2. Explore the Dashboard
3. Try generating a smoothie
4. Set up your weekly delivery preferences

## Database Reset (If Needed)

If you need to start fresh with your database:

```sql
-- WARNING: This will delete all data!
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS delivery_orders CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS check_ins CASCADE;
DROP TABLE IF EXISTS smoothies CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
```

Then run the migration SQL again to recreate the tables.
