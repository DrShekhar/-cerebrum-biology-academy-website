import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Free Resources Hub - Study Materials, Timetables & Announcements | Cerebrum Biology Academy',
  description:
    'Access free NEET Biology study materials, class timetables, formula sheets, and important announcements. No login required. Download-free PDF viewing for all classes.',
  keywords: [
    'free NEET biology materials',
    'NEET biology study resources',
    'free biology notes',
    'NEET timetable',
    'biology formula sheet',
    'free NEET preparation',
    'Cerebrum Biology Academy resources',
    'Class 11 biology notes',
    'Class 12 biology notes',
    'NEET dropper resources',
  ],
  openGraph: {
    title: 'Free Resources Hub | Cerebrum Biology Academy',
    description:
      'Access free NEET Biology study materials, timetables, and announcements. No login required!',
    type: 'website',
    url: 'https://www.cerebrumbiologyacademy.com/free-resources',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/free-resources',
  },
}

export default function FreeResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
