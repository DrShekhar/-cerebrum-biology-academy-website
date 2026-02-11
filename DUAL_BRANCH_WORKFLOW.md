# 🔀 Dual Branch Workflow Guide

## Two Branches, Two Environments, Zero Conflicts

### Your Setup:
- **Terminal (Claude Code CLI)**: Works on `staging` branch
- **Cowork (Claude.ai)**: Works on `cowork` branch

---

## 🎯 Branch Separation Strategy

### Branch 1: `staging` (Terminal/CLI)
**Use for:**
- Blog content updates
- SEO optimizations  
- Image improvements
- Minor fixes
- Quality improvements

### Branch 2: `cowork` (Claude.ai Cowork)
**Use for:**
- New features
- UI/UX changes
- Component development
- Database changes
- Complex features

---

## 🚀 Setup Cowork Branch (Do This Once)

```bash
# Create cowork branch from main
git checkout main
git pull origin main
git checkout -b cowork
git push -u origin cowork

# Switch back to staging
git checkout staging
```

---

## 📖 Daily Workflow

### In Terminal (Claude Code CLI):
```bash
# Check you're on staging
git branch
# * staging  ← Should see this

# Work normally
git add .
git commit -m "feat: blog updates"
git push origin staging
```

### In Cowork (Claude.ai):
```bash
# Check you're on cowork  
git branch
# * cowork  ← Should see this

# Work normally
git add .
git commit -m "feat: new feature"
git push origin cowork
```

---

## 🔄 Keeping Branches in Sync

### Daily Sync (Recommended):

**In Terminal:**
```bash
git checkout staging
git pull origin main  # Get latest production
git push origin staging
```

**In Cowork:**
```bash
git checkout cowork
git pull origin main  # Get latest production
git push origin cowork
```

---

## 🚀 Deployment Strategy

### Option 1: Deploy Separately (Safer)

**Tuesday 9 PM: Deploy staging → main**
```bash
# In Terminal
git checkout main
git merge staging
git push origin main
git checkout staging
```

**Friday 9 PM: Deploy cowork → main**
```bash
# In Cowork or Terminal
git checkout main
git pull origin main  # Get Tuesday's changes
git merge cowork
git push origin main
git checkout cowork
```

### Option 2: Merge Both Before Deploy

**Tuesday 9 PM: Deploy both together**
```bash
# Merge staging first
git checkout main
git merge staging
git push origin main

# Merge cowork second
git checkout main
git merge cowork
git push origin main

# Update both branches
git checkout staging
git pull origin main
git checkout cowork
git pull origin main
```

---

## ⚠️ Avoiding Conflicts

### Rule 1: File Ownership
- **Terminal (staging)**: Owns `content/blog/`, `public/blog/`
- **Cowork**: Owns `src/app/`, `src/components/`, database files

### Rule 2: Communication
Before editing a file, check:
```bash
# See what changed on other branch
git fetch origin
git log staging..cowork --oneline  # Changes in cowork not in staging
git log cowork..staging --oneline  # Changes in staging not in cowork
```

### Rule 3: Sync Daily
At end of each day:
```bash
# In both environments, pull latest main
git checkout [your-branch]
git pull origin main
```

---

## 🆘 If Conflicts Happen

### When Merging to Main:
```bash
git checkout main
git merge staging  # Or cowork

# If conflict:
# 1. Git will show conflicted files
# 2. Open them, resolve conflicts (<<<< ==== >>>>)
# 3. Then:
git add .
git commit -m "merge: resolve conflicts"
git push origin main
```

---

## 📊 Visual Workflow

```
         ┌─────────────┐
         │    MAIN     │  ← Production (Live Site)
         │ (Production)│
         └──────┬──────┘
                │
        ┌───────┴───────┐
        │               │
   ┌────▼────┐    ┌────▼────┐
   │ STAGING │    │ COWORK  │
   │         │    │         │
   │Terminal │    │Claude.ai│
   │  (CLI)  │    │(Cowork) │
   └────┬────┘    └────┬────┘
        │               │
   Blog/SEO       Features/UI
   Updates        Development
```

---

## 🎯 Quick Reference Commands

### Check Current Branch:
```bash
git branch
# Shows * next to current branch
```

### Switch Branches:
```bash
git checkout staging  # Switch to staging
git checkout cowork   # Switch to cowork
git checkout main     # Switch to main
```

### See What's Different:
```bash
# From current branch to main
git diff main

# Between staging and cowork
git diff staging..cowork
```

### Emergency: Switch Without Committing
```bash
# Save work temporarily
git stash

# Switch branch
git checkout other-branch

# Come back and restore
git checkout original-branch
git stash pop
```

---

## 📅 Example Weekly Schedule

**Monday-Wednesday (Both Branches Active):**
- Terminal: Blog updates on `staging`
- Cowork: Feature dev on `cowork`

**Thursday (Sync Day):**
```bash
# Both branches sync with main
git checkout staging && git pull origin main
git checkout cowork && git pull origin main
```

**Tuesday 9 PM (Deploy staging):**
```bash
./scripts/deploy-to-production.sh  # staging → main
```

**Friday 9 PM (Deploy cowork):**
```bash
git checkout main
git merge cowork
git push origin main
```

---

## ✅ Pre-Deployment Checklist (Both Branches)

**Before deploying staging:**
- [ ] Cowork changes won't conflict?
- [ ] Test staging preview thoroughly
- [ ] Run pre-deploy checks

**Before deploying cowork:**
- [ ] Staging already deployed?
- [ ] Pull latest main first
- [ ] Test cowork preview thoroughly
- [ ] Run pre-deploy checks

---

## 💡 Pro Tips

### 1. Branch Naming in Commits
```bash
# In staging
git commit -m "feat(staging): blog SEO updates"

# In cowork  
git commit -m "feat(cowork): new enrollment page"
```

### 2. Check Before Pushing
```bash
# See what you're about to push
git log origin/staging..staging
git log origin/cowork..cowork
```

### 3. Keep It Clean
```bash
# Squash commits before merging to main
git checkout staging
git rebase -i main  # Combine multiple commits
```

---

## 🎊 Benefits of This Workflow

✅ **No Conflicts**: Each environment owns different files  
✅ **Parallel Work**: Develop features while updating content  
✅ **Safe Testing**: Each branch has its own Vercel preview  
✅ **Flexible Deploy**: Deploy staging and cowork independently  
✅ **Easy Rollback**: Rollback one branch without affecting other  

---

**Ready to use dual branches!** 🚀
