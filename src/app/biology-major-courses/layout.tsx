import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/biology-major-courses' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
