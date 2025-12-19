import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online NEET Coaching | Best Online Coaching for NEET 2026 | Cerebrum Biology Academy',
  description:
    "Join India's best online NEET coaching with AIIMS-trained faculty. Live interactive classes, recorded lectures, doubt sessions & complete study material. 2,500+ selections. Start your NEET preparation online today!",
  keywords: [
    'online neet coaching',
    'neet online coaching',
    'best online coaching for neet',
    'online best coaching for neet',
    'neet coaching online',
    'online neet preparation',
    'best online neet classes',
    'neet online coaching classes',
    'online coaching for neet 2025',
  ],
  openGraph: {
    title: 'Online NEET Coaching | Best Online Coaching for NEET 2026',
    description:
      "Join India's best online NEET coaching with AIIMS-trained faculty. Live classes, recorded lectures & complete study material.",
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online NEET Coaching | Best Online Coaching for NEET 2026',
    description:
      "Join India's best online NEET coaching with AIIMS-trained faculty. Live classes, recorded lectures & complete study material.",
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching',
  },
}

export default function OnlineNeetCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
