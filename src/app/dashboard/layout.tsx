import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Dashboard | Cerebrum Biology Academy',
  description: 'Internal student dashboard for Cerebrum Biology Academy enrolled students.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/dashboard' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
