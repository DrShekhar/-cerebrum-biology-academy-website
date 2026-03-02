import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Lectures - Cerebrum Biology Academy',
  robots: { index: false, follow: true },
}

export default function VideoLecturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
