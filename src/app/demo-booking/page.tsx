'use client'

import { Suspense } from 'react'
import { DemoBookingSystem } from '@/components/booking/DemoBookingSystem'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useEffect } from 'react'

function DemoBookingPage() {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView('/demo-booking', 'Free Demo Booking - NEET Biology')
  }, [trackPageView])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <DemoBookingSystem />
      </Suspense>
    </div>
  )
}

export default DemoBookingPage
