'use client'

import dynamic from 'next/dynamic'
import { useAuth } from '@/hooks/useAuth'
import { useUserFlow } from '@/hooks/useUserFlow'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, LogIn, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DashboardAccessControl } from '@/components/DashboardAccessControl'
import { useSafeUser } from '@/hooks/useSafeClerk'

// Owner phone number - only this number gets multi-role access
const OWNER_PHONE = '+919999744334'

const PersonalizedStudentDashboard = dynamic(
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
          <Link href="/auth/signin">
            <Button variant="primary" size="lg" className="w-full">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </Link>

          <Link href="/auth/signup">
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

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const { isDevMode } = useUserFlow()
  const router = useRouter()
  const { user: clerkUser, isLoaded: clerkLoaded } = useSafeUser()

  useEffect(() => {
    // Check if user is the owner by phone number - redirect to role selection
    if (clerkLoaded && clerkUser) {
      const userPhone = clerkUser.primaryPhoneNumber?.phoneNumber || ''
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
  }, [clerkLoaded, clerkUser, router])

  // Show loading while checking authentication or Clerk is loading
  if (isLoading || !clerkLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <p className="text-gray-600">Checking authentication...</p>
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
