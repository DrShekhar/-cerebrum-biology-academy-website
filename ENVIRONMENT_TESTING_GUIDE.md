# Environment-Specific Testing Guide

**Cerebrum Biology Academy - Testing Across Environments**

Version: 1.0
Last Updated: 2025-10-29

---

## Table of Contents

1. [Environment Overview](#environment-overview)
2. [Development Environment Testing](#development-environment-testing)
3. [Staging Environment Testing](#staging-environment-testing)
4. [Production Environment Testing](#production-environment-testing)
5. [Environment Configuration](#environment-configuration)
6. [Smoke Tests for Each Environment](#smoke-tests-for-each-environment)
7. [Data Management](#data-management)
8. [Troubleshooting by Environment](#troubleshooting-by-environment)

---

## Environment Overview

### Environment Tiers

| Environment    | Purpose                   | URL                              | Database         | Payment Gateway    | Testing Scope              |
| -------------- | ------------------------- | -------------------------------- | ---------------- | ------------------ | -------------------------- |
| **Local Dev**  | Feature development       | `localhost:3001`                 | Local PostgreSQL | Razorpay Test Mode | Full testing, all features |
| **Staging**    | Pre-production validation | `staging.cerebrumbioacademy.com` | Staging DB       | Razorpay Test Mode | Integration testing, UAT   |
| **Production** | Live system               | `www.cerebrumbioacademy.com`     | Production DB    | Razorpay Live Mode | Smoke tests only           |

### Environment Characteristics

#### Development (Local)

- **Purpose:** Feature development and unit testing
- **Data:** Test data, can be reset anytime
- **Testing:** Comprehensive, all scenarios
- **Deployment:** Manual (npm run dev)
- **Monitoring:** Console logs, DevTools

#### Staging

- **Purpose:** Pre-production validation and integration testing
- **Data:** Staging data, periodic resets
- **Testing:** Full regression, UAT, performance testing
- **Deployment:** Automated from develop branch
- **Monitoring:** Vercel logs, error tracking

#### Production

- **Purpose:** Live user-facing system
- **Data:** Real user data
- **Testing:** Smoke tests, health checks only
- **Deployment:** Automated from main branch (manual trigger)
- **Monitoring:** Full monitoring, alerts, analytics

---

## Development Environment Testing

### Setup

**1. Install Dependencies**

```bash
cd /Users/drshekhar/cerebrum-biology-academy-website
npm install
```

**2. Configure Environment Variables**

Create/update `.env.local`:

```bash
# Database (Local PostgreSQL or remote dev DB)
DATABASE_URL="postgresql://user:password@localhost:5432/cerebrum_dev"
DIRECT_DATABASE_URL="postgresql://user:password@localhost:5432/cerebrum_dev"

# Razorpay Test Credentials
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_XXXXXXXXXXXX"
RAZORPAY_KEY_SECRET="YOUR_TEST_SECRET_HERE"
RAZORPAY_WEBHOOK_SECRET="whsec_test_XXXXXXXXXXXX"

# Auth Secret
NEXTAUTH_SECRET="dev-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3001"

# Optional: Test mode flags
NODE_ENV="development"
ENABLE_TEST_MODE="true"
```

**3. Setup Database**

```bash
# Run migrations
npm run db:migrate:dev

# Seed test data
npm run db:seed

# Open Prisma Studio to verify
npm run db:studio
```

**4. Start Development Server**

```bash
npm run dev
```

### Development Testing Checklist

#### Environment Verification

- [ ] Server runs on correct port (3001 or 3000)
- [ ] Database connection successful
- [ ] Razorpay test keys loaded
- [ ] No environment variable warnings in console

#### Feature Testing (Full Scope)

**Homepage Testing:**

- [ ] All components load
- [ ] Images display correctly
- [ ] Navigation works
- [ ] CTA buttons functional

**Course Selection:**

- [ ] Course listing page loads
- [ ] Course cards display
- [ ] Filtering works (if implemented)
- [ ] "Enroll Now" buttons functional

**Purchase Flow:**

- [ ] Purchase page loads for all courses
- [ ] Pricing plans display correctly
- [ ] Plan selection works
- [ ] Guest checkout form appears

**Payment Testing:**

- [ ] Razorpay SDK loads
- [ ] Test payment succeeds (card: 4111 1111 1111 1111)
- [ ] Test payment fails (card: 4000 0000 0000 0002)
- [ ] UPI payment works (success@razorpay)
- [ ] Payment cancellation works

**Post-Payment:**

- [ ] Enrollment created with status PENDING
- [ ] Payment verified
- [ ] Enrollment activated (status ACTIVE)
- [ ] Material access granted
- [ ] Success page displays

**Authentication:**

- [ ] Login with email/password
- [ ] Login with mobile OTP
- [ ] Registration creates user
- [ ] Session persists
- [ ] Logout clears session
- [ ] Protected routes redirect

#### Database Verification

```bash
# Open Prisma Studio
npm run db:studio

# Check tables:
# - User
# - Course
# - Enrollment
# - Payment
# - MaterialAccess
```

#### API Testing

```bash
# Test purchase API
curl -X POST http://localhost:3001/api/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "class-11",
    "planType": "FULL",
    "amount": 35000,
    "email": "dev-test@example.com",
    "phone": "9876543210",
    "name": "Dev Test User"
  }'

# Test payment verification
curl http://localhost:3001/api/payments/verify?order_id=order_XXXXX
```

### Development Testing Best Practices

1. **Use Test Data Liberally:** Create, modify, delete test records freely
2. **Test Edge Cases:** Try invalid inputs, boundary conditions, error scenarios
3. **Check Console Logs:** Monitor for errors, warnings, or unexpected behavior
4. **Use DevTools:** Inspect network requests, check storage, debug JS
5. **Reset Database as Needed:**
   ```bash
   npm run db:migrate:reset
   npm run db:seed
   ```

### Development Environment Limitations

- **No Real Payments:** Always uses Razorpay test mode
- **No Real Emails/SMS:** May need to mock or stub
- **No Production Data:** Test data only
- **No SSL:** Uses HTTP (not HTTPS)

---

## Staging Environment Testing

### Purpose

Staging environment mirrors production as closely as possible, used for:

- Final validation before production deployment
- User Acceptance Testing (UAT)
- Integration testing with external services
- Performance testing under production-like conditions

### Setup

**1. Access Staging Environment**

```
URL: https://staging.cerebrumbioacademy.com
(or your configured staging URL)
```

**2. Staging Environment Variables**

Set in Vercel dashboard for staging deployment:

```bash
# Database (Staging PostgreSQL)
DATABASE_URL="postgresql://user:password@staging-db.example.com:5432/cerebrum_staging"
DIRECT_DATABASE_URL="<same as above>"

# Razorpay Test Credentials (same as dev)
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_XXXXXXXXXXXX"
RAZORPAY_KEY_SECRET="YOUR_TEST_SECRET_HERE"
RAZORPAY_WEBHOOK_SECRET="whsec_staging_XXXXXXXXXXXX"

# Auth Secret (unique for staging)
NEXTAUTH_SECRET="staging-secret-key-different-from-dev"
NEXTAUTH_URL="https://staging.cerebrumbioacademy.com"

# Environment
NODE_ENV="production"  # Even for staging
VERCEL_ENV="preview"
```

**3. Deploy to Staging**

```bash
# Push to develop branch (if auto-deploy configured)
git push origin develop

# Or manual Vercel deployment
vercel deploy --prod=false
```

### Staging Testing Checklist

#### Pre-Deployment Checks

- [ ] Staging branch up-to-date with latest code
- [ ] Environment variables configured in Vercel
- [ ] Database migrations run successfully
- [ ] Staging database seeded with test data

#### Smoke Tests (Quick Verification)

**Homepage:**

- [ ] Homepage loads without errors
- [ ] SSL certificate valid (HTTPS)
- [ ] All images load
- [ ] Navigation functional

**Course Purchase Flow:**

- [ ] Select course → Enroll
- [ ] View purchase page
- [ ] Select pricing plan
- [ ] Fill guest checkout form
- [ ] Initiate payment (Razorpay test mode)
- [ ] Complete test payment
- [ ] Verify enrollment activated
- [ ] Check success page displays

**Authentication:**

- [ ] Login with test credentials
- [ ] Access dashboard
- [ ] Logout

#### Regression Testing

Run through all major features:

- [ ] All pages accessible
- [ ] Forms submit correctly
- [ ] API endpoints respond
- [ ] Database operations work
- [ ] File uploads work (if applicable)
- [ ] Third-party integrations functional

#### Performance Testing

**Page Load Times:**

- [ ] Homepage loads < 3 seconds
- [ ] Course page loads < 2 seconds
- [ ] Purchase page loads < 2 seconds
- [ ] Dashboard loads < 3 seconds

**API Response Times:**

- [ ] `/api/purchase` responds < 2 seconds
- [ ] `/api/payments/verify` responds < 1 second
- [ ] `/api/auth/signin` responds < 1 second

**Lighthouse Scores:**

```bash
# Run Lighthouse CI (if configured)
npm run lighthouse

# Or use Lighthouse in Chrome DevTools
# Target scores:
# - Performance: > 80
# - Accessibility: > 90
# - Best Practices: > 90
# - SEO: > 90
```

#### Cross-Browser Testing

Test on:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

#### Responsive Testing

Test on:

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

#### Security Testing

- [ ] HTTPS enforced (no HTTP access)
- [ ] Security headers present (CSP, X-Frame-Options, etc.)
- [ ] Sensitive data not exposed in console
- [ ] API routes protected from unauthorized access
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (input sanitization)

### Staging Database Management

**1. Seed Test Data**

```bash
# SSH into staging or run via Vercel CLI
npx prisma db seed
```

**2. Reset Staging Database (Carefully!)**

```bash
# Only if absolutely necessary
npx prisma migrate reset --force

# Then re-seed
npx prisma db seed
```

**3. Verify Data**

```bash
# Use Prisma Studio in staging
DATABASE_URL="<staging-db-url>" npx prisma studio
```

### Staging Testing Best Practices

1. **Treat Like Production:** Don't make destructive changes casually
2. **Coordinate with Team:** Announce when running large test suites
3. **Document Issues:** Log all bugs found with reproduction steps
4. **Test Real Scenarios:** Use realistic user journeys
5. **Monitor Performance:** Use tools like Vercel Analytics

### Staging Environment Limitations

- **Still Test Mode Payments:** Razorpay test keys, no real money
- **May Have Data Delays:** Not real-time production data
- **Possible Rate Limits:** May differ from production

---

## Production Environment Testing

### Purpose

Production testing is **extremely limited** and only includes:

- Smoke tests after deployment
- Health checks
- Monitoring for errors

**⚠️ NEVER DO FULL TESTING IN PRODUCTION**

### Pre-Production Checklist

Before deploying to production:

- [ ] All staging tests passed
- [ ] Performance tests passed
- [ ] Security audit completed
- [ ] Database migrations tested in staging
- [ ] Rollback plan documented
- [ ] Team notified of deployment

### Production Deployment Process

**1. Verify Environment Variables**

Set in Vercel dashboard for production:

```bash
# Database (Production PostgreSQL)
DATABASE_URL="postgresql://user:password@prod-db.example.com:5432/cerebrum_prod"
DIRECT_DATABASE_URL="<same as above>"

# Razorpay LIVE Credentials
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_XXXXXXXXXXXX"
RAZORPAY_KEY_SECRET="YOUR_LIVE_SECRET_HERE"
RAZORPAY_WEBHOOK_SECRET="whsec_live_XXXXXXXXXXXX"

# Auth Secret (unique, strong)
NEXTAUTH_SECRET="<strong-random-secret-32-chars>"
NEXTAUTH_URL="https://www.cerebrumbioacademy.com"

# Environment
NODE_ENV="production"
VERCEL_ENV="production"
```

**2. Deploy to Production**

```bash
# Push to main branch (if auto-deploy configured)
git push origin main

# Or manual Vercel production deployment
vercel deploy --prod
```

**3. Run Database Migrations** (if needed)

```bash
# Via Vercel CLI or SSH
npx prisma migrate deploy
```

### Production Smoke Tests

**Immediately After Deployment (5-10 minutes):**

#### Critical Path 1: Homepage

```
1. Visit: https://www.cerebrumbioacademy.com
2. Verify: Page loads without errors
3. Verify: No console errors in DevTools
4. Verify: Images load correctly
5. Verify: Navigation links work
```

**Status:** PASS / FAIL

---

#### Critical Path 2: Course Browsing

```
1. Visit: https://www.cerebrumbioacademy.com/courses
2. Verify: Course listing loads
3. Verify: At least 3 courses visible
4. Verify: "Enroll Now" buttons present
```

**Status:** PASS / FAIL

---

#### Critical Path 3: Purchase Page Load

```
1. Visit: https://www.cerebrumbioacademy.com/purchase/class-11
2. Verify: Purchase page loads
3. Verify: Pricing plans display
4. Verify: No errors in console
5. DO NOT proceed to actual payment
```

**Status:** PASS / FAIL

---

#### Critical Path 4: Login Page

```
1. Visit: https://www.cerebrumbioacademy.com/auth/signin
2. Verify: Login form displays
3. Verify: Both auth methods available
4. DO NOT attempt actual login (unless using test account)
```

**Status:** PASS / FAIL

---

#### Critical Path 5: API Health Check

```bash
# Test health endpoint
curl https://www.cerebrumbioacademy.com/api/health

# Expected response:
# {"status": "ok", "timestamp": "..."}
```

**Status:** PASS / FAIL

---

### Production Monitoring

**1. Real-Time Monitoring**

Set up monitoring for:

- [ ] Uptime monitoring (Vercel, UptimeRobot, etc.)
- [ ] Error tracking (Sentry, Rollbar, etc.)
- [ ] Performance monitoring (Vercel Analytics, New Relic, etc.)
- [ ] Log aggregation (Logtail, Datadog, etc.)

**2. Metrics to Monitor**

- **Uptime:** Target > 99.9%
- **Response Time:** Average < 500ms
- **Error Rate:** < 0.1%
- **API Success Rate:** > 99%
- **Database Connection Pool:** Not exhausted

**3. Alerts to Configure**

- [ ] Server downtime alert
- [ ] High error rate alert (> 5 errors/min)
- [ ] Slow response time alert (> 3s)
- [ ] Failed payment alert
- [ ] Database connection failure

### Production Testing Restrictions

**❌ DO NOT:**

- Test payment flows with real cards (use staging)
- Create fake user accounts
- Modify production data
- Run load tests
- Test experimental features

**✅ DO:**

- Monitor error logs
- Check health endpoints
- Verify critical pages load
- Review analytics dashboards
- Test with a **single designated test account** (if absolutely necessary)

### Production Issue Response

**If Smoke Tests Fail:**

1. **Assess Severity:**
   - Critical: Payment, login, database down → Rollback immediately
   - High: Major feature broken → Fix ASAP or rollback
   - Medium: Minor feature issue → Plan fix
   - Low: Cosmetic issue → Log for future fix

2. **Rollback Procedure:**

   ```bash
   # Via Vercel dashboard or CLI
   vercel rollback

   # Or redeploy previous version
   vercel deploy --prod <previous-deployment-url>
   ```

3. **Communicate:**
   - Notify team in Slack/Discord
   - Update status page (if applicable)
   - Inform stakeholders

4. **Root Cause Analysis:**
   - Review deployment logs
   - Check environment variables
   - Verify database migrations
   - Test in staging to reproduce

---

## Environment Configuration

### Environment Variable Management

**Development (.env.local):**

```bash
# Store locally, never commit
# Can contain test keys and secrets
```

**Staging (Vercel Dashboard):**

```bash
# Set in Vercel project settings
# Environment: Preview
# Use test/staging credentials
```

**Production (Vercel Dashboard):**

```bash
# Set in Vercel project settings
# Environment: Production
# Use live credentials only
```

### Accessing Environment Variables

**Via Vercel CLI:**

```bash
# List environment variables
vercel env ls

# Pull environment variables to .env.local
vercel env pull .env.local

# Add environment variable
vercel env add RAZORPAY_KEY_SECRET

# Remove environment variable
vercel env rm RAZORPAY_KEY_SECRET
```

**Via Vercel Dashboard:**

1. Go to project settings
2. Navigate to "Environment Variables"
3. Add/edit variables
4. Select environment (Production, Preview, Development)
5. Save and redeploy

### Environment-Specific Configuration

**In code (next.config.mjs):**

```javascript
const isDevelopment = process.env.NODE_ENV === 'development'
const isStaging = process.env.VERCEL_ENV === 'preview'
const isProduction = process.env.VERCEL_ENV === 'production'

export default {
  // Environment-specific settings
  reactStrictMode: true,
  images: {
    domains: isDevelopment
      ? ['localhost']
      : isStaging
        ? ['staging-cdn.example.com']
        : ['cdn.cerebrumbioacademy.com'],
  },
}
```

---

## Smoke Tests for Each Environment

### Quick Smoke Test Script (5 minutes)

**Run in each environment after deployment:**

```bash
#!/bin/bash
# smoke-test.sh

BASE_URL=$1  # Pass as argument: ./smoke-test.sh https://example.com

echo "Running smoke tests on $BASE_URL"

# Test 1: Homepage
echo "Test 1: Homepage"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)
if [ $STATUS -eq 200 ]; then
  echo "✅ Homepage OK"
else
  echo "❌ Homepage FAILED (Status: $STATUS)"
fi

# Test 2: API Health
echo "Test 2: API Health"
HEALTH=$(curl -s $BASE_URL/api/health | jq -r .status)
if [ "$HEALTH" == "ok" ]; then
  echo "✅ API Health OK"
else
  echo "❌ API Health FAILED"
fi

# Test 3: Course Page
echo "Test 3: Course Page"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/courses)
if [ $STATUS -eq 200 ]; then
  echo "✅ Course Page OK"
else
  echo "❌ Course Page FAILED (Status: $STATUS)"
fi

# Test 4: Purchase Page
echo "Test 4: Purchase Page"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/purchase/class-11)
if [ $STATUS -eq 200 ]; then
  echo "✅ Purchase Page OK"
else
  echo "❌ Purchase Page FAILED (Status: $STATUS)"
fi

# Test 5: Login Page
echo "Test 5: Login Page"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/auth/signin)
if [ $STATUS -eq 200 ]; then
  echo "✅ Login Page OK"
else
  echo "❌ Login Page FAILED (Status: $STATUS)"
fi

echo "Smoke tests completed!"
```

**Usage:**

```bash
# Development
./smoke-test.sh http://localhost:3001

# Staging
./smoke-test.sh https://staging.cerebrumbioacademy.com

# Production
./smoke-test.sh https://www.cerebrumbioacademy.com
```

---

## Data Management

### Development Data

**Reset and Seed:**

```bash
# Full reset
npm run db:migrate:reset

# Seed test data
npm run db:seed
```

**Manual Data Creation:**

```bash
# Use Prisma Studio
npm run db:studio

# Or create via API
curl -X POST http://localhost:3001/api/test-data/seed
```

### Staging Data

**Refresh from Production (Anonymized):**

```sql
-- Copy production data to staging (with anonymization)
-- Run this in staging database

-- Anonymize user emails
UPDATE "User"
SET email = CONCAT('staging-user-', id, '@example.com'),
    phone = CONCAT('91', LPAD(FLOOR(RANDOM() * 10000000000)::TEXT, 10, '0'))
WHERE role = 'STUDENT';

-- Clear payment details (keep structure)
UPDATE "Payment"
SET "razorpayPaymentId" = 'pay_staging_test',
    "razorpaySignature" = 'staging_signature';
```

**Seed Staging Test Data:**

```bash
# Via Vercel CLI (connect to staging)
vercel env pull .env.staging
DATABASE_URL=$(cat .env.staging | grep DATABASE_URL) npx prisma db seed
```

### Production Data

**⚠️ NEVER MODIFY PRODUCTION DATA DIRECTLY**

- Use migrations only
- Always test migrations in staging first
- Create backups before any schema changes
- Use transactions for data updates

**Production Backup:**

```bash
# Automated daily backups (set up via database provider)
# Or manual backup:
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

---

## Troubleshooting by Environment

### Development Issues

**Issue: Server won't start**

```bash
# Solution 1: Check port availability
lsof -ti:3001 | xargs kill -9

# Solution 2: Clear Next.js cache
rm -rf .next
npm run dev

# Solution 3: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue: Database connection error**

```bash
# Solution: Verify DATABASE_URL
echo $DATABASE_URL

# Or check .env.local
cat .env.local | grep DATABASE_URL

# Test connection
npx prisma db pull
```

**Issue: Razorpay not loading**

```bash
# Check environment variables
cat .env.local | grep RAZORPAY

# Verify script loading in browser DevTools
# Network tab → filter for "razorpay"
```

### Staging Issues

**Issue: Deployment failed**

```bash
# Check Vercel deployment logs
vercel logs <deployment-url>

# Or view in Vercel dashboard
# https://vercel.com/<your-project>/deployments
```

**Issue: Environment variables not updating**

```bash
# Solution: Redeploy after updating env vars
vercel deploy --prod=false

# Or trigger redeploy in Vercel dashboard
```

**Issue: Database migration failed**

```bash
# Check migration status
npx prisma migrate status

# Force migration
npx prisma migrate deploy --force

# If all else fails, reset staging database
npx prisma migrate reset --force
```

### Production Issues

**Issue: Site is down**

```bash
# Check Vercel status
vercel inspect <deployment-url>

# Check error logs
vercel logs <deployment-url>

# Rollback if critical
vercel rollback
```

**Issue: Payments failing**

```bash
# Check Razorpay dashboard for errors
# https://dashboard.razorpay.com/

# Verify webhook configuration
# Webhook URL should be:
# https://www.cerebrumbioacademy.com/api/webhooks/payments

# Check environment variables
vercel env ls | grep RAZORPAY
```

**Issue: Database connection pool exhausted**

```bash
# Increase connection pool size in DATABASE_URL
# Example:
# postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20

# Or optimize queries to release connections faster
```

---

## Environment Comparison Matrix

| Feature           | Development     | Staging          | Production      |
| ----------------- | --------------- | ---------------- | --------------- |
| **Testing Scope** | Full            | Regression + UAT | Smoke only      |
| **Data**          | Test data       | Staging data     | Live data       |
| **Payments**      | Test mode       | Test mode        | Live mode       |
| **SSL**           | No              | Yes              | Yes             |
| **Monitoring**    | Console         | Vercel + Logs    | Full monitoring |
| **Deployment**    | Manual          | Auto (develop)   | Auto (main)     |
| **Rollback**      | N/A             | Easy             | Critical        |
| **Access**        | Developers only | Team + QA        | Public          |

---

## Checklist: Environment Setup Verification

### Development Environment ✅

- [ ] Node.js installed (v18+)
- [ ] PostgreSQL running
- [ ] .env.local configured
- [ ] npm install completed
- [ ] Database migrations run
- [ ] Test data seeded
- [ ] Server starts without errors

### Staging Environment ✅

- [ ] Vercel project configured
- [ ] Environment variables set (Preview)
- [ ] Staging database created
- [ ] Database migrations run
- [ ] Staging URL accessible
- [ ] SSL certificate valid
- [ ] Deploy from develop branch works

### Production Environment ✅

- [ ] Vercel project configured
- [ ] Environment variables set (Production)
- [ ] Production database created
- [ ] Database migrations tested in staging
- [ ] Production URL accessible
- [ ] SSL certificate valid
- [ ] Deploy from main branch works
- [ ] Monitoring configured
- [ ] Alerts configured
- [ ] Rollback plan documented

---

**End of Environment-Specific Testing Guide**
