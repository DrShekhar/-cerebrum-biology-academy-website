import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'NEET Coaching in Rohini | Biology Classes Sector 9, DC Chowk | Cerebrum Academy',
  description:
    'Best NEET coaching in Rohini - Sector 9, DC Chowk, Sector 3, Sector 7, Rohini West. AIIMS faculty, 98% success rate, small batches. Online & offline classes. Book free demo!',
  keywords:
    'NEET coaching Rohini, biology tuition Rohini, NEET classes Rohini Sector 9, biology coaching DC Chowk, NEET coaching Rohini West, medical coaching Rohini, NEET preparation Rohini, biology classes near me Rohini',
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
