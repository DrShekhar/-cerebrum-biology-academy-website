import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 12 NEET Biology Coaching | Board + NEET Preparation',
  description:
    'Expert Class 12 Biology coaching for CBSE boards and NEET preparation. Integrated curriculum by AIIMS faculty. Master Biology for both board exams and NEET 2027.',
  keywords: [
    'Class 12 Biology coaching',
    'NEET preparation class 12',
    'CBSE Biology class 12',
    'Board and NEET preparation',
    '12th Biology tuition',
    'NEET Biology coaching',
  ],
  openGraph: {
    title: 'Class 12 NEET Biology Coaching | Board + NEET Preparation',
    description:
      'Expert Class 12 Biology coaching for CBSE boards and NEET preparation. Integrated curriculum by AIIMS faculty.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/class-12',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 12 NEET Biology Coaching | Board + NEET Preparation',
    description: 'Expert Class 12 Biology coaching for CBSE boards and NEET preparation. Integrated curriculum by AIIMS faculty.',
  },
}

export default function Class12Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
