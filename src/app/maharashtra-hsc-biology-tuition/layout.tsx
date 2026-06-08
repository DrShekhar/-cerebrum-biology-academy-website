import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maharashtra HSC Biology Tuition | MHT-CET & NEET Coaching',
  description:
    'Expert Maharashtra HSC biology tuition for board exams & MHT-CET/NEET preparation. State board aligned teaching with competitive exam focus. Online classes available!',
  openGraph: {
    title: 'Maharashtra HSC Biology Tuition | MHT-CET & NEET Coaching',
    images: ['/og-image.jpg'],
    description:
      'Expert Maharashtra HSC biology tuition for board exams & MHT-CET/NEET preparation. State board aligned teaching with competitive exam focus. Online classes available!',
    url: 'https://cerebrumbiologyacademy.com/maharashtra-hsc-biology-tuition',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/maharashtra-hsc-biology-tuition',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
