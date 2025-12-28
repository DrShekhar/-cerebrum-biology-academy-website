import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Classes | Best Course for Biology Students',
  description:
    'Join the best NEET Biology classes with AIIMS trained faculty. Complete NCERT coverage, botany & zoology experts, 98% success rate. Best course for biology students!',
  keywords: [
    'NEET biology classes',
    'NEET biology coaching',
    'best course for biology students',
    'biology classes for NEET',
    'NEET biology preparation',
    'NEET biology online classes',
    'best biology coaching for NEET',
    'NCERT biology for NEET',
    'NEET botany classes',
    'NEET zoology classes',
  ],
  openGraph: {
    title: 'NEET Biology Classes | Best Course for Biology Students',
    description:
      'Best NEET Biology classes with AIIMS trained faculty. Complete NCERT coverage, 98% success rate. Best course for biology students!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-classes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Classes',
    description: 'Best NEET Biology classes with AIIMS trained faculty. 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-classes',
  },
}

export default function NeetBiologyClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
