import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IBO Preparation Online | International Biology Olympiad Coaching',
  description:
    'Expert IBO preparation for students worldwide. International Biology Olympiad coaching from IBO medalists and national team trainers. Prepare to compete with 80+ countries.',
  keywords: [
    'IBO preparation',
    'International Biology Olympiad',
    'IBO coaching',
    'biology olympiad international',
    'IBO training online',
    'biology olympiad gold medal',
    'IBO practical preparation',
    'international biology competition',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'IBO Preparation Online | International Biology Olympiad Coaching',
    description: 'Expert IBO preparation for students worldwide.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ibo-preparation',
  },
  openGraph: {
    title: 'IBO Preparation Online | International Biology Olympiad Coaching',
    description:
      'Expert IBO preparation for students worldwide. International Biology Olympiad coaching from IBO medalists and national team trainers.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function IBOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
