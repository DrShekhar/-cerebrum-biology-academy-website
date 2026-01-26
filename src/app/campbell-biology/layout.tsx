import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Campbell Biology Online Coaching | 56 Chapters | Biology Olympiad & NEET Prep',
  description:
    'Expert online coaching for Campbell Biology. Master all 56 chapters for Biology Olympiad (USABO, BBO, IBO), NEET, MCAT, AP Biology & IB Biology. Personal tutoring by Dr. Shekhar Singh.',
  keywords: [
    'Campbell Biology online coaching',
    'Campbell Biology tutor',
    'Biology Olympiad preparation',
    'USABO preparation',
    'BBO preparation',
    'IBO coaching',
    'NEET Biology coaching',
    'MCAT Biology prep',
    'AP Biology tutor',
    'IB Biology coaching',
    'Campbell Biology chapters',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/campbell-biology/',
  },
  openGraph: {
    title: 'Campbell Biology Online Coaching | Cerebrum Academy',
    description:
      'Master Campbell Biology with expert tutoring. All 56 chapters covered for Olympiad, NEET, MCAT, AP & IB Biology.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

export default function CampbellBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
