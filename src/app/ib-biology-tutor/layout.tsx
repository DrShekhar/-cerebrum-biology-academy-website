import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/ib-biology-tutor' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
