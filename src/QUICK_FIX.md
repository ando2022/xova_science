# QUICK FIX: Authentication Issues

## Problem: Login/Signup keeps spinning or fails

Your Supabase database tables might not exist. Here's the quick fix:

### Step 1: Check if you need a new Supabase project

⚠️ **If you connected to an existing Supabase project that has other apps/tables:**

1. Go to https://supabase.com/dashboard
2. Click "New Project" 
3. Name it "XOVA"
4. Wait for it to be created
5. Copy the Project URL and anon key
6. Update `/lib/supabase.ts`:
   ```typescript
   const supabaseUrl = 'YOUR_NEW_PROJECT_URL';
   const supabaseAnonKey = 'YOUR_NEW_ANON_KEY';
   ```

### Step 2: Run the database migration

1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Select your XOVA project
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy EVERYTHING from `/supabase-migrations.sql` in this project
6. Paste it into the SQL Editor
7. Click "Run" or press Ctrl+Enter

You should see success messages for all tables created.

### Step 3: Disable email confirmation (for testing)

1. In Supabase Dashboard, go to Authentication → Settings
2. Find "Enable Email Confirmations"
3. Toggle it OFF (you can enable later)
4. Click Save

### Step 4: Test the fix

1. Clear your browser's Local Storage:
   - Open Developer Tools (F12)
   - Go to Application → Local Storage
   - Right-click your site → Clear
2. Refresh the page
3. Try signing up with a NEW email address
4. Watch the browser console for error messages

### Expected Flow

When signup works correctly, you'll see in the console:
```
Attempting signup for: your@email.com
Signup successful
Auth state changed: logged in
User has no profile, navigating to profile builder
```

Then the Profile Builder page should appear.

## Still not working?

Check the browser console (F12 → Console tab) for errors:

- **"relation 'profiles' does not exist"** → Run Step 2 again
- **"Invalid API key"** → Check Step 1, make sure credentials are correct
- **"Network error"** → Check your internet connection
- **No errors but still spinning** → Clear Local Storage (Step 4) and try again

## Need more help?

See `TROUBLESHOOTING.md` for detailed instructions and common issues.
