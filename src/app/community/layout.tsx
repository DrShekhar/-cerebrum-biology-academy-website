import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Community | Cerebrum Biology Academy',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/community',
  },

  robots: { index: false, follow: false },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
