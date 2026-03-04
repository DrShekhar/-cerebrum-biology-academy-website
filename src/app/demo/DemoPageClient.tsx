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

function PricingContext() {
  return (
    <div className="max-w-2xl mx-auto mb-6 px-4">
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-700">
          <span className="font-medium">Courses from <span className="text-gray-900 font-semibold">₹45,000</span></span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>EMI in 3 installments</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>Free demo class included</span>
        </div>
        <a
          href="/pricing"
          className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap hover:underline"
        >
          View all pricing →
        </a>
      </div>
    </div>
  )
}

export default function DemoPageClient() {
  return (
    <Suspense fallback={<DemoPageSkeleton />}>
      <PricingContext />
      <DemoBookingSystem />
    </Suspense>
  )
}
