import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Noida | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Noida for NEET & Board exams. Expert coaching for Noida sectors, Greater Noida. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor noida',
    'neet coaching noida',
    'biology classes noida',
    'biology tuition noida',
    'neet tutor noida',
    'biology coaching noida',
    'neet classes noida',
    'biology teacher noida',
    'neet preparation noida',
    'best biology coaching noida',
    'biology tutor noida sector 62',
    'neet coaching greater noida',
  ],
  openGraph: {
    title: 'Biology Tutor in Noida | NEET Coaching',
    description:
      'Best Biology tutor in Noida for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-noida',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Noida | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Noida.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-noida',
  },
}

export default function BiologyTutorNoidaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
