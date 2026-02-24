import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Online | Online NEET Preparation & Coaching',
  description:
    "Start your NEET online preparation with India's top Biology faculty. Live classes, video lectures, mock tests & personalized mentoring. Join 1,50,000+ students preparing NEET online!",
  keywords: [
    'neet online',
    'neet online preparation',
    'neet online study',
    'neet online learning',
    'neet online platform',
    'best neet online',
    'neet online coaching',
    'neet 2025 online',
  ],
  openGraph: {
    title: 'NEET Online | Online NEET Preparation & Coaching',
    description:
      "Start your NEET online preparation with India's top Biology faculty. Live classes, video lectures & mock tests.",
    url: 'https://cerebrumbiologyacademy.com/neet-online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Online | Online NEET Preparation & Coaching',
    description:
      "Start your NEET online preparation with India's top Biology faculty. Live classes, video lectures & mock tests.",
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-online',
  },
}

export default function NeetOnlineLayout({ children }: { children: React.ReactNode }) {
  return children
}
