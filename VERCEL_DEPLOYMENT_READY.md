# Vercel Deployment Guide - Cerebrum Biology Academy

## 🚀 Quick Start - Ready to Deploy

This guide provides everything you need to deploy to Vercel in **checkbox format** with **copy-paste ready values**.

---

## 📋 IMMEDIATE COPY-PASTE SECTION

### ✅ Pre-Generated Secrets (Ready to Use)

Copy these directly into Vercel Dashboard → Settings → Environment Variables:

```bash
# Authentication & Security Secrets
AUTH_SECRET=/jyLZuV+o9B2fMWW/HWlyQKAu5Q/IrT9KhIAlny0oEk=
JWT_SECRET=G8kMkhiYUjxpf6P7J3RktRMPtk5LfIuU2VA4AFeBXNY=
JWT_REFRESH_SECRET=dwVdeu7nXZxqKYFl1v/tGmn489L50WGrXKbZ+xrCWtE=
NEXTAUTH_SECRET=56067ceeb2568d1849c118ed0a5668e5f6829f77c3e06640ca499878f9198cd2
```

### ✅ Production URLs

```bash
NEXTAUTH_URL=https://cerebrumbiologyacademy.com
NEXT_PUBLIC_APP_URL=https://cerebrumbiologyacademy.com
```

### ✅ Application Configuration

```bash
NODE_ENV=production
NEXT_PUBLIC_ENVIRONMENT=production
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000
SESSION_MAX_AGE=604800
REFRESH_TOKEN_MAX_AGE=2592000
LOG_LEVEL=info
NEXT_PUBLIC_ENABLE_LOGGING=true
NEXT_PUBLIC_DEBUG_MODE=false
```

---

## 🎯 Step-by-Step Vercel Configuration

### Navigation: Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **cerebrum-biology-academy-website**
3. Click **Settings** → **Environment Variables**

**Time Estimate:** 20-30 minutes for complete setup

---

## 🔴 CRITICAL - Configure First (Required for Basic Function)

### 1. Database Configuration ⏱️ 5 minutes

**Where to get:** Neon.tech / Supabase / Railway Dashboard

- [ ] `DATABASE_URL`

  ```
  postgresql://[user]:[password]@[host]:5432/cerebrum_academy_prod?sslmode=require
  ```

  - ⚠️ Use **production database**, not development
  - ⚠️ Enable SSL mode (`sslmode=require`)
  - Environment: **Production** and **Preview**

- [ ] `DIRECT_URL`

  ```
  postgresql://[user]:[password]@[host]:5432/cerebrum_academy_prod?sslmode=require
  ```

  - ℹ️ Same as DATABASE_URL for most providers
  - Environment: **Production** and **Preview**

**Testing:**

```bash
# After deployment, verify connection
curl https://cerebrumbiologyacademy.com/api/health/database
```

---

### 2. Authentication Secrets ⏱️ 2 minutes

**✅ Already Generated - Just Copy-Paste:**

- [ ] `AUTH_SECRET`

  ```
  /jyLZuV+o9B2fMWW/HWlyQKAu5Q/IrT9KhIAlny0oEk=
  ```

  - Environment: **Production**, **Preview**, **Development**

- [ ] `JWT_SECRET`

  ```
  G8kMkhiYUjxpf6P7J3RktRMPtk5LfIuU2VA4AFeBXNY=
  ```

  - Environment: **Production**, **Preview**, **Development**

- [ ] `JWT_REFRESH_SECRET`

  ```
  dwVdeu7nXZxqKYFl1v/tGmn489L50WGrXKbZ+xrCWtE=
  ```

  - Environment: **Production**, **Preview**, **Development**

- [ ] `NEXTAUTH_SECRET`

  ```
  56067ceeb2568d1849c118ed0a5668e5f6829f77c3e06640ca499878f9198cd2
  ```

  - Environment: **Production**, **Preview**, **Development**

- [ ] `NEXTAUTH_URL`

  ```
  https://cerebrumbiologyacademy.com
  ```

  - Environment: **Production** only
  - ⚠️ For Preview, use `https://YOUR_PREVIEW_URL.vercel.app`

- [ ] `NEXT_PUBLIC_APP_URL`

  ```
  https://cerebrumbiologyacademy.com
  ```

  - Environment: **Production** only
  - ⚠️ For Preview, use `https://YOUR_PREVIEW_URL.vercel.app`

**Testing:**

```bash
curl https://cerebrumbiologyacademy.com/api/auth/session
```

---

### 3. Razorpay Payment Gateway ⏱️ 5 minutes

**Where to get:** [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)

⚠️ **CRITICAL:** Use **LIVE** keys for production, NOT test keys!

- [ ] `RAZORPAY_KEY_ID`

  ```
  rzp_live_YOUR_KEY_ID
  ```

  - Environment: **Production**
  - 📝 Get from: API Keys → Live Mode

- [ ] `RAZORPAY_KEY_SECRET`

  ```
  YOUR_SECRET_KEY
  ```

  - Environment: **Production**
  - ⚠️ Keep this secret! Never expose in frontend

- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID`

  ```
  rzp_live_YOUR_KEY_ID
  ```

  - Environment: **Production**
  - ℹ️ Same as RAZORPAY_KEY_ID (public key)

- [ ] `RAZORPAY_WEBHOOK_SECRET`

  ```
  YOUR_WEBHOOK_SECRET
  ```

  - Environment: **Production**
  - 📝 Get from: Webhooks → Create Webhook
  - 🔗 Webhook URL: `https://cerebrumbiologyacademy.com/api/webhooks/razorpay`
  - 📋 Events to subscribe:
    - `payment.authorized`
    - `payment.captured`
    - `payment.failed`
    - `subscription.activated`
    - `subscription.cancelled`

**For Preview/Development:**
Use test keys:

- [ ] `RAZORPAY_KEY_ID` → `rzp_test_YOUR_TEST_KEY`
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID` → `rzp_test_YOUR_TEST_KEY`
- Environment: **Preview** and **Development**

**Testing:**

```bash
# Test payment initialization
curl -X POST https://cerebrumbiologyacademy.com/api/payments/create \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "INR"}'
```

---

## 🟡 HIGH PRIORITY - Configure for Full Functionality

### 4. Email Service (Choose One) ⏱️ 5 minutes

#### Option A: Resend (Recommended) ⭐

**Where to get:** [Resend API Keys](https://resend.com/api-keys)

- [ ] `RESEND_API_KEY`

  ```
  re_YOUR_API_KEY
  ```

  - Environment: **Production**, **Preview**

- [ ] `RESEND_FROM_EMAIL`

  ```
  noreply@cerebrumbiologyacademy.com
  ```

  - ⚠️ Domain must be verified in Resend
  - Environment: **Production**, **Preview**

**Domain Setup:**

1. Add domain in Resend Dashboard
2. Add DNS records to your domain provider
3. Verify domain

**Testing:**

```bash
curl -X POST https://cerebrumbiologyacademy.com/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

#### Option B: SendGrid (Alternative)

- [ ] `SENDGRID_API_KEY` → `SG.YOUR_API_KEY`
- [ ] `SENDGRID_FROM_EMAIL` → `noreply@cerebrumbiologyacademy.com`

---

### 5. WhatsApp Business API ⏱️ 10 minutes

**Where to get:** [Meta Business Manager](https://business.facebook.com/) → WhatsApp → API Access

**Prerequisites:**

1. Facebook Business Account
2. WhatsApp Business Account
3. Verified Business Phone Number

**Configuration:**

- [ ] `WHATSAPP_BUSINESS_ACCOUNT_ID`

  ```
  YOUR_BUSINESS_ACCOUNT_ID
  ```

  - Environment: **Production**, **Preview**

- [ ] `WHATSAPP_PHONE_NUMBER_ID`

  ```
  YOUR_PHONE_NUMBER_ID
  ```

  - Environment: **Production**, **Preview**

- [ ] `WHATSAPP_ACCESS_TOKEN`

  ```
  YOUR_PERMANENT_ACCESS_TOKEN
  ```

  - ⚠️ Use **System User Token** with never-expiring access
  - Environment: **Production**, **Preview**

- [ ] `WHATSAPP_API_VERSION`

  ```
  v21.0
  ```

  - Environment: **Production**, **Preview**

- [ ] `WHATSAPP_VERIFY_TOKEN`

  ```
  YOUR_CUSTOM_VERIFY_TOKEN
  ```

  - ℹ️ Create your own random string
  - Used for webhook verification
  - Environment: **Production**, **Preview**

- [ ] `WHATSAPP_ADMIN_NUMBER`

  ```
  +91YOUR_PHONE_NUMBER
  ```

  - ℹ️ Admin number for notifications
  - Environment: **Production**, **Preview**

**Webhook Setup:**

1. Go to Meta App Dashboard → WhatsApp → Configuration
2. Set Webhook URL: `https://cerebrumbiologyacademy.com/api/webhooks/whatsapp`
3. Use your `WHATSAPP_VERIFY_TOKEN`
4. Subscribe to: `messages`, `message_status`

**Testing:**

```bash
curl https://cerebrumbiologyacademy.com/api/whatsapp/test
```

---

### 6. File Upload (UploadThing) ⏱️ 3 minutes

**Where to get:** [UploadThing Dashboard](https://uploadthing.com/dashboard)

- [ ] `UPLOADTHING_SECRET`

  ```
  sk_live_YOUR_SECRET
  ```

  - Environment: **Production**
  - ⚠️ Use `sk_test_` for Preview/Development

- [ ] `UPLOADTHING_APP_ID`

  ```
  YOUR_APP_ID
  ```

  - Environment: **Production**, **Preview**

**Testing:**

```bash
# Test file upload endpoint
curl https://cerebrumbiologyacademy.com/api/uploadthing
```

---

### 7. Google OAuth (Optional but Recommended) ⏱️ 5 minutes

**Where to get:** [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

**Setup Steps:**

1. Create OAuth 2.0 Client ID
2. Add authorized redirect URI: `https://cerebrumbiologyacademy.com/api/auth/callback/google`
3. For Preview: `https://*.vercel.app/api/auth/callback/google`

**Configuration:**

- [ ] `GOOGLE_CLIENT_ID`

  ```
  YOUR_CLIENT_ID.apps.googleusercontent.com
  ```

  - Environment: **Production**, **Preview**

- [ ] `GOOGLE_CLIENT_SECRET`

  ```
  YOUR_CLIENT_SECRET
  ```

  - Environment: **Production**, **Preview**

**Testing:**

```bash
# Try Google login
open https://cerebrumbiologyacademy.com/auth/signin
```

---

### 8. Analytics & Monitoring ⏱️ 3 minutes

#### Google Analytics 4

**Where to get:** [Google Analytics](https://analytics.google.com/)

- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID`

  ```
  G-YOUR_GA4_ID
  ```

  - Environment: **Production** only
  - ℹ️ Skip for Preview to avoid polluting analytics

**Setup:**

1. Create GA4 Property
2. Get Measurement ID from Admin → Data Streams

#### Vercel Analytics (Auto-configured)

- [ ] `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`

  ```
  auto
  ```

  - Environment: **Production**, **Preview**
  - ℹ️ Vercel auto-configures this

#### Sentry Error Tracking (Optional)

**Where to get:** [Sentry.io](https://sentry.io/)

- [ ] `SENTRY_DSN`

  ```
  https://YOUR_KEY@YOUR_ORG.ingest.sentry.io/YOUR_PROJECT_ID
  ```

  - Environment: **Production**, **Preview**

- [ ] `NEXT_PUBLIC_SENTRY_DSN`

  ```
  https://YOUR_KEY@YOUR_ORG.ingest.sentry.io/YOUR_PROJECT_ID
  ```

  - Environment: **Production**, **Preview**

---

## 🟢 OPTIONAL - Enhanced Features

### 9. AI Services (Optional) ⏱️ 2 minutes

#### OpenAI (For AI Tutoring)

**Where to get:** [OpenAI API Keys](https://platform.openai.com/api-keys)

- [ ] `OPENAI_API_KEY`

  ```
  sk-proj-YOUR_API_KEY
  ```

  - Environment: **Production**, **Preview**
  - ⚠️ Monitor usage to control costs

**Feature Flags:**

- [ ] `NEXT_PUBLIC_ENABLE_AI_TUTOR`

  ```
  true
  ```

  - Set to `false` to disable AI features

**Testing:**

```bash
curl -X POST https://cerebrumbiologyacademy.com/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain photosynthesis"}'
```

---

### 10. Video Conferencing (Zoom) ⏱️ 5 minutes

**Where to get:** [Zoom Marketplace](https://marketplace.zoom.us/)

**Setup:**

1. Create Server-to-Server OAuth App
2. Get credentials from App Credentials page

- [ ] `ZOOM_ACCOUNT_ID`

  ```
  YOUR_ACCOUNT_ID
  ```

  - Environment: **Production**, **Preview**

- [ ] `ZOOM_CLIENT_ID`

  ```
  YOUR_CLIENT_ID
  ```

  - Environment: **Production**, **Preview**

- [ ] `ZOOM_CLIENT_SECRET`

  ```
  YOUR_CLIENT_SECRET
  ```

  - Environment: **Production**, **Preview**

**Feature Flags:**

- [ ] `NEXT_PUBLIC_ENABLE_LIVE_CLASSES`
  ```
  true
  ```

**Testing:**

```bash
curl -X POST https://cerebrumbiologyacademy.com/api/zoom/create-meeting \
  -H "Content-Type: application/json" \
  -d '{"topic": "Test Meeting"}'
```

---

### 11. Redis Cache (Optional) ⏱️ 3 minutes

**Where to get:** [Upstash Console](https://console.upstash.com/) or Redis Cloud

- [ ] `REDIS_URL`

  ```
  redis://default:YOUR_PASSWORD@YOUR_HOST:6379
  ```

  - Environment: **Production**, **Preview**

- [ ] `REDIS_TOKEN`

  ```
  YOUR_REDIS_TOKEN
  ```

  - Environment: **Production**, **Preview**
  - ℹ️ Only needed for Upstash

**Testing:**

```bash
curl https://cerebrumbiologyacademy.com/api/cache/test
```

---

### 12. SMS Service (Twilio - Optional) ⏱️ 3 minutes

**Where to get:** [Twilio Console](https://console.twilio.com/)

- [ ] `TWILIO_ACCOUNT_SID`

  ```
  ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  ```

  - Environment: **Production**, **Preview**

- [ ] `TWILIO_AUTH_TOKEN`

  ```
  YOUR_AUTH_TOKEN
  ```

  - Environment: **Production**, **Preview**

- [ ] `TWILIO_PHONE_NUMBER`

  ```
  +1YOUR_NUMBER
  ```

  - Environment: **Production**, **Preview**

---

## 📊 Environment Variables Summary

### Vercel Dashboard Navigation

**Exact Steps:**

1. Go to [vercel.com](https://vercel.com)
2. Click on **cerebrum-biology-academy-website** project
3. Click **Settings** tab
4. Click **Environment Variables** in sidebar
5. For each variable below:
   - Click **Add New**
   - Enter **Name** (e.g., `DATABASE_URL`)
   - Enter **Value**
   - Select **Environments**: Production / Preview / Development
   - Click **Save**

### Environment Selection Guide

| Environment     | When to Use                             |
| --------------- | --------------------------------------- |
| **Production**  | Live site (cerebrumbiologyacademy.com)  |
| **Preview**     | PR deployments, staging (\*.vercel.app) |
| **Development** | Local development (optional)            |

### Quick Copy Template for Vercel

**Critical Variables (Must Configure):**

```bash
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
AUTH_SECRET=/jyLZuV+o9B2fMWW/HWlyQKAu5Q/IrT9KhIAlny0oEk=
JWT_SECRET=G8kMkhiYUjxpf6P7J3RktRMPtk5LfIuU2VA4AFeBXNY=
JWT_REFRESH_SECRET=dwVdeu7nXZxqKYFl1v/tGmn489L50WGrXKbZ+xrCWtE=
NEXTAUTH_SECRET=56067ceeb2568d1849c118ed0a5668e5f6829f77c3e06640ca499878f9198cd2
NEXTAUTH_URL=https://cerebrumbiologyacademy.com
NEXT_PUBLIC_APP_URL=https://cerebrumbiologyacademy.com
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_WEBHOOK_SECRET=...
```

**High Priority Variables:**

```bash
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@cerebrumbiologyacademy.com
WHATSAPP_BUSINESS_ACCOUNT_ID=...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_API_VERSION=v21.0
WHATSAPP_VERIFY_TOKEN=...
WHATSAPP_ADMIN_NUMBER=+91...
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

---

## 🧪 Verification Checklist

After configuring all variables, verify each service:

### Database

- [ ] `curl https://cerebrumbiologyacademy.com/api/health/database`
- ✅ Should return `{ "status": "ok", "database": "connected" }`

### Authentication

- [ ] Visit `https://cerebrumbiologyacademy.com/auth/signin`
- [ ] Try email/password login
- [ ] Try Google OAuth login
- ✅ Should successfully authenticate

### Payments

- [ ] Visit a course page
- [ ] Click "Enroll Now"
- [ ] Complete test payment (use test card: 4111 1111 1111 1111)
- ✅ Should process payment successfully

### Email

- [ ] Trigger password reset
- [ ] Check email delivery
- ✅ Should receive email within 1 minute

### WhatsApp

- [ ] Send test message via admin panel
- ✅ Should receive WhatsApp message

### File Upload

- [ ] Try uploading profile picture
- ✅ Should upload successfully

### Analytics

- [ ] Open browser console on site
- [ ] Check for GA events
- ✅ Should see `gtag` events firing

---

## 🚨 Common Issues & Solutions

### Issue: Database Connection Failed

**Solution:**

- Check SSL mode is enabled: `?sslmode=require`
- Verify IP allowlist (Neon/Supabase allows all by default)
- Test connection string locally first

### Issue: Razorpay Webhook Not Receiving

**Solution:**

- Verify webhook URL: `https://cerebrumbiologyacademy.com/api/webhooks/razorpay`
- Check webhook secret matches
- Test with Razorpay webhook tester

### Issue: WhatsApp Messages Not Sending

**Solution:**

- Verify access token hasn't expired
- Check phone number is verified
- Ensure templates are approved (for India)

### Issue: Email Sending Failed

**Solution:**

- Verify domain is verified in Resend
- Check DNS records (SPF, DKIM)
- Monitor Resend dashboard for errors

### Issue: Google OAuth Not Working

**Solution:**

- Add authorized redirect URI for your domain
- Check client ID/secret are correct
- Verify OAuth consent screen is configured

---

## 🔒 Security Checklist

Before going live:

- [ ] All secrets are unique (not copied from .env.example)
- [ ] Using LIVE Razorpay keys (not test keys)
- [ ] Database has SSL enabled
- [ ] NEXTAUTH_URL matches production domain
- [ ] Razorpay webhook is configured
- [ ] WhatsApp webhook is configured
- [ ] Google OAuth redirect URIs are correct
- [ ] Debug mode is disabled (`NEXT_PUBLIC_DEBUG_MODE=false`)
- [ ] Proper rate limiting is configured
- [ ] Sentry is configured for error tracking
- [ ] All API keys are from production accounts

---

## 📈 Post-Deployment Monitoring

### First 24 Hours

Monitor these endpoints:

- `/api/health` - Overall health check
- `/api/health/database` - Database connectivity
- Vercel Dashboard → Analytics → Errors
- Sentry Dashboard → Issues
- Razorpay Dashboard → Payments
- Google Analytics → Real-time users

### Weekly

- [ ] Check error rates in Sentry
- [ ] Review payment success rates
- [ ] Monitor email delivery rates
- [ ] Check WhatsApp message delivery
- [ ] Review API usage and costs

---

## 🎉 Deployment Checklist

**Pre-Deployment:**

- [ ] All critical variables configured
- [ ] Database migrated to production
- [ ] Domain configured in Vercel
- [ ] SSL certificate active
- [ ] Webhooks configured

**Deployment:**

- [ ] Push to main branch
- [ ] Wait for Vercel build to complete
- [ ] Check deployment logs for errors

**Post-Deployment:**

- [ ] Run verification tests
- [ ] Test payment flow
- [ ] Test email delivery
- [ ] Test WhatsApp messaging
- [ ] Test user authentication
- [ ] Monitor error tracking

---

## 📞 Support Resources

### Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Razorpay API Docs](https://razorpay.com/docs/api/)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Resend Documentation](https://resend.com/docs)

### Getting API Keys

| Service       | Dashboard URL                    | Time to Setup              |
| ------------- | -------------------------------- | -------------------------- |
| Neon Database | https://neon.tech                | 5 min                      |
| Razorpay      | https://dashboard.razorpay.com   | 10 min (with KYC)          |
| Resend        | https://resend.com               | 3 min                      |
| WhatsApp      | https://business.facebook.com    | 30 min (with verification) |
| UploadThing   | https://uploadthing.com          | 2 min                      |
| Google OAuth  | https://console.cloud.google.com | 5 min                      |
| OpenAI        | https://platform.openai.com      | 3 min                      |
| Zoom          | https://marketplace.zoom.us      | 5 min                      |

---

## ⏰ Time Estimates

**Minimum Viable Deployment:** 20 minutes

- Database + Auth + Basic App

**Standard Deployment:** 45 minutes

- Above + Payments + Email + Storage

**Full Featured Deployment:** 90 minutes

- Everything including WhatsApp, Analytics, AI, Video

---

## ✅ Final Checklist

- [ ] Copied all pre-generated secrets to Vercel
- [ ] Configured database credentials
- [ ] Set up Razorpay (LIVE keys)
- [ ] Configured email service
- [ ] Set up WhatsApp (optional)
- [ ] Configured file upload
- [ ] Added Google OAuth
- [ ] Enabled analytics
- [ ] Tested all critical flows
- [ ] Monitored first deployment
- [ ] Set up error tracking
- [ ] Configured webhooks
- [ ] Verified SSL certificate
- [ ] Tested on mobile devices
- [ ] Ready to launch! 🚀

---

**Document Version:** 1.0
**Last Updated:** 2025-10-29
**Next Review:** Before production launch

For questions or issues, refer to the support resources above or check the Vercel deployment logs.
