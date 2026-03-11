import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/offline' },
  title: 'Offline',
  robots: { index: false, follow: false },
}

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
