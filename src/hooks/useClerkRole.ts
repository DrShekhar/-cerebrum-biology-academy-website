'use client'

import { useMemo } from 'react'
import { useSafeUser } from './useSafeClerk'

export type UserRole = 'ADMIN' | 'TEACHER' | 'COUNSELOR' | 'STUDENT' | 'PARENT'

/**
 * Client-side hook to get user role from Clerk
 *
 * Uses useSafeUser to gracefully handle cases where Clerk is not configured.
 *
 * SETUP REQUIRED: Set role in Clerk Dashboard:
 * Go to: Dashboard > Users > [User] > Public metadata
 * Add: { "role": "admin" } (or "teacher", "counselor", etc.)
 */
export function useClerkRole() {
  const { user, isLoaded, isSignedIn } = useSafeUser()

  const role = useMemo(() => {
    if (!user?.publicMetadata?.role) return null
    return (user.publicMetadata.role as string).toUpperCase() as UserRole
  }, [user?.publicMetadata?.role])

  return {
    role,
    isLoaded,
    isSignedIn,
    isAdmin: role === 'ADMIN',
    isTeacher: role === 'TEACHER' || role === 'ADMIN',
    isCounselor: role === 'COUNSELOR' || role === 'ADMIN',
    isStudent: role === 'STUDENT',
    isParent: role === 'PARENT',
    hasRole: (requiredRoles: UserRole[]) => role !== null && requiredRoles.includes(role),
  }
}
