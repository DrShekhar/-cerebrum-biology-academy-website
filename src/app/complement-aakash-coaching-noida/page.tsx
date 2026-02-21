import { Metadata } from 'next'
import ComplementAakashNoidaContent from './ComplementAakashNoidaContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const noidaLocation = CONTACT_INFO.location.noida

export const metadata: Metadata = {
  title: 'Complement Aakash Coaching with Cerebrum Biology | Noida',
  description:
    'Boost your NEET Biology score while staying at Aakash. Cerebrum offers weekend & evening Biology classes for Aakash students in Noida. Personalized attention from AIIMS faculty.',
  keywords: [
    'complement aakash coaching noida',
    'aakash coaching biology supplement',
    'extra biology classes aakash students',
    'biology tuition with aakash',
    'aakash biology weak areas',
    'biology boost aakash noida',
    'weekend neet biology classes',
    'evening biology coaching noida',
  ],
  openGraph: {
    title: 'Complement Aakash with Cerebrum Biology Coaching | Noida',
    description: 'Keep your Aakash enrollment. Add focused Biology coaching from AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/complement-aakash-coaching-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/complement-aakash-coaching-noida',
  },
}

const faqs = [
  {
    question: 'Can I join Cerebrum without leaving Aakash?',
    answer:
      'Yes! Many Aakash students join Cerebrum specifically for Biology coaching. We offer flexible weekend and evening batches that complement your Aakash schedule perfectly.',
  },
  {
    question: 'Why do Aakash students need extra Biology coaching?',
    answer:
      'Aakash has good digital resources but Biology requires depth and personalized attention. With 60-80 students per batch, individual doubt clearing is limited. Cerebrum fills this gap with specialized Biology focus and AIIMS faculty.',
  },
  {
    question: 'How does the timing work with Aakash classes?',
    answer:
      'We offer: 1) Weekend intensive batches (Saturday-Sunday) 2) Evening sessions (6-8 PM weekdays) 3) Flexible online sessions. Choose what fits your Aakash schedule.',
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
    question: 'Where is Cerebrum located in Noida?',
    answer: `Our center is at ${noidaLocation.streetAddress}, ${noidaLocation.addressLocality}. Near Sector 62 Metro Station (Blue Line).`,
  },
]

export default function ComplementAakashCoachingNoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Coaching for Aakash Students - Noida',
    description:
      'Supplementary NEET Biology coaching designed for students already enrolled at Aakash Institute',
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
        name: 'Complement Aakash Coaching',
        item: 'https://cerebrumbiologyacademy.com/complement-aakash-coaching-noida',
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
      <ComplementAakashNoidaContent faqs={faqs} />
    </>
  )
}
