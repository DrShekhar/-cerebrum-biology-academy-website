import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

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
          // For now, use demo mode for authentication
          // In production, this would query InstantDB for user
          console.warn('Using demo authentication mode')

          // Demo user for testing
          const demoUser = {
            id: 'demo-user-1',
            email: credentials.email as string,
            name: 'Demo Student',
            password: '$2a$12$demo.hash', // This would be properly hashed in production
            role: 'student' as const,
            profile: {
              phone: '+91-9876543210',
              currentClass: '12th' as const,
              enrolledCourses: ['neet-biology-complete'],
            },
          }

          // Simple demo authentication (accept any password for demo)
          const user = credentials.email ? demoUser : null

          if (!user) {
            throw new Error('Invalid credentials')
          }

          // Skip password verification in demo mode
          // In production, this would verify the password against the hashed version

          // Return user object for JWT
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || 'student',
            profile: user.profile || {},
          }
        } catch (error) {
          console.error('Authentication error:', error)
          throw new Error('Authentication failed')
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
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
      // Redirect logic after sign in/out
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  events: {
    async signIn(message) {
      console.log('User signed in:', message.user.email)

      // Log authentication event (demo mode)
      try {
        console.log('Demo mode: Auth signin logged for user:', message.user.id)
        // In production, this would log to InstantDB
      } catch (error) {
        console.error('Failed to log signin event:', error)
      }
    },
    async signOut(message) {
      console.log('User signed out:', message.session?.user?.email)

      // Log signout event (demo mode)
      try {
        console.log('Demo mode: Auth signout logged for user:', message.session?.user?.id)
        // In production, this would log to InstantDB
      } catch (error) {
        console.error('Failed to log signout event:', error)
      }
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

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
