import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Ranchi | Main Road, Lalpur | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Ranchi for Jharkhand students. RIMS Ranchi focused! 98% success rate, AIIMS faculty. Main Road, Lalpur, Doranda. 2,000+ students. Book free demo!',
  keywords:
    'NEET coaching Ranchi, NEET biology coaching Ranchi, best NEET coaching Main Road, NEET classes Lalpur, biology coaching Doranda, NEET tuition Ranchi, NEET coaching Morabadi, NEET preparation Jharkhand, online NEET coaching Ranchi, RIMS Ranchi preparation, NEET biology Ranchi, biology tuition Ranchi, biology classes Ranchi, online biology coaching Ranchi, biology teacher Ranchi, NEET biology Ranchi',
  openGraph: {
    title: 'Best NEET Coaching in Ranchi | Jharkhand | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Ranchi with 98% success rate. RIMS Ranchi focused! AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ranchi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Ranchi | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Ranchi. RIMS focused! 98% success rate. Main Road, Lalpur, Doranda.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ranchi',
  },
}

export default function RanchiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
