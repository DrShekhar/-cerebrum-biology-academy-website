import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Mandi 2026 | Sadar District | Cerebrum Academy',
  description:
    'Top NEET coaching for Mandi & Sundernagar students. 94.2% success rate. Online classes from AIIMS faculty. Serving Mandi town, Sundernagar, Nerchowk, Pandoh. Prepare for SLBSGMC from home.',
  keywords:
    'NEET coaching Mandi, best NEET coaching Mandi Himachal, NEET preparation Mandi, NEET classes SLBSGMC Nerchowk, biology coaching Mandi, medical entrance Himachal Pradesh, NEET 2026 Mandi, online NEET coaching Mandi, Sundernagar NEET coaching',
  openGraph: {
    title: 'Best NEET Coaching in Mandi 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Mandi. Online classes from AIIMS-trained faculty. 94.2% success rate. SLBSGMC Nerchowk preparation from home.',
    url: 'https://cerebrumacademy.in/neet-coaching-mandi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumacademy.in/neet-coaching-mandi',
  },
  other: {
    'geo.region': 'IN-HP',
    'geo.placename': 'Mandi',
  },
}

export default function MandiLayout({ children }: { children: React.ReactNode }) {
  return children
}
