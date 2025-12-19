import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology for NEET Preparation | Best NEET Biology Classes 2025',
  description:
    'Comprehensive biology preparation for NEET 2026. AIIMS-trained faculty, complete NCERT coverage, 98% success rate. Join 10,000+ successful students. Book free demo!',
  keywords: [
    'biology for neet',
    'neet biology preparation',
    'biology neet preparation',
    'neet biology classes',
    'biology for neet exam',
    'best biology for neet',
    'neet biology course',
    'biology neet coaching',
    'neet biology online classes',
    'biology preparation for neet',
  ],
  openGraph: {
    title: 'Biology for NEET | Expert Preparation',
    description:
      'Comprehensive NEET biology preparation with AIIMS faculty. 98% success rate, 2,500+ selections.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-neet-preparation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology for NEET Preparation',
    description: 'Crack NEET with expert biology preparation. AIIMS faculty, proven results!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-neet-preparation',
  },
}

export default function BiologyNeetPreparationLayout({ children }: { children: React.ReactNode }) {
  return children
}
