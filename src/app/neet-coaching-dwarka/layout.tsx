import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'Best NEET Coaching Dwarka 2026 | All Subjects | Online + Offline',
  description:
    'Top NEET coaching for Dwarka — Physics, Chemistry & Biology by AIIMS Alumnus Dr. Shekhar Singh. 98% success, 67+ AIIMS selections. All sectors covered. Call 88264-44334. Free Demo!',
  keywords:
    'NEET coaching Dwarka, neet classes Dwarka, neet institute Dwarka, physics chemistry biology coaching Dwarka, NEET coaching Dwarka Sector 6, NEET coaching Dwarka Sector 10, NEET coaching Dwarka Sector 12, biology coaching Dwarka, NEET tuition Dwarka, NEET coaching Palam, Board Biology, CBSE Biology, Biology Olympiad, NBO, IBO, Class 11 Biology Dwarka, Class 12 Biology Dwarka, Foundation Biology',
  openGraph: {
    title: 'Best NEET Coaching in Dwarka | All Sectors Covered',
    description:
      'Top NEET biology coaching in Dwarka with 98% success rate. AIIMS faculty, small batches. Sector 4, 6, 10, 12, 21, 22 covered. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Dwarka',
    description:
      'Top NEET biology coaching in Dwarka. 98% success rate. All sectors covered.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka',
  },
}

export default function DwarkaCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocalBusinessSchema locationId="rohini" />
      {children}
      <NearMeKeywordInjector
        location="Dwarka"
        parentLocation="Delhi NCR"
        centerAddress="211 Vikas Surya Tower, DC Chauk, Rohini Sector 9, Delhi - 110085"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['Sector 4', 'Sector 6', 'Sector 10', 'Sector 12', 'Sector 21', 'Sector 22', 'Palam', 'Uttam Nagar']}
      />
    </>
  )
}
