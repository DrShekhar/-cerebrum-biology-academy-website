# Rate Limiting Guide

## Overview

The platform implements production-grade rate limiting using Upstash Redis to prevent abuse, protect against DDoS attacks, and ensure fair resource usage across all users.

## Features

- **Redis-based**: Uses Upstash Redis for distributed rate limiting
- **Sliding Window Algorithm**: More accurate than fixed window
- **Multiple Tiers**: Different limits for different endpoint types
- **Analytics**: Built-in analytics for rate limit monitoring
- **Graceful Degradation**: Falls back to no limiting if Redis unavailable
- **Automatic Headers**: X-RateLimit-\* headers in all responses

## Configuration

### Environment Variables

```bash
# Required for rate limiting
REDIS_URL=https://your-redis-url.upstash.io
REDIS_TOKEN=your-redis-token
```

Get these from [Upstash Console](https://console.upstash.com/)

### Rate Limit Tiers

| Tier                | Limit        | Window | Use Case             |
| ------------------- | ------------ | ------ | -------------------- |
| `authSendOTP`       | 5 requests   | 15 min | OTP generation       |
| `authVerifyOTP`     | 10 requests  | 15 min | OTP verification     |
| `authLogin`         | 10 requests  | 15 min | Login attempts       |
| `authSignup`        | 5 requests   | 1 hour | Account creation     |
| `authPasswordReset` | 3 requests   | 1 hour | Password reset       |
| `apiGeneral`        | 100 requests | 1 min  | General API calls    |
| `apiStrict`         | 20 requests  | 1 min  | Sensitive operations |
| `whatsappSend`      | 3 requests   | 1 hour | WhatsApp messages    |
| `smsSend`           | 5 requests   | 1 hour | SMS messages         |
| `paymentCreate`     | 10 requests  | 1 hour | Payment creation     |
| `demoBooking`       | 3 requests   | 1 hour | Demo bookings        |

## Usage

### Basic Rate Limiting

```typescript
import { withRateLimit } from '@/lib/ratelimit/middleware'

async function handlePOST(request: NextRequest) {
  // Your handler logic
  return NextResponse.json({ success: true })
}

export const POST = withRateLimit(handlePOST, 'authSendOTP')
```

### With User Context

```typescript
export const POST = withRateLimit(handlePOST, 'authLogin', {
  getUserId: async (request) => {
    const body = await request.json()
    return body.userId // Use user ID instead of IP
  },
})
```

### Conditional Rate Limiting

```typescript
export const POST = withRateLimit(handlePOST, 'apiGeneral', {
  skipCheck: async (request) => {
    // Skip rate limiting for admin users
    const session = await getSession(request)
    return session?.user?.role === 'ADMIN'
  },
})
```

### Manual Rate Limit Check

```typescript
import { checkRateLimit, getRateLimiter, getIdentifier } from '@/lib/ratelimit/middleware'

export async function POST(request: NextRequest) {
  const identifier = getIdentifier(request)
  const limiter = getRateLimiter('authSendOTP')
  const result = await checkRateLimit(limiter, identifier)

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
      },
      { status: 429 }
    )
  }

  // Your logic here
}
```

### Multiple Rate Limit Checks

```typescript
import { checkMultipleRateLimits, createRateLimitResponse } from '@/lib/ratelimit/middleware'

export async function POST(request: NextRequest) {
  const rateLimitResult = await checkMultipleRateLimits(request, [
    { limiterType: 'authSendOTP' },
    { limiterType: 'smsSend', identifier: 'global:sms' },
  ])

  if (rateLimitResult) {
    return createRateLimitResponse(rateLimitResult)
  }

  // Your logic here
}
```

## Identifier Strategy

The system uses the following identifier priority:

1. **User ID** (if authenticated): `user:123`
2. **IP Address** (if not authenticated): `ip:192.168.1.1`
3. **Custom identifier** (if provided): `custom:value`

```typescript
// IP-based (anonymous users)
const identifier = getIdentifier(request)
// Returns: "ip:192.168.1.1"

// User-based (authenticated users)
const identifier = getIdentifier(request, userId)
// Returns: "user:123"

// Custom identifier
const limiter = getRateLimiter('whatsappSend')
await checkRateLimit(limiter, 'phone:+919876543210')
```

## Response Headers

All rate-limited responses include standard headers:

```http
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1640000000
```

When rate limit is exceeded:

```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640000900
Retry-After: 900

{
  "error": "Too many requests",
  "message": "Rate limit exceeded. Try again after 2024-12-15T10:15:00.000Z",
  "retryAfter": 900,
  "limit": 5,
  "remaining": 0,
  "reset": 1640000900
}
```

## Examples

### Protect OTP Endpoint

```typescript
// src/app/api/auth/send-otp/route.ts
import { withRateLimit } from '@/lib/ratelimit/middleware'

async function handlePOST(request: NextRequest) {
  const { phoneNumber } = await request.json()

  // Generate and send OTP
  const otp = generateOTP()
  await sendSMS(phoneNumber, otp)

  return NextResponse.json({ success: true })
}

// 5 requests per 15 minutes per IP/user
export const POST = withRateLimit(handlePOST, 'authSendOTP')
```

### Protect Login Endpoint

```typescript
// src/app/api/auth/login/route.ts
import { withRateLimit } from '@/lib/ratelimit/middleware'

async function handlePOST(request: NextRequest) {
  const { email, password } = await request.json()

  const user = await authenticateUser(email, password)

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({ user, token: generateToken(user) })
}

// 10 requests per 15 minutes per IP
export const POST = withRateLimit(handlePOST, 'authLogin')
```

### Protect Payment Endpoint

```typescript
// src/app/api/payments/create/route.ts
import { withRateLimit } from '@/lib/ratelimit/middleware'
import { getSession } from '@/lib/auth'

async function handlePOST(request: NextRequest) {
  const session = await getSession(request)
  const { amount, currency } = await request.json()

  const payment = await createPayment(session.user.id, amount, currency)

  return NextResponse.json({ payment })
}

// 10 requests per hour per user
export const POST = withRateLimit(handlePOST, 'paymentCreate', {
  getUserId: async (request) => {
    const session = await getSession(request)
    return session?.user?.id
  },
})
```

### Protect WhatsApp Endpoint

```typescript
// src/app/api/whatsapp/send/route.ts
import { checkMultipleRateLimits, createRateLimitResponse } from '@/lib/ratelimit/middleware'

export async function POST(request: NextRequest) {
  // Check both per-user and global WhatsApp limits
  const rateLimitResult = await checkMultipleRateLimits(request, [
    { limiterType: 'whatsappSend' }, // Per-IP limit
    { limiterType: 'apiStrict', identifier: 'global:whatsapp' }, // Global limit
  ])

  if (rateLimitResult) {
    return createRateLimitResponse(rateLimitResult)
  }

  const { phone, message } = await request.json()
  await sendWhatsAppMessage(phone, message)

  return NextResponse.json({ success: true })
}
```

## Testing

### Local Development

Without Redis configured, rate limiting is automatically disabled:

```typescript
// Rate limiting gracefully degrades
const result = await checkRateLimit(limiter, identifier)
// Returns: { success: true, limit: Infinity, ... }
```

### With Redis (Recommended)

Use [Upstash Console](https://console.upstash.com/) to get free Redis:

1. Create a new Redis database
2. Copy the REST URL and token
3. Add to `.env.local`:

```bash
REDIS_URL=https://your-db.upstash.io
REDIS_TOKEN=your-token-here
```

### Test Rate Limiting

```bash
# Send multiple requests quickly
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/send-otp \
    -H "Content-Type: application/json" \
    -d '{"phoneNumber": "+919876543210"}' \
    -i
done

# First 5 should succeed (200)
# 6th should fail with 429
```

## Monitoring

### Check Rate Limit Status

```typescript
import { isRateLimitEnabled } from '@/lib/ratelimit/config'

if (!isRateLimitEnabled()) {
  console.warn('Rate limiting is disabled - Redis not configured')
}
```

### View Analytics

Upstash provides built-in analytics dashboard showing:

- Total requests
- Rate limited requests
- Top identifiers (IPs/users)
- Request patterns over time

Access at: https://console.upstash.com/redis/[your-db]/analytics

### Logging

All rate limit violations are automatically logged:

```typescript
logger.rateLimitHit(
  'ip:192.168.1.1',
  '/api/auth/send-otp',
  5 // limit
)
```

## Best Practices

### 1. Choose Appropriate Limits

```typescript
// ✅ Good - Prevents abuse while allowing legitimate use
authSendOTP: 5 requests / 15 minutes

// ❌ Bad - Too restrictive for legitimate users
authSendOTP: 1 request / 1 hour

// ❌ Bad - Too permissive, doesn't prevent abuse
authSendOTP: 1000 requests / 1 minute
```

### 2. Use User ID When Available

```typescript
// ✅ Good - More accurate per-user limits
export const POST = withRateLimit(handlePOST, 'authLogin', {
  getUserId: async (request) => {
    const session = await getSession(request)
    return session?.user?.id
  },
})

// ❌ Bad - Multiple users behind same IP affected
export const POST = withRateLimit(handlePOST, 'authLogin')
```

### 3. Combine Multiple Checks

```typescript
// ✅ Good - Both per-user and global limits
const checks = [
  { limiterType: 'smsSend' }, // Per-user: 5/hour
  { limiterType: 'apiStrict', identifier: 'global:sms' }, // Global: 100/hour
]

// ❌ Bad - Only per-user limit, no global protection
const checks = [{ limiterType: 'smsSend' }]
```

### 4. Skip Rate Limiting for Trusted Users

```typescript
// ✅ Good - Admin users can bypass limits
export const POST = withRateLimit(handlePOST, 'apiGeneral', {
  skipCheck: async (request) => {
    const session = await getSession(request)
    return session?.user?.role === 'ADMIN'
  },
})
```

### 5. Provide Clear Error Messages

```typescript
// ✅ Good - Clear message with retry information
return createRateLimitResponse(result)
// Returns: "Rate limit exceeded. Try again after 2024-12-15T10:15:00.000Z"

// ❌ Bad - Generic error
return NextResponse.json({ error: 'Error' }, { status: 429 })
```

## Troubleshooting

### Rate Limiting Not Working

1. Check Redis connection:

```bash
# Test Redis connectivity
curl https://your-db.upstash.io/ping \
  -H "Authorization: Bearer your-token"
```

2. Verify environment variables:

```typescript
console.log('REDIS_URL:', process.env.REDIS_URL)
console.log('Enabled:', isRateLimitEnabled())
```

3. Check logs for errors:

```bash
# Look for rate limit errors
grep "rate_limit_error" logs.txt
```

### Rate Limits Too Strict

Temporarily increase limits while monitoring:

```typescript
authSendOTP: new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '15 m'), // Increased from 5
  analytics: true,
})
```

### Redis Connection Issues

Rate limiting automatically degrades gracefully:

```typescript
// If Redis fails, requests are allowed
try {
  const result = await limiter.limit(identifier)
} catch (error) {
  // Error logged, request allowed
  return { success: true, ... }
}
```

## Cost Optimization

### Upstash Free Tier

- 10,000 requests/day
- Sufficient for small/medium apps
- Upgrade to paid plan for production

### Reduce Redis Calls

```typescript
// ✅ Good - Check once per request
const result = await checkRateLimit(limiter, identifier)

// ❌ Bad - Multiple checks increase cost
await checkRateLimit(limiter, identifier)
await checkRateLimit(limiter, identifier) // Duplicate
```

### Use Appropriate Windows

```typescript
// ✅ Good - Longer windows = fewer Redis operations
slidingWindow(100, '1 h')

// ❌ Bad - Very short windows = more Redis operations
slidingWindow(1, '1 s')
```

## Next Steps

1. Set up Upstash Redis account
2. Configure environment variables
3. Add rate limiting to all auth endpoints
4. Monitor rate limit analytics
5. Adjust limits based on usage patterns
6. Set up alerts for rate limit violations
