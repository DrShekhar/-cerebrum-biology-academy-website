import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Jodhpur | Ratanada, Sardarpura',
  description:
    'Top NEET biology coaching in Jodhpur for Rajasthan students. AIIMS Jodhpur focused! 98% success rate. Ratanada, Sardarpura, Paota. 2,200+ students. Book free demo!',
  keywords:
    'NEET coaching Jodhpur, NEET biology coaching Jodhpur, best NEET coaching Ratanada, NEET classes Sardarpura, biology coaching Paota, NEET tuition Jodhpur, NEET coaching Shastri Nagar, NEET preparation Rajasthan, online NEET coaching Jodhpur, AIIMS Jodhpur preparation, NEET biology Jodhpur, biology tuition Jodhpur, biology classes Jodhpur, online biology coaching Jodhpur, biology teacher Jodhpur, NEET biology Jodhpur',
  openGraph: {
    title: 'Best NEET Coaching in Jodhpur | Rajasthan',
    description:
      'Top NEET biology coaching in Jodhpur with 98% success rate. AIIMS Jodhpur focused! Small batches.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-jodhpur',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Jodhpur',
    description:
      'Top NEET biology coaching in Jodhpur. AIIMS Jodhpur focused! 98% success rate. Ratanada, Sardarpura.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-jodhpur',
  },
}

export default function JodhpurCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
