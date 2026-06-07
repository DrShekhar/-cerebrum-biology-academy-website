import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test Learning Path | Cerebrum (Internal)',
  description: 'Internal personalized learning path testing page.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/test-learning' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
