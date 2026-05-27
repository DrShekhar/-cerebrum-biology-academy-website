import { Metadata } from 'next'
import AakashAlternativeGreaterNoidaContent from './AakashAlternativeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const noidaLocation = CONTACT_INFO.centers.noida

export const metadata: Metadata = {
  title: 'the 2nd-largest national NEET chain Alternative in Greater Noida | Personalized NEET Biology Coaching',
  description:
    'Looking for the 2nd-largest national NEET chain alternative in Greater Noida? Cerebrum Biology Academy offers personalized NEET coaching with smaller batches (10-20 students), AIIMS faculty, 19600+ MCQ bank, and 98% success rate. Online + hybrid available.',
  keywords: [
    'aakash alternative greater noida',
    'aakash coaching alternative greater noida',
    'better than aakash greater noida',
    'aakash vs cerebrum greater noida',
    'small batch neet coaching greater noida',
    'personalized neet coaching greater noida',
    'aakash knowledge park alternative',
    'switch from aakash greater noida',
    'neet biology specialist greater noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'the 2nd-largest national NEET chain Alternative in Greater Noida | Personalized NEET Biology Coaching',
    description:
      'Why Greater Noida students choose Cerebrum over the 2nd-largest national NEET chain Knowledge Park for NEET Biology preparation. Small batches, AIIMS faculty, 19600+ MCQ bank.',
    url: 'https://cerebrumbiologyacademy.com/aakash-alternative-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/aakash-alternative-greater-noida',
  },

  twitter: { card: 'summary_large_image' as const },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over the 2nd-largest national NEET chain Greater Noida for NEET Biology?',
    answer:
      'While the 2nd-largest national NEET chain Knowledge Park is a known institute, Cerebrum offers key advantages: smaller batches (10-20 vs 60-80+ at the 2nd-largest national NEET chain), personalized attention from AIIMS faculty, Biology-only specialization for deeper coverage, 19,600+ question MCQ bank, and flexible online + hybrid options for Greater Noida students. Our 98% success rate speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from the 2nd-largest national NEET chain Greater Noida?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 10-20 students vs the 2nd-largest national NEET chain's 60-80+ at Knowledge Park. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Focus: Biology-specialized vs all subjects. 4) Doubt clearing: Daily 1-on-1 sessions vs crowded doubt counters. 5) Fee: More affordable with better value.",
  },
  {
    question: 'Can I join Cerebrum along with the 2nd-largest national NEET chain for extra Biology support?',
    answer:
      "Absolutely! Many Greater Noida students complement their the 2nd-largest national NEET chain coaching with Cerebrum's Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere. This combination gives you the best of both worlds.",
  },
  {
    question: 'What if I am not satisfied after switching from the 2nd-largest national NEET chain Greater Noida?',
    answer:
      "We offer a 7-day trial period for students switching from other institutes. Attend classes, interact with faculty, and if you're not satisfied, we'll refund your fees. We're confident you'll see the difference in personalized attention.",
  },
  {
    question: 'Is the fee structure better than the 2nd-largest national NEET chain Greater Noida?',
    answer:
      'Cerebrum offers competitive pricing with better value. Our fees range from ₹45,000 to ₹1,56,000 depending on the tier and program, often 30-40% lower than the 2nd-largest national NEET chain Greater Noida (₹1.36L+) for comparable quality with significantly smaller batch sizes.',
  },
  {
    question: "Is the 2nd-largest national NEET chain affected by the BYJU's crisis?",
    answer:
      "the 2nd-largest national NEET chain was acquired by BYJU'S in 2021. While the 2nd-largest national NEET chain continues operations, some students prefer independent institutes like Cerebrum that are not part of large corporate structures. We focus purely on quality education without corporate distractions.",
  },
  {
    question: 'How can Greater Noida students access Cerebrum?',
    answer: `Greater Noida students can access Cerebrum via online + hybrid classes from home, or visit our Sector 62 Noida center (${noidaLocation.streetAddress}) via Aqua Line Metro connecting Greater Noida to Noida. Nearby areas served: Gaur City, Knowledge Park, Pari Chowk, Jaypee Greens, Greater Noida West, Alpha, Beta.`,
  },
]

export default function AakashAlternativeGreaterNoidaPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'the 2nd-largest national NEET chain Alternative in Greater Noida - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs SKY Coaching (2nd-largest national NEET chain) (Knowledge Park) for NEET preparation in Greater Noida',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      description:
        'Specialized NEET Biology coaching with small batches, personalized attention, and 19600+ MCQ bank',
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
        name: 'NEET Coaching Greater Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'the 2nd-largest national NEET chain Alternative',
        item: 'https://cerebrumbiologyacademy.com/aakash-alternative-greater-noida',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={['NEET Greater Noida', 'NEET Biology Greater Noida', 'Medical entrance coaching Greater Noida']}
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
      <AakashAlternativeGreaterNoidaContent faqs={faqs} />
    </>
  )
}
