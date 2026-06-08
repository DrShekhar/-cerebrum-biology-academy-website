import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/offline' },
  title: 'Offline',
  robots: { index: false, follow: false },

  twitter: { card: 'summary_large_image' as const },

  openGraph: { title: 'Offline', description: 'Offline', type: 'website', locale: 'en_IN' },
}

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
