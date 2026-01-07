import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BBO Preparation Online | British Biology Olympiad Coaching',
  description:
    'Expert BBO preparation online. British Biology Olympiad coaching with Campbell Biology. Gold medal preparation for UK sixth form students. 1:1 and batch options.',
  keywords: [
    'BBO preparation',
    'British Biology Olympiad',
    'BBO coaching',
    'UK biology olympiad',
    'BBO tutoring',
    'Royal Society of Biology',
    'biology olympiad UK',
    'IBO preparation UK',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/bbo-preparation/',
  },
  openGraph: {
    title: 'BBO Preparation Online | British Biology Olympiad Coaching',
    description:
      'Expert BBO preparation online. British Biology Olympiad coaching with Campbell Biology. Gold medal preparation for UK sixth form students.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function BBOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
