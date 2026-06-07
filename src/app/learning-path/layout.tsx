import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personalized Learning Path | AI-Powered NEET Biology Coaching | Cerebrum',
  description:
    'AI-powered personalized learning path for NEET Biology — Cerebrum identifies your weak chapters, builds a custom daily plan, recommends NCERT pages, MCQ drills, and mock tests calibrated to your current level. Used by 5,000+ Cerebrum students.',
  keywords: [
    'NEET personalized learning path',
    'AI NEET biology coaching',
    'custom NEET study plan',
    'adaptive NEET preparation',
    'personalized biology coaching',
    'NEET weak chapter analysis',
    'NEET MCQ drill plan',
    'biology mock test cadence',
    'best AI tutor NEET biology',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/learning-path' },
  openGraph: {
    title: 'Personalized Learning Path | NEET Biology | Cerebrum',
    description: 'AI-powered weak-chapter analysis + custom daily NEET biology plan.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/learning-path',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Personalized Learning Path | Cerebrum',
    description: 'AI-driven NEET biology custom plan.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
