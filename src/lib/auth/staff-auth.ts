/**
 * Staff Authentication Helper
 * Authenticates any internal staff member (ADMIN, TEACHER, COUNSELOR) for
 * /api/staff/* routes. Same contract as authenticateCounselor().
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const STAFF_ROLES = ['ADMIN', 'TEACHER', 'COUNSELOR'] as const
export type StaffRole = (typeof STAFF_ROLES)[number]

export interface StaffSession {
  userId: string
  email: string
  name: string
  role: StaffRole
}

export async function authenticateStaff(): Promise<
  { session: StaffSession } | { error: NextResponse }
> {
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

  const userRole = (session.user.role || '').toUpperCase()
  if (!STAFF_ROLES.includes(userRole as StaffRole)) {
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
      role: userRole as StaffRole,
    },
  }
}
