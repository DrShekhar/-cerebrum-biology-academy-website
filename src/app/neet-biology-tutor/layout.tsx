import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Tutor | Expert NEET Coaching by AIIMS Faculty | Cerebrum Academy',
  description:
    'Join the best NEET Biology tutor - Dr. Shekhar C Singh, AIIMS Alumnus with 98% success rate. Expert NEET Biology coaching with proven results. 5000+ students trained.',
  keywords: [
    'neet biology tutor',
    'neet biology teacher',
    'best neet biology tutor',
    'neet biology coaching',
    'neet biology faculty',
    'AIIMS biology tutor',
    'neet biology expert',
    'neet biology classes',
    'biology tutor for neet',
    'private tutor for neet biology',
  ],
  openGraph: {
    title: 'NEET Biology Tutor | Expert NEET Coaching by AIIMS Faculty',
    description:
      'Join the best NEET Biology tutor - Dr. Shekhar C Singh, AIIMS Alumnus with 98% success rate. Expert NEET Biology coaching.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-tutor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Tutor | AIIMS Faculty | Cerebrum Academy',
    description: 'Expert NEET Biology coaching by Dr. Shekhar C Singh, AIIMS Alumnus. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-tutor',
  },
}

export default function NEETBiologyTutorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
