/**
 * Clerk authentication utilities for role-based access control
 *
 * SETUP REQUIRED: Add custom session claims in Clerk Dashboard:
 * Go to: Dashboard > Sessions > Customize session token
 * Add: { "metadata": "{{user.public_metadata}}" }
 */

import { auth, currentUser } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'

export type UserRole = 'ADMIN' | 'TEACHER' | 'COUNSELOR' | 'STUDENT' | 'PARENT'

/**
 * Get user role from Clerk session claims (server-side)
 * Fast - uses session token, no API call
 */
export async function getUserRole(): Promise<UserRole | null> {
  try {
    const { sessionClaims } = await auth()
    const role = (sessionClaims as { metadata?: { role?: string } })?.metadata?.role
    return role?.toUpperCase() as UserRole | null
  } catch {
    return null
  }
}

/**
 * Get full user data from Clerk (server-side)
 * Slower - makes API call
 */
export async function getClerkUser() {
  const user = await currentUser()
  if (!user) return null

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    phone: user.phoneNumbers[0]?.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    imageUrl: user.imageUrl,
    role: (user.publicMetadata?.role as string)?.toUpperCase() as UserRole | undefined,
  }
}

/**
 * Check if user has required role (server-side)
 */
export async function hasRequiredRole(requiredRoles: UserRole[]): Promise<boolean> {
  const role = await getUserRole()
  if (!role) return false
  return requiredRoles.includes(role)
}

/**
 * Check if user is admin (server-side)
 */
export async function isAdmin(): Promise<boolean> {
  return hasRequiredRole(['ADMIN'])
}

/**
 * Check if user is teacher (server-side)
 */
export async function isTeacher(): Promise<boolean> {
  return hasRequiredRole(['TEACHER', 'ADMIN'])
}

/**
 * Check if user is counselor (server-side)
 */
export async function isCounselor(): Promise<boolean> {
  return hasRequiredRole(['COUNSELOR', 'ADMIN'])
}

/**
 * Update user role in Clerk (admin only)
 * This should be called when changing roles via admin panel
 */
export async function updateUserRole(userId: string, role: UserRole) {
  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: role.toLowerCase() },
  })
}

/**
 * Get Prisma user ID from Clerk user
 * Looks for clerkId in user profile or constructs it
 */
export function getPrismaUserId(clerkUserId: string): string {
  return `usr_${clerkUserId}`
}
