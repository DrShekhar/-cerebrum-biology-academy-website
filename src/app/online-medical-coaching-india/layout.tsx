import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Medical Coaching India | NEET, MBBS Entrance, Biology | Cerebrum',
  description:
    'Online medical coaching India — NEET-UG biology specialist for MBBS entrance preparation. AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, 98% qualification rate, NRI quota guidance for AIIMS / JIPMER / MAMC / Manipal / KMC Mangalore. Live online classes, mock tests, performance analytics. Class 11, 12, dropper, repeater batches.',
  keywords: [
    'online medical coaching India',
    'online MBBS entrance coaching',
    'NEET medical coaching online',
    'medical entrance coaching India',
    'MBBS coaching online India',
    'best online medical coaching',
    'NRI medical coaching online',
    'AIIMS coaching online',
    'JIPMER coaching online',
    'medical entrance biology online',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/online-medical-coaching-india' },
  openGraph: {
    title: 'Online Medical Coaching India | Cerebrum Biology Academy',
    description: 'NEET-UG biology specialist for MBBS entrance. AIIMS faculty, 98% qualification.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-medical-coaching-india',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Online Medical Coaching India | Cerebrum',
    description: 'NEET-UG biology + MBBS entrance specialist.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
