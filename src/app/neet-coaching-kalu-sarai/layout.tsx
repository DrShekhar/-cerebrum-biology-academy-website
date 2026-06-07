import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Kalu Sarai | Biology Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching in Kalu Sarai, South Delhi — Hauz Khas adjacent, IIT Delhi neighbourhood. Biology-only specialist, AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, weekly 1:1 doubt slots. Adjacent to Hauz Khas metro and AIIMS Delhi. 98% qualification rate. Online + offline options for South Delhi droppers / repeaters.',
  keywords: [
    'NEET coaching Kalu Sarai',
    'biology coaching Kalu Sarai',
    'NEET tutor Kalu Sarai',
    'best NEET coaching Kalu Sarai',
    'NEET classes Kalu Sarai',
    'NEET coaching South Delhi',
    'NEET coaching Hauz Khas',
    'NEET coaching IIT Delhi area',
    'NEET coaching near AIIMS',
    'AIIMS faculty Kalu Sarai',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kalu-sarai' },
  openGraph: {
    title: 'NEET Coaching in Kalu Sarai | Cerebrum Biology Academy',
    description: 'Biology specialist near IIT Delhi + AIIMS. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kalu-sarai',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Kalu Sarai | Cerebrum',
    description: 'Near IIT Delhi + AIIMS. Biology specialist.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
