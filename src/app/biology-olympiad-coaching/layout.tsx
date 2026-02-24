import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Olympiad Coaching | NSEB, IBO Preparation',
  description:
    'Expert Biology Olympiad coaching for NSEB, INBO, and IBO preparation. Learn college-level biology, compete internationally, and gain research exposure. Small batches, AIIMS-trained faculty. Book free demo!',
  keywords: [
    'biology olympiad coaching',
    'nseb coaching',
    'ibo preparation',
    'indian biology olympiad',
    'biology olympiad preparation',
    'inbo coaching',
    'international biology olympiad',
    'nseb preparation',
    'biology olympiad classes',
    'olympiad biology tutor',
  ],
  openGraph: {
    title: 'Biology Olympiad Coaching | NSEB, INBO, IBO',
    description:
      'Prepare for Biology Olympiad (NSEB → INBO → IBO) with expert coaching. College-level syllabus, international exposure, research opportunities.',
    url: 'https://cerebrumbiologyacademy.com/biology-olympiad-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Biology Olympiad Coaching',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Olympiad Coaching | NSEB, IBO Preparation',
    description:
      'Expert coaching for Biology Olympiad. NSEB → INBO → IBO pathway. College-level biology training.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-olympiad-coaching',
  },
}

export default function BiologyOlympiadCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
