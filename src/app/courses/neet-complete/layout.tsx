import { Metadata } from 'next'
import { HowToEnrollSchema, CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'NEET Complete Program | 2-Year Integrated Biology Coaching',
  description:
    '2-year NEET Biology program for Class 11 & 12 at Cerebrum Academy. AIIMS faculty, 98% success rate, complete syllabus with adaptive tests. Enroll now!',
  keywords: [
    'NEET complete program',
    '2 year NEET coaching',
    'Class 11 12 NEET',
    'NEET biology coaching',
    'integrated NEET program',
    'NEET preparation course',
    'medical entrance coaching',
    'NEET Biology online + offline hybrid',
    'Biology coaching small batch size',
    'NEET Biology faculty qualification',
  ],
  openGraph: {
    title: 'Best 2-Year NEET Biology Complete Program | 98% Success Rate',
    description:
      'Comprehensive NEET Biology coaching for Class 11 & 12. AIIMS expert faculty, proven curriculum, 1,50,000+ students trained. Start your journey today!',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/neet-complete',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Complete 2-Year Program',
    description:
      '98% success rate, AIIMS faculty, complete NEET Biology preparation for Class 11-12',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/neet-complete',
  },
}

export default function NEETCompleteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HowToEnrollSchema
        courseName="NEET Complete 2-Year Program"
        courseUrl="https://cerebrumbiologyacademy.com/courses/neet-complete"
      />
      <CourseWithHowToSchema
        courseName="NEET Complete 2-Year Integrated Program"
        courseDescription="Comprehensive 2-year NEET Biology program for Class 11 & 12 students. AIIMS faculty, 98% success rate, complete syllabus coverage with adaptive tests."
        courseUrl="https://cerebrumbiologyacademy.com/courses/neet-complete"
        price={98000}
        duration="24 months"
        educationalLevel="Class 11-12"
        syllabus={[
          'Complete Class 11 Biology',
          'Complete Class 12 Biology',
          'NCERT Line-by-Line Coverage',
          'Previous Year Questions (15 years)',
          'Mock Test Series (200+ tests)',
          'Board Exam Preparation',
          'Doubt Clearing Sessions',
          'Personalized Mentoring',
        ]}
      />
      {children}
    </>
  )
}
