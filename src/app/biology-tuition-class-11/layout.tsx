import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tuition for Class 11 | NEET Foundation & Board Prep 2025',
  description:
    'Expert biology tuition for Class 11 students. Build strong NEET foundation with AIIMS faculty. 60% NEET syllabus covered in Class 11. Book free demo class!',
  keywords: [
    'biology tuition class 11',
    'class 11 biology tuition',
    'biology tuition for class 11',
    '11th biology tuition',
    'class 11 biology coaching',
    'biology classes for class 11',
    'neet biology class 11',
    'class 11 biology online tuition',
    'best biology tuition class 11',
    'biology tutor class 11',
  ],
  openGraph: {
    title: 'Biology Tuition for Class 11 | NEET Foundation',
    description:
      'Expert Class 11 biology tuition with AIIMS faculty. Build strong foundation for NEET success.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-11',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tuition Class 11',
    description: 'Build NEET foundation in Class 11. AIIMS faculty, 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-class-11',
  },
}

export default function BiologyTuitionClass11Layout({ children }: { children: React.ReactNode }) {
  return children
}
