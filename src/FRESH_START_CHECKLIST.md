# ✅ XOVA Fresh Start Checklist

## Status: Follow these steps in order

### ☐ Step 1: Create New Supabase Project
- [ ] Go to https://supabase.com/dashboard
- [ ] Click "New Project"
- [ ] Name: `XOVA`
- [ ] Region: `Europe (Frankfurt)`
- [ ] Create strong password and SAVE IT
- [ ] Wait for project to be created (2-3 minutes)

### ☐ Step 2: Get Credentials
- [ ] Go to Settings → API
- [ ] Copy **Project URL** (https://xxxxx.supabase.co)
- [ ] Copy **anon public** key (starts with eyJhbGci...)

### ☐ Step 3: Update App
- [ ] Open `/lib/supabase.ts`
- [ ] Replace `PASTE_YOUR_PROJECT_URL_HERE` with your URL
- [ ] Replace `PASTE_YOUR_ANON_KEY_HERE` with your anon key
- [ ] Save the file

### ☐ Step 4: Configure Auth
- [ ] In Supabase Dashboard → Authentication → Settings
- [ ] Turn OFF "Confirm email"
- [ ] Click Save

### ☐ Step 5: Run Migration
- [ ] In Supabase Dashboard → SQL Editor
- [ ] Click "New Query"
- [ ] Copy ENTIRE `/supabase-migrations.sql` file
- [ ] Paste into SQL Editor
- [ ] Click "RUN"
- [ ] See "Success. No rows returned"

### ☐ Step 6: Verify Tables
- [ ] In Supabase Dashboard → Table Editor
- [ ] See 6 tables listed:
  - profiles
  - smoothies
  - check_ins
  - favorites
  - delivery_orders
  - analytics_events

### ☐ Step 7: Test Signup
- [ ] Refresh XOVA app
- [ ] Clear Local Storage (F12 → Application → Local Storage → Clear)
- [ ] Click "Sign Up"
- [ ] Use a NEW email
- [ ] See "Account created successfully!"
- [ ] See Profile Builder page
- [ ] Complete all 4 profile steps
- [ ] Reach Dashboard

### ☐ Step 8: Celebrate! 🎉
- [ ] Your XOVA platform is now running on a fresh Supabase project
- [ ] You can create smoothie recipes
- [ ] Check out café matching
- [ ] Plan weekly deliveries

---

## 🆘 If Something Goes Wrong

### Signup fails or keeps spinning
- Check browser console (F12 → Console) for errors
- Make sure you pasted credentials correctly in `/lib/supabase.ts`
- Make sure migration was run successfully
- Try a different email address

### Can't see tables in Table Editor
- Go back to SQL Editor
- Run migration again
- Check for error messages in red

### "Invalid API key" error
- Double-check credentials in `/lib/supabase.ts`
- Make sure you copied the ANON key, not the SERVICE key
- Make sure there are no extra spaces

### Still stuck?
- Check `DATABASE_SETUP_GUIDE.md` for detailed troubleshooting
- Look at browser console for specific error messages
- Make sure you're using the NEW project, not the old one

---

## 📝 What You Have Now

✅ Fresh Supabase project dedicated to XOVA  
✅ No conflicts with your old website  
✅ All database tables created  
✅ Authentication configured  
✅ Ready for production use  

Next steps:
- Invite users to test
- Configure custom domain (optional)
- Set up Stripe for payments (see DEPLOY.md)
- Deploy to Vercel (see DEPLOY.md)
