import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor for State Boards | State Board Biology Coaching 2025',
  description:
    'Looking for biology tutor for State Board? Expert coaching for English medium State Boards aligned with NCERT. Class 9-12 coverage, NEET preparation included. 98% success rate.',
  keywords: [
    'state board biology tutor',
    'biology tutor state board',
    'state board biology coaching',
    'maharashtra board biology',
    'karnataka board biology',
    'up board biology english medium',
    'state board biology tuition',
    'ncert biology state board',
    'english medium biology tutor',
    'neet for state board students',
  ],
  openGraph: {
    title: 'Biology Tutor for State Boards | NCERT-Aligned Coaching',
    description:
      'Expert State Board biology coaching for English medium students. NCERT-aligned syllabus, NEET preparation included.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-state-boards',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'State Board Biology Tutor',
    description: 'Expert coaching for State Board students. NCERT-aligned, NEET prep included!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor-state-boards',
  },
}

export default function BiologyTutorStateBoardsLayout({ children }: { children: React.ReactNode }) {
  return children
}
