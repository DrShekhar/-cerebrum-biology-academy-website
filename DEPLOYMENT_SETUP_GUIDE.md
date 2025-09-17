# 🚀 Continuous Deployment Setup Guide

## 🎯 Purpose

This guide ensures your work is **NEVER LOST** again by setting up automated deployment from GitHub to Vercel.

## ⚡ Quick Start (1-2 minutes)

### Step 1: Get Vercel Information

1. Go to https://vercel.com/dashboard
2. Click on your `cerebrum-biology-academy-website` project
3. Go to **Settings** → **General**
4. Copy these values:

```
Project ID: prj_HrqhTPtRvYA9VmxqcqqjkznaBZ7O (already configured)
Team/Org ID: team_FxVj0KASvdUa6pdoYXjdgFtS (already configured)
```

### Step 2: Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **Create Token**
3. Name it: `GitHub Actions Deployment`
4. Set expiration: `No Expiration` (recommended)
5. Copy the token (starts with `vercel_`)

### Step 3: Add GitHub Secrets

1. Go to https://github.com/DrShekhar/-cerebrum-biology-academy-website/settings/secrets/actions
2. Click **New repository secret** and add these:

```
Name: VERCEL_TOKEN
Value: [your token from step 2]

Name: VERCEL_ORG_ID
Value: team_FxVj0KASvdUa6pdoYXjdgFtS

Name: VERCEL_PROJECT_ID
Value: prj_HrqhTPtRvYA9VmxqcqqjkznaBZ7O
```

## 🚀 Quick Commands Reference

```bash
# Save and deploy everything
./scripts/auto-deploy.sh

# Create backup first
node scripts/backup-and-verify.js

# Emergency save
git add . && git commit -m "🚨 Save" && git push

# Check deployment
curl -s https://cerebrum-biology-academy-website.vercel.app | grep -q "Cerebrum" && echo "✅ Site working"
```

**🔥 Your work is now bulletproof! 🔥**
