'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'
import { useUserFlow } from '@/hooks/useUserFlow'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, LogIn, UserPlus, RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DashboardAccessControl } from '@/components/DashboardAccessControl'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// Owner phone number - only this number gets multi-role access
const OWNER_PHONE = CONTACT_INFO.phone.owner

// Loading timeout - show error after 15 seconds
const LOADING_TIMEOUT = 15000

const PersonalizedStudentDashboard = dynamicImport(
  () =>
    import('@/components/dashboard/PersonalizedStudentDashboard').then((mod) => ({
      default: mod.PersonalizedStudentDashboard,
    })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <p className="text-gray-600">Loading Your Personalized Dashboard...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
)

function AuthRequiredMessage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>

        <p className="text-gray-600 mb-8">
          Please sign in to access your personalized NEET Biology dashboard with AI-powered learning
          paths.
        </p>

        <div className="space-y-4">
          <Link href="/sign-in">
            <Button variant="primary" size="lg" className="w-full">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button variant="outline" size="lg" className="w-full">
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            New to Cerebrum Biology Academy?{' '}
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Learn more about our courses
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function SessionErrorMessage({ error, onRetry }: { error: Error | null; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Session Error</h1>

        <p className="text-gray-600 mb-4">
          We couldn&apos;t verify your session. This might be due to:
        </p>

        <ul className="text-left text-gray-500 text-sm mb-6 space-y-2">
          <li>• Your session may have expired</li>
          <li>• Network connectivity issues</li>
          <li>• Browser cookies may be blocked</li>
        </ul>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 p-2 rounded mb-6">
            Error: {error.message}
          </p>
        )}

        <div className="space-y-4">
          <Button variant="primary" size="lg" className="w-full" onClick={onRetry}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>

          <Link href="/sign-in">
            <Button variant="outline" size="lg" className="w-full">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In Again
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            If the problem persists, try clearing your browser cookies and signing in again.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function LoadingTimeout({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-10 h-10 text-yellow-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Taking Longer Than Expected</h1>

        <p className="text-gray-600 mb-6">
          The session check is taking longer than usual. This might be due to slow network connection.
        </p>

        <div className="space-y-4">
          <Button variant="primary" size="lg" className="w-full" onClick={onRetry}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Retry
          </Button>

          <Link href="/sign-in">
            <Button variant="outline" size="lg" className="w-full">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In Again
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated, error, sessionChecked, refresh } = useFirebaseSession()
  const { isDevMode } = useUserFlow()
  const router = useRouter()
  const [loadingTimedOut, setLoadingTimedOut] = useState(false)

  // Debug logging for authentication state
  useEffect(() => {
    console.log('[Dashboard] Auth state:', {
      isLoading,
      isAuthenticated,
      sessionChecked,
      hasUser: !!user,
      userId: user?.id,
      userName: user?.name,
      userRole: user?.role,
      error: error?.message,
      cookies: document.cookie ? 'present' : 'empty',
      cookieList: document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(Boolean),
    })
  }, [isLoading, isAuthenticated, sessionChecked, user, error])

  // Loading timeout handler
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        console.warn('[Dashboard] Loading timed out after', LOADING_TIMEOUT, 'ms')
        setLoadingTimedOut(true)
      }, LOADING_TIMEOUT)

      return () => clearTimeout(timeout)
    } else {
      setLoadingTimedOut(false)
    }
  }, [isLoading])

  useEffect(() => {
    // Check if user is the owner by phone number - redirect to role selection
    if (!isLoading && user) {
      const userPhone = user.phone || ''
      const normalizedPhone = userPhone.replace(/[\s\-\(\)]/g, '')

      if (
        normalizedPhone === OWNER_PHONE ||
        normalizedPhone === '919999744334' ||
        normalizedPhone === '+919999744334'
      ) {
        router.push('/select-role')
        return
      }
    }
  }, [isLoading, user, router])

  // Handle retry
  const handleRetry = () => {
    setLoadingTimedOut(false)
    refresh()
  }

  // Show timeout message if loading takes too long
  if (loadingTimedOut && isLoading) {
    return <LoadingTimeout onRetry={handleRetry} />
  }

  // Show error message if session check failed
  if (error && sessionChecked) {
    return <SessionErrorMessage error={error} onRetry={handleRetry} />
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <p className="text-gray-600">Checking authentication...</p>
          <p className="text-xs text-gray-400 mt-2">Please wait...</p>
        </div>
      </div>
    )
  }

  // Show authentication required message if not signed in (unless dev mode)
  if (!isDevMode && (!isAuthenticated || !user)) {
    return <AuthRequiredMessage />
  }

  // Show dashboard for authenticated users with access control
  return (
    <DashboardAccessControl dashboardType="NEET_PREP" fallbackRoute="/student/dashboard">
      <main className="min-h-screen">
        <PersonalizedStudentDashboard />
      </main>
    </DashboardAccessControl>
  )
}
