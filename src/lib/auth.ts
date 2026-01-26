import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
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
    role: 'student' | 'parent' | 'teacher' | 'admin' | 'counselor'
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
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// SECURITY: Hardcoded admin credentials removed (2026-01-23)
// All admin users MUST be created in the database
// Use: POST /api/admin/users to create admin accounts
// This prevents bypassing database-level security controls

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
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
          const user = await prisma.users.findFirst({
            where: {
              phone: credentials.phone as string,
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

          await prisma.users.update({
            where: { id: user.id },
            data: {
              verificationToken: null,
              verificationTokenExpiry: null,
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
            role: user.role.toLowerCase() as
              | 'student'
              | 'parent'
              | 'teacher'
              | 'admin'
              | 'counselor',
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
            role: user.role.toLowerCase() as
              | 'student'
              | 'parent'
              | 'teacher'
              | 'admin'
              | 'counselor',
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
  ],
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
    async jwt({ token, user }) {
      // Persist user data in JWT token
      if (user) {
        token.id = user.id
        token.role = user.role
        token.profile = user.profile
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to client
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as 'student' | 'parent' | 'teacher' | 'admin' | 'counselor'
        session.user.profile = token.profile as typeof session.user.profile
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect admin users to admin panel after login
      if (url.includes('/admin/login')) {
        return `${baseUrl}/admin`
      }
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  events: {
    async signIn(message) {
      const user = message.user
      console.log('User signed in:', user.email, 'Role:', user.role)

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
      console.log('User signed out:', userEmail)

      // Note: Logout events could be added to audit logger if needed
    },
  },
  debug: process.env.NODE_ENV === 'development',
})

// Helper functions for role-based access
export async function requireAuth(
  allowedRoles: string[] = ['student', 'parent', 'teacher', 'admin', 'counselor']
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
  return await requireAuth(['student'])
}

export async function requireTeacher() {
  return await requireAuth(['teacher', 'admin'])
}

export async function requireCounselor() {
  return await requireAuth(['counselor', 'admin'])
}

export async function requireAdmin() {
  return await requireAuth(['admin'])
}

// Middleware for protecting admin routes
export async function requireAdminAuth() {
  try {
    const session = await requireAdmin()

    // Additional security: Log admin access attempts
    console.log(`Admin access granted: ${session.user.email} at ${new Date().toISOString()}`)

    return session
  } catch (error) {
    console.warn(`Admin authentication failed at ${new Date().toISOString()}:`, error)
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
