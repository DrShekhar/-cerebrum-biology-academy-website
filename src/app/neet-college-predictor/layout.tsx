import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET College Predictor 2026 - Find 100+ Medical Colleges by Rank | AIIMS, Govt, Private',
  description:
    "India's most comprehensive NEET College Predictor with 100+ medical colleges. Accurate NEET 2024 cutoffs for all 23 AIIMS, JIPMER, Government & Private/Deemed colleges. Category-wise (General, EWS, OBC, SC, ST) closing ranks with admission chance calculator.",
  keywords: [
    'NEET college predictor 2026',
    'NEET rank wise college list',
    'AIIMS cutoff rank 2024',
    'government medical college cutoff',
    'private medical college NEET cutoff',
    'NEET counselling college predictor',
    'medical college admission calculator',
    'JIPMER cutoff rank',
    'deemed university MBBS cutoff',
    'NEET 2024 closing ranks',
    'KMC Manipal cutoff',
    'MAMC Delhi cutoff',
    'best medical colleges India',
    'NEET category wise cutoff',
  ],
  openGraph: {
    title: 'NEET College Predictor 2026 - 100+ Colleges with 2024 Cutoffs',
    description:
      'Find medical colleges for your NEET rank. All 23 AIIMS, JIPMER, 50+ Govt & 40+ Private colleges with accurate 2024 MCC cutoff data.',
    url: 'https://www.cerebrumbiologyacademy.com/neet-college-predictor',
    type: 'website',
    images: [
      {
        url: '/images/neet-college-predictor.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET College Predictor - Find Medical Colleges by Rank',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET College Predictor 2026 - 100+ Medical Colleges',
    description:
      'Most comprehensive NEET college finder with all AIIMS, Govt & Private colleges. Accurate 2024 cutoffs.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-college-predictor',
  },
}

export default function NEETCollegePredictorLayout({ children }: { children: React.ReactNode }) {
  return children
}
