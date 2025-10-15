# 🚀 XOVA Setup - Do This Now!

## You're seeing a setup screen because Supabase isn't connected yet.

Follow these 3 simple steps:

---

## ✅ Step 1: Create Supabase Project (2 minutes)

1. Open: https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - Name: `XOVA`
   - Region: `Europe (Frankfurt)`
   - Password: Make it strong and SAVE IT
4. Click "Create new project"
5. ⏰ Wait 2-3 minutes for it to finish

---

## ✅ Step 2: Get Credentials (1 minute)

Once your project is ready:

1. Click **Settings** (⚙️ icon, bottom left)
2. Click **API** in the menu
3. Find and copy these TWO values:

### Value 1: Project URL
```
Location: Settings → API → Project URL
Looks like: https://xxxxxxxxxxxxx.supabase.co
```

### Value 2: anon public key
```
Location: Settings → API → Project API keys → anon public
Looks like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...
```

⚠️ **Copy the `anon` key, NOT the `service_role` key!**

---

## ✅ Step 3: Update Code (30 seconds)

1. Open this file: `/lib/supabase.ts`

2. Find these lines (around line 5-6):
```typescript
const supabaseUrl = 'PASTE_YOUR_PROJECT_URL_HERE';
const supabaseAnonKey = 'PASTE_YOUR_ANON_KEY_HERE';
```

3. Replace with your actual values:
```typescript
const supabaseUrl = 'https://xxxxxxxxxxxxx.supabase.co';  // Your URL
const supabaseAnonKey = 'eyJhbGci...';  // Your anon key
```

4. **Save the file**

5. **Refresh your browser** - The setup screen will disappear!

---

## 🎉 That's It!

After refreshing, you'll see the XOVA landing page.

### But wait! You still need to:

1. **Run database migration** (creates tables)
   - Go to Supabase Dashboard → SQL Editor
   - Copy everything from `/supabase-migrations.sql`
   - Paste and click "Run"

2. **Disable email confirmation** (for testing)
   - Go to Authentication → Settings
   - Turn OFF "Enable Email Confirmations"
   - Click Save

3. **Test signup**
   - Click "Get Started" in XOVA
   - Create an account
   - You should reach the Profile Builder

---

## 🆘 Having Issues?

### App still shows setup screen after pasting credentials
- Make sure you saved `/lib/supabase.ts`
- Make sure URL starts with `https://`
- Make sure there are no typos
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### "Invalid API key" error
- You might have copied the service_role key by mistake
- Go back and copy the **anon public** key instead

### Login/signup doesn't work
- Did you run the database migration? (Step 1 above)
- Check browser console (F12) for specific errors
- See `DATABASE_SETUP_GUIDE.md` for detailed help

---

## 📚 More Help

- `FRESH_START_CHECKLIST.md` - Complete setup checklist
- `WHERE_TO_FIND_CREDENTIALS.md` - Visual guide
- `DATABASE_SETUP_GUIDE.md` - Troubleshooting

---

**You're almost there! Just paste those two values and you're good to go! 🚀**
