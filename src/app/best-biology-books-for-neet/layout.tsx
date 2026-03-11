import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/best-biology-books-for-neet' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
