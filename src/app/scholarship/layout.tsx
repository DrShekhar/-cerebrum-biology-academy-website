import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cerebrum Biology Scholarship | Merit + Need-Based NEET Aid | Cerebrum',
  description:
    'Cerebrum Biology Academy scholarship programme — merit-based scholarships up to 100% fee waiver based on diagnostic test performance, need-based aid for underrepresented students, sibling discounts, NRI quota tier pricing. Eligibility criteria, application process, scholarship test schedule.',
  keywords: [
    'Cerebrum scholarship',
    'NEET coaching scholarship',
    'biology coaching scholarship',
    'merit scholarship NEET',
    'need-based NEET scholarship',
    'NEET fee waiver',
    'sibling discount NEET',
    'free NEET coaching scholarship',
    'NEET scholarship test',
    'biology coaching fee aid',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/scholarship' },
  openGraph: {
    title: 'Cerebrum Biology Scholarship | Cerebrum',
    description: 'Merit + need-based scholarships up to 100% fee waiver.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/scholarship',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cerebrum Biology Scholarship | Cerebrum',
    description: 'Merit + need-based aid up to 100% waiver.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
