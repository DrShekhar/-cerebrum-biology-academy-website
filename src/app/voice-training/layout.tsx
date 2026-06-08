import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voice Training Studio | Practice Biology Concepts Aloud',
  description:
    'Interactive voice training studio for NEET biology preparation. Practice explaining concepts aloud, improve retention, and build confidence for exams.',
  openGraph: {
    title: 'Voice Training Studio | Practice Biology Concepts Aloud',
    images: ['/og-image.jpg'],
    description:
      'Interactive voice training studio for NEET biology preparation. Practice explaining concepts aloud, improve retention, and build confidence for exams.',
    url: 'https://cerebrumbiologyacademy.com/voice-training',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/voice-training',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
