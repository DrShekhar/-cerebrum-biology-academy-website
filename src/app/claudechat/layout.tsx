import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ClaudeChat Board | AI-Powered NEET Biology Tutor | Cerebrum',
  description:
    'Try ClaudeChat — Cerebrum\'s 24/7 AI-powered NEET Biology learning assistant. Instant doubt resolution, NCERT-aligned explanations, voice & text interactions. Free to use.',
  keywords: [
    'ClaudeChat',
    'AI NEET biology tutor',
    'AI biology chatbot',
    'NEET doubt resolution AI',
    'Cerebrum AI assistant',
    'free AI biology tutor',
    'Claude AI biology',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/claudechat' },
  openGraph: {
    title: 'ClaudeChat Board | AI-Powered NEET Biology Tutor | Cerebrum',
    description: '24/7 AI assistant for NEET Biology doubt resolution.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/claudechat',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'ClaudeChat Board | Cerebrum',
    description: 'AI NEET Biology tutor — instant NCERT doubt resolution.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
