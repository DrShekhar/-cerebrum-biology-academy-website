import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Meerut | Sadar, Cantt, Pallavpuram',
  description:
    'Top NEET biology coaching in Meerut for UP students. LLRM Medical College focused preparation! 98% success rate, AIIMS faculty. Sadar Bazaar, Cantt, Pallavpuram, Shastri Nagar. 2,200+ students. Book free demo!',
  keywords:
    'NEET coaching Meerut, NEET biology coaching Meerut, best NEET coaching Sadar Bazaar, NEET classes Cantt Meerut, biology coaching Pallavpuram, NEET tuition Shastri Nagar, NEET coaching Begumpul, NEET preparation UP, online NEET coaching Meerut, NEET coaching Western UP, NEET biology Meerut, UP Board NEET prep, LLRM Medical College preparation, biology tuition Meerut, biology classes Meerut, online biology coaching Meerut, biology teacher Meerut, NEET biology Meerut',
  openGraph: {
    title: 'Best NEET Coaching in Meerut | Uttar Pradesh',
    description:
      'Top NEET biology coaching in Meerut with 98% success rate. LLRM Medical College focused preparation! AIIMS faculty, small batches. Join 2,200+ UP students from Sadar, Cantt.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-meerut',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Meerut',
    description:
      'Top NEET biology coaching in Meerut. LLRM focused! 98% success rate. Sadar Bazaar, Cantt, Pallavpuram, Shastri Nagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-meerut',
  },
}

export default function MeerutCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
