import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/teacher/test-assignment/create' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
