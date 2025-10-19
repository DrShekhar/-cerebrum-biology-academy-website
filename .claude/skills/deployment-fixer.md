# Deployment Fixer Skill

**Purpose:** Auto-detect and fix common deployment errors based on GitHub Actions logs and Vercel deployment status.

**When to use:** After a deployment fails or when troubleshooting production issues.

---

## Error Detection Patterns

### 1. MIDDLEWARE_INVOCATION_FAILED

**Error signature:**

```
500: INTERNAL_SERVER_ERROR
Code: MIDDLEWARE_INVOCATION_FAILED
```

**Common causes:**

1. Using `require()` in Edge runtime
2. Node.js-specific APIs in middleware
3. Missing or incorrect crypto usage

**Auto-fix:**

```typescript
// Find and replace
require('crypto') → Web Crypto API
crypto.randomBytes() → crypto.getRandomValues()
Buffer.toString('base64') → btoa()
```

**Files to check:**

- `src/middleware.ts`
- Any API routes with `export const runtime = 'edge'`

---

### 2. Missing API Keys (Build Failures)

**Error signature:**

```
Error: Missing credentials. Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.
```

**Common causes:**

1. AI clients instantiated at module level
2. No lazy initialization
3. API keys accessed during build phase

**Auto-fix:**

```typescript
// Convert module-level to lazy initialization
❌ const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

✅ let openai: OpenAI | null = null
✅ function ensureOpenAI() {
     if (!openai && process.env.OPENAI_API_KEY) {
       openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
     }
     if (!openai) throw new Error('OpenAI API key not configured')
     return openai
   }
```

**Detection command:**

```bash
grep -rn "new OpenAI({" src/ | grep -v "function\|const.*=.*null"
grep -rn "new Anthropic({" src/ | grep -v "function\|const.*=.*null"
```

---

### 3. Prisma DATABASE_URL Missing

**Error signature:**

```
Error: Environment variable not found: DATABASE_URL
Error code: P1012
```

**Common causes:**

1. DATABASE_URL not set in GitHub Secrets
2. DATABASE_URL not passed to build step
3. Prisma validation running without env var

**Auto-fix:**

1. Check if DATABASE_URL is in GitHub Secrets
2. Ensure workflow passes DATABASE_URL to Prisma steps:
   ```yaml
   env:
     DATABASE_URL: ${{ secrets.DATABASE_URL }}
   ```
3. If DATABASE_URL doesn't exist, recommend using connection pooler URL

---

### 4. Preview vs Production Deployment

**Error signature:**

```
Deployed to preview: https://...vercel.app
Expected: Production deployment
```

**Common causes:**

1. Missing `--prod` flag in vercel deploy command
2. Workflow not detecting push to main branch
3. Manual workflow_dispatch without environment input

**Auto-fix:**

```yaml
# In .github/workflows/production-deployment.yml
- name: Deploy to Vercel
  run: |
    if [ "${{ github.event_name }}" == "push" ] && [ "${{ github.ref }}" == "refs/heads/main" ]; then
      vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
    else
      vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
    fi
```

---

### 5. Type Errors in Build

**Error signature:**

```
Type error: Property 'xyz' does not exist on type 'ABC'
```

**Common causes:**

1. Missing type definitions
2. Incorrect import statements
3. TypeScript version mismatch

**Auto-fix:**

1. Run `npm install --save-dev @types/node @types/react`
2. Check `tsconfig.json` for correct settings
3. Verify import paths are correct

---

### 6. Circular Dependency

**Error signature:**

```
Warning: Circular dependency detected
```

**Common causes:**

1. Files importing each other
2. Barrel exports (index.ts) causing cycles

**Auto-fix:**

1. Identify cycle: Use `madge` tool
2. Suggest breaking cycle with dependency injection
3. Move shared types to separate file

---

### 7. Authentication Blocking Public Routes

**Error signature:**

```
401: Unauthorized
Route: / (homepage)
```

**Common causes:**

1. Middleware requiring auth for all routes
2. PUBLIC_ROUTES not defined
3. Auth check before route matching

**Auto-fix:**

```typescript
// Add to middleware.ts
const PUBLIC_ROUTES = ['/', '/courses', '/about', '/contact', '/pricing', '/faculty']

const isPublicRoute = PUBLIC_ROUTES.some(
  (route) => pathname === route || pathname.startsWith(`${route}/`)
)

// Skip auth for public routes
if (isProtected && !isPublicAPI && !isPublicRoute) {
  const authResponse = await checkAuthentication(request)
  if (authResponse) return authResponse
}
```

---

## Execution Flow

### 1. Detect Error Type

**From GitHub Actions logs:**

```bash
gh run view <run-id> --log-failed
```

**Parse error patterns:**

- Look for "Error:", "Failed", "500", "401", "MIDDLEWARE_INVOCATION_FAILED"
- Extract file paths and line numbers
- Identify error category

### 2. Analyze Root Cause

**Check recent commits:**

```bash
git log --oneline -5
git diff HEAD~1 <affected-file>
```

**Identify what changed:**

- New files added
- Dependencies updated
- Configuration modified
- API routes changed

### 3. Suggest Fix

**Generate fix report:**

````markdown
## Deployment Failure Analysis

**Error:** MIDDLEWARE_INVOCATION_FAILED (500)
**File:** src/middleware.ts:320
**Cause:** Using Node.js crypto in Edge runtime

### Recommended Fix:

Replace line 320:

```typescript
❌ const crypto = require('crypto')
   return crypto.randomBytes(16).toString('base64')

✅ const array = new Uint8Array(16)
   crypto.getRandomValues(array)
   return btoa(String.fromCharCode(...array))
```
````

### Auto-Apply Fix?

[Yes] [No] [Show Diff]

````

### 4. Apply Fix (with approval)

**If user approves:**
1. Create branch: `fix/deployment-<timestamp>`
2. Apply fix
3. Run build test
4. If passes, commit and push
5. Monitor deployment

---

## Learning from Failures

### Error Pattern Database

**Store in:** `.claude/deployment-errors.json`

```json
{
  "errors": [
    {
      "pattern": "MIDDLEWARE_INVOCATION_FAILED",
      "file": "src/middleware.ts",
      "fix": "Replace require('crypto') with Web Crypto API",
      "occurrences": 3,
      "lastSeen": "2025-01-19",
      "resolution": "Applied auto-fix",
      "timeToResolve": "5 minutes"
    }
  ]
}
````

**Benefits:**

- Faster diagnosis of recurring issues
- Pattern recognition for similar errors
- Measure effectiveness of fixes

---

## Integration with CI/CD

### GitHub Actions Integration

**Add to workflow:**

```yaml
- name: Auto-Fix Deployment Errors
  if: failure()
  run: |
    # Run deployment-fixer skill
    claude skill deployment-fixer analyze-failure
```

### Vercel Integration

**Webhook handler:**

```typescript
// /api/webhooks/vercel-deployment
export async function POST(req: Request) {
  const { deployment, error } = await req.json()

  if (error) {
    // Trigger deployment-fixer
    await runDeploymentFixer(error)
  }
}
```

---

## Auto-Fix Safety

**Before applying any fix:**

1. ✅ Create git branch
2. ✅ Run build test
3. ✅ Show diff to user
4. ✅ Get explicit approval
5. ✅ Commit with clear message

**Never auto-fix without approval:**

- Database schema changes
- Authentication logic
- Payment processing code
- User data handling

---

## Usage

**Automatic (on deployment failure):**

```bash
# Triggered by failed GitHub Actions workflow
deployment-fixer auto-analyze
```

**Manual:**

```bash
# Analyze specific deployment
deployment-fixer analyze --run-id=<github-actions-run-id>

# Analyze current codebase
deployment-fixer scan-issues

# Apply specific fix
deployment-fixer apply-fix --error-type=middleware-invocation
```

**In Claude Code:**

```
Run deployment-fixer skill
```

---

## Success Metrics

**Track:**

- Number of auto-detected errors
- Auto-fix success rate
- Time saved per fix
- Deployment success rate improvement

**Target:**

- 95% error detection rate
- 80% auto-fix success rate
- Average 15 minutes saved per deployment
- Deployment success rate: 95%+

---

## Example Workflow

```
1. Deployment fails ❌
2. deployment-fixer auto-detects: MIDDLEWARE_INVOCATION_FAILED
3. Analyzes src/middleware.ts:320
4. Suggests: Replace require('crypto') with Web Crypto API
5. Shows diff
6. User approves ✅
7. Applies fix
8. Runs build test ✅
9. Commits fix
10. Pushes to GitHub
11. Deployment succeeds ✅

Total time: 5 minutes (vs 30-60 minutes manual debugging)
```
