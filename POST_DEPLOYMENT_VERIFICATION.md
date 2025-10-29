# Post-Deployment Verification Guide

## Overview

This document describes the automated post-deployment verification system for Cerebrum Biology Academy. The verification scripts ensure that all critical functionality is working correctly after each deployment.

## Table of Contents

- [Quick Start](#quick-start)
- [Scripts Overview](#scripts-overview)
- [Verification Checks](#verification-checks)
- [Usage Examples](#usage-examples)
- [Integration with CI/CD](#integration-with-cicd)
- [Troubleshooting](#troubleshooting)
- [Notifications Setup](#notifications-setup)

## Quick Start

### Prerequisites

- **Node.js version**: 18.x or higher (for JS script)
- **Bash version**: 4.0 or higher (for shell script)
- **Required tools for bash**: `curl`, `jq`, `bc`

### Running Verification

```bash
# Using npm script (Node.js version)
npm run verify:deployment

# Using bash script
bash scripts/verify-deployment.sh

# Verify specific URL
npm run verify:deployment -- --url https://staging.cerebrumbiologyacademy.com
bash scripts/verify-deployment.sh https://staging.cerebrumbiologyacademy.com
```

## Scripts Overview

### 1. verify-deployment.js (Node.js)

Full-featured verification script with advanced options.

**Features:**

- Colored terminal output
- Retry mechanism for failed requests
- JSON output mode
- Verbose logging
- Configurable timeout and retry attempts
- Detailed performance metrics

**Usage:**

```bash
node scripts/verify-deployment.js [options]

Options:
  --url <url>        Base URL to verify
  --verbose, -v      Enable verbose logging
  --json             Output results in JSON format
  --timeout <ms>     Request timeout in milliseconds (default: 10000)
  --retries <n>      Number of retry attempts (default: 3)
  --help, -h         Show help message
```

### 2. verify-deployment.sh (Bash)

Lightweight alternative that works in any Unix environment.

**Features:**

- No Node.js dependency
- Colored terminal output
- Basic retry mechanism
- Log file generation
- Works with standard Unix tools

**Usage:**

```bash
bash scripts/verify-deployment.sh [BASE_URL]
```

## Verification Checks

### 1. Homepage Checks

Verifies the main landing page is accessible and functional.

**Checks performed:**

- ✅ HTTP 200 status code
- ✅ Title tag present and not empty
- ✅ Navigation elements present
- ✅ Footer elements present
- ✅ No error messages in HTML
- ✅ Load time under 3 seconds

**Expected results:**

- Homepage loads successfully
- All critical UI elements render
- No error states visible

**Common issues:**

```bash
# Issue: Homepage returns 500
Fix: Check server logs for errors
    Check DATABASE_URL is set correctly
    Verify all environment variables are configured

# Issue: Load time > 3s
Fix: Check CDN configuration
    Optimize images and assets
    Review database query performance
```

### 2. API Health Endpoints

Checks health monitoring endpoints.

**Endpoints checked:**

- `/api/health` - Main health check endpoint

**Checks performed:**

- ✅ HTTP 200 or 503 status (503 = degraded but responding)
- ✅ Valid JSON response
- ✅ Database connectivity
- ✅ Environment variables loaded
- ✅ Response time under 500ms

**Expected JSON structure:**

```json
{
  "status": "healthy",
  "timestamp": "2025-10-29T10:00:00.000Z",
  "uptime": 3600,
  "services": {
    "database": {
      "status": "up",
      "latency": "45ms"
    },
    "redis": {
      "status": "up",
      "latency": "12ms"
    }
  },
  "metrics": {
    "requestsPerMinute": 120,
    "errorRate": "0.05%",
    "avgResponseTime": 250
  }
}
```

**Common issues:**

```bash
# Issue: Database status is "down"
Fix: Check DATABASE_URL environment variable
    Verify database is running
    Check connection pool settings
    Review Prisma schema

# Issue: Response time > 500ms
Fix: Check database query performance
    Review Redis cache hit rate
    Optimize slow API endpoints
```

### 3. Critical Pages

Verifies all important pages are accessible.

**Pages checked:**

- `/courses` - Course catalog
- `/purchase/class-11` - Class 11 purchase page
- `/purchase/class-12` - Class 12 purchase page
- `/purchase/neet-dropper` - NEET Dropper program
- `/login` - User login
- `/signup` - User registration
- `/about` - About page
- `/contact` - Contact page

**Checks performed:**

- ✅ HTTP 200, 307, or 308 status (redirects are OK)
- ✅ Page loads within reasonable time
- ✅ No 404 or 500 errors

**Common issues:**

```bash
# Issue: Page returns 404
Fix: Check route is defined in src/app
    Verify middleware not blocking route
    Check vercel.json routing configuration

# Issue: Page returns 500
Fix: Check page component for errors
    Verify data fetching logic
    Review server logs
```

### 4. API Endpoints

Tests API endpoint availability.

**Endpoints checked:**

- `POST /api/auth/signin` - Authentication
- `GET /api/courses` - Course data

**Checks performed:**

- ✅ Endpoint exists (not 404)
- ✅ Returns appropriate status code
- ✅ Responds within timeout

**Note:** These checks verify endpoint existence, not full functionality.

**Common issues:**

```bash
# Issue: Endpoint returns 404
Fix: Check API route file exists
    Verify route.ts exports GET/POST handler
    Check middleware configuration

# Issue: Endpoint returns 500
Fix: Check API handler code for errors
    Verify database connection
    Review error logs
```

### 5. Static Assets

Verifies critical static files are accessible.

**Assets checked:**

- `/favicon.ico` - Site favicon

**Checks performed:**

- ✅ HTTP 200 status
- ✅ Correct content-type header
- ✅ File loads successfully

**Common issues:**

```bash
# Issue: Favicon returns 404
Fix: Check public/favicon.ico exists
    Verify build process copies static files
    Check Vercel deployment includes public directory

# Issue: Images not loading
Fix: Check image paths are correct
    Verify next/image configuration
    Review CSP headers allow image sources
```

### 6. Performance Metrics

Measures site performance.

**Metrics measured:**

- ⚡ Time to First Byte (TTFB) < 600ms
- ⚡ Total load time < 3s
- ⚡ API response time < 500ms

**Performance thresholds:**

- **Excellent:** TTFB < 200ms, Load < 1s
- **Good:** TTFB < 600ms, Load < 3s
- **Warning:** TTFB < 1000ms, Load < 5s
- **Poor:** TTFB > 1000ms, Load > 5s

**Optimization tips:**

```bash
# Slow TTFB
- Enable Redis caching
- Optimize database queries
- Use connection pooling
- Enable CDN for static assets

# Slow load time
- Optimize images (use next/image)
- Enable compression
- Minimize JavaScript bundles
- Implement code splitting
- Use lazy loading
```

### 7. Security Headers

Checks security-related HTTP headers.

**Headers checked:**

- 🔒 HTTPS enabled
- 🔒 Strict-Transport-Security (HSTS)
- 🔒 X-Frame-Options
- 🔒 X-Content-Type-Options
- 🔒 Content-Security-Policy (optional)
- 🔒 No exposed secrets in HTML

**Expected headers:**

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'; ...
```

**Common issues:**

```bash
# Issue: Missing security headers
Fix: Add headers in next.config.ts:

    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains'
            }
          ]
        }
      ]
    }

# Issue: Secrets exposed in HTML
Fix: Never put API keys in client code
    Use environment variables on server only
    Review build output for leaked secrets
```

### 8. SEO Requirements

Verifies search engine optimization elements.

**Checks performed:**

- 🎯 Title tag present and not empty
- 🎯 Meta description tag
- 🎯 Canonical URL
- 🎯 Open Graph tags
- 🎯 robots.txt accessible
- 🎯 sitemap.xml accessible

**Expected meta tags:**

```html
<title>Cerebrum Biology Academy - NEET Biology Coaching</title>
<meta name="description" content="..." />
<link rel="canonical" href="https://cerebrumbiologyacademy.com/" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
```

**Common issues:**

```bash
# Issue: Missing meta tags
Fix: Add metadata in layout.tsx or page.tsx:

    export const metadata = {
      title: 'Your Title',
      description: 'Your description',
      openGraph: {
        title: 'Your Title',
        description: 'Your description',
        images: ['/og-image.png']
      }
    }

# Issue: robots.txt not found
Fix: Create public/robots.txt:

    User-agent: *
    Allow: /
    Sitemap: https://cerebrumbiologyacademy.com/sitemap.xml

# Issue: sitemap.xml not found
Fix: Generate sitemap in app/sitemap.ts:

    export default function sitemap() {
      return [
        {
          url: 'https://cerebrumbiologyacademy.com',
          lastModified: new Date(),
          priority: 1
        }
      ]
    }
```

### 9. Analytics Integration

Verifies tracking and analytics are loaded.

**Services checked:**

- 📊 Google Analytics
- 📊 Google Tag Manager

**Checks performed:**

- ✅ Analytics script present in HTML
- ✅ Tracking ID configured
- ✅ No console errors related to analytics

**Common issues:**

```bash
# Issue: Google Analytics not detected
Fix: Add GA4 in app/layout.tsx:

    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}
    </Script>

# Issue: GTM not detected
Fix: Add GTM in app/layout.tsx:

    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){...})(window,document,'script','dataLayer','${GTM_ID}');`
      }}
    />
```

## Usage Examples

### Basic Usage

```bash
# Verify production deployment
npm run verify:deployment

# Or using bash
bash scripts/verify-deployment.sh
```

### Verify Staging Environment

```bash
# Node.js version
npm run verify:deployment -- --url https://staging.cerebrumbiologyacademy.com

# Bash version
bash scripts/verify-deployment.sh https://staging.cerebrumbiologyacademy.com
```

### Verbose Mode

```bash
# See detailed information about each check
npm run verify:deployment -- --verbose
```

### JSON Output for CI/CD

```bash
# Output results as JSON for parsing
npm run verify:deployment -- --json > deployment-report.json

# Example: Parse results in CI
cat deployment-report.json | jq '.summary'
```

### Custom Timeout and Retries

```bash
# Increase timeout for slow connections
npm run verify:deployment -- --timeout 30000 --retries 5
```

## Integration with CI/CD

### GitHub Actions

Add to `.github/workflows/deploy.yml`:

```yaml
name: Deploy and Verify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Deploy to Vercel
        run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Wait for deployment
        run: sleep 30

      - name: Verify deployment
        run: npm run verify:deployment -- --json > verification-report.json

      - name: Upload verification report
        uses: actions/upload-artifact@v3
        with:
          name: verification-report
          path: verification-report.json

      - name: Check verification results
        run: |
          FAILED=$(cat verification-report.json | jq '.summary.failed')
          if [ "$FAILED" -gt 0 ]; then
            echo "Verification failed with $FAILED failed checks"
            exit 1
          fi
          echo "All verification checks passed!"
```

### Vercel Deploy Hooks

Add post-deployment verification in `package.json`:

```json
{
  "scripts": {
    "vercel-build": "next build",
    "postdeploy": "node scripts/verify-deployment.js --url $VERCEL_URL"
  }
}
```

### Manual CI/CD Integration

```bash
#!/bin/bash
# deploy-and-verify.sh

set -e

# Deploy
echo "Deploying to production..."
vercel deploy --prod

# Wait for deployment to propagate
echo "Waiting for deployment to stabilize..."
sleep 30

# Run verification
echo "Running post-deployment verification..."
if npm run verify:deployment; then
    echo "✅ Deployment verified successfully!"

    # Send success notification
    curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
      -H 'Content-Type: application/json' \
      -d '{"text":"🎉 Production deployment verified successfully!"}'
else
    echo "❌ Deployment verification failed!"

    # Send failure notification
    curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
      -H 'Content-Type: application/json' \
      -d '{"text":"🚨 Production deployment verification failed! Check logs."}'

    exit 1
fi
```

## Troubleshooting

### Common Error Messages

#### "Request timeout"

**Cause:** Server not responding within timeout period.

**Solutions:**

1. Increase timeout: `--timeout 30000`
2. Check if server is running
3. Verify network connectivity
4. Review server logs for slow queries

#### "Connection refused"

**Cause:** Server not accessible at specified URL.

**Solutions:**

1. Verify URL is correct
2. Check DNS resolution
3. Ensure firewall allows connections
4. Verify Vercel deployment succeeded

#### "Invalid JSON response"

**Cause:** API endpoint not returning valid JSON.

**Solutions:**

1. Check API route handler code
2. Verify Content-Type header is set
3. Review error handling in API routes
4. Check for unhandled exceptions

#### "Database connectivity failed"

**Cause:** Cannot connect to database.

**Solutions:**

1. Verify DATABASE_URL environment variable
2. Check database is running and accessible
3. Review connection pool settings
4. Check Prisma configuration
5. Verify IP allowlist includes Vercel IPs

### Debug Mode

Enable verbose logging to see detailed information:

```bash
# Node.js version
npm run verify:deployment -- --verbose

# Check specific endpoint manually
curl -v https://cerebrumbiologyacademy.com/api/health

# Test with retry logic
for i in {1..3}; do
  echo "Attempt $i"
  curl -s https://cerebrumbiologyacademy.com/api/health | jq
  sleep 2
done
```

### Log Analysis

Check generated log files:

```bash
# View Node.js script output
cat deployment-verification-*.log

# View bash script output
cat deployment-verification-*.log

# Search for errors
grep ERROR deployment-verification-*.log

# Count failed checks
grep "❌" deployment-verification-*.log | wc -l
```

## Notifications Setup

### Slack Integration

Add webhook notification after verification:

```javascript
// scripts/notify-slack.js
const https = require('https')

function notifySlack(results) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  const { passed, failed, warnings } = results.summary
  const status = failed === 0 ? 'success' : 'failure'
  const emoji = failed === 0 ? '🎉' : '🚨'

  const message = {
    text: `${emoji} Deployment Verification ${status.toUpperCase()}`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Deployment Verification ${status}*`,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Passed:*\n${passed}`,
          },
          {
            type: 'mrkdwn',
            text: `*Failed:*\n${failed}`,
          },
          {
            type: 'mrkdwn',
            text: `*Warnings:*\n${warnings}`,
          },
          {
            type: 'mrkdwn',
            text: `*URL:*\n${results.baseUrl}`,
          },
        ],
      },
    ],
  }

  const data = JSON.stringify(message)
  const url = new URL(webhookUrl)

  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  }

  const req = https.request(options, (res) => {
    console.log(`Slack notification sent: ${res.statusCode}`)
  })

  req.on('error', (error) => {
    console.error('Failed to send Slack notification:', error)
  })

  req.write(data)
  req.end()
}

module.exports = { notifySlack }
```

Update verification script to use notifications:

```javascript
// In verify-deployment.js, add at the end of run()
const { notifySlack } = require('./notify-slack');

async run() {
  try {
    const success = await this.runAllChecks();

    // Send notification
    if (process.env.SLACK_WEBHOOK_URL) {
      notifySlack(this.results);
    }

    return success ? 0 : 1;
  } catch (error) {
    // ...
  }
}
```

### Email Notifications

```bash
# Using sendmail (if available)
if [ $FAILED_CHECKS -gt 0 ]; then
    echo "Deployment verification failed with $FAILED_CHECKS failed checks" | \
    mail -s "🚨 Deployment Verification Failed" admin@cerebrumbiologyacademy.com
fi
```

### Discord Webhook

```bash
# notify-discord.sh
DISCORD_WEBHOOK_URL="your-webhook-url"

curl -X POST "$DISCORD_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"content\": \"🎉 Deployment verified successfully!\",
    \"embeds\": [{
      \"title\": \"Verification Results\",
      \"color\": 3066993,
      \"fields\": [
        {\"name\": \"Passed\", \"value\": \"$PASSED_CHECKS\", \"inline\": true},
        {\"name\": \"Failed\", \"value\": \"$FAILED_CHECKS\", \"inline\": true},
        {\"name\": \"Warnings\", \"value\": \"$WARNING_CHECKS\", \"inline\": true}
      ]
    }]
  }"
```

## Best Practices

### 1. Run After Every Deployment

Always verify after deploying to ensure nothing broke:

```bash
# In your deployment script
vercel deploy --prod && npm run verify:deployment
```

### 2. Set Up Automated Monitoring

Don't rely only on deployment verification. Use services like:

- **Uptime monitoring:** UptimeRobot, Pingdom
- **APM:** New Relic, Datadog, Sentry
- **Synthetic monitoring:** Checkly, Cypress Dashboard

### 3. Version Your Verification Scripts

Keep verification scripts in version control and update them when you add new features:

```bash
# When adding new API endpoint
echo "New endpoint: /api/new-feature" >> verification-checklist.md

# Update verification script to check new endpoint
```

### 4. Document Expected Behaviors

Maintain a list of expected results for each check:

```markdown
## Expected Results

- Homepage: < 2s load time
- API health: < 300ms response
- Database: < 100ms query time
- All pages: Return 200 or 3xx
```

### 5. Test in Staging First

Always run verification on staging before production:

```bash
# Staging
npm run verify:deployment -- --url https://staging.cerebrumbiologyacademy.com

# If staging passes, deploy to production
vercel deploy --prod
npm run verify:deployment
```

## Maintenance

### Updating Scripts

When adding new features to the site, update verification scripts:

1. **New pages:** Add to `criticalPages` array
2. **New API endpoints:** Add to `checkAPIEndpoints()`
3. **New third-party services:** Add new check functions
4. **Performance requirements changed:** Update thresholds

### Reviewing Results

Periodically review verification results to identify trends:

```bash
# Analyze historical data
for log in deployment-verification-*.log; do
    echo "$log:"
    grep "VERIFICATION SUMMARY" -A 5 "$log"
done

# Plot performance trends
cat deployment-verification-*.log | \
  grep "Load Time" | \
  awk '{print $NF}' | \
  sort -n
```

## Support

For issues with verification scripts:

1. Check this documentation first
2. Review error messages and logs
3. Try with `--verbose` flag for more details
4. Check GitHub issues for similar problems
5. Contact development team

---

**Last Updated:** 2025-10-29

**Version:** 1.0.0

**Maintainer:** Cerebrum Biology Academy Development Team
