import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/purchase/failed' },

  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
