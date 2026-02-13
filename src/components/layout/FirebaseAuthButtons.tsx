'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Authentication buttons for the header
 * Uses centralized AuthContext for consistent logout behavior
 *
 * NOTE: Despite the name "FirebaseAuthButtons", this component now uses
 * the unified AuthContext system. The name is kept for backwards compatibility
 * with existing imports. Consider renaming to "AuthButtons" in future refactor.
 */
export function FirebaseAuthButtons() {
  const { isLoading, isAuthenticated, user, logout, isLoggingOut } = useAuth()

  const handleSignOut = async () => {
    // Prevent multiple clicks - isLoggingOut is managed by AuthContext
    if (isLoggingOut) return

    console.log('[FirebaseAuthButtons] Starting sign out via AuthContext...')

    // Use centralized logout from AuthContext
    // This handles: server logout, Firebase logout, cookie clearing,
    // localStorage cleanup, and navigation
    await logout()

    console.log('[FirebaseAuthButtons] Sign out complete')
  }

  // Loading state - hidden on mobile to prevent layout shift
  if (isLoading) {
    return <div className="hidden lg:block w-16 h-8 bg-slate-100 animate-pulse rounded" />
  }

  // Authenticated state - hidden on mobile (mobile nav handles this)
  if (isAuthenticated && user) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <Link
          href="/dashboard"
          prefetch={false}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Dashboard
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSignOut()
          }}
          disabled={isLoggingOut}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>
    )
  }

  // Sign in link - hidden on mobile (mobile nav handles this)
  return (
    <Link
      href="/sign-in"
      className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
    >
      Sign In
    </Link>
  )
}
