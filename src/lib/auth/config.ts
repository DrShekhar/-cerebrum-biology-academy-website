/**
 * Auth configuration for the application - CANONICAL AUTH SYSTEM
 * ==============================================================
 *
 * IMPORTANT (2026-01-29): This is the SINGLE SOURCE OF TRUTH for authentication.
 *
 * CANONICAL AUTH SYSTEM: NextAuth v5 + Custom JWT
 * ===============================================
 * - Web users: NextAuth sessions (cookie-based)
 * - API clients: Custom JWT tokens (Bearer auth)
 * - Server-side: validateUserSession() validates both
 *
 * DEPRECATED (do NOT use in new code):
 * - Firebase Auth (@/lib/firebase/auth-context.tsx)
 *
 * AUTH HIERARCHY (validation order in validateUserSession):
 * 1. NextAuth sessions (via auth() helper)
 * 2. NextAuth JWT cookies (manual parse fallback)
 * 3. Custom JWT tokens (Authorization header or auth-token cookie)
 * 4. Prisma sessions table (database lookup)
 *
 * ACTIVE UTILITIES:
 * - PasswordUtils - Password hashing/validation
 * - TokenUtils - JWT token generation for API authentication
 * - SessionManager - Server-side session management
 * - CookieManager - Auth cookie handling
 * - validateUserSession - Session validation for API routes
 * - ROLE_PERMISSIONS - Role-based access control (SINGLE SOURCE - do not duplicate!)
 * - addSecurityHeaders - Security headers utility
 * - ALLOWED_ORIGINS - CORS configuration
 * - AuthRateLimit - Rate limiting for auth endpoints
 *
 * For client-side auth: Use useAuth() from @/contexts/AuthContext
 * For server-side auth: Use validateUserSession() from this file
 */
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import type { UserRole as PrismaUserRole } from '@/generated/prisma'

export type UserRole = PrismaUserRole

// Environment variables validation
// SECURITY: Secrets are REQUIRED in production at runtime - not at build time
// Using lazy initialization to prevent build-time errors in CI

// Cache for lazy-loaded secrets
let _jwtSecret: string | null = null
let _jwtRefreshSecret: string | null = null

/**
 * Detect if we're in a build-time context (Next.js build, not actual runtime)
 * During build, certain code paths are analyzed but not executed for real requests
 */
const isBuildTime = (): boolean => {
  // NEXT_PHASE is set during Next.js build
  return process.env.NEXT_PHASE === 'phase-production-build'
}

const getJWTSecret = (): string => {
  if (_jwtSecret) return _jwtSecret

  const secret = process.env.JWT_SECRET
  if (!secret) {
    // Allow builds to proceed without secrets
    if (isBuildTime()) {
      return 'build-time-placeholder-not-for-actual-use'
    }

    // SECURITY: In production runtime, fail hard - never use fallback secrets
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        '[SECURITY CRITICAL] JWT_SECRET environment variable is not configured. ' +
          'This is required for production. Set it in your deployment environment.'
      )
    }

    // Development/test fallback only
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
    // Allow builds to proceed without secrets
    if (isBuildTime()) {
      return 'build-time-placeholder-not-for-actual-use'
    }

    // SECURITY: In production runtime, fail hard - never use fallback secrets
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        '[SECURITY CRITICAL] JWT_REFRESH_SECRET environment variable is not configured. ' +
          'This is required for production. Set it in your deployment environment.'
      )
    }

    // Development/test fallback only
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

export interface AuthenticatedSession {
  valid: true
  userId: string
  role: UserRole
  email: string
  name: string
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
 * JWT token utilities for API authentication
 * Used alongside Firebase Auth for server-side token validation
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
    // Use Web Crypto API for cross-platform compatibility
    const array = new Uint8Array(16)
    if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
      globalThis.crypto.getRandomValues(array)
    }
    const randomHex = Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
    return `session_${Date.now()}_${randomHex}`
  }
}

/**
 * Role-based permissions - SINGLE SOURCE OF TRUTH
 * IMPORTANT: Do not duplicate this elsewhere. Import from this file.
 * SECURITY (2026-01-29): Consolidated to prevent permission inconsistencies
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  STUDENT: [
    'test:take',
    'notes:view',
    'profile:edit',
    'enrollment:view',
    'payment:make',
    'demo:book',
    'community:participate',
  ],
  // SECURITY (2026-01-28): Parent can view payments but making payments requires student action
  // This prevents unauthorized payment actions by parent accounts
  PARENT: ['student:monitor', 'progress:view', 'payment:view', 'payment:history', 'demo:book', 'reports:view'],
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
 * Checks JWT tokens and Firebase session for authentication
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
 * Wraps handlers to enforce authentication
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
 * Provides session info if available, but doesn't require it
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
 * Handles JWT session creation, refresh, and termination
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
 * Uses Upstash Redis in production for distributed rate limiting
 * Falls back to in-memory for development (with warning)
 *
 * SECURITY NOTE (2026-01-28):
 * - In production, Redis failures now trigger FAIL-SECURE behavior
 * - Limited emergency fallback allows 3 attempts per instance to prevent complete lockout
 * - This is a defense-in-depth measure, not a replacement for proper Redis configuration
 */
export class AuthRateLimit {
  // In-memory tracking - used for development and emergency production fallback
  private static attempts = new Map<string, { count: number; lastAttempt: number }>()
  private static readonly MAX_ATTEMPTS = 10 // Normal limit with Redis
  private static readonly EMERGENCY_MAX_ATTEMPTS = 3 // Strict limit when Redis fails (per serverless instance)
  private static readonly LOCKOUT_DURATION_SECONDS = 15 * 60 // 15 minutes lockout
  private static hasLoggedProductionWarning = false
  private static redisFailureCount = 0
  private static readonly MAX_REDIS_FAILURES_BEFORE_ALERT = 5

  /**
   * Check rate limit using Upstash Redis (production) or in-memory (development)
   * SECURITY: Implements fail-secure pattern - rejects requests when Redis unavailable in production
   */
  static async checkRateLimit(identifier: string): Promise<{
    allowed: boolean
    remainingAttempts?: number
    lockoutEndsAt?: Date
    securityDegraded?: boolean // Indicates running in emergency fallback mode
  }> {
    const isProduction = process.env.NODE_ENV === 'production'

    // Try to use Upstash rate limiter first (production)
    try {
      const { getRateLimiter, isRateLimitEnabled } = await import('@/lib/ratelimit/config')

      if (isRateLimitEnabled()) {
        const limiter = getRateLimiter('authLogin')
        if (limiter) {
          const result = await limiter.limit(identifier)

          // Reset failure count on success
          this.redisFailureCount = 0

          if (!result.success) {
            // Calculate lockout end time from reset timestamp
            const lockoutEndsAt = new Date(result.reset)
            return {
              allowed: false,
              remainingAttempts: 0,
              lockoutEndsAt,
            }
          }

          return {
            allowed: true,
            remainingAttempts: result.remaining,
          }
        }
      }

      // Redis not configured - handle based on environment
      if (isProduction) {
        if (!this.hasLoggedProductionWarning) {
          console.error(
            '[SECURITY CRITICAL] Redis rate limiting not configured in production! ' +
              'Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN immediately. ' +
              'Using emergency per-instance fallback with strict limits.'
          )
          this.hasLoggedProductionWarning = true
        }
        // Use emergency fallback with strict limits
        return this.checkEmergencyRateLimit(identifier)
      }
    } catch (error) {
      // Log error and track failure count
      console.error('[AuthRateLimit] Redis rate limit error:', error)
      this.redisFailureCount++

      // In production, implement fail-secure with emergency fallback
      if (isProduction) {
        // Log escalating warnings
        if (this.redisFailureCount >= this.MAX_REDIS_FAILURES_BEFORE_ALERT) {
          console.error(
            `[SECURITY ALERT] Redis rate limiting has failed ${this.redisFailureCount} times! ` +
              'System is operating in degraded security mode. ' +
              'Investigate immediately: check UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
          )
        } else if (!this.hasLoggedProductionWarning) {
          console.error(
            '[SECURITY WARNING] Redis rate limiting failed in production. ' +
              'Using emergency per-instance fallback with strict limits.'
          )
          this.hasLoggedProductionWarning = true
        }

        // Use emergency fallback instead of allowing all requests
        return this.checkEmergencyRateLimit(identifier)
      }
    }

    // In development, use in-memory fallback with normal limits
    return this.checkRateLimitInMemory(identifier, this.MAX_ATTEMPTS)
  }

  /**
   * Emergency rate limiting for production when Redis is unavailable
   * SECURITY: Uses very strict limits (3 attempts per serverless instance)
   * This is not perfect but provides some protection against brute force
   */
  private static checkEmergencyRateLimit(identifier: string): {
    allowed: boolean
    remainingAttempts?: number
    lockoutEndsAt?: Date
    securityDegraded: boolean
  } {
    const result = this.checkRateLimitInMemory(identifier, this.EMERGENCY_MAX_ATTEMPTS)
    return {
      ...result,
      securityDegraded: true, // Flag to indicate degraded security mode
    }
  }

  /**
   * In-memory rate limiting fallback
   * Used for development and as emergency fallback in production
   * @param identifier - The client identifier (usually IP address)
   * @param maxAttempts - Maximum attempts before lockout (stricter in production fallback)
   */
  private static checkRateLimitInMemory(
    identifier: string,
    maxAttempts: number
  ): {
    allowed: boolean
    remainingAttempts?: number
    lockoutEndsAt?: Date
  } {
    const now = Date.now()
    const record = this.attempts.get(identifier)
    const lockoutMs = this.LOCKOUT_DURATION_SECONDS * 1000

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now })
      return { allowed: true, remainingAttempts: maxAttempts - 1 }
    }

    // Check if lockout period has expired
    if (record.count >= maxAttempts && now - record.lastAttempt < lockoutMs) {
      return {
        allowed: false,
        remainingAttempts: 0,
        lockoutEndsAt: new Date(record.lastAttempt + lockoutMs),
      }
    }

    // Reset if lockout period expired
    if (now - record.lastAttempt > lockoutMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now })
      return { allowed: true, remainingAttempts: maxAttempts - 1 }
    }

    // Increment attempt count
    record.count++
    record.lastAttempt = now

    if (record.count >= maxAttempts) {
      return {
        allowed: false,
        remainingAttempts: 0,
        lockoutEndsAt: new Date(now + lockoutMs),
      }
    }

    return { allowed: true, remainingAttempts: maxAttempts - record.count }
  }

  /**
   * Reset rate limit for an identifier (e.g., after successful login)
   * Note: For Upstash, rate limits automatically reset after the window expires
   */
  static resetRateLimit(identifier: string): void {
    // Clear in-memory record (Upstash handles its own expiration)
    this.attempts.delete(identifier)
  }

  /**
   * Get current security status for monitoring
   */
  static getSecurityStatus(): {
    redisFailureCount: number
    isSecurityDegraded: boolean
    inMemoryTrackedIdentifiers: number
  } {
    return {
      redisFailureCount: this.redisFailureCount,
      isSecurityDegraded: this.redisFailureCount > 0 && process.env.NODE_ENV === 'production',
      inMemoryTrackedIdentifiers: this.attempts.size,
    }
  }
}

/**
 * Cookie management utilities
 * Handles auth token cookies for session persistence
 *
 * SECURITY (2026-01-28): Using SameSite='strict' for auth cookies
 * This prevents CSRF attacks by not sending cookies on cross-site requests
 */
export class CookieManager {
  static setAuthCookies(response: NextResponse, accessToken: string, refreshToken: string) {
    const isProduction = process.env.NODE_ENV === 'production'

    // Set access token cookie (httpOnly, secure, strict same-site)
    response.cookies.set('auth-token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict', // Changed from 'lax' for better CSRF protection
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    })

    // Set refresh token cookie (httpOnly, secure, strict same-site)
    response.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict', // Changed from 'lax' for better CSRF protection
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })
  }

  static clearAuthCookies(response: NextResponse) {
    const isProduction = process.env.NODE_ENV === 'production'

    // Cookie options must match how they were set for deletion to work
    // IMPORTANT: sameSite must match how cookies were set ('strict') for deletion to work
    const cookieOptions = {
      path: '/',
      secure: isProduction,
      sameSite: 'strict' as const, // Must match setAuthCookies for proper deletion
      httpOnly: true,
      maxAge: 0, // Expire immediately
    }

    // Clear auth tokens by setting empty value with maxAge: 0
    // This is more reliable than delete() across different browsers
    response.cookies.set('auth-token', '', cookieOptions)
    response.cookies.set('refresh-token', '', cookieOptions)

    // Clear all possible session token variants (both secure and non-secure)
    // NextAuth cookies may use 'lax' sameSite, so we clear with both options
    const nextAuthOptions = { path: '/', maxAge: 0, httpOnly: true }
    response.cookies.set('authjs.session-token', '', { ...nextAuthOptions, secure: false, sameSite: 'lax' as const })
    response.cookies.set('__Secure-authjs.session-token', '', { ...nextAuthOptions, secure: true, sameSite: 'lax' as const })
    response.cookies.set('next-auth.session-token', '', { ...nextAuthOptions, secure: false, sameSite: 'lax' as const })
    response.cookies.set('__Secure-next-auth.session-token', '', { ...nextAuthOptions, secure: true, sameSite: 'lax' as const })
    // Also try strict sameSite in case they were set that way
    response.cookies.set('authjs.session-token', '', { ...nextAuthOptions, secure: isProduction, sameSite: 'strict' as const })
    response.cookies.set('next-auth.session-token', '', { ...nextAuthOptions, secure: isProduction, sameSite: 'strict' as const })

    // Also use delete as a fallback for older implementations
    response.cookies.delete('auth-token')
    response.cookies.delete('refresh-token')
    response.cookies.delete('authjs.session-token')
    response.cookies.delete('__Secure-authjs.session-token')
    response.cookies.delete('next-auth.session-token')
    response.cookies.delete('__Secure-next-auth.session-token')
  }
}

/**
 * Create demo session token for testing
 * Used in development/testing environments
 */
export function createDemoToken(): string {
  // Use Web Crypto API for cross-platform compatibility
  const array = new Uint8Array(8)
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
    globalThis.crypto.getRandomValues(array)
  }
  const randomHex = Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
  return `demo_${Date.now()}_${randomHex}`
}

/**
 * NextAuth configuration options
 * Legacy config for backwards compatibility - primary auth is Firebase
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
