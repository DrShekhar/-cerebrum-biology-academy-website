import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/teacher/doubts' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
