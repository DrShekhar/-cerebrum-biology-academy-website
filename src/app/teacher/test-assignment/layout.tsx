import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/teacher/test-assignment' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
