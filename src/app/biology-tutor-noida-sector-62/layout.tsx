import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Noida Sector 62 | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Noida Sector 62 for NEET & Board exams. Expert coaching near IT hub. AIIMS faculty guidance. Flexible timings for working parents.',
  keywords: [
    'biology tutor noida sector 62',
    'neet coaching sector 62 noida',
    'biology classes sector 62',
    'biology tuition noida sector 62',
    'neet tutor sector 62',
    'biology coaching sector 62 noida',
    'neet classes sector 62',
    'biology teacher sector 62',
    'neet preparation sector 62 noida',
    'best biology coaching sector 62',
  ],
  openGraph: {
    title: 'Biology Tutor in Noida Sector 62 | NEET Coaching',
    description:
      'Best Biology tutor in Noida Sector 62 for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-noida-sector-62',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Noida Sector 62 | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Noida Sector 62.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-noida-sector-62',
  },
}

export default function BiologyTutorNoidaSector62Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
