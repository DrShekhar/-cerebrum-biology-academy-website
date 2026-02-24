import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Central Delhi | NEET Coaching',
  description:
    'Best Biology tutor in Central Delhi for NEET & Board exams. Expert coaching in Connaught Place, Karol Bagh, Rajender Nagar, Patel Nagar. AIIMS faculty guidance.',
  keywords: [
    'biology tutor central delhi',
    'neet coaching central delhi',
    'biology classes connaught place',
    'biology tuition karol bagh',
    'neet tutor rajender nagar',
    'biology coaching patel nagar',
    'neet classes central delhi',
    'biology teacher central delhi',
    'neet preparation central delhi',
    'best biology coaching central delhi',
  ],
  openGraph: {
    title: 'Biology Tutor in Central Delhi | NEET Coaching',
    description:
      'Best Biology tutor in Central Delhi for NEET & Board exams. Expert coaching in Connaught Place, Karol Bagh, Rajender Nagar.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-central-delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Central Delhi',
    description: 'Expert NEET Biology coaching in Central Delhi localities.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-central-delhi',
  },
}

export default function BiologyTutorCentralDelhiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
