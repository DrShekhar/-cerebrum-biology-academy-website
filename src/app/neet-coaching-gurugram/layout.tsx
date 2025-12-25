import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Gurugram | DLF, Golf Course Road, Sector 51 | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Gurugram. 98% success rate, AIIMS faculty. Best coaching in DLF Phase 1-5, Golf Course Road, Sector 51 (Mayfield Garden), Sohna Road. 620+ students. Book free demo!',
  keywords:
    'NEET coaching Gurugram, NEET coaching Gurgaon, NEET classes DLF, biology coaching Golf Course Road, NEET tuition Sector 51, NEET coaching Sohna Road, NEET coaching MG Road, best NEET coaching Gurugram, NEET preparation Gurgaon, online NEET coaching Gurugram, medical coaching Gurugram',
  openGraph: {
    title: 'Best NEET Coaching in Gurugram | DLF, Golf Course Road | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Gurugram with 98% success rate. AIIMS faculty, small batches. Join 620+ students from DLF, Golf Course Road, Sector 51.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Gurugram | Cerebrum Biology Academy',
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
    </>
  )
}
