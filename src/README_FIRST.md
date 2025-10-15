# 🚀 XOVA - Start Here

## You just connected to Supabase and login isn't working?

**This is normal!** The database tables haven't been created yet.

---

## 🎯 Quick Fix (5 minutes)

### 1. Run Database Migration

```
1. Open Supabase Dashboard → SQL Editor
2. Copy everything from /supabase-migrations.sql
3. Paste and click "Run"
4. Refresh your XOVA app
```

### 2. Test Login

```
1. Clear browser Local Storage (F12 → Application → Local Storage → Clear)
2. Try signing up with a new email
3. You should see the Profile Builder page
```

---

## 📚 Detailed Guides

- **Having issues?** → See `DATABASE_SETUP_GUIDE.md`
- **Multiple Supabase projects?** → See `QUICK_FIX.md`
- **Advanced setup?** → See `SUPABASE_SETUP.md`
- **General problems?** → See `TROUBLESHOOTING.md`

---

## 🔍 Check if it's Working

Open browser console (F12) and look for:

✅ **Working:**
```
✅ All checks passed!
Signup successful
Navigating to profile builder
```

❌ **Not Working:**
```
Table "profiles" does not exist
```
→ Run the migration (step 1 above)

---

## 💡 Pro Tips

1. **Use a separate Supabase project for XOVA**
   - If you have other apps using the same project, create a new one
   - Prevents table conflicts

2. **Disable email confirmation for testing**
   - Supabase Dashboard → Authentication → Settings
   - Toggle off "Enable Email Confirmations"

3. **Check the browser console**
   - Press F12 to open Developer Tools
   - All errors and guidance appear there

---

## 🎉 What You Get After Setup

- ✅ Secure user authentication (magic links + passwords)
- ✅ AI-powered smoothie recipe generation
- ✅ Health profile with dietary restrictions
- ✅ Café menu matching for Zurich
- ✅ Weekly delivery planning with smart optimization
- ✅ Scientific explanations for ingredient benefits

---

## Still Stuck?

1. Check browser console (F12 → Console)
2. Look for red error messages
3. Follow the suggested fix in the console
4. See the guide it mentions

**The app tells you exactly what's wrong and how to fix it!**

---

Happy smoothie making! 🥤✨
