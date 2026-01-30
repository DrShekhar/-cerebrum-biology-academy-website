import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Shimla 2026 | Hill Capital | Cerebrum Academy',
  description:
    'Top NEET coaching for Shimla students. 94.2% success rate. Online classes from AIIMS faculty. Serving Mall Road, Lakkar Bazaar, Sanjauli, Kufri. Prepare for IGMC Shimla from home.',
  keywords:
    'NEET coaching Shimla, best NEET coaching Shimla Himachal, NEET preparation Shimla, NEET classes IGMC Shimla, biology coaching Shimla, medical entrance Himachal Pradesh, NEET 2026 Shimla, online NEET coaching Himachal, biology tuition Shimla, biology classes Shimla, online biology coaching Shimla, NEET biology Shimla, biology teacher Shimla',
  openGraph: {
    title: 'Best NEET Coaching in Shimla 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Shimla. Online classes from AIIMS-trained faculty. 94.2% success rate. HP capital students excel with us. IGMC Shimla preparation.',
    url: 'https://cerebrumacademy.in/neet-coaching-shimla',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumacademy.in/neet-coaching-shimla',
  },
  other: {
    'geo.region': 'IN-HP',
    'geo.placename': 'Shimla',
  },
}

export default function ShimlaLayout({ children }: { children: React.ReactNode }) {
  return children
}
