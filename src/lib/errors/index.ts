import { NextResponse } from 'next/server'
import { z } from 'zod'

// Custom error classes
export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly code?: string

  constructor(message: string, statusCode: number, isOperational = true, code?: string) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.code = code

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  public readonly details?: z.ZodError

  constructor(message: string, details?: z.ZodError) {
    super(message, 400, true, 'VALIDATION_ERROR')
    this.details = details
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, true, 'AUTHENTICATION_ERROR')
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, true, 'AUTHORIZATION_ERROR')
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, true, 'NOT_FOUND_ERROR')
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, true, 'CONFLICT_ERROR')
  }
}

export class RateLimitError extends AppError {
  public readonly resetTime?: number

  constructor(message = 'Too many requests', resetTime?: number) {
    super(message, 429, true, 'RATE_LIMIT_ERROR')
    this.resetTime = resetTime
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500, true, 'DATABASE_ERROR')
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message = 'External service error') {
    super(`${service}: ${message}`, 502, true, 'EXTERNAL_SERVICE_ERROR')
  }
}

// Error response interface
interface ErrorResponse {
  success: false
  error: string
  code?: string
  details?: any
  timestamp: string
  path?: string
}

// Error handler function
export function handleError(error: unknown, path?: string): NextResponse<ErrorResponse> {
  console.error('Error occurred:', error)

  let statusCode = 500
  let message = 'Internal server error'
  let code: string | undefined
  let details: any

  if (error instanceof AppError) {
    statusCode = error.statusCode
    message = error.message
    code = error.code

    if (error instanceof ValidationError && error.details) {
      details = error.details.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      }))
    }

    if (error instanceof RateLimitError && error.resetTime) {
      const response = NextResponse.json<ErrorResponse>(
        {
          success: false,
          error: message,
          code,
          timestamp: new Date().toISOString(),
          path,
        },
        { status: statusCode }
      )

      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', '100')
      response.headers.set('X-RateLimit-Remaining', '0')
      response.headers.set('X-RateLimit-Reset', error.resetTime.toString())
      response.headers.set(
        'Retry-After',
        Math.ceil((error.resetTime - Date.now()) / 1000).toString()
      )

      return response
    }
  } else if (error instanceof z.ZodError) {
    statusCode = 400
    message = 'Validation failed'
    code = 'VALIDATION_ERROR'
    details = error.issues.map((err: any) => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }))
  } else if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('Prisma')) {
      statusCode = 500
      message = 'Database operation failed'
      code = 'DATABASE_ERROR'
    } else if (error.message.includes('fetch')) {
      statusCode = 502
      message = 'External service unavailable'
      code = 'EXTERNAL_SERVICE_ERROR'
    } else if (error.message.includes('timeout')) {
      statusCode = 504
      message = 'Request timeout'
      code = 'TIMEOUT_ERROR'
    } else {
      message = error.message
    }
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal server error'
    details = undefined
  }

  const errorResponse: ErrorResponse = {
    success: false,
    error: message,
    code,
    details,
    timestamp: new Date().toISOString(),
    path,
  }

  return NextResponse.json(errorResponse, { status: statusCode })
}

// Async error wrapper for API routes
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<NextResponse<R>>
) {
  return async (...args: T): Promise<NextResponse<R | ErrorResponse>> => {
    try {
      return await fn(...args)
    } catch (error) {
      return handleError(error, args[0]?.url)
    }
  }
}

// Database error handler
export function handleDatabaseError(error: any): never {
  if (error.code) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictError('A record with this information already exists')
      case 'P2025':
        throw new NotFoundError('Record')
      case 'P2003':
        throw new ValidationError('Invalid reference to related record')
      case 'P2014':
        throw new ValidationError('Invalid input data')
      default:
        throw new DatabaseError(`Database error: ${error.message}`)
    }
  }

  throw new DatabaseError('Database operation failed')
}

// Success response helper
export function successResponse<T>(
  data: T,
  message?: string,
  status = 200
): NextResponse<{
  success: true
  data: T
  message?: string
  timestamp: string
}> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status }
  )
}

// Paginated response helper
export function paginatedResponse<T>(
  data: T[],
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  },
  message?: string
): NextResponse<{
  success: true
  data: T[]
  pagination: typeof pagination
  message?: string
  timestamp: string
}> {
  return NextResponse.json({
    success: true,
    data,
    pagination,
    message,
    timestamp: new Date().toISOString(),
  })
}

// Error logging with monitoring integration
export function logError(error: unknown, context?: Record<string, any>) {
  const errorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  }

  // Console logging for development and debugging
  console.error('Application Error:', errorInfo)

  // Send to monitoring service
  if (typeof window !== 'undefined') {
    // Client-side error reporting
    import('@/lib/monitoring/errorMonitoring')
      .then(({ errorMonitoring }) => {
        const actualError = error instanceof Error ? error : new Error(String(error))
        errorMonitoring
          .reportErrorWithRateLimit(actualError, {
            custom: context,
          })
          .catch(console.error)
      })
      .catch(console.error)
  } else {
    // Server-side error logging
    // TODO: Integrate with server-side monitoring service
    // This could send to external services like Sentry, DataDog, etc.
    if (process.env.NODE_ENV === 'production') {
      // For now, structured logging to console that can be captured by log aggregators
      console.error(
        JSON.stringify({
          level: 'error',
          message: errorInfo.message,
          stack: errorInfo.stack,
          context: errorInfo.context,
          timestamp: errorInfo.timestamp,
          environment: errorInfo.environment,
          source: 'server',
        })
      )
    }
  }
}

// Health check error
export class HealthCheckError extends AppError {
  constructor(service: string, details?: any) {
    super(`Health check failed for ${service}`, 503, true, 'HEALTH_CHECK_ERROR')
    this.details = details
  }

  public details?: any
}
