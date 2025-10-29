# Error Boundary System - Comprehensive Documentation

## Overview

This document describes the comprehensive error boundary system implemented for the Cerebrum Biology Academy website. The system provides hierarchical error handling to prevent full application crashes and improve user experience.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Error Boundary Hierarchy](#error-boundary-hierarchy)
3. [Implementation Details](#implementation-details)
4. [Error Logging System](#error-logging-system)
5. [Usage Guide](#usage-guide)
6. [Testing Recommendations](#testing-recommendations)
7. [Integration with Monitoring Services](#integration-with-monitoring-services)
8. [Best Practices](#best-practices)

---

## Architecture

### Three-Level Hierarchy

```
Level 1: Global Error Boundary (global-error.tsx)
   └── Catches catastrophic failures affecting the entire app
   └── Used only when the root layout crashes

Level 2: Root Error Boundary (error.tsx)
   └── Catches unhandled errors in the application
   └── Provides user-friendly fallback UI
   └── Logs errors with context

Level 3: Feature Error Boundaries
   ├── /courses/error.tsx (Course browsing)
   ├── /purchase/error.tsx (Payment flow)
   ├── /dashboard/error.tsx (Student portal)
   └── /admin/error.tsx (Admin panel)

Level 4: Component Error Boundaries
   └── Reusable ErrorBoundary component
   └── Wraps critical components
```

### Error Flow

```
User Action
    ↓
Component Error
    ↓
Component ErrorBoundary? → Yes → Handle locally
    ↓ No
Feature Error Boundary? → Yes → Handle with feature context
    ↓ No
Root Error Boundary? → Yes → Handle globally
    ↓ No
Global Error Boundary → Last resort handler
```

---

## Error Boundary Hierarchy

### Level 1: Global Error Boundary

**Location:** `/src/app/global-error.tsx`

**Purpose:** Catches critical errors that prevent the entire application from loading.

**Features:**

- Minimal UI (must include html/body tags)
- Critical error logging with severity: 'critical'
- Emergency contact information
- Storage clearing functionality
- Error ID display for support

**When triggered:**

- Root layout crashes
- Critical rendering errors
- Global state initialization failures

**Example:**

```tsx
// Automatically used by Next.js when root layout fails
// No manual implementation needed
```

### Level 2: Root Error Boundary

**Location:** `/src/app/error.tsx`

**Purpose:** Default error handler for all unhandled errors in the application.

**Features:**

- User-friendly error messaging
- Multiple recovery options (Try Again, Reload, Go Home)
- Quick action links to main sections
- Support contact information
- Development mode error details
- Error context logging

**Error Context:**

```typescript
{
  page: 'global-error-page',
  digest: error.digest,
  userAgent: window.navigator.userAgent,
  url: window.location.href,
  timestamp: new Date().toISOString(),
}
```

### Level 3: Feature Error Boundaries

#### Courses Error Boundary

**Location:** `/src/app/courses/error.tsx`

**Purpose:** Handle errors in course browsing and catalog.

**Severity:** `high`

**Recovery Actions:**

- Try Again (clears course filters/search)
- Go Home
- Alternative resource links (Demo, Mock Tests, Study Materials)

**Special Handling:**

- Clears course-related cache
- Preserves user enrollment data
- Provides alternative learning paths

#### Purchase Error Boundary

**Location:** `/src/app/purchase/error.tsx`

**Purpose:** Handle payment flow errors.

**Severity:** `critical`

**Recovery Actions:**

- Try Payment Again (clears payment state)
- Back to Courses
- Contact Payment Support

**Special Handling:**

- Clears payment session data
- Prominent warning about duplicate charges
- 24/7 payment support emphasis
- Payment troubleshooting guide

**Critical Features:**

- Immediate support call-to-action
- Clear instructions on what to do
- Warning about retrying failed payments
- Payment error ID for support

#### Dashboard Error Boundary

**Location:** `/src/app/dashboard/error.tsx`

**Purpose:** Handle student portal errors.

**Severity:** `high`

**Recovery Actions:**

- Reload Dashboard (clears dashboard cache)
- Quick access links to main sections
- Settings access

**Special Handling:**

- Data safety reassurance
- Clears dashboard state
- Maintains access to critical features

#### Admin Error Boundary

**Location:** `/src/app/admin/error.tsx`

**Purpose:** Handle admin panel errors.

**Severity:** `critical`

**Recovery Actions:**

- Reload Panel (clears admin cache)
- Quick access to admin sections

**Special Handling:**

- Critical system alert styling
- Immediate escalation instructions
- Technical support emphasis
- Database operation warnings

**Critical Features:**

- Emergency support contact
- System status guidance
- Data modification warnings
- Priority response indication

### Level 4: Component Error Boundary

**Location:** `/src/components/errors/ErrorBoundary.tsx`

**Purpose:** Reusable error boundary for wrapping critical components.

**Usage:**

```tsx
import { ErrorBoundary } from '@/components/errors'

// Basic usage
<ErrorBoundary>
  <CriticalComponent />
</ErrorBoundary>

// With custom context
<ErrorBoundary
  context={{
    page: 'checkout',
    component: 'PaymentForm',
  }}
  severity="critical"
  showDetails={true}
>
  <PaymentForm />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary
  fallback={(error, reset) => (
    <CustomErrorUI error={error} onRetry={reset} />
  )}
  onError={(error, errorInfo) => {
    // Custom error handling
    console.log('Custom handler:', error)
  }}
>
  <CriticalComponent />
</ErrorBoundary>
```

**Props:**

```typescript
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  context?: Partial<ErrorContext>
  severity?: ErrorSeverity
  showDetails?: boolean
}
```

---

## Implementation Details

### Error Context Interface

```typescript
interface ErrorContext {
  page?: string // Page/route where error occurred
  component?: string // Component name
  action?: string // User action that triggered error
  userId?: string // User ID (if available)
  userAgent?: string // Browser user agent
  url?: string // Full URL
  timestamp?: string // ISO timestamp
  severity?: ErrorSeverity // Error severity level
  digest?: string // Next.js error digest
  recoverable?: boolean // Whether error is recoverable
}
```

### Error Severity Levels

```typescript
type ErrorSeverity = 'low' | 'normal' | 'high' | 'critical'
```

**Severity Guidelines:**

- **low:** UI glitches, non-critical features
- **normal:** Standard errors, recoverable issues
- **high:** Important features affected, data retrieval errors
- **critical:** Payment failures, authentication issues, admin panel errors

---

## Error Logging System

### Enhanced Error Utilities

**Location:** `/src/lib/errors/index.ts`

### Key Functions

#### 1. logError()

Logs errors with context to console and monitoring services.

```typescript
import { logError } from '@/lib/errors'

logError(error, {
  page: 'purchase',
  component: 'RazorpayPayment',
  action: 'payment-submit',
  severity: 'critical',
  recoverable: true,
})
```

**Features:**

- Error fingerprinting for deduplication
- Client and server-side logging
- Structured JSON logging in production
- Integration with error monitoring services

#### 2. reportErrorToAPI()

Reports errors to the centralized error tracking API.

```typescript
import { reportErrorToAPI } from '@/lib/errors'

await reportErrorToAPI(error, {
  page: 'courses',
  severity: 'high',
})
```

**Endpoint:** `POST /api/errors`

**Features:**

- Rate limiting (50 reports/hour per IP)
- Error deduplication via fingerprints
- Centralized error storage
- Integration points for external services

#### 3. generateErrorFingerprint()

Creates unique identifiers for error deduplication.

```typescript
import { generateErrorFingerprint } from '@/lib/errors'

const fingerprint = generateErrorFingerprint(error, context)
// Returns: "ErrorName|error message|page|component"
```

### Error API Endpoint

**Location:** `/src/app/api/errors/route.ts`

**Features:**

- Rate limiting per IP
- Error validation
- Structured error storage
- Health check endpoint

**Usage:**

```bash
# Report error
POST /api/errors
{
  "error": {
    "name": "TypeError",
    "message": "Cannot read property 'x' of undefined",
    "stack": "..."
  },
  "fingerprint": "unique-id",
  "severity": "high",
  "context": { ... }
}

# Health check
GET /api/errors
```

---

## Usage Guide

### 1. Protecting Individual Components

For critical components that might fail independently:

```tsx
import { ErrorBoundary } from '@/components/errors'

export function PaymentPage() {
  return (
    <div>
      <Header />

      {/* Wrap payment form in error boundary */}
      <ErrorBoundary
        context={{
          page: 'payment',
          component: 'RazorpayPayment',
        }}
        severity="critical"
      >
        <RazorpayPayment />
      </ErrorBoundary>

      <Footer />
    </div>
  )
}
```

### 2. Protecting Async Components

For components with data fetching:

```tsx
import { ErrorBoundary } from '@/components/errors'

export function CourseList() {
  return (
    <ErrorBoundary
      context={{ page: 'courses', component: 'CourseList' }}
      onError={(error) => {
        // Track to analytics
        analytics.track('course_list_error', { error: error.message })
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <AsyncCourseList />
      </Suspense>
    </ErrorBoundary>
  )
}
```

### 3. Custom Error Fallbacks

For components needing custom error UI:

```tsx
<ErrorBoundary
  fallback={(error, reset) => (
    <div className="error-container">
      <h2>Failed to load video player</h2>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Retry</button>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  )}
>
  <VideoPlayer />
</ErrorBoundary>
```

### 4. Nested Error Boundaries

For complex features with multiple failure points:

```tsx
export function CheckoutPage() {
  return (
    <ErrorBoundary context={{ page: 'checkout' }}>
      <CheckoutLayout>
        {/* Cart can fail independently */}
        <ErrorBoundary context={{ component: 'Cart' }}>
          <ShoppingCart />
        </ErrorBoundary>

        {/* Payment can fail independently */}
        <ErrorBoundary context={{ component: 'Payment' }} severity="critical">
          <PaymentForm />
        </ErrorBoundary>
      </CheckoutLayout>
    </ErrorBoundary>
  )
}
```

---

## Testing Recommendations

### 1. Manual Testing

#### Test Global Error Boundary

```tsx
// Add to any page temporarily
export default function TestPage() {
  throw new Error('Testing global error boundary')
}
```

#### Test Feature Error Boundaries

```tsx
// In /courses/page.tsx
'use client'
import { useEffect } from 'react'

export default function CoursesPage() {
  useEffect(() => {
    throw new Error('Testing courses error boundary')
  }, [])
}
```

#### Test Component Error Boundary

```tsx
function TestComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('Test error')
  }

  return <button onClick={() => setShouldError(true)}>Trigger Error</button>
}

// Wrap in ErrorBoundary
;<ErrorBoundary>
  <TestComponent />
</ErrorBoundary>
```

### 2. Automated Testing

```typescript
// __tests__/ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/errors'

describe('ErrorBoundary', () => {
  it('catches and displays errors', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('calls onError callback', () => {
    const onError = jest.fn()
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalled()
  })
})
```

### 3. Testing Error Scenarios

Test these common error scenarios:

- **Network failures:** API timeout, connection errors
- **Authentication errors:** Token expiration, invalid credentials
- **Payment failures:** Razorpay errors, payment gateway timeouts
- **Database errors:** Query failures, connection pool exhaustion
- **Third-party failures:** WhatsApp API, external service errors
- **State errors:** Invalid state transitions, race conditions

### 4. Error Recovery Testing

Verify recovery mechanisms work:

```typescript
// Test the reset functionality
it('resets error state when reset is called', async () => {
  const { rerender } = render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  )

  // Error should be displayed
  expect(screen.getByText(/error/i)).toBeInTheDocument()

  // Click reset
  const resetButton = screen.getByText(/try again/i)
  await userEvent.click(resetButton)

  // Error should be cleared
  expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
})
```

---

## Integration with Monitoring Services

### Sentry Integration (Example)

```typescript
// src/lib/errors/sentry.ts
import * as Sentry from '@sentry/nextjs'
import { ErrorContext } from '@/lib/errors'

export function initializeSentry() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  })
}

export function reportToSentry(error: Error, context?: ErrorContext) {
  Sentry.withScope((scope) => {
    // Add context
    if (context) {
      scope.setContext('error_context', context)
      scope.setLevel(
        context.severity === 'critical' ? 'error' : context.severity === 'high' ? 'warning' : 'info'
      )
      if (context.userId) {
        scope.setUser({ id: context.userId })
      }
    }

    // Capture exception
    Sentry.captureException(error)
  })
}
```

### DataDog Integration (Example)

```typescript
// src/lib/errors/datadog.ts
import { datadogLogs } from '@datadog/browser-logs'
import { ErrorContext } from '@/lib/errors'

export function initializeDataDog() {
  datadogLogs.init({
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100,
  })
}

export function reportToDataDog(error: Error, context?: ErrorContext) {
  datadogLogs.logger.error('Application Error', {
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    context,
  })
}
```

### Custom Analytics Integration

```typescript
// src/lib/errors/analytics.ts
import { ErrorContext } from '@/lib/errors'

export function trackError(error: Error, context?: ErrorContext) {
  // Send to custom analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: context?.severity === 'critical',
      page: context?.page,
      component: context?.component,
    })
  }

  // Track to internal analytics
  fetch('/api/analytics/error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: error.message,
      context,
      timestamp: new Date().toISOString(),
    }),
  }).catch(console.error)
}
```

---

## Best Practices

### 1. Error Boundary Placement

**DO:**

- Place error boundaries around feature sections
- Wrap critical async components
- Use error boundaries for third-party integrations
- Protect payment and authentication flows

**DON'T:**

- Wrap every single component
- Use error boundaries for expected errors (use try-catch)
- Nest too many levels (3-4 levels max)
- Forget to add context information

### 2. Error Messages

**DO:**

- Use user-friendly language
- Explain what went wrong
- Provide clear recovery actions
- Include support contact information

**DON'T:**

- Show technical jargon to users
- Expose sensitive error details in production
- Use generic "Something went wrong" without context
- Forget to log detailed errors for debugging

### 3. Error Recovery

**DO:**

- Provide multiple recovery options
- Clear relevant cached data
- Preserve user data when possible
- Test recovery mechanisms

**DON'T:**

- Auto-retry without user confirmation
- Clear all application state
- Reload the page as the only option
- Forget to handle async errors

### 4. Error Logging

**DO:**

- Log errors with rich context
- Include user journey information
- Use error fingerprinting for deduplication
- Set appropriate severity levels

**DON'T:**

- Log sensitive user data
- Spam logs with duplicate errors
- Forget to handle logging failures
- Skip logging in production

### 5. Performance Considerations

**DO:**

- Keep error boundaries lightweight
- Lazy load error monitoring services
- Batch error reports when possible
- Rate limit error reporting

**DON'T:**

- Block rendering with heavy error handlers
- Make synchronous external calls
- Log excessively large stack traces
- Retry indefinitely

---

## Special Considerations

### 1. API Route Error Handling

API routes should use try-catch, not error boundaries:

```typescript
// src/app/api/purchase/route.ts
import { handleError, logError } from '@/lib/errors'

export async function POST(request: Request) {
  try {
    // Process payment
    const result = await processPayment(data)
    return Response.json({ success: true, data: result })
  } catch (error) {
    // Log the error
    logError(error, {
      page: 'api/purchase',
      action: 'payment-processing',
      severity: 'critical',
    })

    // Return error response
    return handleError(error, '/api/purchase')
  }
}
```

### 2. Async Operation Errors

Handle async errors explicitly:

```typescript
// Handle promise rejections
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) throw new Error('Fetch failed')
    return await response.json()
  } catch (error) {
    logError(error, { page: 'data-fetch' })
    throw error // Re-throw to be caught by error boundary
  }
}

// Handle in component
function DataComponent() {
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData().catch((error) => {
      setError(error)
      logError(error, { component: 'DataComponent' })
    })
  }, [])

  if (error) {
    throw error // Will be caught by nearest error boundary
  }
}
```

### 3. Third-Party Integration Failures

Protect third-party integrations:

```typescript
// Razorpay payment
<ErrorBoundary
  context={{
    page: 'payment',
    component: 'Razorpay',
    action: 'payment-initialization'
  }}
  severity="critical"
  onError={(error) => {
    // Notify payment support
    notifyPaymentSupport(error)
  }}
>
  <RazorpayPayment />
</ErrorBoundary>

// WhatsApp integration
<ErrorBoundary
  context={{
    component: 'WhatsAppButton',
    action: 'whatsapp-redirect'
  }}
  fallback={<AlternativeContactMethod />}
>
  <WhatsAppButton />
</ErrorBoundary>
```

### 4. Database Connection Errors

Handle at the service level:

```typescript
// src/lib/database/connection.ts
import { logError, DatabaseError } from '@/lib/errors'

export async function query(sql: string, params: any[]) {
  try {
    const result = await pool.query(sql, params)
    return result
  } catch (error) {
    logError(error, {
      action: 'database-query',
      severity: 'critical',
      recoverable: false,
    })

    throw new DatabaseError('Database query failed')
  }
}
```

### 5. Authentication Failures

Handle with specific error boundaries:

```typescript
// Protected route
export default function ProtectedPage() {
  return (
    <ErrorBoundary
      context={{ page: 'protected', component: 'AuthGuard' }}
      severity="high"
      fallback={(error, reset) => (
        <div>
          <h2>Authentication Error</h2>
          <p>Please sign in again</p>
          <button onClick={() => router.push('/auth/signin')}>
            Go to Sign In
          </button>
        </div>
      )}
    >
      <ProtectedContent />
    </ErrorBoundary>
  )
}
```

---

## Error Boundary Testing Checklist

- [ ] Global error boundary catches root layout errors
- [ ] Root error boundary catches unhandled errors
- [ ] Feature error boundaries catch feature-specific errors
- [ ] Component error boundaries wrap critical components
- [ ] Error logging works in development
- [ ] Error logging works in production
- [ ] Error fingerprinting deduplicates similar errors
- [ ] Error API endpoint accepts and validates reports
- [ ] Rate limiting prevents error spam
- [ ] Error recovery (reset) clears error state
- [ ] Error context includes relevant information
- [ ] Severity levels are set appropriately
- [ ] User-friendly messages display in production
- [ ] Developer error details show in development
- [ ] Support contact information is accessible
- [ ] Alternative actions are provided
- [ ] Payment errors include special warnings
- [ ] Admin errors trigger high-priority alerts
- [ ] Error boundaries don't catch expected errors
- [ ] Error boundaries properly clean up on unmount

---

## Monitoring Dashboard Metrics

Track these metrics in your monitoring dashboard:

1. **Error Rate:** Errors per user session
2. **Error Distribution:** By severity, page, component
3. **Recovery Rate:** How often users recover from errors
4. **Time to Recovery:** How long users take to recover
5. **Critical Errors:** Count and trend of critical errors
6. **Payment Errors:** Specific tracking for payment failures
7. **Error Fingerprints:** Most common error patterns
8. **Browser Distribution:** Errors by browser/device
9. **User Impact:** How many users affected by each error
10. **Response Time:** Support response time for critical errors

---

## Future Enhancements

1. **Error Prediction:** ML-based error prediction
2. **Auto-Recovery:** Automatic retry mechanisms
3. **Error Clustering:** Group similar errors
4. **User Impact Scoring:** Prioritize errors by user impact
5. **Real-time Alerts:** Slack/Email alerts for critical errors
6. **Error Replay:** Session replay for error debugging
7. **A/B Testing:** Test different error messages
8. **Error Analytics:** Advanced error trend analysis
9. **Proactive Monitoring:** Detect errors before users encounter them
10. **Error Documentation:** Auto-generate error documentation

---

## Support and Maintenance

### For Developers

- Review error logs daily
- Update error messages based on user feedback
- Monitor error trends and patterns
- Keep error boundaries lightweight
- Test error scenarios regularly

### For Support Team

- Familiarize with error IDs and fingerprints
- Know escalation procedures for critical errors
- Track recurring user-reported errors
- Provide feedback on error message clarity
- Monitor support tickets related to errors

### For Product Team

- Review error impact on user journeys
- Prioritize error fixes based on severity
- Analyze error recovery rates
- Improve error prevention strategies
- Plan features to reduce error-prone areas

---

## Conclusion

This error boundary system provides comprehensive error handling for the Cerebrum Biology Academy website. It prevents full application crashes, provides excellent user experience during errors, and enables effective error monitoring and debugging.

Key benefits:

- ✅ Hierarchical error containment
- ✅ Context-aware error logging
- ✅ User-friendly error messages
- ✅ Multiple recovery options
- ✅ Integration-ready for monitoring services
- ✅ Developer-friendly debugging
- ✅ Production-ready error handling

For questions or improvements, contact the technical team or refer to the Next.js error handling documentation.
