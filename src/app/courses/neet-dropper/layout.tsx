import { Metadata } from 'next'
import { HowToEnrollSchema, CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'NEET Dropper Batch 2026-2027 | One Year Intensive Biology Program',
  description:
    'NEET dropper batch 2026-2027 — complete Biology syllabus in 10 months with rank improvement strategies. 98% success rate at Cerebrum Academy. Enroll now!',
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
    title: 'NEET Dropper Batch 2026-2027 | Transform Your Rank in 10 Months',
    description:
      'Intensive 10-month program for NEET droppers. 98% qualification rate, personalized mentoring, rank improvement guarantee. Limited seats available!',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Dropper Batch 2026-2027',
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
                name: 'NEET Dropper',
                item: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
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
                name: 'What is the fee for NEET Dropper batch?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Pursuit \u20B970,000. Ascent \u20B990,000. Pinnacle \u20B91,56,000. EMI from \u20B95,833/month. Merit scholarships available.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much improvement can I expect as a repeater?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Average improvement: 120 marks. Our repeater students go from 400-500 to 600+ range. 92% success rate for droppers.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the Dropper batch schedule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '7 batches including both NEET Practice classes. 18 hrs/week, 720 total hours. Intensive Mon-Sun schedule options.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is it worth taking a drop year for NEET?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '65% of medical students took 2+ attempts. With structured coaching, drop year gives 80-150 marks improvement. 92% of our droppers qualify.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum different for droppers?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Personal rank improvement strategy, weakness analysis, 80+ mock tests, previous year toppers mentoring, mental wellness support.',
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
