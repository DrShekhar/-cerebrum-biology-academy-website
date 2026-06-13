import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/portal' },
  title: 'Student Portal',
  description:
    'Access your Cerebrum Biology Academy student dashboard. View courses, track progress, access study materials, and manage your NEET preparation journey.',
  robots: {
    index: false,
    follow: false,
  },

  twitter: { card: 'summary_large_image' as const },

  openGraph: {
    title: 'Student Portal',
    description:
      'Access your Cerebrum Biology Academy student dashboard. View courses, track progress, access study materials, and manage your NEET preparation journey.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
