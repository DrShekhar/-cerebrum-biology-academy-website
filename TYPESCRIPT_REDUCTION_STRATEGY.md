# TypeScript Error Reduction Strategy

## Systematic Plan: 624 → 200 Errors

**Current Status:** 624 TypeScript errors (as of baseline)
**Target:** Reduce to 200 errors
**Errors to Fix:** 424 errors
**Progress Tracking:** Use `node scripts/track-ts-progress.js <message>` after each fix batch

---

## 📊 Error Distribution Analysis

### Top Error Types (by frequency)

| Error Code | Count | Description                        | Priority |
| ---------- | ----- | ---------------------------------- | -------- |
| **TS2339** | 193   | Property does not exist on type    | HIGH     |
| **TS2322** | 77    | Type not assignable                | MEDIUM   |
| **TS2304** | 65    | Cannot find name (missing imports) | HIGH     |
| **TS1361** | 60    | Import type used as value          | HIGH     |
| **TS2345** | 51    | Argument type not assignable       | MEDIUM   |
| **TS2307** | 23    | Cannot find module                 | HIGH     |
| **TS2554** | 20    | Expected arguments mismatch        | LOW      |
| **TS2353** | 18    | Unknown property in object literal | LOW      |
| **TS2365** | 11    | Operator cannot be applied         | LOW      |

### Files Most Affected

| File                                        | Errors | Top Issues                  |
| ------------------------------------------- | ------ | --------------------------- |
| `src/lib/mcp/config/education.ts`           | 35     | TS1361 (import type issues) |
| `src/lib/mcp/config/agents.ts`              | 24     | TS1361 (import type issues) |
| `src/components/ai/BiologyTutorChatbot.tsx` | 18     | TS2339, TS2353              |
| `src/app/api/subscription-tiers/route.ts`   | 13     | TS2339 (property access)    |
| `src/lib/ai/aiClient.ts`                    | 13     | TS2304 (missing names)      |

### Directory Hot Spots

| Directory            | Errors | Notes                     |
| -------------------- | ------ | ------------------------- |
| `src/lib/mcp/config` | 59     | Prisma import type issues |
| `src/lib/ai`         | 43     | Missing type declarations |
| `src/lib/database`   | 29     | Type mismatches           |
| `src/components/ai`  | 28     | Property access errors    |
| `src/lib/security`   | 20     | Mixed issues              |

---

## 🎯 Three-Phase Fix Strategy

### **PHASE 1: Quick Wins & High-Impact Fixes (624 → 500 errors)**

**Target Reduction:** 124 errors
**Estimated Time:** 8-12 hours
**Focus:** Low-hanging fruit with maximum impact

#### 1.1 Fix Import Type Issues (TS1361) - ~60 errors

**Files to fix:**

- `src/lib/mcp/config/education.ts` (35 errors)
- `src/lib/mcp/config/agents.ts` (24 errors)

**Fix Strategy:**

```typescript
// WRONG: Import type used as value
import type { Prisma } from '@prisma/client'
const where: Prisma.QuestionWhereInput = { ... }  // ❌ Error

// RIGHT: Regular import for types used as values
import { Prisma } from '@prisma/client'
const where: Prisma.QuestionWhereInput = { ... }  // ✅ Works
```

**Action Items:**

- Search for `import type { Prisma }` in the codebase
- Replace with `import { Prisma }` where Prisma is used as a namespace
- Keep `import type` only for types that are never used at runtime

#### 1.2 Fix Missing Imports (TS2304) - ~30 errors

**Common missing imports:**

- `gtag` (Google Analytics) - 7 occurrences
- Various utility functions
- Type definitions

**Fix Strategy:**

```typescript
// Add missing gtag type declaration
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

// Use it safely
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'page_view', {
    /* ... */
  })
}
```

**Files to fix:**

- `src/app/api/analytics/heatmap/route.ts`
- `src/app/api/feedback/route.ts`
- `src/lib/ai/aiClient.ts`
- `src/lib/optimization/iterativeImprovement.ts`

#### 1.3 Fix Missing Module Imports (TS2307) - ~23 errors

**Files with missing modules:**

- `src/app/demo/archive/_disabled-testing-suite/page.tsx` (8 errors)
- `src/components/courseSelector/CourseWizardContainer.tsx` (10 errors)

**Fix Strategy:**

- Check if modules exist but are in wrong paths
- Move or create missing components
- Or comment out disabled/demo features if not needed

#### 1.4 Quick Win Files (1-3 errors each) - ~30 errors

**Target 130 files with minimal errors. Pick the easiest 10-15:**

**Easy fixes:**

1. `src/app/api/admin/lms/materials/route.ts` (1 error - role comparison)
2. `src/app/api/admin/lms/upload/route.ts` (1 error - role comparison)
3. `src/app/api/ai/generate-test/route.ts` (1 error - unknown property)
4. `src/components/accessibility/AccessibilityHub.tsx` (1 error - type assignment)
5. `src/components/ai/AccessSettings.tsx` (1 error - missing import)

**Fix Strategy:**

```typescript
// Role comparison fix (TS2367)
// WRONG:
if (session.role === 'ADMIN')  // ❌ 'ADMIN' !== 'admin'

// RIGHT:
if (session.role === 'admin')  // ✅ Match the type definition
```

**Checkpoint after Phase 1:**

```bash
node scripts/track-ts-progress.js "Phase 1 complete: Fixed import types, missing imports, and quick wins"
```

---

### **PHASE 2: Property Access & Type Mismatches (500 → 400 errors)**

**Target Reduction:** 100 errors
**Estimated Time:** 10-15 hours
**Focus:** TS2339 (property errors) and TS2345 (argument errors)

#### 2.1 Fix Property Access Errors (TS2339) - ~80 errors

**Top offenders:**

- Authentication session properties (40+ errors)
- Subscription tier properties (13 errors)
- Test result properties (15+ errors)

**Fix Strategy for Auth Sessions:**

```typescript
// Problem: withAuth returns a function type instead of result
const session = await withAuth(request)
// ❌ session.success - property doesn't exist on function type

// Solution: Call withAuth properly
const authResult = await withAuth(request, async (req, session) => {
  // Use session here - it has the right type
  return { success: true, user: session.user }
})
// ✅ authResult.success exists
```

**Files to fix:**

- `src/app/api/questions/[id]/route.ts` (6 errors)
- `src/app/api/test/[id]/route.ts` (6 errors)
- `src/app/api/test/[id]/answer/route.ts` (10 errors)
- `src/app/api/progress/[userId]/route.ts` (8 errors)

**Fix Strategy for Subscription Tiers:**

```typescript
// Problem: Union type doesn't have all properties
type TierConfig = StudentTierConfig | PremiumTierConfig | FreeTierConfig | InstitutionalTierConfig

// Solution: Use type guards
function hasPrice(config: TierConfig): config is StudentTierConfig | PremiumTierConfig {
  return 'price' in config
}

if (hasPrice(config)) {
  console.log(config.price) // ✅ Safe access
}
```

#### 2.2 Fix Argument Type Errors (TS2345) - ~20 errors

**Common issues:**

- Function signatures not matching
- Wrong types passed to library functions

**Files to fix:**

- `src/lib/ai/gateway/AIGateway.ts` (2 errors)
- `src/lib/assessment/AutomatedAssessmentEngine.ts` (6 errors)
- Various API route files

**Checkpoint after Phase 2:**

```bash
node scripts/track-ts-progress.js "Phase 2 complete: Fixed property access and argument type errors"
```

---

### **PHASE 3: Complex Types & Edge Cases (400 → 200 errors)**

**Target Reduction:** 200 errors
**Estimated Time:** 15-20 hours
**Focus:** Remaining TS2322 (type assignments), TS2740, TS2739, etc.

#### 3.1 Fix Type Assignment Errors (TS2322) - ~50 errors

**Files to fix:**

- `src/lib/analytics/exportService.ts` (ChartData issues)
- `src/lib/cache/DistributedCacheManager.ts` (3 errors)
- `src/components/ui/AcademicTypography.tsx` (3 errors)

**Fix Strategy:**

```typescript
// Problem: Type narrowing issues
const data = {
  easy: { attempted: 0, correct: 0 },
  // Missing 'accuracy' property
}

// Solution: Ensure all required properties
const data = {
  easy: {
    attempted: 0,
    correct: 0,
    accuracy: attempted > 0 ? (correct / attempted) * 100 : 0,
  },
}
```

#### 3.2 Fix Remaining Property/Module Errors - ~50 errors

- Complete remaining TS2339 errors
- Fix remaining TS2307 module errors
- Address edge case type issues

#### 3.3 Complex Type Definitions - ~50 errors

**Files needing careful attention:**

- `src/components/ai/BiologyTutorChatbot.tsx` (18 errors - complex component)
- `src/lib/database/testService.ts` (9 errors)
- `src/lib/whatsapp/messageProcessor.ts` (9 errors)

#### 3.4 Third-Party Library Types - ~50 errors

- Razorpay type declarations
- Lucide icon imports
- Chart.js types

**Checkpoint after Phase 3:**

```bash
node scripts/track-ts-progress.js "Phase 3 complete: Reached 200 error target!"
```

---

## 🛠️ Tools & Automation

### 1. Error Analysis Script

```bash
node scripts/analyze-ts-errors.js /tmp/tsc-errors.txt
```

**Outputs:**

- Error distribution by type
- Files with most errors
- Quick win opportunities
- JSON report for programmatic access

### 2. Progress Tracking Script

```bash
# Record a checkpoint
node scripts/track-ts-progress.js "Fixed auth session types"

# View history
node scripts/track-ts-progress.js history

# Reset tracking
node scripts/track-ts-progress.js reset
```

### 3. Continuous Error Capture

```bash
# Run during development to capture current state
cd /Users/drshekhar/cerebrum-biology-academy-website
npx tsc --noEmit 2>&1 | tee tsc-errors-$(date +%Y%m%d-%H%M%S).txt
```

### 4. Git Workflow

After each fix batch:

```bash
# Run type check
npx tsc --noEmit

# Record progress
node scripts/track-ts-progress.js "Your fix description"

# Run tests if applicable
npm run test

# Commit changes
git add .
git commit -m "fix(types): Your fix description - reduced errors by X"
```

---

## 📝 Implementation Checklist

### Phase 1 Tasks (Target: 500 errors)

- [ ] Fix TS1361 in `src/lib/mcp/config/education.ts` (35 errors)
- [ ] Fix TS1361 in `src/lib/mcp/config/agents.ts` (24 errors)
- [ ] Add gtag type declarations (7 errors)
- [ ] Fix missing module imports in demo/archive (8 errors)
- [ ] Fix 10 quick-win files (10 errors)
- [ ] Fix role comparison issues (5 errors)
- [ ] Fix lucide-react icon imports (8 errors)
- [ ] Record Phase 1 checkpoint

### Phase 2 Tasks (Target: 400 errors)

- [ ] Fix auth session property access errors (40 errors)
- [ ] Fix subscription tier type guards (13 errors)
- [ ] Fix test result property access (15 errors)
- [ ] Fix argument type errors in AI gateway (2 errors)
- [ ] Fix argument errors in assessment engine (6 errors)
- [ ] Fix remaining property access errors (24 errors)
- [ ] Record Phase 2 checkpoint

### Phase 3 Tasks (Target: 200 errors)

- [ ] Fix ChartData type issues in analytics (7 errors)
- [ ] Fix BiologyTutorChatbot types (18 errors)
- [ ] Fix test service types (9 errors)
- [ ] Add Razorpay type declarations (2 errors)
- [ ] Fix complex union type issues (50 errors)
- [ ] Fix remaining type assignment errors (50 errors)
- [ ] Final cleanup and edge cases (64 errors)
- [ ] Record Phase 3 checkpoint

---

## 🎓 Common Patterns & Solutions

### Pattern 1: Import Type vs Regular Import

```typescript
// Use 'import type' only for types that are NEVER used at runtime
import type { User } from '@prisma/client' // ✅ OK - only for type annotations

// Use regular import when used as namespace or value
import { Prisma } from '@prisma/client' // ✅ OK - used as Prisma.WhereInput
```

### Pattern 2: Type Guards for Union Types

```typescript
// Problem: Property doesn't exist on union type
type Config = TypeA | TypeB | TypeC

// Solution: Type guard
function isTypeA(config: Config): config is TypeA {
  return 'specificProperty' in config
}

if (isTypeA(config)) {
  config.specificProperty // ✅ Safe access
}
```

### Pattern 3: Optional Chaining & Nullish Coalescing

```typescript
// Problem: Property might not exist
const value = obj.prop.subprop // ❌ Error if prop is undefined

// Solution: Optional chaining
const value = obj.prop?.subprop ?? 'default' // ✅ Safe
```

### Pattern 4: Type Assertions (Use Sparingly)

```typescript
// Only when you're 100% certain of the type
const element = document.getElementById('my-id') as HTMLDivElement
```

---

## 📈 Expected Timeline

| Phase       | Duration        | Target         | Key Deliverables         |
| ----------- | --------------- | -------------- | ------------------------ |
| **Phase 1** | 8-12 hours      | 500 errors     | Import fixes, quick wins |
| **Phase 2** | 10-15 hours     | 400 errors     | Property access fixes    |
| **Phase 3** | 15-20 hours     | 200 errors     | Complex type fixes       |
| **Total**   | **33-47 hours** | **200 errors** | Fully typed codebase     |

**Working schedule suggestions:**

- **Sprint approach:** 2-3 hours/day = 2-3 weeks
- **Intensive approach:** 6-8 hours/day = 1 week
- **Hybrid approach:** Focus on Phase 1 first (high impact), then address phases 2-3 gradually

---

## 🚀 Getting Started

1. **Establish baseline** (already done):

   ```bash
   node scripts/track-ts-progress.js "Baseline established"
   ```

2. **Start with highest impact fixes** (Phase 1.1):

   ```bash
   # Fix import type issues
   # Edit src/lib/mcp/config/education.ts
   # Edit src/lib/mcp/config/agents.ts

   # Test and record
   npx tsc --noEmit
   node scripts/track-ts-progress.js "Fixed Prisma import type issues"
   ```

3. **Follow the phase checklist** - Work through each phase systematically

4. **Track progress regularly** - Record checkpoints after each batch of fixes

5. **Commit frequently** - Small, focused commits are easier to review and rollback

---

## 📊 Success Metrics

- **Primary Goal:** Reduce errors from 624 to ≤200
- **Secondary Goals:**
  - Improve code maintainability
  - Enable stricter TypeScript checks in future
  - Reduce build warnings
  - Improve IDE autocomplete/intellisense

**Progress Dashboard:**

```bash
# View current progress
node scripts/track-ts-progress.js history
```

---

## 🔗 Related Documentation

- **Error Analysis:** See `ts-error-analysis.json` for detailed breakdown
- **Project Guidelines:** See `CLAUDE.md` for development practices
- **Build Configuration:** See `next.config.mjs` and `tsconfig.json`

---

## 📞 Questions & Support

If you encounter complex issues:

1. Check error patterns in the analysis report
2. Review TypeScript documentation for specific error codes
3. Test changes incrementally
4. Use `npx tsc --noEmit --pretty` for better error formatting

---

**Last Updated:** 2025-10-29
**Baseline Errors:** 624
**Current Target:** 200
**Status:** Phase 1 Ready to Start
