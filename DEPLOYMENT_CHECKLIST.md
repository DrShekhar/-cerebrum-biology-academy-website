# Production Deployment Checklist

**Cerebrum Biology Academy - Final Deployment Steps**

## Pre-Deployment (Do Once)

### 1. External Services Setup

- [ ] **Supabase PostgreSQL Database**
  - Create project at [supabase.com](https://supabase.com)
  - Project name: `cerebrum-biology-academy-prod`
  - Copy `DATABASE_URL` from Settings → Database
  - Run migrations: `npx prisma migrate deploy`

- [ ] **Upstash Redis** (Rate Limiting)
  - Create database at [upstash.com](https://upstash.com)
  - Name: `cerebrum-rate-limiter`
  - Region: Singapore (sin1)
  - Copy `REDIS_URL` (TLS connection string)

- [ ] **Vercel Blob Storage** (File Uploads)
  - Go to Vercel Dashboard → Storage → Create Blob Store
  - Name: `cerebrum-uploads`
  - Copy `BLOB_READ_WRITE_TOKEN`

- [ ] **Google Analytics 4**
  - Create GA4 property at [analytics.google.com](https://analytics.google.com)
  - Property name: `Cerebrum Biology Academy`
  - Copy `NEXT_PUBLIC_GA_MEASUREMENT_ID` (format: G-XXXXXXXXXX)

- [ ] **Sentry Error Tracking** (Optional but Recommended)
  - Create project at [sentry.io](https://sentry.io)
  - Project name: `cerebrum-biology-academy`
  - Copy `NEXT_PUBLIC_SENTRY_DSN`

### 2. Environment Variables Configuration

- [ ] Copy all required variables from `.env.local` to Vercel Dashboard
- [ ] Go to: Vercel Dashboard → Settings → Environment Variables
- [ ] Ensure production keys are used (not test/dev keys)
- [ ] Validate with: `npm run env:validate`

### 3. Domain Configuration

- [ ] Add custom domain in Vercel: `cerebrumbiologyacademy.com`
- [ ] Configure DNS records (A/CNAME)
- [ ] Wait for SSL certificate (automatic)
- [ ] Verify HTTPS works

---

## Deployment Process

### Option 1: Automatic (Recommended)

```bash
# 1. Commit all changes
git add .
git commit -m "feat: add production deployment infrastructure"

# 2. Push to main branch
git push origin main

# 3. Vercel auto-deploys from GitHub
```

### Option 2: Manual with Validation

```bash
# 1. Run pre-deployment checks
npm run deploy:pre-check

# 2. If all checks pass, deploy
npm run deploy:production

# This command will:
# - Run all pre-checks
# - Deploy to Vercel
# - Run post-deployment validation
```

### Option 3: Vercel CLI

```bash
# Deploy directly
vercel deploy --prod

# Then validate
npm run deploy:post-validate https://cerebrumbiologyacademy.com
```

---

## Post-Deployment Verification

### 1. Health Check

```bash
curl https://cerebrumbiologyacademy.com/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "services": {
    "database": { "status": "up" },
    "redis": { "status": "up" },
    "anthropicAI": { "status": "up" },
    "whatsapp": { "status": "up" }
  }
}
```

### 2. Test All Features

- [ ] **Homepage loads** - Visit https://cerebrumbiologyacademy.com
- [ ] **AI Tutor Chat** - Test chat interface
- [ ] **Test Generator** - Generate a test
- [ ] **WhatsApp Bot** - Send test message
- [ ] **Database queries** - Check data loading

### 3. Monitor Logs

- [ ] Check Vercel Dashboard → Logs
- [ ] No critical errors
- [ ] Response times < 500ms average
- [ ] Memory usage < 80%

### 4. Analytics Verification

- [ ] Google Analytics receiving events
- [ ] Sentry error tracking active
- [ ] Custom analytics working

---

## Daily Monitoring

### Quick Health Check

```bash
# Option 1: Browser
open https://cerebrumbiologyacademy.com/api/health

# Option 2: CLI
curl https://cerebrumbiologyacademy.com/api/health | jq
```

### Check Metrics

- **Uptime**: Should be > 99.9%
- **Error Rate**: Should be < 1%
- **Response Time**: Should be < 500ms average
- **Memory Usage**: Should be < 80%

### Dashboards

1. **Vercel Dashboard**: https://vercel.com/your-team/cerebrum-biology-academy
2. **Google Analytics**: https://analytics.google.com
3. **Sentry**: https://sentry.io (if configured)
4. **Upstash Redis**: https://console.upstash.com

---

## Backup Schedule

### Automated Backups

- **Daily at 3 AM**: Database backup
- **Daily at 3:15 AM**: Configuration backup
- **Weekly on Sunday**: Full system backup

### Manual Backup

```bash
# Create backup
npm run backup:create

# Upload to cloud (when implemented)
npm run backup:upload

# Clean old backups (7+ days)
npm run backup:clean
```

---

## Troubleshooting

### Build Failures

```bash
# Check TypeScript errors
npm run type-check

# Fix lint issues
npm run lint:fix

# Clean and rebuild
npm run clean
npm run build
```

### High Error Rates

1. Check Sentry dashboard for error details
2. Review Vercel function logs
3. Check database connection
4. Verify environment variables

### Slow Performance

1. Check performance report:
   ```typescript
   import { performanceMonitor } from '@/lib/monitoring/performance'
   const report = performanceMonitor.getReport(60)
   ```
2. Identify slow endpoints
3. Optimize database queries
4. Check AI API response times

### Database Issues

```bash
# Verify connection
npm run tsx scripts/verify-database.ts

# Run migrations
npx prisma migrate deploy

# Check Supabase dashboard
```

### Redis Issues

```bash
# Test connection
redis-cli -u $REDIS_URL ping

# Check Upstash dashboard
# Verify REDIS_ENABLED=true
```

---

## Rollback Procedure

If deployment causes issues:

### Option 1: Vercel Dashboard

1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Option 2: Git Revert

```bash
git revert HEAD
git push origin main
```

---

## Performance Targets

- ✅ **Initial Page Load**: < 2 seconds
- ✅ **Time to Interactive**: < 3 seconds
- ✅ **Largest Contentful Paint**: < 2.5 seconds
- ✅ **API Response Time**: < 500ms average
- ✅ **Database Query Time**: < 100ms average
- ✅ **AI Response Time**: < 5 seconds

---

## Security Checklist

- [ ] HTTPS enabled (automatic via Vercel)
- [ ] All secrets in environment variables (not in code)
- [ ] Rate limiting active
- [ ] Input validation working
- [ ] SQL injection protection (Prisma ORM)
- [ ] XSS protection headers set
- [ ] CORS configured correctly
- [ ] Authentication working

---

## Cost Monitoring

### Expected Monthly Costs

| Service              | Cost               |
| -------------------- | ------------------ |
| Vercel Pro           | $20                |
| Supabase Pro         | $25                |
| Upstash Redis        | $5-10              |
| Anthropic Claude API | $50-200            |
| Sentry (optional)    | $29                |
| **Total**            | **$100-284/month** |

### Cost Optimization

- Monitor AI API usage daily
- Set up usage alerts in Anthropic dashboard
- Optimize database queries
- Use Redis caching effectively
- Clean up old data regularly

---

## Support Contacts

### Technical Issues

- **Email**: support@cerebrumbiologyacademy.com
- **Phone**: +91 88264 44334
- **Documentation**: `/PRODUCTION_DEPLOYMENT.md`

### Service Status Pages

- **Vercel**: https://www.vercel-status.com
- **Supabase**: https://status.supabase.com
- **Upstash**: https://status.upstash.com
- **Anthropic**: https://status.anthropic.com

---

## Next Steps After Deployment

1. **Set up monitoring alerts**
   - Configure Sentry alerts for error rate > 1%
   - Set up Vercel alerts for downtime
   - Create Google Analytics reports

2. **Schedule regular maintenance**
   - Weekly: Review analytics
   - Monthly: Security audit
   - Quarterly: Performance optimization

3. **Document any issues**
   - Create runbook for common problems
   - Update troubleshooting guide
   - Share learnings with team

4. **Plan scaling**
   - Monitor user growth
   - Plan database scaling
   - Consider CDN optimization

---

**Status**: ✅ Ready for Production Deployment

**Last Updated**: 2025-01-20

**Deployment Date**: ********\_********

**Deployed By**: ********\_********

**Verified By**: ********\_********
