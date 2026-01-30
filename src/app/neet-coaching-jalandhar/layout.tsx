import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Jalandhar 2026 | Doaba Region | Cerebrum Academy',
  description:
    'Top NEET coaching for Jalandhar students. 94.2% success rate. Online classes from AIIMS faculty. Serving Model Town, Urban Estate, Maqsudan, Nakodar Road. Join 600+ successful students.',
  keywords:
    'NEET coaching Jalandhar, best NEET coaching Jalandhar Punjab, NEET preparation Jalandhar, NEET classes Model Town Jalandhar, biology coaching Jalandhar, medical entrance Jalandhar, NEET 2026 Jalandhar, online NEET coaching Doaba, biology tuition Jalandhar, biology classes Jalandhar, online biology coaching Jalandhar, NEET biology Jalandhar, biology teacher Jalandhar',
  openGraph: {
    title: 'Best NEET Coaching in Jalandhar 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Jalandhar. Online classes from AIIMS-trained faculty. 94.2% success rate. Doaba region students excel with us.',
    url: 'https://cerebrumacademy.in/neet-coaching-jalandhar',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumacademy.in/neet-coaching-jalandhar',
  },
  other: {
    'geo.region': 'IN-PB',
    'geo.placename': 'Jalandhar',
  },
}

export default function JalandharLayout({ children }: { children: React.ReactNode }) {
  return children
}
