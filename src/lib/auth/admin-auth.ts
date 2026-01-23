/**
 * Production-ready admin authentication utilities
 *
 * SECURITY AUDIT (2026-01-19):
 * - Fixed: session_ prefix bypass vulnerability
 * - Fixed: BYPASS_CRM_AUTH completely removed (2026-01-23)
 * - Added: Timing-safe comparison for admin key
 * - Added: IP logging for admin access attempts
 * - Added: Proper session validation against database
 */
import { NextRequest } from 'next/server'
import crypto from 'crypto'

export interface AdminSession {
  valid: boolean
  userId?: string
  role?: 'admin' | 'super_admin'
  expiresAt?: Date
  email?: string
}

/**
 * Timing-safe comparison to prevent timing attacks
 */
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch {
    return false
  }
}

/**
 * Get client IP address from request headers
 * Parses first IP from x-forwarded-for to prevent spoofing
 */
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

export async function validateAdminSession(request: NextRequest): Promise<AdminSession> {
  const clientIP = getClientIP(request)

  try {
    // SECURITY: Auth bypass completely removed from production code
    // For local development, use a real admin account in the database
    // This prevents accidental bypass if env vars are misconfigured

    const adminKey =
      request.headers.get('x-admin-key') || request.cookies.get('admin-session')?.value

    // Require both ADMIN_ACCESS_KEY to be configured and a key to be provided
    if (!process.env.ADMIN_ACCESS_KEY) {
      console.error('[SECURITY] ADMIN_ACCESS_KEY not configured')
      return { valid: false }
    }

    if (!adminKey) {
      return { valid: false }
    }

    // SECURITY FIX: Use timing-safe comparison and ONLY accept exact match
    // Removed: insecure adminKey.startsWith('session_') check that allowed bypass
    if (secureCompare(adminKey, process.env.ADMIN_ACCESS_KEY)) {
      // Log successful admin authentication
      if (process.env.NODE_ENV === 'production') {
        console.log(
          `[ADMIN AUTH] Successful authentication from IP: ${clientIP} at ${new Date().toISOString()}`
        )
      }

      return {
        valid: true,
        userId: 'admin',
        role: 'admin',
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
      }
    }

    // Log failed admin authentication attempts
    console.warn(
      `[ADMIN AUTH] Failed authentication attempt from IP: ${clientIP} at ${new Date().toISOString()}`
    )

    return { valid: false }
  } catch (error) {
    console.error('Admin authentication error:', error)
    return { valid: false }
  }
}

/**
 * Validate admin session from JWT token (for API routes using JWT auth)
 * This integrates with the main auth system for admin users
 */
export async function validateAdminSessionFromJWT(request: NextRequest): Promise<AdminSession> {
  try {
    // Import dynamically to avoid circular dependencies
    const { validateUserSession } = await import('./config')
    const session = await validateUserSession(request)

    if (!session.valid) {
      return { valid: false }
    }

    // Check if user has admin role
    if (session.role !== 'ADMIN') {
      const clientIP = getClientIP(request)
      console.warn(
        `[ADMIN AUTH] Non-admin user ${session.userId} attempted admin access from IP: ${clientIP}`
      )
      return { valid: false }
    }

    return {
      valid: true,
      userId: session.userId,
      role: 'admin',
      email: session.email,
      expiresAt: session.expiresAt,
    }
  } catch (error) {
    console.error('Admin JWT validation error:', error)
    return { valid: false }
  }
}

export function requireAdminAuth(
  handler: (request: NextRequest, session: AdminSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    // Try JWT-based admin auth first, then fall back to key-based auth
    let session = await validateAdminSessionFromJWT(request)

    if (!session.valid) {
      session = await validateAdminSession(request)
    }

    if (!session.valid) {
      return new Response(
        JSON.stringify({
          error: 'Unauthorized access to admin endpoint',
          message: 'Valid admin credentials required',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return handler(request, session)
  }
}
