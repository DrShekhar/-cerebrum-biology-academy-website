# 🚀 Deployment Guide - Cerebrum Biology Academy

## Overview

This guide provides comprehensive instructions for deploying the Cerebrum Biology Academy website using both automated (GitHub Actions) and manual methods.

## 🎯 Current Status

- **✅ Build Issues**: Fixed case sensitivity problems with UI components
- **✅ Manual Deployment**: Working and tested
- **⚠️ GitHub Actions**: Requires secret configuration
- **✅ Live Site**: https://cerebrum-biology-academy-website.vercel.app

## 🔧 Automated Deployment Setup

### GitHub Secrets Configuration

To enable automated deployments, configure these secrets in your GitHub repository:

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add the following repository secrets:

```
VERCEL_TOKEN=MBLGOLMNdV61PSbYZjaBTR3Q
VERCEL_ORG_ID=team_FxVj0KASvdUa6pdoYXjdgFtS
VERCEL_PROJECT_ID=prj_HrqhTPtRvYA9VmxqcqqjkznaBZ7O
```

### How It Works

- **Trigger**: Every push to `main` branch
- **Process**: Build → Test → Deploy to Vercel
- **Workflow**: `.github/workflows/simple-deploy.yml`

## 🚨 Emergency Manual Deployment

If GitHub Actions are failing, use the emergency deployment script:

```bash
# Method 1: Run emergency script
./scripts/emergency-deploy.sh

# Method 2: Direct Vercel CLI
npm run build
vercel deploy --prod --token MBLGOLMNdV61PSbYZjaBTR3Q

# Method 3: Using saved credentials
npm run build
vercel deploy --prod
```

## 📊 Deployment Verification

### Automated Checks

The deployment includes automatic verification:

1. **Build Success**: TypeScript compilation and bundling
2. **Route Accessibility**: All pages respond correctly
3. **Admin Panel**: Admin routes are accessible

### Manual Verification

```bash
# Check main site
curl -I https://cerebrum-biology-academy-website.vercel.app

# Check admin panel (should redirect)
curl -I https://cerebrum-biology-academy-website.vercel.app/admin

# Run comprehensive monitoring
npm run deploy:monitor
```

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. Case Sensitivity Errors

**Problem**: Module not found errors for UI components
**Solution**: ✅ **FIXED** - All imports now use consistent casing

#### 2. GitHub Actions Failing

**Problem**: Missing secrets or permissions
**Solution**: Configure the required secrets listed above

#### 3. Vercel Build Failures

**Problem**: Environment-specific build issues
**Solution**: Test locally with `npm run build` first

#### 4. Admin Routes Not Working

**Problem**: 404 or authentication errors
**Solution**: Check middleware configuration and environment variables

### Debug Commands

```bash
# Check build locally
npm run build

# Verify deployment logs
vercel logs https://cerebrum-biology-academy-website.vercel.app

# Test specific routes
npm run deploy:verify
```

## 📈 Monitoring & Maintenance

### Deployment Health Checks

1. **Automated**: GitHub Actions workflow includes verification steps
2. **Manual**: Use `scripts/deployment-monitor.js` for comprehensive testing
3. **Live**: Monitor site at https://cerebrum-biology-academy-website.vercel.app

### Performance Monitoring

- **Build Time**: ~45 seconds (optimized)
- **Deploy Time**: ~60 seconds total
- **Success Rate**: Target 99%+ after fixes

## 🛡️ Security & Best Practices

### Token Management

- Store tokens as GitHub secrets (never commit to code)
- Rotate Vercel tokens periodically
- Use minimum required permissions

### Environment Separation

- **Production**: `main` branch → Vercel production
- **Preview**: Feature branches → Vercel preview deployments
- **Local**: Development server with local environment

## 📋 Deployment Checklist

Before deploying:

- [ ] ✅ Code builds successfully locally (`npm run build`)
- [ ] ✅ All tests pass (`npm run test`)
- [ ] ✅ Environment variables are set
- [ ] ✅ GitHub secrets are configured
- [ ] ✅ Admin panel functionality tested

After deploying:

- [ ] ✅ Main site loads correctly
- [ ] ✅ Admin routes are accessible
- [ ] ✅ API endpoints respond correctly
- [ ] ✅ Performance is acceptable

## 🆘 Emergency Contacts & Recovery

### If Everything Fails

1. **Manual Deployment**: Use `scripts/emergency-deploy.sh`
2. **Rollback**: Use Vercel dashboard to promote previous deployment
3. **Support**: Contact Vercel support with project ID `prj_HrqhTPtRvYA9VmxqcqqjkznaBZ7O`

### Recovery Commands

```bash
# Emergency rollback
vercel rollback --token MBLGOLMNdV61PSbYZjaBTR3Q

# Force fresh deployment
git push origin main --force-with-lease

# Reset deployment state
vercel remove cerebrum-biology-academy-website --yes
# Then redeploy
```

## 🎯 Next Steps for Full Automation

1. **Configure GitHub Secrets**: Add the three required secrets
2. **Test Workflow**: Push a small change to trigger deployment
3. **Monitor**: Check GitHub Actions tab for workflow execution
4. **Optimize**: Consider adding preview deployments for PRs

---

**Last Updated**: September 18, 2025
**Status**: ✅ Working with manual deployment, GitHub Actions needs secret configuration
**Contact**: +91 88264 44334
