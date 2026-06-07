import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color Palette | Cerebrum Design System (Internal)',
  description: 'Internal color palette + design reference for Cerebrum Biology Academy.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/color-palette' },
  twitter: { card: 'summary_large_image' as const },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
