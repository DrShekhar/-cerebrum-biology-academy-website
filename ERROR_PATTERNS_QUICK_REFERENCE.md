# Quick Reference: Systematic Error Patterns

## Critical Issues Found

### 1. Database Fallback to Mock (CRITICAL - Data Loss)

**Location**: `src/lib/prisma.ts:37-39`

```typescript
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not found, using mock Prisma client')
  return new MockPrismaClient() as any // SILENTLY FAILS!
}
```

**Impact**: All data operations return empty results without error
**Fix**: Throw error instead of silently falling back

---

### 2. WhatsApp & SMS Always Succeed (Data Loss)

**Location**: `src/app/api/auth/send-otp/route.ts:74-95`

```typescript
async function sendSMSOTP(mobile: string, otp: string): Promise<boolean> {
  // Mock implementation - never actually sends
  return true // ALWAYS TRUE!
}
```

**Impact**: Users told OTP sent when it wasn't
**Fix**: Integrate real SMS API (Twilio, MSG91, etc.)

---

### 3. Payment Webhook No Verification (SECURITY - Fraud)

**Location**: `src/app/api/webhooks/payments/route.ts`
**Impact**: Any webhook call processed without signature check
**Fix**: Add signature verification before processing

---

### 4. JWT Secret Fallback (SECURITY - Token Forgery)

**Location**: `src/lib/auth/config.ts:13-19`

```typescript
const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-change-in-production'
  if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
    console.warn('JWT_SECRET not set - using fallback (INSECURE)')
  }
  return secret // STILL USES FALLBACK!
}
```

**Fix**: Throw error if not set in production

---

### 5. Dual Database Pattern (INCONSISTENCY)

**Databases**:

- Prisma (PostgreSQL) - used in some routes
- InstantDB (NoSQL) - used in other routes
  **Problem**: No sync mechanism, data inconsistency
  **Fix**: Choose one, migrate data, remove other

**Routes using InstantDB**:

- `src/app/api/auth/send-otp/route.ts`
- All routes in `src/app/api/auth/` use adminDb queries

**Routes using Prisma**:

- `src/app/api/payments/create-order/route.ts`
- `src/app/api/enrollment/route.ts`

---

### 6. No Rate Limiting on AI Endpoints (DoS)

**Vulnerable Routes**:

- `/api/claudechat/analyze-biology-image`
- `/api/claudechat/process-voice`
- `/api/claudechat/voice-explanation`
- `/api/ai/unified-chat`
- `/api/ai/image-analysis`

**Fix**: Add middleware with express-rate-limit (already in package.json)

---

### 7. Missing Environment Variables

**Not Configured**:

```
NEXT_PUBLIC_INSTANT_APP_ID=  # EMPTY
INSTANT_APP_ADMIN_TOKEN=      # EMPTY
DIRECT_DATABASE_URL=          # Missing (needed for migrations)
RAZORPAY_WEBHOOK_SECRET=      # May not be set
```

**Consequence**: Admin operations silently fail, migrations can't run

---

### 8. TypeScript Errors Suppressed (Development Quality)

**Files**: `tsconfig.json`, `next.config.mjs`

```json
"strict": false,
"noImplicitAny": false,
"strictNullChecks": false
```

**Count**: 614+ TypeScript errors ignored
**Fix**: Re-enable strict mode, fix errors gradually

---

## Error Patterns by Route

### Auth Routes (`/src/app/api/auth/*`)

| Route        | Issue                          | Severity |
| ------------ | ------------------------------ | -------- |
| `send-otp`   | Mock SMS/WhatsApp              | CRITICAL |
| `send-otp`   | Uses InstantDB, not Prisma     | HIGH     |
| `verify-otp` | No rate limiting               | HIGH     |
| All auth     | Error swallowing in middleware | MEDIUM   |

### Payment Routes (`/src/app/api/payments/*`)

| Route               | Issue                     | Severity |
| ------------------- | ------------------------- | -------- |
| `create-order`      | Orphaned Prisma call      | HIGH     |
| `webhooks/payments` | No signature verification | CRITICAL |
| `verify`            | No idempotency check      | HIGH     |

### WhatsApp Routes (`/src/app/api/whatsapp/*`)

| Route        | Issue                         | Severity |
| ------------ | ----------------------------- | -------- |
| `send`       | Returns hardcoded "delivered" | CRITICAL |
| `automation` | No transaction consistency    | HIGH     |
| `webhook`    | No signature verification     | HIGH     |
| `ai-bot`     | Uses adminDb (InstantDB)      | MEDIUM   |

### AI Routes (`/src/app/api/ai/*`)

| Route            | Issue                                  | Severity |
| ---------------- | -------------------------------------- | -------- |
| `unified-chat`   | No rate limit                          | HIGH     |
| `image-analysis` | No rate limit                          | HIGH     |
| All AI routes    | Anthropic SDK peer dependency conflict | MEDIUM   |

---

## Configuration Issues

### next.config.mjs Problems

```javascript
// Line 69-74: Errors ignored during build
eslint: {
  ignoreDuringBuilds: true,
},
typescript: {
  ignoreBuildErrors: true,  // 614 errors!
},

// Line 79: Standalone mode (may cause issues)
output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

// Line 184: CORS too permissive
'Access-Control-Allow-Origin': '*',
```

### package.json Version Issues

```json
"@anthropic-ai/sdk": "^0.63.0",  // Requires zod ^3.25.0
"zod": "3.23.8",                  // May not satisfy peer dependency
"next-auth": "^5.0.0-beta.29",   // Beta version - unstable
```

---

## Quick Fix Checklist

### IMMEDIATE (Today)

- [ ] Verify .env.local is in .gitignore
- [ ] Check DATABASE_URL is set in Vercel dashboard
- [ ] Verify RAZORPAY_WEBHOOK_SECRET is set
- [ ] Set NEXT_PUBLIC_INSTANT_APP_ID and INSTANT_APP_ADMIN_TOKEN

### THIS WEEK

- [ ] Replace mock SMS/WhatsApp with real APIs
- [ ] Add signature verification to payment webhook
- [ ] Add JWT_SECRET check that throws in production
- [ ] Choose database: Prisma or InstantDB
- [ ] Add rate limiting to AI endpoints

### THIS MONTH

- [ ] Consolidate to single database
- [ ] Enable strict TypeScript mode
- [ ] Fix 614 TypeScript errors
- [ ] Test all error boundaries
- [ ] Verify Sentry monitoring works

---

## Code Snippets to Add

### Rate Limiter Middleware

```typescript
import rateLimit from 'express-rate-limit'

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later.',
})

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Stricter for AI endpoints
  message: 'Too many AI requests, please try again later.',
})
```

### Payment Webhook Verification

```typescript
import crypto from 'crypto'

export function verifyPaymentSignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex')
  return expectedSignature === signature
}
```

### Database Connection Validation

```typescript
// Replace in src/lib/prisma.ts
function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL environment variable is required. ' +
        'Please configure your database connection.'
    )
  }
  // ... rest of initialization
}
```

---

## Testing Checklist

- [ ] Test with DATABASE_URL missing
- [ ] Test with InstantDB credentials missing
- [ ] Test JWT_SECRET missing in production mode
- [ ] Test payment webhook with invalid signature
- [ ] Test OTP send without SMS gateway
- [ ] Hammer AI endpoints with 100 concurrent requests
- [ ] Verify error boundaries catch component errors
- [ ] Check all API routes log errors properly

---

## Monitoring Commands

### Check Type Errors

```bash
npm run type-check
# Should show 614 errors until fixed
```

### Check Lint Issues

```bash
npm run lint
# Currently ignored during build
```

### Run Tests

```bash
npm test
# Verify test coverage
```

### Check Environment Variables

```bash
node -e "console.log(process.env.DATABASE_URL ? 'Set' : 'Missing')"
```

---

## Reference Files

### Critical Files to Review

1. `src/lib/prisma.ts` - Database initialization
2. `src/lib/db-admin.ts` - InstantDB setup
3. `src/app/api/auth/send-otp/route.ts` - OTP logic
4. `src/app/api/webhooks/payments/route.ts` - Payment verification
5. `src/lib/auth/config.ts` - Auth configuration
6. `middleware.ts` - Request validation
7. `next.config.mjs` - Build configuration
8. `tsconfig.json` - Type checking
9. `.env.local` - Environment setup
10. `package.json` - Dependencies

### Full Analysis

See: `SYSTEMATIC_ERROR_ANALYSIS.md` in this directory
