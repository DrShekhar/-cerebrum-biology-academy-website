import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CBO Coaching Online | Canadian Biology Olympiad Preparation',
  description:
    'Expert CBO coaching for Canadian Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent Canada at IBO.',
  keywords: [
    'cbo coaching',
    'canadian biology olympiad',
    'cbo preparation',
    'cbo tutor',
    'cbo tutor near me',
    'biology olympiad canada',
    'biology olympiad tutor canada',
    'biology olympiad tutor near me canada',
    'biology olympiad coaching near me',
    'cbo online classes',
    'canadian biology olympiad preparation',
    'ibo canada',
    'ibo tutor canada',
    'biology olympiad training canada',
    'cbo exam preparation',
    'campbell biology canada',
    'best biology olympiad tutor canada',
    'private cbo tutor',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cbo-coaching',
    languages: {
      en: 'https://cerebrumbiologyacademy.com/cbo-coaching',
      'en-CA': 'https://cerebrumbiologyacademy.com/cbo-coaching',
      'x-default': 'https://cerebrumbiologyacademy.com/cbo-coaching',
    },
  },
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
}

export default function CBOCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
