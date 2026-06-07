import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NCERT Biology Class 12 | 16 Chapters Line-by-Line | Cerebrum Biology Academy',
  description:
    'NCERT Biology Class 12 complete coverage — all 16 chapters across 5 units (Reproduction, Genetics & Evolution, Biology in Human Welfare, Biotechnology, Ecology). Line-by-line NCERT explanations with NEET-aligned MCQs from AIIMS-trained Dr. Shekhar C Singh. Highest NEET weightage topics (Genetics, Reproduction, Ecology, Biotechnology).',
  keywords: [
    'NCERT Biology Class 12',
    'NCERT Biology Class 12 chapter wise',
    'Class 12 NCERT biology notes',
    'Class 12 NCERT biology PDF',
    'Class 12 genetics chapter',
    'Class 12 reproduction chapter',
    'Class 12 ecology chapter',
    'Class 12 biotechnology chapter',
    'Class 12 evolution chapter',
    'NCERT Class 12 biology MCQ',
    'NEET Class 12 NCERT biology',
    'Class 12 biology high weightage',
    'best Class 12 biology notes',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/ncert-biology-class-12' },
  openGraph: {
    title: 'NCERT Biology Class 12 | 16 Chapters | Cerebrum',
    description:
      'All 16 chapters line-by-line with NEET high-weightage focus from AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/ncert-biology-class-12',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NCERT Biology Class 12 | Cerebrum',
    description: 'Line-by-line + NEET high-weightage focus.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
