import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Ludhiana 2026 | Punjab #1 City | Cerebrum Academy',
  description:
    'Top NEET coaching for Ludhiana students. 98% success rate. Online classes from AIIMS faculty. Serving Model Town, Civil Lines, Sarabha Nagar, Dugri. Join 800+ successful Punjab students.',
  keywords:
    'NEET coaching Ludhiana, best NEET coaching Ludhiana Punjab, NEET preparation Ludhiana, NEET classes Model Town Ludhiana, biology coaching Ludhiana, medical entrance Ludhiana, NEET 2026 Ludhiana, online NEET coaching Punjab, biology tuition Ludhiana, biology classes Ludhiana, online biology coaching Ludhiana, NEET biology Ludhiana, biology teacher Ludhiana',
  openGraph: {
    title: 'Best NEET Coaching in Ludhiana 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Ludhiana. Online classes from AIIMS-trained faculty. 98% success rate. Punjab largest city deserves best preparation.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ludhiana',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Ludhiana | Cerebrum Biology Academy',
    description: 'Top NEET biology coaching in Ludhiana, Punjab. 98% success rate. Model Town, Civil Lines.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ludhiana',
  },
  other: {
    'geo.region': 'IN-PB',
    'geo.placename': 'Ludhiana',
  },
}

export default function LudhianaLayout({ children }: { children: React.ReactNode }) {
  return children
}
