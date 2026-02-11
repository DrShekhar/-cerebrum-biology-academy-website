# 📝 Instructions for Claude.ai Cowork Session

## Branch Setup

**IMPORTANT:** Use the `cowork` branch for all work in this session.

```bash
# First thing to do:
git checkout cowork
git pull origin cowork
```

---

## What to Work On (Cowork Branch)

✅ **YES - Work on these:**
- New features (enrollment pages, dashboards, etc.)
- UI/UX improvements
- Component development (`src/components/`)
- App routes (`src/app/`)
- Database schema changes (`prisma/`)
- API endpoints
- Payment integrations
- Authentication updates

❌ **NO - Don't touch these:**
- Blog content (`content/blog/`)
- Blog images (`public/blog/`)
- SEO optimization (handled in Terminal/CLI)

---

## Daily Workflow

```bash
# 1. Check you're on cowork branch
git branch
# Should show: * cowork

# 2. Make changes and commit
git add .
git commit -m "feat(cowork): your feature description"

# 3. Push to cowork (creates Vercel preview)
git push origin cowork
```

---

## Before Starting Work

```bash
# Sync with latest production
git checkout cowork
git pull origin main
git push origin cowork
```

---

## Deployment

**When ready to deploy:**
1. Test thoroughly on Vercel preview URL
2. Coordinate with Terminal/CLI session
3. Deploy on Friday 9 PM IST (or discuss timing)

```bash
git checkout main
git pull origin main
git merge cowork
git push origin main
git checkout cowork
```

---

## Important Notes

1. **Branch:** Always work on `cowork` branch
2. **Ownership:** You own `src/` directory, Terminal owns `content/blog/`
3. **Sync:** Pull from main daily
4. **Deploy:** Friday evenings (Tuesday is for Terminal/staging)
5. **Conflicts:** If same file edited, coordinate first

---

## Quick Reference

**Check branch:**
```bash
git branch
```

**Switch to cowork:**
```bash
git checkout cowork
```

**See what changed:**
```bash
git diff main..cowork
```

**Sync with production:**
```bash
git pull origin main
```

---

**Ready to work on `cowork` branch!** 🚀
