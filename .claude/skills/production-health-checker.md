# Production Health Checker Skill

**Purpose:** Monitor production deployment health and run comprehensive smoke tests after deployment.

**When to use:** Automatically after every production deployment or manually to check current production status.

---

## Health Check Categories

### 1. Homepage & Public Routes

**Routes to test:**

```
/ (Homepage)
/courses
/about
/contact
/pricing
/faculty
/testimonials
```

**Checks:**

- ✅ Returns 200 OK
- ✅ Response time < 2 seconds
- ✅ No 500 errors
- ✅ No middleware failures
- ✅ Content loads correctly

**Test command:**

```bash
curl -s -o /dev/null -w "%{http_code} %{time_total}s" https://cerebrumbiologyacademy.com
```

---

### 2. API Endpoints

**Critical APIs:**

```
/api/health (public health check)
/api/courses
/api/testimonials
```

**Protected APIs (require auth token):**

```
/api/user
/api/dashboard
/api/admin
```

**Checks:**

- ✅ Public APIs return 200
- ✅ Protected APIs return 401 without auth
- ✅ Protected APIs return 200 with valid auth
- ✅ Response times < 1 second
- ✅ No CORS errors
- ✅ Proper error handling

**Test command:**

```bash
# Public API
curl -s -w "\nStatus: %{http_code}\nTime: %{time_total}s\n" \
  https://cerebrumbiologyacademy.com/api/health

# Protected API (should return 401)
curl -s -w "\nStatus: %{http_code}\n" \
  https://cerebrumbiologyacademy.com/api/user
```

---

### 3. Middleware Functionality

**Checks:**

- ✅ Security headers present
- ✅ CORS configured correctly
- ✅ Rate limiting working
- ✅ CSP headers set
- ✅ No middleware errors (500)

**Test command:**

```bash
curl -I https://cerebrumbiologyacademy.com | grep -E "X-Frame-Options|Content-Security-Policy|X-Content-Type-Options"
```

**Expected headers:**

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; ...
```

---

### 4. Static Assets

**Assets to check:**

```
/_next/static/chunks/*.js
/favicon.ico
/images/*.png
/fonts/*.woff2
```

**Checks:**

- ✅ Static files return 200
- ✅ Correct MIME types
- ✅ Cache headers set correctly
- ✅ Compression enabled (gzip/brotli)

**Test command:**

```bash
curl -I https://cerebrumbiologyacademy.com/_next/static/chunks/main.js
```

**Expected:**

```
HTTP/2 200
cache-control: public, max-age=31536000, immutable
content-encoding: br
content-type: application/javascript
```

---

### 5. Performance Metrics

**Key metrics to track:**

- **TTFB (Time to First Byte):** < 200ms
- **FCP (First Contentful Paint):** < 1.8s
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTI (Time to Interactive):** < 3.8s

**Test command:**

```bash
# Using Lighthouse CI
npx lighthouse https://cerebrumbiologyacademy.com \
  --only-categories=performance \
  --quiet \
  --chrome-flags="--headless"
```

---

### 6. Database Connectivity

**Checks (if database is accessible):**

- ✅ Can connect to database
- ✅ Read operations work
- ✅ Connection pool healthy
- ✅ Query response times < 100ms

**Test via API:**

```bash
curl https://cerebrumbiologyacademy.com/api/health/db
```

**Expected response:**

```json
{
  "status": "healthy",
  "database": "connected",
  "latency": "45ms"
}
```

---

### 7. External Service Integration

**Services to check:**

- OpenAI API (if used in runtime)
- Anthropic API (if used in runtime)
- Razorpay (payment gateway)
- WhatsApp Business API

**Checks:**

- ✅ API keys valid
- ✅ Services reachable
- ✅ Rate limits not exceeded
- ✅ No authentication errors

---

## Smoke Test Suite

### Quick Smoke Test (< 30 seconds)

```bash
#!/bin/bash
# quick-smoke-test.sh

DOMAIN="https://cerebrumbiologyacademy.com"

echo "🔍 Running Quick Smoke Tests..."

# 1. Homepage
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN)
if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Homepage: OK"
else
  echo "❌ Homepage: FAILED ($HTTP_CODE)"
fi

# 2. API Health
API_CODE=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN/api/health)
if [ "$API_CODE" = "200" ]; then
  echo "✅ API Health: OK"
else
  echo "❌ API Health: FAILED ($API_CODE)"
fi

# 3. Security Headers
HEADERS=$(curl -sI $DOMAIN | grep -E "X-Frame-Options|X-Content-Type-Options")
if [ -n "$HEADERS" ]; then
  echo "✅ Security Headers: OK"
else
  echo "❌ Security Headers: MISSING"
fi

# 4. Response Time
TIME=$(curl -s -o /dev/null -w "%{time_total}" $DOMAIN)
if (( $(echo "$TIME < 2.0" | bc -l) )); then
  echo "✅ Response Time: ${TIME}s"
else
  echo "⚠️  Response Time: ${TIME}s (slow)"
fi

echo ""
echo "Smoke Test Complete!"
```

---

### Comprehensive Health Check (< 2 minutes)

```bash
#!/bin/bash
# comprehensive-health-check.sh

DOMAIN="https://cerebrumbiologyacademy.com"

echo "🏥 Running Comprehensive Health Check..."

# Test all public routes
ROUTES=("/" "/courses" "/about" "/contact" "/pricing")

for route in "${ROUTES[@]}"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN$route)
  TIME=$(curl -s -o /dev/null -w "%{time_total}" $DOMAIN$route)

  if [ "$CODE" = "200" ]; then
    echo "✅ $route: OK (${TIME}s)"
  else
    echo "❌ $route: FAILED ($CODE)"
  fi
done

# Test API endpoints
echo ""
echo "Testing APIs..."

# Public API
curl -s $DOMAIN/api/health | jq .

# Protected API (expect 401)
CODE=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN/api/user)
if [ "$CODE" = "401" ]; then
  echo "✅ Protected API: Correctly secured"
else
  echo "⚠️  Protected API: Unexpected status ($CODE)"
fi

# Performance metrics
echo ""
echo "Performance Metrics:"
curl -s -w "\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" \
  -o /dev/null $DOMAIN

echo ""
echo "Health Check Complete!"
```

---

## Monitoring & Alerting

### Real-Time Monitoring

**Tools:**

- Vercel Analytics (built-in)
- Custom health check endpoint
- GitHub Actions status checks

**Alert triggers:**

- Any 500 error
- Response time > 3 seconds
- 3+ consecutive failures
- Middleware invocation failures
- Database connection issues

### Alert Channels

**WhatsApp (using existing WhatsApp Business API):**

```typescript
// Send health alert via WhatsApp
async function sendHealthAlert(issue: string) {
  const message = `
🚨 Production Health Alert

Issue: ${issue}
Time: ${new Date().toISOString()}
URL: ${PRODUCTION_URL}

Status: Investigating...
  `

  await sendWhatsAppMessage(ADMIN_PHONE, message)
}
```

**Email:**

```typescript
// Send health alert via email
async function sendEmailAlert(issue: string) {
  await sendEmail({
    to: 'admin@cerebrumbiologyacademy.com',
    subject: '🚨 Production Health Alert',
    body: `Production issue detected: ${issue}`,
  })
}
```

---

## Post-Deployment Validation

### Automatic Post-Deploy Check

**Triggered by:** GitHub Actions on successful deployment

**Workflow:**

```yaml
# .github/workflows/production-deployment.yml
- name: 🏥 Post-Deployment Health Check
  needs: [deploy]
  steps:
    - name: Wait for deployment to stabilize
      run: sleep 30

    - name: Run smoke tests
      run: |
        bash scripts/quick-smoke-test.sh

    - name: Check critical routes
      run: |
        curl -f https://cerebrumbiologyacademy.com || exit 1
        curl -f https://cerebrumbiologyacademy.com/api/health || exit 1

    - name: Alert if failed
      if: failure()
      run: |
        # Send alert to admin
        echo "Deployment succeeded but health check failed!"
```

---

## Rollback Decision Matrix

**Automatic rollback if:**

- ❌ Homepage returns 500
- ❌ API health check fails
- ❌ Middleware invocation errors
- ❌ Database connection fails
- ❌ 3+ smoke tests fail

**Manual review if:**

- ⚠️ Response time > 3 seconds
- ⚠️ 1-2 smoke tests fail
- ⚠️ Non-critical API errors
- ⚠️ Performance degradation

**Safe to continue if:**

- ✅ All smoke tests pass
- ✅ Response times < 2 seconds
- ✅ No 500 errors
- ✅ Security headers present

---

## Usage

**Automatic (post-deployment):**

```bash
# Triggered by GitHub Actions after successful deploy
production-health-checker run-smoke-tests
```

**Manual:**

```bash
# Check current production health
production-health-checker check

# Run comprehensive tests
production-health-checker comprehensive

# Monitor for 5 minutes
production-health-checker monitor --duration=5m

# Check specific route
production-health-checker test-route --url=/courses
```

**In Claude Code:**

```
Run production-health-checker skill
```

---

## Health Report Format

```markdown
## Production Health Report

**Timestamp:** 2025-01-19 04:50:00 UTC
**Deployment:** https://cerebrum-biology-academy-website-pu7ry07v0.vercel.app

### Overall Status: ✅ HEALTHY

### Route Tests (6/6 passed)

✅ / - 200 OK (0.45s)
✅ /courses - 200 OK (0.52s)
✅ /about - 200 OK (0.38s)
✅ /contact - 200 OK (0.41s)
✅ /pricing - 200 OK (0.48s)
✅ /faculty - 200 OK (0.43s)

### API Tests (2/2 passed)

✅ /api/health - 200 OK (0.12s)
✅ /api/user - 401 Unauthorized (correctly secured)

### Security (4/4 passed)

✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ Content-Security-Policy: present
✅ HTTPS enforced

### Performance

- TTFB: 145ms ✅
- Response Time (avg): 0.44s ✅
- All routes < 2s ✅

### Recommendations

- All systems operational
- No action required

**Next check:** Automatic in 1 hour
```

---

## Success Metrics

**Track:**

- Deployment success rate
- Time to detect issues
- False positive rate
- Mean time to recovery (MTTR)

**Target:**

- 99.9% uptime
- < 1 minute issue detection
- < 5% false positives
- < 10 minutes MTTR

---

## Integration with Monitoring Tools

**Vercel Analytics:**

- Automatic performance tracking
- Real User Monitoring (RUM)
- Web Vitals data

**Custom Dashboard:**

- Real-time health status
- Historical performance data
- Alert history
- Deployment timeline
