import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CBO Coaching Online | Canadian Biology Olympiad Preparation - Cerebrum',
  description:
    'Expert CBO coaching for Canadian Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent Canada at IBO.',
  keywords: [
    'cbo coaching',
    'canadian biology olympiad',
    'cbo preparation',
    'biology olympiad canada',
    'cbo online classes',
    'canadian biology olympiad preparation',
    'ibo canada',
    'biology olympiad training canada',
    'cbo exam preparation',
    'campbell biology canada',
  ],
  openGraph: {
    title: 'CBO Coaching Online | Canadian Biology Olympiad Preparation',
    description:
      'Expert CBO coaching for Canadian Biology Olympiad. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://cerebrumbiologyacademy.com/cbo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/cbo-coaching.png',
        width: 1200,
        height: 630,
        alt: 'CBO Coaching - Canadian Biology Olympiad Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBO Coaching Online | Canadian Biology Olympiad',
    description: 'Expert coaching for Canadian Biology Olympiad. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cbo-coaching',
  },
}

export default function CBOCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
