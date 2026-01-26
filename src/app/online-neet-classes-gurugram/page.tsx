import { Metadata } from 'next'
import OnlineNEETClassesContent from './OnlineNEETClassesContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'Online NEET Classes in Gurugram | Live Biology Classes from Home',
  description:
    'Join online NEET Biology classes from Gurugram. Live interactive sessions, recorded lectures, doubt clearing. Same AIIMS faculty as offline. Starting ₹45,000/year.',
  keywords: [
    'online neet classes gurugram',
    'online neet coaching gurgaon',
    'neet online classes gurugram',
    'online biology classes gurugram',
    'neet live classes gurugram',
    'online neet preparation gurugram',
    'neet video lectures gurugram',
    'online medical coaching gurugram',
    'neet online course gurugram',
    'home neet coaching gurgaon',
  ],
  openGraph: {
    title: 'Online NEET Classes in Gurugram | Live Interactive Sessions',
    description: 'Premium online NEET Biology coaching for Gurugram students. Live classes, recordings, doubt support.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-classes-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-classes-gurugram',
  },
}

const faqs = [
  {
    question: 'How do online NEET classes work?',
    answer:
      'Our online classes are live interactive sessions conducted via Zoom/Google Meet. You can see the teacher, ask questions in real-time, and participate in discussions. All classes are recorded for revision. We also have a dedicated app for practice tests and doubt clearing.',
  },
  {
    question: 'Is the faculty same as offline classes?',
    answer:
      'Yes! Dr. Shekhar Singh (AIIMS alumnus) teaches both online and offline batches. You get the same quality of teaching, study materials, and test series. The only difference is the medium of delivery.',
  },
  {
    question: 'What if I miss a live class?',
    answer:
      'All live sessions are recorded and uploaded within 2 hours. You can watch recordings unlimited times for 1 year. We also provide chapter-wise video library with 500+ hours of content.',
  },
  {
    question: 'How is doubt clearing done online?',
    answer:
      'Multiple channels: 1) Live doubts during class, 2) WhatsApp doubt group with 4-hour response time, 3) Weekly doubt clearing sessions (live), 4) One-on-one video calls for complex doubts.',
  },
  {
    question: 'What technology/equipment do I need?',
    answer:
      'Basic requirements: Laptop/tablet/smartphone with camera, stable internet (5 Mbps+), headphones. We provide a tablet on deposit basis if needed. Our platform works on all devices.',
  },
  {
    question: 'Can I switch between online and offline?',
    answer:
      'Yes! Our hybrid model allows flexibility. Many students attend 2-3 days offline and rest online. You can switch modes based on your convenience with prior notice.',
  },
  {
    question: 'What is the fee for online classes?',
    answer:
      'Online-only batches start at ₹45,000/year (vs ₹60,000 offline). This includes live classes, recordings, study material (PDF), test series, and doubt support. Hybrid option available at ₹55,000.',
  },
]

export default function OnlineNEETClassesGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online NEET Biology Classes - Gurugram',
    description: 'Live interactive online NEET Biology coaching for Gurugram students with AIIMS faculty',
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
    educationalLevel: 'Class 11-12 / Dropper',
    courseMode: 'Online',
    teaches: ['NEET Biology', 'Live Classes', 'Recorded Lectures', 'Online Tests'],
    offers: {
      '@type': 'Offer',
      price: '45000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'Live classes + recordings + doubt support',
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
      { '@type': 'ListItem', position: 3, name: 'Online Classes', item: 'https://cerebrumbiologyacademy.com/online-neet-classes-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OnlineNEETClassesContent faqs={faqs} />
    </>
  )
}
