'use client'

import { Suspense } from 'react'
import { StudentCommunity } from '@/components/student/StudentCommunity'
import { useAuth } from '@/hooks/useAuth'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useEffect } from 'react'

function CommunityPage() {
  const { user, isLoading } = useAuth()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView('/community', 'Student Community - NEET Biology')
  }, [trackPageView])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Connect with fellow NEET aspirants, share knowledge, and grow together in your journey
            to become a doctor.
          </p>
          <div className="space-y-3">
            <a
              href="/auth/signin"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors block"
            >
              Sign In to Join Community
            </a>
            <a
              href="/auth/signup"
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors block"
            >
              Create New Account
            </a>
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="text-center">
                <div className="font-semibold text-blue-600">2,847</div>
                <div>Active Students</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">15,000+</div>
                <div>Discussions</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-600">95%</div>
                <div>Helpful Answers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <StudentCommunity />
      </Suspense>
    </div>
  )
}

export default CommunityPage
