import { Metadata } from 'next'
import { CoursesListingPage } from '@/components/courses/CoursesListingPage'

export const metadata: Metadata = {
  title: 'NEET Biology Courses | Class 11th, 12th & Dropper Batches',
  description:
    'Explore our comprehensive NEET biology courses for Class 11th, 12th, and dropper students. Expert AIIMS faculty, proven curriculum, and guaranteed results.',
  keywords:
    'NEET biology courses, Class 11th biology, Class 12th biology, dropper batch, NEET preparation, medical entrance coaching',
  openGraph: {
    title: 'NEET Biology Courses | Expert Faculty & Proven Results',
    description:
      'Join our NEET biology courses designed by AIIMS experts. Choose from Class 11th, 12th, or dropper batches with comprehensive curriculum.',
    images: ['/courses/neet-biology-courses-og.jpg'],
  },
}

export default function CoursesPage() {
  return <CoursesListingPage />
}
