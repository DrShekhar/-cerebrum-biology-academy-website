import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  other: { 'article:modified_time': '2026-05-27' },
  alternates: { canonical: '/neet-coaching-pune' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
