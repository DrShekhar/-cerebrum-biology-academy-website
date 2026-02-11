import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Agra | Tajganj, Civil Lines, Kamla Nagar | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Agra for UP students. SN Medical College focused preparation! 98% success rate, AIIMS faculty. Tajganj, Civil Lines, Kamla Nagar, Sikandra, Dayalbagh. 2,500+ students. Book free demo!',
  keywords:
    'NEET coaching Agra, NEET biology coaching Agra, best NEET coaching Tajganj, NEET classes Civil Lines Agra, biology coaching Kamla Nagar, NEET tuition Sikandra, NEET coaching Dayalbagh, NEET preparation UP, online NEET coaching Agra, NEET coaching Taj City, NEET biology Agra, UP Board NEET prep, SN Medical College preparation, biology tuition Agra, biology classes Agra, online biology coaching Agra, biology teacher Agra, NEET biology Agra',
  openGraph: {
    title: 'Best NEET Coaching in Agra | Uttar Pradesh | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Agra with 98% success rate. SN Medical College focused preparation! AIIMS faculty, small batches. Join 2,500+ UP students from Tajganj, Civil Lines.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-agra',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Agra | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Agra. SN Medical College focused! 98% success rate. Tajganj, Civil Lines, Kamla Nagar, Sikandra.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-agra',
  },
}

export default function AgraCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
