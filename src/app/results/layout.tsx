import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata = generatePageMetadata('results')

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
