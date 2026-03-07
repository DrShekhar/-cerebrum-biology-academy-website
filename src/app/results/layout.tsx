import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Results & Success Stories | 98% Success Rate | Cerebrum Biology Academy',
  description:
    'See our NEET results and student success stories. 98% success rate, 67+ AIIMS selections, 15,000+ students mentored. Watch video testimonials and explore our wall of achievers.',
  keywords: [
    'NEET results',
    'Cerebrum Biology Academy results',
    'NEET success stories',
    'AIIMS selections',
    'NEET biology results',
    'student testimonials',
    'NEET toppers',
  ],
  openGraph: {
    title: 'Results & Success Stories | 98% Success Rate | Cerebrum Biology Academy',
    description:
      'See our NEET results and student success stories. 98% success rate, 67+ AIIMS selections.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Results & Success Stories | 98% Success Rate | Cerebrum Biology Academy',
    description: 'See our NEET results and student success stories.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/results',
  },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
