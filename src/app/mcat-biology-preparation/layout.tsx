import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MCAT Biology Preparation | Online MCAT Biology Tutoring',
  description:
    'Expert MCAT Biology preparation with Campbell Biology-based curriculum. Comprehensive coverage of Biological and Biochemical Foundations. Score 520+ with our proven tutoring.',
  keywords: [
    'MCAT biology preparation',
    'MCAT biology tutor',
    'MCAT biology coaching',
    'MCAT bio/biochem section',
    'MCAT biology online classes',
    'MCAT preparation online',
    'medical school admissions test',
    'MCAT 520+ preparation',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/mcat-biology-preparation/',
  },
  openGraph: {
    title: 'MCAT Biology Preparation | Online MCAT Biology Tutoring',
    description:
      'Expert MCAT Biology preparation with Campbell Biology-based curriculum. Score 520+ with our proven tutoring methods.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function MCATBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
