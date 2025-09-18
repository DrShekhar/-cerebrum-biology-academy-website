import { Metadata } from 'next'
import BrandIdentityGenerator from '@/components/brand/BrandIdentityGenerator'

export const metadata: Metadata = {
  title: 'Brand Studio | Cerebrum Biology Academy Design System',
  description:
    'Generate Harvard-level logos, icons, and brand assets with our AI-powered brand identity system. Professional design tools for educational excellence.',
  keywords:
    'brand identity, logo generator, icon design, brand guidelines, design system, educational branding',
  openGraph: {
    title: 'Brand Studio | Professional Logo & Icon Generator',
    description:
      'AI-powered brand identity generator for educational institutions. Create Harvard-level logos, icons, and brand assets.',
    images: ['/brand/brand-studio-og.jpg'],
  },
}

export default function BrandStudioPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <BrandIdentityGenerator />
    </div>
  )
}
