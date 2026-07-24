import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Pune | Biology Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching in Pune — biology-only specialist serving Koregaon Park, Aundh, Baner, Kothrud, Viman Nagar, Hadapsar, Kharadi, Wakad, Pimpri-Chinchwad. AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, Marathi-medium NCERT bridge for state-board students, small batches of 15-20. Schools we serve: Symbiosis School, Mercedes-Benz International, Pawar Public School. 98% qualification rate.',
  keywords: [
    'NEET coaching Pune',
    'best NEET coaching Pune',
    'biology coaching Pune',
    'NEET tutor Pune',
    'NEET biology classes Pune',
    'NEET coaching Koregaon Park',
    'NEET coaching Aundh',
    'NEET coaching Baner',
    'NEET coaching Kothrud',
    'NEET coaching Viman Nagar',
    'NEET coaching Hadapsar',
    'NEET coaching Kharadi',
    'NEET coaching Wakad',
    'NEET coaching Pimpri Chinchwad',
    'Symbiosis School NEET',
    'Mercedes Benz International NEET',
    'Marathi medium NEET bridge',
    'AIIMS faculty Pune',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pune' },
  openGraph: {
    title: 'NEET Coaching in Pune | Cerebrum Biology Academy',
    description:
      'Biology-only specialist. AIIMS faculty. 98% qualification. Koregaon Park, Baner, Kothrud, Kharadi.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pune',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Pune | Cerebrum',
    description: 'Biology specialist + AIIMS faculty + Marathi-medium bridge.',
  },
  other: { 'article:modified_time': '2026-05-27' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
