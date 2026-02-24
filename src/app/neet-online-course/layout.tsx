import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Online Course | Complete NEET Preparation Course Online',
  description:
    'Enroll in comprehensive NEET online course with complete syllabus coverage. Video lectures, practice tests, study material & doubt support. 98% success rate. Start your NEET journey today!',
  keywords: [
    'neet online course',
    'online neet course',
    'neet course online',
    'neet preparation course online',
    'best neet online course',
    'neet biology online course',
    'complete neet course online',
    'neet 2025 online course',
  ],
  openGraph: {
    title: 'NEET Online Course | Complete NEET Preparation Course Online',
    description:
      'Enroll in comprehensive NEET online course with complete syllabus coverage. Video lectures, practice tests & study material.',
    url: 'https://cerebrumbiologyacademy.com/neet-online-course',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Online Course | Complete NEET Preparation Course Online',
    description:
      'Enroll in comprehensive NEET online course with complete syllabus coverage. Video lectures, practice tests & study material.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-online-course',
  },
}

export default function NeetOnlineCourseLayout({ children }: { children: React.ReactNode }) {
  return children
}
