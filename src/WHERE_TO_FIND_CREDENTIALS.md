# 🔑 Where to Find Your Supabase Credentials

## Quick Reference

After creating your new XOVA project in Supabase:

### 1. Project URL

**Location:**
```
Supabase Dashboard → Settings (⚙️) → API → Project URL
```

**What it looks like:**
```
https://abcdefghijklmnop.supabase.co
```

**Where to paste it:**
- File: `/lib/supabase.ts`
- Line: `const supabaseUrl = 'PASTE_YOUR_PROJECT_URL_HERE';`

---

### 2. Anon Key (Public Key)

**Location:**
```
Supabase Dashboard → Settings (⚙️) → API → Project API keys → anon public
```

**What it looks like:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5ODc2NTQzMiwiZXhwIjoyMDE0MzQxNDMyfQ.aBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRs
```

**Where to paste it:**
- File: `/lib/supabase.ts`
- Line: `const supabaseAnonKey = 'PASTE_YOUR_ANON_KEY_HERE';`

---

## ⚠️ IMPORTANT: Which Key to Use

### ✅ USE THIS: `anon` `public`
- Safe to use in frontend code
- Used for user authentication
- Has Row Level Security enabled

### ❌ DON'T USE: `service_role` `secret`
- NEVER put this in frontend code
- Only for backend/server use
- Has full database access

---

## 📋 Copy-Paste Template

Once you have both values, your `/lib/supabase.ts` should look like:

```typescript
import { createClient } from '@supabase/supabase-js';

// ⚠️ REPLACE THESE WITH YOUR NEW SUPABASE PROJECT CREDENTIALS
// Get these from: Supabase Dashboard → Settings → API
const supabaseUrl = 'https://abcdefghijklmnop.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5ODc2NTQzMiwiZXhwIjoyMDE0MzQxNDMyfQ.aBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRs';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
```

---

## 🔍 How to Verify You Got It Right

After pasting your credentials:

1. **Refresh your XOVA app**
2. **Open browser console** (F12)
3. Look for:
   ```
   🔍 Checking XOVA Database Setup...
   📊 Database Status:
     Connected: ✅
   ```

If you see `Connected: ❌` instead:
- Double-check you copied the right values
- Make sure there are no extra spaces
- Make sure you saved the file

---

## 🆘 Troubleshooting

### Error: "Invalid API key"
- You might have copied the wrong key
- Go back to Settings → API
- Make sure you copied the `anon` `public` key

### Error: "Failed to fetch"
- Check if Project URL is correct
- Make sure it ends with `.supabase.co`
- Make sure it starts with `https://`

### Error: "CORS error"
- This usually means wrong URL
- Double-check the Project URL

---

## ✅ Next Step

Once credentials are pasted and saved:

👉 Continue to **Step 5** in `FRESH_START_CHECKLIST.md`
