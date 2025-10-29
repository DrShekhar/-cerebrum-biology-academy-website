# 🚀 DEPLOY NOW - Interactive Guide

## Cerebrum Biology Academy - Go Live in ~60 Minutes

**Current Progress:** Database Backup

---

## ✅ STEP 1: DATABASE BACKUP (In Progress)

### Action: Create Backup in Supabase

1. Go to: https://app.supabase.com
2. Select project: cerebrum-biology-academy (ID: `auhvqhytfunmzdnccgtz`)
3. Sidebar: Database → Backups
4. Click: "Create a new backup"
5. Wait for completion (~1-2 min)

**When done, type:** "backup done"

---

## ⏳ STEP 2: ROTATE DATABASE PASSWORD (Next - 5 min)

###Actions Required:

1. **In Supabase:** Settings → Database → Database Password
2. Click: "Generate new password"
3. **COPY THE PASSWORD IMMEDIATELY** (shown only once!)
4. Save in password manager

### Format New Connection String:

```
postgresql://postgres.[PROJECT]:[NEW-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

Replace `[NEW-PASSWORD]` with the password you copied.

---

## 🔑 STEP 3: CONFIGURE VERCEL (20-30 min)

### 3.1: Create/Select Vercel Project

1. Go to: https://vercel.com/new
2. Import from GitHub: `cerebrum-biology-academy-website`
3. Framework: Next.js (auto-detected)
4. **DON'T deploy yet** - click "Environment Variables" first

### 3.2: Add Environment Variables

Go to: Project Settings → Environment Variables

**Copy-paste these EXACTLY:**

#### 🔴 CRITICAL (Must Add):

**Database:**

```
DATABASE_URL=postgresql://postgres.[PROJECT]:[NEW-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

Environment: Production + Preview

**Auth Secrets (Pre-generated):**

```
AUTH_SECRET=/jyLZuV+o9B2fMWW/HWlyQKAu5Q/IrT9KhIAlny0oEk=
```

Environment: Production + Preview + Development

```
JWT_SECRET=G8kMkhiYUjxpf6P7J3RktRMPtk5LfIuU2VA4AFeBXNY=
```

Environment: Production + Preview + Development

```
JWT_REFRESH_SECRET=dwVdeu7nXZxqKYFl1v/tGmn489L50WGrXKbZ+xrCWtE=
```

Environment: Production + Preview + Development

```
NEXTAUTH_SECRET=56067ceeb2568d1849c118ed0a5668e5f6829f77c3e06640ca499878f9198cd2
```

Environment: Production + Preview + Development

**URLs:**

```
NEXTAUTH_URL=https://cerebrumbiologyacademy.com
```

Environment: Production only

```
NEXT_PUBLIC_APP_URL=https://cerebrumbiologyacademy.com
```

Environment: Production only

#### 🔴 RAZORPAY (Required for Payments):

**Get from:** https://dashboard.razorpay.com/app/keys

**For Testing (Add these first):**

```
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY
```

Environment: Preview + Development

```
RAZORPAY_KEY_SECRET=YOUR_TEST_SECRET
```

Environment: Preview + Development

```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY
```

Environment: Preview + Development

**For Production (Add after testing):**

```
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
```

Environment: Production

```
RAZORPAY_KEY_SECRET=YOUR_LIVE_SECRET
```

Environment: Production

```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
```

Environment: Production

```
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET
```

Environment: Production

**Webhook Setup:**

1. Razorpay Dashboard → Webhooks
2. URL: `https://cerebrumbiologyacademy.com/api/webhooks/razorpay`
3. Events: `payment.authorized`, `payment.captured`, `payment.failed`

#### 🟡 OPTIONAL (Can add later):

**Email (if using Resend):**

```
RESEND_API_KEY=re_YOUR_API_KEY
```

**WhatsApp (if configured):**

```
WHATSAPP_ACCESS_TOKEN=YOUR_TOKEN
WHATSAPP_PHONE_NUMBER_ID=YOUR_PHONE_ID
```

**Analytics:**

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🌐 STEP 4: DOMAIN CONFIGURATION (10 min)

### 4.1: Add Domain in Vercel

1. Project Settings → Domains
2. Add: `cerebrumbiologyacademy.com`
3. Add: `www.cerebrumbiologyacademy.com`

### 4.2: Configure DNS (Your Domain Registrar)

**Type A Record:**

```
Name: @
Type: A
Value: 76.76.21.21
TTL: 3600
```

**Type CNAME Record:**

```
Name: www
Type: CNAME
Value: cname.vercel-dns.com
TTL: 3600
```

Wait 5-10 minutes for DNS propagation.

---

## 🚀 STEP 5: DEPLOY! (5 min)

1. In Vercel: Click "Deploy"
2. Watch build logs
3. Wait for "Ready" status (~3-5 min)
4. Note deployment URL

---

## ✅ STEP 6: VERIFY DEPLOYMENT (10 min)

### Run Automated Verification:

```bash
npm run verify:deployment
```

### Manual Checks:

- [ ] Homepage loads: https://cerebrumbiologyacademy.com
- [ ] No errors in browser console (F12)
- [ ] Courses page shows 3 courses
- [ ] Purchase page loads: /purchase/class-11

---

## 💳 STEP 7: TEST PAYMENT (15 min)

### Using Test Mode (Razorpay):

1. Go to: https://cerebrumbiologyacademy.com/purchase/class-11
2. Fill form:
   - Name: Test Student
   - Email: test@example.com
   - Phone: 9876543210
3. Click "Pay Now"
4. Use test card:
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/26`
5. Complete payment
6. Verify:
   - [ ] Payment successful
   - [ ] Enrollment created
   - [ ] Success page shown

---

## 🎯 STEP 8: GO LIVE (5 min)

### Switch to Live Razorpay Keys:

1. Vercel → Environment Variables
2. Edit: `RAZORPAY_KEY_ID` (Production)
3. Change to: `rzp_live_YOUR_LIVE_KEY`
4. Edit: `NEXT_PUBLIC_RAZORPAY_KEY_ID` (Production)
5. Change to: `rzp_live_YOUR_LIVE_KEY`
6. Edit: `RAZORPAY_KEY_SECRET` (Production)
7. Redeploy

### Test with ₹1:

1. Make test purchase for ₹1
2. Verify in Razorpay dashboard
3. Refund immediately

---

## 🎉 STEP 9: YOU'RE LIVE!

### Monitor First 24 Hours:

- [ ] Check Vercel logs for errors
- [ ] Monitor Razorpay dashboard
- [ ] Test from different devices
- [ ] Verify emails sending (if configured)

### Next Steps:

- Add email service (Resend/SendGrid)
- Add WhatsApp automation
- Add Google Analytics
- Monitor performance

---

## 🆘 NEED HELP?

**Common Issues:**

- "Database connection failed" → Check DATABASE_URL format
- "Payment failed" → Verify Razorpay keys are correct
- "Page not found" → Wait for DNS propagation (up to 24 hrs)
- "Build failed" → Check Vercel build logs

**Emergency Rollback:**
Vercel Dashboard → Deployments → Previous → Redeploy

---

## 📞 CURRENT STATUS

**Completed:**

- [x] Database seeded (3 courses)
- [x] Secrets generated
- [x] Documentation ready
- [ ] **Database backup** ← YOU ARE HERE
- [ ] Password rotated
- [ ] Vercel configured
- [ ] Domain connected
- [ ] First deployment
- [ ] Payment tested
- [ ] Live mode activated

**Time Remaining:** ~55 minutes

**Ready to proceed with backup?**

---

_This guide will be updated as you complete each step._
