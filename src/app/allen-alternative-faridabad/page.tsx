import { Metadata } from 'next'
import AllenAlternativeFaridabadContent from './AllenAlternativeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'Allen Alternative in Faridabad | Better NEET Biology Coaching',
  description:
    'Looking for Allen alternative in Faridabad? Cerebrum Biology Academy offers personalized NEET coaching with smaller batches (10-20 students), AIIMS faculty, and 98% success rate.',
  keywords: [
    'allen alternative faridabad',
    'allen coaching alternative faridabad',
    'better than allen faridabad',
    'allen vs cerebrum faridabad',
    'small batch neet coaching faridabad',
    'personalized neet coaching faridabad',
    'allen coaching problems faridabad',
    'switch from allen faridabad',
  ],
  openGraph: {
    title: 'Allen Alternative in Faridabad | Personalized NEET Biology Coaching',
    description:
      'Why 500+ Faridabad students chose Cerebrum over Allen for NEET Biology preparation.',
    url: 'https://cerebrumbiologyacademy.com/allen-alternative-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/allen-alternative-faridabad',
  },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over Allen for NEET Biology?',
    answer:
      'While Allen is a reputed institute, Cerebrum offers key advantages: smaller batches (10-20 vs 100+ at Allen), personalized attention from AIIMS faculty, Biology-only specialization for deeper coverage, and flexible online + offline options. Our 98% success rate speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from Allen Faridabad?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 10-20 students vs Allen's 80-100+. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Focus: Biology-specialized vs all subjects. 4) Doubt clearing: Daily 1-on-1 sessions vs crowded doubt counters. 5) Fee: More affordable with better value.",
  },
  {
    question: 'Can I join Cerebrum along with Allen for extra Biology support?',
    answer:
      "Absolutely! Many students complement their Allen coaching with Cerebrum's Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere. This combination gives you the best of both worlds.",
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
    question: 'Where is Cerebrum located in Faridabad?',
    answer: `Our center is at ${faridabadLocation.streetAddress}, ${faridabadLocation.addressLocality}. We're near Bata Chowk Metro (5 min walk), making it convenient for students from all parts of Faridabad.`,
  },
]

export default function AllenAlternativeFaridabadPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Allen Alternative in Faridabad - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs Allen Career Institute for NEET preparation in Faridabad',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      description:
        'Specialized NEET Biology coaching with small batches and personalized attention',
      address: {
        '@type': 'PostalAddress',
        streetAddress: faridabadLocation.streetAddress,
        addressLocality: faridabadLocation.addressLocality,
        addressRegion: faridabadLocation.addressRegion,
        postalCode: faridabadLocation.postalCode,
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
        name: 'NEET Coaching Faridabad',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Allen Alternative',
        item: 'https://cerebrumbiologyacademy.com/allen-alternative-faridabad',
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
      <AllenAlternativeFaridabadContent faqs={faqs} />
    </>
  )
}
