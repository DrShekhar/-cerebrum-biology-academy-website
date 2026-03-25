import { Metadata } from 'next'
import { HowToEnrollSchema, CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'Class 12 Biology NEET Coaching | Target 2026-2027 Batch',
  description:
    'Class 12 NEET Biology coaching at Cerebrum Academy. Complete syllabus, previous year papers, mock tests, AIIMS faculty, 98% success rate. Enroll now!',
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
    title: 'Class 12 Biology NEET Target Batch 2026-2027',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Courses',
                item: 'https://cerebrumbiologyacademy.com/courses',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Class 12th NEET',
                item: 'https://cerebrumbiologyacademy.com/courses/class-12',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the fee for Class 12 NEET Biology?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Pursuit \u20B970,000/year. Ascent \u20B976,000/year. Pinnacle \u20B998,000/year. EMI from \u20B95,833/month.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does Class 12 course cover both board and NEET?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Dual preparation with strategic time management. 12 modules covering Reproduction, Genetics, Evolution, Biotechnology, Ecology.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is Class 12 different from Class 11 course?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Class 12 is intensive \u2014 focuses on high-weightage NEET topics (Genetics 20%, Human Physiology 18%). Includes 60+ mock tests and board exam preparation.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who teaches Class 12 NEET at Cerebrum?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dr. Shekhar C Singh, AIIMS alumnus, 15+ years. Former Academic Head at Narayana Group.',
                },
              },
              {
                '@type': 'Question',
                name: 'What batch timings for Class 12?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '4 regular batches + NEET Practice XII (Fri 9:30-10:30 PM). Locations: Gurugram, South Ext, Rohini + Online.',
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
