import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-coaching-dwarka-sector-6' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
