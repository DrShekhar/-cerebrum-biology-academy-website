import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/international-biology-tutor' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
