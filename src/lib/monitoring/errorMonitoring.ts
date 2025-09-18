// Error monitoring and reporting service
// This can be easily extended to integrate with Sentry, LogRocket, or other services

interface ErrorContext {
  user?: {
    id?: string
    email?: string
    role?: string
  }
  request?: {
    url: string
    userAgent: string
    timestamp: string
  }
  application?: {
    environment: string
    version: string
  }
  custom?: Record<string, any>
}

interface ErrorReport {
  error: {
    message: string
    stack?: string
    name: string
  }
  context: ErrorContext
  fingerprint: string
  severity: 'low' | 'normal' | 'high' | 'critical'
}

class ErrorMonitoringService {
  private isProduction = process.env.NODE_ENV === 'production'
  private apiEndpoint = '/api/errors'

  generateFingerprint(error: Error, context: ErrorContext): string {
    // Create a unique fingerprint for error grouping
    const components = [
      error.name,
      error.message,
      context.request?.url || 'unknown',
      error.stack?.split('\n')[1] || 'unknown', // First line of stack trace
    ]

    // Simple hash function for fingerprinting
    return btoa(components.join('|'))
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 16)
  }

  async reportError(
    error: Error,
    context: Partial<ErrorContext> = {},
    severity: ErrorReport['severity'] = 'normal'
  ): Promise<void> {
    try {
      const errorReport: ErrorReport = {
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
        context: {
          request: {
            url:
              context.request?.url ||
              (typeof window !== 'undefined' ? window.location.href : 'unknown'),
            userAgent:
              context.request?.userAgent ||
              (typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown'),
            timestamp: context.request?.timestamp || new Date().toISOString(),
          },
          application: {
            environment: this.isProduction ? 'production' : 'development',
            version: process.env.npm_package_version || '1.0.0',
          },
          user: context.user,
          custom: context.custom,
        },
        fingerprint: '',
        severity,
      }

      errorReport.fingerprint = this.generateFingerprint(error, errorReport.context)

      // In development, just log to console
      if (!this.isProduction) {
        console.group(`🚨 Error Report [${severity}]`)
        console.error('Error:', error)
        console.log('Context:', errorReport.context)
        console.log('Fingerprint:', errorReport.fingerprint)
        console.groupEnd()
        return
      }

      // In production, send to monitoring service
      await this.sendToMonitoringService(errorReport)
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  }

  private async sendToMonitoringService(errorReport: ErrorReport): Promise<void> {
    try {
      // Send to internal API endpoint for processing
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      })

      // TODO: Add integrations for external services
      // await this.sendToSentry(errorReport)
      // await this.sendToLogRocket(errorReport)
      // await this.sendToDatadog(errorReport)
    } catch (error) {
      console.error('Failed to send error to monitoring service:', error)
    }
  }

  // Integration methods for external services
  private async sendToSentry(errorReport: ErrorReport): Promise<void> {
    // Example Sentry integration
    // if (window.Sentry) {
    //   window.Sentry.withScope((scope) => {
    //     scope.setTag('fingerprint', errorReport.fingerprint)
    //     scope.setLevel(errorReport.severity)
    //     scope.setContext('custom', errorReport.context.custom || {})
    //     if (errorReport.context.user) {
    //       scope.setUser(errorReport.context.user)
    //     }
    //     window.Sentry.captureException(new Error(errorReport.error.message))
    //   })
    // }
  }

  // Rate limiting to prevent spam
  private errorCounts = new Map<string, { count: number; firstSeen: number }>()
  private readonly maxErrorsPerFingerprint = 10
  private readonly rateLimitWindow = 60 * 1000 // 1 minute

  private shouldRateLimit(fingerprint: string): boolean {
    const now = Date.now()
    const errorCount = this.errorCounts.get(fingerprint)

    if (!errorCount) {
      this.errorCounts.set(fingerprint, { count: 1, firstSeen: now })
      return false
    }

    // Reset if window has passed
    if (now - errorCount.firstSeen > this.rateLimitWindow) {
      this.errorCounts.set(fingerprint, { count: 1, firstSeen: now })
      return false
    }

    errorCount.count++

    // Rate limit if too many errors
    return errorCount.count > this.maxErrorsPerFingerprint
  }

  async reportErrorWithRateLimit(
    error: Error,
    context: Partial<ErrorContext> = {},
    severity: ErrorReport['severity'] = 'normal'
  ): Promise<void> {
    const tempFingerprint = this.generateFingerprint(error, context as ErrorContext)

    if (this.shouldRateLimit(tempFingerprint)) {
      console.warn(`Error rate limited: ${tempFingerprint}`)
      return
    }

    await this.reportError(error, context, severity)
  }

  // User feedback collection
  async reportUserFeedback(
    errorId: string,
    userFeedback: {
      description: string
      email?: string
      reproductionSteps?: string
    }
  ): Promise<void> {
    if (!this.isProduction) {
      console.log('User feedback:', { errorId, userFeedback })
      return
    }

    try {
      await fetch('/api/errors/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errorId,
          feedback: userFeedback,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error('Failed to submit user feedback:', error)
    }
  }
}

// Singleton instance
export const errorMonitoring = new ErrorMonitoringService()

// React error boundary integration
export function reportReactError(
  error: Error,
  errorInfo: {
    componentStack: string
  },
  component?: string
): void {
  errorMonitoring.reportErrorWithRateLimit(
    error,
    {
      custom: {
        type: 'react_error',
        componentStack: errorInfo.componentStack,
        component,
      },
    },
    'high'
  )
}

// Unhandled promise rejection handler
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))

    errorMonitoring.reportErrorWithRateLimit(
      error,
      {
        custom: {
          type: 'unhandled_promise_rejection',
          promise: event.promise,
        },
      },
      'high'
    )
  })

  // Global error handler
  window.addEventListener('error', (event) => {
    const error = event.error instanceof Error ? event.error : new Error(event.message)

    errorMonitoring.reportErrorWithRateLimit(
      error,
      {
        custom: {
          type: 'global_error',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      },
      'critical'
    )
  })
}
