import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Dharamshala 2026 | Kangra District | Cerebrum Academy',
  description:
    'Top NEET coaching for Dharamshala & Kangra students. 98% success rate. Online classes from AIIMS faculty. Prepare for RPGMC Tanda from home. Serving McLeodGanj, Palampur, Kangra town.',
  keywords:
    'NEET coaching Dharamshala, best NEET coaching Kangra, NEET preparation Dharamshala HP, NEET classes McLeodGanj, RPGMC Tanda preparation, biology coaching Kangra, NEET 2026 Dharamshala, online NEET coaching Himachal',
  openGraph: {
    title: 'Best NEET Coaching in Dharamshala 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Dharamshala & Kangra district. Online classes from AIIMS faculty. 98% success rate. RPGMC Tanda preparation.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dharamshala',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Dharamshala 2026 | Kangra District | Cerebrum Academy',
    description: 'Top NEET coaching for Dharamshala & Kangra students. 98% success rate. Online classes from AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dharamshala',
  },
  other: {
    'geo.region': 'IN-HP',
    'geo.placename': 'Dharamshala',
  },
}

export default function DharamshalaLayout({ children }: { children: React.ReactNode }) {
  return children
}
