import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Greater Noida | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Greater Noida for NEET & Board exams. Our center location! Expert coaching by AIIMS faculty. Offline & online classes.',
  keywords: [
    'biology tutor greater noida',
    'neet coaching greater noida',
    'biology classes greater noida',
    'biology tuition greater noida',
    'neet tutor greater noida',
    'biology coaching greater noida',
    'neet classes greater noida',
    'biology teacher greater noida',
    'neet preparation greater noida',
    'best biology coaching greater noida',
    'neet coaching knowledge park',
    'biology tutor pari chowk',
  ],
  openGraph: {
    title: 'Biology Tutor in Greater Noida | NEET Coaching',
    description:
      'Best Biology tutor in Greater Noida for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-greater-noida',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Greater Noida | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Greater Noida.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-greater-noida',
  },
}

export default function BiologyTutorGreaterNoidaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
