import { Metadata } from 'next'
import AakashAlternativeNoidaContent from './AakashAlternativeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const noidaLocation = CONTACT_INFO.location.noida

export const metadata: Metadata = {
  title: 'the 2nd-largest national NEET chain Alternative in Noida | Personalized NEET Biology Coaching',
  description:
    'Looking for the 2nd-largest national NEET chain alternative in Noida? Cerebrum Biology Academy offers personalized NEET coaching with smaller batches (10-20 students), AIIMS faculty, and 98% success rate.',
  keywords: [
    'aakash alternative noida',
    'aakash coaching alternative noida',
    'better than aakash noida',
    'aakash vs cerebrum noida',
    'small batch neet coaching noida',
    'personalized neet coaching noida',
    'aakash coaching problems noida',
    'switch from aakash noida',
    'aakash byju alternative',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'the 2nd-largest national NEET chain Alternative in Noida | Personalized NEET Biology Coaching',
    description:
      'Why 400+ Noida students chose Cerebrum over the 2nd-largest national NEET chain for NEET Biology preparation.',
    url: 'https://cerebrumbiologyacademy.com/aakash-alternative-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/aakash-alternative-noida',
  },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over the 2nd-largest national NEET chain for NEET Biology?',
    answer:
      'While the 2nd-largest national NEET chain is a reputed institute, Cerebrum offers key advantages: smaller batches (10-20 vs 80+ at the 2nd-largest national NEET chain), personalized attention from AIIMS faculty, Biology-only specialization for deeper coverage, and flexible online + offline options. Our 98% success rate speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from the 2nd-largest national NEET chain Noida?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 10-20 students vs the 2nd-largest national NEET chain's 60-80+. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Focus: Biology-specialized vs all subjects. 4) Doubt clearing: Daily 1-on-1 sessions vs crowded doubt counters. 5) Fee: More affordable with better value. the 2nd-largest national NEET chain has centers in Sector 18 and Sector 62, but their batch sizes remain large.",
  },
  {
    question: 'Can I join Cerebrum along with the 2nd-largest national NEET chain for extra Biology support?',
    answer:
      "Absolutely! Many students complement their the 2nd-largest national NEET chain coaching with Cerebrum's Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere. This combination gives you the best of both worlds.",
  },
  {
    question: 'What if I am not satisfied after switching from the 2nd-largest national NEET chain?',
    answer:
      "We offer a 7-day trial period for students switching from other institutes. Attend classes, interact with faculty, and if you're not satisfied, we'll refund your fees. We're confident you'll see the difference in personalized attention.",
  },
  {
    question: 'Is the fee structure better than the 2nd-largest national NEET chain Noida?',
    answer:
      'Cerebrum offers competitive pricing with better value. Our fees range from ₹45,000 to ₹1,56,000 depending on the tier and program, often 30-40% lower than the 2nd-largest national NEET chain Noida for comparable quality with significantly smaller batch sizes.',
  },
  {
    question: "Is the 2nd-largest national NEET chain affected by the BYJU's crisis?",
    answer:
      "the 2nd-largest national NEET chain was acquired by BYJU'S in 2021. While the 2nd-largest national NEET chain continues operations, some students prefer independent institutes like Cerebrum that are not part of large corporate structures. We focus purely on quality education without corporate distractions.",
  },
  {
    question: 'Where is Cerebrum located in Noida?',
    answer: `Our center is at ${noidaLocation.streetAddress}, ${noidaLocation.addressLocality}. We're conveniently located near Sector 62 Metro Station (Blue Line), easily accessible from Sectors 18, 44, 50, 76, 78, Indirapuram, and Vaishali.`,
  },
]

export default function AakashAlternativeNoidaPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'the 2nd-largest national NEET chain Alternative in Noida - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs SKY Coaching (2nd-largest national NEET chain) for NEET preparation in Noida',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      description:
        'Specialized NEET Biology coaching with small batches and personalized attention',
      address: {
        '@type': 'PostalAddress',
        streetAddress: noidaLocation.streetAddress,
        addressLocality: noidaLocation.addressLocality,
        addressRegion: noidaLocation.addressRegion,
        postalCode: noidaLocation.postalCode,
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
        name: 'NEET Coaching Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'the 2nd-largest national NEET chain Alternative',
        item: 'https://cerebrumbiologyacademy.com/aakash-alternative-noida',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={['NEET Noida', 'NEET Biology Noida', 'Medical entrance coaching Noida']}
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
      <AakashAlternativeNoidaContent faqs={faqs} />
    </>
  )
}
