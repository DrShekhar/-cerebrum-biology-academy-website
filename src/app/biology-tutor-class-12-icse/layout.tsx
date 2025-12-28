import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor for Class 12 ICSE | ISC Biology Coaching 2025',
  description:
    'Looking for biology tutor for Class 12 ICSE? Expert ISC coaching from AIIMS trained faculty. Board exam + NEET preparation. 98% success rate, small batches.',
  keywords: [
    'biology class 12 icse',
    'class 12 icse biology tutor',
    'icse biology class 12',
    'isc biology tutor',
    '12th icse biology coaching',
    'isc biology class 12',
    'icse biology tuition class 12',
    'class 12 isc bio',
    'icse biology teacher',
    'neet biology icse board',
  ],
  openGraph: {
    title: 'Biology Tutor for Class 12 ICSE | ISC Board Coaching',
    description:
      'Expert Class 12 ICSE biology coaching from AIIMS trained faculty. ISC board + NEET preparation.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-class-12-icse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 12 ICSE Biology Tutor',
    description: 'Expert ISC biology coaching. Board + NEET prep. 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-class-12-icse',
  },
}

export default function BiologyTutorClass12ICSELayout({ children }: { children: React.ReactNode }) {
  return children
}
