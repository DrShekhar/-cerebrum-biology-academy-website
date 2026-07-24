import { Metadata } from 'next'
import NSEBCoachingFaridabadContent from './NSEBCoachingFaridabadContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'NSEB Coaching in Faridabad | National Standard Examination in Biology',
  description:
    'Expert NSEB coaching in Faridabad for National Standard Examination in Biology. Comprehensive syllabus coverage, past paper practice, experienced faculty at Sector 17 center.',
  keywords: [
    'NSEB coaching faridabad',
    'NSEB preparation faridabad',
    'national standard examination biology faridabad',
    'biology olympiad coaching faridabad',
    'NSEB classes faridabad',
    'NSEB tuition faridabad',
    'IAPT biology olympiad faridabad',
    'NSEB 2025 preparation faridabad',
  ],
  openGraph: {
    title: 'NSEB Coaching in Faridabad | National Standard Examination in Biology',
    description:
      'Expert NSEB coaching in Faridabad. Comprehensive preparation for National Standard Examination in Biology with experienced faculty.',
    url: 'https://cerebrumbiologyacademy.com/nseb-coaching-faridabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/nseb-coaching-faridabad',
    languages: {
      'en-IN': 'https://cerebrumbiologyacademy.com/nseb-coaching-faridabad',
      en: 'https://cerebrumbiologyacademy.com/nseb-coaching-faridabad',
      'x-default': 'https://cerebrumbiologyacademy.com/nseb-coaching',
    },
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NSEB Coaching in Faridabad | National Standard Examination in Biology',
    description:
      'Expert NSEB coaching in Faridabad for National Standard Examination in Biology. Comprehensive syllabus coverage, past paper practice, experienced faculty at Sector 17 center.',
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
    question: 'Do you offer NSEB coaching in Faridabad?',
    answer: `Yes, we offer comprehensive NSEB coaching at our Faridabad center located at ${faridabadLocation.streetAddress}, ${faridabadLocation.addressLocality} - ${faridabadLocation.postalCode}. Our program includes complete syllabus coverage, past paper practice, and mock tests.`,
  },
]

export default function NSEBCoachingFaridabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NSEB Coaching Program - Faridabad',
    description:
      'Comprehensive NSEB (National Standard Examination in Biology) preparation at our Faridabad center. Expert faculty, complete syllabus coverage, past paper practice.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: faridabadLocation.streetAddress,
        addressLocality: faridabadLocation.addressLocality,
        addressRegion: faridabadLocation.addressRegion,
        postalCode: faridabadLocation.postalCode,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: faridabadLocation.geo.latitude,
        longitude: faridabadLocation.geo.longitude,
      },
    },
    educationalLevel: 'High School',
    about: 'NSEB - National Standard Examination in Biology',
    inLanguage: 'en-IN',
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
        name: 'Biology Olympiads',
        item: 'https://cerebrumbiologyacademy.com/biology-olympiads',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NSEB Coaching',
        item: 'https://cerebrumbiologyacademy.com/nseb-coaching',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Faridabad',
        item: 'https://cerebrumbiologyacademy.com/nseb-coaching-faridabad',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Faridabad',
          'NEET Biology Faridabad',
          'Medical entrance coaching Faridabad',
        ]}
      />
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
      <NSEBCoachingFaridabadContent faqs={faqs} />
    </>
  )
}
