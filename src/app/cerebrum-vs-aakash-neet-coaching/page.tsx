import { Metadata } from 'next'
import CerebrumVsAakashContent from './CerebrumVsAakashContent'

export const metadata: Metadata = {
  title: 'Cerebrum vs Aakash NEET Coaching | Compare Biology Classes Delhi NCR',
  description:
    'Compare Cerebrum vs Aakash for NEET Biology coaching in Delhi NCR. See detailed comparison of batch sizes (15-20 vs 100+), faculty credentials, fees, success rates, and why serious NEET aspirants choose specialized Biology coaching.',
  keywords: [
    'cerebrum vs aakash',
    'cerebrum vs aakash neet coaching',
    'aakash vs cerebrum comparison',
    'neet biology coaching comparison',
    'best neet coaching delhi ncr',
    'small batch neet coaching',
    'aakash alternative delhi',
    'specialized biology coaching',
    'neet coaching comparison 2026',
    'aakash or cerebrum which is better',
  ],
  openGraph: {
    title: 'Cerebrum vs Aakash NEET Coaching | Detailed Comparison 2026',
    description:
      'Side-by-side comparison of Cerebrum and Aakash for NEET Biology preparation. Compare batch sizes, faculty, fees, and success rates.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-neet-coaching',
    type: 'website',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og/cerebrum-vs-aakash.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum vs Aakash NEET Coaching Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerebrum vs Aakash NEET Coaching | Which is Better?',
    description: 'Detailed comparison for NEET Biology aspirants in Delhi NCR',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-neet-coaching',
  },
}

const faqs = [
  {
    question: 'What is the main difference between Cerebrum and Aakash for NEET Biology?',
    answer:
      'The primary difference is specialization and batch size. Cerebrum focuses exclusively on Biology with 15-20 students per batch, while Aakash offers all subjects with 100+ students per batch. This allows Cerebrum to provide deeper Biology coverage and personalized attention.',
  },
  {
    question: 'Is Cerebrum better than Aakash for NEET Biology preparation?',
    answer:
      'For Biology-specific preparation, Cerebrum offers advantages: smaller batches (15-20 vs 100+), AIIMS faculty teaching Biology directly, daily doubt-clearing sessions, and 98% success rate in Biology. Aakash is suitable for students wanting all subjects under one roof.',
  },
  {
    question: 'How do the fees compare between Cerebrum and Aakash?',
    answer:
      'Cerebrum offers specialized Biology coaching starting from Rs 45,000 to Rs 1,56,000 per year. Aakash comprehensive packages range from Rs 1.5 lakh to Rs 2.5 lakh per year for all subjects. Per subject, Cerebrum provides better value with smaller batches.',
  },
  {
    question: 'Can I join both Cerebrum and Aakash simultaneously?',
    answer:
      'Yes, many students join Aakash for Physics and Chemistry while attending Cerebrum specifically for Biology. Cerebrum offers flexible weekend and evening batches designed for students already enrolled elsewhere.',
  },
  {
    question: 'What are the faculty credentials at Cerebrum vs Aakash?',
    answer:
      'Cerebrum Biology is taught by Dr. Shekhar (AIIMS alumnus) with 15+ years of NEET teaching experience. Aakash has a larger faculty pool for all subjects, but individual teacher interaction may be limited due to batch sizes.',
  },
  {
    question: 'Which has a better success rate - Cerebrum or Aakash?',
    answer:
      'Cerebrum reports 98% success rate specifically for Biology section performance. Aakash has good overall selection rates but does not publish subject-specific success data. Both have produced top rankers.',
  },
  {
    question: 'Is Aakash affected by corporate restructuring?',
    answer:
      "Aakash was acquired by BYJU'S in 2021 and has seen organizational changes. Cerebrum operates as an independent institute focused solely on Biology coaching, offering stability in teaching methodology.",
  },
  {
    question: 'Where are Cerebrum centers located compared to Aakash?',
    answer:
      'Cerebrum has centers in South Extension, Rohini, Green Park, Gurugram, Noida, and Faridabad. Aakash has more centers across Delhi NCR. Both offer hybrid online-offline options.',
  },
]

export default function CerebrumVsAakashPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cerebrum vs Aakash NEET Coaching Comparison',
    description:
      'Detailed comparison of Cerebrum Biology Academy and Aakash Institute for NEET preparation in Delhi NCR',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy',
            description:
              'Specialized NEET Biology coaching with small batches of 15-20 students and AIIMS faculty',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Delhi NCR',
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'EducationalOrganization',
            name: 'Aakash Institute',
            description: 'Comprehensive NEET coaching for all subjects with large batch sizes',
          },
        },
      ],
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
        name: 'Compare Coaching',
        item: 'https://cerebrumbiologyacademy.com/compare',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cerebrum vs Aakash',
        item: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-neet-coaching',
      },
    ],
  }

  return (
    <>
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
      <CerebrumVsAakashContent faqs={faqs} />
    </>
  )
}
