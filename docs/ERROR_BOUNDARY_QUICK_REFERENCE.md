# Error Boundary Quick Reference Guide

## Quick Start

### Import Error Boundary Component

```tsx
import { ErrorBoundary } from '@/components/errors'
```

### Basic Usage

```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

---

## Common Use Cases

### 1. Protect Payment Components

```tsx
<ErrorBoundary context={{ page: 'payment', component: 'RazorpayForm' }} severity="critical">
  <RazorpayPayment />
</ErrorBoundary>
```

### 2. Protect Data Fetching

```tsx
<ErrorBoundary context={{ page: 'courses' }}>
  <Suspense fallback={<Loading />}>
    <CourseList />
  </Suspense>
</ErrorBoundary>
```

### 3. Custom Error UI

```tsx
<ErrorBoundary
  fallback={(error, reset) => (
    <div>
      <h2>Oops!</h2>
      <button onClick={reset}>Try Again</button>
    </div>
  )}
>
  <Component />
</ErrorBoundary>
```

### 4. With Error Callback

```tsx
<ErrorBoundary
  onError={(error, info) => {
    analytics.track('component_error', { error })
  }}
>
  <Component />
</ErrorBoundary>
```

---

## Error Logging

### Log an Error

```tsx
import { logError } from '@/lib/errors'

logError(error, {
  page: 'checkout',
  component: 'PaymentForm',
  severity: 'critical',
})
```

### Report to API

```tsx
import { reportErrorToAPI } from '@/lib/errors'

await reportErrorToAPI(error, {
  page: 'courses',
  severity: 'high',
})
```

---

## Severity Levels

| Level      | When to Use                 | Examples                        |
| ---------- | --------------------------- | ------------------------------- |
| `low`      | UI glitches, minor issues   | Button styling, tooltip errors  |
| `normal`   | Standard errors             | Data fetch failures, validation |
| `high`     | Important features affected | Course loading, profile updates |
| `critical` | Payment, auth, admin errors | Payment failure, login errors   |

---

## Error Context

```typescript
interface ErrorContext {
  page?: string // 'checkout', 'courses'
  component?: string // 'PaymentForm', 'CourseList'
  action?: string // 'payment-submit', 'course-load'
  userId?: string // User identifier
  severity?: ErrorSeverity // Error importance
  recoverable?: boolean // Can user recover?
}
```

---

## Error Boundary Locations

### Automatic (Next.js)

- `/src/app/error.tsx` - Root error boundary
- `/src/app/global-error.tsx` - Global error boundary

### Feature-Specific

- `/src/app/courses/error.tsx` - Course browsing
- `/src/app/purchase/error.tsx` - Payment flow
- `/src/app/dashboard/error.tsx` - Student portal
- `/src/app/admin/error.tsx` - Admin panel

### Component

- `/src/components/errors/ErrorBoundary.tsx` - Reusable component
- `/src/components/errors/ErrorFallback.tsx` - Default UI

---

## Testing Errors

### Throw Test Error

```tsx
'use client'

export default function TestPage() {
  throw new Error('Test error boundary')
}
```

### Conditional Error

```tsx
const [error, setError] = useState(false)

if (error) throw new Error('Test')

return <button onClick={() => setError(true)}>Trigger</button>
```

---

## Best Practices Checklist

- ✅ Use error boundaries for critical components
- ✅ Set appropriate severity levels
- ✅ Provide error context
- ✅ Don't use for expected errors (use try-catch)
- ✅ Test error recovery flows
- ✅ Keep error messages user-friendly
- ✅ Log errors with sufficient context
- ✅ Don't wrap every component
- ✅ Provide multiple recovery options
- ✅ Clear relevant cache on reset

---

## Common Mistakes

❌ **Wrapping everything in error boundaries**

```tsx
// DON'T
<ErrorBoundary>
  <ErrorBoundary>
    <ErrorBoundary>
      <Button />
    </ErrorBoundary>
  </ErrorBoundary>
</ErrorBoundary>
```

✅ **Wrap at appropriate levels**

```tsx
// DO
<ErrorBoundary context={{ page: 'checkout' }}>
  <CheckoutPage>
    <ErrorBoundary context={{ component: 'PaymentForm' }}>
      <PaymentForm />
    </ErrorBoundary>
  </CheckoutPage>
</ErrorBoundary>
```

---

❌ **Using error boundaries for expected errors**

```tsx
// DON'T - Use try-catch instead
<ErrorBoundary>
  {data.length === 0 && throw new Error('No data')}
</ErrorBoundary>
```

✅ **Handle expected cases normally**

```tsx
// DO
if (data.length === 0) {
  return <EmptyState />
}
```

---

❌ **Missing error context**

```tsx
// DON'T
<ErrorBoundary>
  <CriticalComponent />
</ErrorBoundary>
```

✅ **Provide context**

```tsx
// DO
<ErrorBoundary
  context={{
    page: 'payment',
    component: 'CriticalComponent',
    severity: 'critical',
  }}
>
  <CriticalComponent />
</ErrorBoundary>
```

---

## API Error Handling

### In API Routes

```typescript
import { handleError, logError } from '@/lib/errors'

export async function POST(request: Request) {
  try {
    // Your code
    return Response.json({ success: true })
  } catch (error) {
    logError(error, {
      page: 'api/endpoint',
      severity: 'high',
    })
    return handleError(error, '/api/endpoint')
  }
}
```

---

## Props Reference

### ErrorBoundary Props

```typescript
{
  children: ReactNode                    // Components to protect
  fallback?: ReactNode | Function        // Custom error UI
  onError?: Function                     // Error callback
  context?: ErrorContext                 // Error context
  severity?: ErrorSeverity               // Error severity
  showDetails?: boolean                  // Show stack in dev
}
```

---

## Recovery Actions

### Clear Cache and Reset

```typescript
const handleReset = () => {
  localStorage.removeItem('cache-key')
  sessionStorage.clear()
  reset()
}
```

### Navigate and Clear

```typescript
const handleGoBack = () => {
  sessionStorage.removeItem('payment-state')
  router.push('/courses')
}
```

---

## Error Fingerprinting

Errors are deduplicated using fingerprints:

```
Fingerprint = ErrorName|Message|Page|Component
```

Example:

```
TypeError|Cannot read property|checkout|PaymentForm
```

---

## Contact Support

For critical errors, users can contact:

- Phone: +91 88264 44334
- Email: Via /contact page
- Emergency: Priority support for payment/auth errors

---

## Additional Resources

- Full Documentation: `/docs/ERROR_BOUNDARY_STRATEGY.md`
- Error API: `/src/app/api/errors/route.ts`
- Error Utils: `/src/lib/errors/index.ts`
- Components: `/src/components/errors/`

---

Last Updated: 2025-10-29
