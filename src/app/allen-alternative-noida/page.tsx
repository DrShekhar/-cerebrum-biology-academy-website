import { Metadata } from 'next'
import AllenAlternativeNoidaContent from './AllenAlternativeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const noidaLocation = CONTACT_INFO.location.noida

export const metadata: Metadata = {
  title: 'Allen Alternative in Noida | Better NEET Biology Coaching',
  description:
    'Looking for Allen alternative in Noida? Allen has no Noida-specific center. Cerebrum Biology Academy offers local personalized NEET coaching with smaller batches (10-20 students), AIIMS faculty, and 98% success rate.',
  keywords: [
    'allen alternative noida',
    'allen coaching alternative noida',
    'better than allen noida',
    'allen vs cerebrum noida',
    'small batch neet coaching noida',
    'personalized neet coaching noida',
    'allen coaching problems noida',
    'switch from allen noida',
  ],
  openGraph: {
    title: 'Allen Alternative in Noida | Personalized NEET Biology Coaching',
    description:
      'Why 500+ Noida students chose Cerebrum over Allen for NEET Biology preparation. Allen has no Noida center - Cerebrum does.',
    url: 'https://cerebrumbiologyacademy.com/allen-alternative-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/allen-alternative-noida',
  },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over Allen for NEET Biology in Noida?',
    answer:
      'While Allen is reputed, they have NO dedicated Noida center - students travel far to reach Allen centers. Cerebrum offers: local presence at Sector 62 Noida, smaller batches (10-20 vs 100+ at Allen), personalized attention from AIIMS faculty, Biology-only specialization. Our 98% success rate speaks for itself.',
  },
  {
    question: 'Does Allen have a center in Noida?',
    answer:
      "Allen Career Institute does not have a dedicated Noida center. Students from Noida often have to travel to distant centers, adding commute time and stress. Cerebrum's Sector 62 center gives you local access to AIIMS-level teaching without the commute burden.",
  },
  {
    question: 'How is Cerebrum different from Allen for Noida students?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 10-20 students vs Allen's 80-100+. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Local presence: Cerebrum is IN Noida, Allen requires commuting out. 4) Focus: Biology-specialized vs all subjects. 5) Fee: More affordable with better value.",
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
      'Cerebrum offers competitive pricing with better value. Our fees range from ₹45,000 to ₹1,56,000 depending on the tier and program, often 20-30% lower than Allen for comparable quality with significantly smaller batch sizes. Plus no commuting costs.',
  },
  {
    question: 'Where is Cerebrum located in Noida?',
    answer: `Our center is at ${noidaLocation.streetAddress}, ${noidaLocation.addressLocality}. We're near Sector 62 Metro Station (Blue Line), making it convenient for students from Sectors 18, 44, 50, 76, 78, Indirapuram, and Vaishali.`,
  },
]

export default function AllenAlternativeNoidaPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Allen Alternative in Noida - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs Allen Career Institute for NEET preparation in Noida',
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
        name: 'Allen Alternative',
        item: 'https://cerebrumbiologyacademy.com/allen-alternative-noida',
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
      <AllenAlternativeNoidaContent faqs={faqs} />
    </>
  )
}
