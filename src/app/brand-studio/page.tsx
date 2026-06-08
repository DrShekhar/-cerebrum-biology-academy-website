import { Metadata } from 'next'
import BrandIdentityGenerator from '@/components/brand/BrandIdentityGenerator'

export const metadata: Metadata = {
  title: 'Brand Studio Design System',
  description: 'Internal brand identity generator for Cerebrum Biology Academy.',
  robots: { index: false, follow: false },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Brand Studio Design System',
    description: 'Internal brand identity generator for Cerebrum Biology Academy.',
  },
}

export default function BrandStudioPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <BrandIdentityGenerator />
    </div>
  )
}
