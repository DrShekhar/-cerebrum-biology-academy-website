import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching Prashant Vihar | Biology Classes Rohini | Cerebrum Academy',
  description:
    'Best NEET coaching for Prashant Vihar students. Near Rohini DC Chauk center. AIIMS faculty, 98% success. WhatsApp 88264-44334',
  keywords: [
    'NEET coaching Prashant Vihar',
    'biology classes Prashant Vihar',
    'biology tuition Prashant Vihar',
    'NEET preparation Prashant Vihar',
    'DC Chauk biology coaching',
    'AIIMS trained faculty',
    'biology coaching Delhi',
    'medical entrance coaching',
    'NEET biology classes',
  ],
  openGraph: {
    title: 'NEET Coaching Prashant Vihar | Biology Classes Rohini | Cerebrum Academy',
    description:
      'Best NEET coaching for Prashant Vihar students. Near Rohini DC Chauk center. AIIMS faculty, 98% success.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-prashant-vihar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Prashant Vihar | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Prashant Vihar Delhi.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-prashant-vihar',
  },
}

export default function NEETCoachingPrashantViharLayout({ children }: { children: React.ReactNode }) {
  return children
}
