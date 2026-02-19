import { Metadata } from 'next'
import VelocityAlternativeContent from './VelocityAlternativeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'Velocity Institute Alternative in Faridabad | Small Batch NEET Biology | Cerebrum',
  description:
    "Looking for Velocity Institute alternative in Faridabad? Cerebrum offers 15-20 student batches vs Velocity's 50-80, AIIMS-trained faculty, and biology-specialist coaching. Call 88264-44334!",
  keywords: [
    'velocity alternative faridabad',
    'velocity institute faridabad review',
    'better than velocity faridabad',
    'velocity vs cerebrum faridabad',
    'small batch neet coaching faridabad',
    'personalized neet coaching faridabad',
    'velocity institute problems faridabad',
    'switch from velocity faridabad',
    'neet biology coaching faridabad',
  ],
  openGraph: {
    title: 'Velocity Institute Alternative in Faridabad | Small Batch NEET Biology | Cerebrum',
    description:
      'Why Faridabad students choose Cerebrum over Velocity Institute for focused NEET Biology preparation.',
    url: 'https://cerebrumbiologyacademy.com/velocity-alternative-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/velocity-alternative-faridabad',
  },
}

const faqs = [
  {
    question: 'Why should I consider Cerebrum over Velocity Institute for NEET Biology?',
    answer:
      'While Velocity is popular in Faridabad, Cerebrum offers key advantages: smaller batches (15-20 vs 50-80 at Velocity), AIIMS-trained faculty (Dr. Shekhar Singh), Biology-only specialization for deeper coverage, and online + hybrid options. Our 98% success rate in Biology speaks for itself.',
  },
  {
    question: 'How is Cerebrum different from Velocity Institute Faridabad?',
    answer:
      "Key differences: 1) Batch size: Cerebrum has 15-20 students vs Velocity's 50-80. 2) Faculty: AIIMS alumnus (Dr. Shekhar) vs general faculty. 3) Focus: Biology-specialized vs generic PCB coaching. 4) Doubt clearing: Daily 1-on-1 sessions vs limited time. 5) Digital tools: 19,600+ MCQ practice bank included.",
  },
  {
    question: 'Can I join Cerebrum along with Velocity for extra Biology support?',
    answer:
      "Absolutely! Many students complement their Velocity coaching with Cerebrum's Biology-focused classes. We offer flexible weekend batches and evening sessions specifically designed for students already enrolled elsewhere.",
  },
  {
    question: 'Is Cerebrum more expensive than Velocity?',
    answer:
      "Velocity is known for affordable fees (~₹36,000 for 6 months). Cerebrum's fees range from ₹45,000 to ₹1,56,000 depending on the tier and program. While slightly higher, you get AIIMS faculty, 3-4x smaller batches, and specialized Biology coaching - significantly better value per rupee.",
  },
  {
    question: 'What if I am not satisfied after switching from Velocity?',
    answer:
      "We offer a 7-day trial period for students switching from other institutes. Attend classes, interact with faculty, and if you're not satisfied, we'll refund your fees. We're confident you'll see the difference in personalized attention.",
  },
  {
    question: 'Where is Cerebrum located in Faridabad?',
    answer: `Our center is at ${faridabadLocation.streetAddress}, ${faridabadLocation.addressLocality}. We're near Bata Chowk Metro (5 min walk), just a short distance from Velocity's Sector 16 location.`,
  },
]

export default function VelocityAlternativeFaridabadPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Velocity Institute Alternative in Faridabad - Cerebrum Biology Academy',
    description:
      'Comparison of Cerebrum Biology Academy vs Velocity Institute for NEET preparation in Faridabad',
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
        name: 'Velocity Alternative',
        item: 'https://cerebrumbiologyacademy.com/velocity-alternative-faridabad',
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
      <VelocityAlternativeContent faqs={faqs} />
    </>
  )
}
