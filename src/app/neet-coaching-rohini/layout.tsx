import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Rohini | 98% Success | Visit Our Center | Free Demo',
  description:
    'NEET Biology coaching in Rohini by AIIMS Alumnus Dr. Shekhar Singh. Visit DC Chowk center. 98% success, 67+ AIIMS selections. Board Biology, Olympiad, Foundation. Call 88264-44334.',
  keywords:
    'NEET coaching Rohini, biology tuition Rohini, NEET classes Rohini Sector 9, biology coaching DC Chowk, NEET coaching Rohini West, medical coaching Rohini, NEET preparation Rohini, Board Biology, CBSE Biology, Biology Olympiad, NBO, IBO, Class 11 Biology Rohini, Class 12 Biology Rohini, Foundation Biology',
  openGraph: {
    title: 'Best NEET Coaching in Rohini',
    description:
      'Premium NEET coaching in Rohini. Expert AIIMS faculty, small batches, 98% success rate. Serving Sector 9, DC Chowk, Sector 3 & more.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Rohini | Cerebrum Biology Academy',
    description: 'Best NEET coaching in Rohini. Expert AIIMS faculty, small batches, 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini',
  },
}

export default function NEETCoachingRohiniLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocalBusinessSchema locationId="rohini" />
      {children}
      <NearMeKeywordInjector
        location="Rohini"
        parentLocation="Delhi NCR"
        centerAddress="211 Vikas Surya Tower, DC Chauk, Rohini Sector 9, Delhi - 110085"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['Sector 3', 'Sector 7', 'Sector 9', 'DC Chowk', 'Rohini West', 'Rohini East', 'Prashant Vihar', 'Pitampura']}
      />
    </>
  )
}
