import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Jalandhar 2026 | Doaba Region',
  description:
    'Top NEET coaching for Jalandhar students. 98% success rate. Online classes from AIIMS faculty. Serving Model Town, Urban Estate, Maqsudan, Nakodar Road. Join 600+ successful students.',
  keywords:
    'NEET coaching Jalandhar, best NEET coaching Jalandhar Punjab, NEET preparation Jalandhar, NEET classes Model Town Jalandhar, biology coaching Jalandhar, medical entrance Jalandhar, NEET 2026 Jalandhar, online NEET coaching Doaba, biology tuition Jalandhar, biology classes Jalandhar, online biology coaching Jalandhar, NEET biology Jalandhar, biology teacher Jalandhar',
  openGraph: {
    title: 'Best NEET Coaching in Jalandhar 2026',
    description:
      'Join the most trusted NEET coaching for Jalandhar. Online classes from AIIMS-trained faculty. 98% success rate. Doaba region students excel with us.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-jalandhar',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Jalandhar',
    description: 'Top NEET biology coaching in Jalandhar, Punjab. 98% success rate. Model Town, BMC Chowk.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-jalandhar',
  },
  other: {
    'geo.region': 'IN-PB',
    'geo.placename': 'Jalandhar',
  },
}

export default function JalandharLayout({ children }: { children: React.ReactNode }) {
  return children
}
