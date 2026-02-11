import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Kanpur | Civil Lines, Swaroop Nagar | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Kanpur for UP students. GSVM-focused preparation! 98% success rate, AIIMS faculty. Civil Lines, Swaroop Nagar, Kakadeo, Kidwai Nagar. 3,200+ students. Book free demo!',
  keywords:
    'NEET coaching Kanpur, NEET biology coaching Kanpur, best NEET coaching Civil Lines, NEET classes Swaroop Nagar, biology coaching Kakadeo, NEET tuition Kidwai Nagar, NEET coaching Govind Nagar, NEET preparation UP, online NEET coaching Kanpur, NEET coaching Harsh Nagar, NEET coaching Nawabganj, NEET biology Kanpur, UP Board NEET prep, GSVM preparation, biology tuition Kanpur, biology classes Kanpur, online biology coaching Kanpur, biology teacher Kanpur, NEET biology Kanpur',
  openGraph: {
    title: 'Best NEET Coaching in Kanpur | Uttar Pradesh | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Kanpur with 98% success rate. GSVM-focused preparation! AIIMS faculty, small batches. Join 3,200+ UP students from Civil Lines, Swaroop Nagar.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kanpur',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Kanpur | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Kanpur. GSVM-focused! 98% success rate. Civil Lines, Swaroop Nagar, Kakadeo, Kidwai Nagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kanpur',
  },
}

export default function KanpurCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
