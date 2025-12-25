import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in West Delhi | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in West Delhi for NEET & Board exams. Expert coaching in Janakpuri, Dwarka, Rajouri Garden, Paschim Vihar, Tilak Nagar. AIIMS faculty guidance.',
  keywords: [
    'biology tutor west delhi',
    'neet coaching west delhi',
    'biology classes janakpuri',
    'biology tuition dwarka',
    'neet tutor rajouri garden',
    'biology coaching paschim vihar',
    'neet classes tilak nagar',
    'biology teacher west delhi',
    'neet preparation west delhi',
    'best biology coaching west delhi',
  ],
  openGraph: {
    title: 'Biology Tutor in West Delhi | NEET Coaching',
    description:
      'Best Biology tutor in West Delhi for NEET & Board exams. Expert coaching in Janakpuri, Dwarka, Rajouri Garden.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-west-delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in West Delhi | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in West Delhi localities.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-west-delhi',
  },
}

export default function BiologyTutorWestDelhiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
