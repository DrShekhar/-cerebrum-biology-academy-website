import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/online-medical-coaching-india' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
