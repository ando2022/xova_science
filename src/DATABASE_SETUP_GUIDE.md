# 🚨 XOVA Database Setup - Quick Start

## You're seeing this because login/signup is not working

This happens when the Supabase database tables haven't been created yet, or you're using a Supabase project that was set up for a different app.

---

## ✅ Solution 1: Use a Fresh Supabase Project (Recommended)

If you have other apps using the same Supabase project, create a new one for XOVA:

### Step 1: Create New Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Project Name: `XOVA`
4. Database Password: Choose a strong password (save it!)
5. Region: Choose closest to Zurich (e.g., `eu-central-1`)
6. Wait 2-3 minutes for setup to complete

### Step 2: Get Your Credentials

1. In your new project, click **Settings** (gear icon)
2. Go to **API** section
3. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (long string)

### Step 3: Update Your App

Open `/lib/supabase.ts` and replace:

```typescript
const supabaseUrl = 'YOUR_NEW_PROJECT_URL';
const supabaseAnonKey = 'YOUR_NEW_ANON_KEY';
```

---

## ✅ Solution 2: Set Up Database Tables

Now run the SQL migration to create all required tables:

### Step 1: Open SQL Editor

1. In Supabase Dashboard, click **SQL Editor** in the left sidebar
2. Click **"New Query"**

### Step 2: Run Migration

1. Open the file `/supabase-migrations.sql` in this project
2. Copy **ALL** the contents (Ctrl+A, Ctrl+C)
3. Paste into the Supabase SQL Editor
4. Click **"Run"** button (or Ctrl+Enter)

You should see:
```
Success. No rows returned
```

This creates 6 tables:
- ✅ profiles - User health information
- ✅ smoothies - Generated recipes
- ✅ check_ins - Daily health tracking
- ✅ favorites - Saved smoothies
- ✅ delivery_orders - Weekly orders
- ✅ analytics_events - Usage tracking

### Step 3: Verify Tables Exist

Run this query to check:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see all 6 tables listed.

---

## ✅ Solution 3: Configure Authentication

### Disable Email Confirmation (for testing)

1. Go to **Authentication** → **Settings**
2. Find **"Enable Email Confirmations"**
3. **Toggle it OFF**
4. Click **Save**

This lets you test signup without checking email.

### Configure Email Provider (for production)

1. Go to **Authentication** → **Settings** → **SMTP Settings**
2. Use SendGrid, Resend, or custom SMTP
3. Test by sending yourself a magic link

---

## ✅ Solution 4: Test Your Setup

### Clear Browser Data

1. Open Developer Tools (F12)
2. Go to **Application** tab → **Local Storage**
3. Right-click on your site → **Clear**
4. Close and reopen the browser

### Test Signup

1. Refresh your app
2. Click **"Sign Up"**
3. Enter a NEW email and password
4. Watch the browser console (F12 → Console)

**Expected console output:**
```
🔍 Checking XOVA Database Setup...
📊 Database Status:
  Connected: ✅
  User Authenticated: ❌
📋 Tables:
  profiles: ✅
  smoothies: ✅
  check_ins: ✅
  favorites: ✅
  delivery_orders: ✅
  analytics_events: ✅
```

After signup:
```
Signup successful
Auth state changed: logged in
Navigating to profile builder
```

---

## 🔍 Troubleshooting

### Error: "relation 'profiles' does not exist"

**Cause**: Database migration wasn't run

**Fix**: Go back to Solution 2 and run the SQL migration

---

### Error: "Invalid API key" or "401 Unauthorized"

**Cause**: Wrong Supabase credentials in `/lib/supabase.ts`

**Fix**: 
1. Go to Supabase Dashboard → Settings → API
2. Copy the correct **anon public** key
3. Update `/lib/supabase.ts`
4. Refresh the page

---

### Login keeps spinning forever

**Cause**: Multiple issues could cause this

**Fix**:
1. Check browser console for errors
2. Clear Local Storage (see "Clear Browser Data" above)
3. Make sure email confirmation is disabled
4. Try with a different email address
5. Check if user was created in Supabase:
   - Go to Authentication → Users
   - See if your email is listed

---

### Magic link login doesn't work

**Cause**: Email provider not configured or email confirmation required

**Fix**:
1. Disable email confirmation (see Solution 3)
2. Use password login instead for testing
3. Configure SMTP for production (see Solution 3)

---

### Multiple apps share same Supabase project

**Cause**: You connected XOVA to an existing project with other tables

**Fix**: Use Solution 1 to create a separate project for XOVA

**Alternative**: Use table prefixes
- Modify `/supabase-migrations.sql`
- Change all table names: `profiles` → `xova_profiles`, etc.
- Update `/lib/supabase.ts` type definitions

---

## 📊 Verify Everything is Working

After completing the setup, check the browser console. You should see:

```
✅ All checks passed!
```

And you should be able to:
1. ✅ Sign up with a new account
2. ✅ See the profile builder page
3. ✅ Complete your health profile
4. ✅ Access the dashboard
5. ✅ Generate smoothie recipes

---

## 🎉 Success!

Once you see the Dashboard, your XOVA app is fully functional with:

- ✅ Secure authentication
- ✅ Database storage for profiles
- ✅ Ready for smoothie generation
- ✅ Ready for café matching
- ✅ Ready for weekly delivery

---

## Need More Help?

- See `SUPABASE_SETUP.md` for advanced setup
- See `TROUBLESHOOTING.md` for common issues
- Check browser console (F12) for error messages
- Make sure you're using the correct Supabase project

---

**Pro Tip**: Keep your Supabase dashboard open in another tab while testing. You can see users being created in **Authentication → Users** and data in **Table Editor**.
