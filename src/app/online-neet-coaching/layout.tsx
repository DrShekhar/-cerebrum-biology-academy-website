import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/online-neet-coaching' },

  twitter: { card: 'summary_large_image' as const },
}

export default function OnlineNEETCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
