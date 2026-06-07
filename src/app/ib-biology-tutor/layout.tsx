import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IB Biology Tutor | HL + SL 2025 Syllabus Expert | Cerebrum Biology Academy',
  description:
    'Examiner-level IB Biology tutoring (2025 syllabus) — HL & SL coverage, Internal Assessment (IA) supervision, Extended Essay (EE) mentorship, Paper 1 + Paper 2 strategy. 95% of Cerebrum IB students score 6-7. AIIMS-trained Dr. Shekhar C Singh leads. Serving 51 schools across 27 cities, 6 continents.',
  keywords: [
    'IB Biology tutor',
    'IB Biology HL tutor',
    'IB Biology SL tutor',
    'IB Biology 2025 syllabus',
    'IB Biology IA supervisor',
    'IB Biology EE mentor',
    'IB Biology Paper 1 strategy',
    'IB Biology Paper 2 strategy',
    'IB Biology examiner tutor',
    'best IB Biology tutor',
    'IB Biology online tutor',
    'IB Biology score 7 tutor',
    'IB Biology Theme A B C D',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/ib-biology-tutor' },
  openGraph: {
    title: 'IB Biology Tutor | HL + SL 2025 Syllabus | Cerebrum',
    description:
      'Examiner-level IB Biology tutoring — 95% students score 6-7. IA + EE supervision.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/ib-biology-tutor',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'IB Biology Tutor | Cerebrum Biology Academy',
    description: 'HL + SL, 2025 syllabus, IA + EE supervision.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
