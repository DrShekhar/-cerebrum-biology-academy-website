import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NCERT Biology Class 11 | 22 Chapters Line-by-Line | Cerebrum Biology Academy',
  description:
    'NCERT Biology Class 11 complete coverage — all 22 chapters across 5 units (Diversity of Living Organisms, Structural Organisation, Cell Structure, Plant Physiology, Human Physiology). Line-by-line NCERT explanations with NEET-aligned MCQs from AIIMS-trained Dr. Shekhar C Singh. Free chapter notes + worked examples.',
  keywords: [
    'NCERT Biology Class 11',
    'NCERT Biology Class 11 chapter wise',
    'Class 11 NCERT biology notes',
    'NCERT Class 11 biology PDF',
    'Class 11 biology cell structure',
    'Class 11 biology plant physiology',
    'Class 11 biology human physiology',
    'Class 11 biology diversity living organisms',
    'NCERT Class 11 biology MCQ',
    'NEET Class 11 NCERT biology',
    'Class 11 biology AIIMS faculty',
    'best Class 11 biology notes',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/ncert-biology-class-11' },
  openGraph: {
    title: 'NCERT Biology Class 11 | 22 Chapters | Cerebrum',
    description: 'All 22 chapters line-by-line with NEET-aligned MCQs from AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/ncert-biology-class-11',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NCERT Biology Class 11 | Cerebrum',
    description: 'Line-by-line NCERT + NEET-aligned MCQs.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
