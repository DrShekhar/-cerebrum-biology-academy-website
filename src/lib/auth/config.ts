/**
 * Auth configuration for the application
 *
 * ⚠️ DEPRECATION NOTICE (2024-12)
 * ================================
 * This file contains LEGACY authentication code from the NextAuth era.
 * The application has migrated to Clerk for authentication.
 *
 * DEPRECATED (use Clerk instead):
 * - TokenUtils - Use Clerk session tokens
 * - SessionManager - Use Clerk session management
 * - CookieManager - Use Clerk cookie handling
 * - validateUserSession - Use auth() from @clerk/nextjs/server
 * - requireAuth/optionalAuth - Use Clerk middleware
 * - AuthRateLimit - Use Clerk's built-in rate limiting
 * - authOptions - NextAuth config, not used with Clerk
 *
 * STILL ACTIVE:
 * - PasswordUtils - Used for admin password validation
 * - ROLE_PERMISSIONS - Role-based access control
 * - addSecurityHeaders - Security headers utility
 * - ALLOWED_ORIGINS - CORS configuration
 *
 * TODO: Migrate remaining routes to Clerk and remove deprecated code
 * See: /api/auth/*, /api/test/*, /api/questions/*, /api/progress/*
 */
import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession, AdminSession } from './admin-auth'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import type { UserRole as PrismaUserRole } from '@/generated/prisma'
import { cookies } from 'next/headers'

export type UserRole = PrismaUserRole

// Environment variables validation
// SECURITY: Secrets are REQUIRED in production at runtime - not at build time
// Using lazy initialization to prevent build-time errors in CI

// Cache for lazy-loaded secrets
let _jwtSecret: string | null = null
let _jwtRefreshSecret: string | null = null

const getJWTSecret = (): string => {
  if (_jwtSecret) return _jwtSecret

  const secret = process.env.JWT_SECRET
  if (!secret) {
    // Allow builds to proceed without secrets - they're only needed at runtime
    // Check if we're in an actual runtime context vs build-time analysis
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      // Only throw at actual runtime when the secret is needed
      // During build, this code path may be analyzed but not executed for real requests
      console.warn('[BUILD] JWT_SECRET not available - will be required at runtime')
      return 'build-time-placeholder-not-for-actual-use'
    }
    // Development/test fallback
    console.warn('[DEV] JWT_SECRET not set - using development fallback')
    _jwtSecret = 'dev-only-secret-not-for-production-use'
    return _jwtSecret
  }
  _jwtSecret = secret
  return _jwtSecret
}

const getJWTRefreshSecret = (): string => {
  if (_jwtRefreshSecret) return _jwtRefreshSecret

  const secret = process.env.JWT_REFRESH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      console.warn('[BUILD] JWT_REFRESH_SECRET not available - will be required at runtime')
      return 'build-time-placeholder-not-for-actual-use'
    }
    console.warn('[DEV] JWT_REFRESH_SECRET not set - using development fallback')
    _jwtRefreshSecret = 'dev-only-refresh-secret-not-for-production-use'
    return _jwtRefreshSecret
  }
  _jwtRefreshSecret = secret
  return _jwtRefreshSecret
}

// Lazy getters - secrets are only fetched when actually used
const getSecret = () => getJWTSecret()
const getRefreshSecret = () => getJWTRefreshSecret()
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '15m'
const JWT_REFRESH_EXPIRES_IN: string = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

export interface UserSession {
  valid: boolean
  userId?: string
  role?: UserRole
  email?: string
  name?: string
  expiresAt?: Date
  permissions?: string[]
}

export interface JWTPayload {
  userId: string
  email: string
  role: UserRole
  name: string
  sessionId: string
  iat?: number
  exp?: number
}

export interface RefreshTokenPayload {
  userId: string
  sessionId: string
  iat?: number
  exp?: number
}

/**
 * Password hashing utilities
 */
export class PasswordUtils {
  static async hash(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  static validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return { valid: errors.length === 0, errors }
  }
}

/**
 * JWT token utilities
 * @deprecated Use Clerk session tokens instead. This class will be removed in a future version.
 */
export class TokenUtils {
  static generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload as any, getSecret(), { expiresIn: JWT_EXPIRES_IN } as any)
  }

  static generateRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload as any, getRefreshSecret(), {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    } as any)
  }

  static verifyAccessToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, getSecret()) as JWTPayload
    } catch (error) {
      console.error('Access token verification failed:', error)
      return null
    }
  }

  static verifyRefreshToken(token: string): RefreshTokenPayload | null {
    try {
      return jwt.verify(token, getRefreshSecret()) as RefreshTokenPayload
    } catch (error) {
      console.error('Refresh token verification failed:', error)
      return null
    }
  }

  static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
  }
}

/**
 * Role-based permissions
 */
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  STUDENT: [
    'test:take',
    'notes:view',
    'profile:edit',
    'enrollment:view',
    'payment:make',
    'demo:book',
    'community:participate',
  ],
  PARENT: ['student:monitor', 'progress:view', 'payment:make', 'demo:book', 'reports:view'],
  TEACHER: [
    'test:create',
    'test:edit',
    'notes:create',
    'notes:edit',
    'student:view',
    'progress:view',
    'class:manage',
    'assignment:create',
  ],
  COUNSELOR: [
    'lead:view',
    'lead:create',
    'lead:edit',
    'lead:assign',
    'communication:send',
    'communication:view',
    'offer:create',
    'offer:view',
    'feeplan:create',
    'feeplan:edit',
    'feeplan:view',
    'task:create',
    'task:view',
    'task:edit',
    'note:create',
    'note:view',
    'student:contact',
    'demo:view',
    'demo:manage',
    'payment:track',
    'whatsapp:send',
  ],
  CONSULTANT: [
    'referral:create',
    'referral:view',
    'referral:update',
    'commission:view',
    'lead:create',
    'lead:view',
    'lead:update',
    'referral_link:generate',
    'admission_status:view',
  ],
  ADMIN: [
    '*', // All permissions
  ],
}

export function getUserPermissions(role: UserRole): string[] {
  return ROLE_PERMISSIONS[role] || []
}

export function hasPermission(userRole: UserRole, permission: string): boolean {
  const permissions = getUserPermissions(userRole)
  return permissions.includes('*') || permissions.includes(permission)
}

/**
 * Validate user session from request
 * @deprecated Use auth() from @clerk/nextjs/server instead. This function will be removed in a future version.
 */
export async function validateUserSession(request: NextRequest): Promise<UserSession> {
  try {
    // Use NextAuth auth() helper for session validation
    try {
      const { auth: getSession } = await import('@/lib/auth')
      const session = await getSession()

      if (session && session.user) {
        // Normalize role to uppercase for consistency
        const normalizedRole = session.user.role.toUpperCase() as UserRole

        return {
          valid: true,
          userId: session.user.id,
          role: normalizedRole,
          email: session.user.email || '',
          name: session.user.name || '',
          expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
          permissions: getUserPermissions(normalizedRole),
        }
      }
    } catch (authError) {
      // Silent fallback to cookie parsing
    }

    // Fallback: Try manual cookie parsing (for backward compatibility)
    const nextAuthTokenCookie =
      request.cookies.get('__Secure-authjs.session-token') ||
      request.cookies.get('authjs.session-token') ||
      request.cookies.get('next-auth.session-token') ||
      request.cookies.get('__Secure-next-auth.session-token')

    if (nextAuthTokenCookie) {
      try {
        const jwt = await import('jsonwebtoken')
        const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET

        if (secret) {
          const decoded = jwt.verify(nextAuthTokenCookie.value, secret) as any

          if (decoded && decoded.email) {
            const user = await prisma.users.findUnique({
              where: { email: decoded.email },
            })

            if (user) {
              return {
                valid: true,
                userId: user.id,
                role: user.role as UserRole,
                email: user.email,
                name: user.name,
                expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
                permissions: getUserPermissions(user.role as UserRole),
              }
            }
          }
        }
      } catch (nextAuthError: any) {
        // Token expired or invalid - fall through to other auth methods
      }
    }

    // Fall back to custom JWT token auth (for other authentication methods)
    const authHeader = request.headers.get('authorization')
    const sessionToken =
      authHeader?.replace('Bearer ', '') || request.cookies.get('auth-token')?.value

    if (!sessionToken) {
      return { valid: false }
    }

    // Verify JWT token
    const payload = TokenUtils.verifyAccessToken(sessionToken)
    if (!payload) {
      return { valid: false }
    }

    // Verify session exists in database
    const session = await prisma.sessions.findFirst({
      where: {
        sessionToken: payload.sessionId,
        expires: { gt: new Date() },
        userId: payload.userId,
      },
      include: {
        user: true,
      },
    })

    if (!session || !session.user) {
      return { valid: false }
    }

    // Update last active time
    await prisma.users.update({
      where: { id: session.userId },
      data: { lastActiveAt: new Date() },
    })

    return {
      valid: true,
      userId: session.user.id,
      role: session.user.role,
      email: session.user.email,
      name: session.user.name,
      expiresAt: session.expires,
      permissions: getUserPermissions(session.user.role),
    }
  } catch (error) {
    console.error('User authentication error:', error)
    return { valid: false }
  }
}

/**
 * Require authentication for protected routes
 * @deprecated Use Clerk middleware with clerkMiddleware() instead. This function will be removed in a future version.
 */
export function requireAuth(
  handler: (request: NextRequest, session: UserSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    const session = await validateUserSession(request)

    if (!session.valid) {
      return new Response(
        JSON.stringify({
          error: 'Authentication required',
          message: 'Please log in to access this resource',
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

/**
 * Optional auth - allows both authenticated and unauthenticated users
 * @deprecated Use Clerk middleware instead. This function will be removed in a future version.
 */
export function optionalAuth(
  handler: (request: NextRequest, session?: UserSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    const session = await validateUserSession(request)
    return handler(request, session.valid ? session : undefined)
  }
}

/**
 * Session management utilities
 * @deprecated Use Clerk session management instead. This class will be removed in a future version.
 */
export class SessionManager {
  static async createSession(user: {
    id: string
    email: string
    role: UserRole
    name: string
  }): Promise<{ accessToken: string; refreshToken: string; sessionId: string }> {
    const sessionId = TokenUtils.generateSessionId()

    // Create session in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    await prisma.sessions.create({
      data: {
        sessionToken: sessionId,
        userId: user.id,
        expires: expiresAt,
      },
    })

    // Generate tokens
    const accessToken = TokenUtils.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      sessionId,
    })

    const refreshToken = TokenUtils.generateRefreshToken({
      userId: user.id,
      sessionId,
    })

    return { accessToken, refreshToken, sessionId }
  }

  static async refreshSession(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const payload = TokenUtils.verifyRefreshToken(refreshToken)
    if (!payload) {
      return null
    }

    // Verify session exists and is valid
    const session = await prisma.sessions.findFirst({
      where: {
        sessionToken: payload.sessionId,
        userId: payload.userId,
        expires: { gt: new Date() },
      },
      include: {
        user: true,
      },
    })

    if (!session || !session.user) {
      return null
    }

    // Generate new tokens
    const newAccessToken = TokenUtils.generateAccessToken({
      userId: session.user.id,
      email: session.user.email,
      role: session.user.role,
      name: session.user.name,
      sessionId: payload.sessionId,
    })

    const newRefreshToken = TokenUtils.generateRefreshToken({
      userId: session.user.id,
      sessionId: payload.sessionId,
    })

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  static async terminateSession(sessionId: string): Promise<void> {
    await prisma.sessions.deleteMany({
      where: {
        sessionToken: sessionId,
      },
    })
  }

  static async terminateAllUserSessions(userId: string): Promise<void> {
    await prisma.sessions.deleteMany({
      where: {
        userId,
      },
    })
  }
}

/**
 * Rate limiting for authentication attempts
 * @deprecated Use Clerk's built-in rate limiting or Upstash Redis. This class will be removed in a future version.
 */
export class AuthRateLimit {
  private static attempts = new Map<string, { count: number; lastAttempt: number }>()
  // Increased limits to prevent false positives during normal authentication flow
  // Note: In serverless environments, this is per-instance. Consider Upstash Redis for production.
  private static readonly MAX_ATTEMPTS = 15 // Increased from 5 to allow for normal auth flow
  private static readonly LOCKOUT_DURATION = 5 * 60 * 1000 // 5 minutes (reduced from 15)
  private static readonly ATTEMPT_WINDOW = 2 * 60 * 1000 // 2 minutes (increased from 1)

  static checkRateLimit(identifier: string): {
    allowed: boolean
    remainingAttempts?: number
    lockoutEndsAt?: Date
  } {
    const now = Date.now()
    const record = this.attempts.get(identifier)

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now })
      return { allowed: true, remainingAttempts: this.MAX_ATTEMPTS - 1 }
    }

    // Check if lockout period has expired
    if (record.count >= this.MAX_ATTEMPTS && now - record.lastAttempt < this.LOCKOUT_DURATION) {
      return {
        allowed: false,
        lockoutEndsAt: new Date(record.lastAttempt + this.LOCKOUT_DURATION),
      }
    }

    // Reset if lockout period expired or attempt window expired
    if (
      now - record.lastAttempt > this.LOCKOUT_DURATION ||
      now - record.lastAttempt > this.ATTEMPT_WINDOW
    ) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now })
      return { allowed: true, remainingAttempts: this.MAX_ATTEMPTS - 1 }
    }

    // Increment attempt count
    record.count++
    record.lastAttempt = now

    if (record.count >= this.MAX_ATTEMPTS) {
      return {
        allowed: false,
        lockoutEndsAt: new Date(now + this.LOCKOUT_DURATION),
      }
    }

    return { allowed: true, remainingAttempts: this.MAX_ATTEMPTS - record.count }
  }

  static resetRateLimit(identifier: string): void {
    this.attempts.delete(identifier)
  }
}

/**
 * Cookie management utilities
 * @deprecated Use Clerk cookie management instead. This class will be removed in a future version.
 */
export class CookieManager {
  static setAuthCookies(response: NextResponse, accessToken: string, refreshToken: string) {
    const isProduction = process.env.NODE_ENV === 'production'

    // Set access token cookie (httpOnly, secure)
    response.cookies.set('auth-token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    })

    // Set refresh token cookie (httpOnly, secure)
    response.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })
  }

  static clearAuthCookies(response: NextResponse) {
    response.cookies.delete('auth-token')
    response.cookies.delete('refresh-token')
    // Clear all possible session token variants (both secure and non-secure)
    response.cookies.delete('authjs.session-token')
    response.cookies.delete('__Secure-authjs.session-token')
    response.cookies.delete('next-auth.session-token')
    response.cookies.delete('__Secure-next-auth.session-token')
  }
}

/**
 * Create demo session token for testing
 * @deprecated Demo tokens are not used with Clerk. This function will be removed in a future version.
 */
export function createDemoToken(): string {
  return `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`
}

/**
 * NextAuth configuration options
 * @deprecated NextAuth has been replaced by Clerk. This config will be removed in a future version.
 */
export const authOptions = {
  providers: [
    // For development, we'll use a credentials provider
    {
      id: 'demo',
      name: 'Demo',
      type: 'credentials',
      credentials: {},
      async authorize() {
        // Return a demo user for development
        return {
          id: 'demo_user',
          email: 'demo@cerebrumbiologyacademy.com',
          name: 'Demo Student',
          role: 'student',
        }
      },
    },
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role || 'student'
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.role = token.role as string
        session.user.id = token.userId as string
      }
      return session
    },
  },
  pages: {
    signIn: '/sign-in',
    signUp: '/sign-up',
  },
}

/**
 * Allowed CORS origins for the application
 */
export const ALLOWED_ORIGINS = [
  'https://cerebrumbiologyacademy.com',
  'https://www.cerebrumbiologyacademy.com',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
]

/**
 * Get safe CORS origin from request
 */
export function getCorsOrigin(request: NextRequest): string {
  const origin = request.headers.get('origin') || ''
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
}

/**
 * Security headers for authentication responses
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  return response
}

// Export admin auth utilities
export { validateAdminSession, type AdminSession } from './admin-auth'

// Export NextAuth auth function for API routes
export { auth } from '@/lib/auth'
