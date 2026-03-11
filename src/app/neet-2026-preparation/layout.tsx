import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-2026-preparation' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
