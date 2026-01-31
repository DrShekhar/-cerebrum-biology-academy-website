import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Manali | Mall Road, Old Manali | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Manali for Himachal students. 94.2% success rate, AIIMS faculty. Mall Road, Old Manali, Kullu Valley. Online live classes for hill stations. Book free demo!',
  keywords:
    'NEET coaching Manali, NEET biology coaching Manali, best NEET coaching Mall Road Manali, NEET classes Old Manali, biology coaching Kullu, NEET tuition Manali, NEET coaching Himachal Pradesh, NEET preparation hill station, online NEET coaching Manali, NEET biology Manali, biology tuition Manali, biology classes Manali, online biology coaching Manali, biology teacher Manali, NEET biology Manali',
  openGraph: {
    title: 'Best NEET Coaching in Manali | Himachal Pradesh | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Manali with 94.2% success rate. Online classes for Himachal students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-manali',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Manali | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Manali. 94.2% success rate. Mall Road, Old Manali, Kullu Valley.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-manali',
  },
}

export default function ManaliCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
