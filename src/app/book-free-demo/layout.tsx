import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo/metadata'

const baseMetadata = generatePageMetadata('bookDemo')
export const metadata: Metadata = {
  ...baseMetadata,
  robots: { index: true, follow: true },

  twitter: { card: 'summary_large_image' as const },
}

export default function BookFreeDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
