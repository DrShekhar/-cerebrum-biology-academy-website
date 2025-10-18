/**
 * Sentry Error Tracking Integration
 *
 * Provides centralized error tracking and monitoring for production environments.
 * Includes automatic error capturing, user context, and performance monitoring.
 */

export interface SentryConfig {
  dsn?: string
  environment: string
  tracesSampleRate: number
  enabled: boolean
}

export interface ErrorContext {
  user?: {
    id: string
    email?: string
    role?: string
  }
  tags?: Record<string, string>
  extra?: Record<string, any>
}

class SentryService {
  private config: SentryConfig
  private initialized = false

  constructor() {
    this.config = {
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    }
  }

  /**
   * Initialize Sentry with configuration
   */
  init(): void {
    if (!this.config.enabled) {
      console.log('Sentry is disabled (no DSN configured)')
      return
    }

    if (this.initialized) {
      return
    }

    // In a real implementation, this would use @sentry/nextjs
    // For now, we'll create a compatible interface
    console.log('Sentry initialized:', {
      environment: this.config.environment,
      tracesSampleRate: this.config.tracesSampleRate,
    })

    this.initialized = true
  }

  /**
   * Capture an exception
   */
  captureException(error: Error, context?: ErrorContext): string | null {
    if (!this.config.enabled) {
      console.error('Error (Sentry disabled):', error)
      return null
    }

    // Remove sensitive data
    const sanitizedError = this.sanitizeError(error)
    const sanitizedContext = this.sanitizeContext(context)

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry Error:', sanitizedError)
      console.error('Context:', sanitizedContext)
    }

    // In production, this would send to Sentry
    // Return a mock event ID
    return `event_${Date.now()}`
  }

  /**
   * Capture a message
   */
  captureMessage(
    message: string,
    level: 'info' | 'warning' | 'error' = 'info',
    context?: ErrorContext
  ): string | null {
    if (!this.config.enabled) {
      console.log(`[${level.toUpperCase()}] ${message}`)
      return null
    }

    const sanitizedContext = this.sanitizeContext(context)

    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}] ${message}`, sanitizedContext)
    }

    return `event_${Date.now()}`
  }

  /**
   * Set user context
   */
  setUser(user: { id: string; email?: string; role?: string } | null): void {
    if (!this.config.enabled) return

    if (user) {
      console.log('Sentry user context set:', {
        id: user.id,
        email: user.email ? this.maskEmail(user.email) : undefined,
        role: user.role,
      })
    } else {
      console.log('Sentry user context cleared')
    }
  }

  /**
   * Add breadcrumb (trail of events leading to error)
   */
  addBreadcrumb(breadcrumb: {
    message: string
    category?: string
    level?: 'info' | 'warning' | 'error'
    data?: Record<string, any>
  }): void {
    if (!this.config.enabled) return

    console.log('Breadcrumb:', {
      ...breadcrumb,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Set custom tags for filtering
   */
  setTags(tags: Record<string, string>): void {
    if (!this.config.enabled) return

    console.log('Sentry tags set:', tags)
  }

  /**
   * Start a performance transaction
   */
  startTransaction(
    name: string,
    op: string
  ): {
    finish: () => void
    setTag: (key: string, value: string) => void
  } {
    const startTime = Date.now()

    return {
      finish: () => {
        const duration = Date.now() - startTime
        console.log(`Transaction ${name} (${op}): ${duration}ms`)
      },
      setTag: (key: string, value: string) => {
        console.log(`Transaction tag: ${key}=${value}`)
      },
    }
  }

  /**
   * Sanitize error to remove sensitive data
   */
  private sanitizeError(error: Error): Error {
    const sanitized = new Error(error.message)
    sanitized.name = error.name
    sanitized.stack = this.sanitizeStack(error.stack || '')

    return sanitized
  }

  /**
   * Sanitize context to remove sensitive data
   */
  private sanitizeContext(context?: ErrorContext): ErrorContext | undefined {
    if (!context) return undefined

    return {
      user: context.user
        ? {
            id: context.user.id,
            email: context.user.email ? this.maskEmail(context.user.email) : undefined,
            role: context.user.role,
          }
        : undefined,
      tags: context.tags,
      extra: this.sanitizeExtra(context.extra),
    }
  }

  /**
   * Sanitize stack trace
   */
  private sanitizeStack(stack: string): string {
    // Remove file paths that might contain sensitive info
    return stack
      .split('\n')
      .map((line) => {
        // Remove absolute paths
        return line.replace(/\/Users\/[^/]+\//, '/~/')
      })
      .join('\n')
  }

  /**
   * Sanitize extra data
   */
  private sanitizeExtra(extra?: Record<string, any>): Record<string, any> | undefined {
    if (!extra) return undefined

    const sanitized: Record<string, any> = {}

    for (const [key, value] of Object.entries(extra)) {
      // Skip sensitive keys
      if (this.isSensitiveKey(key)) {
        sanitized[key] = '[REDACTED]'
        continue
      }

      // Recursively sanitize objects
      if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeExtra(value)
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }

  /**
   * Check if key is sensitive
   */
  private isSensitiveKey(key: string): boolean {
    const sensitivePatterns = [
      /password/i,
      /token/i,
      /secret/i,
      /key/i,
      /auth/i,
      /credit/i,
      /card/i,
      /ssn/i,
    ]

    return sensitivePatterns.some((pattern) => pattern.test(key))
  }

  /**
   * Mask email address
   */
  private maskEmail(email: string): string {
    const [local, domain] = email.split('@')
    if (!domain) return email

    const maskedLocal = local.length > 2 ? `${local[0]}***${local[local.length - 1]}` : '***'

    return `${maskedLocal}@${domain}`
  }
}

// Export singleton instance
export const sentry = new SentryService()

// Initialize Sentry
if (typeof window !== 'undefined') {
  sentry.init()
}
