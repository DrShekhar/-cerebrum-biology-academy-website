import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Score Calculator 2025 | Calculate Your Expected Score',
  description:
    'Free NEET score calculator to estimate your marks and rank. Calculate expected scores based on your answers and get college predictions instantly.',
  keywords: [
    'NEET score calculator',
    'NEET 2025 score calculator',
    'NEET marks calculator',
    'NEET rank predictor',
    'calculate NEET score',
  ],
  openGraph: {
    title: 'NEET Score Calculator 2025 | Calculate Your Expected Score',
    description:
      'Free NEET score calculator to estimate your marks and rank. Calculate expected scores based on your answers.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/calculator',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Score Calculator 2025 | Calculate Your Expected Score',
    description: 'Free NEET score calculator to estimate your marks and rank.',
  },
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
