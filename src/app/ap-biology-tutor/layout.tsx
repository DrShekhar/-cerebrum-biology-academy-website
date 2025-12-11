import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata('apBiologyTutor')

export default function APBiologyTutorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
