import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in South Delhi | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in South Delhi for NEET & Board exams. Expert coaching in GK-1, GK-2, Hauz Khas, Malviya Nagar, Saket, Vasant Kunj. AIIMS faculty guidance.',
  keywords: [
    'biology tutor south delhi',
    'neet coaching south delhi',
    'biology classes gk-1',
    'biology tuition hauz khas',
    'neet tutor malviya nagar',
    'biology coaching saket',
    'neet classes vasant kunj',
    'biology teacher south delhi',
    'neet preparation south delhi',
    'best biology coaching south delhi',
  ],
  openGraph: {
    title: 'Biology Tutor in South Delhi | NEET Coaching',
    description:
      'Best Biology tutor in South Delhi for NEET & Board exams. Expert coaching in GK-1, GK-2, Hauz Khas, Malviya Nagar.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-south-delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in South Delhi | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in South Delhi localities.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-south-delhi',
  },
}

export default function BiologyTutorSouthDelhiLayout({ children }: { children: React.ReactNode }) {
  return children
}
