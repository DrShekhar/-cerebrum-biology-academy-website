interface LogLevel {
  DEBUG: 0
  INFO: 1
  WARN: 2
  ERROR: 3
}

const LOG_LEVELS: LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
}

type LogLevelString = keyof LogLevel

interface LogEntry {
  timestamp: string
  level: LogLevelString
  message: string
  data?: any
  context?: any
}

class Logger {
  private currentLevel: number
  private isDevelopment: boolean
  private isProduction: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.isProduction = process.env.NODE_ENV === 'production'

    // Set log level based on environment
    const envLevel = (process.env.LOG_LEVEL as LogLevelString) || 'INFO'
    this.currentLevel = LOG_LEVELS[envLevel] || LOG_LEVELS.INFO
  }

  private shouldLog(level: LogLevelString): boolean {
    return LOG_LEVELS[level] >= this.currentLevel
  }

  private formatMessage(level: LogLevelString, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      context: {
        env: process.env.NODE_ENV,
        service: 'cerebrum-api',
      },
    }
  }

  private output(logEntry: LogEntry): void {
    const { timestamp, level, message, data } = logEntry

    if (this.isDevelopment) {
      // Pretty console output for development
      const colors = {
        DEBUG: '\x1b[36m', // Cyan
        INFO: '\x1b[32m', // Green
        WARN: '\x1b[33m', // Yellow
        ERROR: '\x1b[31m', // Red
      }
      const reset = '\x1b[0m'

      console.log(`${colors[level]}[${level}]${reset} ${timestamp} - ${message}`, data ? data : '')
    } else {
      // Structured JSON output for production
      console.log(JSON.stringify(logEntry))
    }
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('DEBUG')) {
      this.output(this.formatMessage('DEBUG', message, data))
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('INFO')) {
      this.output(this.formatMessage('INFO', message, data))
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('WARN')) {
      this.output(this.formatMessage('WARN', message, data))
    }
  }

  error(message: string, error?: any): void {
    if (this.shouldLog('ERROR')) {
      let errorData = error

      // Extract useful information from Error objects
      if (error instanceof Error) {
        errorData = {
          name: error.name,
          message: error.message,
          stack: error.stack,
          ...((error as any).cause && { cause: (error as any).cause }),
        }
      }

      this.output(this.formatMessage('ERROR', message, errorData))
    }
  }

  // Structured logging methods for specific use cases

  apiRequest(method: string, path: string, userId?: string, duration?: number): void {
    this.info('API Request', {
      type: 'api_request',
      method,
      path,
      userId,
      duration,
    })
  }

  apiResponse(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    userId?: string
  ): void {
    const level = statusCode >= 400 ? 'ERROR' : statusCode >= 300 ? 'WARN' : 'INFO'

    this[level.toLowerCase() as 'info' | 'warn' | 'error']('API Response', {
      type: 'api_response',
      method,
      path,
      statusCode,
      duration,
      userId,
    })
  }

  databaseQuery(query: string, duration: number, error?: any): void {
    if (error) {
      this.error('Database Query Failed', {
        type: 'database_error',
        query: query.substring(0, 200), // Truncate long queries
        duration,
        error,
      })
    } else {
      this.debug('Database Query', {
        type: 'database_query',
        query: query.substring(0, 200),
        duration,
      })
    }
  }

  authentication(userId: string, action: string, success: boolean, details?: any): void {
    this.info('Authentication Event', {
      type: 'authentication',
      userId,
      action,
      success,
      details,
    })
  }

  authorization(userId: string, resource: string, action: string, granted: boolean): void {
    this.info('Authorization Check', {
      type: 'authorization',
      userId,
      resource,
      action,
      granted,
    })
  }

  rateLimitHit(identifier: string, endpoint: string, limit: number): void {
    this.warn('Rate Limit Hit', {
      type: 'rate_limit',
      identifier,
      endpoint,
      limit,
    })
  }

  securityEvent(event: string, details: any, severity: 'low' | 'medium' | 'high' = 'medium'): void {
    this.warn('Security Event', {
      type: 'security',
      event,
      severity,
      details,
    })
  }

  performanceMetric(metric: string, value: number, unit: string, context?: any): void {
    this.info('Performance Metric', {
      type: 'performance',
      metric,
      value,
      unit,
      context,
    })
  }

  businessEvent(event: string, data: any): void {
    this.info('Business Event', {
      type: 'business',
      event,
      data,
    })
  }

  testEvent(eventType: string, testSessionId: string, userId: string, details: any): void {
    this.info('Test Event', {
      type: 'test_event',
      eventType,
      testSessionId,
      userId,
      details,
    })
  }

  questionEvent(eventType: string, questionId: string, userId: string, details: any): void {
    this.info('Question Event', {
      type: 'question_event',
      eventType,
      questionId,
      userId,
      details,
    })
  }

  // Error tracking with context
  trackError(error: Error, context?: any): void {
    this.error('Tracked Error', {
      type: 'tracked_error',
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
    })
  }

  // Audit logging
  audit(userId: string, action: string, resource: string, details?: any): void {
    this.info('Audit Log', {
      type: 'audit',
      userId,
      action,
      resource,
      details,
      timestamp: new Date().toISOString(),
    })
  }

  // Health check logging
  healthCheck(service: string, status: 'healthy' | 'unhealthy', details?: any): void {
    const level = status === 'healthy' ? 'info' : 'error'
    this[level]('Health Check', {
      type: 'health_check',
      service,
      status,
      details,
    })
  }

  // External service calls
  externalService(
    service: string,
    operation: string,
    duration: number,
    success: boolean,
    error?: any
  ): void {
    if (success) {
      this.info('External Service Call', {
        type: 'external_service',
        service,
        operation,
        duration,
        success,
      })
    } else {
      this.error('External Service Failed', {
        type: 'external_service',
        service,
        operation,
        duration,
        success,
        error,
      })
    }
  }

  // Cache operations
  cache(operation: string, key: string, hit: boolean, duration?: number): void {
    this.debug('Cache Operation', {
      type: 'cache',
      operation,
      key: key.substring(0, 50), // Truncate long keys
      hit,
      duration,
    })
  }

  // Queue operations
  queue(queue: string, operation: string, jobId?: string, details?: any): void {
    this.info('Queue Operation', {
      type: 'queue',
      queue,
      operation,
      jobId,
      details,
    })
  }

  // Webhook events
  webhook(provider: string, event: string, success: boolean, details?: any): void {
    this.info('Webhook Event', {
      type: 'webhook',
      provider,
      event,
      success,
      details,
    })
  }

  // Payment events
  payment(
    transactionId: string,
    amount: number,
    currency: string,
    status: string,
    userId?: string
  ): void {
    this.info('Payment Event', {
      type: 'payment',
      transactionId,
      amount,
      currency,
      status,
      userId,
    })
  }

  // Email events
  email(to: string, subject: string, success: boolean, provider?: string, error?: any): void {
    if (success) {
      this.info('Email Sent', {
        type: 'email',
        to: this.maskEmail(to),
        subject,
        success,
        provider,
      })
    } else {
      this.error('Email Failed', {
        type: 'email',
        to: this.maskEmail(to),
        subject,
        success,
        provider,
        error,
      })
    }
  }

  // Utility methods
  private maskEmail(email: string): string {
    if (!email || !email.includes('@')) return email
    const [local, domain] = email.split('@')
    const maskedLocal =
      local.length > 2 ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1] : local
    return `${maskedLocal}@${domain}`
  }

  // Create child logger with additional context
  child(context: any): Logger {
    const childLogger = new Logger()
    const originalOutput = childLogger.output.bind(childLogger)

    childLogger.output = (logEntry: LogEntry) => {
      logEntry.context = { ...logEntry.context, ...context }
      originalOutput(logEntry)
    }

    return childLogger
  }

  // Timer utility for measuring durations
  timer(label: string) {
    const start = Date.now()

    return {
      end: () => {
        const duration = Date.now() - start
        this.debug(`Timer: ${label}`, { duration })
        return duration
      },
    }
  }

  // Async wrapper for logging function execution
  async logAsync<T>(
    label: string,
    fn: () => Promise<T>,
    options: {
      logStart?: boolean
      logEnd?: boolean
      logError?: boolean
    } = {}
  ): Promise<T> {
    const { logStart = true, logEnd = true, logError = true } = options
    const timer = this.timer(label)

    if (logStart) {
      this.debug(`Starting: ${label}`)
    }

    try {
      const result = await fn()

      if (logEnd) {
        const duration = timer.end()
        this.debug(`Completed: ${label}`, { duration })
      }

      return result
    } catch (error) {
      if (logError) {
        const duration = timer.end()
        this.error(`Failed: ${label}`, { error, duration })
      }
      throw error
    }
  }
}

// Create singleton logger instance
export const logger = new Logger()

// Export Logger class for creating child loggers
export { Logger }

// Export types
export type { LogLevelString, LogEntry }

export default logger
