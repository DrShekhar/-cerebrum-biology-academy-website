import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/wall-of-achievers' },

  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
