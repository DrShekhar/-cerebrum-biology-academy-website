import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CNBO Coaching Online | Chinese National Biology Olympiad - Cerebrum',
  description:
    'Expert CNBO coaching for Chinese National Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent China at IBO.',
  keywords: [
    'cnbo coaching',
    'chinese biology olympiad',
    'cnbo preparation',
    'biology olympiad china',
    'cnbo online classes',
    'chinese national biology olympiad',
    'ibo china',
    'biology olympiad training china',
    'cnbo exam preparation',
    'campbell biology china',
  ],
  openGraph: {
    title: 'CNBO Coaching Online | Chinese National Biology Olympiad',
    description:
      'Expert CNBO coaching for Chinese National Biology Olympiad. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_CN',
    url: 'https://cerebrumbiologyacademy.com/cnbo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/cnbo-coaching.png',
        width: 1200,
        height: 630,
        alt: 'CNBO Coaching - Chinese National Biology Olympiad Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CNBO Coaching Online | Chinese National Biology Olympiad',
    description: 'Expert coaching for Chinese National Biology Olympiad. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cnbo-coaching',
  },
}

export default function CNBOCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
