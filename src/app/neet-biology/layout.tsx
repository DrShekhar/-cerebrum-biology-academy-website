import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Chapters - Complete Study Guide | Cerebrum Biology Academy',
  description:
    'Comprehensive NEET Biology chapter-wise study guide covering all Class 11 and 12 chapters. Key topics, important concepts, weightage analysis, and NEET preparation tips.',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology',
  },
  openGraph: {
    title: 'NEET Biology Chapters - Complete Study Guide | Cerebrum Biology Academy',
    description:
      'Comprehensive NEET Biology chapter-wise study guide covering all Class 11 and 12 chapters. Key topics, important concepts, weightage analysis, and NEET preparation tips.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology',
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
}

export default function NeetBiologyLayout({ children }: { children: React.ReactNode }) {
  return children
}
