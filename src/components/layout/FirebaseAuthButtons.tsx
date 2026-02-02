'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'
import { signOut } from '@/lib/firebase/phone-auth'

export function FirebaseAuthButtons() {
  const { isLoading, isAuthenticated, user } = useFirebaseSession()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    // Prevent multiple clicks
    if (isSigningOut) return

    setIsSigningOut(true)
    console.log('[FirebaseAuthButtons] Starting sign out...')

    try {
      await signOut()
      console.log('[FirebaseAuthButtons] Sign out successful, redirecting...')
    } catch (error) {
      console.error('[FirebaseAuthButtons] Sign out error:', error)
    } finally {
      // Always redirect to home with hard refresh to clear all client-side state
      // Use setTimeout to ensure state updates are flushed
      setTimeout(() => {
        window.location.href = '/'
      }, 100)
    }
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
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Dashboard
        </Link>
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSigningOut ? 'Signing Out...' : 'Sign Out'}
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
