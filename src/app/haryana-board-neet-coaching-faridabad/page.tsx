import { Metadata } from 'next'
import HaryanaBoardNEETCoachingFaridabadContent from './HaryanaBoardNEETCoachingFaridabadContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'Haryana Board NEET Coaching in Faridabad | HBSE Students NEET Prep',
  description:
    'Specialized NEET Biology coaching for Haryana Board (HBSE) students in Faridabad. Hindi + English medium support, NCERT bridging, affordable fees. For Govt & private school students.',
  keywords: [
    'haryana board neet coaching faridabad',
    'hbse neet coaching',
    'neet coaching for haryana board students',
    'hindi medium neet coaching faridabad',
    'haryana state board neet preparation',
    'government school neet coaching',
    'hbse to ncert bridge course',
    'affordable neet coaching faridabad',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Haryana Board NEET Coaching in Faridabad | HBSE-to-NCERT Bridge',
    description:
      'NEET Biology coaching for Haryana Board students. Hindi/English support, NCERT bridging, small batches with AIIMS-trained faculty.',
    url: 'https://cerebrumbiologyacademy.com/haryana-board-neet-coaching-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/haryana-board-neet-coaching-faridabad',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Haryana Board NEET Coaching in Faridabad | HBSE Students NEET Prep',
    description:
      'Specialized NEET Biology coaching for Haryana Board (HBSE) students in Faridabad. Hindi + English medium support, NCERT bridging, affordable fees. For Govt & private school students.',
  },
}

const faqs = [
  {
    question: 'Can Haryana Board students crack NEET?',
    answer:
      'Absolutely! Many NEET toppers come from state boards. The key is proper NCERT bridging and dedicated practice. With the right coaching, state-board students close the gap and compete strongly in NEET Biology.',
  },
  {
    question: 'Do you offer Hindi medium NEET coaching?',
    answer:
      'Yes, we offer bilingual coaching (Hindi + English). Our teachers explain concepts in Hindi but train you to answer in English as NEET is primarily English-based. We also provide Hindi study materials.',
  },
  {
    question: 'What is the HBSE to NCERT bridge program?',
    answer:
      'Haryana Board syllabus differs from NCERT in several topics. Our bridge program covers these gaps, aligns terminology, and ensures you master NCERT content required for NEET. First 4 weeks focus on bridging.',
  },
  {
    question: 'Which Haryana Board schools do your students come from?',
    answer:
      'We have students from government schools across Faridabad and nearby areas - GSSS Sector 15, 16, 21, DAV Schools, and many private HBSE-affiliated schools from NIT Faridabad, Old Faridabad, and Ballabhgarh.',
  },
  {
    question: 'What is the fee for Haryana Board students?',
    answer:
      'We offer special affordable packages for HBSE students starting at ₹35,000/year. Scholarship up to 50% available based on merit and financial need. EMI options also available.',
  },
  {
    question: 'Can I study in Hindi medium initially?',
    answer:
      'Yes, initial concepts are explained in Hindi for better understanding. However, we gradually transition you to English terminology since NEET questions are primarily in English.',
  },
  {
    question: 'What results do HBSE students achieve?',
    answer:
      'With the NCERT bridge, small batches and weekly testing, our Haryana Board students routinely match their CBSE peers in NEET Biology — the board you come from stops being a disadvantage. Come in for a diagnostic test and we will show you exactly where you stand and what a realistic target looks like.',
  },
]

export default function HaryanaBoardNEETCoachingFaridabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Haryana Board NEET Biology Coaching - Faridabad',
    description:
      'Specialized NEET Biology coaching for HBSE students with Hindi-English bilingual support and NCERT bridging',
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
    educationalLevel: 'Class 11-12 HBSE',
    inLanguage: ['en', 'hi'],
    teaches: ['NCERT Biology', 'NEET Biology', 'HBSE-NCERT Bridge', 'Hindi Medium Support'],
    offers: {
      '@type': 'Offer',
      price: '35000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: 'Bilingual coaching with NCERT focus',
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
        name: 'Haryana Board NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/haryana-board-neet-coaching-faridabad',
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
      <HaryanaBoardNEETCoachingFaridabadContent faqs={faqs} />
    </>
  )
}
