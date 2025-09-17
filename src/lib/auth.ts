import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from './prisma'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    role: 'student' | 'parent' | 'teacher' | 'admin'
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

// Admin credentials (in production, this should be in a secure database)
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'admin@cerebrumbiologyacademy.com',
  passwordHash:
    process.env.ADMIN_PASSWORD_HASH ||
    '$2a$12$LQv3c1yqBwkVsvDqjrOuWOFHk.cqmZqjSmUjcScVHFWuLnDSsOlMe', // 'admin123'
  name: 'Admin User',
  role: 'admin' as const,
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        try {
          // Validate input
          const validatedData = loginSchema.parse({
            email: credentials.email,
            password: credentials.password,
          })

          // First check if it's the hardcoded admin credentials (fallback)
          if (validatedData.email === ADMIN_CREDENTIALS.email) {
            const isValidPassword = await bcrypt.compare(
              validatedData.password,
              ADMIN_CREDENTIALS.passwordHash
            )

            if (isValidPassword) {
              return {
                id: 'admin-1',
                email: ADMIN_CREDENTIALS.email,
                name: ADMIN_CREDENTIALS.name,
                role: ADMIN_CREDENTIALS.role,
              }
            }
          }

          // Try to find user in database
          try {
            const user = await prisma.user.findUnique({
              where: { email: validatedData.email },
            })

            if (user && user.passwordHash) {
              const isValidPassword = await bcrypt.compare(
                validatedData.password,
                user.passwordHash
              )

              if (isValidPassword) {
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  role: user.role.toLowerCase() as 'student' | 'parent' | 'teacher' | 'admin',
                  profile: user.profile as any,
                }
              }
            }
          } catch (dbError) {
            console.warn('Database query failed, falling back to hardcoded admin:', dbError)
          }

          throw new Error('Invalid email or password')
        } catch (error) {
          console.error('Authentication error:', error)
          if (error instanceof z.ZodError) {
            throw new Error('Invalid input: ' + error.errors.map((e) => e.message).join(', '))
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
    updateAge: 2 * 60 * 60, // Update every 2 hours
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
        session.user.role = token.role as 'student' | 'parent' | 'teacher' | 'admin'
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
      console.log('User signed in:', message.user.email, 'Role:', message.user.role)
    },
    async signOut(message) {
      console.log('User signed out:', message.session?.user?.email)
    },
  },
  debug: process.env.NODE_ENV === 'development',
})

// Helper functions for role-based access
export async function requireAuth(
  allowedRoles: string[] = ['student', 'parent', 'teacher', 'admin']
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

export async function requireAdmin() {
  return await requireAuth(['admin'])
}

// Middleware for protecting admin routes
export async function requireAdminAuth() {
  try {
    const session = await requireAdmin()
    return session
  } catch (error) {
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
