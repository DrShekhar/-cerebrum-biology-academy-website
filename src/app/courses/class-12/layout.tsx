import { Metadata } from 'next'
import { HowToEnrollSchema, CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'Class 12 Biology NEET Coaching | Target 2025 Batch',
  description:
    'Intensive Class 12 Biology coaching for NEET 2026. Complete syllabus, previous year papers, mock tests, 90+ marks guarantee. AIIMS faculty. Limited seats!',
  keywords: [
    'Class 12 biology',
    'NEET target batch',
    'Class 12 NEET coaching',
    'biology coaching',
    'NEET 2026',
    'board exam biology',
    'NEET preparation',
    'competitive biology',
    'NEET Biology revision classes',
    'Biology coaching with recorded lectures',
    'NEET Biology weekend batch Delhi',
  ],
  openGraph: {
    title: 'Class 12 Biology NEET Target Batch | Crack NEET 2026',
    description:
      'Final year intensive NEET Biology coaching. 98% qualification rate, board exam 90+ guarantee, complete syllabus + previous years. Book your seat now!',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/class-12',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 12 Biology NEET Target Batch 2025',
    description: 'Intensive NEET preparation, 90+ board marks guarantee, 98% success rate',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/class-12',
  },
}

export default function Class12Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HowToEnrollSchema
        courseName="Class 12 NEET Biology Target Batch"
        courseUrl="https://cerebrumbiologyacademy.com/courses/class-12"
      />
      <CourseWithHowToSchema
        courseName="Class 12 NEET Biology Target Batch"
        courseDescription="Intensive Class 12 Biology coaching for NEET 2026. Complete syllabus coverage with previous year papers, mock tests, and board exam 90+ guarantee."
        courseUrl="https://cerebrumbiologyacademy.com/courses/class-12"
        price={55000}
        duration="10 months"
        educationalLevel="Class 12"
        syllabus={[
          'Reproduction in Organisms',
          'Sexual Reproduction in Flowering Plants',
          'Human Reproduction',
          'Reproductive Health',
          'Principles of Inheritance',
          'Molecular Basis of Inheritance',
          'Evolution',
          'Human Health and Disease',
          'Biotechnology Principles & Applications',
          'Organisms and Populations',
          'Ecosystem',
          'Biodiversity and Conservation',
        ]}
      />
      {children}
    </>
  )
}
