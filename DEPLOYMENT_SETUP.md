# 🚀 Production Deployment Setup Guide

**Project:** Cerebrum Biology Academy
**Deployment:** Vercel via GitHub Actions

---

## ✅ Prerequisites

- GitHub repository with code pushed
- Vercel account (https://vercel.com)
- Database (Supabase/Neon/PostgreSQL)
- All environment variables ready

---

## 📋 Step-by-Step Setup

### STEP 1: Link Vercel Project

```bash
# Install Vercel CLI
npm install -g vercel

# Link your project
vercel link

# This creates .vercel/project.json with:
# - VERCEL_ORG_ID
# - VERCEL_PROJECT_ID
```

**Save these IDs** - you'll need them for GitHub secrets!

---

### STEP 2: Get Vercel Token

1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name: `GitHub Actions - Cerebrum`
4. Expiration: No expiration (or 1 year)
5. Scope: Full Account
6. Click **"Create"**
7. **COPY THE TOKEN** (you won't see it again!)

---

### STEP 3: Configure GitHub Secrets

Go to your GitHub repository:
`https://github.com/YOUR_USERNAME/cerebrum-biology-academy-website/settings/secrets/actions`

Click **"New repository secret"** and add each of these:

#### Required Secrets:

| Secret Name           | Where to Get                             | Example/Format                                                |
| --------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| `VERCEL_TOKEN`        | Vercel → Account → Tokens                | `vercel_abc123...`                                            |
| `VERCEL_ORG_ID`       | `.vercel/project.json`                   | `team_abc123...`                                              |
| `VERCEL_PROJECT_ID`   | `.vercel/project.json`                   | `prj_abc123...`                                               |
| `DATABASE_URL`        | Supabase → Settings → Database           | `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres` |
| `NEXTAUTH_SECRET`     | Generate with: `openssl rand -base64 32` | `abc123def456...`                                             |
| `NEXTAUTH_URL`        | Your production domain                   | `https://cerebrumbiologyacademy.com`                          |
| `ADMIN_EMAIL`         | From `.env.local`                        | `admin@cerebrumbiologyacademy.com`                            |
| `ADMIN_PASSWORD_HASH` | From `.env.local`                        | `$2a$12$LQv3c1yqBwkVsvDqjrOuW...`                             |

#### Optional Secrets (for full functionality):

| Secret Name             | Where to Get                    |
| ----------------------- | ------------------------------- |
| `BLOB_READ_WRITE_TOKEN` | Vercel → Storage → Blob         |
| `OPENAI_API_KEY`        | OpenAI Dashboard                |
| `ANTHROPIC_API_KEY`     | Anthropic Console               |
| `RAZORPAY_KEY_ID`       | Razorpay Dashboard (production) |
| `RAZORPAY_KEY_SECRET`   | Razorpay Dashboard (production) |
| `WHATSAPP_ACCESS_TOKEN` | Meta Business Suite             |
| `GOOGLE_AI_API_KEY`     | Google Cloud Console            |

---

### STEP 4: Configure Vercel Environment Variables

Also add these in Vercel Dashboard:
`https://vercel.com/YOUR_PROJECT/settings/environment-variables`

**Why both?**

- GitHub secrets: Used during deployment
- Vercel env vars: Used at runtime

Copy the same values from Step 3 to Vercel.

---

### STEP 5: Test Deployment

#### Option A: Manual Trigger

1. Go to: `https://github.com/YOUR_USERNAME/cerebrum-biology-academy-website/actions`
2. Click **"🚀 Cerebrum Biology Academy - Production Deployment"**
3. Click **"Run workflow"**
4. Select environment: `preview` (for testing)
5. Click **"Run workflow"**

#### Option B: Push to Main

```bash
git add .
git commit -m "feat: setup production deployment"
git push origin main
```

The workflow will automatically trigger!

---

## 🔍 Monitoring Deployment

### Watch GitHub Actions

1. Go to: Actions tab in GitHub
2. Click on the running workflow
3. Watch each step complete:
   - ✅ Code Quality Checks
   - ✅ Build Test
   - ✅ Database Check
   - ✅ Deploy to Vercel
   - ✅ Health Check

### Check Vercel Dashboard

1. Go to: Vercel Dashboard
2. See deployment progress
3. View logs if needed

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Visit your production URL
- [ ] Test admin login
- [ ] Check all main pages load
- [ ] Verify database connection (create a test user)
- [ ] Test payment flow (if configured)
- [ ] Check LMS upload (if configured)
- [ ] Test WhatsApp notifications (if configured)
- [ ] Verify Google Analytics tracking
- [ ] Test on mobile devices
- [ ] Check SSL certificate

---

## 🐛 Troubleshooting

### Deployment fails at "Build Test"

**Check:**

- All required secrets are set
- DATABASE_URL is correct
- No syntax errors in code

**Fix:**

```bash
# Test build locally first
npm run build
```

### Deployment succeeds but site shows error

**Check:**

- Vercel environment variables are set
- Database is accessible from Vercel
- Check Vercel logs for errors

**Fix:**

- Go to Vercel → Deployments → Click failed deployment → View Logs

### Database migration fails

**Check:**

- DATABASE_URL has correct permissions
- Prisma schema is valid

**Fix:**

```bash
# Test migration locally
npx prisma migrate deploy
```

---

## 🔄 Updating Environment Variables

### To update secrets:

**GitHub:**

1. Go to repo → Settings → Secrets and variables → Actions
2. Click on secret name
3. Update value

**Vercel:**

1. Go to project → Settings → Environment Variables
2. Click edit icon
3. Update value
4. Redeploy

---

## 🎯 Deployment Workflow

```
Push to main
    ↓
GitHub Actions Triggered
    ↓
Code Quality Checks (ESLint, TypeScript)
    ↓
Build Test (npm run build)
    ↓
Database Check (Prisma validation)
    ↓
Deploy to Vercel
    ↓
Health Check (Test URLs)
    ↓
Database Migration (if production)
    ↓
Notification (Success/Failure)
```

---

## 📝 Quick Commands

```bash
# Get Vercel IDs
vercel link

# Generate NextAuth secret
openssl rand -base64 32

# Test build locally
npm run build

# Check Prisma schema
npx prisma validate

# Test database connection
npx prisma db push --skip-generate

# View deployments
vercel list

# View logs
vercel logs YOUR_DEPLOYMENT_URL
```

---

## 🚀 Production Checklist

Before going live:

- [ ] All secrets configured in GitHub
- [ ] All environment variables in Vercel
- [ ] Database migrated successfully
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Admin authentication working
- [ ] Payment gateway in production mode
- [ ] Google Analytics configured
- [ ] Error tracking setup (Sentry)
- [ ] Backups configured
- [ ] Monitoring alerts setup

---

**Status:** Workflow configured ✅
**Next Step:** Configure GitHub secrets and test deployment
**Documentation:** See workflow file in `.github/workflows/production-deployment.yml`
