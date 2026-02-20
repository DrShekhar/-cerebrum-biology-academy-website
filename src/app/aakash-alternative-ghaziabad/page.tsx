import { Metadata } from 'next'
import AakashAlternativeGhaziabadContent from './AakashAlternativeGhaziabadContent'

const noidaAddress = 'B-45, Sector 62, Noida, UP 201301'

export const metadata: Metadata = {
  title: 'Aakash Alternative in Ghaziabad | Personalized NEET Biology Coaching',
  description:
    'Looking for Aakash alternative in Ghaziabad? Cerebrum Biology Academy offers personalized NEET coaching with smaller batches (10-20 students), AIIMS faculty, and 98% success rate. Near Ghaziabad via Blue Line Metro.',
  keywords: [
    'aakash alternative ghaziabad',
    'aakash coaching alternative ghaziabad',
    'better than aakash ghaziabad',
    'aakash vs cerebrum ghaziabad',
    'small batch neet coaching ghaziabad',
    'personalized neet coaching ghaziabad',
    'aakash indirapuram alternative',
    'switch from aakash ghaziabad',
    'aakash byju alternative ghaziabad',
  ],
  openGraph: {
    title: 'Aakash Alternative in Ghaziabad | Personalized NEET Biology Coaching',
    description:
      'Why Ghaziabad students chose Cerebrum over Aakash Indirapuram for NEET Biology preparation.',
    url: 'https://cerebrumbiologyacademy.com/aakash-alternative-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/aakash-alternative-ghaziabad',
  },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over Aakash Indirapuram for NEET Biology?',
    answer:
      'While Aakash Indirapuram is a reputed institute, Cerebrum offers key advantages: smaller batches (10-20 vs 80+ at Aakash), personalized attention from AIIMS faculty, Biology-only specialization for deeper coverage, and flexible online + offline options. Our 98% success rate speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from Aakash Indirapuram?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 10-20 students vs Aakash's 60-80+. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Focus: Biology-specialized vs all subjects. 4) Doubt clearing: Daily 1-on-1 sessions vs crowded doubt counters. 5) Fee: More affordable with better value.",
  },
  {
    question: 'Can I join Cerebrum along with Aakash for extra Biology support?',
    answer:
      "Absolutely! Many Ghaziabad students complement their Aakash Indirapuram coaching with Cerebrum's Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere. This combination gives you the best of both worlds.",
  },
  {
    question: 'What if I am not satisfied after switching from Aakash?',
    answer:
      "We offer a 7-day trial period for students switching from other institutes. Attend classes, interact with faculty, and if you're not satisfied, we'll refund your fees. We're confident you'll see the difference in personalized attention.",
  },
  {
    question: 'Is the fee structure better than Aakash Indirapuram?',
    answer:
      'Cerebrum offers competitive pricing with better value. Our fees range from ₹45,000 to ₹1,56,000 depending on the tier and program, often 30-40% lower than Aakash for comparable quality with significantly smaller batch sizes.',
  },
  {
    question: "Is Aakash affected by the BYJU's crisis?",
    answer:
      "Aakash was acquired by BYJU'S in 2021. While Aakash continues operations, some students prefer independent institutes like Cerebrum that are not part of large corporate structures. We focus purely on quality education without corporate distractions.",
  },
  {
    question: 'Where is Cerebrum located and how do Ghaziabad students reach there?',
    answer: `Our center is at ${noidaAddress}. Ghaziabad students can take the Blue Line Metro to Sector 62 station (15-20 min from Vaishali/Kaushambi). Easily accessible from Indirapuram, Vasundhara, Raj Nagar Extension, and Crossings Republik.`,
  },
]

export default function AakashAlternativeGhaziabadPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Aakash Alternative in Ghaziabad - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs Aakash Institute for NEET preparation for Ghaziabad students',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      description:
        'Specialized NEET Biology coaching with small batches and personalized attention',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B-45, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201301',
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
        name: 'NEET Coaching Ghaziabad',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Aakash Alternative',
        item: 'https://cerebrumbiologyacademy.com/aakash-alternative-ghaziabad',
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
      <AakashAlternativeGhaziabadContent faqs={faqs} />
    </>
  )
}
