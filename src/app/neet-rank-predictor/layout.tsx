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
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-rank-predictor',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
