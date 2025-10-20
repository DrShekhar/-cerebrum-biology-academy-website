// Auth configuration for the application
import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession, AdminSession } from './admin-auth'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { User, UserRole } from '@/generated/prisma'
import { cookies } from 'next/headers'

// Environment variables validation
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

if (
  process.env.NODE_ENV === 'production' &&
  (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET)
) {
  throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be set in production')
}

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
 */
export class TokenUtils {
  static generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  }

  static generateRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN })
  }

  static verifyAccessToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload
    } catch (error) {
      console.error('Access token verification failed:', error)
      return null
    }
  }

  static verifyRefreshToken(token: string): RefreshTokenPayload | null {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload
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
 */
export async function validateUserSession(request: NextRequest): Promise<UserSession> {
  try {
    // Check for session token in headers or cookies
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
    const session = await prisma.session.findFirst({
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
    await prisma.user.update({
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
 */
export class SessionManager {
  static async createSession(
    user: User
  ): Promise<{ accessToken: string; refreshToken: string; sessionId: string }> {
    const sessionId = TokenUtils.generateSessionId()

    // Create session in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    await prisma.session.create({
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
    const session = await prisma.session.findFirst({
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
    await prisma.session.deleteMany({
      where: {
        sessionToken: sessionId,
      },
    })
  }

  static async terminateAllUserSessions(userId: string): Promise<void> {
    await prisma.session.deleteMany({
      where: {
        userId,
      },
    })
  }
}

/**
 * Rate limiting for authentication attempts
 */
export class AuthRateLimit {
  private static attempts = new Map<string, { count: number; lastAttempt: number }>()
  private static readonly MAX_ATTEMPTS = 5
  private static readonly LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes
  private static readonly ATTEMPT_WINDOW = 60 * 1000 // 1 minute

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
  }
}

/**
 * Create demo session token for testing
 */
export function createDemoToken(): string {
  return `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`
}

// NextAuth configuration options
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
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
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
