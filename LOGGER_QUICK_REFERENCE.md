# Logger Quick Reference Guide

## Import Statement

```typescript
import { logger } from '@/lib/utils/logger'
```

## Basic Usage

### Debug Logging (Development Only)

```typescript
// Technical details, verbose output
logger.debug('Cache miss for key', { key, ttl })
logger.debug('Processing user data', { userId, dataSize })
```

### Info Logging (Important Events)

```typescript
// Successful operations, business events
logger.info('User registered successfully', { userId, email })
logger.info('Payment processed', { orderId, amount })
```

### Warning Logging (Non-Critical Issues)

```typescript
// Fallback scenarios, deprecated features
logger.warn('API rate limit approaching', { current: 90, limit: 100 })
logger.warn('Using fallback configuration', { reason: 'config missing' })
```

### Error Logging

```typescript
// Errors and exceptions
logger.error('Database connection failed', { error })
logger.error('Payment processing failed', { error, orderId })
```

## Specialized Methods

### Authentication Events

```typescript
logger.authentication(userId, 'login', true, {
  method: 'email',
  ipAddress: req.ip,
})

logger.authentication(userId, 'logout', true, {
  sessionDuration: 3600,
})
```

### API Request/Response

```typescript
// Log API requests
logger.apiRequest('POST', '/api/users', userId, 150)

// Log API responses
logger.apiResponse('POST', '/api/users', 201, 150, userId)
```

### Business Events

```typescript
logger.businessEvent('order_created', {
  orderId,
  userId,
  amount,
  products: productIds,
})

logger.businessEvent('demo_booking_created', {
  demoBookingId,
  leadId,
  studentName,
})
```

### Security Events

```typescript
logger.securityEvent(
  'SUSPICIOUS_LOGIN_ATTEMPT',
  {
    userId,
    ipAddress,
    attempts: 5,
  },
  'high'
)

logger.securityEvent(
  'PASSWORD_RESET_REQUESTED',
  {
    userId,
    email,
  },
  'medium'
)
```

### Database Operations

```typescript
logger.databaseQuery(
  'SELECT * FROM users WHERE id = ?',
  150, // duration in ms
  error // optional
)
```

### Payment Events

```typescript
logger.payment(
  transactionId,
  5000, // amount
  'INR',
  'SUCCESS',
  userId
)
```

### Email Events

```typescript
logger.email(
  'user@example.com',
  'Welcome to Cerebrum',
  true, // success
  'SendGrid'
)
```

### External Service Calls

```typescript
logger.externalService(
  'WhatsApp API',
  'send_message',
  250, // duration
  true, // success
  error // optional
)
```

### Webhook Events

```typescript
logger.webhook('Razorpay', 'payment.success', true, { orderId, amount })
```

## Advanced Features

### Child Logger (Add Persistent Context)

```typescript
const requestLogger = logger.child({ requestId, userId })

// All logs from requestLogger will include requestId and userId
requestLogger.info('Processing request')
requestLogger.error('Request failed', { error })
```

### Performance Timing

```typescript
const timer = logger.timer('process_images')
// ... do work ...
const duration = timer.end() // Logs duration automatically
```

### Async Operation Logging

```typescript
await logger.logAsync(
  'Fetch user data',
  async () => {
    return await fetchUserData(userId)
  },
  {
    logStart: true,
    logEnd: true,
    logError: true,
  }
)
```

### Audit Logging

```typescript
logger.audit(userId, 'DELETE', 'users', { deletedUserId, reason: 'GDPR request' })
```

### Health Checks

```typescript
logger.healthCheck('database', 'healthy', {
  responseTime: 50,
  connections: 10,
})
```

## Migration Examples

### Example 1: Simple Log

```typescript
// Before
console.log('User created:', userId)

// After
logger.info('User created', { userId })
```

### Example 2: Error Log

```typescript
// Before
console.error('Failed to send email:', error)

// After
logger.error('Failed to send email', { error, recipient })
```

### Example 3: Debug Log

```typescript
// Before
console.log('DEBUG: Cache state:', cacheState)

// After
logger.debug('Cache state', cacheState)
```

### Example 4: Multiple Arguments

```typescript
// Before
console.log('Order created:', orderId, 'for user:', userId, 'amount:', amount)

// After
logger.info('Order created', { orderId, userId, amount })
```

### Example 5: Business Event

```typescript
// Before
console.log('BOOKING:', { id, student, date })

// After
logger.businessEvent('booking_created', { id, student, date })
```

## Best Practices

### ✅ DO

```typescript
// Use structured data
logger.info('Payment processed', { orderId, amount, currency })

// Provide context
logger.error('API call failed', { error, endpoint, retryCount })

// Use appropriate log levels
logger.debug('Cache lookup') // verbose
logger.info('User logged in') // important
logger.warn('Deprecated API used') // warning
logger.error('Database error') // error

// Use specialized methods
logger.authentication(userId, 'login', true)
logger.businessEvent('sale_completed', data)
```

### ❌ DON'T

```typescript
// Don't log sensitive data
logger.info('User login', { password: 'secret123' }) // BAD!

// Don't use string concatenation
logger.info('User ' + userId + ' logged in') // BAD!

// Don't log without context
logger.info('Success') // BAD! (too vague)

// Don't use wrong log level
logger.error('Processing request') // Should be info/debug
logger.debug('Payment failed') // Should be error

// Don't log excessively in loops
for (let user of users) {
  logger.info('Processing user', { user }) // BAD! Too many logs
}
```

## Log Levels in Different Environments

### Development

- All levels enabled (debug, info, warn, error)
- Pretty console output with colors
- Detailed stack traces

### Production

- Info, warn, error (debug disabled)
- JSON output for log aggregation
- Minimal stack traces

## Sensitive Data Handling

The logger automatically:

- Masks email addresses: `u***r@example.com`
- Redacts password fields
- Sanitizes tokens

Always review logs before committing to ensure no sensitive data is logged.

## Performance Considerations

- **Debug logs**: Automatically disabled in production
- **Structured data**: Use objects instead of string concatenation
- **Lazy evaluation**: Logger only processes logs if level is enabled

## Configuration

Set log level via environment variable:

```bash
# .env
LOG_LEVEL=debug # debug, info, warn, error
```

## Integration with External Services

The logger is designed to easily integrate with:

- DataDog
- LogRocket
- Sentry
- CloudWatch
- Logtail

(Integration code to be added in future updates)

---

For questions or issues, see `/src/lib/utils/logger.ts` for full implementation.
