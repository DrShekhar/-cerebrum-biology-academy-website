import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Teacher for Class 11 CBSE 2027 | NCERT Expert',
  description:
    'Find the best biology teacher for Class 11 CBSE. AIIMS-trained faculty covering complete NCERT syllabus. Build strong foundation for NEET. 60% NEET syllabus in Class 11!',
  keywords: [
    'best biology teacher for class 11',
    'best teacher for biology class 11',
    'biology class 11 best teacher',
    'class 11 biology teacher',
    'cbse class 11 biology',
    'ncert biology class 11 teacher',
    'biology teacher 11th class',
    '11th class bio teacher',
    'best biology faculty class 11',
  ],
  openGraph: {
    title: 'Best Biology Teacher for Class 11 CBSE',
    description: 'AIIMS-trained faculty for Class 11 CBSE Biology. Complete NCERT coverage.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-biology-teacher-class-11-cbse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Teacher Class 11 CBSE',
    description: 'Expert Class 11 CBSE Biology teaching. 60% NEET syllabus coverage!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-teacher-class-11-cbse',
  },
}

export default function BestBiologyTeacherClass11CBSELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
