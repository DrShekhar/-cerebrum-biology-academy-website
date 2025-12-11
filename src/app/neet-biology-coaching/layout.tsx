import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching | Best NEET Biology Classes | 98% Success Rate',
  description:
    'Expert NEET Biology coaching by AIIMS alumni. 98% success rate, 2500+ selections. Live classes, study materials, mock tests. Best NEET biology preparation for 2026.',
  keywords: [
    'neet biology coaching',
    'neet biology classes',
    'best neet coaching',
    'neet preparation',
    'neet biology tutor',
    'online neet coaching',
    'neet classes near me',
    'biology for neet',
    'neet 2026 preparation',
  ],
  openGraph: {
    title: 'NEET Biology Coaching | Best NEET Biology Classes | 98% Success Rate',
    description:
      'Expert NEET Biology coaching by AIIMS alumni. 98% success rate, 2500+ selections. Live classes, study materials, mock tests.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/neet-biology-coaching',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching | 98% Success Rate',
    description:
      'Expert NEET Biology coaching by AIIMS alumni. 2500+ selections. Best preparation for NEET 2026.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-biology-coaching',
  },
}

export default function NEETBiologyCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
