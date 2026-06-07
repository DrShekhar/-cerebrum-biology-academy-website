import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simple Test Generator | Cerebrum (Internal)',
  description: 'Internal NEET Biology test generator demo.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/simple-test-gen' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
