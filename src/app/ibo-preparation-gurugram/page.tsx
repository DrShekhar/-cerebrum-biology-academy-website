import { Metadata } from 'next'
import IBOPreparationGurugramContent from './IBOPreparationGurugramContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'IBO Preparation in Gurugram | International Biology Olympiad Coaching',
  description:
    'Expert IBO preparation in Gurugram for International Biology Olympiad. Advanced training for INBO qualifiers, practical skills, research paper analysis at Sector 51 center.',
  keywords: [
    'IBO preparation gurugram',
    'international biology olympiad gurugram',
    'IBO coaching gurugram',
    'IBO training gurugram',
    'biology olympiad international level',
    'INBO to IBO coaching',
    'IBO practical training',
    'IBO theory preparation',
  ],
  openGraph: {
    title: 'IBO Preparation in Gurugram | International Biology Olympiad',
    description:
      'Expert coaching for International Biology Olympiad in Gurugram. Advanced training for students aiming to represent India at IBO.',
    url: 'https://cerebrumbiologyacademy.com/ibo-preparation-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ibo-preparation-gurugram',
  },
}

const faqs = [
  {
    question: 'What is IBO and how do I qualify?',
    answer:
      'IBO (International Biology Olympiad) is the world premier biology competition for pre-university students. To qualify, you must clear NSEB and INBO, then be selected as one of 4 students to represent India from the HBCSE training camp.',
  },
  {
    question: 'What does IBO coaching cover?',
    answer:
      'Our IBO coaching covers advanced theoretical concepts using Campbell Biology, practical laboratory skills (40% of IBO), research paper analysis, and competition strategies. We prepare students for both theory and practical exams.',
  },
  {
    question: 'When should I join IBO coaching?',
    answer:
      'IBO coaching is for students who have qualified INBO or are in the top percentile of NSEB. The intensive training begins after INBO results (February-March) for the July IBO.',
  },
  {
    question: 'What practical skills are taught for IBO?',
    answer:
      'We cover microscopy, biochemical assays, molecular biology practicals (PCR, gel electrophoresis), anatomical dissections, plant physiology experiments, and data analysis - all essential for IBO practical exam.',
  },
  {
    question: 'Do you offer IBO coaching in Gurugram?',
    answer: `Yes, we offer IBO preparation at our Gurugram center at ${gurugramLocation.streetAddress}. This is advanced coaching for INBO qualifiers targeting international competition.`,
  },
]

export default function IBOPreparationGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'IBO Preparation Program - Gurugram',
    description:
      'Advanced International Biology Olympiad preparation for INBO qualifiers at our Gurugram center.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
    },
    educationalLevel: 'Advanced High School',
    about: 'IBO - International Biology Olympiad',
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
      { '@type': 'ListItem', position: 2, name: 'Biology Olympiad', item: 'https://cerebrumbiologyacademy.com/biology-olympiad-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'IBO Preparation Gurugram', item: 'https://cerebrumbiologyacademy.com/ibo-preparation-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IBOPreparationGurugramContent faqs={faqs} />
    </>
  )
}
