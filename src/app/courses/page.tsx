import { Metadata } from 'next'
import { FixedCourseSelector } from '@/components/courses/FixedCourseSelector'

export const metadata: Metadata = {
  title: 'NEET Biology Courses 2025 | Class 11, 12 & Dropper Batches | Cerebrum Academy',
  description:
    'Choose from 5+ NEET Biology courses: Class 11 Foundation, Class 12 Target, Dropper Batch, 2-Year Integrated. AIIMS faculty, 94.2% success rate. Enroll for 2025 batch now!',
  keywords:
    'NEET biology courses, Class 11 biology, Class 12 biology, dropper batch, 2 year program, NEET preparation, medical entrance coaching, biology courses',
  openGraph: {
    title: 'Best NEET Biology Courses | All Batches Available for 2025',
    description:
      'Class 11, Class 12, Dropper, Integrated programs. AIIMS expert faculty, 94.2% success rate, 2,847+ selections. Find your perfect course!',
    images: ['/og-images/courses-overview.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Courses 2025 | Cerebrum Academy',
    description: 'Class 11, 12, Dropper batches - AIIMS faculty, 94.2% success rate',
    images: ['/og-images/courses-overview.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses',
  },
}

export default function CoursesPage() {
  return <FixedCourseSelector />
}
