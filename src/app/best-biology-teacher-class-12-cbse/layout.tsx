import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Teacher for Class 12 CBSE 2027 | Board + NEET',
  description:
    'Find the best biology teacher for Class 12 CBSE. Expert teaching for boards and NEET simultaneously. Genetics, Ecology, Biotechnology mastery. 98% success rate.',
  keywords: [
    'best biology teacher for class 12',
    'best teacher for biology class 12',
    'class 12 biology teacher',
    'cbse class 12 biology',
    'ncert biology class 12 teacher',
    'biology teacher 12th class',
    '12th class bio teacher',
    'best biology faculty class 12',
    'class 12 biology for neet',
  ],
  openGraph: {
    title: 'Best Biology Teacher for Class 12 CBSE',
    description: 'Expert Class 12 CBSE Biology teaching. Boards + NEET dual preparation.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-biology-teacher-class-12-cbse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Teacher Class 12 CBSE',
    description: 'Expert Class 12 CBSE Biology teaching. 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-teacher-class-12-cbse',
  },
}

export default function BestBiologyTeacherClass12CBSELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
