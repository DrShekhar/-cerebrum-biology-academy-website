import { Metadata } from 'next'
import NEETDropperBatchContent from './NEETDropperBatchContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'NEET Dropper Batch 2026-27 in Gurugram | Repeater Course',
  description:
    'Join NEET Dropper Batch 2026-27 in Gurugram. Intensive 1-year program for NEET repeaters. Previous attempt analysis, personalized strategy, expert faculty at Sector 51.',
  keywords: [
    'neet dropper batch 2026-27 gurugram',
    'neet repeater course gurugram',
    'neet dropper coaching gurugram',
    'neet second attempt gurugram',
    'neet dropper batch near me',
    'neet repeater batch gurugram 2025',
    'best dropper batch for neet gurugram',
    '1 year neet dropper course gurugram',
  ],
  openGraph: {
    title: 'NEET Dropper Batch 2026-27 in Gurugram | Intensive Repeater Course',
    description: 'Intensive 1-year NEET preparation for droppers and repeaters in Gurugram.',
    url: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-2026-27-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-2026-27-gurugram',
  },
}

const faqs = [
  {
    question: 'What is the eligibility for NEET Dropper Batch 2026-27?',
    answer:
      'Any student who has appeared for NEET 2024 or 2025 and wants to improve their score is eligible. We analyze your previous attempt and create a personalized improvement plan.',
  },
  {
    question: 'What makes your dropper batch different?',
    answer:
      'We focus on previous attempt analysis, identifying weak areas, and targeted improvement. Our smaller batch size (max 20) ensures personalized attention. We have helped students improve by 100-200 marks in their second attempt.',
  },
  {
    question: 'What is the fee and duration?',
    answer:
      'Dropper/Repeater Batch fees range from ₹90,000 to ₹1,56,000/year depending on your goal, current level, and the work needed to reliably achieve your target score. Tiers: Pursuit (₹70,000, 30-40 students), Ascent (₹90,000, 16-18 students), or Pinnacle ZA (₹1,56,000, 10-12 students with personal mentorship from Dr. Shekhar). All include study materials, test series, and doubt sessions.',
  },
  {
    question: 'Do you provide hostel facility?',
    answer:
      'We partner with nearby PG accommodations for outstation students. We can help arrange accommodation near our Sector 51 center.',
  },
  {
    question: 'What is the batch timing?',
    answer:
      'Regular batch: 9 AM - 2 PM (6 days/week). We also have intensive batches with extended hours for students who need more practice.',
  },
  {
    question: 'Where is the Gurugram center?',
    answer: `Our center is at ${gurugramLocation.streetAddress}, ${gurugramLocation.addressLocality}, same building as Allen Career Institute.`,
  },
]

export default function NEETDropperBatch2025GurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Dropper Batch 2026-27 - Gurugram',
    description: 'Intensive 1-year NEET preparation program for droppers and repeaters targeting NEET 2026.',
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
    teaches: ['NEET Biology', 'Previous Attempt Analysis', 'Score Improvement Strategy'],
    timeRequired: 'P1Y',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Offline',
      courseWorkload: '6 days/week intensive classes',
      startDate: '2025-07-01',
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
      { '@type': 'ListItem', position: 3, name: 'Dropper Batch 2026-27', item: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-2026-27-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NEETDropperBatchContent faqs={faqs} />
    </>
  )
}
