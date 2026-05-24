import { Metadata } from 'next'
import ComplementAllenNoidaContent from './ComplementAllenNoidaContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const noidaLocation = CONTACT_INFO.location.noida

export const metadata: Metadata = {
  title: 'Complement the largest national NEET chain Coaching with Cerebrum Biology | Noida',
  description:
    'Boost your NEET Biology score while staying at the largest national NEET chain. Cerebrum offers weekend & evening Biology classes for the largest national NEET chain students in Noida. Personalized attention from AIIMS faculty.',
  keywords: [
    'complement allen coaching noida',
    'allen coaching biology supplement',
    'extra biology classes allen students',
    'biology tuition with allen',
    'allen biology weak areas',
    'biology boost allen noida',
    'weekend neet biology classes',
    'evening biology coaching noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Complement the largest national NEET chain with Cerebrum Biology Coaching | Noida',
    description: 'Keep your the largest national NEET chain enrollment. Add focused Biology coaching from AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-noida',
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
    question: 'Is Cerebrum conveniently located for the largest national NEET chain students in Noida?',
    answer: `Yes! Our Noida center is at ${noidaLocation.streetAddress}, ${noidaLocation.addressLocality}. Near Sector 62 Metro Station (Blue Line) - easily accessible for students across Noida, Sector 18, Sector 44, Sector 50, Indirapuram, and Greater Noida West.`,
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

export default function ComplementAllenCoachingNoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Coaching for the largest national NEET chain Students - Noida',
    description:
      'Supplementary NEET Biology coaching designed for students already enrolled at XYZ Coaching (largest national NEET chain)',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: noidaLocation.streetAddress,
        addressLocality: noidaLocation.addressLocality,
        addressRegion: noidaLocation.addressRegion,
        postalCode: noidaLocation.postalCode,
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
        name: 'NEET Coaching Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Complement the largest national NEET chain Coaching',
        item: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-noida',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={['NEET Noida', 'NEET Biology Noida', 'Medical entrance coaching Noida']}
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
      <ComplementAllenNoidaContent faqs={faqs} />
    </>
  )
}
