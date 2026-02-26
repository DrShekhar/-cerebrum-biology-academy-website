import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Score Calculator 2026 | Calculate Your Expected NEET Score',
  description:
    'Free NEET score calculator 2026. Calculate your expected NEET score based on correct, incorrect & unattempted questions. Instant results with rank prediction.',
  openGraph: {
    title: 'NEET Score Calculator 2026 | Calculate Your Expected NEET Score',
    description:
      'Free NEET score calculator 2026. Calculate your expected NEET score based on correct, incorrect & unattempted questions. Instant results with rank prediction.',
    url: 'https://cerebrumbiologyacademy.com/neet-score-calculator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-score-calculator',
  },
}

export default function NEETScoreCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
