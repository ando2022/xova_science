# 🚀 XOVA Deployment Guide - Vercel

## Prerequisites

- ✅ Supabase database configured and migrated
- ✅ All features tested locally
- ✅ GitHub account
- ✅ Vercel account (free tier works!)

---

## Step 1: Prepare Repository

### Option A: Using Git

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial XOVA platform setup"

# Create GitHub repository
# Go to github.com → New Repository → Name it "xova-platform"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/xova-platform.git

# Push
git push -u origin main
```

### Option B: Using GitHub Desktop

1. Open GitHub Desktop
2. Add this folder as repository
3. Commit all changes
4. Publish to GitHub

---

## Step 2: Deploy to Vercel

### Quick Deploy (Recommended)

1. Go to https://vercel.com
2. Click **Import Project**
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click **Deploy** 🚀

### Manual Configuration

If you need to add environment variables:

**Add to Vercel Dashboard → Settings → Environment Variables:**

```
Name: VITE_SUPABASE_URL
Value: https://byyxnzeblpbuzvxubhgc.supabase.co

Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5eXhuemVibHBidXp2eHViaGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMzY2MTAsImV4cCI6MjA3MzYxMjYxMH0.zPmKFVAyCU-MtzyD8ckqqV8NCe_6Yh6FSiI8SSshoFA
```

**Note:** These are already hardcoded in the app, but you can override them with env vars.

---

## Step 3: Configure Supabase for Production

### Update Auth Settings

1. Go to Supabase Dashboard
2. Navigate to **Authentication → URL Configuration**
3. Add your Vercel URL to **Site URL**:
   ```
   https://xova-platform.vercel.app
   ```
4. Add to **Redirect URLs**:
   ```
   https://xova-platform.vercel.app/**
   ```

### Enable Email Auth

1. **Authentication → Providers**
2. Enable **Email**
3. Customize email templates:
   - Magic Link template
   - Confirmation email template
   - Password reset template

---

## Step 4: Custom Domain (Optional)

### Add Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `xova.ch`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)
5. Update Supabase redirect URLs to include custom domain

### Recommended DNS Settings

```
Type  Name    Value
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

---

## Step 5: Performance Optimization

### Enable Vercel Features

**Analytics:**
- Enable Web Analytics in Vercel Dashboard
- Track page views, performance, user flow

**Speed Insights:**
- Enable Speed Insights
- Monitor Core Web Vitals

**Edge Functions (if needed):**
- Consider moving API routes to Edge Functions
- Lower latency for global users

### Optimize Build

Create `vercel.json` in root:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Step 6: Monitoring & Alerts

### Set Up Monitoring

1. **Vercel Monitoring:**
   - Enable deployment notifications
   - Set up Slack/Discord webhooks
   - Configure error alerts

2. **Supabase Monitoring:**
   - Check Database → Logs regularly
   - Set up email alerts for auth issues
   - Monitor API usage in Dashboard

3. **Uptime Monitoring:**
   - Use UptimeRobot (free)
   - Monitor: `https://your-domain.com`
   - Get alerts if site goes down

### Health Check Endpoint

Create `/api/health.ts`:

```typescript
export default function handler() {
  return new Response(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

---

## Step 7: Post-Deployment Checklist

### Verify Deployment

- [ ] Visit your production URL
- [ ] Test signup flow
- [ ] Test login (password & magic link)
- [ ] Complete profile builder
- [ ] Generate smoothie
- [ ] Check all navigation
- [ ] Test on mobile device
- [ ] Check browser console (no errors)
- [ ] Test logout/login cycle

### Performance Check

- [ ] PageSpeed Insights score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No layout shift
- [ ] All images optimized

### Security Check

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] HSTS headers configured
- [ ] CSP headers (optional)
- [ ] XSS protection enabled
- [ ] Supabase RLS verified

---

## Step 8: Continuous Deployment

### Auto-Deploy on Git Push

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push

# Vercel will automatically:
# 1. Detect the push
# 2. Build the project
# 3. Deploy to production
# 4. Notify you of completion
```

### Preview Deployments

- Every PR gets a preview URL
- Test changes before merging
- Share with team for feedback

---

## Step 9: Add Stripe Payments (Next Phase)

### Stripe Setup

1. **Create Stripe Account:**
   - Go to stripe.com
   - Select Switzerland 🇨🇭
   - Set currency to CHF

2. **Get API Keys:**
   - Dashboard → Developers → API keys
   - Copy Publishable key and Secret key

3. **Add to Vercel:**
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...  (server-side only!)
   ```

4. **Create Products:**
   - Premium: CHF 10/week (recurring)
   - Delivery: Variable pricing

5. **Set Up Webhooks:**
   - Webhook URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `customer.subscription.*`, `invoice.*`

---

## Step 10: Advanced Features

### Background Jobs with Vercel Cron

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-checkin",
      "schedule": "0 8 * * *"
    },
    {
      "path": "/api/cron/delivery-reminder",
      "schedule": "0 18 * * 0"
    }
  ]
}
```

Create `/api/cron/daily-checkin.ts`:

```typescript
export const config = { runtime: 'edge' };

export default async function handler() {
  // Send daily check-in reminders
  // Query users who need reminders
  // Send emails via Supabase
  
  return new Response('OK');
}
```

---

## Troubleshooting

### Build Fails

**Check build logs in Vercel:**
- Look for TypeScript errors
- Check for missing dependencies
- Verify all imports are correct

**Common fixes:**
```bash
# Clear cache and rebuild
vercel --force

# Check node version
node --version  # Should be 18+

# Install dependencies locally
npm install
npm run build
```

### Runtime Errors

**Check Vercel Function Logs:**
- Dashboard → Deployments → Click deployment → Functions tab
- Look for error messages

**Common issues:**
- CORS errors: Configure in Supabase
- Auth errors: Check redirect URLs
- Database errors: Verify RLS policies

---

## Production Best Practices

### Environment Variables

```bash
# Development (.env.local)
VITE_SUPABASE_URL=https://byyxnzeblpbuzvxubhgc.supabase.co
VITE_SUPABASE_ANON_KEY=your_key

# Production (Vercel Dashboard)
# Add as Environment Variables
# Scope: Production
```

### Database Backups

**Enable in Supabase:**
1. Dashboard → Settings → Database
2. Enable Point-in-Time Recovery
3. Set retention: 7 days minimum
4. Schedule weekly manual backups

### SSL & Security

**Vercel provides:**
- ✅ Automatic HTTPS
- ✅ SSL certificates (Let's Encrypt)
- ✅ DDoS protection
- ✅ Edge caching

**Add Security Headers:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## Success! 🎉

Your XOVA platform is now live at:
- **Production**: `https://xova-platform.vercel.app`
- **Custom Domain**: `https://xova.ch` (if configured)

### Next Steps

1. Share with beta testers
2. Collect feedback
3. Monitor analytics
4. Add Stripe payments
5. Launch marketing campaign
6. Scale! 🚀

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Discord**: https://vercel.com/discord
- **Supabase Discord**: https://discord.supabase.com

---

**Questions?** Check the troubleshooting section or reach out to the Vercel/Supabase communities!

Made with ❤️ for XOVA
