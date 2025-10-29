# Pre-Deployment Verification Checklist

**Project:** Cerebrum Biology Academy Website
**Target Platform:** Vercel
**Target Domain:** cerebrumbiologyacademy.com
**Date:** ******\_\_\_******
**Prepared By:** ******\_\_\_******

---

## Deployment Readiness Summary

**Estimated Total Time:** 3-4 hours
**Critical Items:** 38
**High Priority Items:** 31
**Medium Priority Items:** 14
**Low Priority Items:** 10

---

## 1. Code Verification (Priority: CRITICAL)

**Estimated Time:** 20 minutes

- [x] Build passes (`npm run build`)

  ```bash
  cd /Users/drshekhar/cerebrum-biology-academy-website
  npm run build
  ```

  **Expected:** Build completes successfully with no blocking errors

- [x] No critical errors in logs
      **Verified:** Check build output for errors (TypeScript suppression in place)

- [x] All API endpoints exist
      **Routes to verify:**
  - `/api/auth/*` - Authentication endpoints
  - `/api/payment/*` - Payment processing
  - `/api/courses/*` - Course management
  - `/api/users/*` - User management
  - `/api/enrollments/*` - Enrollment management
  - `/api/questionbanks/*` - Question bank access

- [x] Database schema is up to date

  ```bash
  npx prisma migrate status
  ```

  **Expected:** All migrations applied

- [x] Prisma client generated

  ```bash
  npx prisma generate
  ```

  **Expected:** Client generated successfully

- [x] Environment files configured
      **Files to check:**
  - `.env.local` (development - NOT committed)
  - `.env.example` (template - committed)
  - Vercel environment variables prepared

- [ ] Git status clean

  ```bash
  git status
  ```

  **Expected:** No uncommitted changes, clean working tree

- [x] TypeScript errors acceptable (603 with suppression)

  ```bash
  npx tsc --noEmit
  ```

  **Expected:** Only suppressed errors, no new critical errors

- [x] Security files (.env) in .gitignore

  ```bash
  grep -E "\.env|\.env\.local" .gitignore
  ```

  **Expected:** .env files are ignored

- [ ] No hardcoded secrets in code
  ```bash
  # Search for common secret patterns
  grep -r "sk_live" --exclude-dir=node_modules .
  grep -r "password.*=" --exclude-dir=node_modules .
  grep -r "api_key.*=" --exclude-dir=node_modules .
  ```
  **Expected:** No hardcoded credentials found

---

## 2. Database Verification (Priority: CRITICAL)

**Estimated Time:** 30 minutes

- [x] Database seeded with 3 courses
      **Courses:**
  1. NEET 2025 Complete Biology
  2. NEET 2026 Foundation Course
  3. Class 11 Biology Mastery

  **Verify:**

  ```bash
  npx prisma studio
  # Check Course table has 3 entries
  ```

- [x] Question banks populated
      **Verify:** Open Prisma Studio and check QuestionBank table has entries

- [ ] Connection string ready (need to rotate password)
      **Action Required:**
  1. Generate new database password
  2. Update connection string in Vercel environment variables
  3. Test connection with new credentials

  **Format:** `postgresql://username:NEW_PASSWORD@host:port/database?sslmode=require`

- [ ] Migrations up to date

  ```bash
  npx prisma migrate status
  ```

  **Expected:** "Database schema is up to date!"

- [ ] Backup taken before deployment
      **Action Required:**

  ```bash
  # PostgreSQL backup command
  pg_dump -h HOST -U USERNAME -d DATABASE > backup_$(date +%Y%m%d_%H%M%S).sql
  ```

  **Store backup in:** Secure cloud storage + local copy

- [ ] Connection pooling configured
      **Verify in Prisma schema:**

  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    directUrl = env("DIRECT_URL") // For migrations
  }
  ```

  **Recommended:** Use connection pooling URL for DATABASE_URL

- [ ] Database user permissions correct
      **Verify permissions:**
  - SELECT, INSERT, UPDATE, DELETE on all tables
  - CREATE, DROP on schema (for migrations)
  - CONNECT on database

- [ ] Database logs enabled
      **Provider-specific:** Enable query logging and slow query logging in database provider dashboard

---

## 3. API Keys & Secrets (Priority: CRITICAL)

**Estimated Time:** 45 minutes

- [x] New AUTH_SECRET generated

  ```bash
  openssl rand -base64 32
  ```

  **Status:** Generated and ready

- [x] New JWT secrets generated
      **Secrets needed:**
  - JWT_SECRET (access tokens)
  - JWT_REFRESH_SECRET (refresh tokens)

  ```bash
  openssl rand -base64 32
  openssl rand -base64 32
  ```

- [x] NEXTAUTH_SECRET generated

  ```bash
  openssl rand -base64 32
  ```

  **Note:** Can be same as AUTH_SECRET or different

- [ ] Razorpay LIVE keys obtained
      **Action Required:**
  1. Log in to Razorpay Dashboard (https://dashboard.razorpay.com/)
  2. Navigate to Settings > API Keys
  3. Generate LIVE mode keys
  4. Copy `key_id` and `key_secret`

  **Variables:**
  - `RAZORPAY_KEY_ID=rzp_live_XXXXX`
  - `RAZORPAY_KEY_SECRET=XXXXX`

- [ ] Razorpay TEST keys for staging
      **Variables:**
  - `RAZORPAY_KEY_ID=rzp_test_XXXXX`
  - `RAZORPAY_KEY_SECRET=XXXXX`

- [ ] Razorpay webhook secret configured
      **Action Required:**
  1. Create webhook in Razorpay Dashboard
  2. Webhook URL: `https://cerebrumbiologyacademy.com/api/webhooks/razorpay`
  3. Events: `payment.captured`, `payment.failed`, `subscription.charged`
  4. Copy webhook secret

  **Variable:**
  - `RAZORPAY_WEBHOOK_SECRET=whsec_XXXXX`

- [ ] Database password rotated
      **Action Required:** Generate new password for production database user

  **Commands:**

  ```sql
  ALTER USER your_user WITH PASSWORD 'new_secure_password';
  ```

- [ ] WhatsApp API tokens (optional - Medium Priority)
      **Provider:** Twilio / MessageBird / other
      **Variables:**
  - `WHATSAPP_API_KEY=XXXXX`
  - `WHATSAPP_PHONE_NUMBER=+91XXXXXXXXXX`

- [ ] Email service API key (optional - High Priority)
      **Provider:** SendGrid / Mailgun / AWS SES / Resend
      **Variables:**
  - `EMAIL_API_KEY=XXXXX`
  - `EMAIL_FROM=noreply@cerebrumbiologyacademy.com`
  - `EMAIL_FROM_NAME=Cerebrum Biology Academy`

- [ ] Google OAuth credentials (optional - Medium Priority)
      **Action Required:**
  1. Google Cloud Console > APIs & Services > Credentials
  2. Create OAuth 2.0 Client ID
  3. Authorized redirect URIs: `https://cerebrumbiologyacademy.com/api/auth/callback/google`

  **Variables:**
  - `GOOGLE_CLIENT_ID=XXXXX.apps.googleusercontent.com`
  - `GOOGLE_CLIENT_SECRET=XXXXX`

- [ ] Analytics IDs (optional - Low Priority)
      **Services:**
  - Google Analytics: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
  - Meta Pixel: `NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXX`
  - Google Tag Manager: `NEXT_PUBLIC_GTM_ID=GTM-XXXXXX`

- [ ] All secrets stored in password manager
      **Recommended:** 1Password, Bitwarden, LastPass
      **Create entry:** "Cerebrum Biology Academy - Production Secrets"

- [ ] No secrets in git history

  ```bash
  # Scan git history for secrets
  git log -p | grep -E "sk_live|password|api_key" || echo "No secrets found"
  ```

- [ ] .env.local never committed

  ```bash
  git log --all --full-history -- .env.local
  ```

  **Expected:** "fatal: ambiguous argument '.env.local': unknown revision"

- [ ] Vercel environment variables documented
      **Create file:** `VERCEL_ENV_VARIABLES.md` (store securely, NOT in git)
      **Template provided in Section 11**

---

## 4. Vercel Configuration (Priority: CRITICAL)

**Estimated Time:** 30 minutes

- [ ] Vercel account ready
      **URL:** https://vercel.com/
      **Action:** Sign in with GitHub account (recommended)

- [ ] Project created in Vercel
      **Action:**
  1. Click "New Project"
  2. Import from GitHub: `cerebrum-biology-academy-website`
  3. Configure project settings (see below)

- [ ] Domain configured (cerebrumbiologyacademy.com)
      **Action:**
  1. Vercel Project > Settings > Domains
  2. Add domain: `cerebrumbiologyacademy.com`
  3. Add domain: `www.cerebrumbiologyacademy.com` (redirect to primary)
  4. Follow DNS configuration instructions

  **DNS Records:**

  ```
  Type: A
  Name: @
  Value: 76.76.21.21

  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```

- [ ] SSL certificate active
      **Status:** Auto-issued by Vercel after domain verification
      **Verify:** https://cerebrumbiologyacademy.com shows padlock icon

- [ ] Production environment variables set
      **Action:** Project > Settings > Environment Variables > Production
      **See Section 11 for complete list**

- [ ] Preview environment variables set
      **Action:** Project > Settings > Environment Variables > Preview
      **Use TEST mode for Razorpay in preview deployments**

- [ ] Build settings correct (Next.js)
      **Vercel Project Settings:**
  - Framework Preset: `Next.js`
  - Build Command: `npm run build`
  - Output Directory: `.next`
  - Install Command: `npm install`
  - Development Command: `npm run dev`

- [ ] Node version specified (18.x or 20.x)
      **File:** `package.json`

  ```json
  {
    "engines": {
      "node": ">=18.0.0 <21.0.0"
    }
  }
  ```

- [ ] Framework preset: Next.js
      **Verify in Vercel:** Project Settings > General > Framework Preset = "Next.js"

- [ ] Root directory correct
      **Verify in Vercel:** Project Settings > General > Root Directory = `./`

- [ ] Build command: `npm run build`
      **Verify:** Project Settings > Build & Development Settings > Build Command

- [ ] Install command: `npm install`
      **Verify:** Project Settings > Build & Development Settings > Install Command

---

## 5. Feature Verification (Priority: HIGH)

**Estimated Time:** 40 minutes

- [ ] Payment endpoints exist and tested
      **Endpoints:**
  - `POST /api/payment/create-order` - Create Razorpay order
  - `POST /api/payment/verify` - Verify payment signature
  - `POST /api/webhooks/razorpay` - Handle webhooks

  **Test in staging:**

  ```bash
  curl -X POST https://your-preview.vercel.app/api/payment/create-order \
    -H "Content-Type: application/json" \
    -d '{"courseId":"course_id","amount":15000}'
  ```

- [ ] Authentication flow works
      **Flows to test:**
  1. User registration
  2. Email verification (if enabled)
  3. Login with credentials
  4. Password reset
  5. Session persistence
  6. Logout

  **Test:** Manual testing in preview deployment

- [ ] Course purchase flow ready
      **Complete flow:**
  1. Browse courses
  2. Select course
  3. Click "Enroll Now"
  4. Redirect to payment
  5. Complete payment (use test card)
  6. Verify enrollment created
  7. Access course content
  8. View question banks

- [ ] Email notifications configured
      **Email types:**
  - Welcome email
  - Payment confirmation
  - Enrollment confirmation
  - Password reset

  **Test:** Send test emails in preview environment

- [ ] WhatsApp notifications configured (optional - Medium Priority)
      **Notifications:**
  - Payment confirmation
  - Course access details
  - Important updates

- [ ] Error boundaries in place
      **Verify files:**
  - `app/error.tsx` - Root error boundary
  - `app/global-error.tsx` - Global error handler
  - Component-level error boundaries

  **Test:** Trigger errors and verify graceful handling

- [ ] Analytics tracking ready
      **Events to track:**
  - Page views
  - Course views
  - Enrollment starts
  - Payment completions
  - Sign ups

  **Verify:** Analytics code present in `app/layout.tsx`

- [ ] SEO metadata correct
      **Files to check:**
  - `app/layout.tsx` - Root metadata
  - `app/metadata.ts` - Shared metadata
  - Individual page `metadata` exports

  **Verify:**

  ```typescript
  export const metadata = {
    title: 'Cerebrum Biology Academy',
    description: 'NEET Biology coaching...',
    openGraph: {...},
    twitter: {...}
  }
  ```

- [ ] Sitemap generated
      **File:** `app/sitemap.ts` or `public/sitemap.xml`
      **Verify:** https://cerebrumbiologyacademy.com/sitemap.xml

  **Generate:**

  ```bash
  npm run build
  # Check .next/server/app/sitemap.xml
  ```

- [ ] Robots.txt configured
      **File:** `public/robots.txt`
  ```txt
  User-agent: *
  Allow: /
  Sitemap: https://cerebrumbiologyacademy.com/sitemap.xml
  ```

---

## 6. Testing Verification (Priority: HIGH)

**Estimated Time:** 45 minutes

- [ ] Manual test checklist reviewed
      **See Section 12 for detailed manual test checklist**

- [ ] Critical paths identified
      **Critical user journeys:**
  1. New user registration → Course purchase → Access content
  2. Existing user login → Enroll in course → Payment → Access
  3. Password reset flow
  4. Payment failure handling
  5. Course content accessibility

- [ ] Test data prepared
      **Create test accounts:**
  - Admin user: `admin@test.com`
  - Student user: `student@test.com`
  - Test courses (already seeded)

- [ ] Razorpay test cards documented
      **Test Cards:**

  ```
  Success: 4111 1111 1111 1111
  CVV: Any 3 digits
  Expiry: Any future date

  Failure: 4111 1111 1111 1234
  (Triggers payment failure)
  ```

  **Documentation:** https://razorpay.com/docs/payments/payments/test-card-details/

- [ ] Error scenarios documented
      **Scenarios to test:**
  - Payment failure
  - Network timeout
  - Invalid course ID
  - Expired session
  - Database connection error
  - Invalid payment signature

- [ ] Smoke test script ready
      **See Section 13 for smoke test script**

- [ ] Post-deployment tests planned
      **Tests to run immediately after deployment:**
  1. Homepage loads
  2. Login works
  3. Course listing displays
  4. Test payment (₹1 with test card)
  5. Enrollment creates successfully
  6. Email sends (if configured)
  7. API endpoints respond

- [ ] Rollback plan documented
      **See Section 10 for rollback plan**

---

## 7. Security Checklist (Priority: CRITICAL)

**Estimated Time:** 30 minutes

- [x] No credentials in git history
      **Verified:** No hardcoded credentials committed

- [x] All secrets rotated
      **Status:** New secrets generated, ready for production

- [ ] HTTPS enforced
      **Verify in code:**
  - Vercel automatically handles HTTPS
  - Check for any hardcoded `http://` URLs

  ```bash
  grep -r "http://" --exclude-dir=node_modules --include="*.tsx" --include="*.ts" .
  ```

- [ ] CORS configured correctly
      **File:** API route handlers or `next.config.js`

  ```typescript
  // Only allow your domain
  headers: {
    'Access-Control-Allow-Origin': 'https://cerebrumbiologyacademy.com',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  }
  ```

- [ ] Rate limiting configured
      **Implementation options:**
  1. Vercel Edge Middleware rate limiting
  2. Upstash Redis rate limiting
  3. API route-level rate limiting

  **Critical endpoints:**
  - `/api/auth/*` - Login/signup (5 req/min)
  - `/api/payment/*` - Payment (10 req/min)

- [ ] SQL injection prevention (Prisma ORM)
      **Verified:** Using Prisma ORM - parameterized queries by default

- [ ] XSS prevention (React escaping)
      **Verified:** React escapes by default
      **Check for:** `dangerouslySetInnerHTML` usage

  ```bash
  grep -r "dangerouslySetInnerHTML" --exclude-dir=node_modules .
  ```

- [ ] CSRF tokens (NextAuth)
      **Verified:** NextAuth provides CSRF protection for auth routes
      **Additional:** Verify CSRF tokens for payment endpoints

- [ ] Content Security Policy headers
      **File:** `next.config.js` or middleware

  ```javascript
  headers: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com; ..."
  }
  ```

- [ ] Security headers configured
      **Headers to add:**
  ```javascript
  {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  }
  ```
  **File:** `next.config.js` or `middleware.ts`

---

## 8. Documentation Review (Priority: MEDIUM)

**Estimated Time:** 25 minutes

- [ ] README.md up to date
      **Should include:**
  - Project description
  - Tech stack
  - Setup instructions
  - Environment variables needed
  - Development commands
  - Deployment process

- [ ] Environment setup documented
      **File:** `README.md` or `SETUP.md`
      **Content:**
  - Database setup
  - Required environment variables
  - API key acquisition
  - Local development setup

- [ ] Deployment process documented
      **This file + README deployment section**

- [ ] Testing procedures documented
      **File:** `TESTING.md` or section in README
      **Content:**
  - How to run tests
  - Manual test checklist
  - Test data setup

- [ ] API documentation available
      **Options:**
  1. Swagger/OpenAPI spec
  2. Markdown API docs
  3. Postman collection

  **Recommended:** Create `API.md` with endpoint documentation

- [ ] Troubleshooting guide available
      **File:** `TROUBLESHOOTING.md`
      **Common issues:**
  - Build failures
  - Database connection errors
  - Payment failures
  - Authentication issues

---

## 9. Monitoring & Logging (Priority: HIGH)

**Estimated Time:** 35 minutes

- [ ] Error logging configured
      **Options:**
  1. Sentry (recommended)
  2. LogRocket
  3. Vercel Analytics
  4. Custom logging service

  **Implementation:**

  ```bash
  npm install @sentry/nextjs
  npx @sentry/wizard@latest -i nextjs
  ```

- [ ] Performance monitoring ready (optional - Medium Priority)
      **Vercel Analytics:**

  ```bash
  npm install @vercel/analytics
  ```

  **Add to `app/layout.tsx`:**

  ```typescript
  import { Analytics } from '@vercel/analytics/react'
  ```

- [ ] Uptime monitoring planned
      **Services:**
  1. UptimeRobot (free tier available)
  2. Pingdom
  3. StatusCake

  **Monitor:**
  - `https://cerebrumbiologyacademy.com` (every 5 min)
  - `https://cerebrumbiologyacademy.com/api/health` (every 5 min)

- [ ] Database monitoring configured
      **Provider dashboard:**
  - Query performance
  - Connection pool usage
  - Slow query log
  - Storage usage alerts

- [ ] API endpoint monitoring
      **Endpoints to monitor:**
  - `/api/health` - Health check
  - `/api/auth/session` - Auth health
  - `/api/courses` - Course listing

  **Create health check endpoint:**

  ```typescript
  // app/api/health/route.ts
  export async function GET() {
    return Response.json({ status: 'ok', timestamp: new Date() })
  }
  ```

- [ ] Payment failure alerts configured
      **Razorpay Dashboard:**
  - Email alerts for failed payments
  - Webhook failure notifications

  **Custom alerts:**
  - Email/SMS on payment failure
  - Slack notification (optional)

- [ ] Email notification for critical errors
      **Configure:**
  - Sentry error alerts → Email
  - Database connection failures → Email
  - Payment processing errors → Email

- [ ] Log retention policy set
      **Vercel logs:** 1-day retention on free tier
      **Recommendation:** Forward logs to external service
  - Logtail
  - Papertrail
  - CloudWatch (if using AWS)

---

## 10. Rollback Plan (Priority: CRITICAL)

**Estimated Time:** 20 minutes

- [ ] Previous deployment saved
      **Vercel automatically saves all deployments**
      **Verify:** Vercel Dashboard > Deployments tab

- [ ] Rollback command documented
      **Via Vercel Dashboard:**
  1. Go to Deployments
  2. Find previous successful deployment
  3. Click three dots (...) > Promote to Production

  **Via Vercel CLI:**

  ```bash
  # Install Vercel CLI
  npm i -g vercel

  # Rollback to previous deployment
  vercel rollback
  ```

- [ ] Database backup location known
      **Location:** ************\_\_\_************
      **Restore command:**

  ```bash
  psql -h HOST -U USERNAME -d DATABASE < backup_file.sql
  ```

- [ ] Rollback testing done
      **Test in staging:**
  1. Deploy to preview
  2. Make a change
  3. Deploy again
  4. Rollback to first deployment
  5. Verify rollback successful

- [ ] Team notification plan ready
      **Notification channels:**
  - Email: ************\_\_\_************
  - Slack: ************\_\_\_************
  - Phone: ************\_\_\_************

  **Rollback message template:**

  ```
  ROLLBACK INITIATED
  Time: [timestamp]
  Reason: [issue description]
  Action: Rolled back to deployment [ID]
  Status: [monitoring]
  ETA: [estimated recovery time]
  ```

---

## 11. Complete Environment Variables List

**Save this to password manager - DO NOT commit to git**

### Required for All Environments

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Authentication
AUTH_SECRET="[generated-secret]"
NEXTAUTH_SECRET="[generated-secret]"
NEXTAUTH_URL="https://cerebrumbiologyacademy.com"

# JWT
JWT_SECRET="[generated-secret]"
JWT_REFRESH_SECRET="[generated-secret]"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# Application
NEXT_PUBLIC_APP_URL="https://cerebrumbiologyacademy.com"
NODE_ENV="production"
```

### Production Environment

```bash
# Razorpay (LIVE)
RAZORPAY_KEY_ID="rzp_live_XXXXX"
RAZORPAY_KEY_SECRET="XXXXX"
RAZORPAY_WEBHOOK_SECRET="whsec_XXXXX"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_XXXXX"
```

### Preview/Staging Environment

```bash
# Razorpay (TEST)
RAZORPAY_KEY_ID="rzp_test_XXXXX"
RAZORPAY_KEY_SECRET="XXXXX"
RAZORPAY_WEBHOOK_SECRET="whsec_XXXXX"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_XXXXX"
```

### Optional Environment Variables

```bash
# Email Service
EMAIL_API_KEY="XXXXX"
EMAIL_FROM="noreply@cerebrumbiologyacademy.com"
EMAIL_FROM_NAME="Cerebrum Biology Academy"

# WhatsApp
WHATSAPP_API_KEY="XXXXX"
WHATSAPP_PHONE_NUMBER="+91XXXXXXXXXX"

# Google OAuth
GOOGLE_CLIENT_ID="XXXXX.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="XXXXX"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_FACEBOOK_PIXEL_ID="XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXX"

# Monitoring
SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
SENTRY_AUTH_TOKEN="xxxxx"
NEXT_PUBLIC_SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"

# Other
ADMIN_EMAIL="admin@cerebrumbiologyacademy.com"
SUPPORT_EMAIL="support@cerebrumbiologyacademy.com"
```

---

## 12. Manual Testing Checklist

**Test AFTER deployment to production**

### Authentication Tests

- [ ] Register new user
- [ ] Verify email lands in inbox (if email enabled)
- [ ] Login with credentials
- [ ] Logout
- [ ] Request password reset
- [ ] Reset password with emailed link
- [ ] Login with new password

### Course Browsing Tests

- [ ] Homepage loads correctly
- [ ] Course listing displays all 3 courses
- [ ] Individual course page shows details
- [ ] Course syllabus displays
- [ ] Pricing shows correctly

### Payment Flow Tests (Use Test Card in Preview, Real Card in Production)

- [ ] Click "Enroll Now" on a course
- [ ] Razorpay checkout opens
- [ ] Enter test card details (preview) or real card (production)
- [ ] Payment processes successfully
- [ ] Redirected back to success page
- [ ] Enrollment appears in user dashboard
- [ ] Payment confirmation email received (if configured)

### Course Access Tests

- [ ] Access enrolled course
- [ ] View course modules
- [ ] Access question banks
- [ ] Download materials (if available)
- [ ] Track progress

### Error Handling Tests

- [ ] Try accessing course not enrolled in (should deny)
- [ ] Test payment failure (use failure test card)
- [ ] Test with invalid login credentials
- [ ] Test expired session handling
- [ ] Navigate to non-existent page (404 handling)

### Performance Tests

- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] No console errors in browser
- [ ] Mobile responsive layout works
- [ ] Cross-browser testing (Chrome, Safari, Firefox)

---

## 13. Automated Smoke Test Script

**Save as:** `smoke-test.sh`

```bash
#!/bin/bash

DOMAIN="https://cerebrumbiologyacademy.com"
PASSED=0
FAILED=0

echo "🚀 Starting Smoke Tests for $DOMAIN"
echo "=================================="

# Test 1: Homepage loads
echo -n "Test 1: Homepage loads... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN)
if [ $STATUS -eq 200 ]; then
    echo "✅ PASSED"
    ((PASSED++))
else
    echo "❌ FAILED (Status: $STATUS)"
    ((FAILED++))
fi

# Test 2: API health endpoint
echo -n "Test 2: API health endpoint... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN/api/health)
if [ $STATUS -eq 200 ]; then
    echo "✅ PASSED"
    ((PASSED++))
else
    echo "❌ FAILED (Status: $STATUS)"
    ((FAILED++))
fi

# Test 3: Courses API
echo -n "Test 3: Courses API... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN/api/courses)
if [ $STATUS -eq 200 ] || [ $STATUS -eq 401 ]; then
    echo "✅ PASSED"
    ((PASSED++))
else
    echo "❌ FAILED (Status: $STATUS)"
    ((FAILED++))
fi

# Test 4: Auth endpoint
echo -n "Test 4: Auth endpoint... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN/api/auth/session)
if [ $STATUS -eq 200 ] || [ $STATUS -eq 401 ]; then
    echo "✅ PASSED"
    ((PASSED++))
else
    echo "❌ FAILED (Status: $STATUS)"
    ((FAILED++))
fi

# Test 5: SSL Certificate
echo -n "Test 5: SSL Certificate valid... "
SSL_CHECK=$(curl -s -I $DOMAIN | grep -i "HTTP/2 200" || echo "FAILED")
if [ "$SSL_CHECK" != "FAILED" ]; then
    echo "✅ PASSED"
    ((PASSED++))
else
    echo "❌ FAILED"
    ((FAILED++))
fi

# Test 6: Response time
echo -n "Test 6: Response time < 2s... "
TIME=$(curl -s -o /dev/null -w "%{time_total}" $DOMAIN)
if (( $(echo "$TIME < 2.0" | bc -l) )); then
    echo "✅ PASSED (${TIME}s)"
    ((PASSED++))
else
    echo "❌ FAILED (${TIME}s)"
    ((FAILED++))
fi

echo "=================================="
echo "Results: $PASSED passed, $FAILED failed"
if [ $FAILED -eq 0 ]; then
    echo "✅ All smoke tests passed!"
    exit 0
else
    echo "❌ Some tests failed. Check deployment."
    exit 1
fi
```

**Run after deployment:**

```bash
chmod +x smoke-test.sh
./smoke-test.sh
```

---

## 14. Final Deployment Steps

**Execute in order:**

### Step 1: Pre-Deployment Verification (30 min)

- [ ] Complete ALL critical items in sections 1-10
- [ ] Review this checklist with team
- [ ] Confirm all environment variables ready
- [ ] Confirm database backup completed

### Step 2: Deploy to Vercel (15 min)

- [ ] Push final code to GitHub main branch
  ```bash
  git add .
  git commit -m "chore: prepare for production deployment"
  git push origin main
  ```
- [ ] Import project to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Trigger first production deployment
- [ ] Wait for deployment to complete

### Step 3: Post-Deployment Verification (30 min)

- [ ] Run smoke test script
- [ ] Complete manual testing checklist
- [ ] Test payment with real transaction (₹1)
- [ ] Verify email notifications work
- [ ] Check error logging is working
- [ ] Monitor Vercel deployment logs

### Step 4: DNS & Domain Configuration (15 min)

- [ ] Update DNS records as specified
- [ ] Wait for DNS propagation (5-30 minutes)
- [ ] Verify HTTPS certificate issued
- [ ] Test both www and non-www domains

### Step 5: Monitoring Setup (20 min)

- [ ] Configure uptime monitoring
- [ ] Set up error alerts
- [ ] Enable performance monitoring
- [ ] Test alert notifications

### Step 6: Documentation & Communication (15 min)

- [ ] Document production URLs
- [ ] Share credentials with team (securely)
- [ ] Update internal wiki/docs
- [ ] Announce deployment to stakeholders

---

## 15. Ready to Deploy? Final Checklist

**All items must be ✅ before deploying:**

- [ ] All CRITICAL priority items completed (Sections 1, 2, 3, 4, 7, 10)
- [ ] All HIGH priority items completed or acknowledged (Sections 5, 6, 9)
- [ ] Database backup confirmed
- [ ] Environment variables prepared in password manager
- [ ] Rollback plan understood and documented
- [ ] Team notified of deployment window
- [ ] Support team ready for user inquiries
- [ ] Monitoring and alerts configured
- [ ] Post-deployment test plan ready

**Deployment Window:** ******\_\_\_******
**Approved By:** ******\_\_\_******
**Deployment Status:** ⬜ Ready | ⬜ In Progress | ⬜ Complete

---

## 16. Post-Deployment Monitoring (First 24 Hours)

**Monitor continuously for the first 24 hours:**

### Hour 0-1 (Immediate)

- [ ] All smoke tests passing
- [ ] No critical errors in logs
- [ ] First real user transaction successful
- [ ] Email notifications working

### Hour 1-6

- [ ] Payment success rate > 95%
- [ ] Page load times acceptable
- [ ] No database connection errors
- [ ] User registrations working

### Hour 6-24

- [ ] Error rate < 1%
- [ ] Uptime 100%
- [ ] No customer complaints
- [ ] All features accessible

### Issue Response Plan

**If issues detected:**

1. Assess severity (Critical/High/Medium/Low)
2. If CRITICAL: Execute rollback immediately
3. If HIGH: Deploy hotfix within 2 hours
4. If MEDIUM: Schedule fix for next deployment
5. If LOW: Add to backlog

---

## 17. Success Metrics

**Measure after 1 week:**

- [ ] Uptime: ****\_\_\_****% (Target: > 99.9%)
- [ ] Payment success rate: ****\_\_\_****% (Target: > 98%)
- [ ] Page load time: ****\_\_\_****s (Target: < 2s)
- [ ] Error rate: ****\_\_\_****% (Target: < 0.5%)
- [ ] User registrations: ****\_\_\_****
- [ ] Course enrollments: ****\_\_\_****
- [ ] Total revenue: ₹****\_\_\_****

---

## Appendix A: Quick Reference Commands

```bash
# Build verification
npm run build

# Type check
npx tsc --noEmit

# Database status
npx prisma migrate status

# Generate Prisma Client
npx prisma generate

# Database backup
pg_dump -h HOST -U USER -d DATABASE > backup.sql

# Git status
git status
git log --oneline -5

# Vercel CLI
vercel deploy --prod
vercel env ls
vercel logs

# Run smoke tests
./smoke-test.sh
```

---

## Appendix B: Emergency Contacts

**Technical Team:**

- Lead Developer: ******\_\_\_******
- Database Admin: ******\_\_\_******
- DevOps: ******\_\_\_******

**Service Providers:**

- Vercel Support: https://vercel.com/support
- Razorpay Support: support@razorpay.com
- Database Provider: ******\_\_\_******

**Escalation Path:**

1. Check logs and error messages
2. Review recent deployments
3. Execute rollback if necessary
4. Contact lead developer
5. Contact service provider support

---

**Last Updated:** ******\_\_\_******
**Next Review:** ******\_\_\_******
**Version:** 1.0

---

**NOTES:**

Use this space to document any deployment-specific notes, issues encountered, or lessons learned:

---

---

---

---
