import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Shimla 2026 | Hill Capital',
  description:
    'Top NEET coaching for Shimla students. 98% success rate. Online classes from AIIMS faculty. Serving Mall Road, Lakkar Bazaar, Sanjauli, Kufri. Prepare for IGMC Shimla from home.',
  keywords:
    'NEET coaching Shimla, best NEET coaching Shimla Himachal, NEET preparation Shimla, NEET classes IGMC Shimla, biology coaching Shimla, medical entrance Himachal Pradesh, NEET 2026 Shimla, online NEET coaching Himachal, biology tuition Shimla, biology classes Shimla, online biology coaching Shimla, NEET biology Shimla, biology teacher Shimla',
  openGraph: {
    title: 'Best NEET Coaching in Shimla 2026',
    description:
      'Join the most trusted NEET coaching for Shimla. Online classes from AIIMS-trained faculty. 98% success rate. HP capital students excel with us. IGMC Shimla preparation.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-shimla',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Shimla 2026 | Hill Capital',
    description: 'Top NEET coaching for Shimla students. 98% success rate. Online classes from AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-shimla',
  },
  other: {
    'geo.region': 'IN-HP',
    'geo.placename': 'Shimla',
  },
}

export default function ShimlaLayout({ children }: { children: React.ReactNode }) {
  return children
}
