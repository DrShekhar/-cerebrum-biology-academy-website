# Git Flow Workflow Guide

## 🚀 Git Flow Setup Complete

Git Flow has been successfully configured for the Cerebrum Biology Academy project with the following structure:

- **Production Branch**: `main` (stable, production-ready code)
- **Development Branch**: `develop` (integration branch for features)
- **Feature Branches**: `feature/` (new features)
- **Release Branches**: `release/` (preparing releases)
- **Hotfix Branches**: `hotfix/` (emergency production fixes)
- **Bugfix Branches**: `bugfix/` (bug fixes)

## 📋 Common Git Flow Commands

### Starting New Features

```bash
# Start a new feature
git flow feature start feature-name

# Examples:
git flow feature start payment-integration
git flow feature start mobile-optimization
git flow feature start ai-chatbot-enhancement
```

### Working on Features

```bash
# Switch to feature branch
git checkout feature/feature-name

# Make your changes, commit regularly
git add .
git commit -m "Add feature implementation"

# Push feature branch to remote
git push -u origin feature/feature-name
```

### Finishing Features

```bash
# Finish feature (merges to develop and deletes feature branch)
git flow feature finish feature-name

# Push updated develop branch
git push origin develop
```

### Releases

```bash
# Start a new release
git flow release start v1.2.0

# Finish release (merges to main and develop, creates tag)
git flow release finish v1.2.0

# Push everything
git push origin main
git push origin develop
git push --tags
```

### Hotfixes (Emergency Fixes)

```bash
# Start hotfix from main
git flow hotfix start v1.2.1

# Make fixes, commit
git add .
git commit -m "Fix critical bug"

# Finish hotfix (merges to main and develop)
git flow hotfix finish v1.2.1

# Push everything
git push origin main
git push origin develop
git push --tags
```

## 🔧 Helpful Git Aliases

Add these to your `~/.gitconfig` for faster workflow:

```bash
# Quick Git Flow aliases
git config --global alias.fs 'flow feature start'
git config --global alias.ff 'flow feature finish'
git config --global alias.rs 'flow release start'
git config --global alias.rf 'flow release finish'
git config --global alias.hs 'flow hotfix start'
git config --global alias.hf 'flow hotfix finish'

# General workflow aliases
git config --global alias.co 'checkout'
git config --global alias.br 'branch'
git config --global alias.st 'status'
git config --global alias.cm 'commit -m'
git config --global alias.ps 'push'
git config --global alias.pl 'pull'
git config --global alias.lg 'log --oneline --graph --all'
```

## 📊 Branch Status Commands

```bash
# View all branches
git branch -a

# View Git Flow status
git flow

# View current branch
git branch --show-current

# View branch history
git log --oneline --graph --all
```

## 🔄 Recommended Workflow

### For New Features:

1. `git flow feature start feature-name`
2. Work on feature, commit regularly
3. `git push -u origin feature/feature-name`
4. Create Pull Request when ready
5. After review: `git flow feature finish feature-name`

### For Releases:

1. `git flow release start v1.x.x`
2. Update version numbers, changelog
3. Test thoroughly
4. `git flow release finish v1.x.x`
5. Deploy to production

### For Critical Fixes:

1. `git flow hotfix start v1.x.x`
2. Fix the issue quickly
3. Test the fix
4. `git flow hotfix finish v1.x.x`
5. Deploy immediately

## 🌟 Best Practices

### Feature Development:

- Keep features small and focused
- Use descriptive branch names
- Commit frequently with clear messages
- Push branches regularly for backup
- Create Pull Requests for code review

### Commit Messages:

Use conventional commit format:

```
feat: add payment integration
fix: resolve image optimization issue
docs: update API documentation
style: format code with prettier
refactor: simplify course selection logic
test: add unit tests for enrollment
```

### Branch Naming:

- `feature/payment-razorpay-integration`
- `feature/mobile-responsive-design`
- `bugfix/enrollment-form-validation`
- `hotfix/payment-gateway-timeout`

## 🚀 Deployment Strategy

### Development to Staging:

- `develop` branch → Auto-deploy to staging environment
- Test all features in staging
- Run automated tests

### Staging to Production:

- Create release branch from `develop`
- Final testing and bug fixes
- Merge to `main` via Git Flow
- `main` branch → Auto-deploy to production

## 📱 Mobile & Web Considerations

For this Biology Academy project:

- Test mobile responsiveness on all feature branches
- Verify payment flows work correctly
- Ensure WhatsApp integration functions
- Test course selection UI/UX
- Validate SEO optimizations

## 🔧 Emergency Procedures

### Rollback Production:

```bash
# If last deployment fails
git checkout main
git reset --hard HEAD~1
git push --force-with-lease origin main
```

### Quick Feature Deployment:

```bash
# For urgent feature that can't wait for release
git checkout main
git cherry-pick <commit-hash>
git push origin main
```

---

## 📞 Contact & Support

- **Developer**: Dr. Shekhar
- **Repository**: github.com/drshekhar/cerebrum-biology-academy-website
- **Deployment**: Vercel (auto-deploy from main)
- **Staging**: Vercel preview branches

---

_This workflow ensures clean, manageable code releases while maintaining production stability._
