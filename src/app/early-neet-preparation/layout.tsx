import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/early-neet-preparation' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
