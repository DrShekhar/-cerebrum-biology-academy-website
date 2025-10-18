/**
 * Application Logger
 *
 * Provides structured logging with different log levels and production-ready features.
 * Integrates with monitoring services for centralized log aggregation.
 */

import { sentry } from './sentry'

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: Error
  userId?: string
  requestId?: string
}

class Logger {
  private minLevel: LogLevel
  private isDevelopment: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.minLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO
  }

  /**
   * Log debug message (development only)
   */
  debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context)
  }

  /**
   * Log informational message
   */
  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context)
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context)

    // Send to Sentry as well
    sentry.captureMessage(message, 'warning', {
      extra: context,
    })
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, context, error)

    // Send to Sentry
    if (error) {
      sentry.captureException(error, {
        extra: { message, ...context },
      })
    } else {
      sentry.captureMessage(message, 'error', {
        extra: context,
      })
    }
  }

  /**
   * Log fatal error (crashes the application)
   */
  fatal(message: string, error: Error, context?: Record<string, any>): void {
    this.log(LogLevel.FATAL, message, context, error)

    // Send to Sentry
    sentry.captureException(error, {
      tags: { fatal: 'true' },
      extra: { message, ...context },
    })

    // In production, this might trigger alerts
    console.error('FATAL ERROR - Application may be unstable')
  }

  /**
   * Log API request
   */
  logRequest(req: {
    method: string
    url: string
    statusCode?: number
    duration?: number
    userId?: string
  }): void {
    const message = `${req.method} ${req.url} ${req.statusCode || '---'}`

    this.info(message, {
      type: 'api_request',
      method: req.method,
      url: req.url,
      statusCode: req.statusCode,
      duration: req.duration,
      userId: req.userId,
    })
  }

  /**
   * Log AI operation
   */
  logAIOperation(operation: {
    type: 'tutor' | 'test_generator' | 'whatsapp'
    model: string
    tokensUsed?: number
    cost?: number
    duration?: number
    userId?: string
  }): void {
    this.info(`AI Operation: ${operation.type}`, {
      type: 'ai_operation',
      ...operation,
    })
  }

  /**
   * Log database operation
   */
  logDBOperation(operation: {
    type: 'query' | 'mutation'
    table: string
    duration: number
    success: boolean
  }): void {
    const level = operation.success ? LogLevel.DEBUG : LogLevel.WARN

    this.log(level, `DB ${operation.type}: ${operation.table}`, {
      type: 'db_operation',
      ...operation,
    })
  }

  /**
   * Log performance metric
   */
  logPerformance(metric: {
    name: string
    value: number
    unit: string
    tags?: Record<string, string>
  }): void {
    this.info(`Performance: ${metric.name}`, {
      type: 'performance',
      ...metric,
    })
  }

  /**
   * Log security event
   */
  logSecurity(event: {
    type: 'auth_failure' | 'rate_limit' | 'suspicious_activity'
    userId?: string
    ip?: string
    details: string
  }): void {
    this.warn(`Security Event: ${event.type}`, {
      type: 'security',
      ...event,
    })
  }

  /**
   * Core logging method
   */
  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
    error?: Error
  ): void {
    // Skip if below minimum level
    if (level < this.minLevel) {
      return
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: this.sanitizeContext(context),
      error,
      requestId: this.getRequestId(),
    }

    // Format and output
    this.output(entry)

    // Store in log aggregation service (in production)
    if (!this.isDevelopment) {
      this.sendToLogAggregator(entry)
    }
  }

  /**
   * Output log entry
   */
  private output(entry: LogEntry): void {
    const levelName = LogLevel[entry.level]
    const emoji = this.getLevelEmoji(entry.level)

    if (this.isDevelopment) {
      // Pretty output for development
      console.log(`\n${emoji} [${levelName}] ${entry.message}`)
      console.log(`⏰ ${entry.timestamp}`)

      if (entry.context) {
        console.log('📦 Context:', entry.context)
      }

      if (entry.error) {
        console.error('🔥 Error:', entry.error)
      }
    } else {
      // JSON output for production (log aggregators)
      console.log(
        JSON.stringify({
          level: levelName,
          message: entry.message,
          timestamp: entry.timestamp,
          context: entry.context,
          error: entry.error
            ? {
                name: entry.error.name,
                message: entry.error.message,
                stack: entry.error.stack,
              }
            : undefined,
          requestId: entry.requestId,
        })
      )
    }
  }

  /**
   * Get emoji for log level
   */
  private getLevelEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '🔍'
      case LogLevel.INFO:
        return 'ℹ️'
      case LogLevel.WARN:
        return '⚠️'
      case LogLevel.ERROR:
        return '❌'
      case LogLevel.FATAL:
        return '💥'
      default:
        return '📝'
    }
  }

  /**
   * Sanitize context to remove sensitive data
   */
  private sanitizeContext(context?: Record<string, any>): Record<string, any> | undefined {
    if (!context) return undefined

    const sanitized: Record<string, any> = {}
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'apiKey']

    for (const [key, value] of Object.entries(context)) {
      if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk))) {
        sanitized[key] = '[REDACTED]'
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }

  /**
   * Get request ID from context (if available)
   */
  private getRequestId(): string | undefined {
    // In a real implementation, this would get from AsyncLocalStorage or headers
    return undefined
  }

  /**
   * Send to log aggregation service (production)
   */
  private sendToLogAggregator(entry: LogEntry): void {
    // In production, send to services like:
    // - DataDog
    // - LogDNA
    // - CloudWatch Logs
    // - Vercel Logs (automatic)
    // For now, just ensure it's in JSON format for Vercel
  }

  /**
   * Create child logger with context
   */
  child(context: Record<string, any>): Logger {
    const childLogger = new Logger()

    // Override log method to include parent context
    const originalLog = childLogger.log.bind(childLogger)
    childLogger.log = (level, message, childContext, error) => {
      originalLog(level, message, { ...context, ...childContext }, error)
    }

    return childLogger
  }
}

// Export singleton instance
export const logger = new Logger()

// Export convenience functions
export const log = {
  debug: (msg: string, ctx?: Record<string, any>) => logger.debug(msg, ctx),
  info: (msg: string, ctx?: Record<string, any>) => logger.info(msg, ctx),
  warn: (msg: string, ctx?: Record<string, any>) => logger.warn(msg, ctx),
  error: (msg: string, err?: Error, ctx?: Record<string, any>) => logger.error(msg, err, ctx),
  fatal: (msg: string, err: Error, ctx?: Record<string, any>) => logger.fatal(msg, err, ctx),
}
