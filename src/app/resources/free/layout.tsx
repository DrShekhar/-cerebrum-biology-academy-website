import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free NEET Biology Resources & PDF Downloads | Cerebrum Biology Academy',
  description:
    'Download free NEET Biology resources from Cerebrum — NCERT chapter notes (all 38 chapters), 10,000+ MCQ practice questions, mnemonics, formula sheet, diagram collection, study planner, last-60-days revision plan, error log template. All AIIMS-faculty-curated, completely free.',
  keywords: [
    'free NEET biology resources',
    'free NEET biology PDF',
    'free NCERT biology notes',
    'free NEET biology MCQ',
    'free NEET biology mnemonics',
    'free NEET biology formula sheet',
    'free NEET biology diagrams',
    'free NEET biology study planner',
    'free NEET biology last 60 days plan',
    'free NEET biology error log',
    'Cerebrum free resources',
    'AIIMS faculty notes',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/resources/free' },
  openGraph: {
    title: 'Free NEET Biology Resources & PDF Downloads | Cerebrum',
    description:
      'NCERT notes + 10,000+ MCQs + mnemonics + formula sheet + diagrams + planners. AIIMS-faculty-curated, free.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/resources/free',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Free NEET Biology Resources | Cerebrum',
    description: 'NCERT notes + MCQs + mnemonics + planners — all free.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
