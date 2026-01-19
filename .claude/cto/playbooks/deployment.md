# Deployment Playbook

Standard process for deploying changes to Cerebrum Biology Academy.

---

## 🌍 Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| **Local** | localhost:3000 | Development |
| **Preview** | *.vercel.app | PR previews |
| **Production** | cerebrumbiologyacademy.com | Live site |

---

## 🚀 Deployment Flow

```
Local Development
       │
       ▼
   Push to Branch
       │
       ▼
  Create Pull Request ──────────┐
       │                        │
       ▼                        ▼
 Preview Deployment        Code Review
       │                        │
       └────────────────────────┘
                  │
                  ▼
           Merge to Main
                  │
                  ▼
      Auto-Deploy to Production
                  │
                  ▼
         Monitor & Verify
```

---

## ✅ Pre-Deployment Checklist

### Code Quality
```
□ All TypeScript errors resolved (or suppressed intentionally)
□ ESLint passes (npm run lint)
□ Tests pass (npm run test)
□ No console.log in production code
□ No hardcoded secrets
```

### Build Verification
```
□ Local build succeeds (npm run build)
□ No new build warnings
□ Bundle size not significantly increased
□ Preview deployment works correctly
```

### Testing
```
□ Feature works in preview environment
□ Critical paths tested manually
□ Mobile responsive checked
□ Cross-browser tested (Chrome, Safari, Firefox)
```

### Database
```
□ Migrations applied (if any)
□ No breaking schema changes without migration
□ Seed data updated (if needed)
□ Database backups verified
```

---

## 🔄 Deployment Steps

### Standard Deployment (via PR)

1. **Create PR**
   ```bash
   git checkout -b feature/your-feature
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature
   ```

2. **Wait for Preview**
   - Vercel automatically creates preview deployment
   - URL appears in PR comments

3. **Test Preview**
   - Verify feature works in preview
   - Check for any errors in Vercel logs

4. **Get Review**
   - Request code review
   - Address feedback

5. **Merge**
   - Merge to main after approval
   - Vercel auto-deploys to production

6. **Monitor**
   - Watch Vercel dashboard for build success
   - Check Sentry for new errors
   - Verify feature in production

### Emergency Hotfix

```bash
# Create hotfix branch from main
git checkout main
git pull
git checkout -b hotfix/critical-fix

# Make fix
git add .
git commit -m "fix: critical bug"

# Push and create PR with expedited review
git push origin hotfix/critical-fix

# After merge, verify immediately
```

---

## 🔒 Environment Variables

### Required for Production

| Variable | Purpose | Source |
|----------|---------|--------|
| `DATABASE_URL` | Supabase connection | Supabase dashboard |
| `DIRECT_DATABASE_URL` | Direct connection (migrations) | Supabase dashboard |
| `NEXTAUTH_SECRET` | Auth encryption | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Auth callback URL | Your domain |
| `FIREBASE_*` | Firebase auth | Firebase console |
| `RAZORPAY_*` | Payments | Razorpay dashboard |
| `SENTRY_*` | Error tracking | Sentry dashboard |

### Adding/Updating Variables

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add variable for appropriate environments
3. **Trigger redeploy** for changes to take effect

```bash
# Force redeploy via CLI
vercel --prod
```

---

## 📊 Monitoring Post-Deploy

### Immediate (0-15 minutes)

```
□ Build succeeded in Vercel dashboard
□ Site loads correctly
□ No new errors in Sentry
□ Key pages accessible (home, courses, blog)
□ Auth flow works
□ Payment flow works (if changed)
```

### Short-term (1-24 hours)

```
□ Error rate stable or decreasing
□ Performance metrics normal
□ No user complaints
□ Analytics showing normal traffic
```

### Ongoing

```
□ Weekly error review in Sentry
□ Monthly performance audit
□ Quarterly dependency updates
```

---

## 🚨 Rollback Procedure

### If Deployment Fails Build

Vercel keeps previous deployment active. No action needed.

### If Production Issues Found

**Option 1: Revert via Vercel (Fastest)**
1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

**Option 2: Revert via Git**
```bash
# Revert the merge commit
git checkout main
git revert HEAD
git push origin main
# This triggers new deployment with reverted code
```

**Option 3: Hotfix Forward**
```bash
# Quick fix and deploy
git checkout -b hotfix/revert-breaking-change
# Make minimal fix
git push origin hotfix/revert-breaking-change
# Create PR and merge immediately
```

---

## 🗃️ Database Migrations

### Running Migrations

```bash
# Generate migration from schema changes
npx prisma migrate dev --name your_migration_name

# Apply to production (careful!)
npx prisma migrate deploy
```

### Migration Best Practices

1. **Always test locally first**
2. **Backup database before production migration**
3. **Deploy code first if backward-compatible**
4. **Run migration during low-traffic period**
5. **Have rollback SQL ready**

### Breaking Changes

For breaking schema changes:

1. Deploy new code that handles both old and new schema
2. Run migration
3. Deploy code that only uses new schema
4. Clean up old code paths

---

## 📝 Deployment Log Template

```markdown
## Deployment: [Date] [Time]

### Changes
- [List of changes deployed]

### Environment Variables Changed
- [Any env vars added/updated]

### Database Changes
- [Any migrations run]

### Testing Done
- [What was tested]

### Monitored Until
- [Time monitoring ended]

### Issues Found
- [Any issues and resolutions]

### Deployed By
- [Your name]
```

---

## ⚡ Quick Commands

```bash
# Check deployment status
vercel ls

# View production logs
vercel logs cerebrumbiologyacademy.com --follow

# Force redeploy
vercel --prod

# Rollback to previous
# (Use Vercel dashboard - safer)

# Check environment variables
vercel env ls

# Pull environment variables locally
vercel env pull .env.local
```

---

## 🎯 Deployment Schedule

### Best Times to Deploy
- **Weekdays**: 10am-12pm IST (low traffic)
- **Avoid**: Evenings 6pm-10pm (peak study time)
- **Avoid**: Weekends (exam prep peak)
- **Avoid**: Exam season (April-May)

### High-Risk Deployments
Schedule extra carefully:
- Payment system changes
- Auth system changes
- Database schema changes
- Major UI redesigns
