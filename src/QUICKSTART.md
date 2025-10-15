# ⚡ XOVA Quick Start Checklist

## 🎯 Setup in 5 Minutes

### ✅ Step 1: Run Database Migration (2 minutes)

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Select project: `byyxnzeblpbuzvxubhgc`
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy ALL contents from `supabase-migrations.sql`
6. Paste and click **RUN** ▶️
7. Wait for "Success" message

**Expected output:**
```
XOVA database schema created successfully!
```

### ✅ Step 2: Verify Setup (1 minute)

1. In SQL Editor, create another **New Query**
2. Copy ALL contents from `verify-setup.sql`
3. Click **RUN** ▶️
4. Check for ✅ PASS on all tests

**What you should see:**
- ✅ PASS: All 6 tables created
- ✅ PASS: RLS enabled on all tables
- ✅ PASS: Performance indexes created
- ✅ PASS: RLS policies configured
- ✅ PASS: Timestamp triggers created

### ✅ Step 3: Test Authentication (1 minute)

1. Open the XOVA app
2. Click **Get Started**
3. Click **Sign up**
4. Enter your email and create a password
5. Check for success toast notification

**If using Magic Link:**
1. Switch to "Magic Link" tab
2. Enter your email
3. Check your inbox
4. Click the link

### ✅ Step 4: Complete Your Profile (1 minute)

Fill out the 4-step profile builder:

**Step 1 - Basic Info:**
- Age: 25
- Gender: Male/Female/Other
- Height: 170 cm
- Weight: 70 kg

**Step 2 - Health Goals:**
- Select at least one (e.g., "More Energy")

**Step 3 - Dietary Restrictions & Allergens:**
- Optional: Select any that apply

**Step 4 - Lifestyle & Preferences:**
- Activity Level: Moderate
- Sleep Quality: Good
- Stress Level: Moderate

Click **Complete Profile** ✅

### ✅ Step 5: Generate Your First Smoothie (30 seconds)

1. You'll land on the Dashboard
2. Click **Generate New Smoothie**
3. Wait for AI to create your personalized recipe
4. Review the scientific explanation
5. Click ⭐ to favorite it

---

## 🎉 You're Ready!

Your XOVA platform is now fully operational with:

- ✅ Secure authentication
- ✅ PostgreSQL database
- ✅ User profiles
- ✅ AI smoothie generation
- ✅ Scientific transparency
- ✅ Delivery system ready

---

## 🚀 Next Steps

### Explore the Platform

**Dashboard:**
- View your recent smoothies
- See your health profile summary
- Quick access to all features

**Smoothie Generator:**
- Generate unlimited personalized recipes
- View exact proportions and macros
- Read scientific explanations

**Café Matching:**
- Find nearby cafés in Zurich
- Match smoothies to café menus
- Pre-order for pickup

**Weekly Delivery:**
- Plan your weekly smoothie pack
- Choose from 20 personalized options
- Manage favorites and schedule

**Settings:**
- Update your health profile
- Change preferences
- View account details

### Test All Features

```
✅ Create account
✅ Complete profile
✅ Generate smoothie
✅ Add to favorites
✅ Try café matching
✅ Plan weekly delivery
✅ Update settings
✅ Logout and login again
```

---

## 🔧 Troubleshooting

### ❌ "Failed to save profile"

**Solution:**
1. Check Supabase SQL Editor for errors
2. Verify migration ran successfully
3. Run `verify-setup.sql` to check tables
4. Check browser console for detailed errors

### ❌ "Authentication error"

**Solution:**
1. Verify Supabase anon key is correct in `/lib/supabase.ts`
2. Check Supabase Dashboard → Settings → API
3. Ensure email auth is enabled in Authentication → Providers
4. Try logging out and back in

### ❌ "Can't generate smoothies"

**Solution:**
1. Ensure profile is completed
2. Check that user_id is being passed correctly
3. Check browser console for errors
4. Try refreshing the page

### ❌ Magic link not received

**Solution:**
1. Check spam folder
2. Verify email provider is enabled in Supabase
3. Check Supabase logs for email sending errors
4. Try password login instead

### ❌ RLS Policy Error

**Solution:**
```sql
-- Run in Supabase SQL Editor to check current user
SELECT auth.uid();

-- Should return your user ID
-- If NULL, you're not authenticated
```

---

## 📊 Monitoring

### Check User Count
```sql
SELECT COUNT(*) FROM auth.users;
```

### Check Recent Activity
```sql
SELECT event_type, COUNT(*) 
FROM analytics_events 
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY event_type;
```

### Check Database Health
```sql
SELECT 
  table_name,
  (SELECT COUNT(*) FROM profiles) as profiles_count,
  (SELECT COUNT(*) FROM smoothies) as smoothies_count,
  (SELECT COUNT(*) FROM delivery_orders) as orders_count;
```

---

## 🎓 Learning Resources

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Common Queries**: See `common-queries.sql`
- **Full Setup Guide**: See `SUPABASE_SETUP.md`

---

## 💡 Pro Tips

1. **Use Magic Links**: Faster login, better security
2. **Complete Profile First**: Enables all features
3. **Save Favorites**: Quick access to best smoothies
4. **Check Analytics**: Track your health journey
5. **Update Profile Regularly**: Better recommendations

---

## ✅ Success Checklist

Before considering setup complete:

- [ ] Database migration successful
- [ ] All 6 tables created
- [ ] RLS enabled and working
- [ ] Can sign up new user
- [ ] Can complete profile
- [ ] Can generate smoothie
- [ ] Can add to favorites
- [ ] Can access all pages
- [ ] No console errors
- [ ] Logout/login works

---

## 🎯 Ready for Production?

### Pre-Launch Checklist

- [ ] Run `verify-setup.sql` - all ✅ PASS
- [ ] Test all user flows
- [ ] Configure email templates in Supabase
- [ ] Set up custom domain
- [ ] Enable Supabase backups
- [ ] Add monitoring/alerts
- [ ] Test payment integration (when ready)
- [ ] Load test with 100+ users
- [ ] Security audit
- [ ] Privacy policy & terms

### Go Live! 🚀

1. Deploy to Vercel
2. Configure production environment variables
3. Point custom domain
4. Enable SSL
5. Launch! 🎉

---

**Questions?** Check `SUPABASE_SETUP.md` for detailed troubleshooting.

**Ready to add payments?** See Stripe integration section in `README.md`.

---

Made with ❤️ for XOVA
