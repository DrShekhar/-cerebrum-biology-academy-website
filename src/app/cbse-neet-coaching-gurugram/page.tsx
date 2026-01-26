import { Metadata } from 'next'
import CBSENEETCoachingContent from './CBSENEETCoachingContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'CBSE Board NEET Coaching in Gurugram | Biology for CBSE Students',
  description:
    'Specialized NEET Biology coaching for CBSE board students in Gurugram. Aligned with NCERT curriculum, 98% success rate. Perfect for DPS, Shri Ram, GD Goenka students.',
  keywords: [
    'cbse neet coaching gurugram',
    'neet coaching for cbse students',
    'cbse biology tuition gurugram',
    'ncert based neet coaching',
    'dps gurugram neet coaching',
    'cbse board neet preparation',
    'neet biology cbse syllabus',
    'cbse neet batch gurugram',
  ],
  openGraph: {
    title: 'CBSE Board NEET Coaching in Gurugram | NCERT-Aligned Preparation',
    description: 'NEET Biology coaching designed specifically for CBSE students. NCERT-focused curriculum with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/cbse-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cbse-neet-coaching-gurugram',
  },
}

const faqs = [
  {
    question: 'Is CBSE board better for NEET preparation?',
    answer:
      'Yes, CBSE board is considered ideal for NEET as the exam is entirely NCERT-based. CBSE students have a natural advantage since their school curriculum aligns perfectly with NEET syllabus. Our coaching maximizes this advantage.',
  },
  {
    question: 'How does your coaching align with CBSE curriculum?',
    answer:
      'Our entire teaching methodology is NCERT-focused. We cover every line of NCERT Biology textbooks, use CBSE-style explanations, and integrate board exam preparation with NEET coaching seamlessly.',
  },
  {
    question: 'Which CBSE schools in Gurugram do your students come from?',
    answer:
      'We have students from top CBSE schools including DPS Gurugram, The Shri Ram School, GD Goenka, Amity International, Blue Bells, K.R. Mangalam, Scottish High, and many more.',
  },
  {
    question: 'Can I prepare for both CBSE boards and NEET simultaneously?',
    answer:
      'Absolutely! Our integrated approach ensures you excel in both. Since NEET Biology is NCERT-based, thorough NEET preparation automatically helps you score 95%+ in CBSE Biology boards.',
  },
  {
    question: 'What batch timings are available for CBSE school students?',
    answer:
      'We offer morning batches (6:30-8:30 AM before school), evening batches (5:00-7:00 PM after school), and weekend batches. Special timings aligned with DPS, GD Goenka, and Shri Ram school schedules.',
  },
  {
    question: 'How much do CBSE students typically score in NEET Biology?',
    answer:
      'Our CBSE students average 320+ in NEET Biology (out of 360). Many score 340+ due to their strong NCERT foundation. Last year, 85% of our CBSE students cleared NEET cutoff.',
  },
  {
    question: 'What is the fee for CBSE NEET coaching?',
    answer:
      'Fees range from ₹45,000 to ₹1,56,000/year depending on the tier (Pursuit, Ascent, or Pinnacle). We offer special packages for CBSE students that integrate board and NEET preparation.',
  },
]

export default function CBSENEETCoachingGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CBSE Board NEET Biology Coaching - Gurugram',
    description: 'Specialized NEET Biology coaching for CBSE board students with NCERT-aligned curriculum',
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
    educationalLevel: 'Class 11-12 CBSE',
    teaches: ['NCERT Biology', 'NEET Biology', 'Human Physiology', 'Genetics', 'Ecology'],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: 'Aligned with CBSE school timings',
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
      { '@type': 'ListItem', position: 3, name: 'CBSE NEET Coaching', item: 'https://cerebrumbiologyacademy.com/cbse-neet-coaching-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CBSENEETCoachingContent faqs={faqs} />
    </>
  )
}
