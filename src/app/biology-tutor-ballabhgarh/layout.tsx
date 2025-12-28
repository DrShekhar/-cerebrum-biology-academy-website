import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Ballabhgarh | NEET Coaching | Cerebrum Academy',
  description:
    'Best Biology tutor in Ballabhgarh for NEET & Board exams. Expert coaching near Old Faridabad. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor ballabhgarh',
    'neet coaching ballabhgarh',
    'biology classes ballabhgarh',
    'biology tuition ballabhgarh',
    'neet tutor ballabhgarh',
    'biology coaching ballabhgarh',
    'neet classes ballabhgarh',
    'biology teacher ballabhgarh',
    'neet preparation ballabhgarh',
    'best biology coaching ballabhgarh',
    'biology tutor old faridabad',
    'neet coaching faridabad',
  ],
  openGraph: {
    title: 'Biology Tutor in Ballabhgarh | NEET Coaching',
    description:
      'Best Biology tutor in Ballabhgarh for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-ballabhgarh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Ballabhgarh | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Ballabhgarh.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-ballabhgarh',
  },
}

export default function BiologyTutorBallabhgarhLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
