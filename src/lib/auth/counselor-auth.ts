/**
 * Counselor Authentication Helper
 * Provides authentication for counselor API routes using NextAuth
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export interface CounselorSession {
  userId: string
  email: string
  name: string
  role: string
}

/**
 * Authenticates counselor session for API routes
 * Returns the session if valid, or throws an error response
 */
export async function authenticateCounselor(): Promise<
  { session: CounselorSession } | { error: NextResponse }
> {
  // SECURITY: Auth bypass completely removed from production code
  // For local development, use a real counselor account in the database
  // This prevents accidental bypass if env vars are misconfigured

  const session = await auth()

  if (!session || !session.user) {
    return {
      error: NextResponse.json(
        {
          success: false,
          error: 'Authentication required',
          message: 'Please sign in to access this resource',
        },
        { status: 401 }
      ),
    }
  }

  // Check if user has counselor or admin role
  const userRole = session.user.role.toUpperCase()
  if (userRole !== 'COUNSELOR' && userRole !== 'ADMIN') {
    return {
      error: NextResponse.json(
        {
          success: false,
          error: 'Access denied',
          message: 'You do not have permission to access this resource',
        },
        { status: 403 }
      ),
    }
  }

  return {
    session: {
      userId: session.user.id,
      email: session.user.email || '',
      name: session.user.name || '',
      role: userRole,
    },
  }
}
