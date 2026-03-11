import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/neet-coaching-tagore-garden' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
