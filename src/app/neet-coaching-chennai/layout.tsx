import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Chennai | Biology Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching in Chennai — biology-only specialist serving Adyar, Anna Nagar, T. Nagar, Velachery, OMR, Mylapore, Nungambakkam, Tambaram. AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, Tamil-medium NCERT bridge for state-board students, small batches of 15-20. Schools we serve: PSBB, DAV, Velammal, Chettinad Vidyashram. 98% qualification rate.',
  keywords: [
    'NEET coaching Chennai',
    'best NEET coaching Chennai',
    'biology coaching Chennai',
    'NEET tutor Chennai',
    'NEET biology classes Chennai',
    'NEET coaching Adyar',
    'NEET coaching Anna Nagar',
    'NEET coaching T Nagar',
    'NEET coaching Velachery',
    'NEET coaching OMR',
    'NEET coaching Mylapore',
    'NEET coaching Tambaram',
    'PSBB NEET',
    'DAV Chennai NEET',
    'Velammal NEET',
    'Tamil medium NEET bridge',
    'AIIMS faculty Chennai',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-chennai' },
  openGraph: {
    title: 'NEET Coaching in Chennai | Cerebrum Biology Academy',
    description:
      'Biology-only specialist. AIIMS faculty. 98% qualification. PSBB, DAV, Velammal, Chettinad Vidyashram.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-chennai',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Chennai | Cerebrum',
    description: 'Biology specialist + AIIMS faculty + Tamil-medium bridge.',
  },
  other: { 'article:modified_time': '2026-05-27' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
