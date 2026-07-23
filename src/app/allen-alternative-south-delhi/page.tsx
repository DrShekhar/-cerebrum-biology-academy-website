import { Metadata } from 'next'
import AllenAlternativeContent from './AllenAlternativeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const southExtensionCenter = CONTACT_INFO.centers.southExtension

export const metadata: Metadata = {
  title: 'Allen Alternative in South Delhi | NEET Biology Coaching',
  description:
    'Looking for an Allen alternative in South Delhi? Cerebrum Biology Academy is the biology-only specialist near AIIMS — small batches (15-20 students), AIIMS-trained faculty, 98% success rate. Minutes from Allen Lajpat Nagar and Kalu Sarai.',
  keywords: [
    'allen alternative south delhi',
    'allen coaching alternative lajpat nagar',
    'better than allen south delhi',
    'allen vs cerebrum south delhi',
    'small batch neet coaching south delhi',
    'personalized neet coaching south delhi',
    'biology specialist coaching south delhi',
    'switch from allen south delhi',
    'allen kalu sarai alternative',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Allen Alternative in South Delhi | NEET Biology Coaching',
    description:
      'Why South Delhi students comparing Allen choose Cerebrum — the biology-only specialist minutes from Allen Lajpat Nagar and Kalu Sarai.',
    url: 'https://cerebrumbiologyacademy.com/allen-alternative-south-delhi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/allen-alternative-south-delhi',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Allen Alternative in South Delhi | NEET Biology Coaching',
    description:
      'Looking for an Allen alternative in South Delhi? Cerebrum Biology Academy is the biology-only specialist near AIIMS — small batches (15-20 students), AIIMS-trained faculty, and 9...',
  },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over Allen for NEET Biology?',
    answer:
      'Allen is a reputed integrated institute. Cerebrum is an alternative for students who want a biology specialist: smaller batches (15-20 vs 80-100+ at Allen), personalized attention from AIIMS-trained faculty, Biology-only specialization for deeper coverage, and flexible classroom + live online options. Biology alone is 360 of the 720 NEET marks, and our 98% success rate speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from Allen in South Delhi?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 15-20 students vs Allen's 80-100+. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Focus: Biology-specialized vs all subjects. 4) Doubt clearing: Daily 1-on-1 sessions vs crowded doubt counters. 5) Fee: More affordable with better value.",
  },
  {
    question: 'Can I join Cerebrum along with Allen for extra Biology support?',
    answer:
      "Absolutely! Many students keep their integrated Physics-Chemistry preparation at Allen and add Cerebrum's Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere. Our South Extension flagship is a short ride from both Allen Lajpat Nagar and the Kalu Sarai hub.",
  },
  {
    question: 'What if I am not satisfied after switching from Allen?',
    answer:
      "We offer a 7-day trial period for students switching from other institutes. Attend classes, interact with faculty, and if you're not satisfied, we'll refund your fees. We're confident you'll see the difference in personalized attention.",
  },
  {
    question: 'Is the fee structure better than Allen?',
    answer:
      'Cerebrum offers competitive pricing with better value. Our fees range from ₹45,000 to ₹1,56,000 depending on the tier and program, often 20-30% lower than Allen for comparable quality with significantly smaller batch sizes.',
  },
  {
    question: 'What coaching options do NEET aspirants in South Delhi have?',
    answer:
      "South Delhi has several integrated institutes: Allen operates from Lajpat Nagar and Kalu Sarai, Aakash has a major centre in South Extension Part 1 and a Kalu Sarai hub, and Amity (AICE) also runs programs in South Delhi. Cerebrum is different by design — a biology-only specialist with small batches, for students who want depth in the subject that carries 360 of NEET's 720 marks.",
  },
  {
    question: 'I live in a PG in Ber Sarai, Katwaria Sarai, or Lajpat Nagar. Can I attend?',
    answer:
      'Absolutely. Many outstation students living in the PG belts of Ber Sarai, Katwaria Sarai, and Lajpat Nagar compare the big integrated coachings and choose Cerebrum for Biology. South Extension is a short ride from all three, and every batch is also available live online.',
  },
  {
    question: 'Where is Cerebrum located in South Delhi?',
    answer: `Our flagship centre is at ${southExtensionCenter.streetAddress}, New Delhi 110049 — near AIIMS and steps from South Extension Metro, minutes from Allen Lajpat Nagar and the Kalu Sarai coaching hub. We also have a second South Delhi centre at B-113 Gulmohar Park (Green Park).`,
  },
]

export default function AllenAlternativeSouthDelhiPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Allen Alternative in South Delhi - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs Allen for NEET preparation in South Delhi',
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
        name: 'Allen Alternative',
        item: 'https://cerebrumbiologyacademy.com/allen-alternative-south-delhi',
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
        pageSlug="allen-alternative-south-delhi"
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
      <AllenAlternativeContent faqs={faqs} />
    </>
  )
}
