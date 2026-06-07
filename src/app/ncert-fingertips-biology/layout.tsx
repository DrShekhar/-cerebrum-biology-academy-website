import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NCERT Fingertips Biology | MTG Book Review + NEET Strategy | Cerebrum',
  description:
    'NCERT Fingertips Biology (MTG) — complete book review, chapter-wise MCQ analysis, NEET preparation strategy. AIIMS-trained Dr. Shekhar C Singh explains how to use Fingertips alongside NCERT for maximum NEET score. Class 11 + Class 12 chapter mapping, recommended buy links.',
  keywords: [
    'NCERT Fingertips Biology',
    'MTG Fingertips Biology',
    'NCERT Fingertips review',
    'NEET Fingertips Biology strategy',
    'Fingertips Biology MCQ',
    'best NEET MCQ book Biology',
    'NCERT Fingertips Class 11',
    'NCERT Fingertips Class 12',
    'Fingertips Biology PDF',
    'MTG NEET Biology book',
    'Cerebrum Fingertips recommendation',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/ncert-fingertips-biology' },
  openGraph: {
    title: 'NCERT Fingertips Biology | MTG Review | Cerebrum',
    description: 'Complete MTG Fingertips review + NEET strategy from AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/ncert-fingertips-biology',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NCERT Fingertips Biology | Cerebrum',
    description: 'MTG Fingertips review + NEET strategy.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
