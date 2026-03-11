import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/parent/concerns' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
