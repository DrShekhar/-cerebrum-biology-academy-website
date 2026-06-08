import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voice AI Features Demo | NEET Biology | Cerebrum',
  description:
    'Try Cerebrum\'s voice-enabled NEET Biology AI — ask biology questions in your voice, get instant spoken explanations, navigate NCERT topics hands-free. Free demo.',
  keywords: [
    'voice AI biology tutor',
    'voice NEET biology assistant',
    'biology voice chatbot',
    'voice doubt solver NEET',
    'Cerebrum voice AI',
    'hands-free NEET prep',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/test-voice' },
  openGraph: {
    title: 'Voice AI Features Demo | NEET Biology | Cerebrum',
    description: 'Voice-enabled NEET Biology AI — ask in voice, get spoken explanations.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/test-voice',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Voice AI Features Demo | Cerebrum',
    description: 'Voice biology tutor — instant spoken NCERT explanations.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
