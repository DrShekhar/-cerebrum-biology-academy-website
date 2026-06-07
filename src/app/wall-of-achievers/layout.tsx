import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wall of Achievers | NEET, IB, AP, USABO, IBO Biology Toppers | Cerebrum Biology Academy',
  description:
    'Cerebrum Biology Academy student achievements wall — NEET 720/720 scorers, AIIMS Delhi selections, IB Biology 7s, AP Biology 5s, USABO Semi-Finalists, INBO qualifiers, OCSC trainees. Real students, real ranks, real college admissions across India, USA, UK, UAE, Canada, Singapore.',
  keywords: [
    'Cerebrum Biology Academy toppers',
    'NEET toppers wall',
    'AIIMS Delhi selections',
    'NEET 720 scorers',
    'IB Biology 7 scorers',
    'AP Biology 5 scorers',
    'USABO semi-finalist Cerebrum',
    'INBO qualifier Cerebrum',
    'OCSC trainee',
    'biology olympiad winners',
    'Dr. Shekhar C Singh students',
    'Cerebrum wall of achievers',
    'NEET biology toppers India',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/wall-of-achievers' },
  openGraph: {
    title: 'Wall of Achievers | Cerebrum Biology Academy',
    description:
      'Real student wins across NEET, IB, AP, USABO, INBO, IBO. 98% NEET qualification rate.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/wall-of-achievers',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Wall of Achievers | Cerebrum Biology Academy',
    description: 'Real NEET, IB, AP, USABO toppers from Cerebrum Biology Academy.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
