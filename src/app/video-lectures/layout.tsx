import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Lectures - Cerebrum Biology Academy',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/video-lectures',
  },

  robots: { index: true, follow: true },
}

export default function VideoLecturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
