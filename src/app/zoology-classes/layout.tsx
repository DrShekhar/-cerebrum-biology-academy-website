import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zoology Classes | Best Zoology Classes for NEET 2025',
  description:
    'Join the best zoology classes for NEET preparation. Comprehensive coverage of Human Physiology, Animal Kingdom, Reproduction & Evolution. Batch learning with expert faculty.',
  keywords: [
    'zoology classes',
    'zoology class',
    'zoology classes near me',
    'best zoology classes',
    'zoology coaching classes',
    'animal biology classes',
    'neet zoology classes',
    'zoology batch',
  ],
  openGraph: {
    title: 'Best Zoology Classes | NEET Preparation',
    description:
      'Comprehensive zoology classes covering all NEET topics. Batch learning with AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/zoology-classes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Zoology Classes',
    description: 'Join our zoology batches for comprehensive NEET preparation!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/zoology-classes',
  },
}

export default function ZoologyClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
