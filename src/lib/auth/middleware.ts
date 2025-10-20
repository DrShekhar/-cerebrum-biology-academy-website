import { NextRequest, NextResponse } from 'next/server'
import {
  validateUserSession,
  addSecurityHeaders,
  hasPermission,
  UserSession,
  UserRole
} from './config'

/**
 * Authentication middleware for API routes
 */
export function withAuth(
  handler: (request: NextRequest, session: UserSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    try {
      const session = await validateUserSession(request)

      if (!session.valid) {
        return addSecurityHeaders(NextResponse.json({
          error: 'Authentication required',
          message: 'Please sign in to access this resource',
          code: 'AUTH_REQUIRED'
        }, { status: 401 }))
      }

      return handler(request, session)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return addSecurityHeaders(NextResponse.json({
        error: 'Authentication error',
        message: 'Failed to validate authentication'
      }, { status: 500 }))
    }
  }
}

/**
 * Role-based authorization middleware
 */
export function withRole(
  allowedRoles: UserRole[],
  handler: (request: NextRequest, session: UserSession) => Promise<Response>
) {
  return withAuth(async (request: NextRequest, session: UserSession) => {
    if (!session.role || !allowedRoles.includes(session.role)) {
      return addSecurityHeaders(NextResponse.json({
        error: 'Access denied',
        message: 'You do not have permission to access this resource',
        code: 'INSUFFICIENT_PERMISSIONS',
        requiredRoles: allowedRoles,
        userRole: session.role
      }, { status: 403 }))
    }

    return handler(request, session)
  })
}

/**
 * Permission-based authorization middleware
 */
export function withPermission(
  requiredPermission: string,
  handler: (request: NextRequest, session: UserSession) => Promise<Response>
) {
  return withAuth(async (request: NextRequest, session: UserSession) => {
    if (!session.role || !hasPermission(session.role, requiredPermission)) {
      return addSecurityHeaders(NextResponse.json({
        error: 'Access denied',
        message: `This action requires the '${requiredPermission}' permission`,
        code: 'INSUFFICIENT_PERMISSIONS',
        requiredPermission,
        userPermissions: session.permissions
      }, { status: 403 }))
    }

    return handler(request, session)
  })
}

/**
 * Optional authentication middleware (allows both authenticated and unauthenticated users)
 */
export function withOptionalAuth(
  handler: (request: NextRequest, session?: UserSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    try {
      const session = await validateUserSession(request)
      return handler(request, session.valid ? session : undefined)
    } catch (error) {
      console.error('Optional auth middleware error:', error)
      return handler(request, undefined)
    }
  }
}

/**
 * Admin-only middleware
 */
export function withAdmin(
  handler: (request: NextRequest, session: UserSession) => Promise<Response>
) {
  return withRole(['ADMIN'], handler)
}

/**
 * Teacher or Admin middleware
 */
export function withTeacher(
  handler: (request: NextRequest, session: UserSession) => Promise<Response>
) {
  return withRole(['TEACHER', 'ADMIN'], handler)
}

/**
 * Student-only middleware
 */
export function withStudent(
  handler: (request: NextRequest, session: UserSession) => Promise<Response>
) {
  return withRole(['STUDENT'], handler)
}

/**
 * Rate limiting middleware
 */
export function withRateLimit(
  maxRequests: number = 100,
  windowMs: number = 60000, // 1 minute
  handler: (request: NextRequest, session?: UserSession) => Promise<Response>
) {
  const requestCounts = new Map<string, { count: number; resetTime: number }>()

  return async (request: NextRequest): Promise<Response> => {
    const identifier = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown'

    const now = Date.now()
    const windowStart = now - windowMs

    // Clean old entries
    for (const [key, value] of requestCounts.entries()) {
      if (value.resetTime < windowStart) {
        requestCounts.delete(key)
      }
    }

    // Check current requests
    const currentRequests = requestCounts.get(identifier)
    if (currentRequests && currentRequests.count >= maxRequests) {
      return addSecurityHeaders(NextResponse.json({
        error: 'Rate limit exceeded',
        message: `Too many requests. Maximum ${maxRequests} requests per ${windowMs / 1000} seconds.`,
        retryAfter: Math.ceil((currentRequests.resetTime - now) / 1000)
      }, { status: 429 }))
    }

    // Update request count
    if (currentRequests) {
      currentRequests.count++
    } else {
      requestCounts.set(identifier, { count: 1, resetTime: now + windowMs })
    }

    // Get session for handler
    const session = await validateUserSession(request).catch(() => ({ valid: false }))
    return handler(request, session.valid ? session : undefined)
  }
}

/**
 * CSRF protection middleware
 */
export function withCSRF(
  handler: (request: NextRequest, session?: UserSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    // Skip CSRF for GET requests
    if (request.method === 'GET') {
      return handler(request)
    }

    const csrfToken = request.headers.get('x-csrf-token')
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')

    // Check for CSRF token in headers
    if (!csrfToken) {
      return addSecurityHeaders(NextResponse.json({
        error: 'CSRF token required',
        message: 'Missing CSRF protection token'
      }, { status: 403 }))
    }

    // Validate origin
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'https://cerebrumbiologyacademy.com',
      'https://www.cerebrumbiologyacademy.com'
    ].filter(Boolean)

    if (origin && !allowedOrigins.includes(origin)) {
      return addSecurityHeaders(NextResponse.json({
        error: 'Invalid origin',
        message: 'Request origin not allowed'
      }, { status: 403 }))
    }

    // Get session for handler
    const session = await validateUserSession(request).catch(() => ({ valid: false }))
    return handler(request, session.valid ? session : undefined)
  }
}

/**
 * Combine multiple middleware functions
 */
export function combineMiddleware(
  ...middlewares: Array<(handler: any) => any>
) {
  return (handler: any) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler)
  }
}

/**
 * IP whitelist middleware (for admin operations)
 */
export function withIPWhitelist(
  allowedIPs: string[],
  handler: (request: NextRequest, session?: UserSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    const clientIP = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown'

    if (!allowedIPs.includes(clientIP) && process.env.NODE_ENV === 'production') {
      return addSecurityHeaders(NextResponse.json({
        error: 'Access denied',
        message: 'IP address not authorized'
      }, { status: 403 }))
    }

    const session = await validateUserSession(request).catch(() => ({ valid: false }))
    return handler(request, session.valid ? session : undefined)
  }
}

/**
 * Request logging middleware
 */
export function withLogging(
  handler: (request: NextRequest, session?: UserSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    const startTime = Date.now()
    const session = await validateUserSession(request).catch(() => ({ valid: false }))

    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} - User: ${session.valid ? session.userId : 'anonymous'}`)

    try {
      const response = await handler(request, session.valid ? session : undefined)
      const duration = Date.now() - startTime
      console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${response.status} (${duration}ms)`)
      return response
    } catch (error) {
      const duration = Date.now() - startTime
      console.error(`[${new Date().toISOString()}] ${request.method} ${request.url} - ERROR (${duration}ms):`, error)
      throw error
    }
  }
}

/**
 * Common middleware combinations
 */
export const protectedRoute = combineMiddleware(withAuth, withLogging)
export const adminRoute = combineMiddleware(withAdmin, withLogging, withRateLimit(50))
export const teacherRoute = combineMiddleware(withTeacher, withLogging, withRateLimit(100))
export const studentRoute = combineMiddleware(withStudent, withLogging, withRateLimit(200))
export const publicRoute = combineMiddleware(withOptionalAuth, withLogging, withRateLimit(300))

export default {
  withAuth,
  withRole,
  withPermission,
  withOptionalAuth,
  withAdmin,
  withTeacher,
  withStudent,
  withRateLimit,
  withCSRF,
  withIPWhitelist,
  withLogging,
  combineMiddleware,
  protectedRoute,
  adminRoute,
  teacherRoute,
  studentRoute,
  publicRoute
}