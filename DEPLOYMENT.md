# Deployment Workflow Guide

## 🚀 Standard Deployment Process

### Daily Development Workflow

```bash
# 1. Make sure you're on staging branch
git checkout staging

# 2. Make your changes and commit
git add .
git commit -m "feat: your feature description"

# 3. Push to staging (triggers Vercel preview)
git push origin staging
# ✅ Vercel will create a preview deployment automatically
```

### Weekly Production Deployment

**Schedule: Tuesday 9 PM IST**

#### Pre-Deployment Checklist

```bash
# 1. Run all quality checks
npm run type-check
npm run lint  
npm run build

# 2. If all pass, proceed to deployment
```

#### Deployment Steps

```bash
# Step 1: Switch to main branch
git checkout main

# Step 2: Pull latest from remote (safety check)
git pull origin main

# Step 3: Merge staging into main
git merge staging

# Step 4: Push to production (triggers Vercel production deploy)
git push origin main

# Step 5: Switch back to staging for continued work
git checkout staging
```

#### Post-Deployment Monitoring (First 15 minutes)

- [ ] Check Vercel deployment status: https://vercel.com/dashboard
- [ ] Visit live site: https://cerebrumbiologyacademy.com
- [ ] Test critical pages:
  - [ ] Homepage loads correctly
  - [ ] Blog posts display properly
  - [ ] Course pages working
  - [ ] Enrollment flow functional
- [ ] Monitor Vercel Analytics for errors
- [ ] Check Google Analytics real-time traffic
- [ ] Review Sentry for any new errors

---

## 🆘 Emergency Rollback (If Something Breaks)

### Option 1: Instant Rollback via Vercel Dashboard
1. Go to Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click "Promote to Production"
4. Takes ~10 seconds

### Option 2: Git Revert
```bash
# Find the commit to revert to
git log --oneline -10

# Revert to previous commit
git revert HEAD
git push origin main
```

---

## 📊 Deployment Log Template

After each deployment, update this log:

### Feb 10, 2026 - 9:00 PM IST ✅
**Changes:**
- Blog SEO optimization (109 fields)
- Image improvements (90 SVGs)
- Quality score: 99.3/100

**Impact:** Zero downtime, 2 min deploy  
**Status:** Success  
**Issues:** None

---

## 🎯 Branch Strategy

| Branch | Purpose | Deploy To | When to Use |
|--------|---------|-----------|-------------|
| `main` | Production code | Live site | Tuesday 9 PM IST |
| `staging` | Development & testing | Preview URL | Daily development |

---

## ⚠️ Important Rules

1. **NEVER** commit directly to `main` - always work on `staging`
2. **ALWAYS** test on Vercel preview before merging to main
3. **DEPLOY** only on Tuesday/Thursday evenings (low traffic)
4. **MONITOR** for 15 minutes after every production deploy
5. **DOCUMENT** every deployment in this file

---

## 🔧 Quick Commands Reference

```bash
# Check which branch you're on
git branch

# Switch to staging for development
git checkout staging

# Switch to main for deployment
git checkout main

# See what changed since last deploy
git diff main..staging

# Preview what will be merged
git log main..staging --oneline
```

---

## 📝 Next Deployment Checklist

**Tuesday, Feb 11, 2026 - 9:00 PM IST**

**Planned Changes:**
- [ ] (List changes accumulated on staging)

**Pre-Deploy:**
- [ ] Run `npm run type-check`
- [ ] Run `npm run lint`
- [ ] Run `npm run build`
- [ ] Test Vercel preview deployment
- [ ] Review all changes: `git diff main..staging`

**Deploy:**
- [ ] `git checkout main`
- [ ] `git merge staging`
- [ ] `git push origin main`

**Post-Deploy:**
- [ ] Monitor Vercel analytics (15 min)
- [ ] Test critical user flows
- [ ] Check error logs
- [ ] Update deployment log below

---

## 📅 Deployment History

### Upcoming
- **Next Deploy:** Tuesday, Feb 11, 2026 at 9:00 PM IST

### Past Deployments
- **Feb 10, 2026:** Blog quality improvements, SEO optimization (99.3/100 score)
- **Feb 9, 2026:** Blog image optimization (90 SVG images created)
