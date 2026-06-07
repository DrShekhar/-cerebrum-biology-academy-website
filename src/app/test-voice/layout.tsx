import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voice Test Board | Cerebrum (Internal)',
  description: 'Internal voice/audio testing dashboard.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/test-voice' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
