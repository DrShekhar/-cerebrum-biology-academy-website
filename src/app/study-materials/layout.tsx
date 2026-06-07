import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Study Materials | NCERT Notes, MCQs, Mock Tests | Cerebrum',
  description:
    'Comprehensive NEET Biology study materials at Cerebrum — chapter-wise NCERT notes (Class 11 + 12), 10,000+ MCQ bank covering all 38 chapters, full-length mock tests, previous-year NEET PYQ analysis (2014-2025), high-weightage topic guides, AIIMS-faculty annotated NCERT PDFs. Downloadable + interactive.',
  keywords: [
    'NEET biology study materials',
    'NEET biology notes PDF',
    'Class 11 12 biology notes',
    'NEET biology MCQ bank',
    'NEET biology mock tests',
    'NEET PYQ biology',
    'NEET previous year questions biology',
    'AIIMS biology notes',
    'NCERT annotated biology',
    'NEET biology revision notes',
    'free NEET biology resources',
    'biology study material Cerebrum',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/study-materials' },
  openGraph: {
    title: 'NEET Biology Study Materials | Cerebrum',
    description:
      '10,000+ MCQs + NCERT notes + mock tests + PYQ analysis. AIIMS faculty annotated.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/study-materials',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Study Materials | Cerebrum',
    description: '10,000+ MCQs + notes + mocks.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
