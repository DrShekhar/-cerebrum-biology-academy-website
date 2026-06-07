import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Status | Cerebrum Biology Academy',
  description: 'Internal payment status page for Cerebrum Biology Academy enrollments.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/payment-status' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
