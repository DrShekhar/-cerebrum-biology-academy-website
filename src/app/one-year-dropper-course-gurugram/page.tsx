import { Metadata } from 'next'
import OneYearDropperCourseContent from './OneYearDropperCourseContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'One Year NEET Dropper Course in Gurugram | Intensive Program',
  description:
    'One year intensive NEET dropper course in Gurugram. Complete syllabus revision, 5000+ questions practice, daily tests. Transform your NEET score at Sector 51 center.',
  keywords: [
    'one year neet dropper course gurugram',
    '1 year neet course gurugram',
    'neet repeater one year program',
    'intensive neet course dropper',
    'full year neet coaching gurugram',
    'neet dropper program gurugram',
    'neet improvement course gurugram',
    'long term neet dropper batch',
  ],
  openGraph: {
    title: 'One Year NEET Dropper Course in Gurugram | Complete Transformation',
    description: 'Intensive 1-year NEET program designed for droppers to achieve their dream score.',
    url: 'https://cerebrumbiologyacademy.com/one-year-dropper-course-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/one-year-dropper-course-gurugram',
  },
}

const faqs = [
  {
    question: 'What is covered in the One Year Dropper Course?',
    answer:
      'Complete NEET syllabus revision with 3 cycles: Foundation (4 months), Consolidation (4 months), and Revision (4 months). Includes 5000+ question practice, weekly tests, and 30+ mock tests.',
  },
  {
    question: 'How is this different from regular coaching?',
    answer:
      'This course is specifically designed for repeaters. We analyze your previous attempt, identify weak areas, and create a personalized improvement plan. The pace is faster as basic concepts are already covered.',
  },
  {
    question: 'What is the success rate for droppers?',
    answer:
      'Our droppers show an average improvement of 100-150 marks. Last year, 78% of our dropper students cleared NEET cutoff, with 35% scoring above 600.',
  },
  {
    question: 'What is the batch schedule?',
    answer:
      'Classes run 6 days a week, 5-6 hours daily. Morning batch (9 AM - 2 PM) and evening self-study sessions with doubt clearing available.',
  },
  {
    question: 'What is the fee structure?',
    answer:
      'Dropper/Repeater Batch fees range from ₹90,000 to ₹1,56,000/year depending on your goal, current level, and the work needed to reliably achieve your target score. Tiers: Pursuit (₹70,000, 30-40 students), Ascent (₹90,000, 16-18 students), or Pinnacle ZA (₹1,56,000, 10-12 students with personal mentorship from Dr. Shekhar).',
  },
  {
    question: 'What study materials are provided?',
    answer:
      'Complete study material covering all chapters, 5000+ question bank, previous year papers (last 20 years), mock test series (50 tests), and revision notes.',
  },
  {
    question: 'Where is the center located?',
    answer: `Our center is at ${gurugramLocation.streetAddress}, ${gurugramLocation.addressLocality}. Same building as Allen Career Institute, easily accessible from all Gurugram areas.`,
  },
]

export default function OneYearDropperCourseGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'One Year NEET Dropper Course - Gurugram',
    description: 'Intensive one-year NEET preparation program for droppers with complete syllabus coverage and extensive practice.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: gurugramLocation.streetAddress,
        addressLocality: gurugramLocation.addressLocality,
        addressRegion: gurugramLocation.addressRegion,
        postalCode: gurugramLocation.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Post-12th',
    teaches: ['Complete NEET Biology', 'Question Practice', 'Test Taking Strategy', 'Score Improvement'],
    timeRequired: 'P1Y',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Offline',
      courseWorkload: '6 hours/day, 6 days/week',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'One Year Dropper Course', item: 'https://cerebrumbiologyacademy.com/one-year-dropper-course-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OneYearDropperCourseContent faqs={faqs} />
    </>
  )
}
