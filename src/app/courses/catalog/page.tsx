'use client'

import { Suspense } from 'react'
import { PremiumCourseSelector } from '@/components/catalog/PremiumCourseSelector'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useEffect } from 'react'

function PremiumCourseSelectorPage() {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView('/courses/catalog', 'Premium AI-Powered Course Selector - Medical College Dreams')
  }, [trackPageView])

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-200">Loading your personalized course experience...</p>
            </div>
          </div>
        }
      >
        <PremiumCourseSelector />
      </Suspense>
    </div>
  )
}

export default PremiumCourseSelectorPage
