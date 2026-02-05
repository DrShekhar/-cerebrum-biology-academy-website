import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled to prevent hydration issues
// This also prevents the calendar service from running on server
const DemoBookingSystem = dynamic(
  () => import('@/components/booking/DemoBookingSystem'),
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

export const metadata: Metadata = {
  title: 'Book Free Demo Class | NEET Biology Trial Lesson | Cerebrum Academy',
  description: 'Book a free demo class for NEET Biology coaching. Experience our teaching methodology with AIIMS-trained faculty. Limited slots available. Instant confirmation via WhatsApp.',
  keywords: 'NEET demo class, free biology demo, NEET trial class, biology coaching demo, Cerebrum Academy demo',
  openGraph: {
    title: 'Book Free Demo Class | Cerebrum Biology Academy',
    description: 'Experience NEET Biology coaching with AIIMS-trained faculty. Book your free demo class today!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/demo',
  },
}

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<DemoPageSkeleton />}>
        <DemoBookingSystem />
      </Suspense>
    </main>
  )
}
