import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled to prevent hydration issues with payment components
const StreamlinedEnrollmentPage = dynamic(
  () => import('@/components/enrollment/StreamlinedEnrollmentPage'),
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

export const metadata: Metadata = {
  title: 'Enroll Now | Join Cerebrum Biology Academy | NEET Coaching Admission 2026',
  description: 'Enroll in India\'s top NEET Biology coaching institute. 98% success rate, AIIMS-trained faculty. EMI options available. Limited seats for 2026 batch.',
  keywords: 'NEET enrollment, biology coaching admission, NEET 2026 batch, Cerebrum Academy enrollment, NEET coaching fees',
  openGraph: {
    title: 'Enroll Now | Cerebrum Biology Academy',
    description: '98% success rate. AIIMS-trained faculty. EMI options available. Limited seats!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/enrollment',
  },
}

export default function EnrollmentPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<EnrollmentSkeleton />}>
        <StreamlinedEnrollmentPage />
      </Suspense>
    </main>
  )
}
