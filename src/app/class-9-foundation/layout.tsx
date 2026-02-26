import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 9 Foundation Course | Biology & NEET Preparation',
  description:
    'Class 9 biology foundation course for early NEET preparation. NCERT-aligned curriculum, concept building, regular assessments. Start your NEET journey from Class 9!',
  openGraph: {
    title: 'Class 9 Foundation Course | Biology & NEET Preparation',
    description:
      'Class 9 biology foundation course for early NEET preparation. NCERT-aligned curriculum, concept building, regular assessments. Start your NEET journey from Class 9!',
    url: 'https://cerebrumbiologyacademy.com/class-9-foundation',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-9-foundation',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
