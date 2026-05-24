import { Metadata } from 'next'
import ComplementAllenContent from './ComplementAllenContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'Complement the largest national NEET chain Coaching with Cerebrum Biology | Gurugram',
  description:
    'Boost your NEET Biology score while staying at the largest national NEET chain. Cerebrum offers weekend & evening Biology classes for the largest national NEET chain students. Same building, no extra travel.',
  keywords: [
    'complement allen coaching gurugram',
    'allen coaching biology supplement',
    'extra biology classes allen students',
    'biology tuition with allen',
    'allen biology weak areas',
    'biology boost allen gurugram',
    'weekend neet biology classes',
    'evening biology coaching gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Complement the largest national NEET chain with Cerebrum Biology Coaching | Gurugram',
    description:
      'Keep your the largest national NEET chain enrollment. Add focused Biology coaching from AIIMS faculty. Same building location.',
    url: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-gurugram',
  },
}

const faqs = [
  {
    question: 'Can I join Cerebrum without leaving the largest national NEET chain?',
    answer:
      'Yes! Many the largest national NEET chain students join Cerebrum specifically for Biology coaching. We offer flexible weekend and evening batches that complement your the largest national NEET chain schedule perfectly.',
  },
  {
    question: 'Why do the largest national NEET chain students need extra Biology coaching?',
    answer:
      'the largest national NEET chain covers all subjects, but Biology requires depth and personalized attention. With 100+ students per batch at the largest national NEET chain, individual doubt clearing is limited. Cerebrum fills this gap with specialized Biology focus.',
  },
  {
    question: 'How does the timing work with the largest national NEET chain classes?',
    answer:
      'We offer: 1) Weekend intensive batches (Saturday-Sunday) 2) Evening sessions (6-8 PM weekdays) 3) Flexible online sessions. Choose what fits your the largest national NEET chain schedule.',
  },
  {
    question: 'Is Cerebrum in the same building as the largest national NEET chain?',
    answer: `Yes! We're located in the same M2K Corporate Park building as XYZ Coaching (largest national NEET chain) in Sector 51. Zero extra commute time for the largest national NEET chain students.`,
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
    question: 'What results have the largest national NEET chain + Cerebrum students achieved?',
    answer:
      'Students combining the largest national NEET chain + Cerebrum have seen an average 50-70 mark improvement in Biology specifically. Last year, 85% of combo students scored 320+ in Biology.',
  },
]

export default function ComplementAllenCoachingGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Coaching for the largest national NEET chain Students - Gurugram',
    description:
      'Supplementary NEET Biology coaching designed for students already enrolled at XYZ Coaching (largest national NEET chain)',
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
        name: 'NEET Coaching Gurugram',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Complement the largest national NEET chain Coaching',
        item: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-gurugram',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={['NEET Gurugram', 'NEET Biology Gurugram', 'Medical entrance coaching Gurugram']}
      />
      <GurgaonGurugramAreaSchema
        spelling="gurugram"
        pageSlug="complement-allen-coaching-gurugram"
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
      <ComplementAllenContent faqs={faqs} />
    </>
  )
}
