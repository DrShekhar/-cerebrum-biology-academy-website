import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Board Exam Biology Preparation | CBSE, ICSE, IGCSE, IB | Cerebrum Academy',
  description:
    'Expert Biology preparation for all boards — CBSE, ICSE, IGCSE, IB, and State Boards. Class 11 & 12 board exam coaching with AIIMS faculty. 98% success rate.',
  keywords: [
    'board exam biology preparation',
    'CBSE biology coaching',
    'ICSE biology tuition',
    'IGCSE biology classes',
    'IB biology preparation',
    'class 11 biology',
    'class 12 biology',
    'board exam coaching',
  ],
  openGraph: {
    title: 'Board Exam Biology Preparation | CBSE, ICSE, IGCSE, IB | Cerebrum Academy',
    description:
      'Expert Biology preparation for all boards — CBSE, ICSE, IGCSE, IB, and State Boards.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Board Exam Biology Preparation | CBSE, ICSE, IGCSE, IB | Cerebrum Academy',
    description: 'Expert Biology preparation for all boards.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/board-exam-preparation',
  },
}

export default function BoardExamPreparationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
