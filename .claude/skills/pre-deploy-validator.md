# Pre-Deploy Validator Skill

**Purpose:** Validate code before deployment to prevent 90% of deployment failures.

**When to use:** Run this before every `git push` or when you're about to deploy.

---

## Validation Checklist

### 1. Edge Runtime Compatibility Check

**What to check:**

- No `require()` statements in middleware or API routes that run on Edge runtime
- Use Web Crypto API (`crypto.getRandomValues()`) instead of Node crypto
- No Node.js-specific modules in Edge functions

**Files to scan:**

```bash
src/middleware.ts
src/app/api/**/route.ts
```

**Common violations:**

```typescript
❌ const crypto = require('crypto')
❌ const fs = require('fs')
❌ const path = require('path')
❌ crypto.randomBytes(16)

✅ import crypto from 'crypto' (Node runtime only)
✅ crypto.getRandomValues(new Uint8Array(16)) (Edge runtime)
✅ Use dynamic imports: const fs = await import('fs')
```

**Action:** Search for `require(` in middleware and API routes. If found, suggest Edge-compatible alternatives.

---

### 2. Environment Variables Validation

**Required environment variables:**

```bash
# Build-time (optional, validated separately)
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL

# Runtime (required)
OPENAI_API_KEY
ANTHROPIC_API_KEY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
WHATSAPP_ACCESS_TOKEN
```

**What to check:**

- All API keys use lazy initialization (not instantiated at module level)
- Environment variables accessed via `process.env` have fallbacks or error handling
- No hardcoded secrets in code

**Action:** Search for `new OpenAI()` and `new Anthropic()` at module level. Ensure they're in functions, not top-level.

---

### 3. Build Test

**Command to run:**

```bash
npm run build
```

**What to verify:**

- Build completes without errors
- No TypeScript errors
- No missing dependencies
- Bundle size is reasonable (<5MB for main bundle)

**Common build errors to catch:**

- Missing API keys causing build failures
- Import errors
- Type errors
- Circular dependencies

**Action:** Run build and capture output. If fails, analyze error and suggest fixes.

---

### 4. Middleware Authentication Check

**What to check:**

- Public routes are accessible without authentication
- `/`, `/courses`, `/about`, `/contact` don't require auth
- `/api/health` is publicly accessible
- Protected routes like `/dashboard`, `/admin` require auth

**Files to check:**

```typescript
src/middleware.ts - PUBLIC_ROUTES array
src/middleware.ts - PROTECTED_ROUTES array
```

**Action:** Verify PUBLIC_ROUTES includes all public-facing pages.

---

### 5. Next.js Configuration Validation

**File:** `next.config.js`

**What to check:**

- `output: 'standalone'` for Vercel deployment
- Image optimization configured correctly
- No conflicting webpack configurations
- Environment-specific settings properly configured

**Action:** Validate next.config.js structure and warn about potential issues.

---

### 6. Dependency Check

**What to check:**

- No peer dependency warnings
- All dependencies have compatible versions
- No known security vulnerabilities

**Commands:**

```bash
npm audit
npm outdated (informational only)
```

**Action:** Run audit and report critical/high vulnerabilities.

---

## Execution Flow

1. **Run Build Test**

   ```bash
   npm run build 2>&1 | tee build.log
   ```

2. **Scan for Edge Runtime Issues**

   ```bash
   grep -r "require(" src/middleware.ts src/app/api/
   ```

3. **Check Lazy Initialization**

   ```bash
   grep -r "new OpenAI()" src/lib/ src/app/
   grep -r "new Anthropic()" src/lib/ src/app/
   ```

4. **Validate Middleware**
   - Check PUBLIC_ROUTES array
   - Verify authentication logic

5. **Generate Report**

   ```markdown
   ## Pre-Deploy Validation Report

   ✅ Edge Runtime Compatibility: PASSED
   ✅ Environment Variables: PASSED
   ❌ Build Test: FAILED

   - Error: Missing crypto import
   - Fix: Add Web Crypto API usage
     ✅ Middleware Auth: PASSED
     ✅ Next.js Config: PASSED
     ✅ Dependencies: PASSED (2 warnings)

   ## Recommendations:

   1. Fix build error in src/middleware.ts:320
   2. Update axios to latest version (security patch)

   ## Safe to Deploy: NO

   Fix 1 critical issue before deployment.
   ```

---

## Auto-Fix Capabilities

**Can auto-fix:**

- Replace `require('crypto')` with Web Crypto API
- Add PUBLIC_ROUTES to middleware
- Update environment variable usage to lazy initialization

**Requires manual review:**

- Complex authentication logic changes
- Breaking API changes
- Database schema modifications

---

## Usage

**Command line:**

```bash
npm run pre-deploy-validate
```

**In Claude Code:**

```
Run pre-deploy-validator skill
```

**Git hook (recommended):**

```bash
# .husky/pre-push
npm run pre-deploy-validate || exit 1
```

---

## Success Criteria

Deploy only if:

- ✅ Build passes
- ✅ No Edge runtime violations
- ✅ All critical environment variables lazy-loaded
- ✅ Public routes accessible
- ✅ No critical security vulnerabilities

**Estimated time saved:** 30-60 minutes per deployment
**Failure prevention rate:** ~90%
