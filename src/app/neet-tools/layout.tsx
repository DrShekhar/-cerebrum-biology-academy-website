import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free NEET Tools 2026 - Rank Predictor, College Finder & Study Planner',
  description:
    'Free NEET 2026 preparation tools including Rank Predictor, College Predictor, Study Plan Generator, and more. AI-powered tools to maximize your NEET score.',
  keywords: [
    'NEET tools',
    'NEET 2026 tools',
    'NEET rank predictor',
    'NEET college predictor',
    'NEET study planner',
    'free NEET preparation tools',
    'NEET calculator',
    'NEET marks calculator',
    'NEET preparation app',
    'NEET 2026 preparation',
  ],
  openGraph: {
    title: 'Free NEET Tools 2026 - Rank Predictor, College Finder & More',
    description:
      'All-in-one NEET preparation tools. Free rank predictor, college finder, study planner, and practice tests.',
    url: 'https://cerebrumbiologyacademy.com/neet-tools',
    type: 'website',
    images: [
      {
        url: '/images/neet-tools.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Preparation Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Tools 2026',
    description:
      'All NEET preparation tools in one place. Rank predictor, college finder, study planner & more.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-tools',
  },
}

export default function NEETToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
