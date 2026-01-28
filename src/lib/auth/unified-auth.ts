/**
 * Unified Authentication Service
 *
 * This module provides a single entry point for authentication validation,
 * coordinating between multiple auth methods:
 * 1. NextAuth sessions (primary for web)
 * 2. Firebase JWT tokens (for Firebase-authenticated users)
 * 3. Custom JWT tokens (for API clients)
 *
 * USAGE:
 * ```typescript
 * import { unifiedAuth } from '@/lib/auth/unified-auth'
 *
 * // In API route
 * const auth = await unifiedAuth.validate(request)
 * if (!auth.authenticated) {
 *   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 * }
 * ```
 *
 * @module unified-auth
 * @since 2026-01-28
 */

import { NextRequest } from 'next/server'

export interface UnifiedAuthResult {
  authenticated: boolean
  method?: 'nextauth' | 'firebase' | 'jwt' | 'api-key'
  userId?: string
  email?: string
  role?: string
  permissions?: string[]
  sessionId?: string
  expiresAt?: Date
  error?: string
}

export interface AuthValidationOptions {
  /** Required role(s) for access */
  requiredRoles?: string[]
  /** Required permission(s) for access */
  requiredPermissions?: string[]
  /** Skip auth validation (for public endpoints) */
  optional?: boolean
  /** Preferred auth method (will try this first) */
  preferredMethod?: 'nextauth' | 'firebase' | 'jwt'
}

// Role hierarchy for permission checking
const ROLE_HIERARCHY: Record<string, number> = {
  ADMIN: 100,
  COUNSELOR: 50,
  TEACHER: 40,
  PARENT: 20,
  STUDENT: 10,
}

/**
 * Unified Authentication Service
 * Coordinates between multiple authentication methods
 */
export class UnifiedAuthService {
  private static instance: UnifiedAuthService

  private constructor() {}

  static getInstance(): UnifiedAuthService {
    if (!this.instance) {
      this.instance = new UnifiedAuthService()
    }
    return this.instance
  }

  /**
   * Validate authentication from any supported method
   */
  async validate(
    request: NextRequest,
    options: AuthValidationOptions = {}
  ): Promise<UnifiedAuthResult> {
    const methods = this.getAuthMethodOrder(options.preferredMethod)

    let lastError: string | undefined

    for (const method of methods) {
      try {
        const result = await this.tryAuthMethod(request, method)

        if (result.authenticated) {
          // Check role requirements
          if (options.requiredRoles && options.requiredRoles.length > 0) {
            if (!result.role || !this.hasRequiredRole(result.role, options.requiredRoles)) {
              return {
                authenticated: false,
                error: 'Required role: ' + options.requiredRoles.join(' or '),
              }
            }
          }

          // Check permission requirements
          if (options.requiredPermissions && options.requiredPermissions.length > 0) {
            if (
              !this.hasRequiredPermissions(result.permissions || [], options.requiredPermissions)
            ) {
              return {
                authenticated: false,
                error: 'Required permissions: ' + options.requiredPermissions.join(', '),
              }
            }
          }

          return result
        }

        lastError = result.error
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Authentication failed'
      }
    }

    // If optional auth, return unauthenticated without error
    if (options.optional) {
      return { authenticated: false }
    }

    return {
      authenticated: false,
      error: lastError || 'No valid authentication found',
    }
  }

  /**
   * Get the order of auth methods to try
   */
  private getAuthMethodOrder(
    preferred?: string
  ): Array<'nextauth' | 'firebase' | 'jwt' | 'api-key'> {
    const defaultOrder: Array<'nextauth' | 'firebase' | 'jwt' | 'api-key'> = [
      'nextauth',
      'jwt',
      'firebase',
      'api-key',
    ]

    if (!preferred) return defaultOrder

    // Move preferred method to front
    const order = defaultOrder.filter((m) => m !== preferred)
    return [preferred as (typeof defaultOrder)[number], ...order]
  }

  /**
   * Try a specific authentication method
   */
  private async tryAuthMethod(
    request: NextRequest,
    method: 'nextauth' | 'firebase' | 'jwt' | 'api-key'
  ): Promise<UnifiedAuthResult> {
    switch (method) {
      case 'nextauth':
        return this.tryNextAuth(request)
      case 'jwt':
        return this.tryCustomJWT(request)
      case 'firebase':
        return this.tryFirebaseAuth(request)
      case 'api-key':
        return this.tryApiKey(request)
      default:
        return { authenticated: false, error: 'Unknown auth method' }
    }
  }

  /**
   * Try NextAuth session validation
   */
  private async tryNextAuth(request: NextRequest): Promise<UnifiedAuthResult> {
    try {
      // Check for NextAuth session cookies
      const sessionToken =
        request.cookies.get('__Secure-authjs.session-token')?.value ||
        request.cookies.get('authjs.session-token')?.value ||
        request.cookies.get('next-auth.session-token')?.value

      if (!sessionToken) {
        return { authenticated: false, error: 'No NextAuth session' }
      }

      // Use the existing session validation
      const { validateUserSession } = await import('./config')
      const session = await validateUserSession(request)

      if (!session.valid) {
        return { authenticated: false, error: 'Invalid NextAuth session' }
      }

      return {
        authenticated: true,
        method: 'nextauth',
        userId: session.userId,
        email: session.email,
        role: session.role,
        permissions: session.permissions,
        expiresAt: session.expiresAt,
      }
    } catch (error) {
      return {
        authenticated: false,
        error: error instanceof Error ? error.message : 'NextAuth validation failed',
      }
    }
  }

  /**
   * Try custom JWT token validation
   */
  private async tryCustomJWT(request: NextRequest): Promise<UnifiedAuthResult> {
    try {
      // Check for custom JWT token
      const authToken =
        request.cookies.get('auth-token')?.value ||
        request.headers.get('authorization')?.replace('Bearer ', '')

      if (!authToken) {
        return { authenticated: false, error: 'No JWT token' }
      }

      const { TokenUtils } = await import('./config')
      const payload = TokenUtils.verifyAccessToken(authToken)

      if (!payload) {
        return { authenticated: false, error: 'Invalid JWT token' }
      }

      return {
        authenticated: true,
        method: 'jwt',
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        sessionId: payload.sessionId,
      }
    } catch (error) {
      return {
        authenticated: false,
        error: error instanceof Error ? error.message : 'JWT validation failed',
      }
    }
  }

  /**
   * Try Firebase auth validation
   */
  private async tryFirebaseAuth(request: NextRequest): Promise<UnifiedAuthResult> {
    try {
      // Firebase auth typically uses custom tokens that are validated differently
      // Check for firebase-specific indicators
      const firebaseToken = request.headers.get('x-firebase-token')

      if (!firebaseToken) {
        return { authenticated: false, error: 'No Firebase token' }
      }

      // Firebase tokens should be validated via Firebase Admin SDK
      // This is a placeholder - actual implementation depends on Firebase setup
      return { authenticated: false, error: 'Firebase validation not implemented' }
    } catch (error) {
      return {
        authenticated: false,
        error: error instanceof Error ? error.message : 'Firebase validation failed',
      }
    }
  }

  /**
   * Try API key authentication (for service-to-service)
   */
  private async tryApiKey(request: NextRequest): Promise<UnifiedAuthResult> {
    try {
      const apiKey = request.headers.get('x-api-key') || request.headers.get('x-admin-key')

      if (!apiKey) {
        return { authenticated: false, error: 'No API key' }
      }

      // API keys are typically for admin/service access
      const { validateAdminSession } = await import('./admin-auth')
      const session = await validateAdminSession(request)

      if (!session.valid) {
        return { authenticated: false, error: 'Invalid API key' }
      }

      return {
        authenticated: true,
        method: 'api-key',
        userId: session.userId,
        role: session.role,
        expiresAt: session.expiresAt,
      }
    } catch (error) {
      return {
        authenticated: false,
        error: error instanceof Error ? error.message : 'API key validation failed',
      }
    }
  }

  /**
   * Check if user has any of the required roles
   */
  private hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
    const userRoleUpper = userRole.toUpperCase()
    const userLevel = ROLE_HIERARCHY[userRoleUpper] || 0

    for (const required of requiredRoles) {
      const requiredUpper = required.toUpperCase()
      const requiredLevel = ROLE_HIERARCHY[requiredUpper] || 0

      // User has the exact role or higher privilege
      if (userRoleUpper === requiredUpper || userLevel >= requiredLevel) {
        return true
      }
    }

    return false
  }

  /**
   * Check if user has all required permissions
   */
  private hasRequiredPermissions(userPermissions: string[], required: string[]): boolean {
    // Admin has all permissions
    if (userPermissions.includes('*')) {
      return true
    }

    return required.every((p) => userPermissions.includes(p))
  }
}

// Export singleton instance
export const unifiedAuth = UnifiedAuthService.getInstance()

// Export helper functions for common use cases
export async function requireAuth(
  request: NextRequest,
  options?: AuthValidationOptions
): Promise<UnifiedAuthResult> {
  return unifiedAuth.validate(request, options)
}

export async function requireRole(
  request: NextRequest,
  roles: string | string[]
): Promise<UnifiedAuthResult> {
  return unifiedAuth.validate(request, {
    requiredRoles: Array.isArray(roles) ? roles : [roles],
  })
}

export async function requireAdmin(request: NextRequest): Promise<UnifiedAuthResult> {
  return unifiedAuth.validate(request, {
    requiredRoles: ['ADMIN'],
  })
}

export async function requireTeacher(request: NextRequest): Promise<UnifiedAuthResult> {
  return unifiedAuth.validate(request, {
    requiredRoles: ['TEACHER', 'ADMIN'],
  })
}

export async function requireCounselor(request: NextRequest): Promise<UnifiedAuthResult> {
  return unifiedAuth.validate(request, {
    requiredRoles: ['COUNSELOR', 'ADMIN'],
  })
}

export async function optionalAuth(request: NextRequest): Promise<UnifiedAuthResult> {
  return unifiedAuth.validate(request, { optional: true })
}
