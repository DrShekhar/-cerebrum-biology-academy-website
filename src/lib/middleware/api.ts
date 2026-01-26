import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  rateLimit,
  rateLimitConfigs,
  getClientIP,
  getUserAgent,
  validateSecurityHeaders,
  detectSQLInjection,
  detectXSS,
  sanitizeString,
  createAuditLog,
  type AuditLog,
} from '../security'
import { withErrorHandling, RateLimitError, ValidationError, logError } from '../errors'
import { requireAdminAuth } from '../auth'

// Middleware options interface
interface ApiMiddlewareOptions {
  auth?: {
    required: boolean
    roles?: string[]
    adminOnly?: boolean
  }
  rateLimit?: {
    windowMs: number
    maxRequests: number
    message?: string
  }
  validation?: {
    body?: z.ZodSchema
    query?: z.ZodSchema
    params?: z.ZodSchema
  }
  security?: {
    sanitizeInput?: boolean
    checkXSS?: boolean
    checkSQLInjection?: boolean
    requireHTTPS?: boolean
  }
  audit?: {
    enabled: boolean
    action: string
    resource: string
  }
}

// Create API middleware
export function createApiMiddleware(options: ApiMiddlewareOptions = {}) {
  return function apiMiddleware(handler: (request: NextRequest) => Promise<NextResponse>) {
    return withErrorHandling(async (request: NextRequest) => {
      const startTime = Date.now()
      let auditLog: AuditLog | null = null

      try {
        // 1. Security headers validation
        const securityCheck = validateSecurityHeaders(request)
        if (!securityCheck.valid) {
          logError(new Error('Security validation failed'), {
            issues: securityCheck.issues,
            ip: getClientIP(request),
            userAgent: getUserAgent(request),
          })
        }

        // 2. HTTPS enforcement (in production)
        if (
          options.security?.requireHTTPS &&
          process.env.NODE_ENV === 'production' &&
          !request.url.startsWith('https://')
        ) {
          throw new Error('HTTPS required')
        }

        // 3. Rate limiting
        if (options.rateLimit) {
          const clientIP = getClientIP(request)
          const rateLimiter = rateLimit(options.rateLimit)
          const rateLimitResult = rateLimiter(clientIP)

          if (!rateLimitResult.allowed) {
            throw new RateLimitError(rateLimitResult.message, rateLimitResult.resetTime)
          }
        }

        // 4. Authentication
        if (options.auth?.required) {
          if (options.auth.adminOnly) {
            await requireAdminAuth()
          }
          // TODO: Add other role-based authentication
        }

        // 5. Input validation and sanitization
        const validatedData: any = {}

        if (options.validation) {
          // Parse and validate request body
          if (options.validation.body && request.method !== 'GET') {
            try {
              const body = await request.json()

              // Security checks on input
              if (options.security?.sanitizeInput) {
                validatedData.body = sanitizeObject(body)
              }

              if (options.security?.checkXSS) {
                checkObjectForXSS(body)
              }

              if (options.security?.checkSQLInjection) {
                checkObjectForSQLInjection(body)
              }

              // Validate with schema
              validatedData.body = options.validation.body.parse(
                options.security?.sanitizeInput ? validatedData.body : body
              )
            } catch (error) {
              if (error instanceof z.ZodError) {
                throw new ValidationError('Request body validation failed', error)
              }
              throw error
            }
          }

          // Validate query parameters
          if (options.validation.query) {
            const url = new URL(request.url)
            const queryParams = Object.fromEntries(url.searchParams.entries())

            try {
              validatedData.query = options.validation.query.parse(queryParams)
            } catch (error) {
              if (error instanceof z.ZodError) {
                throw new ValidationError('Query parameters validation failed', error)
              }
              throw error
            }
          }

          // Validate URL parameters
          if (options.validation.params) {
            // Extract params from URL (this would need to be implemented based on your routing)
            // For now, we'll skip this as Next.js handles this differently
          }
        }

        // 6. Create audit log entry
        if (options.audit?.enabled) {
          auditLog = createAuditLog(request, options.audit.action, options.audit.resource, {
            success: true,
            details: {
              method: request.method,
              validatedData,
              processingTimeMs: Date.now() - startTime,
            },
          })
        }

        // 7. Execute the handler with validated data
        const response = await handler(request)

        // 8. Add security headers to response
        const securityHeaders = {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        }

        Object.entries(securityHeaders).forEach(([key, value]) => {
          response.headers.set(key, value)
        })

        // 9. Log successful audit
        if (auditLog) {
          auditLog.success = true
          auditLog.details.responseStatus = response.status
          console.log('Audit log:', auditLog)
        }

        return response
      } catch (error) {
        // Log failed audit
        if (auditLog) {
          auditLog.success = false
          auditLog.error = error instanceof Error ? error.message : 'Unknown error'
          console.log('Audit log (failed):', auditLog)
        }

        // Log error with context
        logError(error, {
          url: request.url,
          method: request.method,
          ip: getClientIP(request),
          userAgent: getUserAgent(request),
          processingTimeMs: Date.now() - startTime,
        })

        throw error
      }
    })
  }
}

// Utility functions for input sanitization and security checks
function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeString(obj)
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item))
  }

  if (obj && typeof obj === 'object') {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(obj)) {
      sanitized[sanitizeString(key)] = sanitizeObject(value)
    }
    return sanitized
  }

  return obj
}

function checkObjectForXSS(obj: any, path = ''): void {
  if (typeof obj === 'string') {
    if (detectXSS(obj)) {
      throw new ValidationError(`XSS pattern detected in ${path || 'input'}`)
    }
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => checkObjectForXSS(item, `${path}[${index}]`))
  }

  if (obj && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key
      checkObjectForXSS(value, currentPath)
    }
  }
}

function checkObjectForSQLInjection(obj: any, path = ''): void {
  if (typeof obj === 'string') {
    if (detectSQLInjection(obj)) {
      throw new ValidationError(`SQL injection pattern detected in ${path || 'input'}`)
    }
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => checkObjectForSQLInjection(item, `${path}[${index}]`))
  }

  if (obj && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key
      checkObjectForSQLInjection(value, currentPath)
    }
  }
}

// Pre-configured middleware for common use cases
export const adminApiMiddleware = createApiMiddleware({
  auth: {
    required: true,
    adminOnly: true,
  },
  rateLimit: rateLimitConfigs.api,
  security: {
    sanitizeInput: true,
    checkXSS: true,
    checkSQLInjection: true,
    requireHTTPS: true,
  },
  audit: {
    enabled: true,
    action: 'admin_operation',
    resource: 'admin_api',
  },
})

export const publicApiMiddleware = createApiMiddleware({
  rateLimit: rateLimitConfigs.api,
  security: {
    sanitizeInput: true,
    checkXSS: true,
    checkSQLInjection: true,
  },
})

export const authApiMiddleware = createApiMiddleware({
  rateLimit: rateLimitConfigs.auth,
  security: {
    sanitizeInput: true,
    checkXSS: true,
    checkSQLInjection: true,
    requireHTTPS: true,
  },
  audit: {
    enabled: true,
    action: 'authentication',
    resource: 'auth_api',
  },
})

export const demoBookingApiMiddleware = createApiMiddleware({
  rateLimit: rateLimitConfigs.demoBooking,
  security: {
    sanitizeInput: true,
    checkXSS: true,
    checkSQLInjection: true,
  },
  audit: {
    enabled: true,
    action: 'demo_booking',
    resource: 'demo_api',
  },
})

export const paymentApiMiddleware = createApiMiddleware({
  rateLimit: rateLimitConfigs.payment,
  security: {
    sanitizeInput: true,
    checkXSS: true,
    checkSQLInjection: true,
    requireHTTPS: true,
  },
  audit: {
    enabled: true,
    action: 'payment',
    resource: 'payment_api',
  },
})
