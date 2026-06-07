import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Success Stories | AIIMS, JIPMER, MAMC Selections | Cerebrum Biology Academy',
  description:
    'Real NEET success stories from Cerebrum Biology Academy students — AIIMS Delhi selections, JIPMER Puducherry, Maulana Azad Medical College, KMC Mangalore, MAMC, Lady Hardinge, IB Biology 7 scorers, AP Biology 5 scorers, USABO Semi-Finalists. 680+ medical college selections, 98% qualification rate. Read student journeys, scores, ranks, and college admissions across India and overseas.',
  keywords: [
    'NEET success stories',
    'Cerebrum NEET toppers',
    'AIIMS Delhi selection stories',
    'JIPMER selection',
    'Maulana Azad Medical College',
    'MAMC selection',
    'NEET topper journey',
    'NEET 720 success story',
    'Cerebrum testimonials',
    'NEET dropper success stories',
    'IB Biology 7 success',
    'USABO Semi-Finalist story',
    'medical college admission stories',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/success-stories' },
  openGraph: {
    title: 'NEET Success Stories | Cerebrum Biology Academy',
    description:
      '680+ medical college selections — AIIMS, JIPMER, MAMC, Manipal stories.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/success-stories',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Success Stories | Cerebrum',
    description: '680+ medical college selections from Cerebrum students.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
