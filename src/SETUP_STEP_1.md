# XOVA Production Setup - Step 1: Supabase Backend

## ✅ What We're Doing
Setting up your Supabase backend database and authentication system.

**Time Required:** 15-20 minutes

---

## STEP 1A: Create Supabase Account

1. **Go to Supabase**
   - Open: https://supabase.com
   - Click "Start your project" or "Sign up"

2. **Sign Up**
   - Use your email or GitHub account
   - Verify your email if required

3. **Create Organization**
   - Name: "XOVA" (or your company name)
   - Click "Create organization"

---

## STEP 1B: Create New Project

1. **Click "New Project"**

2. **Project Settings:**
   ```
   Name: xova-production
   Database Password: [Generate strong password]
   Region: Europe West (Frankfurt) - eu-central-1
   Pricing Plan: Free (to start)
   ```

3. **IMPORTANT: Save Your Database Password**
   ```
   Copy the generated password and save it somewhere safe!
   You'll need it later (though rarely).
   ```

4. **Click "Create new project"**
   - Wait 2-3 minutes for provisioning

---

## STEP 1C: Get Your API Credentials

Once your project is ready:

1. **Go to Project Settings**
   - Click the ⚙️ gear icon in the left sidebar
   - Click "API" in the settings menu

2. **Copy These Values:**

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh...
   (very long string)
   ```
   
   **service_role key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh...
   (different very long string - KEEP THIS SECRET!)
   ```

---

## STEP 1D: Create Environment File

1. **In your project root, create a file called `.env.local`**

2. **Add these lines (replace with YOUR values):**

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe Configuration (we'll add these later)
VITE_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

3. **Save the file**

4. **SECURITY CHECK:**
   - Make sure `.env.local` is in your `.gitignore` file
   - NEVER commit this file to GitHub!

---

## STEP 1E: Update Your Supabase Client

I'll create the updated Supabase client file for you now.

**File: `/lib/supabase.ts`** (will be created next)

---

## ✅ Verification Checklist

Before moving to Step 2, verify:

- [ ] Supabase project created and running
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] Service role key copied
- [ ] `.env.local` file created with all 3 values
- [ ] `.env.local` is in `.gitignore`

---

## 🎯 What's Next?

Once you've completed these steps:
1. ✅ Tell me "Step 1 complete"
2. I'll create the Supabase client and database schema
3. We'll test the connection

---

## ⚠️ Troubleshooting

**Can't find API keys?**
- Go to Project Settings (⚙️) → API
- Keys are under "Project API keys"

**Project not provisioning?**
- Wait a few more minutes
- Refresh the page
- Check Supabase status: https://status.supabase.com

**Lost database password?**
- You can reset it in Project Settings → Database → Database password

---

## 📸 Need Help?

If you're stuck, tell me:
1. Which step you're on
2. What you see on your screen
3. Any error messages

Let's get your Supabase project running! 🚀
