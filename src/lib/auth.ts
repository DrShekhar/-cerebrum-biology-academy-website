import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Adapter, AdapterAccount, AdapterUser } from 'next-auth/adapters'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from './prisma'
import { logLogin } from './security/auditLogger'
import { logger } from './utils/logger'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    role: 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN' | 'COUNSELOR'
    profile?: {
      phone?: string
      currentClass?: '10th' | '11th' | '12th' | 'Dropper'
      parentEmail?: string
      enrolledCourses?: string[]
    }
  }

  interface Session {
    user: User
  }
}

// Validation schemas
// SECURITY (2026-01-28): Password minimum is 8 characters, consistent with registration
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// SECURITY: Hardcoded admin credentials removed (2026-01-23)
// All admin users MUST be created in the database
// Use: POST /api/admin/users to create admin accounts
// This prevents bypassing database-level security controls

// OAuth provider env resolution (AUTH_* preferred, GOOGLE_CLIENT_* accepted as fallback)
const googleClientId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET
const facebookClientId = process.env.AUTH_FACEBOOK_ID
const facebookClientSecret = process.env.AUTH_FACEBOOK_SECRET

export const isGoogleAuthConfigured = Boolean(googleClientId && googleClientSecret)
export const isFacebookAuthConfigured = Boolean(facebookClientId && facebookClientSecret)

// Adapter: persists OAuth accounts in the `accounts` table (sessions stay JWT).
// @auth/prisma-adapter hardcodes singular delegates (p.user, p.account,
// p.verificationToken) and a `user` relation on account — this schema uses
// plural model names (users, accounts, verification_tokens) with a `users`
// relation, and `users` has required fields the default createUser would miss
// (id has no @default, updatedAt is required). So we map the delegates and
// override the user/account methods. Session methods are never called under
// session.strategy 'jwt'.
function mapUser(user: {
  id: string
  email: string
  name: string
  emailVerified: Date | null
  role: string
  profile?: unknown
}): AdapterUser {
  // Carry role/profile through so the jwt callback sees the same fields the
  // credentials providers return.
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
    role: user.role.toUpperCase(),
    profile: user.profile,
  } as AdapterUser
}

function createAuthAdapter(): Adapter {
  const base = PrismaAdapter({
    user: prisma.users,
    account: prisma.accounts,
    verificationToken: prisma.verification_tokens,
    // Cast: custom prisma client path + plural model names don't satisfy the
    // adapter's expected PrismaClient typing; only the delegates above are used.
  } as never)

  return {
    ...base,
    async createUser(user) {
      const now = new Date()
      const created = await prisma.users.create({
        data: {
          id: randomUUID(),
          email: user.email,
          name: user.name || user.email.split('@')[0],
          emailVerified: user.emailVerified ?? null,
          role: 'STUDENT',
          profile: user.image ? { image: user.image } : undefined,
          updatedAt: now,
        },
      })
      return mapUser(created)
    },
    async getUser(id) {
      const user = await prisma.users.findUnique({ where: { id } })
      return user ? mapUser(user) : null
    },
    async getUserByEmail(email) {
      const user = await prisma.users.findUnique({ where: { email } })
      return user ? mapUser(user) : null
    },
    async getUserByAccount(provider_providerAccountId) {
      const account = await prisma.accounts.findUnique({
        where: { provider_providerAccountId },
        include: { users: true },
      })
      return account?.users ? mapUser(account.users) : null
    },
    async updateUser({ id, ...data }) {
      const user = await prisma.users.update({
        where: { id },
        data: {
          ...(data.email !== undefined ? { email: data.email } : {}),
          ...(data.name !== undefined && data.name !== null ? { name: data.name } : {}),
          ...(data.emailVerified !== undefined ? { emailVerified: data.emailVerified } : {}),
          updatedAt: new Date(),
        },
      })
      return mapUser(user)
    },
    async linkAccount(account) {
      // Pick only the columns the accounts model has — some providers send
      // extra token-endpoint fields that would fail Prisma validation.
      await prisma.accounts.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token ?? null,
          access_token: account.access_token ?? null,
          expires_at: account.expires_at ?? null,
          token_type: account.token_type ?? null,
          scope: account.scope ?? null,
          id_token: account.id_token ?? null,
          session_state: (account.session_state as string | undefined) ?? null,
        },
      })
      return account as AdapterAccount
    },
    async unlinkAccount(provider_providerAccountId) {
      await prisma.accounts.delete({ where: { provider_providerAccountId } })
    },
    // Cast: mapUser carries extra role/profile fields (consumed by the jwt
    // callback) that widen AdapterUser; session methods are unused under JWT.
  } as unknown as Adapter
}

// Providers array is built conditionally: Google/Facebook are only registered
// when their credentials exist so half-configured envs can't break sign-in.
const providers: NextAuthConfig['providers'] = [
  Credentials({
    id: 'whatsapp-otp',
    name: 'WhatsApp OTP',
    credentials: {
      phone: { label: 'Phone', type: 'tel' },
      verificationToken: { label: 'Verification Token', type: 'text' },
    },
    async authorize(credentials) {
      logger.debug('WhatsApp OTP authorization attempt', {
        phone: credentials?.phone,
        hasToken: !!credentials?.verificationToken,
      })

      if (!credentials?.phone || !credentials?.verificationToken) {
        throw new Error('Phone number and verification token are required')
      }

      try {
        // Phone formats in the DB are inconsistent (+91XXXXXXXXXX vs bare
        // 10 digits), so match on the last 10 digits.
        const phoneLast10 = (credentials.phone as string).replace(/\D/g, '').slice(-10)

        if (!phoneLast10) {
          throw new Error('Invalid phone number')
        }

        const user = await prisma.users.findFirst({
          where: {
            phone: { endsWith: phoneLast10 },
            verificationToken: credentials.verificationToken as string,
            verificationTokenExpiry: {
              gte: new Date(),
            },
          },
        })

        if (!user) {
          logger.warn('Invalid or expired verification token', {
            phone: credentials.phone,
            authMethod: 'whatsapp_otp',
          })
          throw new Error('Invalid or expired verification token')
        }

        // One-time use: clear the bridge token; mark the phone as verified
        // (the token is only ever issued after a successful OTP check).
        await prisma.users.update({
          where: { id: user.id },
          data: {
            verificationToken: null,
            verificationTokenExpiry: null,
            ...(user.phoneVerified ? {} : { phoneVerified: new Date() }),
          },
        })

        logger.authentication(user.id, 'whatsapp_otp_login', true, {
          phone: user.phone,
          role: user.role,
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.toUpperCase() as 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN' | 'COUNSELOR',
          profile: user.profile as any,
        }
      } catch (error) {
        logger.error('WhatsApp OTP authentication error', {
          error,
          phone: credentials.phone,
        })
        throw new Error('Authentication failed')
      }
    },
  }),
  Credentials({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      logger.debug('Credentials authorization attempt', {
        email: credentials?.email,
      })

      if (!credentials?.email || !credentials?.password) {
        throw new Error('Email and password are required')
      }

      try {
        // Validate input
        const validatedData = loginSchema.parse({
          email: credentials.email,
          password: credentials.password,
        })

        logger.debug('Credentials validated successfully', {
          prismaAvailable: !!prisma,
        })

        // SECURITY: All users must be in the database - no hardcoded fallback
        // This ensures proper audit trail and password policy enforcement
        const user = await prisma.users.findUnique({
          where: { email: validatedData.email },
        })

        if (!user || !user.passwordHash) {
          // Log failed login attempt
          logger.warn('Login attempt for non-existent user', {
            email: validatedData.email,
            authMethod: 'credentials',
          })
          throw new Error('Invalid email or password')
        }

        const isValidPassword = await bcrypt.compare(validatedData.password, user.passwordHash)

        if (!isValidPassword) {
          // Log failed login attempt
          logger.warn('Invalid password attempt', {
            userId: user.id,
            email: validatedData.email,
            authMethod: 'credentials',
          })
          throw new Error('Invalid email or password')
        }

        // Log successful authentication
        logger.authentication(user.id, 'credentials_login', true, {
          email: user.email,
          role: user.role,
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.toUpperCase() as 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN' | 'COUNSELOR',
          profile: user.profile as any,
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error('Invalid input: ' + error.issues.map((e: any) => e.message).join(', '))
        }
        throw new Error('Authentication failed')
      }
    },
  }),
]

if (isGoogleAuthConfigured) {
  providers.push(
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      // Same-email trust: Google verifies emails, so link to the existing
      // users row instead of erroring with OAuthAccountNotLinked.
      allowDangerousEmailAccountLinking: true,
    })
  )
}

if (isFacebookAuthConfigured) {
  providers.push(
    Facebook({
      clientId: facebookClientId,
      clientSecret: facebookClientSecret,
      allowDangerousEmailAccountLinking: true,
    })
  )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: createAuthAdapter(),
  providers,
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours for admin sessions
    updateAge: 24 * 60 * 60, // Update only once per day to prevent frequent polling
  },
  callbacks: {
    async signIn({ account, profile }) {
      // OAuth gate: only accept Google/Facebook sign-ins that carry a real,
      // trustworthy email. Existing users with that email get linked (via
      // allowDangerousEmailAccountLinking + the adapter's accounts table);
      // unknown emails fall through to adapter createUser (role STUDENT).
      if (account?.provider === 'google') {
        if (!profile?.email || profile.email_verified !== true) {
          logger.warn('Google sign-in rejected: unverified or missing email', {
            hasEmail: !!profile?.email,
          })
          return false
        }
        return true
      }
      if (account?.provider === 'facebook') {
        if (!profile?.email) {
          logger.warn('Facebook sign-in rejected: no email on profile')
          return false
        }
        return true
      }
      // Credentials providers do their own verification in authorize()
      return true
    },
    async jwt({ token, user }) {
      // Persist user data in JWT token. On OAuth sign-in `user` is the adapter
      // user (mapUser carries role/profile); default role to STUDENT so brand
      // new OAuth users always have the field the session callback reads.
      if (user) {
        token.id = user.id
        token.role = user.role ?? 'STUDENT'
        token.profile = user.profile
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to client
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN' | 'COUNSELOR'
        session.user.profile = token.profile as typeof session.user.profile
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Role-specific entry pages: send the user to their workspace after auth.
      // NextAuth's redirect callback doesn't receive session, so we infer
      // intent from the URL the user came from.
      if (url.includes('/admin/login')) {
        return `${baseUrl}/admin`
      }
      if (url.includes('/counselor/login')) {
        return `${baseUrl}/counselor`
      }
      if (url.includes('/teacher/login')) {
        return `${baseUrl}/teacher`
      }
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  events: {
    async signIn(message) {
      const user = message.user
      // SECURITY (2026-01-28): Log auth events only in dev, redact in prod
      if (process.env.NODE_ENV === 'development') {
        console.log('User signed in:', user.email, 'Role:', user.role)
      }

      // Log successful login to audit system
      if (user.email && user.role) {
        logLogin(user.email, user.role, 'unknown', 'unknown') // IP and user agent will be captured in middleware
      }
    },
    async signOut(message) {
      // Handle both token and session types
      let userEmail: string | undefined
      if ('session' in message && message.session) {
        userEmail = (message.session as any).user?.email
      }
      // SECURITY (2026-01-28): Log auth events only in dev
      if (process.env.NODE_ENV === 'development') {
        console.log('User signed out:', userEmail)
      }

      // Note: Logout events could be added to audit logger if needed
    },
  },
  debug: process.env.NODE_ENV === 'development',
})

// Helper functions for role-based access
export async function requireAuth(
  allowedRoles: string[] = ['STUDENT', 'PARENT', 'TEACHER', 'ADMIN', 'COUNSELOR']
) {
  const session = await auth()

  if (!session || !session.user) {
    throw new Error('Authentication required')
  }

  if (!allowedRoles.includes(session.user.role)) {
    throw new Error('Insufficient permissions')
  }

  return session
}

export async function requireStudent() {
  return await requireAuth(['STUDENT'])
}

export async function requireTeacher() {
  return await requireAuth(['TEACHER', 'ADMIN'])
}

export async function requireCounselor() {
  return await requireAuth(['COUNSELOR', 'ADMIN'])
}

export async function requireAdmin() {
  return await requireAuth(['ADMIN'])
}

// Middleware for protecting admin routes
export async function requireAdminAuth() {
  try {
    const session = await requireAdmin()

    // SECURITY (2026-01-28): Log admin access only in dev to prevent info leakage
    if (process.env.NODE_ENV === 'development') {
      console.log(`Admin access granted: ${session.user.email} at ${new Date().toISOString()}`)
    }

    return session
  } catch (error) {
    // SECURITY: Don't expose error details in production
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Admin authentication failed at ${new Date().toISOString()}:`, error)
    }
    throw new Error('Admin authentication required')
  }
}

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Rate limiting for authentication (simple in-memory implementation)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const attempt = loginAttempts.get(identifier)

  if (!attempt) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now })
    return true
  }

  // Reset after 15 minutes
  if (now - attempt.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now })
    return true
  }

  // Allow max 5 attempts per 15 minutes
  if (attempt.count >= 5) {
    return false
  }

  attempt.count++
  attempt.lastAttempt = now
  return true
}
