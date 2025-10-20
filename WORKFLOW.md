# 🚀 Simple Development Workflow - Cerebrum Biology Academy

## Your Daily Development Process

```
┌─────────────────────────────────────────────────┐
│ 1. Work on Feature                              │
│    → npm run dev                                │
│    → Make changes                               │
│    → Test in browser (localhost:3000)           │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ 2. Test Production Locally                      │
│    → npm run build                              │
│    → npm run start                              │
│    → Verify at localhost:3000                   │
│    → Check CSS, features, mobile view           │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ 3. Commit & Push                                │
│    → git add .                                  │
│    → git commit -m "description"                │
│    → git push                                   │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ 4. Auto-Deploy to Vercel                       │
│    → Vercel detects your push                   │
│    → Builds production automatically            │
│    → Deploys to cerebrumbiologyacademy.com     │
│    → Takes ~2-3 minutes                         │
└─────────────────────────────────────────────────┘
```

---

## 📝 Command Reference

### Development

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Run production build locally
npm run test:local       # Build + Start (one command)
```

### Quick Deploy

```bash
# After testing locally:
npm run deploy:quick     # Add, commit (interactive), and push
# OR manually:
git add .
git commit -m "fix: description of changes"
git push
```

### Cleanup

```bash
npm run clean            # Clear .next cache
npm run fresh-install    # Fresh npm install
```

---

## ✅ Checklist Before Push

- [ ] Tested in development (`npm run dev`)
- [ ] Built successfully (`npm run build`)
- [ ] Tested production locally (`npm run start`)
- [ ] Looks good in browser (CSS, layout, mobile)
- [ ] No console errors

---

## 🎯 Example Workflow

### Making a Fix

```bash
# 1. Start development
npm run dev

# 2. Make your changes
# ... edit files ...

# 3. Test production locally
npm run build
npm run start
# Open http://localhost:3000 and verify

# 4. If looks good, deploy
git add .
git commit -m "fix: corrected navigation menu styling"
git push

# 5. Wait 2-3 minutes, check www.cerebrumbiologyacademy.com
```

### Adding a Feature

```bash
# 1. Develop
npm run dev
# ... build feature ...

# 2. Test locally
npm run build && npm run start

# 3. Deploy
git add .
git commit -m "feat: added student dashboard analytics"
git push

# Done! Vercel deploys automatically
```

---

## 🔧 Workflows

### Active GitHub Workflows

1. **mvp-build.yml** - Verifies builds don't break
   - Runs on every push to `main`
   - Checks build completes successfully
   - Doesn't block deployment (Vercel handles that)

### Vercel Auto-Deploy

- **Trigger:** Push to `main` branch
- **Build:** Vercel runs `npm run build`
- **Deploy:** Automatic to production
- **Time:** ~2-3 minutes
- **URL:** cerebrumbiologyacademy.com

---

## 🚨 Troubleshooting

### Build Fails Locally

```bash
npm run clean
npm run build
```

### CSS Not Loading

```bash
# Check next.config.js - output: 'standalone' should be commented
# Rebuild
rm -rf .next
npm run build
npm run start
```

### Deployment Issues

```bash
# Check Vercel dashboard
# View logs at: https://vercel.com/dashboard

# Force re-deploy
git commit --allow-empty -m "chore: trigger rebuild"
git push
```

---

## 📊 Where Things Are

- **Source Code:** `/src`
- **Pages:** `/src/app`
- **Components:** `/src/components`
- **Styles:** `/src/app/globals.css`
- **Config:** `/next.config.js`
- **Environment:** `.env.local` (local), Vercel Dashboard (production)

---

## 💡 Pro Tips

1. **Always test locally before pushing** - Saves time and prevents broken deployments
2. **Use descriptive commit messages** - Makes it easy to track changes
3. **Check Vercel dashboard** - Shows deployment status and logs
4. **Keep it simple** - This workflow is designed for speed in MVP phase

---

## 🎯 Goals (Current Phase: MVP Phase 1)

- **Speed over perfection** - Ship fast, iterate quickly
- **Test locally first** - Catch issues before production
- **Keep workflow simple** - No complex branching or staging
- **Revenue-first approach** - Focus on features that drive ₹2L/month target

---

_Last Updated: October 20, 2025_
_Current Stage: MVP Phase 1 - Revenue Target ₹2L/month_
