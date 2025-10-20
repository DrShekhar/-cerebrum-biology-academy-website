# Standard Operating Procedures (SOP) for TypeScript Development

## Cerebrum Biology Academy - Development Best Practices

**Last Updated:** December 2024
**Purpose:** Prevent TypeScript errors and maintain code quality based on lessons learned from CI/CD fixes

---

## Table of Contents

1. [Type Safety & TypeScript Best Practices](#1-type-safety--typescript-best-practices)
2. [Framer Motion Integration](#2-framer-motion-integration)
3. [Next.js & React Patterns](#3-nextjs--react-patterns)
4. [Database & Prisma](#4-database--prisma)
5. [Component Development](#5-component-development)
6. [API Routes & Middleware](#6-api-routes--middleware)
7. [Security & Authentication](#7-security--authentication)
8. [Testing & Validation](#8-testing--validation)
9. [Pre-Commit Checklist](#9-pre-commit-checklist)
10. [Common Errors & Solutions](#10-common-errors--solutions)

---

## 1. Type Safety & TypeScript Best Practices

### 1.1 Interface Completeness

**Rule:** Always ensure all required properties are provided when implementing interfaces.

**Bad:**

```typescript
const mockTest: MockTest = {
  id: 'test-1',
  title: 'Sample Test',
  // Missing: targetClass, classRequirements, adaptiveSettings
}
```

**Good:**

```typescript
const mockTest: MockTest = {
  id: 'test-1',
  title: 'Sample Test',
  targetClass: 'all',
  classRequirements: {
    minimumClass: 'class-11',
    recommendedFor: ['class-11', 'class-12', 'dropper'],
    difficultyByClass: {
      'class-11': 'easy',
      'class-12': 'medium',
      dropper: 'hard',
    },
  },
  adaptiveSettings: {
    enableAdaptive: true,
    questionPoolByClass: {
      'class-11': ['q1'],
      'class-12': ['q1', 'q2'],
      dropper: ['q1', 'q2', 'q3'],
    },
    progressionRules: {
      easyToMediumThreshold: 70,
      mediumToHardThreshold: 85,
    },
  },
  // ... all other required properties
}
```

### 1.2 Type Guards for Union Types

**Rule:** Always use type guards when working with union types.

**Bad:**

```typescript
const session = await validateUserSession(req).catch(() => ({ valid: false }))
// TypeScript infers union type: UserSession | { valid: false }
```

**Good:**

```typescript
const session = await validateUserSession(req).catch((): UserSession => ({ valid: false }))
// Explicit return type ensures type safety
```

### 1.3 Deprecated String Methods

**Rule:** Replace deprecated `substr()` with `substring()`.

**Bad:**

```typescript
const id = Math.random().toString(36).substr(2, 9)
```

**Good:**

```typescript
const id = Math.random().toString(36).substring(2, 11)
```

### 1.4 Module Re-exports

**Rule:** Re-export types and utilities from centralized modules.

**Bad:**

```typescript
// src/lib/database.ts
import { prisma } from './prisma'
export { prisma }
// Missing: healthCheck, TestService, QuestionService
```

**Good:**

```typescript
// src/lib/database.ts
export * from './database' // Re-exports all services
export { prisma } from './prisma'
export default prisma
```

### 1.5 Type Declaration Files (.d.ts)

**Rule:** Do NOT explicitly import `.d.ts` files - TypeScript picks them up automatically.

**Bad:**

```typescript
import '@/types/analytics' // Causes webpack module resolution error
import '@/types/speech.d.ts' // Never import .d.ts files

export const useAnalytics = () => {
  // TypeScript can't find the types during build
}
```

**Good:**

```typescript
// No import needed - types are automatically available
// Just create the .d.ts file in src/types/ directory

// src/types/analytics.d.ts
declare global {
  interface Window {
    fbq: FacebookPixel
  }
}

// src/hooks/useAnalytics.ts
export const useAnalytics = () => {
  // TypeScript automatically finds and uses the types
  window.fbq('track', 'PageView')
}
```

**Why:**

- `.d.ts` files are ambient type declarations
- TypeScript compiler automatically includes them
- Explicit imports cause webpack errors: "Module not found: Can't resolve '@/types/analytics'"
- Build will fail even though type-check passes

---

## 2. Framer Motion Integration

### 2.1 Transition Easing Types

**Rule:** Use proper easing types for Framer Motion transitions.

**Bad:**

```typescript
<motion.div
  transition={{ duration: 0.3, ease: 'easeInOut' }} // String not assignable to Easing
/>
```

**Good:**

```typescript
<motion.div
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
/>

// Or use typed animation configurations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
}
```

### 2.2 Event Handler Updates

**Rule:** Use current Framer Motion event handlers, not deprecated ones.

**Bad:**

```typescript
<motion.button
  onTapStart={() => {}}
  onTapEnd={() => {}}
/>
```

**Good:**

```typescript
<motion.button
  onPointerDown={() => {}}
  onPointerUp={() => {}}
  onTap={() => {}} // Keep for motion-specific tap behavior
/>
```

### 2.3 WhileHover Transition Types

**Rule:** Type whileHover transitions properly or use type assertions for complex animations.

**Bad:**

```typescript
<motion.div
  whileHover={{
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300 } // Type error
  }}
/>
```

**Good:**

```typescript
<motion.div
  whileHover={{
    scale: 1.02,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
  }}
/>
```

---

## 3. Next.js & React Patterns

### 3.1 NextRequest Properties

**Rule:** NextRequest doesn't have `.ip` property. Use headers instead.

**Bad:**

```typescript
const ip = request.ip // Property 'ip' does not exist
```

**Good:**

```typescript
const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
```

### 3.2 API Route Handlers (Next.js 15)

**Rule:** Use proper type annotations for Next.js 15 API routes.

**Bad:**

```typescript
export async function POST(req: Request) {
  // Missing route context parameter
}
```

**Good:**

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  // Properly typed
}
```

### 3.3 Component Prop Interfaces

**Rule:** Define complete prop interfaces with all required and optional properties.

**Bad:**

```typescript
interface PremiumButtonProps {
  children: ReactNode
  variant?: string
  // Missing: type, onClick, className, etc.
}
```

**Good:**

```typescript
interface PremiumButtonProps {
  children: ReactNode
  variant?: 'medical' | 'luxury' | 'hover'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  disabled?: boolean
}
```

### 3.4 JSX Element Type Constraints

**Rule:** Constrain JSX element types to specific string literals, not generic types.

**Bad:**

```typescript
type Tag = keyof JSX.IntrinsicElements // Too broad
const Component = <Tag {...props} /> // Error: cannot use as JSX component
```

**Good:**

```typescript
type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
const Component = <Tag {...props} /> // Works!
```

---

## 4. Database & Prisma

### 4.1 Enum Types

**Rule:** Import and use Prisma enum types, not string literals.

**Bad:**

```typescript
await prisma.question.create({
  data: {
    type: 'MCQ', // String not assignable to QuestionType
  },
})
```

**Good:**

```typescript
import { QuestionType, TestType } from '@prisma/client'

await prisma.question.create({
  data: {
    type: QuestionType.MCQ,
  },
})
```

### 4.2 Type vs Regular Imports

**Rule:** Use regular imports for enums, not type imports.

**Bad:**

```typescript
import type { ResourceCategory } from '@prisma/client'
const category = ResourceCategory.VIDEO // Error: only refers to a type
```

**Good:**

```typescript
import { ResourceCategory } from '@prisma/client'
const category = ResourceCategory.VIDEO // Works!
```

### 4.3 Object Structure for Arrays

**Rule:** Match the exact structure expected by interfaces (object vs array of objects).

**Bad:**

```typescript
interface QuestionBank {
  sources: {
    previousYear: number
    custom: number
    ncert: number
  }[]
}

const bank: QuestionBank = {
  sources: [{ previousYear: 600 }, { custom: 1500 }, { ncert: 400 }],
}
```

**Good:**

```typescript
const bank: QuestionBank = {
  sources: [
    {
      previousYear: 600,
      custom: 1500,
      ncert: 400,
    },
  ],
}
```

---

## 5. Component Development

### 5.1 Missing Utility Functions

**Rule:** Always import or define utility functions before use.

**Bad:**

```typescript
const handleClick = () => {
  trackFormInteraction('button_click') // Function not found
}
```

**Good:**

```typescript
import { trackEvent } from '@/hooks/useAnalytics'

const handleClick = () => {
  trackEvent('form_interaction', { action: 'button_click' })
}
```

### 5.2 Browser API Type Declarations

**Rule:** Create global type declarations for browser APIs in `src/types/` directory.

**Bad:**

```typescript
// In component file
interface SpeechRecognition {
  // Duplicate declarations cause conflicts
}
```

**Good:**

```typescript
// src/types/speech.d.ts
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: (event: SpeechRecognitionEvent) => void
}
```

### 5.3 Optional Chaining & Nullish Coalescing

**Rule:** Use optional chaining for nested properties.

**Bad:**

```typescript
const weightage = preferences.biologyFocus.practicalWeightage
// Error if biologyFocus is undefined
```

**Good:**

```typescript
const weightage = preferences.biologyFocus?.practicalWeightage || 0.3
```

### 5.4 Type Guards for Element Types

**Rule:** Use type guards before accessing element-specific properties.

**Bad:**

```typescript
element.style.transform = 'scale(1.1)' // Error: style doesn't exist on Element
```

**Good:**

```typescript
if (element instanceof HTMLElement) {
  element.style.transform = 'scale(1.1)'
}
```

---

## 6. API Routes & Middleware

### 6.1 Crypto API Updates

**Rule:** Use authenticated encryption (GCM mode) instead of deprecated methods.

**Bad:**

```typescript
import crypto from 'crypto'
const cipher = crypto.createCipher('aes-256-cbc', key) // Deprecated
```

**Good:**

```typescript
import crypto from 'crypto'

const iv = crypto.randomBytes(16)
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv) as crypto.CipherGCM
cipher.setAAD(Buffer.from('additional-data'))
const encrypted = cipher.update(plaintext, 'utf8', 'hex') + cipher.final('hex')
const authTag = cipher.getAuthTag()
```

### 6.2 Redis Configuration

**Rule:** Remove invalid Redis options.

**Bad:**

```typescript
const cluster = new Redis.Cluster(nodes, {
  retryDelayOnFailover: 100, // Invalid option
})
```

**Good:**

```typescript
const cluster = new Redis.Cluster(nodes, {
  clusterRetryStrategy: (times) => Math.min(times * 50, 2000),
}) as Redis.Cluster
```

---

## 7. Security & Authentication

### 7.1 User Type Consistency

**Rule:** Ensure User type matches across auth system and database schema.

**Bad:**

```typescript
const user: User = {
  phone: session.user.profile?.phone, // User interface doesn't have 'phone'
}
```

**Good:**

```typescript
const user: User = {
  mobile: session.user.profile?.phone || '',
  isMobileVerified: false,
  isEmailVerified: false,
  communicationPreference: 'whatsapp' as const,
}
```

### 7.2 Session Type Annotations

**Rule:** Provide explicit type annotations for catch handlers.

**Bad:**

```typescript
const session = await validateUserSession(req).catch(() => ({ valid: false }))
```

**Good:**

```typescript
import { type UserSession } from '@/lib/auth/config'

const session = await validateUserSession(req).catch((): UserSession => ({ valid: false }))
```

---

## 8. Testing & Validation

### 8.1 Pre-Commit Type Checking

**Rule:** Always run type-check before committing.

```bash
npm run type-check
```

### 8.2 Incremental Type Safety

**Rule:** When fixing large codebases, use `continue-on-error` temporarily during migration.

```yaml
# .github/workflows/comprehensive-testing.yml
- name: Type checking
  run: npm run type-check
  continue-on-error: true
  # TODO: Remove after fixing all TypeScript errors
```

### 8.3 Prettier Formatting

**Rule:** Run prettier on files with complex string interpolations.

```bash
npx prettier --write src/lib/ai/*.ts
```

### 8.4 Build Verification

**Rule:** ALWAYS test production build locally on localhost before creating PR or merging to main.

```bash
# Clean previous builds
npm run clean

# Run type check
npm run type-check

# Build for production
npm run build

# If build succeeds, test the production server
npm run start

# Test in browser at http://localhost:3000
# Verify:
# - Homepage loads with correct styling
# - Navigation works across pages
# - No console errors
# - All dynamic features work
```

**Critical Warnings:**

1. **Type-check passing ≠ Build success:** Webpack may fail on module resolution issues that TypeScript doesn't catch.

2. **Build success ≠ Runtime success:** Production build may compile but break at runtime due to:
   - Edge Runtime vs Node.js Runtime mismatches
   - Client/Server component boundaries
   - Environment variable issues
   - Database connection problems
   - API route configuration errors

3. **NEVER merge without local testing:** Even if CI passes, ALWAYS test the production build locally on your machine before creating a PR. This prevents deploying broken code to production.

**Why This Matters:**

In a recent incident, 148 TypeScript errors were fixed and the build compiled successfully, but the website was completely broken in production due to:

- Prisma Edge Runtime false positive detection
- Loading screen blocking homepage
- Middleware crypto API incompatibility
- Missing runtime directives on API routes

**Local testing caught all these issues before deployment.**

---

## 9. Pre-Commit Checklist

Before committing code, verify:

- [ ] **Type Check Passes:** `npm run type-check`
- [ ] **ESLint Passes:** `npm run lint`
- [ ] **Prettier Formatted:** `npm run format`
- [ ] **Production Build Succeeds:** `npm run build` (REQUIRED before PR)
- [ ] **Production Server Runs:** `npm run start` and test in browser
- [ ] **All Required Properties:** Interfaces fully implemented
- [ ] **No Deprecated APIs:** No `substr()`, `createCipher()`, etc.
- [ ] **Type Guards Used:** For union types and browser APIs
- [ ] **Proper Imports:** Enums imported as values, not types
- [ ] **Security Headers:** Added to all API routes
- [ ] **Error Handling:** All async functions have try-catch
- [ ] **Tests Pass:** `npm test` (if applicable)

**Before Creating Pull Request (MANDATORY):**

- [ ] **Clean Build:** `npm run clean && npm run build`
- [ ] **Test Localhost:** Visit http://localhost:3000 after `npm run start`
- [ ] **Homepage Works:** Verify styling and navigation
- [ ] **No Console Errors:** Check browser console for errors
- [ ] **Dynamic Routes Work:** Test /thank-you, /enrollment, etc.
- [ ] **Production-Ready:** Confirm website functions correctly

---

## 10. Common Errors & Solutions

### Error: "Property X does not exist on type Y"

**Solution:**

1. Check if property exists in interface definition
2. Add property to interface if needed
3. Use optional chaining if property may not exist
4. Add type guard to narrow type before access

### Error: "Type X is not assignable to type Y"

**Solution:**

1. Use type assertion if you're certain: `value as TargetType`
2. Add explicit return type annotation
3. Use type guard to narrow union types
4. Check for missing properties in object literals

### Error: "Cannot find module X"

**Solution:**

1. Create the missing module/component
2. Fix the import path
3. Add to package.json if external dependency
4. Create type declaration file for JS libraries

### Error: "Deprecated method X"

**Solution:**

- `substr()` → `substring()`
- `createCipher()` → `createCipheriv()`
- `onTapStart` → `onPointerDown`
- `onTapEnd` → `onPointerUp`

### Error: "JSX element type X is not valid"

**Solution:**

1. Constrain type to specific string literals
2. Use `ElementType` from React for dynamic components
3. Ensure proper type guards for conditional rendering

### Error: "Module not found: Can't resolve '@/types/analytics'"

**Symptoms:**

- `npm run type-check` passes ✅
- `npm run build` fails ❌
- Error: "Module not found: Can't resolve '@/types/analytics'"

**Root Cause:**
Explicitly importing `.d.ts` files causes webpack module resolution errors.

**Solution:**

```typescript
// ❌ BAD - Remove this import
import '@/types/analytics'

// ✅ GOOD - No import needed
// TypeScript automatically picks up .d.ts files from src/types/
```

**Prevention:**

1. Never import `.d.ts` files
2. Place type declarations in `src/types/` directory
3. Use `declare global` for global type augmentation
4. Always run `npm run build` before creating PR

---

## Emergency Procedures

### When CI/CD Fails

1. **Check workflow logs:** Identify which step failed
2. **Run locally:** `npm run type-check` and `npm run lint`
3. **Fix incrementally:** Focus on one category of errors at a time
4. **Use continue-on-error:** Only if fixing will take multiple PRs
5. **Document technical debt:** Create GitHub issue for tracking

### When Production Has Type Errors

1. **Hotfix branch:** Create from main/develop
2. **Minimal changes:** Fix only the critical error
3. **Quick testing:** Verify fix with type-check
4. **Fast merge:** Get PR reviewed and merged ASAP
5. **Follow-up:** Create issue for comprehensive fix

---

## Resources

- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **Next.js TypeScript:** https://nextjs.org/docs/basic-features/typescript
- **Framer Motion Types:** https://www.framer.com/motion/
- **Prisma Client:** https://www.prisma.io/docs/concepts/components/prisma-client
- **React TypeScript Cheatsheet:** https://react-typescript-cheatsheet.netlify.app/

---

## Revision History

| Version | Date     | Changes                                     | Author      |
| ------- | -------- | ------------------------------------------- | ----------- |
| 1.0     | Dec 2024 | Initial SOP based on TypeScript CI/CD fixes | Claude Code |

---

**Remember:** Type safety is not a burden—it's a safeguard that catches bugs before they reach production. Invest time in proper typing now to save debugging time later.

**Questions?** Review the error patterns in this SOP or consult the TypeScript documentation.

**Continuous Improvement:** Update this SOP as new patterns and best practices emerge.
