'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'

export function FirebaseAuthButtons() {
  const { isLoading, isAuthenticated, user } = useFirebaseSession()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    // Prevent multiple clicks
    if (isSigningOut) return

    setIsSigningOut(true)
    console.log('[FirebaseAuthButtons] Starting sign out...')

    try {
      // Step 1: Call server logout to clear httpOnly cookies
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

      const data = await response.json()
      console.log('[FirebaseAuthButtons] Logout API response:', data)

      // Step 2: Clear any client-accessible cookies
      document.cookie.split(';').forEach((c) => {
        const cookieName = c.trim().split('=')[0]
        if (cookieName) {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`
        }
      })

      // Step 3: Clear localStorage items related to auth
      localStorage.removeItem('freeUserId')

      // Step 4: Sign out from Firebase client (lazy loaded)
      try {
        const { signOut: firebaseSignOut } = await import('@/lib/firebase/phone-auth')
        await firebaseSignOut()
        console.log('[FirebaseAuthButtons] Firebase sign out successful')
      } catch (fbError) {
        console.warn('[FirebaseAuthButtons] Firebase sign out failed (may not be configured):', fbError)
      }

      console.log('[FirebaseAuthButtons] Sign out complete, redirecting...')
    } catch (error) {
      console.error('[FirebaseAuthButtons] Sign out error:', error)
    } finally {
      // Force hard refresh with cache-busting query param
      window.location.href = '/?_logout=' + Date.now()
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
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            console.log('[FirebaseAuthButtons] Sign Out button clicked!')
            handleSignOut()
          }}
          disabled={isSigningOut}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
