import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Online Biology Tutor | NEET, A-Level, IB, IGCSE, AP | 98% Success Rate',
  description:
    'Expert online Biology tutor — AIIMS-trained Dr. Shekhar C Singh. NEET, Board exams, A-Level, IB, IGCSE, AP Biology. Live interactive classes, 15-student batches, 98% success rate. Students in 14+ countries. Book FREE demo!',
  keywords: [
    'online biology tutor',
    'best online biology tutor',
    'online biology tuition',
    'biology tutor online',
    'online biology classes',
    'online biology teacher',
    'biology online coaching',
    'neet biology online tutor',
    'a level biology tutor online',
    'ib biology tutor online',
    'igcse biology tutor online',
    'ap biology tutor online',
    'class 11 biology online tutor',
    'class 12 biology online tutor',
    'biology tutor for homeschool',
  ],
  openGraph: {
    title: 'Best Online Biology Tutor | NEET, A-Level, IB, IGCSE | 98% Success',
    description:
      'Expert online Biology tutoring by AIIMS faculty. NEET, A-Level, IB, IGCSE, AP. Live classes, 14+ countries. Book FREE demo!',
    type: 'website',
    locale: 'en',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Online Biology Tutor | All Curricula | 98% Success',
    description: 'AIIMS faculty, NEET + A-Level + IB + IGCSE + AP. Live classes, 14+ countries!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor',
  },
}

export default function OnlineBiologyTutorLayout({ children }: { children: React.ReactNode }) {
  return children
}
