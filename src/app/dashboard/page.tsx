'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState, Component, ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, LogIn, UserPlus, RefreshCw, AlertCircle, Brain } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// Owner phone number - only this number gets multi-role access
const OWNER_PHONE = CONTACT_INFO.phone.owner

// Directly import the dashboard component (no dynamic import issues)
import { PersonalizedStudentDashboard } from '@/components/dashboard/PersonalizedStudentDashboard'

// Error Boundary for catching dashboard render errors
interface ErrorBoundaryProps {
  children: ReactNode
  fallback: (error: Error, reset: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class DashboardErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Dashboard Error Boundary] Caught error:', error)
    console.error('[Dashboard Error Boundary] Error info:', errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error, this.reset)
    }
    return this.props.children
  }
}

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

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-600">Loading your dashboard...</p>
        <p className="text-xs text-gray-400 mt-2">Please wait...</p>
      </div>
    </div>
  )
}

function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Error</h1>
        <p className="text-gray-600 mb-4">There was an error loading your dashboard.</p>
        <p className="text-xs text-red-500 bg-red-50 p-2 rounded mb-6 text-left overflow-auto max-h-32">
          {error.message}
        </p>
        <div className="space-y-4">
          <Button variant="primary" size="lg" className="w-full" onClick={reset}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default function DashboardPage() {
  // Use AuthContext - same as header for consistency
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Ensure we're mounted before checking auth (prevent hydration issues)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && mounted) {
      console.log('[Dashboard] Auth state from useAuth:', {
        isLoading,
        isAuthenticated,
        hasUser: !!user,
        userId: user?.id,
      })
    }
  }, [isLoading, isAuthenticated, user, mounted])

  // Owner phone check - redirect to role selection
  useEffect(() => {
    if (!isLoading && user && mounted) {
      const userPhone = user.phone || ''
      const normalizePhone = (phone: string) => phone.replace(/[\+\s\-\(\)]/g, '')
      const normalizedUserPhone = normalizePhone(userPhone)
      const normalizedOwnerPhone = normalizePhone(OWNER_PHONE)

      if (normalizedUserPhone === normalizedOwnerPhone) {
        router.push('/select-role')
        return
      }
    }
  }, [isLoading, user, router, mounted])

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return <LoadingState />
  }

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingState />
  }

  // Show authentication required if not signed in
  if (!isAuthenticated || !user) {
    return <AuthRequiredMessage />
  }

  // User is authenticated - show the dashboard
  return (
    <main className="min-h-screen">
      <DashboardErrorBoundary fallback={(error, reset) => <ErrorFallback error={error} reset={reset} />}>
        <PersonalizedStudentDashboard />
      </DashboardErrorBoundary>
    </main>
  )
}
