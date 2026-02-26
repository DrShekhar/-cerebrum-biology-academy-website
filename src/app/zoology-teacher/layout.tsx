import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Zoology Teacher for NEET | Expert Zoology Coaching',
  description:
    'Expert zoology teacher for NEET preparation. Specialized coaching in animal biology, human physiology, genetics & ecology by AIIMS-trained faculty. Book free demo!',
  openGraph: {
    title: 'Best Zoology Teacher for NEET | Expert Zoology Coaching',
    description:
      'Expert zoology teacher for NEET preparation. Specialized coaching in animal biology, human physiology, genetics & ecology by AIIMS-trained faculty. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/zoology-teacher',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/zoology-teacher',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
