import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Crash Course 2026 | 3-Month Intensive Biology Program | Cerebrum',
  description:
    'Intensive 3-month NEET crash course for Biology. Complete syllabus revision, 100+ mock tests, daily practice sessions. By AIIMS faculty. Limited seats. Enroll now!',
  keywords: [
    'NEET crash course',
    'NEET crash course 2026',
    'NEET 3 month course',
    'NEET intensive batch',
    'NEET Biology crash course',
    'NEET quick revision',
    'NEET last minute preparation',
    'NEET Biology revision course',
    'NEET short term course',
    'NEET Biology intensive program',
  ],
  openGraph: {
    title: 'NEET Crash Course 2026 | 3-Month Intensive Biology Program',
    description:
      'Intensive 3-month NEET crash course for Biology. Complete syllabus revision by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/neet-crash-course',
  },
}

export default function CrashCourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
