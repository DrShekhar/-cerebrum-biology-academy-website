import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata = generatePageMetadata('pricing')

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
