import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Government Medical Colleges NEET Cutoff 2024 | Complete List with Fees & Seats',
  description:
    'Complete list of 124+ government medical colleges in India with NEET 2024 cutoff ranks, annual fees (₹1,628 to ₹50,000), seat distribution, and state-wise details. Low fees MBBS admission.',
  keywords: [
    'government medical colleges India',
    'NEET cutoff government colleges 2024',
    'cheap MBBS colleges India',
    'low fees medical colleges',
    'government MBBS colleges cutoff',
    'AIIMS NEET cutoff',
    'state medical college admission',
    'AIQ cutoff government colleges',
    'MBBS government seats India',
    'best government medical colleges',
  ],
  openGraph: {
    title: 'Government Medical Colleges NEET Cutoff 2024 | 124+ Colleges',
    description:
      '124+ government medical colleges with NEET 2024 cutoffs, fees from ₹1,628/year, and seat distribution. Find affordable MBBS options.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-college-predictor/government-medical-colleges',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government Medical Colleges NEET Cutoff 2024',
    description:
      '124+ govt MBBS colleges | Fees from ₹1,628/year | Complete cutoff list with AIQ ranks',
  },
  alternates: {
    canonical:
      'https://cerebrumbiologyacademy.com/neet-college-predictor/government-medical-colleges',
  },
}

export default function GovernmentCollegesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
