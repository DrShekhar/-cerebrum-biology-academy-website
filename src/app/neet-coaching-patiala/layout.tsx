import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Patiala 2026 | Royal City | Cerebrum Academy',
  description:
    'Top NEET coaching for Patiala students. 98% success rate. Online classes from AIIMS faculty. Serving Model Town, Leela Bhawan, Urban Estate, Tripuri. Join 450+ successful students.',
  keywords:
    'NEET coaching Patiala, best NEET coaching Patiala Punjab, NEET preparation Patiala, NEET classes GMC Patiala, biology coaching Patiala, medical entrance Patiala, NEET 2026 Patiala, online NEET coaching Patiala, biology tuition Patiala, biology classes Patiala, online biology coaching Patiala, NEET biology Patiala, biology teacher Patiala',
  openGraph: {
    title: 'Best NEET Coaching in Patiala 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Patiala. Online classes from AIIMS-trained faculty. 98% success rate. Royal City students excel with us.',
    url: 'https://cerebrumacademy.in/neet-coaching-patiala',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumacademy.in/neet-coaching-patiala',
  },
  other: {
    'geo.region': 'IN-PB',
    'geo.placename': 'Patiala',
  },
}

export default function PatialaLayout({ children }: { children: React.ReactNode }) {
  return children
}
