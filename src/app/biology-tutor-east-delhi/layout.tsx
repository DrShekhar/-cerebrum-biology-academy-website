import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in East Delhi | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in East Delhi for NEET & Board exams. Expert coaching in Preet Vihar, Laxmi Nagar, Mayur Vihar, Patparganj, Shahdara. AIIMS faculty guidance.',
  keywords: [
    'biology tutor east delhi',
    'neet coaching east delhi',
    'biology classes preet vihar',
    'biology tuition laxmi nagar',
    'neet tutor mayur vihar',
    'biology coaching patparganj',
    'neet classes shahdara',
    'biology teacher east delhi',
    'neet preparation east delhi',
    'best biology coaching east delhi',
  ],
  openGraph: {
    title: 'Biology Tutor in East Delhi | NEET Coaching',
    description:
      'Best Biology tutor in East Delhi for NEET & Board exams. Expert coaching in Preet Vihar, Laxmi Nagar, Mayur Vihar.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-east-delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in East Delhi | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in East Delhi localities.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-east-delhi',
  },
}

export default function BiologyTutorEastDelhiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
