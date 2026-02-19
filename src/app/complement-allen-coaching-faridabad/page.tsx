import { Metadata } from 'next'
import ComplementAllenFaridabadContent from './ComplementAllenFaridabadContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'Complement Allen Coaching with Cerebrum Biology | Faridabad',
  description:
    'Boost your NEET Biology score while staying at Allen. Cerebrum offers weekend & evening Biology classes for Allen students in Faridabad. Personalized attention from AIIMS faculty.',
  keywords: [
    'complement allen coaching faridabad',
    'allen coaching biology supplement',
    'extra biology classes allen students',
    'biology tuition with allen',
    'allen biology weak areas',
    'biology boost allen faridabad',
    'weekend neet biology classes',
    'evening biology coaching faridabad',
  ],
  openGraph: {
    title: 'Complement Allen with Cerebrum Biology Coaching | Faridabad',
    description: 'Keep your Allen enrollment. Add focused Biology coaching from AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-faridabad',
  },
}

const faqs = [
  {
    question: 'Can I join Cerebrum without leaving Allen?',
    answer:
      'Yes! Many Allen students join Cerebrum specifically for Biology coaching. We offer flexible weekend and evening batches that complement your Allen schedule perfectly.',
  },
  {
    question: 'Why do Allen students need extra Biology coaching?',
    answer:
      'Allen covers all subjects, but Biology requires depth and personalized attention. With 100+ students per batch at Allen, individual doubt clearing is limited. Cerebrum fills this gap with specialized Biology focus.',
  },
  {
    question: 'How does the timing work with Allen classes?',
    answer:
      'We offer: 1) Weekend intensive batches (Saturday-Sunday) 2) Evening sessions (6-8 PM weekdays) 3) Flexible online sessions. Choose what fits your Allen schedule.',
  },
  {
    question: 'Is Cerebrum conveniently located for Allen students?',
    answer: `Yes! Our Faridabad center is at ${faridabadLocation.streetAddress}, ${faridabadLocation.addressLocality}. Near Bata Chowk Metro (5 min walk) - easily accessible for students across Faridabad.`,
  },
  {
    question: 'What topics can I focus on?',
    answer:
      'You can choose: Complete Biology syllabus coverage, specific weak chapters, NCERT deep-dive, diagram practice, or mock test analysis. We customize based on your needs.',
  },
  {
    question: 'How much does the complementary coaching cost?',
    answer:
      'We offer special packages for students already enrolled elsewhere. Weekend-only batch starts at ₹30,000/year. Full supplementary program ranges from ₹45,000-90,000 depending on intensity.',
  },
  {
    question: 'What results have Allen + Cerebrum students achieved?',
    answer:
      'Students combining Allen + Cerebrum have seen an average 50-70 mark improvement in Biology specifically. Last year, 85% of combo students scored 320+ in Biology.',
  },
]

export default function ComplementAllenCoachingFaridabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Coaching for Allen Students - Faridabad',
    description:
      'Supplementary NEET Biology coaching designed for students already enrolled at Allen Career Institute',
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
    },
    educationalLevel: 'Class 11-12',
    teaches: ['NEET Biology', 'NCERT Biology', 'Biology Diagrams', 'Mock Test Analysis'],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: 'Weekend + Evening options available',
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
        name: 'Complement Allen Coaching',
        item: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-faridabad',
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
      <ComplementAllenFaridabadContent faqs={faqs} />
    </>
  )
}
