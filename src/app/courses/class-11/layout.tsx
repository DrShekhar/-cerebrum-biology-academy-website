import { Metadata } from 'next'
import { HowToEnrollSchema, CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'Class 11 Biology Coaching | Online & Offline | NEET + Board Foundation',
  description:
    'Class 11 Biology coaching — online + offline (South Delhi · Gurugram · Faridabad). AIIMS-trained faculty, NCERT-line-by-line foundation, NEET + Board dual prep, Olympiad track available. WhatsApp +91 88264 44334 for the next batch.',
  keywords: [
    'class 11 biology coaching',
    'class 11 biology online classes',
    'class 11 biology offline classes',
    'class 11 biology tuition',
    'class 11 biology coaching south delhi',
    'class 11 biology coaching gurugram',
    'class 11 biology coaching faridabad',
    'NEET foundation class 11',
    'class 11 NEET biology coaching',
    'class 11 board NEET combined',
    'class 11 biology olympiad foundation',
    'NCERT biology class 11',
    'biology tutor class 11 near me',
  ],
  openGraph: {
    title: 'Class 11 Biology Coaching — Online & Offline | NEET + Board Foundation',
    description:
      'AIIMS-trained Class 11 Biology coaching — online classes everywhere, offline at South Delhi · Gurugram · Faridabad. Complete NCERT foundation, NEET + Board dual prep, Olympiad track.',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/class-11',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 11 Biology Coaching — Online & Offline',
    description: 'AIIMS faculty. Online + offline (Delhi NCR). NCERT foundation. NEET + Board + Olympiad.',
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
                name: 'Class 11th NEET',
                item: 'https://cerebrumbiologyacademy.com/courses/class-11',
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
                name: 'What is the fee for Class 11 NEET Biology?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Pursuit \u20B948,000/year. Ascent \u20B976,000/year. Pinnacle \u20B998,000/year. EMI available from \u20B94,000/month.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many hours per week for Class 11 NEET?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '12 hours/week with 480 total teaching hours. 5 batch options: Gurugram, South Ext, Rohini + Online.',
                },
              },
              {
                '@type': 'Question',
                name: 'What syllabus is covered in Class 11 NEET Biology?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Complete NCERT Class 11: Diversity, Classification, Plant & Animal Kingdom, Cell Biology, Biomolecules, Plant Physiology, Human Physiology \u2014 15 modules total.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who teaches Class 11 NEET at Cerebrum?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dr. Shekhar C Singh, AIIMS alumnus. Student Sadhna Sirin scored 695/720 (100%ile). 98% success rate.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the batch schedule for Class 11?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '5 regular batches + NEET Practice Class (Fri 8:30-9:30 PM). Timings: Mon/Wed evening, Sat/Sun morning/afternoon/evening, Tue/Thu at Rohini.',
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
