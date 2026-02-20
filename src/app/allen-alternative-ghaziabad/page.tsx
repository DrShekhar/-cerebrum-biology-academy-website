import { Metadata } from 'next'
import AllenAlternativeGhaziabadContent from './AllenAlternativeGhaziabadContent'

const noidaAddress = 'B-45, Sector 62, Noida, UP 201301'

export const metadata: Metadata = {
  title: 'Allen Alternative in Ghaziabad | Better NEET Biology Coaching',
  description:
    'Looking for Allen alternative in Ghaziabad? Cerebrum Biology Academy offers personalized NEET coaching with smaller batches (10-20 students), AIIMS faculty, and 98% success rate. Allen has no Ghaziabad center.',
  keywords: [
    'allen alternative ghaziabad',
    'allen coaching alternative ghaziabad',
    'better than allen ghaziabad',
    'allen vs cerebrum ghaziabad',
    'small batch neet coaching ghaziabad',
    'personalized neet coaching ghaziabad',
    'allen no ghaziabad center',
    'switch from allen ghaziabad',
  ],
  openGraph: {
    title: 'Allen Alternative in Ghaziabad | Personalized NEET Biology Coaching',
    description:
      'Allen has no center in Ghaziabad. Cerebrum Biology Academy offers better personalized NEET coaching for Ghaziabad students.',
    url: 'https://cerebrumbiologyacademy.com/allen-alternative-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/allen-alternative-ghaziabad',
  },
}

const faqs = [
  {
    question: 'Does Allen have a center in Ghaziabad?',
    answer:
      "Allen Career Institute does not have a dedicated center in Ghaziabad. Ghaziabad students opting for Allen must travel to Noida or Delhi centers, adding significant commute time. Cerebrum Biology Academy at Sector 62, Noida is much more accessible from Ghaziabad via Blue Line Metro (15-20 min from Vaishali/Kaushambi).",
  },
  {
    question: 'Why should I consider Cerebrum over Allen for NEET Biology?',
    answer:
      'While Allen is a reputed institute, Cerebrum offers key advantages: smaller batches (10-20 vs 100+ at Allen), personalized attention from AIIMS faculty, Biology-only specialization for deeper coverage, and flexible online + offline options. Our 98% success rate speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from Allen for Ghaziabad students?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 10-20 students vs Allen's 80-100+. 2) Faculty: Direct teaching by Dr. Shekhar (AIIMS alumnus) vs rotating faculty. 3) Focus: Biology-specialized vs all subjects. 4) Location: Easy 15-20 min metro ride from Ghaziabad vs longer commute to Allen centers. 5) Fee: More affordable with better value.",
  },
  {
    question: 'Can I join Cerebrum along with Allen for extra Biology support?',
    answer:
      "Absolutely! Many students complement their Allen online coaching with Cerebrum's Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere. This combination gives you the best of both worlds.",
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
    question: 'Where is Cerebrum located and how do Ghaziabad students reach there?',
    answer: `Our center is at ${noidaAddress}. Ghaziabad students can take the Blue Line Metro to Sector 62 station (15-20 min from Vaishali/Kaushambi). Easily accessible from Indirapuram, Vasundhara, Raj Nagar Extension, and Crossings Republik.`,
  },
]

export default function AllenAlternativeGhaziabadPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Allen Alternative in Ghaziabad - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs Allen Career Institute for NEET preparation for Ghaziabad students',
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
        name: 'Allen Alternative',
        item: 'https://cerebrumbiologyacademy.com/allen-alternative-ghaziabad',
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
      <AllenAlternativeGhaziabadContent faqs={faqs} />
    </>
  )
}
