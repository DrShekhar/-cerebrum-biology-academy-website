import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edexcel to NEET Biology Bridge',
  description: 'Specialized bridge course for Edexcel Biology students (IGCSE/A-Level) preparing for NEET. Expert faculty, comprehensive gap analysis, proven 98% conversion rate.',
  twitter: {
    card: 'summary_large_image',
    title: 'Edexcel to NEET Biology Bridge',
    description: 'Specialized bridge course for Edexcel Biology students (IGCSE/A-Level) preparing for NEET. Expert faculty, comprehensive gap analysis, proven 98% conversion rate.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
