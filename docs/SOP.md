# Standard Operating Procedures (SOP)

**Project**: Cerebrum Biology Academy Website
**Last Updated**: October 21, 2025
**Status**: Production - Live and Operational

---

## 🚨 CRITICAL LESSONS LEARNED - DEPLOYMENT FAILURES

This document contains hard-won lessons from production deployment failures. **READ THIS BEFORE MAKING ANY DEPLOYMENT CHANGES.**

---

## 1. HUSKY GIT HOOKS - MAJOR PITFALL ⚠️

### Problem Encountered:

- **Date**: October 21, 2025
- **Impact**: Complete Vercel deployment failure
- **Error**: `TypeError: require(...).install is not a function`

### Root Cause:

Husky v9.1.7 **removed** the `.install()` API that was previously used in the `prepare` script. The prepare script runs during `npm install` BEFORE dependencies are installed, causing failures in CI/CD environments.

### ❌ WHAT DOESN'T WORK:

```json
// package.json - BROKEN APPROACHES
{
  "scripts": {
    "prepare": "husky install", // ❌ Husky command not found during npm install
    "prepare": "husky || true", // ❌ Still fails in CI
    "prepare": "node -e \"try { require('husky').install() } catch (e) { }\"" // ❌ .install() doesn't exist in v9
  }
}
```

### ✅ WORKING SOLUTION:

```json
// package.json - CORRECT APPROACH
{
  "scripts": {
    "postinstall": "prisma generate",
    // NO prepare script - husky works from .husky/ directory automatically
    "dev": "next dev",
    "build": "next build"
  }
}
```

### Why This Works:

1. **Husky v9+ doesn't need a prepare script** - it auto-detects from `.husky/` directory
2. **Vercel doesn't need Git hooks** - they're only for local development
3. **Removing prepare script eliminates CI/CD failures**
4. **Local Git hooks still work** from `.husky/` directory

### Prevention:

- ✅ Keep `.husky/` in `.vercelignore`
- ✅ Never add prepare scripts for Husky in projects using Husky v9+
- ✅ If you must have a prepare script, verify it works in CI environments first

---

## 2. VERCEL DEPLOYMENT CONFIGURATION

### Critical Settings:

#### vercel.json - Minimal Configuration

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "regions": ["sin1"]
}
```

### ❌ AVOID:

```json
{
  "installCommand": "npm install --ignore-scripts", // ❌ Prevents postinstall from running
  "buildCommand": "npx prisma generate && npm run build" // ❌ Redundant if postinstall exists
}
```

### Why:

- `--ignore-scripts` flag **prevents postinstall scripts** including Prisma generation
- Vercel's default `npm install` is optimized - don't override unless absolutely necessary
- Use `postinstall` in package.json instead of custom build commands

---

## 3. PRISMA CLIENT GENERATION

### ✅ CORRECT APPROACH:

```json
// package.json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Benefits:

- ✅ Runs automatically after `npm install` everywhere (local, CI, Vercel)
- ✅ No custom Vercel buildCommand needed
- ✅ Works with Vercel's optimized install process

### GitHub Actions Configuration:

```yaml
- name: 📋 Install dependencies
  run: npm ci --legacy-peer-deps --ignore-scripts # Skip prepare script

- name: 🔧 Generate Prisma Client
  run: npx prisma generate # Explicit generation
  env:
    DATABASE_URL: postgresql://placeholder
```

---

## 4. NEXT.JS SSR ERRORS - BAILOUT_TO_CLIENT_SIDE_RENDERING

### Problem Encountered:

- **Error**: `<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>`
- **Impact**: Website showing perpetual loading screen

### Root Cause:

Client components (with `'use client'` directive) were placed in the `<head>` tag, which is server-rendered. React cannot hydrate client components in the head.

### ✅ SOLUTION:

```typescript
// src/app/layout.tsx - CORRECT
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />  {/* ✅ Server component only */}
      </head>
      <body>
        <GoogleAnalytics />  {/* ✅ Client component in body */}
        {children}
      </body>
    </html>
  )
}
```

### Rules:

1. ✅ **Only server components** in `<head>` tag
2. ✅ **Client components** (with `'use client'`) go in `<body>`
3. ✅ Use `export const dynamic = 'force-dynamic'` for pages using `useSearchParams()`

---

## 5. VERCEL AUTO-DEPLOYMENT ISSUES

### Problem:

Vercel stopped auto-deploying new commits from Git.

### Root Causes Found:

1. **Dashboard Override**: Vercel dashboard "Build & Development Settings" has Override toggle that can disable Git integration
2. **Failed Builds Cache**: Previous failed deployments can block new ones
3. **Ignored Build Step**: Custom ignore configuration may prevent deployments

### ✅ MANUAL DEPLOYMENT TRIGGER:

```bash
# Force deployment via Vercel CLI
vercel --prod --yes
```

### Dashboard Checks:

1. **Git Settings** (Settings → Git):
   - Verify GitHub repository is connected
   - Ensure "Production Branch" is set to `main`
   - Check "Auto Deployments" is enabled

2. **Build Settings** (Settings → Build & Development Settings):
   - Override toggle should be **OFF** (use vercel.json)
   - Framework Preset: Next.js
   - No custom "Ignored Build Step"

3. **Clear Cache**: In deployment logs, use "Redeploy" with "Clear cache" option

---

## 6. FILE STRUCTURE REQUIREMENTS

### .vercelignore

```
.husky/          # Don't upload Git hooks to Vercel
node_modules/    # Already ignored by default
.env.local       # Local environment files
```

### Why:

- Husky files aren't needed on Vercel and can cause confusion
- Reduces upload size and deployment time

---

## 7. GITHUB ACTIONS WORKFLOW

### Best Practices:

```yaml
# .github/workflows/mvp-build.yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps --ignore-scripts # Skip prepare

      - name: Generate Prisma Client
        run: npx prisma generate # Explicit generation
        env:
          DATABASE_URL: postgresql://placeholder

      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://cerebrumbiologyacademy.com
          DATABASE_URL: postgresql://placeholder
```

### Key Points:

- ✅ Use `npm ci` for consistent installs
- ✅ Use `--ignore-scripts` to skip problematic prepare scripts
- ✅ Generate Prisma Client explicitly
- ✅ Provide placeholder env vars for build-time validation

---

## 8. DEBUGGING DEPLOYMENT FAILURES

### Step-by-Step Troubleshooting:

#### 1. Check Local Build

```bash
npm run build
# If this fails, fix locally first before deploying
```

#### 2. Check GitHub Actions

```bash
gh run list --limit 3
# Verify GitHub Actions passes before investigating Vercel
```

#### 3. Check Vercel Deployment Logs

```bash
vercel ls  # List recent deployments
vercel inspect <deployment-url> --logs  # View detailed logs
```

#### 4. Common Error Patterns:

- **"husky: command not found"** → Remove prepare script
- **"Module not found: '@prisma/client'"** → Ensure postinstall runs
- **"BAILOUT_TO_CLIENT_SIDE_RENDERING"** → Move client components from <head>
- **"require(...).install is not a function"** → Husky v9 API change, remove prepare

#### 5. Manual Deployment

```bash
# If auto-deploy broken, deploy manually
vercel --prod --yes

# Check production
curl -sL https://cerebrumbiologyacademy.com | grep -E "(BAILOUT|title>)"
```

---

## 9. PREVENTIVE MEASURES

### Before Making Changes:

1. ✅ **Test locally first**: `npm run build` must succeed
2. ✅ **Check GitHub Actions**: Ensure workflow passes
3. ✅ **Read this SOP**: Don't repeat known mistakes
4. ✅ **Small commits**: Deploy incrementally, not all at once
5. ✅ **Monitor deployments**: Use `vercel ls` to verify

### After Deployment:

1. ✅ **Verify production**: Test https://cerebrumbiologyacademy.com
2. ✅ **Check for errors**: Look for SSR bailout or console errors
3. ✅ **Monitor performance**: Ensure site loads quickly
4. ✅ **Document issues**: Update this SOP if new issues found

---

## 10. DEPENDENCY MANAGEMENT

### package.json Scripts - CURRENT WORKING STATE:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### Dependency Version Notes:

- **Husky**: v9.1.7 (no prepare script needed)
- **Next.js**: 15.5.3 (App Router, RSC)
- **Prisma**: v6.16.2 (auto-generates from postinstall)
- **React**: 19.1.0 (strict hydration checking)

### Upgrading Dependencies:

1. ✅ **Check changelogs** for breaking changes
2. ✅ **Test in feature branch** before merging to main
3. ✅ **Update this SOP** if new patterns required
4. ✅ **Verify Vercel deployment** after upgrade

---

## 11. ROLLBACK PROCEDURE

### If Deployment Fails:

#### Option 1: Revert via Vercel Dashboard

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

#### Option 2: Git Revert

```bash
git revert HEAD
git push origin main
# Vercel will auto-deploy the reverted commit
```

#### Option 3: Manual Redeploy Previous Commit

```bash
git log --oneline | head -5  # Find working commit
git checkout <commit-hash>
vercel --prod --yes
git checkout main
```

---

## 12. COMMIT GUIDELINES

### Commit Message Format:

```
type(scope): brief description

Detailed explanation of what changed and why.

Fixes: #issue-number
Testing: How this was tested
```

### Types:

- `fix`: Bug fixes
- `feat`: New features
- `chore`: Maintenance (dependencies, config)
- `docs`: Documentation updates
- `refactor`: Code restructuring
- `test`: Test additions/changes

### Example:

```
fix(husky): Remove broken prepare script for Husky v9

ISSUE:
Vercel deployment failing with "TypeError: require(...).install is not a function"

SOLUTION:
- Removed prepare script entirely
- Husky v9+ works from .husky/ directory automatically
- Kept postinstall for Prisma Client generation

Testing:
- GitHub Actions: Passing
- Local build: Working
- Vercel deployment: Successful
```

---

## 13. ENVIRONMENT VARIABLES

### Required for Build:

```env
# .env (for Vercel)
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=https://cerebrumbiologyacademy.com
```

### Placeholder Values for CI:

```yaml
# GitHub Actions
DATABASE_URL: postgresql://placeholder
OPENAI_API_KEY: placeholder-build-only
```

### Security:

- ✅ **Never commit** `.env.local` or `.env.production`
- ✅ **Use Vercel dashboard** to set production env vars
- ✅ **Use GitHub Secrets** for CI/CD env vars
- ✅ **Rotate secrets** if accidentally exposed

---

## 14. MONITORING & ALERTS

### Production Health Checks:

```bash
# Check if site is up
curl -sL https://cerebrumbiologyacademy.com | grep "Cerebrum Biology"

# Check for errors
curl -sL https://cerebrumbiologyacademy.com | grep "BAILOUT"

# Check deployment status
vercel ls | head -5
```

### Set Up Alerts:

1. **Vercel Integration**: Enable email notifications for failed deployments
2. **GitHub Actions**: Enable workflow notifications
3. **Uptime Monitoring**: Use UptimeRobot or similar (optional)

---

## 15. CONTACT & ESCALATION

### When to Escalate:

- ❗ Production site down for >5 minutes
- ❗ Multiple deployment failures in a row
- ❗ Data loss or security incident

### Escalation Path:

1. Check this SOP first
2. Review recent commits: `git log --oneline | head -10`
3. Check Vercel deployment logs
4. Review GitHub Actions logs
5. If unresolved, contact: Dr. Shekhar (+91 88264 44334)

---

## 16. CHANGELOG

### October 21, 2025

- **Fixed**: Husky v9 prepare script causing Vercel failures
- **Fixed**: SSR bailout error from GoogleAnalytics in <head>
- **Fixed**: Vercel auto-deployment not triggering
- **Updated**: Removed prepare script, simplified vercel.json
- **Verified**: Production deployment successful

### Actions Taken:

- Commit 99c7bfc: Permanent fix for deployment (vercel.json cleanup)
- Commit a184bb5: Removed broken Husky prepare script
- Manual deployment: Triggered via `vercel --prod --yes`

---

## 17. FUTURE IMPROVEMENTS

### Planned Enhancements:

- [ ] Add automated deployment status notifications
- [ ] Implement deployment preview URLs in PR comments
- [ ] Add pre-deployment smoke tests
- [ ] Set up staging environment for testing

### Documentation:

- [ ] Create deployment runbook
- [ ] Document emergency procedures
- [ ] Add troubleshooting flowchart

---

**END OF SOP**

_This document is a living document. Update it whenever you encounter and solve a new deployment issue._
