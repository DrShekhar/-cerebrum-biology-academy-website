import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Rank Predictor 2026 | Predict Your NEET AIR & College',
  description:
    'Free NEET rank predictor 2026. Predict your All India Rank based on expected score. See eligible medical colleges, cutoffs & admission chances. Instant results!',
  openGraph: {
    title: 'NEET Rank Predictor 2026 | Predict Your NEET AIR & College',
    description:
      'Free NEET rank predictor 2026. Predict your All India Rank based on expected score. See eligible medical colleges, cutoffs & admission chances. Instant results!',
    url: 'https://cerebrumbiologyacademy.com/neet-rank-predictor',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-rank-predictor',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
