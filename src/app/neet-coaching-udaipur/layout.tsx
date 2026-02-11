import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Udaipur | Hiran Magri, Fateh Sagar | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Udaipur for Rajasthan students. RNT Medical College focused! 98% success rate, AIIMS faculty. Hiran Magri, Fateh Sagar, Chetak Circle. 1,600+ students. Book free demo!',
  keywords:
    'NEET coaching Udaipur, NEET biology coaching Udaipur, best NEET coaching Hiran Magri, NEET classes Fateh Sagar, biology coaching Chetak Circle, NEET tuition Udaipur, NEET coaching Sector 14, NEET preparation Rajasthan, online NEET coaching Udaipur, RNT Medical College preparation, NEET biology Udaipur, biology tuition Udaipur, biology classes Udaipur, online biology coaching Udaipur, biology teacher Udaipur, NEET biology Udaipur',
  openGraph: {
    title: 'Best NEET Coaching in Udaipur | Rajasthan | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Udaipur with 98% success rate. RNT Medical College focused! AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-udaipur',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Udaipur | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Udaipur. RNT focused! 98% success rate. Hiran Magri, Fateh Sagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-udaipur',
  },
}

export default function UdaipurCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
