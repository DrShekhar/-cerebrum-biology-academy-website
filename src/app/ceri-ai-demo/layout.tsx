import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ceri AI — NEET Biology AI Tutor Demo | Cerebrum Biology Academy',
  description:
    'Try Ceri AI live — the next-generation NEET Biology AI tutor from Cerebrum. Ask any Class 11-12 NCERT biology question, get instant explanations, voice replies, visual diagrams, and personalized doubt resolution. AIIMS-faculty-trained, 24/7 available, free demo.',
  keywords: [
    'Ceri AI demo',
    'NEET biology AI tutor',
    'AI biology tutor demo',
    'NEET AI doubt solving',
    'biology AI chatbot',
    'Cerebrum Ceri AI',
    'free AI biology tutor',
    'NEET biology voice AI',
    'NCERT biology AI',
    'AI Class 11 12 biology',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/ceri-ai-demo' },
  openGraph: {
    title: 'Ceri AI — NEET Biology AI Tutor Demo | Cerebrum',
    description:
      'Try the AI tutor live — instant NCERT biology doubt resolution with voice + visual diagrams.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/ceri-ai-demo',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Ceri AI Demo | Cerebrum',
    description: 'NEET Biology AI tutor — try live, free.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
