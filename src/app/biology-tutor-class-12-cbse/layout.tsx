import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor for Class 12 CBSE | Bio CBSE Class 12 Coaching 2027',
  description:
    'Looking for biology tutor for Class 12 CBSE? Expert NCERT-based coaching from AIIMS trained faculty. Board exam + NEET preparation. 98% success rate, small batches.',
  keywords: [
    'bio cbse class 12',
    'biology for class 12',
    'biology class 12 cbse',
    'class 12 biology tutor',
    'cbse biology class 12',
    'biology tutor class 12',
    '12th biology coaching',
    'class 12 bio tuition',
    'ncert biology class 12',
    'neet biology class 12',
  ],
  openGraph: {
    title: 'Biology Tutor for Class 12 CBSE | Expert NCERT Coaching',
    description:
      'Expert Class 12 CBSE biology coaching from AIIMS trained faculty. NCERT-based teaching, board + NEET preparation.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-class-12-cbse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 12 CBSE Biology Tutor',
    description: 'Expert Class 12 biology coaching. Board + NEET prep. 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-class-12-cbse',
  },
}

export default function BiologyTutorClass12CBSELayout({ children }: { children: React.ReactNode }) {
  return children
}
