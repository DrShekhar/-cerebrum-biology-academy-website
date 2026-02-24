import { Metadata } from 'next'
import Class10BiologyTuitionRohiniContent from './Class10BiologyTuitionRohiniContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const rohiniLocation = CONTACT_INFO.centers.rohini

export const metadata: Metadata = {
  title: 'Class 10 Biology Tuition Rohini | Board + NEET Foundation',
  description:
    'Best Class 10 biology tuition in Rohini, Delhi. DC Chauk center, Board + NEET dual prep, CBSE & ICSE. Small batches. WhatsApp 88264-44334',
  keywords: [
    'class 10 biology tuition rohini',
    'class 10 biology coaching rohini',
    '10th biology tuition rohini',
    'NEET foundation class 10 rohini',
    'board exam biology rohini',
  ],
  openGraph: {
    title: 'Class 10 Biology Tuition Rohini | Board + NEET Foundation',
    description: 'Best Class 10 Biology tuition in Rohini with Board + NEET dual preparation at DC Chauk center.',
    url: 'https://cerebrumbiologyacademy.com/class-10-biology-tuition-rohini',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/class-10-biology-tuition-rohini' },
}

const faqs = [
  {
    question: 'Do you offer both Board and NEET preparation for Class 10?',
    answer:
      'Yes, our Class 10 program offers dual preparation - complete board exam coverage (CBSE/ICSE) plus NEET foundation. This integrated approach ensures students excel in boards while building a strong base for NEET.',
  },
  {
    question: 'What topics are covered in Class 10 Biology?',
    answer:
      'We cover all NCERT chapters: Life Processes (Nutrition, Respiration, Transportation, Excretion), Control & Coordination, How Do Organisms Reproduce, Heredity & Evolution, and Our Environment (Ecosystem, Waste Management).',
  },
  {
    question: 'What is the fee for Class 10 Biology tuition in Rohini?',
    answer:
      'Class X Foundation (Board + NEET) fees range from ₹45,000 to ₹65,000/year depending on the tier: Pursuit (₹45,000, 30-40 students), Ascent (₹55,000, 16-18 students), or Pinnacle (₹65,000, 10-12 students). All tiers include study materials, worksheets, and doubt clearing sessions.',
  },
  {
    question: 'What is the batch size and timing?',
    answer:
      'Small batches of maximum 15 students for personalized attention. Weekend and weekday evening batches available. Special board exam crash courses also available.',
  },
  {
    question: 'Where is your Rohini center located?',
    answer: `Our Rohini center is located at ${rohiniLocation.streetAddress}, ${rohiniLocation.addressLocality}. It is near Rohini West Metro Station (Red Line) and DC Chowk market.`,
  },
  {
    question: 'How does NEET foundation help in Class 10?',
    answer:
      'NEET foundation in Class 10 helps students understand concepts at a deeper level, practice NCERT-based MCQs, develop analytical thinking, and build the habit of competitive exam preparation - giving them a 2-year head start for NEET.',
  },
]

export default function Class10BiologyTuitionRohiniPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Class 10 Biology Tuition - Rohini',
    description: 'CBSE & ICSE Class 10 Biology tuition with NEET foundation in Rohini, Delhi',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: 'Class 10',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: rohiniLocation.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: rohiniLocation.streetAddress,
          addressLocality: rohiniLocation.addressLocality,
          addressRegion: rohiniLocation.addressRegion,
          postalCode: rohiniLocation.postalCode,
          addressCountry: rohiniLocation.addressCountry,
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
        name: 'Class 10 Rohini',
        item: 'https://cerebrumbiologyacademy.com/class-10-biology-tuition-rohini',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Class10BiologyTuitionRohiniContent faqs={faqs} />
    </>
  )
}
