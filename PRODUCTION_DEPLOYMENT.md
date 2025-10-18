# Production Deployment Guide

**Cerebrum Biology Academy - Complete Production Infrastructure**

## Table of Contents

1. [Overview](#overview)
2. [Pre-Deployment Setup](#pre-deployment-setup)
3. [Environment Variables](#environment-variables)
4. [Deployment Process](#deployment-process)
5. [Monitoring & Analytics](#monitoring--analytics)
6. [Performance Optimization](#performance-optimization)
7. [Security](#security)
8. [Backup & Recovery](#backup--recovery)
9. [Troubleshooting](#troubleshooting)
10. [Maintenance](#maintenance)

---

## Overview

### Production Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel CDN (Global)                  │
│                  cerebrumbiologyacademy.com             │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   ┌────▼────┐   ┌────▼────┐   ┌───▼────┐
   │ Next.js │   │   API   │   │ Static │
   │  Pages  │   │ Routes  │   │ Assets │
   └────┬────┘   └────┬────┘   └────────┘
        │             │
        ├─────────────┼──────────────┐
        │             │              │
   ┌────▼────┐   ┌───▼─────┐   ┌────▼─────┐
   │Database │   │  Redis  │   │ WhatsApp │
   │Supabase │   │ Upstash │   │ Business │
   │   PG    │   │         │   │   API    │
   └─────────┘   └─────────┘   └──────────┘
        │
   ┌────▼────────────┐
   │  AI Services    │
   │ Claude Sonnet 4 │
   │   OpenAI GPT    │
   └─────────────────┘
```

### Key Features

- **AI-Powered Learning**: Claude Sonnet 4 for intelligent tutoring
- **Real-time Monitoring**: Sentry error tracking + custom analytics
- **Rate Limiting**: Redis-based distributed rate limiting
- **Performance Optimization**: Bundle splitting, CDN caching
- **Security**: HTTPS, CORS, CSRF protection, input validation
- **Scalability**: Auto-scaling on Vercel, database connection pooling

---

## Pre-Deployment Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up External Services

#### A. Supabase PostgreSQL Database

1. Go to [supabase.com](https://supabase.com)
2. Create new project: `cerebrum-biology-academy-prod`
3. Copy `DATABASE_URL` from Settings → Database
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

#### B. Upstash Redis (Rate Limiting)

1. Go to [upstash.com](https://upstash.com)
2. Create Redis database: `cerebrum-rate-limiter`
3. Select region: Singapore (closest to target users)
4. Copy `REDIS_URL` (TLS connection string)

#### C. Vercel Blob Storage (File Uploads)

1. Go to Vercel Dashboard → Storage → Create Blob Store
2. Name: `cerebrum-uploads`
3. Copy `BLOB_READ_WRITE_TOKEN`

#### D. Sentry Error Tracking (Optional but Recommended)

1. Go to [sentry.io](https://sentry.io)
2. Create project: `cerebrum-biology-academy`
3. Copy `NEXT_PUBLIC_SENTRY_DSN`

#### E. Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create GA4 property: `Cerebrum Biology Academy`
3. Copy `NEXT_PUBLIC_GA_MEASUREMENT_ID` (format: G-XXXXXXXXXX)

---

## Environment Variables

### Required Production Variables

Create `.env.production` or add to Vercel dashboard:

```bash
# ============================================
# APPLICATION
# ============================================
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://cerebrumbiologyacademy.com
NEXT_PUBLIC_API_URL=https://cerebrumbiologyacademy.com/api

# ============================================
# DATABASE (Supabase PostgreSQL)
# ============================================
DATABASE_URL=postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres

# ============================================
# AI SERVICES
# ============================================
# Anthropic Claude (Primary)
ANTHROPIC_API_KEY=sk-ant-api03-...
ANTHROPIC_API_URL=https://api.anthropic.com/v1

# OpenAI (Fallback)
OPENAI_API_KEY=sk-proj-...
OPENAI_API_URL=https://api.openai.com/v1

# AI Configuration
AI_MODEL_PREFERENCE=claude-3.5-sonnet
AI_CACHE_ENABLED=true
AI_COST_TRACKING=true
AI_MAX_TOKENS=4096

# ============================================
# WHATSAPP BUSINESS API
# ============================================
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_ACCESS_TOKEN=your-permanent-access-token
WHATSAPP_BUSINESS_ACCOUNT_ID=your-business-account-id
WHATSAPP_VERIFY_TOKEN=cerebrum_webhook_verify_2024_secure
WHATSAPP_API_URL=https://graph.facebook.com/v18.0

# ============================================
# REDIS (Upstash - Rate Limiting)
# ============================================
REDIS_URL=rediss://default:PASSWORD@hostname.upstash.io:6379
REDIS_ENABLED=true

# ============================================
# AUTHENTICATION
# ============================================
AUTH_SECRET=production-secret-minimum-32-characters-long
AUTH_URL=https://cerebrumbiologyacademy.com
NEXTAUTH_URL=https://cerebrumbiologyacademy.com
NEXTAUTH_SECRET=production-secret-minimum-32-characters-long
JWT_SECRET=production-jwt-secret-minimum-32-characters-long
JWT_REFRESH_SECRET=production-jwt-refresh-secret-minimum-32-characters

# ============================================
# PAYMENT GATEWAY (Razorpay)
# ============================================
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your-razorpay-live-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# ============================================
# ANALYTICS & MONITORING
# ============================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# ============================================
# FILE STORAGE (Vercel Blob)
# ============================================
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXX

# ============================================
# EMAIL (Optional)
# ============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@cerebrumbiologyacademy.com
```

### Validate Environment Variables

```bash
npm run tsx scripts/setup-env-production.ts
```

This will:

- ✅ Check all required variables are set
- ✅ Validate format (URLs, API keys, etc.)
- ✅ Ensure production keys (not test/dev)
- ✅ Check security best practices

---

## Deployment Process

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Vercel Auto-Deploys**
   - Connected via GitHub integration
   - Automatic builds on push
   - Preview deployments on PRs

### Option 2: Manual Deployment

1. **Pre-deployment Checks**

   ```bash
   npm run tsx scripts/pre-deploy-check.ts
   ```

2. **Build Locally**

   ```bash
   npm run build
   ```

3. **Deploy to Vercel**

   ```bash
   npm run vercel:deploy
   # or
   vercel deploy --prod
   ```

4. **Post-deployment Validation**
   ```bash
   npm run tsx scripts/post-deploy-validate.ts https://cerebrumbiologyacademy.com
   ```

### Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Database migrations applied
- [ ] Redis connection tested
- [ ] WhatsApp webhook verified
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Health check returns 200
- [ ] All 4 features working:
  - [ ] AI Tutor Chat
  - [ ] MCP Database Integration
  - [ ] AI Test Generator
  - [ ] WhatsApp AI Bot

---

## Monitoring & Analytics

### 1. Health Check Endpoint

**URL**: `https://cerebrumbiologyacademy.com/api/health`

**Response**:

```json
{
  "status": "healthy",
  "timestamp": "2025-01-20T10:00:00Z",
  "uptime": 86400,
  "services": {
    "database": { "status": "up", "latency": "15ms" },
    "redis": { "status": "up", "latency": "5ms" },
    "anthropicAI": { "status": "up", "latency": "500ms" },
    "whatsapp": { "status": "up", "latency": "200ms" }
  },
  "metrics": {
    "requestsPerMinute": 150,
    "errorRate": "0.1%",
    "avgResponseTime": 250
  }
}
```

**Monitoring**: Set up uptime monitors:

- [UptimeRobot](https://uptimerobot.com) - Free, checks every 5 minutes
- [Pingdom](https://pingdom.com) - Advanced monitoring
- Vercel Analytics - Built-in

### 2. Error Tracking (Sentry)

**Dashboard**: [sentry.io/organizations/your-org/projects/cerebrum/](https://sentry.io)

**Key Metrics**:

- Error rate
- Affected users
- Most common errors
- Performance issues

**Alerts**: Configure for:

- Error rate > 1%
- Response time > 2s
- Memory usage > 80%

### 3. Google Analytics 4

**Dashboard**: [analytics.google.com](https://analytics.google.com)

**Key Events Tracked**:

- `ai_question_asked` - AI tutor usage
- `test_generated` - Test generator usage
- `demo_booked` - Lead conversion
- `student_enrolled` - Payment completion
- `whatsapp_message_sent` - WhatsApp engagement

**Custom Reports**:

- AI Usage Report
- Conversion Funnel
- User Engagement
- Revenue Analytics

### 4. Custom Analytics

**Access**:

```typescript
import { customAnalytics } from '@/lib/analytics/customAnalytics'

const insights = customAnalytics.getBusinessInsights(30) // Last 30 days
```

**Metrics**:

- AI usage (questions, tokens, cost)
- Test performance
- Conversion rates
- WhatsApp engagement
- User session data

---

## Performance Optimization

### 1. Bundle Size Optimization

**Current Sizes**:

- Main bundle: ~200KB (gzipped)
- Vendor bundle: ~150KB (gzipped)
- Total page load: ~350KB

**Optimization Techniques**:

- ✅ Code splitting by route
- ✅ Dynamic imports for heavy components
- ✅ Tree shaking (unused code removal)
- ✅ Compression (gzip + brotli)

### 2. Caching Strategy

**Static Assets** (1 year):

```
Cache-Control: public, max-age=31536000, immutable
```

**API Routes** (no cache):

```
Cache-Control: no-cache, no-store, must-revalidate
```

**Images**:

- WebP format (30% smaller)
- AVIF format (50% smaller)
- Responsive sizes
- Lazy loading

### 3. Database Performance

**Connection Pooling**:

```typescript
// Prisma automatically pools connections
// Max connections: 10 (adjust based on usage)
```

**Query Optimization**:

- Use indexes on frequently queried fields
- Limit result sets
- Use `select` to fetch only needed fields
- Implement pagination

### 4. Rate Limiting

**Limits**:

- AI Tutor: 100 requests/day per student
- Test Generator: 10 tests/day per student
- WhatsApp Bot: 10 messages/minute per user
- Global API: 1000 requests/hour per IP

**Implementation**:

```typescript
import { rateLimiter, RateLimiters } from '@/lib/api/rateLimiter'

const limit = await rateLimiter.checkLimit(RateLimiters.aiTutor(userId))

if (!limit.allowed) {
  return Response.json({ error: 'Rate limit exceeded', resetAt: limit.resetAt }, { status: 429 })
}
```

---

## Security

### 1. HTTPS & SSL

- ✅ Automatic SSL via Vercel
- ✅ HSTS header (force HTTPS)
- ✅ Redirect HTTP → HTTPS

### 2. Security Headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 3. Input Validation

```typescript
import { z } from 'zod'

const schema = z.object({
  message: z.string().min(1).max(1000),
  topic: z.enum(['cell', 'genetics', 'evolution']),
})

const validated = schema.parse(input) // Throws on invalid
```

### 4. API Authentication

**JWT Tokens**:

```typescript
import jwt from 'jsonwebtoken'

const token = jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: '7d' })
```

### 5. Secrets Management

**Never commit**:

- API keys
- Database passwords
- JWT secrets
- Webhook tokens

**Use**:

- Vercel environment variables
- GitHub secrets (for CI/CD)
- Encrypted backup files

### 6. Security Audits

**Regular Checks**:

```bash
npm audit --audit-level=high
npm audit fix
```

**Penetration Testing**:

- Test for SQL injection
- Test for XSS vulnerabilities
- Test for CSRF attacks
- Test authentication bypass

---

## Backup & Recovery

### 1. Automated Backups

**Database** (Daily at 3 AM):

```bash
npm run tsx scripts/backup-production.ts
```

**Retention Policy**:

- Daily backups: 7 days
- Weekly backups: 4 weeks
- Monthly backups: 12 months

### 2. Manual Backup

```bash
# Full backup
npm run tsx scripts/backup-production.ts

# With cloud upload
npm run tsx scripts/backup-production.ts --upload

# Clean old backups
npm run tsx scripts/backup-production.ts --clean
```

### 3. Recovery Procedure

**Database Restore**:

```bash
# 1. Download backup
# 2. Connect to database
psql $DATABASE_URL < backup.sql

# 3. Verify data integrity
npm run tsx scripts/verify-database.ts
```

**Application Rollback**:

```bash
# Via Vercel dashboard:
# 1. Go to Deployments
# 2. Find previous working deployment
# 3. Click "Promote to Production"
```

### 4. Disaster Recovery

**RTO** (Recovery Time Objective): 1 hour
**RPO** (Recovery Point Objective): 24 hours

**Steps**:

1. Identify issue via monitoring alerts
2. Roll back deployment if needed
3. Restore database from latest backup
4. Verify all services operational
5. Notify users if downtime occurred

---

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Error**: `Type errors found`

```bash
# Fix:
npm run type-check
# Fix reported errors
npm run build
```

**Error**: `Out of memory`

```bash
# Increase Node memory:
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 2. Database Connection Issues

**Error**: `Can't reach database server`

```bash
# Check connection:
npm run tsx scripts/verify-database.ts

# Verify DATABASE_URL is correct
# Check Supabase dashboard for issues
# Check IP allowlist if configured
```

#### 3. Redis Connection Issues

**Error**: `Redis connection failed`

```bash
# Check REDIS_URL is correct
# Verify Redis instance is running
# Check network connectivity
# Test with Redis CLI:
redis-cli -u $REDIS_URL ping
```

#### 4. High Error Rates

**Check**:

1. Sentry dashboard for error details
2. Vercel function logs
3. Database connection pool exhaustion
4. Rate limiting issues

#### 5. Slow Performance

**Diagnose**:

```typescript
// Check performance report
import { performanceMonitor } from '@/lib/monitoring/performance'
const report = performanceMonitor.getReport(60)
console.log(report)
```

**Common Causes**:

- Slow database queries
- Large API responses
- Unoptimized images
- Too many API calls

---

## Maintenance

### Daily Tasks

- [ ] Check health endpoint
- [ ] Review error rates in Sentry
- [ ] Monitor API usage/costs

### Weekly Tasks

- [ ] Review analytics reports
- [ ] Check backup success
- [ ] Review security logs
- [ ] Monitor disk space

### Monthly Tasks

- [ ] Security audit (`npm audit`)
- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Cost optimization analysis
- [ ] Backup restoration test

### Quarterly Tasks

- [ ] Penetration testing
- [ ] Disaster recovery drill
- [ ] API key rotation
- [ ] SSL certificate renewal check
- [ ] Capacity planning review

---

## Cost Optimization

### Expected Monthly Costs

| Service       | Plan          | Cost               |
| ------------- | ------------- | ------------------ |
| Vercel        | Pro           | $20                |
| Supabase      | Pro           | $25                |
| Upstash Redis | Pay-as-you-go | $5-10              |
| Anthropic API | Usage-based   | $50-200            |
| Sentry        | Developer     | $29                |
| **Total**     |               | **$129-284/month** |

### Cost Saving Tips

1. **AI API Optimization**:
   - Cache common responses
   - Use shorter context windows
   - Implement request deduplication

2. **Database**:
   - Use connection pooling
   - Implement query caching
   - Archive old data

3. **Vercel**:
   - Optimize bundle sizes
   - Use ISR for static content
   - Implement proper caching

4. **Redis**:
   - Set TTLs on all keys
   - Clean up unused keys
   - Use appropriate data structures

---

## Support & Contact

### Production Support

**Emergency Contact**: +91 88264 44334

**Email**: support@cerebrumbiologyacademy.com

**Escalation**:

1. On-call developer (immediate)
2. Technical lead (< 1 hour)
3. CTO (< 4 hours)

### Documentation

- **Technical Docs**: `/docs`
- **API Docs**: `/api-docs`
- **Runbooks**: `/docs/runbooks`

### External Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)

---

**Last Updated**: 2025-01-20
**Version**: 1.0.0
**Maintained by**: Cerebrum Engineering Team
