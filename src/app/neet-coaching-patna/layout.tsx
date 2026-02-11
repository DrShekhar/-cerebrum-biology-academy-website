import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Patna | Boring Road, Kankarbagh | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Patna for Bihar students. No Kota migration needed! 98% success rate, AIIMS faculty. Boring Road, Kankarbagh, Patliputra Colony. 3,000+ students. Book free demo!',
  keywords:
    'NEET coaching Patna, NEET biology coaching Patna, best NEET coaching Boring Road, NEET classes Kankarbagh, biology coaching Patliputra Colony, NEET tuition Rajendra Nagar, NEET coaching Bailey Road, NEET preparation Bihar, online NEET coaching Patna, NEET coaching Ashiana Nagar, NEET coaching Danapur, NEET biology Patna, BSEB NEET prep, PMCH preparation, no Kota migration',
  openGraph: {
    title: 'Best NEET Coaching in Patna | Bihar | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Patna with 98% success rate. No Kota migration needed! AIIMS faculty, small batches. Join 3,000+ Bihar students from Boring Road, Kankarbagh.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-patna',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Patna | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Patna. No Kota migration needed! 98% success rate. Boring Road, Kankarbagh, Patliputra Colony.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-patna',
  },
}

export default function PatnaCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
