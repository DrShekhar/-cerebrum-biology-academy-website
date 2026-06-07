import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology MCQ Bank | 10,000+ Practice Questions | Cerebrum',
  description:
    'NEET Biology MCQ practice bank — 10,000+ questions covering all 38 NCERT chapters. Chapter-wise + unit-wise + full mock tests. NEET-pattern question mix, detailed solutions with NCERT page references, difficulty-graded (Easy / Medium / Hard / NEET-PYQ). Class 11, 12, dropper, repeater.',
  keywords: [
    'NEET biology MCQ',
    'NEET biology questions',
    'NEET biology practice questions',
    'NEET biology MCQ bank',
    'NEET biology PYQ',
    'NEET biology chapter wise MCQ',
    'NEET Class 11 biology MCQ',
    'NEET Class 12 biology MCQ',
    'biology question bank NEET',
    'free NEET biology questions',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/resources/questions' },
  openGraph: {
    title: 'NEET Biology MCQ Bank | Cerebrum',
    description: '10,000+ NCERT-aligned MCQs across all 38 chapters with detailed solutions.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/resources/questions',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology MCQ Bank | Cerebrum',
    description: '10,000+ MCQs, NCERT-aligned.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
