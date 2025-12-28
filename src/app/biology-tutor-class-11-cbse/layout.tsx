import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor for Class 11 CBSE | 11th Bio CBSE Coaching 2025',
  description:
    'Looking for biology tutor for Class 11 CBSE? Expert NCERT-based coaching from AIIMS trained faculty. Build strong foundation for NEET. 98% success rate, small batches.',
  keywords: [
    '11th class bio',
    'biology class 11 cbse',
    'class 11 biology tutor',
    'cbse biology class 11',
    'biology tutor class 11',
    '11th biology coaching',
    'class 11 bio tuition',
    'ncert biology class 11',
    'biology foundation class 11',
    'neet biology class 11',
  ],
  openGraph: {
    title: 'Biology Tutor for Class 11 CBSE | Expert NCERT Coaching',
    description:
      'Expert Class 11 CBSE biology coaching from AIIMS trained faculty. NCERT-based teaching, NEET foundation, small batches.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-class-11-cbse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 11 CBSE Biology Tutor',
    description: 'Expert Class 11 biology coaching. AIIMS trained faculty, 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-class-11-cbse',
  },
}

export default function BiologyTutorClass11CBSELayout({ children }: { children: React.ReactNode }) {
  return children
}
