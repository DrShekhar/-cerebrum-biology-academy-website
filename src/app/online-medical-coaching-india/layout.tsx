import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/online-medical-coaching-india' },

  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
