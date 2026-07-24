import { Metadata } from 'next'
import ComplementAllenContent from './ComplementAllenContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const southExtensionCenter = CONTACT_INFO.centers.southExtension

export const metadata: Metadata = {
  title: 'Complement Allen Coaching with Cerebrum Biology | South Delhi',
  description:
    'Boost your NEET Biology score while staying at Allen. Cerebrum flagship at South Extension is one Ring Road stop from Allen Lajpat Nagar. Weekend & evening Biology classes.',
  keywords: [
    'complement allen coaching south delhi',
    'allen coaching biology supplement',
    'extra biology classes allen students',
    'biology tuition with allen lajpat nagar',
    'allen biology weak areas',
    'biology boost allen south delhi',
    'weekend neet biology classes south delhi',
    'evening biology coaching south extension',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Complement Allen with Cerebrum Biology Coaching | South Delhi',
    description:
      'Keep your Allen enrollment. Add focused Biology coaching from AIIMS-trained faculty — one Ring Road stop from Allen Lajpat Nagar.',
    url: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-south-delhi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-south-delhi',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Complement Allen Coaching with Cerebrum Biology | South Delhi',
    description:
      'Boost your NEET Biology score while staying at Allen. Cerebrum flagship at South Extension is one Ring Road stop from Allen Lajpat Nagar. Week...',
  },
}

const faqs = [
  {
    question: 'Can I join Cerebrum without leaving Allen?',
    answer:
      'Yes! Many Allen students join Cerebrum specifically for Biology coaching. Keep your integrated Physics-Chemistry preparation at Allen and add Cerebrum as your Biology specialist. We offer flexible weekend and evening batches that complement your Allen schedule perfectly.',
  },
  {
    question: 'Why do Allen students need extra Biology coaching?',
    answer:
      'Biology alone is 360 of the 720 NEET marks. Allen covers all subjects, but Biology requires depth and personalized attention. With 100+ students per batch at Allen, individual doubt clearing is limited. Cerebrum fills this gap with specialized Biology focus, small batches, and AIIMS-trained faculty.',
  },
  {
    question: 'How close is Cerebrum to Allen in South Delhi?',
    answer:
      'Very close. Allen has a South Delhi presence at Lajpat Nagar (and Kalu Sarai), and Lajpat Nagar is just one Ring Road stop from our flagship at D-35, South Extension Part 2. Attend your Allen class, then reach Cerebrum in minutes.',
  },
  {
    question: 'How does the timing work with Allen classes?',
    answer:
      'We offer: 1) Weekend intensive batches (Saturday-Sunday) 2) Evening sessions (6-8 PM weekdays) 3) Flexible online sessions. Because we are in the same part of South Delhi, you can attend right after your Allen class — or join live online.',
  },
  {
    question: 'I live in a PG in Ber Sarai, Katwaria Sarai, or Lajpat Nagar. Can I attend?',
    answer:
      'Absolutely. Many outstation students living in the PG belts of Ber Sarai, Katwaria Sarai, and Lajpat Nagar attend the big-brand integrated coachings and add Cerebrum for Biology. South Extension is a short ride from all three, and every batch is also available live online.',
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
    question: 'Where is Cerebrum located in South Delhi?',
    answer: `Our flagship centre is at ${southExtensionCenter.streetAddress}, New Delhi 110049 — near AIIMS and steps from South Extension Metro. We also have a second South Delhi centre at B-113 Gulmohar Park (Green Park).`,
  },
]

export default function ComplementAllenCoachingSouthDelhiPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Coaching for Allen Students - South Delhi',
    description:
      'Supplementary NEET Biology coaching designed for students already enrolled at Allen',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: southExtensionCenter.streetAddress,
        addressLocality: southExtensionCenter.addressLocality,
        addressRegion: southExtensionCenter.addressRegion,
        postalCode: southExtensionCenter.postalCode,
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
        name: 'NEET Coaching South Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Complement Allen Coaching',
        item: 'https://cerebrumbiologyacademy.com/complement-allen-coaching-south-delhi',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET South Delhi',
          'NEET Biology South Delhi',
          'Medical entrance coaching South Delhi',
        ]}
      />
      <DelhiAreaSchema
        pageSlug="complement-allen-coaching-south-delhi"
        subArea="South Extension"
        subRegion="south"
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
