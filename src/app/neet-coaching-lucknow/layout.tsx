import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Lucknow | Gomti Nagar, Hazratganj | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Lucknow for UP students. KGMU-focused preparation! 98% success rate, AIIMS faculty. Gomti Nagar, Hazratganj, Aliganj, Indira Nagar. 4,500+ students. Book free demo!',
  keywords:
    'NEET coaching Lucknow, NEET biology coaching Lucknow, best NEET coaching Gomti Nagar, NEET classes Hazratganj, biology coaching Aliganj, NEET tuition Indira Nagar, NEET coaching Rajajipuram, NEET preparation UP, online NEET coaching Lucknow, NEET coaching Jankipuram, NEET coaching Alambagh, NEET biology Lucknow, UP Board NEET prep, KGMU preparation',
  openGraph: {
    title: 'Best NEET Coaching in Lucknow | Uttar Pradesh | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Lucknow with 98% success rate. KGMU-focused preparation! AIIMS faculty, small batches. Join 4,500+ UP students from Gomti Nagar, Hazratganj.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-lucknow',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Lucknow | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Lucknow. KGMU-focused! 98% success rate. Gomti Nagar, Hazratganj, Aliganj, Indira Nagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-lucknow',
  },
}

export default function LucknowCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
