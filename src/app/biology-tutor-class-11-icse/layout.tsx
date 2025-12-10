import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor for Class 11 ICSE | ICSE Biology Coaching 2025',
  description:
    'Looking for biology tutor for Class 11 ICSE? Expert coaching from AIIMS trained faculty covering ISC syllabus. Build strong foundation for competitive exams. 98% success rate.',
  keywords: [
    'biology class 11 icse',
    'class 11 icse biology tutor',
    'icse biology class 11',
    'biology tutor icse',
    '11th icse biology coaching',
    'isc biology class 11',
    'icse biology tuition',
    'class 11 icse bio',
    'icse biology teacher',
    'neet biology icse',
  ],
  openGraph: {
    title: 'Biology Tutor for Class 11 ICSE | Expert Coaching',
    description:
      'Expert Class 11 ICSE biology coaching from AIIMS trained faculty. ISC syllabus coverage, competitive exam prep.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-class-11-icse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 11 ICSE Biology Tutor',
    description: 'Expert ICSE biology coaching. AIIMS trained faculty, 98% success rate!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-class-11-icse',
  },
}

export default function BiologyTutorClass11ICSELayout({ children }: { children: React.ReactNode }) {
  return children
}
