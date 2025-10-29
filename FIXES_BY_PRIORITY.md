# Priority-Based Fixes

## PRIORITY 1: DATA INTEGRITY (Fix within 24 hours)

### Fix 1.1: Database Fallback Hardening

**File**: `src/lib/prisma.ts`
**Current** (lines 37-39):

```typescript
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not found, using mock Prisma client')
  return new MockPrismaClient() as any
}
```

**Change to**:

```typescript
if (!process.env.DATABASE_URL) {
  const error = new Error(
    'FATAL: DATABASE_URL is not configured. Database initialization cannot proceed. ' +
      'Please ensure DATABASE_URL is set in your environment variables. ' +
      'Application will not start without a valid database connection.'
  )
  console.error(error)
  throw error
}
```

**Verification**: Restart app, should crash if DATABASE_URL missing (good!)

---

### Fix 1.2: Validate Environment Variables at Startup

**File**: `src/lib/prisma.ts` - Add this before export

```typescript
// Validate critical environment variables at module load
function validateEnvironment() {
  const requiredVars = ['DATABASE_URL']
  const missingVars = requiredVars.filter((v) => !process.env[v])

  if (missingVars.length > 0) {
    const error = new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
    console.error(error)
    throw error
  }
}

// Call at module load time
if (process.env.NODE_ENV === 'production') {
  validateEnvironment()
}
```

---

### Fix 1.3: Real SMS/WhatsApp Implementation

**File**: `src/app/api/auth/send-otp/route.ts`
**Current** (lines 74-95):

```typescript
async function sendSMSOTP(mobile: string, otp: string): Promise<boolean> {
  // Mock implementation
  return true
}
```

**Change to** (using MSG91 example):

```typescript
async function sendSMSOTP(mobile: string, otp: string): Promise<boolean> {
  try {
    if (!process.env.SMS_API_KEY) {
      console.error('SMS_API_KEY not configured')
      return false
    }

    const response = await fetch('https://api.msg91.com/api/sendotp.php', {
      method: 'GET',
      headers: {},
      body: new URLSearchParams({
        authkey: process.env.SMS_API_KEY,
        mobile: mobile,
        message: `Your OTP for Cerebrum Biology Academy is: ${otp}. Valid for 10 minutes.`,
        sender: 'CEREBRUM',
      }).toString(),
    })

    const result = await response.json()

    if (result.type === 'success') {
      console.log(`SMS sent successfully to ${mobile.slice(0, 3)}****${mobile.slice(-2)}`)
      return true
    } else {
      console.error(`SMS send failed: ${result.message}`)
      return false
    }
  } catch (error) {
    console.error('SMS API error:', error)
    return false
  }
}
```

**Add to `.env.example`**:

```
SMS_API_KEY=your-msg91-auth-key
WHATSAPP_API_BASE_URL=https://graph.facebook.com/v18.0
WHATSAPP_BUSINESS_PHONE_ID=your-phone-id
```

---

## PRIORITY 2: SECURITY (Fix within 48-72 hours)

### Fix 2.1: Payment Webhook Signature Verification

**File**: `src/app/api/webhooks/payments/route.ts`
**Add at top**:

```typescript
import crypto from 'crypto'

function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET

  if (!secret) {
    console.error('RAZORPAY_WEBHOOK_SECRET not configured')
    return false
  }

  const payload = `${orderId}|${paymentId}`
  const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

  return expectedSignature === signature
}
```

**Update POST handler**:

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    // CRITICAL: Verify signature first
    if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      console.error('Invalid Razorpay signature - possible fraud attempt')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Only process if signature is valid
    // ... rest of webhook processing
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
```

---

### Fix 2.2: JWT Secret Enforcement

**File**: `src/lib/auth/config.ts`
**Current** (lines 13-19):

```typescript
const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-change-in-production'
  if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
    console.warn('JWT_SECRET not set in production - using fallback (INSECURE)')
  }
  return secret
}
```

**Change to**:

```typescript
const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'FATAL: JWT_SECRET is required in production. ' +
          'Authentication cannot function without a valid secret.'
      )
    }
    // Development: allow default for testing
    console.warn('WARNING: Using development JWT_SECRET in non-production mode')
    return 'development-only-secret-change-in-production'
  }

  return secret
}
```

---

### Fix 2.3: Middleware Error Swallowing

**File**: `middleware.ts`
**Current** (line 14):

```typescript
const session = await validateUserSession(req).catch(() => ({ valid: false }) as UserSession)
```

**Change to**:

```typescript
let session: UserSession
try {
  session = await validateUserSession(req)
} catch (error) {
  console.error('Session validation error:', error)
  // Return 401 instead of silently marking as invalid
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
    return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
  }
  session = { valid: false }
}
```

---

## PRIORITY 3: RELIABILITY (Fix within 1 week)

### Fix 3.1: Add Rate Limiting to AI Routes

**File**: Create `src/lib/middleware/rateLimiter.ts`

```typescript
import rateLimit from 'express-rate-limit'

export const createApiLimiter = (windowMs: number, max: number) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many requests',
        retryAfter: req.rateLimit?.resetTime,
      })
    },
  })
}

export const aiLimiter = createApiLimiter(60 * 1000, 5) // 5 per minute
export const generalLimiter = createApiLimiter(15 * 60 * 1000, 100) // 100 per 15 min
```

**Update AI route** (e.g., `src/app/api/ai/unified-chat/route.ts`):

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { aiLimiter } from '@/lib/middleware/rateLimiter'

export async function POST(request: NextRequest) {
  // Check rate limit
  const rateLimitResult = await new Promise((resolve) => {
    aiLimiter(request as any, { status: () => ({}) } as any, () => {
      resolve(true)
    })
  }).catch(() => false)

  if (!rateLimitResult) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  // ... rest of handler
}
```

---

### Fix 3.2: Consolidate Database Usage

**Decision**: Use Prisma only (remove InstantDB from auth routes)

**File**: `src/app/api/auth/send-otp/route.ts`
**Replace InstantDB calls** (lines 26-50):

```typescript
// OLD (InstantDB):
const recentOtps = await db.query({
  otpVerification: {
    $: { where: { mobile, createdAt: { $gt: oneHourAgo } } },
  },
})

// NEW (Prisma):
const recentOtps = await prisma.otpVerification.findMany({
  where: {
    mobile: mobile,
    createdAt: { gt: new Date(oneHourAgo) },
  },
})

const otpCount = recentOtps.length
```

**Similar changes needed for**:

- Lines 40-50: Replace db.query with prisma.otpVerification.findMany
- Lines 197-206: Replace db.transact with prisma.otpVerification.create
- Lines 221-228: Replace db.transact with prisma.marketingLead.create

---

### Fix 3.3: Enable TypeScript Strict Mode

**File**: `tsconfig.json`
**Current**:

```json
"strict": false,
"noImplicitAny": false,
"strictNullChecks": false,
```

**Change to**:

```json
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"strictFunctionTypes": true,
"strictBindCallApply": true,
"strictPropertyInitialization": true,
"noImplicitThis": true,
"alwaysStrict": true,
```

**Then enable in build**:
**File**: `next.config.mjs`

```javascript
typescript: {
  // Re-enable type checking - remove ignoreBuildErrors
  // ignoreBuildErrors: false,  // Remove this line
}
```

---

### Fix 3.4: Add Idempotency for Webhooks

**File**: `src/app/api/webhooks/payments/route.ts`
**Add at top**:

```typescript
import { prisma } from '@/lib/prisma'

// Store webhook IDs to prevent duplicate processing
async function isWebhookProcessed(webhookId: string): Promise<boolean> {
  const existing = await prisma.webhookLog.findUnique({
    where: { id: webhookId },
  })
  return !!existing
}

async function markWebhookProcessed(webhookId: string): Promise<void> {
  await prisma.webhookLog.create({
    data: {
      id: webhookId,
      source: 'razorpay_payment',
      processedAt: new Date(),
    },
  })
}
```

**Update POST handler**:

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const webhookId = body.id || `${body.razorpay_order_id}_${body.razorpay_payment_id}`

    // Check if already processed
    if (await isWebhookProcessed(webhookId)) {
      console.log(`Webhook ${webhookId} already processed, skipping`)
      return NextResponse.json({ status: 'already_processed' })
    }

    // ... verification and processing

    // Mark as processed AFTER successful processing
    await markWebhookProcessed(webhookId)

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
```

**Add to Prisma schema** (`prisma/schema.prisma`):

```prisma
model WebhookLog {
  id        String   @id @unique
  source    String
  processedAt DateTime @default(now())

  @@index([processedAt])
}
```

---

## PRIORITY 4: CODE QUALITY (Fix within 2 weeks)

### Fix 4.1: Centralize Error Handling

**File**: Create `src/lib/errors/errorHandler.ts`

```typescript
import { NextResponse } from 'next/server'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleError(error: unknown) {
  console.error('API Error:', error)

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, details: error.details },
      { status: error.statusCode }
    )
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
  }

  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
```

**Use in routes**:

```typescript
import { handleError, AppError } from '@/lib/errors/errorHandler'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => {
      throw new AppError(400, 'Invalid JSON in request body')
    })

    if (!body.amount || body.amount <= 0) {
      throw new AppError(400, 'Invalid amount', { amount: body.amount })
    }

    // ... rest of logic
  } catch (error) {
    return handleError(error)
  }
}
```

---

### Fix 4.2: Add Segment-Level Error Boundaries

**File**: Create `src/app/api/error.tsx`

```typescript
'use client'

export default function APIError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('API Error:', error)
  return NextResponse.json({ error: 'API route error', digest: error.digest }, { status: 500 })
}
```

**File**: Create `src/app/dashboard/error.tsx`

```typescript
'use client'

import { Button } from '@/components/ui/Button'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Dashboard Error</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      {error.digest && <p className="text-sm text-gray-500">ID: {error.digest}</p>}
      <Button onClick={reset}>Try Again</Button>
    </div>
  )
}
```

---

### Fix 4.3: Improve Error Logging

**File**: Update all error handlers to use centralized logger

```typescript
// Before:
catch (error) {
  console.error('Error:', error)
  return NextResponse.json(...)
}

// After:
catch (error) {
  const errorId = crypto.randomUUID()
  console.error(`[${errorId}] Payment processing error:`, error)

  // Send to monitoring service
  await logError(error, {
    errorId,
    route: '/api/payments/create-order',
    userId: request.headers.get('x-user-id'),
  })

  return NextResponse.json({
    error: 'Payment failed',
    errorId  // User can provide this to support
  }, { status: 500 })
}
```

---

## Implementation Timeline

### Week 1: Immediate Stability

- Day 1: Implement Fixes 1.1, 1.2, 2.1, 2.2 (database, auth, payments)
- Day 2-3: Implement Fix 1.3 (SMS/WhatsApp)
- Day 4-5: Implement Fix 2.3, 3.1 (middleware, rate limiting)
- Day 6-7: Testing and verification

### Week 2: Data Integrity

- Day 8-10: Implement Fix 3.2 (database consolidation)
- Day 11-13: Implement Fix 3.3 (TypeScript)
- Day 14: Testing

### Week 3: Quality & Monitoring

- Day 15-18: Implement Fixes 4.1, 4.2, 4.3 (error handling)
- Day 19-20: Setup monitoring & logging
- Day 21: Final testing

---

## Verification Checklist

After each fix, verify:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Tests
npm test

# Build
npm run build

# Runtime test
npm run dev  # Check for startup errors
```

Each section should show improvement without new issues.
