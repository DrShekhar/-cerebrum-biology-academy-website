import * as Sentry from '@sentry/nextjs'

export { Sentry }

export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  })
}

export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info',
  context?: Record<string, any>
) {
  Sentry.captureMessage(message, {
    level,
    extra: context,
  })
}

export function setUser(user: { id: string; email?: string; role?: string }) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    role: user.role,
  })
}

export function clearUser() {
  Sentry.setUser(null)
}

export function addBreadcrumb(message: string, data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    message,
    data,
    timestamp: Date.now() / 1000,
  })
}

export function withSentryContext<T>(
  fn: () => Promise<T>,
  context: {
    operation?: string
    tags?: Record<string, string>
    user?: { id: string; email?: string; role?: string }
  }
): Promise<T> {
  return Sentry.withScope(async (scope) => {
    if (context.operation) {
      scope.setTag('operation', context.operation)
    }

    if (context.tags) {
      Object.entries(context.tags).forEach(([key, value]) => {
        scope.setTag(key, value)
      })
    }

    if (context.user) {
      scope.setUser({
        id: context.user.id,
        email: context.user.email,
        role: context.user.role,
      })
    }

    return fn()
  })
}
