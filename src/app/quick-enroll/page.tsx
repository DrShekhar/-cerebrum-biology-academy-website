import { Metadata } from 'next'
import { HighConversionLanding } from '@/components/conversion/HighConversionLanding'

export const metadata: Metadata = {
  title: 'Quick Enroll - Master Biology, Conquer NEET | Cerebrum Biology Academy',
  description:
    'Take our 2-minute quiz and get personalized NEET Biology course recommendations with instant enrollment. 98% success rate, 247 AIIMS selections. Start your medical journey today!',
  keywords: [
    'NEET Biology quick enrollment',
    'instant NEET admission',
    '2-minute course finder',
    'NEET Biology personalized courses',
    'quick NEET registration',
    'instant Biology coaching',
    'AIIMS admission course',
    'fast NEET enrollment',
  ],
  openGraph: {
    title: 'Quick Enroll - 2-Minute Path to NEET Success',
    description:
      'Quiz → Course Match → Instant Enrollment. Join 5000+ students who achieved their medical dreams with our personalized approach.',
    images: [
      {
        url: '/api/placeholder/1200/630',
        width: 1200,
        height: 630,
        alt: 'Quick Enrollment Process - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Enroll - 2-Minute Path to NEET Success',
    description:
      'Take our quiz and get instant course recommendations. 98% success rate guaranteed.',
  },
}

export default function QuickEnrollPage() {
  return (
    <div className="min-h-screen">
      <HighConversionLanding />
    </div>
  )
}
