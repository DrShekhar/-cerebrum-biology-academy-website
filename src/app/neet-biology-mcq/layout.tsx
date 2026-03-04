import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Biology MCQ Practice | NEET, NCERT, Olympiad — 19,000+ Questions',
  description:
    '19,000+ free Biology MCQs for NEET, Class 11-12 NCERT, and Olympiad. PYQs, topic-wise practice, gamification, and leaderboards. Start practicing now!',
  openGraph: {
    title: 'Free Biology MCQ Practice | NEET, NCERT, Olympiad — 19,000+ Questions',
    description:
      '19,000+ free Biology MCQs for NEET, Class 11-12 NCERT, and Olympiad. PYQs, topic-wise practice, gamification, and leaderboards.',
  },
}

export default function NEETBiologyMCQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
