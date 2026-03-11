import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/teacher/questions' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
