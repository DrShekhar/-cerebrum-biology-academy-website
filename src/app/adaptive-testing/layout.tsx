import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adaptive Testing | NEET Practice Tests | Cerebrum Biology Academy',
  description:
    'AI-powered adaptive testing for NEET Biology preparation. Practice with personalized question difficulty that adjusts to your skill level.',
  openGraph: {
    title: 'Adaptive Testing | NEET Practice Tests',
    description:
      'AI-powered adaptive testing for NEET Biology preparation. Practice with personalized question difficulty.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/adaptive-testing',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function AdaptiveTestingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
