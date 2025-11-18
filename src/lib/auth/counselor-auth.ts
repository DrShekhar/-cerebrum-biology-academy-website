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
  // DEV MODE: Bypass authentication during development
  if (process.env.BYPASS_CRM_AUTH === 'true') {
    console.log('[DEV MODE] Bypassing counselor authentication')
    return {
      session: {
        userId: 'dev-user-id',
        email: 'dev@cerebrumbiologyacademy.com',
        name: 'Developer',
        role: 'ADMIN',
      },
    }
  }

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
