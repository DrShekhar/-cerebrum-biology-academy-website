import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Test Generator | Custom MCQ Tests | Cerebrum',
  description:
    'Custom NEET Biology test generator at Cerebrum — pick chapters, units, difficulty, question count, and instantly generate a NEET-pattern practice test. Powered by 10,000+ MCQ bank covering all 38 NCERT chapters with detailed solutions and AIIMS-faculty explanations.',
  keywords: [
    'NEET biology test generator',
    'custom NEET biology test',
    'NEET MCQ generator',
    'chapter wise NEET test',
    'instant NEET biology test',
    'NEET biology practice generator',
    'free NEET test maker',
    'AI biology test generator',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/resources/test-generator' },
  openGraph: {
    title: 'NEET Biology Test Generator | Cerebrum',
    description: 'Custom MCQ tests by chapter / unit / difficulty from 10,000+ question bank.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/resources/test-generator',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Test Generator | Cerebrum',
    description: 'Custom MCQ tests from 10,000+ bank.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
