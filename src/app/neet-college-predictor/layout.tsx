import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET College Predictor 2026 - Find Medical Colleges Based on Your Rank',
  description:
    'Free NEET College Predictor 2026 to find medical colleges based on your All India Rank. Get list of government and private MBBS, BDS colleges you can get admission in.',
  keywords: [
    'NEET college predictor',
    'NEET 2026 college predictor',
    'medical college predictor',
    'MBBS college finder',
    'NEET rank college',
    'government medical college cutoff',
    'private medical college NEET',
    'NEET admission predictor',
    'NEET counselling predictor',
    'college from NEET rank',
  ],
  openGraph: {
    title: 'NEET College Predictor 2026 - Find Medical Colleges',
    description:
      'Free tool to find medical colleges based on your NEET 2026 rank. Get government and private college options.',
    url: 'https://www.cerebrumbiologyacademy.com/neet-college-predictor',
    type: 'website',
    images: [
      {
        url: '/images/neet-college-predictor.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET College Predictor Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET College Predictor 2026 - Free Tool',
    description: 'Find medical colleges you can get based on your NEET rank. Free college finder.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-college-predictor',
  },
}

export default function NEETCollegePredictorLayout({ children }: { children: React.ReactNode }) {
  return children
}
