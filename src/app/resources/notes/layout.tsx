import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Chapter Notes | NCERT Class 11 + 12 | Cerebrum',
  description:
    'NEET Biology chapter notes for all 38 NCERT chapters — Class 11 (22 chapters across 5 units) + Class 12 (16 chapters across 5 units). Line-by-line NCERT explanations, key diagrams, NEET-aligned MCQ examples, high-weightage flags. Authored by AIIMS-trained Dr. Shekhar C Singh and AIIMS-trained faculty.',
  keywords: [
    'NEET biology chapter notes',
    'NEET biology NCERT notes',
    'Class 11 biology notes PDF',
    'Class 12 biology notes PDF',
    'NEET biology revision notes',
    'AIIMS faculty biology notes',
    'NCERT line-by-line notes',
    'NEET biology Class 11 12',
    'biology chapter weightage NEET',
    'free biology chapter notes',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/resources/notes' },
  openGraph: {
    title: 'NEET Biology Chapter Notes | Cerebrum',
    description: 'All 38 NCERT chapters covered — Class 11 + 12 line-by-line notes from AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/resources/notes',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Chapter Notes | Cerebrum',
    description: 'All 38 chapters NCERT line-by-line.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
