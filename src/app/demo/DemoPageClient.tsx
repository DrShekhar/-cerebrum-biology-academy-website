'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled to prevent hydration issues
// This also prevents the calendar service from running on server
const DemoBookingSystem = dynamic(
  () => import('@/components/booking/DemoBookingSystem').then(mod => ({ default: mod.DemoBookingSystem })),
  {
    ssr: false,
    loading: () => <DemoPageSkeleton />
  }
)

function DemoPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mb-4" />
        <p className="text-gray-600">Loading booking system...</p>
      </div>
    </div>
  )
}

export default function DemoPageClient() {
  return (
    <Suspense fallback={<DemoPageSkeleton />}>
      <DemoBookingSystem />
    </Suspense>
  )
}
