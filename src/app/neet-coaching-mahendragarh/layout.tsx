import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Mahendragarh | Narnaul, Rewari',
  description:
    'Top NEET biology coaching in Mahendragarh for Haryana students. 98% success rate, AIIMS faculty. Narnaul, Ateli, Kanina. Online live classes for rural Haryana. Book free demo!',
  keywords:
    'NEET coaching Mahendragarh, NEET biology coaching Mahendragarh, best NEET coaching Narnaul, NEET classes Ateli, biology coaching Kanina, NEET tuition Mahendragarh, NEET coaching South Haryana, NEET preparation Haryana, online NEET coaching Mahendragarh, NEET biology Mahendragarh, biology tuition Mahendragarh, biology classes Mahendragarh, online biology coaching Mahendragarh, biology teacher Mahendragarh, NEET biology Mahendragarh',
  openGraph: {
    title: 'Best NEET Coaching in Mahendragarh | Haryana',
    description:
      'Top NEET biology coaching in Mahendragarh with 98% success rate. AIIMS faculty. Online classes for rural Haryana.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mahendragarh',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Mahendragarh',
    description:
      'Top NEET biology coaching in Mahendragarh. 98% success rate. Narnaul, Ateli, Kanina.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mahendragarh',
  },
}

export default function MahendragarhCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
