import pino from 'pino'
import { captureException, captureMessage } from '@/lib/sentry'

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

const pinoConfig = {
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),

  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() }
    },
    bindings: (bindings: any) => {
      return {
        pid: bindings.pid,
        hostname: bindings.hostname,
        service: 'cerebrum-biology-academy',
        env: process.env.NODE_ENV,
      }
    },
  },

  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,

  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },

  redact: {
    paths: [
      'password',
      'token',
      'authorization',
      'cookie',
      'req.headers.authorization',
      'req.headers.cookie',
      'res.headers["set-cookie"]',
      '*.password',
      '*.token',
      '*.secret',
      '*.apiKey',
    ],
    censor: '[REDACTED]',
  },

  base: {
    service: 'cerebrum-biology-academy',
    env: process.env.NODE_ENV,
  },
}

const transport = isDevelopment
  ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        singleLine: false,
        messageFormat: '{levelLabel} - {msg}',
      },
    }
  : undefined

export const pinoLogger = transport ? pino(pinoConfig, pino.transport(transport)) : pino(pinoConfig)

export interface LogContext {
  userId?: string
  requestId?: string
  sessionId?: string
  ip?: string
  userAgent?: string
  [key: string]: any
}

export class ProductionLogger {
  private logger: pino.Logger
  private context: LogContext

  constructor(context: LogContext = {}) {
    this.logger = pinoLogger
    this.context = context
  }

  private mergeContext(additionalContext?: Record<string, any>) {
    return { ...this.context, ...additionalContext }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.logger.debug(this.mergeContext(context), message)
  }

  info(message: string, context?: Record<string, any>): void {
    this.logger.info(this.mergeContext(context), message)
  }

  warn(message: string, context?: Record<string, any>): void {
    this.logger.warn(this.mergeContext(context), message)

    if (isProduction) {
      captureMessage(message, 'warning', this.mergeContext(context))
    }
  }

  error(message: string, error?: Error | any, context?: Record<string, any>): void {
    const errorContext = this.mergeContext(context)

    if (error instanceof Error) {
      this.logger.error({ err: error, ...errorContext }, message)
    } else {
      this.logger.error({ error, ...errorContext }, message)
    }

    if (isProduction && error instanceof Error) {
      captureException(error, errorContext)
    }
  }

  fatal(message: string, error?: Error | any, context?: Record<string, any>): void {
    const errorContext = this.mergeContext(context)

    if (error instanceof Error) {
      this.logger.fatal({ err: error, ...errorContext }, message)
    } else {
      this.logger.fatal({ error, ...errorContext }, message)
    }

    if (isProduction && error instanceof Error) {
      captureException(error, { ...errorContext, fatal: true })
    }
  }

  child(context: LogContext): ProductionLogger {
    return new ProductionLogger({ ...this.context, ...context })
  }

  apiRequest(method: string, path: string, context?: LogContext): void {
    this.info('API Request', {
      type: 'api_request',
      method,
      path,
      ...context,
    })
  }

  apiResponse(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    context?: LogContext
  ): void {
    const logFn = statusCode >= 500 ? this.error : statusCode >= 400 ? this.warn : this.info

    logFn.call(this, 'API Response', {
      type: 'api_response',
      method,
      path,
      statusCode,
      duration,
      ...context,
    })
  }

  databaseQuery(query: string, duration: number, error?: Error, context?: LogContext): void {
    if (error) {
      this.error('Database Query Failed', error, {
        type: 'database_error',
        query: query.substring(0, 200),
        duration,
        ...context,
      })
    } else {
      this.debug('Database Query', {
        type: 'database_query',
        query: query.substring(0, 200),
        duration,
        ...context,
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

  securityEvent(
    event: string,
    details: any,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): void {
    const logFn = severity === 'critical' ? this.error : this.warn

    logFn.call(this, 'Security Event', {
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

  healthCheck(service: string, status: 'healthy' | 'unhealthy', details?: any): void {
    const logFn = status === 'healthy' ? this.info : this.error
    logFn.call(this, 'Health Check', {
      type: 'health_check',
      service,
      status,
      details,
    })
  }

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
      this.error('External Service Failed', error, {
        type: 'external_service',
        service,
        operation,
        duration,
        success,
      })
    }
  }

  cache(operation: string, key: string, hit: boolean, duration?: number): void {
    this.debug('Cache Operation', {
      type: 'cache',
      operation,
      key: key.substring(0, 50),
      hit,
      duration,
    })
  }

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

  webhook(provider: string, event: string, success: boolean, details?: any): void {
    this.info('Webhook Event', {
      type: 'webhook',
      provider,
      event,
      success,
      details,
    })
  }

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
      this.error('Email Failed', error, {
        type: 'email',
        to: this.maskEmail(to),
        subject,
        success,
        provider,
      })
    }
  }

  private maskEmail(email: string): string {
    if (!email || !email.includes('@')) return email
    const [local, domain] = email.split('@')
    const maskedLocal =
      local.length > 2 ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1] : local
    return `${maskedLocal}@${domain}`
  }

  timer(label: string) {
    const start = Date.now()

    return {
      end: (context?: Record<string, any>) => {
        const duration = Date.now() - start
        this.debug(`Timer: ${label}`, { duration, ...context })
        return duration
      },
    }
  }

  async logAsync<T>(
    label: string,
    fn: () => Promise<T>,
    options: {
      logStart?: boolean
      logEnd?: boolean
      logError?: boolean
      context?: Record<string, any>
    } = {}
  ): Promise<T> {
    const { logStart = true, logEnd = true, logError = true, context } = options
    const timer = this.timer(label)

    if (logStart) {
      this.debug(`Starting: ${label}`, context)
    }

    try {
      const result = await fn()

      if (logEnd) {
        const duration = timer.end(context)
        this.debug(`Completed: ${label}`, { duration, ...context })
      }

      return result
    } catch (error) {
      if (logError) {
        const duration = timer.end(context)
        this.error(`Failed: ${label}`, error as Error, { duration, ...context })
      }
      throw error
    }
  }
}

export const productionLogger = new ProductionLogger()

export default productionLogger
