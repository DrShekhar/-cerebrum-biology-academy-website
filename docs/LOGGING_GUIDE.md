## Structured Logging Guide

## Overview

The Cerebrum Biology Academy platform uses structured logging with automatic switching between:

- **Development**: Simple colored console output for readability
- **Production**: High-performance Pino JSON logging with Sentry integration

## Quick Start

```typescript
import { logger } from '@/lib/utils'

// Basic logging
logger.info('User logged in', { userId: '123', method: 'password' })
logger.error('Database error', new Error('Connection failed'), { query: 'SELECT...' })

// Specialized logging
logger.authentication('user-123', 'login', true, { method: 'password' })
logger.payment('txn-456', 50000, 'INR', 'COMPLETED', 'user-123')
logger.audit('admin-789', 'DELETE', 'users/123', { reason: 'GDPR request' })
```

## Features

### Automatic Context Enrichment

All logs automatically include:

- Timestamp (ISO 8601)
- Service name (`cerebrum-biology-academy`)
- Environment (`development`, `production`, `test`)
- Process ID (production only)
- Hostname (production only)

### Sensitive Data Redaction

The following fields are automatically redacted in production:

- `password`
- `token`
- `authorization`
- `cookie`
- `apiKey`
- `secret`
- Any nested fields matching these patterns

### Sentry Integration

In production:

- **WARN** level logs → Sentry messages (warning level)
- **ERROR** level logs → Sentry exceptions with full context
- All errors include stack traces and request context

## Log Levels

```typescript
// DEBUG - Detailed diagnostic information
logger.debug('Cache hit', { key: 'user:123', ttl: 3600 })

// INFO - Normal operations
logger.info('User registered', { userId: '123', email: 'user@example.com' })

// WARN - Warning conditions
logger.warn('High memory usage', { usage: '85%', threshold: '80%' })

// ERROR - Error conditions
logger.error('Payment failed', error, { orderId: '456', amount: 5000 })
```

Set log level via environment variable:

```bash
LOG_LEVEL=debug  # Shows all logs
LOG_LEVEL=info   # Default, shows info/warn/error
LOG_LEVEL=warn   # Shows warn/error only
LOG_LEVEL=error  # Shows errors only
```

## Specialized Logging Methods

### API Requests & Responses

```typescript
// Automatic with middleware (recommended)
import { withLogging } from '@/lib/middleware/logging'

export const GET = withLogging(async (request) => {
  // Your handler logic
  return NextResponse.json({ data: 'result' })
})

// Manual logging
import { createRequestLogger } from '@/lib/middleware/logging'

export async function GET(request: NextRequest) {
  const log = createRequestLogger(request, userId)

  log.info('Processing request')
  const timer = log.timer('database-query')

  // Your logic here

  const duration = timer.end()
  log.performance('query-time', duration, 'ms')
}
```

### Authentication & Authorization

```typescript
// Authentication events
logger.authentication(userId, 'login', true, {
  method: 'password',
  ip: '192.168.1.1',
  userAgent: 'Chrome/120.0',
})

logger.authentication(userId, 'login', false, {
  method: 'password',
  reason: 'Invalid credentials',
  attempts: 3,
})

// Authorization checks
logger.authorization(userId, 'payments/123', 'update', true)
logger.authorization(userId, 'admin/users', 'view', false)
```

### Business Events

```typescript
// Track important business operations
logger.businessEvent('lead_created', {
  leadId: 'lead-123',
  source: 'landing-page',
  campaign: 'summer-2024',
  assignedTo: 'counselor-456',
})

logger.businessEvent('enrollment_completed', {
  studentId: 'student-789',
  course: 'NEET Biology',
  amount: 50000,
  duration: '6-months',
})

logger.businessEvent('demo_scheduled', {
  leadId: 'lead-123',
  scheduledAt: '2024-06-15T10:00:00Z',
  counselorId: 'counselor-456',
  preferredDate: '2024-06-15',
})
```

### Payment Operations

```typescript
logger.payment(
  'razorpay_pay_123', // Transaction ID
  50000, // Amount
  'INR', // Currency
  'COMPLETED', // Status
  'user-123' // User ID
)

logger.payment('txn-456', 10000, 'INR', 'FAILED', 'user-789')
```

### External Service Calls

```typescript
const timer = logger.timer('twilio-sms')
try {
  await twilioClient.messages.create(...)
  const duration = timer.end()

  logger.externalService('twilio', 'send-sms', duration, true)
} catch (error) {
  const duration = timer.end()

  logger.externalService('twilio', 'send-sms', duration, false, error)
}
```

### Database Operations

```typescript
const timer = logger.timer('db-query')
try {
  const result = await prisma.user.findMany(...)
  const duration = timer.end()

  logger.databaseQuery('SELECT * FROM users WHERE ...', duration)
} catch (error) {
  const duration = timer.end()

  logger.databaseQuery('SELECT * FROM users WHERE ...', duration, error)
}
```

### Audit Logging

```typescript
// Track all administrative actions
logger.audit(
  'admin-123', // User ID
  'DELETE', // Action
  'users/456', // Resource
  {
    reason: 'GDPR request',
    ipAddress: '192.168.1.1',
    timestamp: new Date().toISOString(),
  }
)

logger.audit('counselor-789', 'UPDATE', 'leads/123', {
  changes: { stage: 'DEMO_SCHEDULED' },
  oldValue: 'NEW',
  newValue: 'DEMO_SCHEDULED',
})
```

### Security Events

```typescript
logger.securityEvent(
  'Suspicious login attempt',
  {
    userId: 'user-123',
    ip: '192.168.1.100',
    attempts: 5,
    timeWindow: '5 minutes',
  },
  'high' // Severity: low, medium, high, critical
)

logger.securityEvent(
  'Rate limit exceeded',
  {
    endpoint: '/api/auth/send-otp',
    ip: '192.168.1.100',
    limit: 10,
    timeWindow: '1 hour',
  },
  'medium'
)
```

### Performance Metrics

```typescript
logger.performanceMetric('api_response_time', 234, 'ms', {
  endpoint: '/api/test/create',
  method: 'POST',
})

logger.performanceMetric('db_query_time', 45, 'ms', {
  query: 'findManyUsers',
  table: 'users',
})

logger.performanceMetric('cache_hit_rate', 87.5, 'percent', {
  cache: 'redis',
  key_pattern: 'user:*',
})
```

### Rate Limiting

```typescript
logger.rateLimitHit(
  'ip:192.168.1.100', // Identifier
  '/api/auth/send-otp', // Endpoint
  10 // Limit
)

logger.rateLimitHit('user:123', '/api/test/create', 50)
```

### Cache Operations

```typescript
logger.cache('get', 'user:123:profile', true, 2) // Cache hit
logger.cache('get', 'user:456:profile', false, 45) // Cache miss
logger.cache('set', 'user:789:profile', true, 3)
logger.cache('delete', 'user:123:*', true)
```

### Email & Communication

```typescript
logger.email('user@example.com', 'Welcome to Cerebrum Biology Academy', true, 'sendgrid')

logger.email(
  'user@example.com',
  'Payment reminder',
  false,
  'sendgrid',
  new Error('SMTP connection failed')
)

logger.webhook('razorpay', 'payment.captured', true, {
  orderId: 'order_123',
  amount: 50000,
})
```

### Health Checks

```typescript
logger.healthCheck('database', 'healthy', {
  connections: 5,
  maxConnections: 10,
  responseTime: 12,
})

logger.healthCheck('redis', 'unhealthy', {
  error: 'Connection timeout',
  lastSuccess: '2024-06-15T09:30:00Z',
})
```

## Advanced Features

### Child Loggers

Create loggers with persistent context:

```typescript
import { ProductionLogger } from '@/lib/utils'

const userLogger = new ProductionLogger({
  userId: 'user-123',
  sessionId: 'session-456',
})

userLogger.info('Profile updated') // Automatically includes userId & sessionId
userLogger.warn('Password change attempt')

// Create nested child logger
const paymentLogger = userLogger.child({ orderId: 'order-789' })
paymentLogger.info('Payment initiated') // Includes userId, sessionId, orderId
```

### Timer Utility

Measure operation duration:

```typescript
const timer = logger.timer('process-payment')

// Do work...
await processPayment()

const duration = timer.end() // Automatically logs duration
// Returns duration in milliseconds
```

### Async Operation Wrapper

Automatically log start, end, and errors:

```typescript
const result = await logger.logAsync(
  'send-email',
  async () => {
    return await sendEmail(to, subject, body)
  },
  {
    logStart: true, // Log when starting (default: true)
    logEnd: true, // Log when completed (default: true)
    logError: true, // Log if error occurs (default: true)
    context: { to, subject }, // Additional context
  }
)
```

### Request Logger

Create logger with automatic request context:

```typescript
import { createRequestLogger } from '@/lib/middleware/logging'

export async function POST(request: NextRequest) {
  const log = createRequestLogger(request, userId)

  // All logs include requestId, method, path, IP, userAgent
  log.info('Processing payment')
  log.audit('CREATE', 'payments', { amount: 5000 })
  log.businessEvent('payment_initiated', { orderId: 'order-123' })

  const timer = log.timer('payment-processing')
  // Do work...
  timer.end()

  return NextResponse.json({ success: true })
}
```

## Best Practices

### 1. Use Appropriate Log Levels

```typescript
// ✅ Good
logger.debug('Cache statistics', { hitRate: 87.5 }) // Diagnostic info
logger.info('User registered', { userId: '123' }) // Normal operations
logger.warn('High API latency', { duration: 2500 }) // Warnings
logger.error('Payment failed', error) // Errors

// ❌ Bad
logger.info('x = 5') // Too noisy, use debug
logger.error('User not found') // Not an error, use info/warn
```

### 2. Include Relevant Context

```typescript
// ✅ Good
logger.error('Payment failed', error, {
  userId: 'user-123',
  orderId: 'order-456',
  amount: 5000,
  paymentMethod: 'razorpay',
})

// ❌ Bad
logger.error('Payment failed', error) // Missing context
```

### 3. Use Specialized Methods

```typescript
// ✅ Good
logger.authentication(userId, 'login', true, { method: 'password' })
logger.payment(txnId, amount, 'INR', 'COMPLETED', userId)

// ❌ Bad
logger.info('User logged in')
logger.info('Payment completed')
```

### 4. Don't Log Sensitive Data

```typescript
// ✅ Good
logger.info('Password changed', { userId: '123' })
logger.info('OTP sent', { phone: '+91-XXX-XXX-1234' })

// ❌ Bad
logger.info('Password changed', { newPassword: 'secret123' })
logger.info('OTP sent', { otp: '123456', phone: '+918826444334' })
```

### 5. Use Timers for Performance

```typescript
// ✅ Good
const timer = logger.timer('complex-operation')
await complexOperation()
timer.end()

// ❌ Bad
const start = Date.now()
await complexOperation()
console.log('Duration:', Date.now() - start)
```

### 6. Log Business Events

```typescript
// ✅ Good
logger.businessEvent('enrollment_completed', {
  studentId,
  course,
  amount,
  counselorId,
})

// ❌ Bad
console.log('Student enrolled')
```

## Migration from console.log

Replace existing console.log statements:

```typescript
// Before
console.log('User logged in:', userId)
console.error('Error:', error)

// After
logger.info('User logged in', { userId })
logger.error('Authentication failed', error, { userId })
```

## Log Output Examples

### Development (Pretty Console)

```
[INFO] 12:34:56 - User registered
  userId: "user-123"
  email: "u***r@example.com"
  method: "password"

[ERROR] 12:35:01 - Payment failed
  userId: "user-123"
  orderId: "order-456"
  amount: 5000
  error: PaymentError: Insufficient funds
    at processPayment (...)
```

### Production (JSON)

```json
{
  "level": "INFO",
  "timestamp": "2024-06-15T12:34:56.789Z",
  "service": "cerebrum-biology-academy",
  "env": "production",
  "msg": "User registered",
  "userId": "user-123",
  "email": "u***r@example.com",
  "method": "password"
}

{
  "level": "ERROR",
  "timestamp": "2024-06-15T12:35:01.234Z",
  "service": "cerebrum-biology-academy",
  "env": "production",
  "msg": "Payment failed",
  "userId": "user-123",
  "orderId": "order-456",
  "amount": 5000,
  "err": {
    "type": "PaymentError",
    "message": "Insufficient funds",
    "stack": "PaymentError: Insufficient funds\n    at processPayment (...)"
  }
}
```

## Troubleshooting

### Logs Not Appearing

1. Check log level: `LOG_LEVEL=debug npm run dev`
2. Verify logger import: `import { logger } from '@/lib/utils'`
3. Check if path is excluded in logging middleware

### Too Many Logs

1. Increase log level: `LOG_LEVEL=warn`
2. Add paths to `excludePaths` in logging middleware
3. Use `logger.debug()` for verbose logs

### Performance Impact

Pino is designed for high performance:

- JSON logging is faster than pretty-printing
- Redaction happens only on logged fields
- Excluded paths skip logging entirely

In production, logging overhead is typically <1ms per log statement.

## Next Steps

1. Replace remaining `console.log` with structured logging
2. Add business event tracking to key workflows
3. Set up log aggregation (e.g., DataDog, Elasticsearch)
4. Configure alerts for critical errors
5. Create dashboards for key metrics
