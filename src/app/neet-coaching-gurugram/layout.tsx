import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Gurugram 2026 | DLF, Golf Course Road, Sector 51',
  description:
    'Top NEET biology coaching in Gurugram 2026. 98% success rate, AIIMS faculty, 15-student batches. Best coaching near DLF Phase 1-5, Golf Course Road, Sector 51, Sohna Road. 680+ students selected. Book free demo class!',
  keywords:
    'NEET coaching Gurugram, NEET coaching Gurgaon, NEET classes DLF, biology coaching Golf Course Road, NEET tuition Sector 51, NEET coaching Sohna Road, NEET coaching MG Road, best NEET coaching Gurugram, NEET preparation Gurgaon, online NEET coaching Gurugram, medical coaching Gurugram',
  openGraph: {
    title: 'Best NEET Coaching in Gurugram | DLF, Golf Course Road',
    description:
      'Top NEET biology coaching in Gurugram with 98% success rate. AIIMS faculty, small batches. Join 620+ students from DLF, Golf Course Road, Sector 51.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Gurugram',
    description:
      'Top NEET biology coaching in Gurugram. 98% success rate. DLF, Golf Course Road, Sector 51.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
  },
}

export default function GurugramCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocalBusinessSchema locationId="gurugram" />
      {children}
      <NearMeKeywordInjector
        location="Gurugram"
        parentLocation="Delhi NCR"
        centerAddress="M2K Corporate Park, Sector 51, Gurugram - 122003"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['DLF Phase 1', 'Golf Course Road', 'Sushant Lok', 'Sector 51', 'Sohna Road', 'MG Road', 'Nirvana Country', 'Cyber City']}
      />
    </>
  )
}
