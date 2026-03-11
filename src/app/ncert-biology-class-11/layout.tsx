import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/ncert-biology-class-11' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
