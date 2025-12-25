import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Low Fees Medical Colleges in India 2024 | Affordable MBBS Colleges List',
  description:
    'Complete list of low fees medical colleges in India sorted by annual fees. Find affordable MBBS colleges from ₹1,628/year (AIIMS) to budget-friendly options with NEET 2024 cutoffs and seat details.',
  keywords: [
    'low fees medical colleges India',
    'cheap MBBS colleges India',
    'affordable medical colleges',
    'low cost MBBS',
    'medical colleges under 1 lakh',
    'budget medical colleges India',
    'AIIMS fees',
    'government medical college fees',
    'MBBS fees 2024',
    'cheapest medical colleges India',
  ],
  openGraph: {
    title: 'Low Fees Medical Colleges in India 2024 | Affordable MBBS Options',
    description:
      'Find affordable MBBS colleges sorted by fees - from ₹1,628/year to budget-friendly options. Complete list with NEET cutoffs and seat distribution.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-college-predictor/low-fees-medical-colleges',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Low Fees Medical Colleges in India 2024',
    description:
      'Affordable MBBS colleges from ₹1,628/year | Complete list sorted by fees with NEET cutoffs',
  },
  alternates: {
    canonical:
      'https://cerebrumbiologyacademy.com/neet-college-predictor/low-fees-medical-colleges',
  },
}

export default function LowFeesCollegesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
