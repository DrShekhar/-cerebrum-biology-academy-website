import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-coaching-chennai' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
