import { Metadata } from 'next'
import Class9BiologyTuitionRohiniContent from './Class9BiologyTuitionRohiniContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const rohiniLocation = CONTACT_INFO.centers.rohini

export const metadata: Metadata = {
  title: 'Class 9 Biology Tuition Rohini | NEET Foundation',
  description:
    'Best Class 9 biology tuition in Rohini, Delhi. DC Chauk center, NEET foundation, CBSE & ICSE. Small batches, experienced faculty. WhatsApp 88264-44334',
  keywords: [
    'class 9 biology tuition rohini',
    'class 9 biology coaching rohini',
    '9th biology tuition rohini',
    'NEET foundation class 9 rohini',
    'cbse class 9 biology rohini',
    'icse class 9 biology rohini',
    'biology tuition near me rohini',
    'class 9 biology dc chauk rohini',
  ],
  openGraph: {
    title: 'Class 9 Biology Tuition Rohini | NEET Foundation',
    description: 'Expert Class 9 Biology tuition with NEET foundation for CBSE & ICSE boards in Rohini, Delhi.',
    url: 'https://cerebrumbiologyacademy.com/class-9-biology-tuition-rohini',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/class-9-biology-tuition-rohini' },
}

const faqs = [
  {
    question: 'Do you offer CBSE and ICSE Class 9 Biology tuition in Rohini?',
    answer:
      'Yes, we offer tuition for both CBSE and ICSE Class 9 Biology at our DC Chauk, Rohini center. Our teachers are experienced with both board patterns and ensure complete syllabus coverage along with NEET foundation concepts.',
  },
  {
    question: 'What topics are covered in Class 9 Biology?',
    answer:
      'We cover all NCERT topics: Cell - The Fundamental Unit of Life, Tissues, Diversity in Living Organisms, Why Do We Fall Ill, Natural Resources, and Improvement in Food Resources. Additional NEET foundation concepts are integrated into each chapter.',
  },
  {
    question: 'What is the fee for Class 9 Biology tuition in Rohini?',
    answer:
      'Class IX Foundation (Academic) fees range from Rs.40,000 to Rs.60,000/year depending on the tier: Pursuit (Rs.40,000, 30-40 students), Ascent (Rs.50,000, 16-18 students), or Pinnacle (Rs.60,000, 10-12 students). All tiers include study materials, worksheets, and doubt clearing sessions.',
  },
  {
    question: 'What is the batch size and timing at Rohini center?',
    answer:
      'Small batches of maximum 15 students for personalized attention. Weekend and weekday evening batches available to suit school schedules. Our DC Chauk center is easily accessible from Rohini West Metro Station.',
  },
  {
    question: 'Where is your Rohini center located?',
    answer: `Located at ${rohiniLocation.streetAddress}, ${rohiniLocation.addressLocality}. Just 5 minutes walk from Rohini West Metro Station (Red Line). Easily accessible for students from Sectors 7, 8, 9, 10, and nearby areas.`,
  },
  {
    question: 'Is NEET foundation included in Class 9 Biology tuition?',
    answer:
      'Yes, our Class 9 Biology program integrates NEET foundation concepts from the beginning. Students learn board syllabus along with additional depth required for competitive exams, building a strong base for future NEET preparation.',
  },
  {
    question: 'Which schools do your Rohini students come from?',
    answer:
      'We teach students from top schools in Rohini including DPS Rohini, Ryan International Rohini, Bal Bharati Rohini, GD Goenka Rohini, Venkateshwar International, and many other CBSE & ICSE schools in the area.',
  },
]

export default function Class9BiologyTuitionRohiniPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Class 9 Biology Tuition with NEET Foundation - Rohini',
    description: 'CBSE & ICSE Class 9 Biology tuition with integrated NEET foundation at Rohini, Delhi',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: rohiniLocation.streetAddress,
        addressLocality: rohiniLocation.addressLocality,
        addressRegion: rohiniLocation.addressRegion,
        postalCode: rohiniLocation.postalCode,
        addressCountry: rohiniLocation.addressCountry,
      },
    },
    educationalLevel: 'Class 9',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: 'Cerebrum Biology Academy - Rohini',
        address: {
          '@type': 'PostalAddress',
          streetAddress: rohiniLocation.streetAddress,
          addressLocality: rohiniLocation.addressLocality,
          postalCode: rohiniLocation.postalCode,
        },
      },
    },
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
        name: 'Biology Tuition',
        item: 'https://cerebrumbiologyacademy.com/biology-tuition',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Class 9 Biology Rohini',
        item: 'https://cerebrumbiologyacademy.com/class-9-biology-tuition-rohini',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Class9BiologyTuitionRohiniContent faqs={faqs} />
    </>
  )
}
