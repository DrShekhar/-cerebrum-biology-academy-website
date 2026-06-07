import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Biology MCQ Practice | NEET, NCERT, Olympiad — 19,000+ Questions',
  description:
    '19,000+ free Biology MCQs for NEET, Class 11-12 NCERT, and Olympiad. PYQs, topic-wise practice, gamification, and leaderboards. Start practicing now!',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq',
  },

  openGraph: {
    title: 'Free Biology MCQ Practice | NEET, NCERT, Olympiad — 19,000+ Questions',
    description:
      '19,000+ free Biology MCQs for NEET, Class 11-12 NCERT, and Olympiad. PYQs, topic-wise practice, gamification, and leaderboards.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function NEETBiologyMCQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
