import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Counselor Dashboard PoC | Cerebrum (Internal)',
  description: 'Internal counselor pipeline management proof-of-concept.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/counselor-poc' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
