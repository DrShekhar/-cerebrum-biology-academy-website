import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Portal | Cerebrum Biology Academy',
  description:
    'Access your Cerebrum Biology Academy student dashboard. View courses, track progress, access study materials, and manage your NEET preparation journey.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
