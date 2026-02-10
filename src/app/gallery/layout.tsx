import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata = generatePageMetadata('gallery')

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
