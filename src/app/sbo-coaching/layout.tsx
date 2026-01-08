import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SBO Coaching Online | Singapore Biology Olympiad Preparation - Cerebrum',
  description:
    'Expert SBO coaching for Singapore Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent Singapore at IBO.',
  keywords: [
    'sbo coaching',
    'singapore biology olympiad',
    'sbo preparation',
    'biology olympiad singapore',
    'sbo online classes',
    'singapore biology olympiad preparation',
    'ibo singapore',
    'biology olympiad training singapore',
    'sbo exam preparation',
    'campbell biology singapore',
  ],
  openGraph: {
    title: 'SBO Coaching Online | Singapore Biology Olympiad Preparation',
    description:
      'Expert SBO coaching for Singapore Biology Olympiad. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_SG',
    url: 'https://cerebrumbiologyacademy.com/sbo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/sbo-coaching.png',
        width: 1200,
        height: 630,
        alt: 'SBO Coaching - Singapore Biology Olympiad Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBO Coaching Online | Singapore Biology Olympiad',
    description: 'Expert coaching for Singapore Biology Olympiad. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/sbo-coaching',
  },
}

export default function SBOCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
