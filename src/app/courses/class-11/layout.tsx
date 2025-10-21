import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 11 Biology NEET Coaching | Foundation Program 2025 | Cerebrum Academy',
  description:
    'Best Class 11 Biology coaching for NEET preparation. Strong foundation building, NCERT mastery, board exam excellence. AIIMS faculty, 94% success rate. Enroll for 2025 batch!',
  keywords:
    'Class 11 biology, NEET foundation, Class 11 NEET coaching, biology tuition, NCERT biology, board exam preparation, NEET Class 11, biology classes',
  openGraph: {
    title: 'Class 11 Biology NEET Foundation | Build Strong Fundamentals',
    description:
      "Start your NEET journey with India's best Class 11 Biology coaching. AIIMS faculty, complete NCERT coverage, board + competitive exam preparation.",
    images: ['/og-images/class-11-biology.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/class-11',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 11 Biology NEET Foundation | Cerebrum Academy',
    description: 'AIIMS faculty, NCERT mastery, board + NEET preparation, 94% success rate',
    images: ['/og-images/class-11-biology.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/class-11',
  },
}

export default function Class11Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
