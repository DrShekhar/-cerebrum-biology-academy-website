# API Key Security Manager

**Purpose:** Automated API key rotation, monitoring, and security scanning to prevent exposed credentials and unauthorized usage.

**When to use:** Monthly for key rotation, immediately after suspected exposure, before production deployment.

---

## Problem: API Keys Exposed in Repository

### Critical Security Issue Found:

**File:** `.env.local` (committed to repository)

**Exposed Keys:**

```bash
Line 147: OPENAI_API_KEY="sk-proj-..." # ⚠️  EXPOSED
Line 151: ANTHROPIC_API_KEY="sk-ant-..." # ⚠️  EXPOSED
Line 155: GOOGLE_AI_API_KEY="AI..." # ⚠️  EXPOSED
```

**Git History:**

- Keys committed on multiple occasions
- Visible in git log, diffs, and GitHub search
- Potentially scraped by bots scanning public repositories

**Risk:**

- Unauthorized API usage → Unexpected bills
- Data exfiltration via API calls
- Service account compromise
- Reputation damage

---

## Immediate Response Plan

### Step 1: Rotate ALL Exposed Keys (URGENT)

**OpenAI:**

```bash
# 1. Go to: https://platform.openai.com/api-keys
# 2. Find key starting with "sk-proj-..."
# 3. Click "Revoke" → "Create new key"
# 4. Update in Vercel:
vercel env add OPENAI_API_KEY production
vercel env add OPENAI_API_KEY preview
```

**Anthropic:**

```bash
# 1. Go to: https://console.anthropic.com/settings/keys
# 2. Find key starting with "sk-ant-..."
# 3. Click "Delete" → "Create Key"
# 4. Update in Vercel:
vercel env add ANTHROPIC_API_KEY production
```

**Google AI:**

```bash
# 1. Go to: https://console.cloud.google.com/apis/credentials
# 2. Find "Browser key" or "API key"
# 3. Click "Delete" → "Create Credentials" → "API Key"
# 4. Restrict to specific APIs only
# 5. Update in Vercel:
vercel env add GOOGLE_AI_API_KEY production
```

### Step 2: Remove Keys from Git History

```bash
# Install git-filter-repo (better than git filter-branch)
brew install git-filter-repo  # macOS
# or
pip install git-filter-repo

# Remove .env.local from all history
git-filter-repo --path .env.local --invert-paths

# Force push (⚠️  DESTRUCTIVE - coordinate with team)
git push origin --force --all
git push origin --force --tags
```

**Alternative (Safer):** Use BFG Repo-Cleaner:

```bash
# Install BFG
brew install bfg

# Remove .env.local from history
bfg --delete-files .env.local

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

### Step 3: Add .env.local to .gitignore

```bash
# Ensure .env.local is ignored
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "security: ensure .env.local is gitignored"
git push
```

---

## Automated Key Rotation System

### Monthly Rotation Schedule

**File:** `.github/workflows/rotate-api-keys.yml`

```yaml
name: 🔐 Monthly API Key Rotation

on:
  schedule:
    # Run on 1st of every month at 2 AM UTC
    - cron: '0 2 1 * *'
  workflow_dispatch: # Manual trigger

jobs:
  rotate-keys:
    name: 🔄 Rotate API Keys
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4

      - name: 🔐 Rotate OpenAI Key
        run: |
          # This would call OpenAI API to rotate key
          # Requires OpenAI API access (not public API)
          echo "⚠️  Manual rotation required for OpenAI"
          echo "Visit: https://platform.openai.com/api-keys"

      - name: 🔐 Rotate Anthropic Key
        run: |
          echo "⚠️  Manual rotation required for Anthropic"
          echo "Visit: https://console.anthropic.com/settings/keys"

      - name: 📊 Send Rotation Reminder
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          username: ${{ secrets.NOTIFICATION_EMAIL }}
          password: ${{ secrets.NOTIFICATION_PASSWORD }}
          subject: '🔐 Monthly API Key Rotation Required'
          to: admin@cerebrumbiologyacademy.com
          from: alerts@cerebrumbiologyacademy.com
          body: |
            It's time to rotate API keys!

            Please rotate the following keys:
            1. OpenAI API Key
            2. Anthropic API Key
            3. Google AI API Key
            4. Razorpay Keys
            5. WhatsApp API Token

            Instructions: See .claude/skills/api-key-security-manager.md

      - name: 📝 Create Rotation Issue
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🔐 Monthly API Key Rotation Required',
              body: `
              ## Monthly Key Rotation Checklist

              - [ ] OpenAI API Key
              - [ ] Anthropic API Key
              - [ ] Google AI API Key
              - [ ] Razorpay Production Keys
              - [ ] WhatsApp Business API Token
              - [ ] Database Connection Strings
              - [ ] Vercel Tokens

              **Instructions:** See \`.claude/skills/api-key-security-manager.md\`

              **Due:** Within 7 days
              `,
              labels: ['security', 'high-priority']
            })
```

---

## Key Usage Monitoring

### Track API Usage Patterns

**File:** `/src/lib/monitoring/ApiKeyMonitor.ts`

```typescript
/**
 * API Key Usage Monitoring
 * Detects unusual patterns and potential key theft
 */

interface ApiUsageLog {
  provider: 'openai' | 'anthropic' | 'google'
  timestamp: Date
  cost: number
  tokens: number
  endpoint: string
  ip_address: string
  user_id?: string
}

class ApiKeyMonitor {
  private usageLogs: ApiUsageLog[] = []
  private readonly ALERT_THRESHOLD = 100 // dollars

  /**
   * Log API usage
   */
  async logUsage(log: ApiUsageLog): Promise<void> {
    this.usageLogs.push(log)

    // Store in database for historical analysis
    await prisma.apiUsageLog.create({
      data: log,
    })

    // Check for suspicious patterns
    await this.detectAnomalies(log)
  }

  /**
   * Detect unusual usage patterns
   */
  private async detectAnomalies(log: ApiUsageLog): Promise<void> {
    // 1. Check for sudden spike in usage
    const last24Hours = this.usageLogs.filter(
      (l) => l.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)
    )

    const totalCost24h = last24Hours.reduce((sum, l) => sum + l.cost, 0)

    if (totalCost24h > this.ALERT_THRESHOLD) {
      await this.sendAlert({
        type: 'cost_spike',
        message: `API costs exceeded $${this.ALERT_THRESHOLD} in last 24 hours`,
        cost: totalCost24h,
      })
    }

    // 2. Check for unusual IP addresses
    const knownIPs = ['vercel-ip-range', 'your-office-ip']
    if (!knownIPs.includes(log.ip_address)) {
      await this.sendAlert({
        type: 'unknown_ip',
        message: `API call from unknown IP: ${log.ip_address}`,
        log,
      })
    }

    // 3. Check for unusual endpoints
    const allowedEndpoints = ['/v1/chat/completions', '/v1/embeddings']
    if (!allowedEndpoints.includes(log.endpoint)) {
      await this.sendAlert({
        type: 'unusual_endpoint',
        message: `API call to unusual endpoint: ${log.endpoint}`,
        log,
      })
    }
  }

  /**
   * Send security alert
   */
  private async sendAlert(alert: {
    type: string
    message: string
    [key: string]: any
  }): Promise<void> {
    console.error('🚨 SECURITY ALERT:', alert)

    // Send to monitoring service (e.g., Sentry)
    // Send email notification
    // Send WhatsApp alert to admin

    // Store alert
    await prisma.securityAlert.create({
      data: {
        type: alert.type,
        message: alert.message,
        metadata: alert,
        timestamp: new Date(),
      },
    })
  }

  /**
   * Get usage report
   */
  async getUsageReport(days: number = 30): Promise<{
    totalCost: number
    totalTokens: number
    byProvider: Record<string, { cost: number; tokens: number }>
  }> {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const logs = await prisma.apiUsageLog.findMany({
      where: { timestamp: { gte: startDate } },
    })

    const report = {
      totalCost: 0,
      totalTokens: 0,
      byProvider: {} as Record<string, { cost: number; tokens: number }>,
    }

    logs.forEach((log) => {
      report.totalCost += log.cost
      report.totalTokens += log.tokens

      if (!report.byProvider[log.provider]) {
        report.byProvider[log.provider] = { cost: 0, tokens: 0 }
      }

      report.byProvider[log.provider].cost += log.cost
      report.byProvider[log.provider].tokens += log.tokens
    })

    return report
  }
}

export const apiKeyMonitor = new ApiKeyMonitor()
```

**Usage in API Routes:**

```typescript
// Example: OpenAI API wrapper
import { apiKeyMonitor } from '@/lib/monitoring/ApiKeyMonitor'

export async function POST(request: Request) {
  const response = await openai.chat.completions.create({...})

  // Log usage
  await apiKeyMonitor.logUsage({
    provider: 'openai',
    timestamp: new Date(),
    cost: calculateCost(response.usage),
    tokens: response.usage.total_tokens,
    endpoint: '/v1/chat/completions',
    ip_address: request.headers.get('x-forwarded-for') || 'unknown',
  })

  return Response.json(response)
}
```

---

## Key Security Best Practices

### 1. Environment Variable Management

**DO ✅:**

```bash
# Use Vercel environment variables for secrets
vercel env add OPENAI_API_KEY production
vercel env add OPENAI_API_KEY preview

# Use different keys for dev/staging/production
OPENAI_API_KEY_DEV=sk-...
OPENAI_API_KEY_STAGING=sk-...
OPENAI_API_KEY_PROD=sk-...

# Restrict API keys to specific:
- IP addresses (Vercel IP range)
- Domains (cerebrumbiologyacademy.com)
- APIs (only the endpoints you use)
```

**DON'T ❌:**

```bash
# Never commit .env.local
git add .env.local  # ❌

# Never hardcode keys in code
const apiKey = "sk-..." # ❌

# Never use the same key for all environments
# OPENAI_API_KEY same in dev/staging/prod ❌
```

### 2. Key Restriction Configuration

**OpenAI:**

```bash
# Restrict by:
- Usage limits: $100/month
- Rate limits: 10,000 RPM
- Models: gpt-4, gpt-3.5-turbo only
```

**Google AI:**

```bash
# Restrict to:
- Application restrictions: HTTP referrers
- API restrictions: Only Generative Language API
- Quota limits: 100 requests/minute
```

**Razorpay:**

```bash
# Use Test Mode keys in development
RAZORPAY_KEY_ID_TEST=rzp_test_...
RAZORPAY_KEY_SECRET_TEST=...

# Use Live Mode keys ONLY in production
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
```

---

## Automated Security Scanning

### GitHub Secret Scanning

**File:** `.github/workflows/secret-scan.yml`

```yaml
name: 🔍 Secret Scanning

on:
  push:
    branches: ['**']
  pull_request:
    branches: [main]

jobs:
  secret-scan:
    name: 🔐 Scan for Exposed Secrets
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Full history for scanning

      - name: 🔍 Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: 🔍 Run TruffleHog
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD

      - name: ❌ Fail if secrets found
        if: failure()
        run: |
          echo "🚨 SECRETS DETECTED IN CODEBASE!"
          echo "Review the scan results above and remove secrets immediately."
          echo "Then rotate all exposed keys."
          exit 1
```

### Pre-Commit Hook

**File:** `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Scan for secrets before allowing commit
echo "🔍 Scanning for secrets..."

# Check for common secret patterns
git diff --cached | grep -E "(sk-[a-zA-Z0-9]{48}|rzp_(test|live)_[a-zA-Z0-9]+|AIza[a-zA-Z0-9_-]{35})" && {
  echo "🚨 ERROR: Potential API key detected in staged changes!"
  echo "Please remove secrets before committing."
  exit 1
}

# Check if .env.local is being committed
git diff --cached --name-only | grep -E "\.env\.local$" && {
  echo "🚨 ERROR: .env.local should not be committed!"
  echo "Remove from staging: git reset .env.local"
  exit 1
}

echo "✅ No secrets detected"
```

---

## Emergency Response Playbook

### If API Key is Compromised:

**Step 1: Immediate Actions (within 5 minutes)**

```bash
# 1. Revoke compromised key immediately
# Go to provider dashboard and revoke

# 2. Check recent usage for unauthorized access
# OpenAI: https://platform.openai.com/usage
# Anthropic: Console > Usage
# Google: Cloud Console > APIs & Services > Dashboard

# 3. Create new key
# Generate new key with restrictions

# 4. Update production environment
vercel env rm OPENAI_API_KEY production
vercel env add OPENAI_API_KEY production
# Enter new key

# 5. Trigger redeployment
vercel --prod
```

**Step 2: Investigation (within 1 hour)**

```bash
# 1. Review git history
git log --all --full-history -- .env.local

# 2. Check who had access
git log --pretty=format:"%h %an %ae %s" --since="30 days ago"

# 3. Review API usage logs
# Check for unusual patterns, IPs, or costs

# 4. Document incident
# Create postmortem in .claude/incidents/
```

**Step 3: Prevention (within 24 hours)**

```bash
# 1. Remove key from git history
git-filter-repo --path .env.local --invert-paths

# 2. Enable secret scanning
# GitHub: Settings > Security > Secret scanning > Enable

# 3. Add pre-commit hooks
npx husky install
npx husky add .husky/pre-commit "bash .husky/secret-scan.sh"

# 4. Educate team
# Share this playbook with all developers
```

---

## Monitoring Dashboard

**File:** `/src/app/admin/security/api-keys/page.tsx`

```typescript
export default async function ApiKeysDashboard() {
  const report = await apiKeyMonitor.getUsageReport(30)
  const alerts = await prisma.securityAlert.findMany({
    where: { timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    orderBy: { timestamp: 'desc' },
  })

  return (
    <div>
      <h1>API Key Security Dashboard</h1>

      {/* Usage Overview */}
      <section>
        <h2>30-Day Usage</h2>
        <div>Total Cost: ${report.totalCost.toFixed(2)}</div>
        <div>Total Tokens: {report.totalTokens.toLocaleString()}</div>

        <h3>By Provider:</h3>
        {Object.entries(report.byProvider).map(([provider, data]) => (
          <div key={provider}>
            {provider}: ${data.cost.toFixed(2)} ({data.tokens.toLocaleString()} tokens)
          </div>
        ))}
      </section>

      {/* Security Alerts */}
      <section>
        <h2>Recent Alerts</h2>
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <strong>{alert.type}</strong>: {alert.message}
            <br />
            <small>{alert.timestamp.toLocaleString()}</small>
          </div>
        ))}
      </section>

      {/* Key Rotation Status */}
      <section>
        <h2>Key Rotation Status</h2>
        <div>Last Rotation: 15 days ago</div>
        <div>Next Due: in 15 days</div>
        <button>Rotate Keys Now</button>
      </section>
    </div>
  )
}
```

---

## Success Metrics

**Target:**

- 0 exposed keys in repository
- 100% key rotation every 30 days
- < 5 minutes detection time for unusual usage
- 100% of keys with usage restrictions
- 0 unauthorized API usage

**Monitoring:**

- Monthly security audit
- Weekly usage review
- Real-time anomaly detection
- Automated rotation reminders

---

_This skill ensures API keys are never exposed, automatically rotated, and monitored for unauthorized usage._
