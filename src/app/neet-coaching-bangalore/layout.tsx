import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-coaching-bangalore' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
