import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Hamirpur 2026 | Education Hub HP',
  description:
    'Top NEET coaching for Hamirpur students. 98% success rate. Online classes from AIIMS faculty. HP\'s education hub with 59+ coaching institutes. Prepare for DRGMC Kangra from home.',
  keywords:
    'NEET coaching Hamirpur, best NEET coaching Hamirpur Himachal, NEET preparation Hamirpur HP, NEET classes Hamirpur, biology coaching Hamirpur, medical entrance Himachal, NEET 2026 Hamirpur, online NEET coaching Hamirpur, DRGMC Kangra preparation',
  openGraph: {
    title: 'Best NEET Coaching in Hamirpur 2026',
    description:
      'Join the most trusted NEET coaching for Hamirpur - HP\'s education hub. Online classes from AIIMS-trained faculty. 98% success rate. Excel beyond local coaching.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-hamirpur',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Hamirpur 2026 | Education Hub HP',
    description: 'Top NEET coaching for Hamirpur students. 98% success rate. Online classes from AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-hamirpur',
  },
  other: {
    'geo.region': 'IN-HP',
    'geo.placename': 'Hamirpur',
  },
}

export default function HamirpurLayout({ children }: { children: React.ReactNode }) {
  return children
}
