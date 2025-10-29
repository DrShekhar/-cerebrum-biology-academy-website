# Post-Deployment Verification - Quick Start Guide

## Installation

No additional dependencies required! The scripts use only Node.js built-in modules.

## Basic Usage

### Verify Production Deployment

```bash
npm run verify:deployment
```

### Verify Custom URL

```bash
npm run verify:deployment -- --url https://staging.cerebrumbiologyacademy.com
```

### Verbose Mode (See detailed logs)

```bash
npm run verify:verbose
```

### JSON Output (For CI/CD)

```bash
npm run verify:json > verification-report.json
```

### With Notifications

```bash
# Set webhook URL first
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# Run verification with notifications
npm run verify:notify
```

## Available npm Scripts

| Script              | Description                             |
| ------------------- | --------------------------------------- |
| `verify:deployment` | Run verification on production URL      |
| `verify:production` | Explicitly verify production            |
| `verify:preview`    | Verify Vercel preview deployment        |
| `verify:verbose`    | Run with detailed logging               |
| `verify:json`       | Output results as JSON                  |
| `verify:notify`     | Run verification and send notifications |

## What Gets Checked

### Core Checks

- ✅ Homepage loads (HTTP 200)
- ✅ API health endpoint responds
- ✅ Database connectivity
- ✅ Critical pages accessible
- ✅ API endpoints exist

### Performance

- ⚡ Homepage load < 3s
- ⚡ TTFB < 600ms
- ⚡ API response < 500ms

### Security

- 🔒 HTTPS enabled
- 🔒 Security headers present
- 🔒 No exposed secrets

### SEO

- 🎯 Meta tags present
- 🎯 robots.txt accessible
- 🎯 sitemap.xml accessible

### Analytics

- 📊 Google Analytics loaded
- 📊 Google Tag Manager loaded

## Exit Codes

- `0` - All checks passed
- `1` - Some checks failed

## Reading Results

### Terminal Output

```
============================================================
🚀 CEREBRUM BIOLOGY ACADEMY - POST-DEPLOYMENT VERIFICATION
============================================================

📍 Target URL: https://cerebrumbiologyacademy.com
⏰ Started at: 2025-10-29 10:00:00

📱 Checking Homepage...
✅ Homepage → HTTP Status (245ms)
✅ Homepage → Title Tag
✅ Homepage → Navigation
✅ Homepage → Footer
✅ Homepage → No Error Messages
✅ Homepage → Load Time < 3s (245ms)

🏥 Checking API Health Endpoints...
✅ API Health → Health Check (156ms)
✅ API Health → Health Check - JSON Format
✅ API Health → Database Connectivity
✅ API Health → Environment Variables
✅ API Health → Health Check - Response Time (156ms)

============================================================
📊 VERIFICATION SUMMARY
============================================================

✅ Passed:   35/35 (100.0%)
❌ Failed:   0/35
⚠️  Warnings: 0/35
⏱️  Duration: 3456ms

🎉 All checks passed! Deployment verified successfully.
```

### JSON Output

```json
{
  "timestamp": "2025-10-29T10:00:00.000Z",
  "baseUrl": "https://cerebrumbiologyacademy.com",
  "summary": {
    "total": 35,
    "passed": 35,
    "failed": 0,
    "warnings": 0
  },
  "checks": [
    {
      "category": "Homepage",
      "name": "HTTP Status",
      "passed": true,
      "warning": false,
      "duration": 245,
      "error": null,
      "details": { "statusCode": 200 }
    }
    // ... more checks
  ],
  "duration": 3456
}
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Verify Deployment
  run: npm run verify:json > report.json

- name: Check Results
  run: |
    FAILED=$(cat report.json | jq '.summary.failed')
    if [ "$FAILED" -gt 0 ]; then
      echo "Verification failed"
      exit 1
    fi
```

### Shell Script

```bash
#!/bin/bash
if npm run verify:deployment; then
    echo "✅ Deployment verified"
else
    echo "❌ Verification failed"
    exit 1
fi
```

## Notifications

### Slack

```bash
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T00/B00/XXX"
npm run verify:notify
```

### Discord

```bash
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
npm run verify:notify
```

## Troubleshooting

### Check fails: "Request timeout"

```bash
# Increase timeout
npm run verify:deployment -- --timeout 30000
```

### Check fails: "Connection refused"

1. Verify URL is correct
2. Check deployment completed successfully
3. Wait 30s for deployment to stabilize

### Check fails: "Database connectivity"

1. Verify `DATABASE_URL` environment variable
2. Check database is running
3. Review Prisma configuration

## Advanced Options

### Custom Timeout and Retries

```bash
node scripts/verify-deployment.js \
  --url https://example.com \
  --timeout 15000 \
  --retries 5 \
  --verbose
```

### Bash Alternative

```bash
# No Node.js required
bash scripts/verify-deployment.sh https://cerebrumbiologyacademy.com
```

## After Deployment Checklist

1. ✅ Run verification: `npm run verify:deployment`
2. ✅ Check all tests passed
3. ✅ Review warnings (if any)
4. ✅ Monitor logs for first few minutes
5. ✅ Test critical user flows manually
6. ✅ Check analytics data is flowing

## Getting Help

- Full documentation: `POST_DEPLOYMENT_VERIFICATION.md`
- Script help: `node scripts/verify-deployment.js --help`
- Notification help: `node scripts/notify-deployment.js --help`

---

**Quick Links:**

- Production: https://cerebrumbiologyacademy.com
- Health Check: https://cerebrumbiologyacademy.com/api/health
- Vercel Dashboard: https://vercel.com/dashboard

**Last Updated:** 2025-10-29
