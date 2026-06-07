import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Analytics Dashboard | Cerebrum',
  description: 'Internal student performance analytics dashboard.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/resources/analytics' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
