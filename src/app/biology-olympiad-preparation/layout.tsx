import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Olympiad Preparation | IBO, USABO, BBO Coaching | Cerebrum',
  description:
    'Expert Biology Olympiad preparation for IBO, USABO, BBO, and national olympiads. Structured curriculum, past paper practice, and mentorship from olympiad medalists.',
  keywords: [
    'biology olympiad preparation',
    'IBO preparation',
    'USABO coaching',
    'BBO preparation',
    'biology olympiad coaching',
    'international biology olympiad',
    'olympiad biology tutor',
    'biology competition preparation',
  ],
  openGraph: {
    title: 'Biology Olympiad Preparation | IBO, USABO, BBO',
    description:
      'Comprehensive biology olympiad coaching. Expert mentors, structured curriculum, past papers. Prepare for IBO, USABO, BBO & national olympiads.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Olympiad Preparation | Cerebrum Academy',
    description: 'Expert coaching for IBO, USABO, BBO. Mentorship from olympiad medalists.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
  },
}

export default function BiologyOlympiadPreparationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
