import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/demo-booking/reschedule' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
