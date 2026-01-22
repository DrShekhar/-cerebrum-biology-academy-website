'use client'

import Link from 'next/link'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/firebase/phone-auth'

export function FirebaseAuthButtons() {
  const { isLoading, isAuthenticated, user } = useFirebaseSession()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Force a hard refresh to clear all client-side state
      // router.refresh() only refreshes server components, not client state
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
      // Even on error, redirect to home and force refresh
      window.location.href = '/'
    }
  }

  if (isLoading) {
    return <div className="w-16 h-8 bg-slate-100 animate-pulse rounded" />
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Dashboard
        </Link>
        <button
          onClick={handleSignOut}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/sign-in"
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
    >
      Sign In
    </Link>
  )
}
