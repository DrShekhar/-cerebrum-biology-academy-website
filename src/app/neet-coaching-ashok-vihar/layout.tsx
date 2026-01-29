import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching Ashok Vihar | Biology Classes North Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching near Ashok Vihar. Rohini DC Chauk center 6-8km away. AIIMS faculty, 98% success. WhatsApp 88264-44334',
  keywords: [
    'NEET coaching Ashok Vihar',
    'biology classes Ashok Vihar',
    'biology tuition North Delhi',
  ],
  openGraph: {
    title: 'NEET Coaching Ashok Vihar | Biology Classes North Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching near Ashok Vihar. Rohini DC Chauk center 6-8km away. AIIMS faculty, 98% success. WhatsApp 88264-44334',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ashok-vihar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Ashok Vihar | Cerebrum Academy',
    description: 'Best NEET coaching near Ashok Vihar. AIIMS faculty, 98% success.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ashok-vihar',
  },
}

export default function NEETCoachingAshokViharLayout({ children }: { children: React.ReactNode }) {
  return children
}
