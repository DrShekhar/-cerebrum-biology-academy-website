import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Chat | Cerebrum (Internal)',
  description: 'Internal Claude AI chat interface for Cerebrum Biology Academy.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/claudechat' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
