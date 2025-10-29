# TypeScript Error Reduction - Quick Start Guide

## 🚀 Start Here

**Current Status:** 624 TypeScript errors → Target: 200 errors

**Fastest wins:** Fix 86 errors in ~5 hours (see below)

---

## ⚡ Quick Commands

```bash
# Check current error count
npx tsc --noEmit 2>&1 | grep -c "error TS"

# Full error analysis
npx tsc --noEmit 2>&1 | tee /tmp/tsc-errors.txt && \
node scripts/analyze-ts-errors.js /tmp/tsc-errors.txt

# Find easy fixes
node scripts/find-easy-fixes.js /tmp/tsc-errors.txt

# Record progress after fixes
node scripts/track-ts-progress.js "Description of what you fixed"

# View progress history
node scripts/track-ts-progress.js history
```

---

## 🎯 Phase 1 Quick Wins (Start Here!)

### Fix 1: Import Type Issues (60 errors, 30 min)

**Files to edit:**

1. `/Users/drshekhar/cerebrum-biology-academy-website/src/lib/mcp/config/education.ts`
2. `/Users/drshekhar/cerebrum-biology-academy-website/src/lib/mcp/config/agents.ts`

**Change:**

```typescript
// Find this line:
import type { Prisma } from '@prisma/client'

// Replace with:
import { Prisma } from '@prisma/client'
```

**Test:**

```bash
npx tsc --noEmit 2>&1 | grep -c "error TS"
# Should show ~564 errors (60 fixed!)

node scripts/track-ts-progress.js "Fixed Prisma import type issues"
```

---

### Fix 2: gtag Declaration (13 errors, 10 min)

**Create new file:** `/Users/drshekhar/cerebrum-biology-academy-website/src/types/gtag.d.ts`

```typescript
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export {}
```

**Test:**

```bash
npx tsc --noEmit 2>&1 | grep -c "error TS"
# Should show ~551 errors (13 more fixed!)

node scripts/track-ts-progress.js "Added gtag type declarations"
```

---

### Fix 3: Icon Import (8 errors, 15 min)

**Files with wrong import:**

- `src/components/courses/PremiumCerebrumCoursePage.tsx`
- `src/components/examples/TrustIntegrationExample.tsx`
- `src/components/voice/VoiceTrainingStudio.tsx`
- `src/lib/admin-schema.ts`
- `src/components/mobile/LowBandwidthMode.tsx`
- Others (check error output)

**Find:**

```typescript
import { Lightning } from 'lucide-react'
```

**Replace with:**

```typescript
import { Zap } from 'lucide-react'
```

**Also replace in JSX:**

```tsx
<Lightning className="..." />
// becomes
<Zap className="..." />
```

**Test:**

```bash
npx tsc --noEmit 2>&1 | grep -c "error TS"
# Should show ~543 errors (8 more fixed!)

node scripts/track-ts-progress.js "Fixed Lightning icon imports - replaced with Zap"
```

---

### Fix 4: Role Comparisons (5 errors, 5 min)

**Files:**

1. `src/app/api/admin/lms/materials/route.ts`
2. `src/app/api/admin/lms/upload/route.ts`
3. `src/app/api/admin/lms/materials/[id]/route.ts`

**Find:**

```typescript
if (session.role === 'ADMIN')
```

**Replace with:**

```typescript
if (session.role === 'admin')
```

**Test:**

```bash
npx tsc --noEmit 2>&1 | grep -c "error TS"
# Should show ~538 errors (5 more fixed!)

node scripts/track-ts-progress.js "Fixed role comparison case sensitivity"
```

---

## 📊 Progress Check

After completing all 4 quick fixes:

```bash
node scripts/track-ts-progress.js history
```

**Expected result:**

- Started: 624 errors
- After fixes: ~538 errors
- **Total fixed: 86 errors (14% reduction in ~1 hour!)**

---

## 🎯 Next Steps

### Continue Phase 1 (Target: 500 errors)

1. **Fix disabled demo page** (8 errors, 30 min)
   - File: `src/app/demo/archive/_disabled-testing-suite/page.tsx`
   - Comment out missing imports or fix paths

2. **Fix CourseWizardContainer** (10 errors, 1 hour)
   - File: `src/components/courseSelector/CourseWizardContainer.tsx`
   - Fix or comment out missing module imports

3. **Phase 1 Complete!** Should be at ~500 errors

---

## 📚 Full Documentation

For detailed strategies and all phases:

- **Strategy Guide:** `TYPESCRIPT_REDUCTION_STRATEGY.md`
- **Full Report:** `TS_ERROR_REDUCTION_REPORT.md`

For detailed analysis:

- **Error Analysis JSON:** `ts-error-analysis.json`
- **Easy Fixes JSON:** `easy-fixes-report.json`

---

## 🛠️ Troubleshooting

### If error count doesn't decrease as expected:

```bash
# Re-run full analysis
npx tsc --noEmit 2>&1 | tee /tmp/tsc-errors-new.txt
node scripts/analyze-ts-errors.js /tmp/tsc-errors-new.txt

# Compare with previous
diff /tmp/tsc-errors.txt /tmp/tsc-errors-new.txt
```

### If TypeScript is slow:

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
rm tsconfig.tsbuildinfo

# Rebuild
npm install
```

### If you need to rollback:

```bash
git status
git diff
git checkout -- <file>  # Rollback specific file
```

---

## ✅ Workflow Template

For each fix session:

```bash
# 1. Check starting count
npx tsc --noEmit 2>&1 | grep -c "error TS"

# 2. Make your fixes

# 3. Check new count
npx tsc --noEmit 2>&1 | grep -c "error TS"

# 4. Record progress
node scripts/track-ts-progress.js "What you fixed"

# 5. Commit if satisfied
git add .
git commit -m "fix(types): What you fixed - reduced X errors"
```

---

## 🎉 Milestones

- [ ] 86 errors fixed (Quick wins complete)
- [ ] 500 errors (Phase 1 complete)
- [ ] 400 errors (Phase 2 complete)
- [ ] 200 errors (MISSION COMPLETE!)

---

**Ready to start? Begin with Fix 1 above!** 🚀

Last Updated: 2025-10-29
