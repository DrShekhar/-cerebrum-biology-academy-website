import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interactive NEET Biology Learning | Diagrams, Animations, Live Classes | Cerebrum',
  description:
    'Interactive NEET Biology learning at Cerebrum — live online classes with animated NCERT diagrams, voice-based question practice, AI doubt-clearing, ARIA agent for instant queries, interactive quizzes, and full-screen virtual whiteboard. Built for Class 11, 12, dropper batches.',
  keywords: [
    'interactive NEET biology learning',
    'NEET biology animations',
    'live biology classes',
    'biology virtual whiteboard',
    'AI doubt clearing biology',
    'ARIA biology agent',
    'voice-based NEET practice',
    'NEET biology diagrams',
    'interactive biology classroom',
    'best interactive NEET coaching',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/interactive-learning' },
  openGraph: {
    title: 'Interactive NEET Biology Learning | Cerebrum',
    description: 'Live classes + animations + AI doubt-clearing + voice practice.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/interactive-learning',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Interactive NEET Biology Learning | Cerebrum',
    description: 'Animations + AI + voice + interactive quizzes.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
