# 🚀 FINAL DEPLOYMENT CHECKLIST

## Cerebrum Biology Academy - Production Go-Live

**Last Updated:** 2025-10-29
**Estimated Total Time:** ~90 minutes
**Critical Path:** ~40 minutes

---

## 🔴 CRITICAL - Must Complete Before Deployment

### Database (10 min)

- [ ] **Database backup taken**
  ```bash
  # Supabase: Settings → Database → Create Backup
  # Or via CLI:
  npx supabase db dump -f backup-$(date +%Y%m%d).sql
  ```
- [ ] **Database password rotated**
  ```bash
  # Supabase: Settings → Database → Database Password → Reset
  # Save new password in password manager!
  ```
- [ ] **New DATABASE_URL in Vercel**
  ```bash
  # Format: postgresql://postgres.[PROJECT-REF]:[NEW-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
  # Add to Vercel: Settings → Environment Variables → DATABASE_URL
  ```
- [ ] **Connection tested with new password**
  ```bash
  npx prisma db pull
  # Should succeed without errors
  ```
- [ ] **3 courses exist in database**
  ```bash
  npx prisma studio
  # Verify: class-11, class-12, neet-dropper courses visible
  ```
- [ ] **Question banks populated**
  ```bash
  # Check in Prisma Studio or run:
  npx tsx scripts/verify-courses.ts
  # Expected: Each course has associated question banks
  ```

### Secrets & Environment (15 min)

- [ ] **All 4 auth secrets generated and saved**
  ```bash
  # Generate new secrets:
  openssl rand -base64 32  # NEXTAUTH_SECRET
  openssl rand -base64 32  # NEXTAUTH_JWT_SECRET
  openssl rand -base64 32  # API_SECRET_KEY
  openssl rand -base64 32  # ENCRYPTION_KEY
  # Save in password manager immediately!
  ```
- [ ] **Old .env.local removed from git history**
  ```bash
  git log --all --full-history -- .env.local
  # Should show: fatal: No such file or directory (good)
  # Verify .env.local is in .gitignore
  cat .gitignore | grep .env.local
  ```
- [ ] **DATABASE_URL updated with new password**
  ```bash
  # In Vercel: Environment Variables → DATABASE_URL → Edit
  # Paste new connection string with rotated password
  ```
- [ ] **NEXT_PUBLIC_RAZORPAY_KEY_ID set in Vercel**
  ```bash
  # Get from: Razorpay Dashboard → Settings → API Keys
  # Use LIVE key (starts with rzp_live_)
  # Add to Vercel: Environment Variables → NEXT_PUBLIC_RAZORPAY_KEY_ID
  ```
- [ ] **RAZORPAY_KEY_SECRET set in Vercel**
  ```bash
  # Get from: Razorpay Dashboard → Settings → API Keys
  # Keep this SECRET - never expose in client code
  # Add to Vercel: Environment Variables → RAZORPAY_KEY_SECRET
  ```
- [ ] **RAZORPAY_WEBHOOK_SECRET set in Vercel**
  ```bash
  # Get from: Razorpay Dashboard → Settings → Webhooks → Create/View
  # This validates webhook authenticity
  # Add to Vercel: Environment Variables → RAZORPAY_WEBHOOK_SECRET
  ```
- [ ] **NEXTAUTH_URL set to production URL**
  ```bash
  # In Vercel: Environment Variables → NEXTAUTH_URL
  # Value: https://cerebrumbiologyacademy.com
  ```
- [ ] **NEXT_PUBLIC_APP_URL set to production URL**
  ```bash
  # In Vercel: Environment Variables → NEXT_PUBLIC_APP_URL
  # Value: https://cerebrumbiologyacademy.com
  ```

### Razorpay Configuration (10 min)

- [ ] **Razorpay account activated**
  ```bash
  # Login: https://dashboard.razorpay.com
  # Status should show: "Live" (not "Test Mode")
  # KYC completed and approved
  ```
- [ ] **Live keys obtained (not test keys!)**
  ```bash
  # Razorpay Dashboard → Settings → API Keys
  # Key ID starts with: rzp_live_ (NOT rzp_test_)
  # Key Secret visible only once - save immediately!
  ```
- [ ] **Webhook configured**
  ```bash
  # Razorpay Dashboard → Settings → Webhooks → Create Webhook
  # Webhook URL: https://cerebrumbiologyacademy.com/api/payments/webhook
  # Events to subscribe:
  #   - payment.authorized
  #   - payment.captured
  #   - payment.failed
  #   - order.paid
  # Secret: Auto-generated (save this as RAZORPAY_WEBHOOK_SECRET)
  ```
- [ ] **Webhook secret saved**
  ```bash
  # Copy webhook secret from Razorpay
  # Add to Vercel: RAZORPAY_WEBHOOK_SECRET
  ```
- [ ] **Payment methods enabled**
  ```bash
  # Razorpay Dashboard → Settings → Payment Methods
  # Enable:
  #   ✓ Credit Cards (Visa, Mastercard, Amex, Rupay)
  #   ✓ Debit Cards (all major banks)
  #   ✓ UPI (Google Pay, PhonePe, Paytm, BHIM)
  #   ✓ Net Banking (all major banks)
  #   ✓ Wallets (Paytm, PhonePe, Freecharge)
  ```
- [ ] **Settlement account verified**
  ```bash
  # Razorpay Dashboard → Settings → Bank Account
  # Bank account linked and verified
  # Settlement schedule configured (T+3 default)
  ```

### Vercel Project Setup (5 min)

- [ ] **Project created in Vercel**
  ```bash
  # Login: https://vercel.com
  # New Project → Import Git Repository
  # Select: cerebrum-biology-academy-website
  ```
- [ ] **Connected to GitHub repository**
  ```bash
  # Verify: Project Settings → Git → Repository
  # Should show: github.com/[username]/cerebrum-biology-academy-website
  # Branch: main
  ```
- [ ] **Framework: Next.js selected**
  ```bash
  # Verify: Project Settings → General → Framework Preset
  # Should be: Next.js (auto-detected)
  ```
- [ ] **Node version: 20.x**
  ```bash
  # Add to Vercel: Environment Variables
  # NODE_VERSION=20.x
  # Or in Project Settings → General → Node.js Version → 20.x
  ```
- [ ] **Build command: `npm run build`**
  ```bash
  # Verify: Project Settings → Build & Development Settings
  # Build Command: npm run build
  # Output Directory: .next
  # Install Command: npm install
  ```
- [ ] **Environment variables: ALL critical ones added**
  ```bash
  # Verify in Vercel: Settings → Environment Variables
  # Required variables:
  DATABASE_URL                    ✓
  NEXTAUTH_SECRET                 ✓
  NEXTAUTH_JWT_SECRET            ✓
  NEXTAUTH_URL                   ✓
  NEXT_PUBLIC_APP_URL            ✓
  NEXT_PUBLIC_RAZORPAY_KEY_ID    ✓
  RAZORPAY_KEY_SECRET            ✓
  RAZORPAY_WEBHOOK_SECRET        ✓
  API_SECRET_KEY                 ✓
  ENCRYPTION_KEY                 ✓
  ```

### Domain & SSL (10 min)

- [ ] **Domain cerebrumbiologyacademy.com added to Vercel**
  ```bash
  # Vercel: Project Settings → Domains → Add Domain
  # Enter: cerebrumbiologyacademy.com
  # Also add: www.cerebrumbiologyacademy.com
  ```
- [ ] **DNS configured (A/CNAME records)**
  ```bash
  # Vercel will show DNS records to add
  # In your domain registrar (GoDaddy/Namecheap/etc):
  # A Record:    @    →  76.76.21.21
  # CNAME:       www  →  cname.vercel-dns.com
  # Wait 5-10 minutes for DNS propagation
  ```
- [ ] **SSL certificate active (automatic)**
  ```bash
  # Vercel auto-provisions SSL via Let's Encrypt
  # Verify: Visit https://cerebrumbiologyacademy.com
  # Should show 🔒 padlock in browser
  # No certificate warnings
  ```
- [ ] **HTTPS enforced**
  ```bash
  # Test: Visit http://cerebrumbiologyacademy.com
  # Should auto-redirect to https://
  # Vercel enforces this by default
  ```
- [ ] **www redirect configured**
  ```bash
  # Verify: Visit www.cerebrumbiologyacademy.com
  # Should redirect to: cerebrumbiologyacademy.com (or vice versa)
  # Configure in Vercel: Domains → [domain] → Redirect
  ```

---

## 🟡 HIGH PRIORITY - Recommended Before Deployment

### Email & Notifications (10 min)

- [ ] **Email service configured (Resend/SendGrid)**

  ```bash
  # Option 1: Resend (Recommended)
  # https://resend.com → Get API Key
  # Add to Vercel: RESEND_API_KEY

  # Option 2: SendGrid
  # https://sendgrid.com → Get API Key
  # Add to Vercel: SENDGRID_API_KEY
  ```

- [ ] **SMTP credentials in Vercel**
  ```bash
  # If using SMTP instead of API:
  # SMTP_HOST=smtp.gmail.com (or your provider)
  # SMTP_PORT=587
  # SMTP_USER=your-email@gmail.com
  # SMTP_PASSWORD=your-app-password
  ```
- [ ] **Test email sent and received**
  ```bash
  # After deployment, test:
  # 1. Go to contact form
  # 2. Submit inquiry
  # 3. Check email arrives
  # 4. Check email formatting looks good
  ```
- [ ] **WhatsApp API configured (optional)**
  ```bash
  # Using Meta WhatsApp Business API
  # https://business.whatsapp.com/products/business-platform
  # WHATSAPP_API_TOKEN=[token]
  # WHATSAPP_PHONE_NUMBER_ID=[id]
  ```
- [ ] **Notification templates tested**
  ```bash
  # Verify email templates render correctly:
  # - Enrollment confirmation
  # - Payment receipt
  # - Welcome message
  # - Password reset (if applicable)
  ```

### Authentication (5 min)

- [ ] **NextAuth configured**
  ```bash
  # Verify NEXTAUTH_SECRET and NEXTAUTH_URL set
  # Test: Visit /api/auth/signin
  # Should load without errors
  ```
- [ ] **Google OAuth (optional)**
  ```bash
  # Google Cloud Console → Create OAuth Client
  # Authorized redirect URI: https://cerebrumbiologyacademy.com/api/auth/callback/google
  # Add to Vercel:
  # GOOGLE_CLIENT_ID=[id]
  # GOOGLE_CLIENT_SECRET=[secret]
  ```
- [ ] **Session management tested**
  ```bash
  # Test: Login → Close browser → Return
  # Session should persist (30 days default)
  ```
- [ ] **Protected routes working**
  ```bash
  # Test: Access /dashboard without login
  # Should redirect to /login
  ```
- [ ] **Password reset working**
  ```bash
  # Test: Click "Forgot Password"
  # Receive email with reset link
  # Successfully reset password
  ```

### Analytics & Monitoring (10 min)

- [ ] **Google Analytics GA4 configured**
  ```bash
  # Create GA4 property: https://analytics.google.com
  # Get Measurement ID (G-XXXXXXXXXX)
  # Add to Vercel: NEXT_PUBLIC_GA_MEASUREMENT_ID
  # Verify: Real-time reports show data after visiting site
  ```
- [ ] **GTM installed (optional)**
  ```bash
  # Google Tag Manager: https://tagmanager.google.com
  # Create container → Get GTM ID (GTM-XXXXXX)
  # Add to Vercel: NEXT_PUBLIC_GTM_ID
  ```
- [ ] **Conversion tracking setup**
  ```bash
  # GA4 Events to track:
  # - purchase_complete (payment successful)
  # - begin_checkout (payment page loaded)
  # - view_course (course page viewed)
  # - contact_submit (contact form submitted)
  ```
- [ ] **Error monitoring (Sentry/LogRocket) - optional**
  ```bash
  # Sentry: https://sentry.io
  # Create project → Get DSN
  # Add to Vercel: NEXT_PUBLIC_SENTRY_DSN
  # npm install @sentry/nextjs
  ```
- [ ] **Uptime monitoring configured**
  ```bash
  # Options:
  # - UptimeRobot (free): https://uptimerobot.com
  # - Pingdom: https://pingdom.com
  # - Better Stack: https://betterstack.com
  # Monitor: https://cerebrumbiologyacademy.com
  # Alert email: your-email@example.com
  ```

---

## 🟢 OPTIONAL - Can Add After Launch

### Advanced Features

- [ ] **Redis cache configured**
  ```bash
  # Upstash Redis: https://upstash.com
  # UPSTASH_REDIS_REST_URL
  # UPSTASH_REDIS_REST_TOKEN
  ```
- [ ] **AI services (OpenAI) configured**
  ```bash
  # If using AI tutoring features:
  # OPENAI_API_KEY
  # OPENAI_ORGANIZATION_ID
  ```
- [ ] **Zoom integration for classes**
  ```bash
  # Zoom Marketplace: Create JWT App
  # ZOOM_API_KEY
  # ZOOM_API_SECRET
  ```
- [ ] **SMS notifications (Twilio)**
  ```bash
  # Twilio: https://twilio.com
  # TWILIO_ACCOUNT_SID
  # TWILIO_AUTH_TOKEN
  # TWILIO_PHONE_NUMBER
  ```
- [ ] **Advanced analytics**
  ```bash
  # Mixpanel, Amplitude, or Heap
  # For detailed user behavior tracking
  ```

---

## ✅ PRE-DEPLOYMENT VERIFICATION

### Code & Build (5 min)

```bash
# Run these commands and verify all pass:
npm run build
# Expected: ✓ Compiled successfully

npx tsc --noEmit 2>&1 | head
# Expected: Errors exist but are suppressed (603 errors acceptable)

npm run lint
# Expected: No critical errors (warnings acceptable)

git status
# Expected: Working tree clean or ready to commit
```

### Database Verification (2 min)

```bash
# Option 1: Visual verification
npx prisma studio
# Navigate to Course table
# Verify: 3 courses exist (class-11, class-12, neet-dropper)

# Option 2: Command-line verification
npx tsx scripts/verify-courses.ts
# Expected output:
# ✓ Found 3 courses
# ✓ class-11: Biology for Class 11
# ✓ class-12: Biology for Class 12
# ✓ neet-dropper: NEET Dropper Program
```

**Expected Result:** 3 courses visible

- `class-11` - Biology for Class 11
- `class-12` - Biology for Class 12
- `neet-dropper` - NEET Dropper Program

### API Endpoints Check (2 min)

```bash
# Verify critical API routes exist:
ls -la src/app/api/purchase/route.ts
ls -la src/app/api/payments/verify/route.ts
ls -la src/app/api/enrollment/route.ts
ls -la src/app/api/payments/webhook/route.ts

# All should return file paths, not "No such file"
```

### Environment Variables Check (2 min)

```bash
# In Vercel Dashboard: Settings → Environment Variables
# Count: Should have at least 10 variables
# All marked for "Production" environment
# No values showing "[redacted]" - they should all be set
```

---

## 🚀 DEPLOYMENT PROCESS

### Step 1: Final Git Push (2 min)

```bash
# Ensure all changes committed
git status

# If changes exist:
git add .
git commit -m "chore: production deployment ready - final checks complete"
git push origin main

# Verify push succeeded:
git log origin/main -1
# Should show your latest commit
```

### Step 2: Monitor Vercel Deployment (5 min)

1. Open Vercel Dashboard
2. Navigate to Deployments tab
3. Watch build logs in real-time
4. Check for errors (should see green checkmarks)
5. Wait for "Ready" status
6. Note deployment URL (ends with .vercel.app)

**What to watch for:**

- ✓ Building
- ✓ Collecting page data
- ✓ Generating static pages
- ✓ Finalizing page optimization
- ✓ Ready

**Red flags (should NOT see):**

- ❌ Build failed
- ❌ Type errors
- ❌ Missing environment variables
- ❌ Database connection failed

### Step 3: Initial Verification (5 min)

Visit deployment URL (https://[project].vercel.app) and check:

- [ ] **Homepage loads without errors**

  ```bash
  # Open: https://[project].vercel.app
  # Should see: Hero section, navigation, footer
  # No white screen or error messages
  ```

- [ ] **Navigation works**

  ```bash
  # Click: Home, Courses, About, Contact
  # All pages should load
  # No 404 errors
  ```

- [ ] **Courses page displays 3 courses**

  ```bash
  # Visit: /courses
  # Should see: Class 11, Class 12, NEET Dropper cards
  # Each with "Enroll Now" button
  ```

- [ ] **Purchase page loads for all course IDs**

  ```bash
  # Visit: /purchase/class-11
  # Visit: /purchase/class-12
  # Visit: /purchase/neet-dropper
  # All should load payment forms
  ```

- [ ] **No console errors (F12)**
  ```bash
  # Press F12 → Console tab
  # Should see: No red errors
  # Yellow warnings acceptable
  # Check Network tab: All requests 200/304
  ```

### Step 4: Test Payment Flow (15 min)

⚠️ **CRITICAL: Use TEST mode first!**

**Before starting:** Temporarily switch Razorpay keys to TEST mode in Vercel

```bash
# Use: rzp_test_[key] instead of rzp_live_[key]
# This allows testing without real money
```

**Test Flow:**

1. **Go to purchase page**

   ```
   Visit: https://[project].vercel.app/purchase/class-11
   ```

2. **Fill guest checkout form**
   - Name: `Test Student`
   - Email: `test@example.com`
   - Phone: `9876543210`

3. **Select FULL year plan**
   - Click: "Full Year" radio button
   - Verify price updates

4. **Click "Pay Now"**
   - Razorpay checkout modal should open
   - Should show course name and price

5. **Use test card**

   ```
   Card Number: 4111 1111 1111 1111
   CVV: 123
   Expiry: 12/26
   Name: Test User
   ```

6. **Complete payment**
   - Click "Pay" button
   - Should see success animation

7. **Verify success**
   - [ ] Redirected to success page
   - [ ] Success message displayed
   - [ ] Order ID shown
   - [ ] "Access Course" button visible

8. **Check backend**
   - [ ] **Order created in Razorpay dashboard**

     ```
     Razorpay Dashboard → Payments → Should see test payment
     Status: Captured
     ```

   - [ ] **Enrollment created in database**

     ```bash
     npx prisma studio
     # Check Enrollment table
     # Should have new entry for test@example.com
     ```

   - [ ] **Email sent (if configured)**

     ```
     Check test@example.com inbox
     Should receive enrollment confirmation
     ```

   - [ ] **WhatsApp sent (if configured)**
     ```
     Check phone number 9876543210
     Should receive WhatsApp notification
     ```

**If ANY step fails:** Do NOT proceed to live mode. Debug and fix first.

### Step 5: Switch to LIVE Mode (5 min)

⚠️ **Only proceed after test payment succeeds perfectly**

1. **Update Razorpay keys to LIVE**

   ```bash
   # Vercel: Settings → Environment Variables
   # Update NEXT_PUBLIC_RAZORPAY_KEY_ID: rzp_live_[key]
   # Update RAZORPAY_KEY_SECRET: [live_secret]
   # Click "Save"
   ```

2. **Redeploy**

   ```bash
   # Vercel: Deployments → Redeploy (with latest environment variables)
   # Wait for deployment to complete (2-3 minutes)
   ```

3. **Test with ₹1 real payment**

   ```bash
   # Visit: /purchase/class-11
   # Temporarily edit price to ₹1 (in Razorpay dashboard or code)
   # Complete real payment with your card
   # Should succeed
   ```

4. **Verify in Razorpay dashboard**

   ```bash
   # Dashboard should show:
   # - Payment status: Captured
   # - Amount: ₹1.00
   # - Mode: Live (not Test)
   ```

5. **Refund immediately**

   ```bash
   # Razorpay Dashboard → Payments → Select payment → Issue Refund
   # Refund ₹1 to your card
   # Verify refund processed
   ```

6. **Restore original prices**
   ```bash
   # Revert any price changes made for testing
   # Redeploy if needed
   ```

### Step 6: Domain Activation (5 min)

- [ ] **Verify cerebrumbiologyacademy.com resolves**

  ```bash
  # Terminal:
  nslookup cerebrumbiologyacademy.com
  # Should return Vercel IP: 76.76.21.21

  # Browser:
  # Visit: https://cerebrumbiologyacademy.com
  # Should load your site (not error page)
  ```

- [ ] **Test HTTPS (should auto-redirect)**

  ```bash
  # Visit: http://cerebrumbiologyacademy.com (no 's')
  # Should auto-redirect to: https://cerebrumbiologyacademy.com
  # Browser should show 🔒 padlock
  ```

- [ ] **Verify www redirect works**

  ```bash
  # Visit: https://www.cerebrumbiologyacademy.com
  # Should redirect to: https://cerebrumbiologyacademy.com
  # (or vice versa, depending on your configuration)
  ```

- [ ] **Clear DNS cache if needed**

  ```bash
  # If domain not resolving, clear DNS cache:

  # Mac:
  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

  # Windows:
  ipconfig /flushdns

  # Linux:
  sudo systemd-resolve --flush-caches

  # Then test again in incognito/private window
  ```

---

## 📊 POST-DEPLOYMENT VERIFICATION

### Automated Checks (5 min)

```bash
# If you have a verification script:
npm run verify:deployment

# Or manually run these checks:
curl -I https://cerebrumbiologyacademy.com
# Expected: HTTP/2 200

curl -I https://cerebrumbiologyacademy.com/api/health
# Expected: HTTP/2 200 (if health check endpoint exists)

curl -I https://cerebrumbiologyacademy.com/courses
# Expected: HTTP/2 200
```

### Manual Checks (10 min)

- [ ] **Homepage loads on production domain**

  ```
  Visit: https://cerebrumbiologyacademy.com
  Should load in < 3 seconds
  No errors or broken images
  ```

- [ ] **All navigation links work**

  ```
  Test each menu item:
  - Home → Should load homepage
  - Courses → Should show course listing
  - About → Should show about page
  - Contact → Should show contact form
  Footer links should also work
  ```

- [ ] **Contact form submits**

  ```
  Fill out contact form:
  - Name: Your Name
  - Email: your@email.com
  - Message: Test message
  Submit → Should see success message
  Check email for notification
  ```

- [ ] **Course enrollment works**

  ```
  Click "Enroll Now" on any course
  Should redirect to /purchase/[courseId]
  Form should load with course details
  Price should display correctly
  ```

- [ ] **Payment with real ₹1 completes**

  ```
  Complete full payment flow with ₹1
  (Or use real course price if confident)
  Verify success page displays
  Check database for enrollment
  Refund if test transaction
  ```

- [ ] **Email notifications arrive**

  ```
  After enrollment, check email:
  - Enrollment confirmation received
  - Email formatting looks professional
  - All links in email work
  - No broken images
  ```

- [ ] **Mobile responsive works**

  ```
  Test on mobile device or Chrome DevTools:
  - Responsive → iPhone 12 Pro
  - Navigation menu (hamburger) works
  - Forms usable on mobile
  - Payment page mobile-friendly
  - No horizontal scrolling
  ```

- [ ] **No errors in browser console**

  ```
  Press F12 → Console
  Navigate through site
  Should see no red errors
  Yellow warnings acceptable
  ```

- [ ] **No errors in Vercel logs**
  ```
  Vercel Dashboard → Functions
  Check real-time logs
  Should see 200 responses
  No 500 errors
  ```

### Performance Checks (5 min)

- [ ] **Homepage loads < 3 seconds**

  ```bash
  # Chrome DevTools → Network tab
  # Reload page
  # Check "Load" time at bottom
  # Should be < 3 seconds on 4G
  ```

- [ ] **Lighthouse score > 80**

  ```bash
  # Chrome DevTools → Lighthouse tab
  # Run audit (Mobile)
  # Scores should be:
  # - Performance: > 80
  # - Accessibility: > 90
  # - Best Practices: > 90
  # - SEO: > 90
  ```

- [ ] **Core Web Vitals: Good**

  ```bash
  # Check in Lighthouse or PageSpeed Insights
  # LCP (Largest Contentful Paint): < 2.5s
  # FID (First Input Delay): < 100ms
  # CLS (Cumulative Layout Shift): < 0.1
  ```

- [ ] **No layout shifts**

  ```bash
  # Reload page and watch carefully
  # Content should not jump/shift as it loads
  # Images should have width/height attributes
  ```

- [ ] **Images optimized**
  ```bash
  # Network tab → Img filter
  # Check image sizes
  # Should be using WebP format
  # Next.js Image component should be used
  # No images > 500KB
  ```

---

## 🎯 GO-LIVE DECISION

### Pre-Launch Checklist

**All CRITICAL items complete?** ☐ Yes / ☐ No

**Test payment successful?** ☐ Yes / ☐ No

**Domain resolving?** ☐ Yes / ☐ No

**No critical errors in logs?** ☐ Yes / ☐ No

**Email notifications working?** ☐ Yes / ☐ No

**Mobile responsive verified?** ☐ Yes / ☐ No

**Performance checks passed?** ☐ Yes / ☐ No

---

### Decision Matrix

✅ **If ALL YES → GO LIVE! 🚀**

Proceed to announce launch. Site is production-ready.

❌ **If ANY NO → STOP**

Review checklist and fix issues before going live:

1. Identify which item(s) failed
2. Review relevant section above
3. Fix issues
4. Re-test
5. Return to this decision point

---

## 🔄 POST-LAUNCH (First 24 Hours)

### Immediate (First Hour)

- [ ] **Monitor Vercel logs for errors**

  ```bash
  # Vercel Dashboard → Functions → Real-time Logs
  # Watch for:
  # ✓ 200 responses (good)
  # ⚠️ 400 errors (client issues)
  # ❌ 500 errors (server issues - investigate immediately)
  ```

- [ ] **Check Razorpay dashboard for payments**

  ```bash
  # Razorpay Dashboard → Payments
  # Monitor for incoming payments
  # Verify all show "Captured" status
  # Check for failed payments (investigate reasons)
  ```

- [ ] **Verify emails are being sent**

  ```bash
  # Check your email service dashboard:
  # - Resend: https://resend.com/emails
  # - SendGrid: https://sendgrid.com/email_activity
  # Verify emails delivering successfully
  # Check bounce/spam rates (should be < 5%)
  ```

- [ ] **Monitor uptime**

  ```bash
  # Check uptime monitor dashboard
  # Should show: 100% uptime
  # No downtime alerts
  # Response time < 1 second
  ```

- [ ] **Test from different devices/browsers**
  ```bash
  # Test on:
  # - Chrome (Mac/Windows)
  # - Safari (Mac/iOS)
  # - Firefox (Windows)
  # - Edge (Windows)
  # - Mobile (iOS/Android)
  # All should work consistently
  ```

### First Day

- [ ] **Review error logs**

  ```bash
  # Vercel Dashboard → Functions → View all logs
  # Filter: Error level
  # Investigate any recurring errors
  # Fix critical issues immediately
  ```

- [ ] **Check payment success rate**

  ```bash
  # Razorpay Dashboard → Analytics
  # Calculate: (Successful payments / Total attempts) × 100
  # Target: > 90% success rate
  # If lower: Check for payment gateway issues
  ```

- [ ] **Verify all emails delivered**

  ```bash
  # Email service dashboard
  # Check delivery rate: Should be > 95%
  # Check bounce rate: Should be < 5%
  # Check spam complaints: Should be 0
  ```

- [ ] **Monitor database performance**

  ```bash
  # Supabase Dashboard → Database
  # Check query performance
  # Look for slow queries (> 1 second)
  # Check connection pool usage
  ```

- [ ] **Check analytics data flowing**
  ```bash
  # Google Analytics → Real-time
  # Should see active users
  # Check page views tracking correctly
  # Verify conversion events firing
  ```

### First Week

- [ ] **Review user feedback**

  ```bash
  # Check:
  # - Contact form submissions
  # - Email replies
  # - Social media mentions
  # - Direct user feedback
  # Document common issues/requests
  ```

- [ ] **Analyze payment conversion**

  ```bash
  # Calculate conversion funnel:
  # Course page views → Payment page → Completed purchases
  # Identify drop-off points
  # Optimize low-converting steps
  ```

- [ ] **Monitor performance metrics**

  ```bash
  # Google Analytics → Engagement → Page speed
  # Check:
  # - Average page load time
  # - Bounce rate (should be < 40%)
  # - Session duration
  # - Pages per session
  ```

- [ ] **Check for any bugs reported**

  ```bash
  # Review:
  # - Sentry errors (if configured)
  # - User-reported issues
  # - Browser console errors
  # - Payment failures
  # Prioritize and fix critical bugs
  ```

- [ ] **Plan next improvements**
  ```bash
  # Based on first week data, plan:
  # - Feature enhancements
  # - Performance optimizations
  # - UI/UX improvements
  # - Marketing adjustments
  ```

---

## 🆘 EMERGENCY CONTACTS

### If critical issues occur:

**Hosting & Infrastructure:**

- Vercel Support: support@vercel.com
- Vercel Status: https://www.vercel-status.com
- Vercel Discord: https://vercel.com/discord

**Database:**

- Supabase Support: support@supabase.com
- Supabase Status: https://status.supabase.com
- Supabase Discord: https://discord.supabase.com

**Payments:**

- Razorpay Support: support@razorpay.com
- Razorpay Phone: 1800-102-7800 (India)
- Razorpay Status: https://status.razorpay.com

**Internal Team:**

- Project Lead: [Your Name]
- Phone: [Your Phone Number]
- Email: [Your Email]
- Backup Contact: [Backup Person]

---

### Common Issues & Quick Fixes

**Issue: Site not loading**

```bash
# Quick check:
curl -I https://cerebrumbiologyacademy.com
# If timeout → Check Vercel status
# If 500 error → Check Vercel logs
# If DNS error → Check domain settings
```

**Issue: Payments failing**

```bash
# Check:
1. Razorpay dashboard for errors
2. Webhook secret is correct
3. API keys are LIVE (not TEST)
4. Database connection working
```

**Issue: Database connection errors**

```bash
# Verify:
1. DATABASE_URL is correct
2. Database password hasn't expired
3. Connection pool not exhausted
4. Supabase project is active
```

**Issue: Emails not sending**

```bash
# Check:
1. Email service API key is valid
2. Sender domain verified
3. Recipient email is valid
4. Check spam folder
```

---

### Rollback Procedure

**If critical issues require rollback:**

```bash
# Option 1: Vercel Dashboard (Fastest)
# 1. Vercel → Deployments
# 2. Find last working deployment
# 3. Click "..." menu → "Redeploy"
# 4. Wait for deployment (2-3 minutes)

# Option 2: Git Revert
git log --oneline -10  # Find last good commit
git revert [bad-commit-hash]
git push origin main
# Vercel auto-deploys

# Option 3: Environment Variable Rollback
# If issue is from environment variable change:
# 1. Vercel → Settings → Environment Variables
# 2. Click on variable → View history
# 3. Restore previous value
# 4. Redeploy

# After rollback:
# - Notify users if necessary
# - Investigate root cause
# - Fix in development environment
# - Test thoroughly
# - Re-deploy when fixed
```

**Rollback Decision Tree:**

- **Site completely down** → Rollback immediately
- **Payments failing** → Rollback immediately
- **Visual bugs only** → Fix forward (no rollback needed)
- **Performance degradation** → Monitor for 30 min, then decide

---

## 📝 DEPLOYMENT SIGN-OFF

### Official Record

**Deployment Date:** **********\_\_**********

**Deployment Time:** **********\_\_**********

**Deployed By:** **********\_\_**********

**Verified By:** **********\_\_**********

**Production URL:** https://cerebrumbiologyacademy.com

**Vercel Deployment URL:** https://[project].vercel.app

**Deployment ID:** **********\_\_**********

**Git Commit Hash:** **********\_\_**********

---

### Payment Verification

**First Test Payment Timestamp:** **********\_\_**********

**First Live Payment Timestamp:** **********\_\_**********

**Payment Gateway Status:** ☐ Live ☐ Test

**Total Successful Payments (First 24h):** **********\_\_**********

---

### Performance Baseline

**Homepage Load Time:** ****\_\_**** seconds

**Lighthouse Performance Score:** ****\_\_**** / 100

**Lighthouse Accessibility Score:** ****\_\_**** / 100

**Core Web Vitals LCP:** ****\_\_**** seconds

**Initial Uptime:** 100% (monitor for 24h)

---

### Issues Encountered

**Critical Issues:** ☐ None ☐ See below

---

---

---

**Resolved:** ☐ Yes ☐ No ☐ N/A

**Resolution Time:** ****\_\_****

---

### Next Steps

**Immediate (Next 24h):**

1. ***
2. ***
3. ***

**Short Term (Next 7 days):**

1. ***
2. ***
3. ***

**Long Term (Next 30 days):**

1. ***
2. ***
3. ***

---

### Sign-Off Approval

By signing below, I confirm that:

- All CRITICAL checklist items are complete
- Test payments have been successful
- Domain is resolving correctly
- No critical errors exist in production
- Site is ready for public access

**Signature:** **********\_\_\_**********

**Date:** **********\_\_\_**********

---

## 📈 SUCCESS METRICS

### Day 1 Targets

- Uptime: 99.9%
- Payment success rate: > 90%
- Page load time: < 3 seconds
- Zero critical errors
- At least 1 successful enrollment

### Week 1 Targets

- Uptime: 99.9%
- 10+ successful enrollments
- 100+ unique visitors
- Payment success rate: > 95%
- Email delivery rate: > 95%

### Month 1 Targets

- Uptime: 99.9%
- 50+ successful enrollments
- 1000+ unique visitors
- Conversion rate: > 5%
- Customer satisfaction: > 4.5/5

---

## 🎉 CONGRATULATIONS!

**If you've completed this checklist, your site is PRODUCTION READY!**

### Total Time Summary

- **Critical Path:** ~40 minutes
- **High Priority:** ~25 minutes
- **Verification:** ~20 minutes
- **Deployment:** ~15 minutes
- **Total:** ~90 minutes

### You are now ready to:

✓ Accept real payments
✓ Enroll real students
✓ Scale your academy
✓ Grow your business

---

## 🚀 GO LIVE!

**The moment has arrived. Your platform is ready. It's time to launch!**

1. Take a deep breath
2. Double-check the GO-LIVE decision matrix above
3. Click deploy
4. Monitor closely for first hour
5. Celebrate your launch! 🎉

**Welcome to production. Your biology academy is now live!**

---

_Document Version: 1.0_
_Last Updated: 2025-10-29_
_Next Review: After first deployment_
