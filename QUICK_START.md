# 🚀 Quick Start: Staging Workflow

## You're All Set! Here's What Changed:

### ✅ What Was Created:
1. **`staging` branch** - Your new development branch
2. **`DEPLOYMENT.md`** - Complete deployment guide
3. **`scripts/pre-deploy-check.sh`** - Automated safety checks
4. **`scripts/deploy-to-production.sh`** - One-click deployment
5. **GitHub PR template** - Deployment review checklist

---

## 📖 Daily Workflow (Starting NOW)

### ✨ You're currently on: `staging` branch

```bash
# Work normally - make changes, test locally
npm run dev

# Commit your changes
git add .
git commit -m "feat: your change description"

# Push to staging (creates Vercel preview)
git push origin staging
```

**✅ Vercel will automatically create a preview URL for testing!**

---

## 🚀 Weekly Deployment (Tuesday 9 PM IST)

### Simple Method (One Command):
```bash
./scripts/deploy-to-production.sh
```

**That's it!** The script will:
- ✅ Run all safety checks (TypeScript, lint, build)
- ✅ Show you what will be deployed
- ✅ Ask for confirmation
- ✅ Deploy to production
- ✅ Switch you back to staging

### Manual Method (If You Prefer):
```bash
# 1. Run checks
./scripts/pre-deploy-check.sh

# 2. Deploy
git checkout main
git merge staging
git push origin main
git checkout staging
```

---

## 🔍 Checking What Will Deploy

```bash
# See all changes since last deployment
git diff main..staging

# See commit list
git log main..staging --oneline
```

---

## 🆘 Emergency Rollback

If something breaks in production:

**Option 1: Vercel Dashboard (Fastest - 10 seconds)**
1. Go to: https://vercel.com/dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "Promote to Production"

**Option 2: Git Revert**
```bash
git checkout main
git revert HEAD
git push origin main
```

---

## ⚡ Pro Tips

### Check Current Branch:
```bash
git branch
# * staging  ← Green star = current branch
```

### See Vercel Preview URL:
After pushing to staging, check your terminal or GitHub for the preview URL.

### Before Every Deploy:
Read `DEPLOYMENT.md` for the complete checklist.

---

## 📅 Your Next Deployment

**Date:** Tuesday, Feb 11, 2026  
**Time:** 9:00 PM IST  
**What:** Blog quality improvements currently on staging

**Before deploying:**
1. Test the Vercel preview URL thoroughly
2. Run `./scripts/pre-deploy-check.sh`
3. Review changes: `git log main..staging --oneline`
4. Deploy: `./scripts/deploy-to-production.sh`

---

## 🎯 Important Rules

1. ✅ **Always work on `staging` branch**
2. ✅ **Deploy only on Tuesday/Thursday evenings**
3. ✅ **Test Vercel preview before merging to main**
4. ✅ **Monitor for 15 minutes after deployment**
5. ✅ **Update DEPLOYMENT.md after each deploy**

---

## 📞 Need Help?

Check these files:
- `DEPLOYMENT.md` - Complete workflow guide
- `scripts/pre-deploy-check.sh` - What checks run before deploy
- `scripts/deploy-to-production.sh` - Deployment automation

---

**🎉 You're ready to go!** Start developing on the `staging` branch now.
