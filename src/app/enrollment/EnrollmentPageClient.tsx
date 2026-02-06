'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled to prevent hydration issues with payment components
const StreamlinedEnrollmentPage = dynamic(
  () => import('@/components/enrollment/StreamlinedEnrollmentPage').then(mod => ({ default: mod.StreamlinedEnrollmentPage })),
  {
    ssr: false,
    loading: () => <EnrollmentSkeleton />
  }
)

function EnrollmentSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-2xl w-full p-8">
        {/* Header skeleton */}
        <div className="animate-pulse mb-8">
          <div className="h-10 w-64 bg-gray-200 rounded mb-4" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>

        {/* Steps indicator skeleton */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full mb-2" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Form skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-14 bg-gray-200 rounded-lg" />
          <div className="h-14 bg-gray-200 rounded-lg" />
          <div className="h-14 bg-gray-200 rounded-lg" />
          <div className="h-12 bg-blue-200 rounded-lg mt-6" />
        </div>

        {/* Loading text */}
        <p className="text-center text-gray-500 mt-6">Loading enrollment form...</p>
      </div>
    </div>
  )
}

export default function EnrollmentPageClient() {
  return (
    <Suspense fallback={<EnrollmentSkeleton />}>
      <StreamlinedEnrollmentPage />
    </Suspense>
  )
}
