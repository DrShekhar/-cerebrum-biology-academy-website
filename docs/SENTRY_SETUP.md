# Sentry Error Tracking Setup Guide

## Overview

Sentry is now integrated into the Cerebrum Biology Academy platform for comprehensive error tracking, performance monitoring, and session replay.

## Configuration

### 1. Environment Variables

Add the following to your `.env.local` file:

```bash
# Get these from https://sentry.io/settings/[your-org]/projects/[your-project]/keys/
NEXT_PUBLIC_SENTRY_DSN=https://[key]@o[org-id].ingest.us.sentry.io/[project-id]

# Required for source map uploads
SENTRY_ORG=your-sentry-organization-slug
SENTRY_PROJECT=your-sentry-project-slug
SENTRY_AUTH_TOKEN=your-auth-token-from-sentry
```

### 2. Create Sentry Project

1. Go to https://sentry.io and create an account
2. Create a new project and select "Next.js"
3. Copy the DSN from the project settings
4. Generate an auth token: Settings > Account > API > Auth Tokens
5. Add the token with `project:releases` and `project:write` scopes

## Features

### Automatic Error Tracking

All unhandled errors are automatically captured on both client and server:

```typescript
// This will be automatically tracked
throw new Error('Something went wrong')
```

### Manual Error Capture

Use the helper functions from `@/lib/sentry`:

```typescript
import { captureException, captureMessage } from '@/lib/sentry'

try {
  // risky operation
} catch (error) {
  captureException(error as Error, {
    userId: user.id,
    operation: 'payment-processing',
  })
}

// Log important events
captureMessage('Payment reminder sent successfully', 'info', {
  installmentId: 'inst_123',
  channel: 'whatsapp',
})
```

### User Context

Associate errors with specific users:

```typescript
import { setUser, clearUser } from '@/lib/sentry'

// After login
setUser({
  id: session.user.id,
  email: session.user.email,
  role: session.user.role,
})

// After logout
clearUser()
```

### Breadcrumbs

Track user actions leading up to errors:

```typescript
import { addBreadcrumb } from '@/lib/sentry'

addBreadcrumb('User clicked payment button', {
  amount: 5000,
  currency: 'INR',
})
```

### Contextual Tracking

Wrap operations with additional context:

```typescript
import { withSentryContext } from '@/lib/sentry'

await withSentryContext(
  async () => {
    // Your operation here
    await processPayment(installmentId)
  },
  {
    operation: 'payment-processing',
    tags: {
      paymentMethod: 'razorpay',
      environment: 'production',
    },
    user: {
      id: userId,
      email: userEmail,
      role: 'STUDENT',
    },
  }
)
```

## Security Features

### Sensitive Data Filtering

The configuration automatically:

- Filters out passwords, tokens, secrets, API keys from error messages
- Removes authorization headers and cookies
- Masks all text in session replays
- Blocks all media in replays
- Prevents errors from development environment from being sent

### Sample Rates

- **Production**: 10% of transactions (performance monitoring)
- **Development**: 100% (but errors are not sent to Sentry)
- **Error Capture**: 100% of errors captured
- **Session Replay**: 10% of sessions, 100% of error sessions

## Performance Monitoring

Sentry automatically tracks:

- API route performance
- Database query performance (via Prisma integration)
- Page load times
- Component render times

## Session Replay

When errors occur, Sentry captures:

- User interactions leading to the error
- Console logs
- Network requests
- DOM snapshots

All sensitive data is masked automatically.

## Dashboard Features

Access your Sentry dashboard to view:

1. **Issues**: All errors grouped by type
2. **Performance**: Slow transactions and operations
3. **Releases**: Track errors per deployment
4. **Alerts**: Configure notifications for critical errors

## Best Practices

### 1. Use Contextual Information

Always provide context when capturing errors:

```typescript
captureException(error, {
  component: 'PaymentForm',
  userId: user.id,
  amount: paymentAmount,
  installmentId: id,
})
```

### 2. Set User Context in Middleware

Update `src/lib/auth/middleware.ts` to automatically set user context:

```typescript
import { setUser } from '@/lib/sentry'

export function withAuth(handler) {
  return async (req, session) => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
      })
    }
    return handler(req, session)
  }
}
```

### 3. Use Tags for Filtering

Add tags to make errors easier to filter:

```typescript
Sentry.setTag('feature', 'payment-reminders')
Sentry.setTag('channel', 'whatsapp')
```

### 4. Add Breadcrumbs for User Journey

Track important user actions:

```typescript
addBreadcrumb('Lead created', { leadId, source: 'landing-page' })
addBreadcrumb('Demo scheduled', { demoId, counselorId })
addBreadcrumb('Payment initiated', { amount, method: 'razorpay' })
```

## Monitoring Routes

Sentry tunnels error reports through `/monitoring` to bypass ad-blockers. This route is automatically configured and doesn't require any action.

## Testing

To test Sentry integration:

```typescript
// In any component or API route
import { captureMessage } from '@/lib/sentry'

captureMessage('Sentry test message', 'info')
```

Then check your Sentry dashboard for the message.

## Troubleshooting

### Source Maps Not Uploading

1. Verify `SENTRY_AUTH_TOKEN` is set correctly
2. Check token has `project:releases` and `project:write` scopes
3. Run build with `npm run build` and check output for Sentry logs

### Errors Not Appearing

1. Verify `NEXT_PUBLIC_SENTRY_DSN` is set
2. Check you're not in development mode (errors are filtered)
3. Ensure error isn't being caught without re-throwing

### Too Many Errors

Adjust sample rates in `sentry.*.config.ts`:

```typescript
Sentry.init({
  tracesSampleRate: 0.05, // 5% of transactions
  replaysOnErrorSampleRate: 0.5, // 50% of error sessions
})
```

## Cost Optimization

To reduce Sentry costs:

1. Lower `tracesSampleRate` (currently 10%)
2. Lower `replaysSessionSampleRate` (currently 10%)
3. Add more errors to `ignoreErrors` array
4. Filter out specific errors in `beforeSend`

## Next Steps

1. Set up Sentry alerts for critical errors
2. Configure team notifications
3. Set up release tracking for deployments
4. Create custom dashboards for key metrics
5. Integrate with Slack/Discord for real-time alerts
