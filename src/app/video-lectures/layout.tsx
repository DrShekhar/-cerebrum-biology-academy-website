import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Lectures - Cerebrum Biology Academy',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/video-lectures',
  },

  robots: { index: true, follow: true },

  twitter: { card: 'summary_large_image' as const },

  openGraph: { title: 'Video Lectures - Cerebrum Biology Academy', description: 'Video Lectures - Cerebrum Biology Academy', type: 'website' },
}

export default function VideoLecturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
