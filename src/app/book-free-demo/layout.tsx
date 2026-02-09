import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata = generatePageMetadata('bookDemo')

export default function BookFreeDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
