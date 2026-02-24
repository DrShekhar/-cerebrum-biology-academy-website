import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free NEET Biology Demo Class | Book Now',
  description:
    'Book your FREE demo class for NEET Biology coaching by AIIMS faculty. 98% success rate, small batches of 15 students. Call +91 88264 44334.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Free NEET Biology Demo Class',
    description: 'Experience AIIMS faculty teaching. 98% success rate. Book your free demo now!',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Demo Class | Book Now',
    description: 'Book your FREE demo class for NEET Biology coaching by AIIMS faculty. 98% success rate, small batches of 15 students.',
  },
}

export default function NEETDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
