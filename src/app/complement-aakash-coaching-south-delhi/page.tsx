import { Metadata } from 'next'
import ComplementAakashContent from './ComplementAakashContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const southExtensionCenter = CONTACT_INFO.centers.southExtension

export const metadata: Metadata = {
  title: 'Complement Aakash Coaching with Cerebrum Biology | South Delhi',
  description:
    'Boost your NEET Biology score while staying at Aakash. Cerebrum flagship is across the road from Aakash South Extension. Weekend & evening Biology classes, AIIMS-trained faculty.',
  keywords: [
    'complement aakash coaching south delhi',
    'aakash coaching biology supplement',
    'extra biology classes aakash students',
    'biology tuition with aakash south extension',
    'aakash biology weak areas',
    'biology boost aakash south delhi',
    'weekend neet biology classes south delhi',
    'evening biology coaching south extension',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Complement Aakash with Cerebrum Biology Coaching | South Delhi',
    description:
      'Keep your Aakash enrollment. Add focused Biology coaching from AIIMS-trained faculty — across the road from Aakash South Extension.',
    url: 'https://cerebrumbiologyacademy.com/complement-aakash-coaching-south-delhi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/complement-aakash-coaching-south-delhi',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Complement Aakash Coaching with Cerebrum Biology | South Delhi',
    description:
      'Boost your NEET Biology score while staying at Aakash. Cerebrum flagship is across the road from Aakash South Extension. Weekend & evening ...',
  },
}

const faqs = [
  {
    question: 'Can I join Cerebrum without leaving Aakash?',
    answer:
      'Yes! Many Aakash students join Cerebrum specifically for Biology coaching. Keep your integrated Physics-Chemistry preparation at Aakash and add Cerebrum as your Biology specialist. We offer flexible weekend and evening batches that complement your Aakash schedule perfectly.',
  },
  {
    question: 'Why do Aakash students need extra Biology coaching?',
    answer:
      'Biology alone is 360 of the 720 NEET marks. Aakash has good digital resources but Biology requires depth and personalized attention. With 60-80 students per batch, individual doubt clearing is limited. Cerebrum fills this gap with specialized Biology focus, small batches, and AIIMS-trained faculty.',
  },
  {
    question: 'How close is Cerebrum to Aakash South Extension?',
    answer:
      'Literally across the road. Aakash has a major centre in South Extension Part 1, and our flagship centre is at D-35, South Extension Part 2 — you can finish your Aakash class and walk over. The Aakash Kalu Sarai hub is also only about 10 minutes away.',
  },
  {
    question: 'How does the timing work with Aakash classes?',
    answer:
      'We offer: 1) Weekend intensive batches (Saturday-Sunday) 2) Evening sessions (6-8 PM weekdays) 3) Flexible online sessions. Because we are in the same neighbourhood, you can attend right after your Aakash class — or join live online.',
  },
  {
    question: 'I live in a PG in Ber Sarai, Katwaria Sarai, or Lajpat Nagar. Can I attend?',
    answer:
      'Absolutely. Many outstation students living in the PG belts of Ber Sarai, Katwaria Sarai, and Lajpat Nagar attend the big-brand integrated coachings and add Cerebrum for Biology. South Extension is a short ride from all three, and every batch is also available live online.',
  },
  {
    question: 'Can I use Aakash digital resources along with Cerebrum?',
    answer:
      'Absolutely! Aakash has good test series and digital content. Cerebrum adds the personal teaching and doubt clearing that digital platforms cannot provide. Use both for maximum benefit.',
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

export default function ComplementAakashCoachingSouthDelhiPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Coaching for Aakash Students - South Delhi',
    description:
      'Supplementary NEET Biology coaching designed for students already enrolled at Aakash',
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
        name: 'Complement Aakash Coaching',
        item: 'https://cerebrumbiologyacademy.com/complement-aakash-coaching-south-delhi',
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
        pageSlug="complement-aakash-coaching-south-delhi"
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
      <ComplementAakashContent faqs={faqs} />
    </>
  )
}
