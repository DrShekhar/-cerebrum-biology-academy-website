import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-biology-mcq/daily-challenge' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
