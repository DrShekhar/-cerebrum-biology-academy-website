import { Metadata } from 'next'
import NEETDropperBatchContent from './NEETDropperBatchContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const noidaLocation = CONTACT_INFO.centers.noida

export const metadata: Metadata = {
  title: 'NEET Dropper Batch 2025-26 in Greater Noida | Repeater Course',
  description:
    'Join NEET Dropper Batch 2025-26 for Greater Noida students. Intensive 1-year program for NEET repeaters. Online + hybrid classes available. Previous attempt analysis, personalized strategy, expert faculty at Sector 62 Noida.',
  keywords: [
    'neet dropper batch greater noida',
    'neet repeater course greater noida',
    'neet dropper coaching greater noida',
    'neet second attempt greater noida',
    'neet dropper batch near me greater noida',
    'neet repeater batch greater noida 2025',
    'best dropper batch for neet greater noida',
    '1 year neet dropper course greater noida',
    'online neet dropper batch greater noida',
  ],
  openGraph: {
    title: 'NEET Dropper Batch 2025-26 for Greater Noida | Intensive Repeater Course',
    description:
      'Intensive 1-year NEET preparation for droppers and repeaters from Greater Noida. Online + hybrid available.',
    url: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-greater-noida',
  },
}

const faqs = [
  {
    question: 'What is the eligibility for NEET Dropper Batch 2025-26?',
    answer:
      'Any student who has appeared for NEET 2024 or 2025 and wants to improve their score is eligible. We analyze your previous attempt and create a personalized improvement plan. Greater Noida students can join online or hybrid mode.',
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
    question: 'Do you provide hostel facility for Greater Noida students?',
    answer:
      'We partner with nearby PG accommodations for outstation students. We can help arrange accommodation near our Sector 62 Noida center. Greater Noida students can also attend online + hybrid classes from home.',
  },
  {
    question: 'What is the batch timing?',
    answer:
      'Regular batch: 9 AM - 2 PM (6 days/week). We also have intensive batches with extended hours for students who need more practice. Online classes available in the same timings.',
  },
  {
    question: 'Where is the nearest center for Greater Noida students?',
    answer: `Our nearest center is at ${noidaLocation.streetAddress}, ${noidaLocation.addressLocality}. Greater Noida students can reach via Aqua Line Metro (connects to Noida), then Blue Line to Sector 62. Online + hybrid classes also available.`,
  },
]

export default function NEETDropperBatchGreaterNoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Dropper Batch 2025-26 - Greater Noida',
    description:
      'Intensive 1-year NEET preparation program for droppers and repeaters from Greater Noida targeting NEET 2026. Online + hybrid classes available.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: noidaLocation.streetAddress,
        addressLocality: noidaLocation.addressLocality,
        addressRegion: noidaLocation.addressRegion,
        postalCode: noidaLocation.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Post-12th',
    teaches: ['NEET Biology', 'Previous Attempt Analysis', 'Score Improvement Strategy'],
    timeRequired: 'P1Y',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching Greater Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Dropper Batch 2025-26',
        item: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-greater-noida',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NEETDropperBatchContent faqs={faqs} />
    </>
  )
}
