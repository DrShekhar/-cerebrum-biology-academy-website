import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Noida Sector 18 | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Noida Sector 18 for NEET & Board exams. Expert coaching near Atta Market. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor noida sector 18',
    'neet coaching sector 18 noida',
    'biology classes sector 18',
    'biology tuition noida sector 18',
    'neet tutor atta market',
    'biology coaching sector 18 noida',
    'neet classes sector 18',
    'biology teacher sector 18',
    'neet preparation sector 18 noida',
    'best biology coaching atta market',
  ],
  openGraph: {
    title: 'Biology Tutor in Noida Sector 18 | NEET Coaching',
    description:
      'Best Biology tutor in Noida Sector 18 for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-noida-sector-18',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Noida Sector 18 | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Noida Sector 18.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-noida-sector-18',
  },
}

export default function BiologyTutorNoidaSector18Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
