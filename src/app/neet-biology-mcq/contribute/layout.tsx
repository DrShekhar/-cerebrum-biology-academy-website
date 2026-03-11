import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-biology-mcq/contribute' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
