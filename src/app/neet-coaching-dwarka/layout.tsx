import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Dwarka | Sector 4, 6, 10, 12, 21, 22 | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Dwarka, New Delhi. 98% success rate, AIIMS faculty. Best coaching in Sector 4, 6, 10, 12, 21, 22, Palam, Uttam Nagar. 1,500+ students. Book free demo!',
  keywords:
    'NEET coaching Dwarka, NEET coaching Dwarka Sector 6, NEET coaching Dwarka Sector 10, NEET coaching Dwarka Sector 12, biology coaching Dwarka, NEET tuition Dwarka, NEET coaching Palam, NEET coaching Uttam Nagar, NEET coaching Janakpuri, best NEET coaching Dwarka, online NEET coaching Dwarka, medical coaching Dwarka',
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
