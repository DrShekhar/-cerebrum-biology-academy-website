import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/ncert-fingertips-biology' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
