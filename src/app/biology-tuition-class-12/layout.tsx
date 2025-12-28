import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tuition for Class 12 | Board + NEET Preparation 2025',
  description:
    'Expert biology tuition for Class 12 students. Dual focus on boards and NEET. High-weightage topics, previous year analysis. Book free demo class today!',
  keywords: [
    'biology tuition class 12',
    'class 12 biology tuition',
    'biology tuition for class 12',
    '12th biology tuition',
    'class 12 biology coaching',
    'biology classes for class 12',
    'neet biology class 12',
    'class 12 biology online tuition',
    'best biology tuition class 12',
    'biology tutor class 12',
  ],
  openGraph: {
    title: 'Biology Tuition for Class 12 | Board + NEET Prep',
    description:
      'Expert Class 12 biology tuition. Dual focus on boards and NEET preparation with AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-12',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tuition Class 12',
    description: 'Ace boards and NEET together! AIIMS faculty, comprehensive preparation!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-class-12',
  },
}

export default function BiologyTuitionClass12Layout({ children }: { children: React.ReactNode }) {
  return children
}
