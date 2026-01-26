import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in North Delhi | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in North Delhi for NEET & Board exams. Expert coaching in Rohini, Pitampura, Model Town, Civil Lines, Kamla Nagar. AIIMS faculty guidance.',
  keywords: [
    'biology tutor north delhi',
    'neet coaching north delhi',
    'biology classes rohini',
    'biology tuition pitampura',
    'neet tutor model town',
    'biology coaching civil lines',
    'neet classes kamla nagar',
    'biology teacher north delhi',
    'neet preparation north delhi',
    'best biology coaching north delhi',
  ],
  openGraph: {
    title: 'Biology Tutor in North Delhi | NEET Coaching',
    description:
      'Best Biology tutor in North Delhi for NEET & Board exams. Expert coaching in Rohini, Pitampura, Model Town.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-north-delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in North Delhi | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in North Delhi localities.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-north-delhi',
  },
}

export default function BiologyTutorNorthDelhiLayout({ children }: { children: React.ReactNode }) {
  return children
}
