import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/compare/class-9-vs-class-10-foundation' },

  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
