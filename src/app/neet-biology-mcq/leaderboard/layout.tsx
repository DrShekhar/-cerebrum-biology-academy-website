import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-biology-mcq/leaderboard' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
