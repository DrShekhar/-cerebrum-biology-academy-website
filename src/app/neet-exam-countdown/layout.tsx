import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET 2026 Exam Countdown | Days Left for NEET UG 2026',
  description:
    'Live countdown to NEET 2026 exam (May 3, 2026). Track days left, get study time calculator, preparation phase guidance, streak tracker, and important dates timeline. Free NEET preparation tool.',
  keywords: [
    'NEET 2026 countdown',
    'NEET exam date 2026',
    'days left for NEET 2026',
    'NEET 2026 preparation',
    'NEET countdown timer',
    'NEET UG 2026',
    'NEET exam countdown',
    'how many days left for NEET',
  ],
  openGraph: {
    title: 'NEET 2026 Exam Countdown | Days Left for NEET UG 2026',
    description:
      'Live countdown to NEET 2026 exam. Track preparation progress, study hours, and important dates.',
    type: 'website',
    url: 'https://www.cerebrumbiologyacademy.com/neet-exam-countdown',
    images: [
      {
        url: 'https://www.cerebrumbiologyacademy.com/og-neet-countdown.png',
        width: 1200,
        height: 630,
        alt: 'NEET 2026 Exam Countdown Timer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET 2026 Exam Countdown | Days Left',
    description: 'Live countdown to NEET 2026. Track your preparation progress.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-exam-countdown',
  },
}

export default function NEETExamCountdownLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
