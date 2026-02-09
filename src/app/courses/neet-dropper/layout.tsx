import { Metadata } from 'next'
import { HowToEnrollSchema, CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'NEET Dropper Batch 2025 | One Year Intensive Biology Program | Cerebrum',
  description:
    "Specialized NEET dropper batch for 2025. Complete Biology syllabus in 10 months, rank improvement strategies, 98% success rate. Join India's best NEET repeater program!",
  keywords: [
    'NEET dropper batch',
    'NEET repeater',
    'one year NEET coaching',
    'NEET second attempt',
    'dropper biology coaching',
    'NEET 2026 preparation',
    'rank improvement NEET',
    'Is NEET Biology coaching necessary for droppers',
    'Biology coaching for weak students',
    'NEET Biology revision classes',
  ],
  openGraph: {
    title: 'NEET Dropper Batch 2025 | Transform Your Rank in 10 Months',
    description:
      'Intensive 10-month program for NEET droppers. 98% qualification rate, personalized mentoring, rank improvement guarantee. Limited seats available!',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Dropper Batch 2025 | Cerebrum Biology Academy',
    description:
      'One year intensive program, 98% success, rank improvement strategies, AIIMS faculty',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
  },
}

export default function NEETDropperLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HowToEnrollSchema
        courseName="NEET Dropper Batch"
        courseUrl="https://cerebrumbiologyacademy.com/courses/neet-dropper"
      />
      <CourseWithHowToSchema
        courseName="NEET Dropper Batch - One Year Intensive"
        courseDescription="Specialized NEET dropper batch with complete Biology syllabus coverage in 10 months. Rank improvement strategies, personalized mentoring, and 98% success rate."
        courseUrl="https://cerebrumbiologyacademy.com/courses/neet-dropper"
        price={75000}
        duration="10 months"
        educationalLevel="12th Pass"
        syllabus={[
          'Complete Class 11 Biology Revision',
          'Complete Class 12 Biology Revision',
          'Human Physiology Deep Dive',
          'Genetics & Evolution Mastery',
          'Ecology & Environment',
          'Previous Year Paper Analysis',
          'Mock Test Series (100+ tests)',
          'Weak Area Improvement Program',
        ]}
      />
      {children}
    </>
  )
}
