import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching Model Town | Biology Classes Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching in Model Town. Near Rohini DC Chauk center, Yellow Line metro access. AIIMS faculty, 98% success rate. WhatsApp 88264-44334!',
  keywords: [
    'NEET coaching Model Town',
    'biology classes Model Town',
    'biology tuition Model Town',
    'NEET preparation Model Town',
    'best biology coaching Model Town',
    'NEET classes Model Town Delhi',
    'medical entrance coaching Model Town',
    'biology teacher Model Town',
  ],
  openGraph: {
    title: 'NEET Coaching Model Town | Biology Classes Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching in Model Town. Near Rohini DC Chauk center, Yellow Line metro access. AIIMS faculty, 98% success rate. WhatsApp 88264-44334!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-model-town',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Model Town | Biology Classes Delhi',
    description:
      'Best NEET coaching in Model Town. AIIMS faculty, 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-model-town',
  },
}

export default function NEETCoachingModelTownLayout({ children }: { children: React.ReactNode }) {
  return children
}
