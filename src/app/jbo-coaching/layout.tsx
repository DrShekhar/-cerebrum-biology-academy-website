import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JBO Coaching Online | Japan Biology Olympiad Preparation - Cerebrum',
  description:
    'Expert JBO coaching for Japan Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent Japan at IBO.',
  keywords: [
    'jbo coaching',
    'japan biology olympiad',
    'jbo preparation',
    'biology olympiad japan',
    'jbo online classes',
    'japanese biology olympiad preparation',
    'ibo japan',
    'biology olympiad training japan',
    'jbo exam preparation',
    'campbell biology japan',
  ],
  openGraph: {
    title: 'JBO Coaching Online | Japan Biology Olympiad Preparation',
    description:
      'Expert JBO coaching for Japan Biology Olympiad. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_JP',
    url: 'https://cerebrumbiologyacademy.com/jbo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/jbo-coaching.png',
        width: 1200,
        height: 630,
        alt: 'JBO Coaching - Japan Biology Olympiad Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JBO Coaching Online | Japan Biology Olympiad',
    description: 'Expert coaching for Japan Biology Olympiad. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/jbo-coaching',
  },
}

export default function JBOCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
