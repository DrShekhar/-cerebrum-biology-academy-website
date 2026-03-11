import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/online-neet-coaching' },
}

export default function OnlineNEETCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
