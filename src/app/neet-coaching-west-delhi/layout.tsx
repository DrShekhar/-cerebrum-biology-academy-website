import type { Metadata } from 'next'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'NEET Coaching in West Delhi | Biology Classes Near You',
  description:
    'Best NEET coaching in West Delhi. Expert biology classes for Class 11, 12 & droppers. AIIMS-trained faculty, small batches, 98% success rate. Free demo class!',
  openGraph: {
    title: 'NEET Coaching in West Delhi | Biology Classes Near You',
    description:
      'Best NEET coaching in West Delhi. Expert biology classes for Class 11, 12 & droppers. AIIMS-trained faculty, small batches, 98% success rate. Free demo class!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-west-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-west-delhi',
  },
}

export default function NEETCoachingWestDelhiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NearMeKeywordInjector
        location="West Delhi"
        parentLocation="Delhi NCR"
        centerAddress="211 Vikas Surya Tower, DC Chauk, Rohini Sector 9, Delhi - 110085"
        centerPhone="+91-8826-444-334"
        nearbyAreas={[
          'Dwarka',
          'Janakpuri',
          'Rajouri Garden',
          'Vikaspuri',
          'Uttam Nagar',
          'Tilak Nagar',
          'Tagore Garden',
          'Hari Nagar',
        ]}
      />
    </>
  )
}
