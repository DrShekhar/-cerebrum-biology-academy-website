import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Vasant Kunj | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Vasant Kunj for NEET & Board exams. Expert coaching for Vasant Kunj, Vasant Vihar, RK Puram. AIIMS faculty guidance. Online classes available.',
  keywords: [
    'biology tutor vasant kunj',
    'neet coaching vasant kunj',
    'biology classes vasant kunj',
    'biology tuition vasant kunj delhi',
    'neet tutor vasant kunj',
    'biology coaching vasant kunj',
    'neet classes vasant kunj',
    'biology teacher vasant kunj',
    'neet preparation vasant kunj',
    'best biology coaching vasant kunj',
  ],
  openGraph: {
    title: 'Biology Tutor in Vasant Kunj | NEET Coaching',
    description:
      'Best Biology tutor in Vasant Kunj for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-vasant-kunj',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Vasant Kunj | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Vasant Kunj Delhi.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-vasant-kunj',
  },
}

export default function BiologyTutorVasantKunjLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
