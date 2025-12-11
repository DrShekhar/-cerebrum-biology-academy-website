import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Botany Classes | Best Botany Classes for NEET 2025',
  description:
    'Join the best botany classes for NEET preparation. Comprehensive coverage of Plant Physiology, Plant Kingdom, Ecology & Cell Biology. Batch learning with expert faculty.',
  keywords: [
    'botany classes',
    'botany class',
    'botany classes near me',
    'best botany classes',
    'botany coaching classes',
    'plant biology classes',
    'neet botany classes',
    'botany batch',
  ],
  openGraph: {
    title: 'Best Botany Classes | NEET Preparation',
    description:
      'Comprehensive botany classes covering all NEET topics. Batch learning with AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/botany-classes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Botany Classes',
    description: 'Join our botany batches for comprehensive NEET preparation!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/botany-classes',
  },
}

export default function BotanyClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
