import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Doubt Solving | AI + Live Faculty Doubt Clearing | Cerebrum',
  description:
    'NEET Biology doubt solving at Cerebrum — instant AI-powered doubt resolution via ARIA agent, weekly 1:1 doubt slots with AIIMS-trained Dr. Shekhar C Singh, WhatsApp 24/7 support, screen-share live sessions for complex doubts. All 38 NCERT chapters covered.',
  keywords: [
    'NEET biology doubt solving',
    'NEET biology doubt clearing',
    'AI biology doubt solver',
    'free NEET biology doubts',
    'ARIA biology agent',
    'WhatsApp NEET doubt support',
    '1:1 biology doubt session',
    'live NEET doubt clearing',
    'AIIMS faculty doubt solving',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/resources/doubt' },
  openGraph: {
    title: 'NEET Biology Doubt Solving | Cerebrum',
    description: 'AI ARIA agent + 1:1 AIIMS faculty + WhatsApp 24/7 + live screen-share.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/resources/doubt',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Doubt Solving | Cerebrum',
    description: 'AI ARIA + 1:1 AIIMS faculty + WhatsApp.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
