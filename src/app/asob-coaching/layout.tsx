import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ASOB Coaching Online | Australian Science Olympiad Biology',
  description:
    'Expert ASOB coaching for Australian Science Olympiad Biology. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent Australia at IBO.',
  keywords: [
    'asob coaching',
    'australian science olympiad biology',
    'asob preparation',
    'biology olympiad australia',
    'asob online classes',
    'australian biology olympiad preparation',
    'ibo australia',
    'biology olympiad training australia',
    'asoe exam preparation',
    'campbell biology australia',
  ],
  openGraph: {
    title: 'ASOB Coaching Online | Australian Science Olympiad Biology',
    description:
      'Expert ASOB coaching for Australian Science Olympiad Biology. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_AU',
    url: 'https://cerebrumbiologyacademy.com/asob-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/asob-coaching.png',
        width: 1200,
        height: 630,
        alt: 'ASOB Coaching - Australian Science Olympiad Biology Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASOB Coaching Online | Australian Science Olympiad Biology',
    description: 'Expert coaching for Australian Science Olympiad Biology. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/asob-coaching',
  },
}

export default function ASOBCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
