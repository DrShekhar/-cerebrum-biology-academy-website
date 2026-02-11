import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AP Biology to NEET Biology Bridge | Cerebrum Academy',
  description: 'Specialized bridge course for AP Biology students preparing for NEET. Expert faculty, comprehensive gap analysis, proven 98% conversion rate.',
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology to NEET Biology Bridge',
    description: 'Specialized bridge course for AP Biology students preparing for NEET. Expert faculty, comprehensive gap analysis, proven 98% conversion rate.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
