## 📋 Deployment Checklist

### Pre-Merge Checks
- [ ] Ran `npm run type-check` - No errors
- [ ] Ran `npm run lint` - No errors  
- [ ] Ran `npm run build` - Build successful
- [ ] Tested on Vercel preview deployment
- [ ] Reviewed all changed files

### Changes Overview
**Type:** (Blog Content / Feature / Bug Fix / SEO / UI Update)

**Description:**
<!-- Describe what changed and why -->

**Impact:**
- [ ] Low Risk (blog content, images, text)
- [ ] Medium Risk (UI components, new features)
- [ ] High Risk (auth, payments, database)

### Deployment Plan
**Deploy On:** Tuesday 9 PM IST / Friday 9 PM IST / Emergency Hotfix

**Rollback Plan:** 
<!-- How to rollback if this breaks production -->

### Post-Deployment Monitoring
- [ ] Monitor Vercel analytics for 15 minutes
- [ ] Check error logs in Sentry
- [ ] Test critical user flows
- [ ] Verify Google Analytics tracking
