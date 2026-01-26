import { Metadata } from 'next'
import AllenAlternativeContent from './AllenAlternativeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'Allen Alternative in Gurugram | Better NEET Biology Coaching',
  description:
    'Looking for Allen alternative in Gurugram? Cerebrum Biology Academy offers personalized NEET coaching with smaller batches (10-20 students), AIIMS faculty, and 98% success rate.',
  keywords: [
    'allen alternative gurugram',
    'allen coaching alternative gurgaon',
    'better than allen gurugram',
    'allen vs cerebrum gurugram',
    'small batch neet coaching gurugram',
    'personalized neet coaching gurugram',
    'allen coaching problems gurugram',
    'switch from allen gurugram',
  ],
  openGraph: {
    title: 'Allen Alternative in Gurugram | Personalized NEET Biology Coaching',
    description: 'Why 500+ Gurugram students chose Cerebrum over Allen for NEET Biology preparation.',
    url: 'https://cerebrumbiologyacademy.com/allen-alternative-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/allen-alternative-gurugram',
  },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over Allen for NEET Biology?',
    answer:
      'While Allen is a reputed institute, Cerebrum offers key advantages: smaller batches (10-20 vs 100+ at Allen), personalized attention from AIIMS faculty, Biology-only specialization for deeper coverage, and flexible online + offline options. Our 98% success rate speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from Allen Gurugram?',
    answer:
      'Key differences: 1) Batch size: Cerebrum has 10-20 students vs Allen\'s 80-100+. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Focus: Biology-specialized vs all subjects. 4) Doubt clearing: Daily 1-on-1 sessions vs crowded doubt counters. 5) Fee: More affordable with better value.',
  },
  {
    question: 'Can I join Cerebrum along with Allen for extra Biology support?',
    answer:
      'Absolutely! Many students complement their Allen coaching with Cerebrum\'s Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere. This combination gives you the best of both worlds.',
  },
  {
    question: 'What if I am not satisfied after switching from Allen?',
    answer:
      'We offer a 7-day trial period for students switching from other institutes. Attend classes, interact with faculty, and if you\'re not satisfied, we\'ll refund your fees. We\'re confident you\'ll see the difference in personalized attention.',
  },
  {
    question: 'Is the fee structure better than Allen?',
    answer:
      'Cerebrum offers competitive pricing with better value. Our fees range from ₹45,000 to ₹1,56,000 depending on the tier and program, often 20-30% lower than Allen for comparable quality with significantly smaller batch sizes.',
  },
  {
    question: 'Where is Cerebrum located in Gurugram?',
    answer: `Our center is at ${gurugramLocation.streetAddress}, ${gurugramLocation.addressLocality}. We're in the same building as Allen Career Institute, making it convenient if you want to complement your Allen classes with our Biology coaching.`,
  },
]

export default function AllenAlternativeGurugramPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Allen Alternative in Gurugram - Cerebrum Biology Academy',
    description: 'Comparison of Cerebrum Biology Academy vs Allen Career Institute for NEET preparation in Gurugram',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      description: 'Specialized NEET Biology coaching with small batches and personalized attention',
      address: {
        '@type': 'PostalAddress',
        streetAddress: gurugramLocation.streetAddress,
        addressLocality: gurugramLocation.addressLocality,
        addressRegion: gurugramLocation.addressRegion,
        postalCode: gurugramLocation.postalCode,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'Allen Alternative', item: 'https://cerebrumbiologyacademy.com/allen-alternative-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AllenAlternativeContent faqs={faqs} />
    </>
  )
}
