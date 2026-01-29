import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Score Calculator 2026 - Free NEET Marks Calculator Tool',
  description:
    'Free NEET Score Calculator 2026 to calculate your marks using the official marking scheme. Get subject-wise breakdown for Physics, Chemistry, and Biology with accuracy analysis.',
  keywords: [
    'NEET score calculator',
    'NEET marks calculator',
    'NEET 2026 score calculator',
    'NEET marking scheme',
    'calculate NEET score',
    'NEET marks calculation',
    'NEET negative marking',
    'NEET Physics Chemistry Biology marks',
    'NEET subject wise marks',
    'NEET score checker',
    'NEET marks estimator',
    'how to calculate NEET score',
  ],
  openGraph: {
    title: 'NEET Score Calculator 2026 - Free Marks Calculator Tool',
    description:
      'Free tool to calculate your NEET 2026 score using official marking scheme. Get subject-wise breakdown with accuracy percentage.',
    url: 'https://cerebrumbiologyacademy.com/neet-score-calculator',
    type: 'website',
    images: [
      {
        url: '/images/neet-score-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Score Calculator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Score Calculator 2026 - Free Tool',
    description:
      'Calculate your NEET 2026 score instantly. Subject-wise marks breakdown with accuracy analysis.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-score-calculator',
  },
}

export default function NEETScoreCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
