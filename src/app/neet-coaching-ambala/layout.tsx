import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Ambala 2026 | Cantonment & City | Cerebrum Academy',
  description:
    'Top NEET coaching for Ambala students. 98% success rate. Online classes from AIIMS faculty. Serving Ambala Cantt, Ambala City, Barara, Shahzadpur. Join 1,50,000+ successful students.',
  keywords:
    'NEET coaching Ambala, best NEET coaching Ambala Haryana, NEET preparation Ambala Cantt, NEET classes Ambala City, biology coaching Ambala, medical entrance Ambala, NEET 2026 Ambala, online NEET coaching Ambala, biology tuition Ambala, biology classes Ambala, online biology coaching Ambala, NEET biology Ambala, biology teacher Ambala',
  openGraph: {
    title: 'Best NEET Coaching in Ambala 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Ambala. Online classes from AIIMS-trained faculty. 98% success rate. Affordable fees with proven results.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ambala',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Ambala 2026 | Cantonment & City | Cerebrum Academy',
    description: 'Top NEET coaching for Ambala students. 98% success rate. Online classes from AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ambala',
  },
  other: {
    'geo.region': 'IN-HR',
    'geo.placename': 'Ambala',
  },
}

export default function AmbalaLayout({ children }: { children: React.ReactNode }) {
  return children
}
