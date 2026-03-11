import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/trueman-biology-for-neet' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
