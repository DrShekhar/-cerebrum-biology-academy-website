import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/utils'
import { nanoid } from 'nanoid'

export interface LoggingMiddlewareOptions {
  logRequestBody?: boolean
  logResponseBody?: boolean
  excludePaths?: string[]
  sensitiveFields?: string[]
}

const defaultOptions: LoggingMiddlewareOptions = {
  logRequestBody: false,
  logResponseBody: false,
  excludePaths: ['/api/health', '/monitoring', '/_next'],
  sensitiveFields: ['password', 'token', 'apiKey', 'secret', 'authorization'],
}

function shouldLog(path: string, excludePaths: string[]): boolean {
  return !excludePaths.some((excluded) => path.startsWith(excluded))
}

function sanitizeObject(obj: any, sensitiveFields: string[]): any {
  if (!obj || typeof obj !== 'object') return obj

  const sanitized: any = Array.isArray(obj) ? [] : {}

  for (const [key, value] of Object.entries(obj)) {
    if (sensitiveFields.some((field) => key.toLowerCase().includes(field.toLowerCase()))) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value, sensitiveFields)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}

export function withLogging<T>(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>,
  options: LoggingMiddlewareOptions = {}
) {
  const opts = { ...defaultOptions, ...options }

  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    const startTime = Date.now()
    const requestId = nanoid()
    const { method, url } = request
    const path = new URL(url).pathname

    if (!shouldLog(path, opts.excludePaths || [])) {
      return handler(request, context)
    }

    const requestContext = {
      requestId,
      method,
      path,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
    }

    try {
      let requestBody
      if (opts.logRequestBody && ['POST', 'PUT', 'PATCH'].includes(method)) {
        try {
          const clonedRequest = request.clone()
          const body = await clonedRequest.json()
          requestBody = sanitizeObject(body, opts.sensitiveFields || [])
        } catch {
          // Body not JSON or already consumed
        }
      }

      logger.apiRequest(method, path, {
        ...requestContext,
        ...(requestBody && { body: requestBody }),
      })

      const response = await handler(request, context)

      const duration = Date.now() - startTime

      let responseBody
      if (opts.logResponseBody) {
        try {
          const clonedResponse = response.clone()
          const body = await clonedResponse.json()
          responseBody = sanitizeObject(body, opts.sensitiveFields || [])
        } catch {
          // Response not JSON
        }
      }

      logger.apiResponse(method, path, response.status, duration, {
        ...requestContext,
        ...(responseBody && { body: responseBody }),
      })

      return response
    } catch (error) {
      const duration = Date.now() - startTime

      logger.error(`API Error: ${method} ${path}`, error as Error, {
        ...requestContext,
        duration,
      })

      throw error
    }
  }
}

export function logApiCall(
  method: string,
  path: string,
  userId?: string,
  additionalContext?: Record<string, any>
) {
  logger.apiRequest(method, path, { userId, ...additionalContext })
}

export function logApiResponse(
  method: string,
  path: string,
  statusCode: number,
  duration: number,
  userId?: string,
  additionalContext?: Record<string, any>
) {
  logger.apiResponse(method, path, statusCode, duration, { userId, ...additionalContext })
}

export function createRequestLogger(request: NextRequest, userId?: string) {
  const { method, url } = request
  const path = new URL(url).pathname
  const requestId = nanoid()

  const requestContext = {
    requestId,
    method,
    path,
    userId,
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    userAgent: request.headers.get('user-agent'),
  }

  return {
    requestId,
    context: requestContext,

    debug: (message: string, data?: any) => {
      logger.debug(message, { ...requestContext, ...data })
    },

    info: (message: string, data?: any) => {
      logger.info(message, { ...requestContext, ...data })
    },

    warn: (message: string, data?: any) => {
      logger.warn(message, { ...requestContext, ...data })
    },

    error: (message: string, error?: Error | any, data?: any) => {
      if (error instanceof Error) {
        logger.error(message, error, { ...requestContext, ...data })
      } else {
        logger.error(message, undefined, { ...requestContext, error, ...data })
      }
    },

    audit: (action: string, resource: string, details?: any) => {
      logger.audit(userId || 'anonymous', action, resource, {
        ...requestContext,
        ...details,
      })
    },

    performance: (metric: string, value: number, unit: string) => {
      logger.performanceMetric(metric, value, unit, requestContext)
    },

    businessEvent: (event: string, data: any) => {
      logger.businessEvent(event, { ...requestContext, ...data })
    },

    timer: (label: string) => {
      const start = Date.now()
      return {
        end: () => {
          const duration = Date.now() - start
          logger.debug(`Timer: ${label}`, { ...requestContext, duration })
          return duration
        },
      }
    },
  }
}

export type RequestLogger = ReturnType<typeof createRequestLogger>
