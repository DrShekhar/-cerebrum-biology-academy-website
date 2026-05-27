import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Community | Cerebrum Biology Academy',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/community',
  },

  robots: { index: false, follow: false },

  twitter: { card: 'summary_large_image' as const },

  openGraph: { title: 'Student Community | Cerebrum Biology Academy', description: 'Student Community | Cerebrum Biology Academy', type: 'website' },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
