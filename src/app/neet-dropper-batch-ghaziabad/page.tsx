import { Metadata } from 'next'
import NEETDropperBatchGhaziabadContent from './NEETDropperBatchGhaziabadContent'

export const metadata: Metadata = {
  title: 'NEET Dropper Batch 2026-27 in Ghaziabad | Repeater Course',
  description:
    'Join NEET Dropper Batch 2026-27 for Ghaziabad students. Intensive 1-year program for NEET repeaters. Previous attempt analysis, personalized strategy, expert faculty at Sector 62 Noida.',
  keywords: [
    'neet dropper batch 2026-27 ghaziabad',
    'neet repeater course ghaziabad',
    'neet dropper coaching ghaziabad',
    'neet second attempt ghaziabad',
    'neet dropper batch near me ghaziabad',
    'neet repeater batch ghaziabad 2025',
    'best dropper batch for neet ghaziabad',
    '1 year neet dropper course ghaziabad',
  ],
  openGraph: {
    title: 'NEET Dropper Batch 2026-27 in Ghaziabad | Intensive Repeater Course',
    description: 'Intensive 1-year NEET preparation for droppers and repeaters from Ghaziabad.',
    url: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-ghaziabad',
  },
}

const faqs = [
  {
    question: 'What is the eligibility for NEET Dropper Batch 2026-27 for Ghaziabad students?',
    answer:
      'Any student who has appeared for NEET 2024 or 2025 and wants to improve their score is eligible. We analyze your previous attempt and create a personalized improvement plan.',
  },
  {
    question: 'What makes your dropper batch different?',
    answer:
      'We focus on previous attempt analysis, identifying weak areas, and targeted improvement. Our smaller batch size (max 20) ensures personalized attention. We have helped students improve by 100-200 marks in their second attempt.',
  },
  {
    question: 'What is the fee and duration for Ghaziabad dropper students?',
    answer:
      'Dropper/Repeater Batch fees range from ₹90,000 to ₹1,56,000/year depending on your goal, current level, and the work needed to reliably achieve your target score. Tiers: Pursuit (₹70,000, 30-40 students), Ascent (₹90,000, 16-18 students), or Pinnacle ZA (₹1,56,000, 10-12 students with personal mentorship from Dr. Shekhar). All include study materials, test series, and doubt sessions.',
  },
  {
    question: 'Do you provide hostel facility for Ghaziabad outstation students?',
    answer:
      'We partner with nearby PG accommodations for outstation students. We can help arrange accommodation near our Sector 62 Noida center. Ghaziabad students can also commute daily via Blue Line Metro.',
  },
  {
    question: 'What is the batch timing?',
    answer:
      'Regular batch: 9 AM - 2 PM (6 days/week). We also have intensive batches with extended hours for students who need more practice.',
  },
  {
    question: 'How do Ghaziabad students reach the center?',
    answer:
      'Our center is at B-45, Sector 62, Noida, UP 201301. Blue Line Metro from Vaishali or Kaushambi station to Sector 62 (15-20 min). Easily accessible from all Ghaziabad areas including Indirapuram, Vasundhara, Raj Nagar Extension.',
  },
]

export default function NEETDropperBatchGhaziabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Dropper Batch 2026-27 - Ghaziabad',
    description:
      'Intensive 1-year NEET preparation program for droppers and repeaters from Ghaziabad targeting NEET 2026.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B-45, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201301',
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching Ghaziabad',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Dropper Batch 2026-27',
        item: 'https://cerebrumbiologyacademy.com/neet-dropper-batch-ghaziabad',
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
      <NEETDropperBatchGhaziabadContent faqs={faqs} />
    </>
  )
}
