import { Metadata } from 'next'
import NSEBCoachingGurugramContent from './NSEBCoachingGurugramContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CEREBRUM_METRICS, GURUGRAM_CENTER_METRICS } from '@/lib/constants/metrics'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'NSEB Coaching in Gurugram | National Standard Examination in Biology',
  description:
    'Expert NSEB coaching in Gurugram for National Standard Examination in Biology. Comprehensive syllabus coverage, past paper practice, experienced faculty at Sector 51 center.',
  keywords: [
    'NSEB coaching gurugram',
    'NSEB preparation gurugram',
    'national standard examination biology gurugram',
    'biology olympiad coaching gurugram',
    'NSEB classes gurugram',
    'NSEB tuition gurugram',
    'IAPT biology olympiad gurugram',
    'NSEB 2025 preparation gurugram',
  ],
  openGraph: {
    title: 'NSEB Coaching in Gurugram | National Standard Examination in Biology',
    description:
      'Expert NSEB coaching in Gurugram. Comprehensive preparation for National Standard Examination in Biology with experienced faculty.',
    url: 'https://cerebrumbiologyacademy.com/nseb-coaching-gurugram',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/nseb-coaching-gurugram',
  },
}

const faqs = [
  {
    question: 'What is NSEB and who conducts it?',
    answer:
      'NSEB (National Standard Examination in Biology) is the first stage of the Biology Olympiad conducted by IAPT (Indian Association of Physics Teachers) in November each year. It is open to students studying in Class 12 or below in Indian schools.',
  },
  {
    question: 'What is the NSEB exam pattern?',
    answer:
      'NSEB consists of 80 multiple choice questions to be solved in 2 hours. Questions cover Botany, Zoology, Cell Biology, Genetics, Ecology, and Evolution. Top 300 students qualify for INBO (Stage 2).',
  },
  {
    question: 'When should I start preparing for NSEB?',
    answer:
      'Ideally, start preparation in Class 9-10 to build a strong foundation. However, dedicated Class 11-12 students can also prepare effectively with 6-8 months of focused study.',
  },
  {
    question: 'What books are recommended for NSEB?',
    answer:
      'Campbell Biology (12th edition) is the primary reference. NCERT Class 11-12 Biology is essential. Additional resources include Trueman Biology and past NSEB papers for practice.',
  },
  {
    question: 'What is the cutoff for NSEB to qualify for INBO?',
    answer:
      'The cutoff varies each year but typically requires scoring in the top 1% nationally. Top 300 students qualify for INBO. We provide mock tests to help you gauge your preparation level.',
  },
  {
    question: 'Do you offer NSEB coaching in Gurugram?',
    answer: `Yes, we offer comprehensive NSEB coaching at our Gurugram center located at ${gurugramLocation.streetAddress}. Our program includes complete syllabus coverage, past paper practice, and mock tests.`,
  },
]

export default function NSEBCoachingGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NSEB Coaching Program - Gurugram',
    description:
      'Comprehensive NSEB (National Standard Examination in Biology) preparation at our Gurugram center. Expert faculty, complete syllabus coverage, past paper practice.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: gurugramLocation.streetAddress,
        addressLocality: gurugramLocation.addressLocality,
        addressRegion: gurugramLocation.addressRegion,
        postalCode: gurugramLocation.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'High School',
    about: 'NSEB - National Standard Examination in Biology',
    teaches: [
      'Cell Biology',
      'Molecular Biology',
      'Plant Biology',
      'Animal Physiology',
      'Genetics',
      'Ecology & Evolution',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
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
        name: 'Biology Olympiad',
        item: 'https://cerebrumbiologyacademy.com/biology-olympiad-coaching-gurugram',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NSEB Coaching Gurugram',
        item: 'https://cerebrumbiologyacademy.com/nseb-coaching-gurugram',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NSEBCoachingGurugramContent faqs={faqs} />
    </>
  )
}
