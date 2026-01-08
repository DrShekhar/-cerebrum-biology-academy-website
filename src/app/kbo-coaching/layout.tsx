import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KBO Coaching Online | Korean Biology Olympiad Preparation - Cerebrum',
  description:
    'Expert KBO coaching for Korean Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent South Korea at IBO.',
  keywords: [
    'kbo coaching',
    'korean biology olympiad',
    'kbo preparation',
    'biology olympiad korea',
    'kbo online classes',
    'korean biology olympiad preparation',
    'ibo korea',
    'biology olympiad training korea',
    'kbo exam preparation',
    'campbell biology korea',
  ],
  openGraph: {
    title: 'KBO Coaching Online | Korean Biology Olympiad Preparation',
    description:
      'Expert KBO coaching for Korean Biology Olympiad. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_KR',
    url: 'https://cerebrumbiologyacademy.com/kbo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/kbo-coaching.png',
        width: 1200,
        height: 630,
        alt: 'KBO Coaching - Korean Biology Olympiad Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KBO Coaching Online | Korean Biology Olympiad',
    description: 'Expert coaching for Korean Biology Olympiad. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/kbo-coaching',
  },
}

export default function KBOCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
