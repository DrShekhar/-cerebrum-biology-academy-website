import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Prayagraj | Civil Lines, Tagore Town | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Prayagraj (Allahabad) for UP students. MLN Medical College focused! 98% success rate, AIIMS faculty. Civil Lines, Tagore Town, George Town, Katra. 2,800+ students. Book free demo!',
  keywords:
    'NEET coaching Prayagraj, NEET biology coaching Prayagraj, best NEET coaching Civil Lines Prayagraj, NEET classes Tagore Town, biology coaching George Town, NEET tuition Katra, NEET coaching Allahpur, NEET preparation UP, online NEET coaching Prayagraj, NEET coaching Allahabad, NEET biology Prayagraj, UP Board NEET prep, MLN Medical College preparation, biology tuition Prayagraj, biology classes Prayagraj, online biology coaching Prayagraj, biology teacher Prayagraj, NEET biology Prayagraj',
  openGraph: {
    title: 'Best NEET Coaching in Prayagraj | Uttar Pradesh | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Prayagraj with 98% success rate. MLN Medical College focused! AIIMS faculty, small batches. Join 2,800+ UP students from Civil Lines, Tagore Town.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-prayagraj',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Prayagraj | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Prayagraj. MLN focused! 98% success rate. Civil Lines, Tagore Town, George Town, Katra.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-prayagraj',
  },
}

export default function PrayagrajCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
