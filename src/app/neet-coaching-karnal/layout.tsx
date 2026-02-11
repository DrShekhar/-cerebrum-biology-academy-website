import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Karnal 2026 | KCGMC City | Cerebrum Academy',
  description:
    'Top NEET coaching for Karnal students. 98% success rate. Online classes from AIIMS faculty. Serving Model Town, Sector 12, NDRI Area, Kunjpura. Join 350+ successful students.',
  keywords:
    'NEET coaching Karnal, best NEET coaching Karnal Haryana, NEET preparation Karnal, NEET classes KCGMC Karnal, biology coaching Karnal, medical entrance Karnal, NEET 2026 Karnal, online NEET coaching Haryana, biology tuition Karnal, biology classes Karnal, online biology coaching Karnal, NEET biology Karnal, biology teacher Karnal',
  openGraph: {
    title: 'Best NEET Coaching in Karnal 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Karnal. Online classes from AIIMS-trained faculty. 98% success rate. KCGMC city students excel with us.',
    url: 'https://cerebrumacademy.in/neet-coaching-karnal',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumacademy.in/neet-coaching-karnal',
  },
  other: {
    'geo.region': 'IN-HR',
    'geo.placename': 'Karnal',
  },
}

export default function KarnalLayout({ children }: { children: React.ReactNode }) {
  return children
}
