import { Metadata } from 'next'
import HaryanaBoardNEETCoachingContent from './HaryanaBoardNEETCoachingContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'Haryana Board NEET Coaching in Gurugram | HBSE Students NEET Prep',
  description:
    'Specialized NEET Biology coaching for Haryana Board (HBSE) students in Gurugram. Hindi + English medium support, NCERT bridging, affordable fees. For Govt & private school students.',
  keywords: [
    'haryana board neet coaching gurugram',
    'hbse neet coaching',
    'neet coaching for haryana board students',
    'hindi medium neet coaching gurugram',
    'haryana state board neet preparation',
    'government school neet coaching',
    'hbse to ncert bridge course',
    'affordable neet coaching gurugram',
  ],
  openGraph: {
    title: 'Haryana Board NEET Coaching in Gurugram | HBSE-to-NCERT Bridge',
    description: 'NEET Biology coaching for Haryana Board students. Hindi/English support, NCERT bridging, 78% success rate.',
    url: 'https://cerebrumbiologyacademy.com/haryana-board-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/haryana-board-neet-coaching-gurugram',
  },
}

const faqs = [
  {
    question: 'Can Haryana Board students crack NEET?',
    answer:
      'Absolutely! Many NEET toppers come from state boards. The key is proper NCERT bridging and dedicated practice. Our HBSE students score 290+ on average in NEET Biology with proper coaching.',
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
      'We have students from government schools across Gurugram and nearby areas - GSSS Sector 10, 14, 17, DAV Schools, and many private HBSE-affiliated schools from Pataudi, Sohna, and Manesar.',
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
      'Our Haryana Board students average 290+ in NEET Biology. Last year, 78% cleared NEET cutoff. Top performer from HBSE scored 682/720 overall.',
  },
]

export default function HaryanaBoardNEETCoachingGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Haryana Board NEET Biology Coaching - Gurugram',
    description: 'Specialized NEET Biology coaching for HBSE students with Hindi-English bilingual support and NCERT bridging',
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'Haryana Board NEET Coaching', item: 'https://cerebrumbiologyacademy.com/haryana-board-neet-coaching-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HaryanaBoardNEETCoachingContent faqs={faqs} />
    </>
  )
}
