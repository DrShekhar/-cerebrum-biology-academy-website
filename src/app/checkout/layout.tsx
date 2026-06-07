import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | Cerebrum Biology Academy',
  description: 'Internal course enrollment checkout flow.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/checkout' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
