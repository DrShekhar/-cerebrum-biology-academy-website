import { Metadata } from 'next'
import AakashAlternativeContent from './AakashAlternativeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const southExtensionCenter = CONTACT_INFO.centers.southExtension

export const metadata: Metadata = {
  title: 'Aakash Alternative in South Delhi | NEET Biology Coaching',
  description:
    'Looking for an Aakash alternative in South Delhi? Cerebrum Biology Academy is the biology-only specialist across the road from Aakash South Extension — small batches (15-20 students), AIIMS-trained faculty, 98% success rate.',
  keywords: [
    'aakash alternative south delhi',
    'aakash coaching alternative south extension',
    'better than aakash south delhi',
    'aakash vs cerebrum south delhi',
    'small batch neet coaching south delhi',
    'personalized neet coaching south delhi',
    'biology specialist coaching south delhi',
    'switch from aakash south delhi',
    'aakash kalu sarai alternative',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Aakash Alternative in South Delhi | NEET Biology Coaching',
    description:
      'Why South Delhi students comparing Aakash choose Cerebrum — the biology-only specialist across the road from Aakash South Extension.',
    url: 'https://cerebrumbiologyacademy.com/aakash-alternative-south-delhi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/aakash-alternative-south-delhi',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Aakash Alternative in South Delhi | NEET Biology Coaching',
    description:
      'Looking for an Aakash alternative in South Delhi? Cerebrum Biology Academy is the biology-only specialist across the road from Aakash South Extension — small batches, AIIMS-trained f...',
  },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over Aakash for NEET Biology?',
    answer:
      'Aakash is a reputed integrated institute. Cerebrum is an alternative for students who want a biology specialist: smaller batches (15-20 vs 60-80+ at Aakash), personalized attention from AIIMS-trained faculty, Biology-only specialization for deeper coverage, and flexible classroom + live online options. Biology alone is 360 of the 720 NEET marks, and our 98% success rate speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from Aakash in South Delhi?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 15-20 students vs Aakash's 60-80+. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Focus: Biology-specialized vs all subjects. 4) Doubt clearing: Daily 1-on-1 sessions vs crowded doubt counters. 5) Fee: More affordable with better value.",
  },
  {
    question: 'Can I join Cerebrum along with Aakash for extra Biology support?',
    answer:
      "Absolutely! Many students keep their integrated Physics-Chemistry preparation at Aakash and add Cerebrum's Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere — and our flagship is literally across the road from Aakash South Extension Part 1.",
  },
  {
    question: 'What if I am not satisfied after switching from Aakash?',
    answer:
      "We offer a 7-day trial period for students switching from other institutes. Attend classes, interact with faculty, and if you're not satisfied, we'll refund your fees. We're confident you'll see the difference in personalized attention.",
  },
  {
    question: 'Is the fee structure better than Aakash?',
    answer:
      'Cerebrum offers competitive pricing with better value. Our fees range from ₹45,000 to ₹1,56,000 depending on the tier and program, often 30-40% lower than Aakash for comparable quality with significantly smaller batch sizes.',
  },
  {
    question: 'What coaching options do NEET aspirants in South Delhi have?',
    answer:
      "South Delhi has several integrated institutes: Aakash has a major centre in South Extension Part 1 and a hub in Kalu Sarai, Allen operates from Lajpat Nagar and Kalu Sarai, and Amity (AICE) also runs programs in South Delhi. Cerebrum is different by design — a biology-only specialist with small batches, for students who want depth in the subject that carries 360 of NEET's 720 marks.",
  },
  {
    question: 'I live in a PG in Ber Sarai, Katwaria Sarai, or Lajpat Nagar. Can I attend?',
    answer:
      'Absolutely. Many outstation students living in the PG belts of Ber Sarai, Katwaria Sarai, and Lajpat Nagar compare the big integrated coachings and choose Cerebrum for Biology. South Extension is a short ride from all three, and every batch is also available live online.',
  },
  {
    question: 'Where is Cerebrum located in South Delhi?',
    answer: `Our flagship centre is at ${southExtensionCenter.streetAddress}, New Delhi 110049 — near AIIMS and steps from South Extension Metro, directly across the road from Aakash South Extension Part 1. We also have a second South Delhi centre at B-113 Gulmohar Park (Green Park).`,
  },
]

export default function AakashAlternativeSouthDelhiPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Aakash Alternative in South Delhi - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs Aakash for NEET preparation in South Delhi',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      description:
        'Specialized NEET Biology coaching with small batches and personalized attention',
      address: {
        '@type': 'PostalAddress',
        streetAddress: southExtensionCenter.streetAddress,
        addressLocality: southExtensionCenter.addressLocality,
        addressRegion: southExtensionCenter.addressRegion,
        postalCode: southExtensionCenter.postalCode,
      },
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
        name: 'NEET Coaching South Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Aakash Alternative',
        item: 'https://cerebrumbiologyacademy.com/aakash-alternative-south-delhi',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET South Delhi',
          'NEET Biology South Delhi',
          'Medical entrance coaching South Delhi',
        ]}
      />
      <DelhiAreaSchema
        pageSlug="aakash-alternative-south-delhi"
        subArea="South Extension"
        subRegion="south"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AakashAlternativeContent faqs={faqs} />
    </>
  )
}
