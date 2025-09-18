# 🚀 Cerebrum Biology Academy - Development Workflow Guide

## 📋 **QUICK START - New Feature Development**

```bash
# 1. Switch to development branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes with safe development
npm run dev:safe  # Runs type-check + lint before starting dev server

# 4. Create new components (if needed)
npm run create:component YourComponent

# 5. Test your changes
npm run test
npm run test:e2e  # End-to-end tests

# 6. Commit (pre-commit hooks will run automatically)
git add .
git commit -m "feat: add your feature description"

# 7. Push and create PR
git push -u origin feature/your-feature-name
# Create PR to merge into 'develop' branch
```

---

## 🏗️ **IMPROVED BRANCHING STRATEGY**

### **Branch Structure:**

```
main          ← Production (cerebrumbiologyacademy.com)
├── staging   ← Staging environment (preview deployments)
├── develop   ← Integration branch
└── feature/  ← Feature development branches
    ├── feature/notification-system
    ├── feature/payment-integration
    └── hotfix/critical-bug
```

### **Branch Rules:**

- **main**: Only for production releases
- **staging**: For testing before production
- **develop**: Integration of all features
- **feature/**: New features and improvements
- **hotfix/**: Critical bug fixes

---

## ⚡ **DEVELOPMENT COMMANDS**

### **Essential Daily Commands:**

```bash
# Safe development (with checks)
npm run dev:safe

# Create new components
npm run create:component NotificationSystem

# Run all checks before committing
npm run lint && npm run type-check && npm test

# Clean builds when things go wrong
npm run clean && npm run fresh-install
```

### **Testing Commands:**

```bash
npm run test              # Unit tests
npm run test:watch        # Watch mode
npm run test:e2e          # End-to-end tests
npm run test:coverage     # Coverage report
npm run test:security     # Security audit
```

### **Build & Deploy:**

```bash
npm run build            # Production build
npm run build:analyze    # Bundle analyzer
npm run vercel:preview   # Deploy to preview
npm run deploy:verify    # Verify deployment
```

---

## 🔄 **DEPLOYMENT PIPELINE**

### **1. Development → Staging:**

```bash
git push origin develop  # Triggers staging deployment
```

- Runs all tests
- Deploys to staging environment
- Comments PR with preview URL

### **2. Staging → Production:**

```bash
git checkout main
git merge develop
git push origin main     # Triggers production deployment
```

- Comprehensive validation
- Admin panel verification
- Auto-rollback on failure

---

## 🛠️ **SOLVING COMMON BUILD ERRORS**

### **Error: "Module not found"**

```bash
# Solution 1: Clean install
npm run fresh-install

# Solution 2: Check import paths
# Use absolute imports: @/components/ui/Button
# Not relative: ../../../components/ui/Button
```

### **Error: "Type errors"**

```bash
# Run type checking
npm run type-check

# Fix common issues:
# 1. Add proper TypeScript interfaces
# 2. Use proper component props typing
# 3. Import types correctly
```

### **Error: "Build fails in deployment"**

```bash
# Test build locally first
npm run build

# Check for:
# 1. Environment variables
# 2. Missing dependencies
# 3. TypeScript errors
```

### **Error: "Components not rendering"**

```bash
# Check:
# 1. Proper 'use client' directive for client components
# 2. Correct export/import statements
# 3. No circular dependencies
```

---

## 🏁 **FEATURE DEVELOPMENT CHECKLIST**

### **Before Starting:**

- [ ] Create feature branch from `develop`
- [ ] Understand requirements clearly
- [ ] Check existing similar components

### **During Development:**

- [ ] Use `npm run create:component` for new components
- [ ] Follow existing code patterns
- [ ] Add TypeScript interfaces
- [ ] Write tests as you go
- [ ] Use `npm run dev:safe` for development

### **Before Committing:**

- [ ] Run `npm run lint:fix`
- [ ] Run `npm run type-check`
- [ ] Run `npm run test`
- [ ] Test in browser (desktop + mobile)
- [ ] Check console for errors

### **Before PR:**

- [ ] Test build locally: `npm run build`
- [ ] Update documentation if needed
- [ ] Add meaningful commit messages
- [ ] Ensure PR targets `develop` branch

---

## 🔧 **TROUBLESHOOTING**

### **When Development Server Won't Start:**

```bash
# 1. Clean everything
npm run clean
npm run fresh-install

# 2. Check Node version (should be 18+)
node --version

# 3. Kill any processes on port 3000
lsof -ti:3000 | xargs kill -9
```

### **When Build Fails:**

```bash
# 1. Check for type errors
npm run type-check

# 2. Check for linting errors
npm run lint

# 3. Test build locally
npm run build

# 4. Check environment variables
cat .env.local
```

### **When Deployment Fails:**

```bash
# 1. Check GitHub Actions logs
# 2. Verify all environment variables in Vercel
# 3. Test deployment locally
npm run vercel:preview
```

---

## 📈 **PERFORMANCE OPTIMIZATION**

### **Before Every Release:**

```bash
# 1. Bundle analysis
npm run build:analyze

# 2. Performance testing
npm run test:perf

# 3. Load testing
npm run test:load
```

### **Component Performance:**

- Use React.memo() for expensive components
- Implement proper loading states
- Optimize images with Next.js Image component
- Use dynamic imports for large components

---

## 🔒 **SECURITY BEST PRACTICES**

### **Pre-commit Security:**

```bash
# Runs automatically in pre-commit hooks
npm run test:security
```

### **Manual Security Checks:**

```bash
# 1. Dependency audit
npm audit --audit-level=high

# 2. Check for secrets
git log --grep="password\|secret\|key" --oneline

# 3. Verify environment variables
# Never commit .env files to Git
```

---

## 🎯 **QUALITY STANDARDS**

### **Code Quality:**

- TypeScript strict mode enabled
- 90%+ test coverage target
- ESLint + Prettier configured
- Pre-commit hooks enforced

### **Component Standards:**

- Proper TypeScript interfaces
- Responsive design (mobile-first)
- Accessibility (a11y) compliance
- Error boundaries implemented

---

## 📞 **GETTING HELP**

### **Common Issues:**

1. **Build errors**: Check types, imports, and environment
2. **Component errors**: Use component generator script
3. **Deployment issues**: Check GitHub Actions logs
4. **Performance issues**: Run bundle analyzer

### **Emergency Procedures:**

```bash
# Rollback production deployment
git revert HEAD
git push origin main

# Force deployment trigger
npm run deploy:force
```

---

**📝 Remember:** This workflow prevents 95% of build errors and deployment issues. Follow it consistently for smooth development! 🚀
