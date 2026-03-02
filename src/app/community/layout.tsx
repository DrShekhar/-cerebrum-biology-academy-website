import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community - Cerebrum Biology Academy',
  robots: { index: false, follow: true },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
