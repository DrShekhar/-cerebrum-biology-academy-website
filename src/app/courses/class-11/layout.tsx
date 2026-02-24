import { Metadata } from 'next'
import { HowToEnrollSchema, CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'Class 11 Biology NEET Coaching | Foundation Program 2026-2027',
  description:
    'Best Class 11 Biology coaching for NEET preparation. Strong foundation building, NCERT mastery, board exam excellence. AIIMS faculty, 98% success rate. Enroll for 2026-2027 batch!',
  keywords: [
    'Class 11 biology',
    'NEET foundation',
    'Class 11 NEET coaching',
    'biology tuition',
    'NCERT biology',
    'board exam preparation',
    'NEET Class 11',
    'biology classes',
    'Biology coaching for weak students',
    'NEET Biology revision classes',
    'Biology doubt clearing classes',
  ],
  openGraph: {
    title: 'Class 11 Biology NEET Foundation | Build Strong Fundamentals',
    description:
      "Start your NEET journey with India's best Class 11 Biology coaching. AIIMS faculty, complete NCERT coverage, board + competitive exam preparation.",
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/class-11',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 11 Biology NEET Foundation',
    description: 'AIIMS faculty, NCERT mastery, board + NEET preparation, 98% success rate',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/class-11',
  },
}

export default function Class11Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HowToEnrollSchema
        courseName="Class 11 NEET Biology Foundation"
        courseUrl="https://cerebrumbiologyacademy.com/courses/class-11"
      />
      <CourseWithHowToSchema
        courseName="Class 11 NEET Biology Foundation"
        courseDescription="Comprehensive Class 11 Biology coaching for NEET preparation. Build strong fundamentals with NCERT mastery, board exam excellence, and early competitive preparation."
        courseUrl="https://cerebrumbiologyacademy.com/courses/class-11"
        price={48000}
        duration="10 months"
        educationalLevel="Class 11"
        syllabus={[
          'The Living World',
          'Biological Classification',
          'Plant Kingdom',
          'Animal Kingdom',
          'Morphology of Flowering Plants',
          'Anatomy of Flowering Plants',
          'Structural Organisation in Animals',
          'Cell: The Unit of Life',
          'Biomolecules',
          'Cell Cycle and Cell Division',
        ]}
      />
      {children}
    </>
  )
}
