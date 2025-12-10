import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Rank Predictor 2026 - Free Tool to Predict Your All India Rank',
  description:
    'Free NEET Rank Predictor 2026 tool to estimate your All India Rank from marks. Get instant rank prediction, percentile, and college admission chances based on NEET 2024 data.',
  keywords: [
    'NEET rank predictor',
    'NEET 2026 rank predictor',
    'NEET marks vs rank',
    'NEET rank calculator',
    'NEET percentile calculator',
    'predict NEET rank',
    'NEET rank from marks',
    'NEET AIR predictor',
    'NEET college predictor',
    'NEET 2026 expected rank',
  ],
  openGraph: {
    title: 'NEET Rank Predictor 2026 - Free All India Rank Prediction Tool',
    description:
      'Free tool to predict your NEET 2026 All India Rank from marks. Get instant results with college admission chances.',
    url: 'https://www.cerebrumbiologyacademy.com/neet-rank-predictor',
    type: 'website',
    images: [
      {
        url: '/images/neet-rank-predictor.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Rank Predictor Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Rank Predictor 2026 - Free Tool',
    description:
      'Predict your NEET 2026 rank from marks instantly. Free calculator with college chances.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-rank-predictor',
  },
}

export default function NEETRankPredictorLayout({ children }: { children: React.ReactNode }) {
  return children
}
