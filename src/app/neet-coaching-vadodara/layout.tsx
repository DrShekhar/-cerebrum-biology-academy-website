import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Vadodara | Alkapuri, Sayajigunj | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Vadodara for Gujarat students. Medical College Baroda focused! 94.2% success rate, AIIMS faculty. Alkapuri, Sayajigunj, Fatehgunj. 2,000+ students. Book free demo!',
  keywords:
    'NEET coaching Vadodara, NEET biology coaching Vadodara, best NEET coaching Alkapuri, NEET classes Sayajigunj, biology coaching Fatehgunj, NEET tuition Baroda, NEET coaching Manjalpur, NEET preparation Gujarat, online NEET coaching Vadodara, Medical College Baroda preparation, NEET biology Vadodara, biology tuition Vadodara, biology classes Vadodara, online biology coaching Vadodara, biology teacher Vadodara, NEET biology Vadodara',
  openGraph: {
    title: 'Best NEET Coaching in Vadodara | Gujarat | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Vadodara with 94.2% success rate. Medical College Baroda focused! AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vadodara',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Vadodara | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Vadodara. 94.2% success rate. Alkapuri, Sayajigunj, Fatehgunj.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vadodara',
  },
}

export default function VadodaraCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
