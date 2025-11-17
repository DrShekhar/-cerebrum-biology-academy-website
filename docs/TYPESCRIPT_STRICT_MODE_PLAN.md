# TypeScript Strict Mode Migration Plan

## Overview

This document outlines the strategy for gradually enabling TypeScript strict mode across the Cerebrum Biology Academy codebase.

## Current State

- **TypeScript Version**: Latest (as per package.json)
- **Strict Mode**: Disabled
- **Current Errors**: 70+ type errors
- **Main Issues**:
  1. ZodError `.errors` property access (50+ occurrences)
  2. Logger default export conflicts (5 files)
  3. React Hook Form type mismatches (3 components)
  4. Zod schema API changes (2 files)
  5. Missing function arguments (3 files)

## Error Categories

### Category 1: Zod Error Handling (Highest Priority)

**Impact**: 50+ files
**Issue**: Accessing `.errors` property on ZodError which doesn't exist
**Fix**: Use `.issues` or `.errors` (depending on Zod version)

```typescript
// Current (incorrect):
catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ errors: error.errors }, { status: 400 })
  }
}

// Correct:
catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ errors: error.issues }, { status: 400 })
  }
}
```

### Category 2: Logger Export Issues

**Impact**: 5 files
**Issue**: Module has both named and default exports causing conflicts
**Status**: Already fixed in `/src/lib/utils/index.ts` but TypeScript cache may be stale

**Files affected**:

- `src/app/api/cron/cleanup-otp/route.ts`
- `src/lib/auth/otpCleanup.ts`
- `src/lib/middleware/logging.ts`
- `src/lib/ratelimit/config.ts`
- `src/lib/ratelimit/middleware.ts`

### Category 3: React Hook Form Type Mismatches

**Impact**: 3 components
**Issue**: Resolver type incompatibility between different versions
**Fix**: Explicitly type the form data and resolver

**Files affected**:

- `src/components/admin/AddLeadForm.tsx`
- `src/components/admin/AddPaymentForm.tsx`
- `src/components/admin/AddStudentForm.tsx`

### Category 4: Zod Schema API Changes

**Impact**: 2 files
**Issue**: Using old Zod API that has been updated
**Fix**: Update to new API syntax

**Files affected**:

- `src/app/api/purchase/route.ts` (z.enum syntax)
- `src/app/api/courses/enhanced/route.ts` (logger.info arguments)

### Category 5: Function Argument Count

**Impact**: 3 files
**Issue**: Calling functions with wrong number of arguments
**Fix**: Add missing arguments or update function signature

## Migration Strategy

### Phase 1: Fix Breaking Errors (Current)

**Goal**: Fix all 70+ TypeScript errors without enabling strict mode
**Estimated Time**: 2-3 hours

1. ✅ Fix Zod error handling (50+ files)
2. ✅ Verify logger exports work correctly
3. ✅ Fix React Hook Form type issues
4. ✅ Update Zod schema syntax
5. ✅ Fix function call signatures

### Phase 2: Enable Basic Strict Checks (Next Session)

**Goal**: Enable individual strict mode flags
**Estimated Time**: 2-3 hours

```json
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true, // ← Enable first
    "strictNullChecks": false,
    "strictFunctionTypes": true, // ← Enable second
    "strictBindCallApply": true, // ← Enable third
    "strictPropertyInitialization": false
  }
}
```

### Phase 3: Enable Null Checks (Future)

**Goal**: Add null/undefined handling
**Estimated Time**: 4-6 hours

1. Add optional chaining (`?.`)
2. Add nullish coalescing (`??`)
3. Enable `strictNullChecks`
4. Fix remaining errors

### Phase 4: Full Strict Mode (Future)

**Goal**: Enable all strict mode flags
**Estimated Time**: 3-4 hours

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## Implementation Plan for Phase 1

### Step 1: Create Utility Function for Zod Errors

```typescript
// src/lib/utils/zodErrors.ts
import { ZodError } from 'zod'

export function formatZodErrors(error: ZodError) {
  return {
    errors: error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  }
}
```

### Step 2: Update All Zod Error Handlers

Use find/replace across all API routes:

- Find: `error.errors`
- Replace: `error.issues`

### Step 3: Clear TypeScript Cache

```bash
rm -rf .next
rm -rf node_modules/.cache
npx tsc --noEmit
```

### Step 4: Fix React Hook Form Types

Add explicit types to form components and ensure resolver compatibility.

### Step 5: Update Zod Schemas

Fix deprecated API usage in affected files.

### Step 6: Verify Build

```bash
npx tsc --noEmit
npm run build
```

## Success Criteria

### Phase 1 Complete When:

- ✅ Zero TypeScript errors with current config
- ✅ `npx tsc --noEmit` passes
- ✅ `npm run build` succeeds
- ✅ All tests pass
- ✅ No runtime errors in development

### Phase 2 Complete When:

- ✅ `noImplicitAny: true` enabled
- ✅ `strictFunctionTypes: true` enabled
- ✅ `strictBindCallApply: true` enabled
- ✅ All TypeScript errors fixed
- ✅ Build succeeds

### Phase 3 Complete When:

- ✅ `strictNullChecks: true` enabled
- ✅ All null/undefined handling added
- ✅ Build succeeds

### Phase 4 Complete When:

- ✅ `strict: true` enabled
- ✅ All TypeScript errors resolved
- ✅ Production build succeeds

## Benefits

### Immediate (Phase 1):

- Catch more bugs at compile time
- Better IDE autocomplete
- Safer refactoring

### Long-term (Phase 4):

- Prevent null reference errors
- Safer type inference
- Better code quality
- Reduced runtime errors
- Easier onboarding for new developers

## Risk Mitigation

1. **Gradual approach**: Enable one flag at a time
2. **Testing**: Run full test suite after each phase
3. **Rollback plan**: Can disable flags if issues arise
4. **Documentation**: Document all changes
5. **Team communication**: Update team on progress

## Notes

- Some `any` types may be intentional (external APIs, dynamic data)
- Focus on fixing real type errors first
- Don't over-engineer types initially
- Pragmatic approach: Fix errors that matter most
- Build confidence incrementally
