import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/teacher/sessions' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
