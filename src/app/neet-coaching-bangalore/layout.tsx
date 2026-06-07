import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Bangalore | Biology Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching in Bangalore — biology-only specialist serving Indiranagar, Koramangala, HSR Layout, Whitefield, Electronic City, Marathahalli, Sarjapur, Jayanagar. AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, small batches of 15-20, weekly 1:1 doubt slots. Feeder schools: NPS Indiranagar, DPS Bangalore, Inventure Academy. 98% qualification rate.',
  keywords: [
    'NEET coaching Bangalore',
    'NEET coaching Bengaluru',
    'best NEET coaching Bangalore',
    'biology coaching Bangalore',
    'NEET tutor Bangalore',
    'NEET biology classes Bangalore',
    'NEET coaching Indiranagar',
    'NEET coaching Koramangala',
    'NEET coaching HSR Layout',
    'NEET coaching Whitefield',
    'NEET coaching Electronic City',
    'NEET coaching Jayanagar',
    'NPS Indiranagar NEET',
    'DPS Bangalore NEET',
    'Inventure Academy NEET',
    'AIIMS faculty Bangalore',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-bangalore' },
  openGraph: {
    title: 'NEET Coaching in Bangalore | Cerebrum Biology Academy',
    description:
      'Biology-only specialist. AIIMS faculty. 98% qualification. Indiranagar, Koramangala, Whitefield.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-bangalore',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Bangalore | Cerebrum',
    description: 'Biology specialist + AIIMS faculty across Bangalore.',
  },
  other: { 'article:modified_time': '2026-05-27' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
