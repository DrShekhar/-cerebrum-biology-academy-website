import { Metadata } from 'next'
import NEETCrashCourseContent from './NEETCrashCourseContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'NEET Crash Course in Gurugram | 45-Day Intensive Biology Program',
  description:
    'Join our 45-day NEET Biology crash course in Gurugram. Complete syllabus revision, 1000+ questions, daily tests. Perfect for last-minute preparation. Starting ₹25,000.',
  keywords: [
    'neet crash course gurugram',
    'neet biology crash course',
    '45 day neet course',
    'neet last minute preparation',
    'neet revision course gurugram',
    'intensive neet biology',
    'neet quick revision',
    'short term neet coaching',
  ],
  openGraph: {
    title: 'NEET Crash Course in Gurugram | 45-Day Intensive Program',
    description: 'Complete NEET Biology syllabus in 45 days. Daily tests, 1000+ questions, expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-crash-course-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-crash-course-gurugram',
  },
}

const faqs = [
  {
    question: 'How long is the NEET crash course?',
    answer:
      'Our intensive crash course runs for 45 days, covering the complete NEET Biology syllabus with daily 6-hour sessions. We also offer 30-day and 60-day variants based on your preparation level.',
  },
  {
    question: 'Is crash course enough for NEET preparation?',
    answer:
      'A crash course is ideal for students who have already studied the syllabus once and need intensive revision. For complete beginners, we recommend our foundation courses. However, many students improve 50-100 marks through our crash course alone.',
  },
  {
    question: 'What is covered in 45 days?',
    answer:
      'Complete NCERT Biology revision, 1000+ high-yield questions, 15 full-length mock tests, chapter-wise tests, previous year papers (last 10 years), and focused sessions on frequently asked topics.',
  },
  {
    question: 'What are the batch timings?',
    answer:
      'Crash course runs 6 hours daily (9 AM - 3 PM or 2 PM - 8 PM). Weekend batches available with 8-hour sessions. Online live option also available for students who cannot attend offline.',
  },
  {
    question: 'What is the fee for the crash course?',
    answer:
      'Crash course fee is ₹25,000 for 45 days (offline) and ₹20,000 for online. This includes study material, test series, and doubt clearing. EMI options available.',
  },
  {
    question: 'When does the next batch start?',
    answer:
      'We run multiple batches throughout the year. The next batch typically starts within 1-2 weeks. Contact us for exact dates and seat availability.',
  },
  {
    question: 'What results can I expect from the crash course?',
    answer:
      'Students typically improve by 50-100 marks in Biology. Last year, 78% of crash course students cleared NEET cutoff, with average improvement of 75 marks.',
  },
]

export default function NEETCrashCourseGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Crash Course - Gurugram',
    description: '45-day intensive NEET Biology revision course with complete syllabus coverage and 1000+ practice questions',
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
    educationalLevel: 'Class 12 / Dropper',
    timeRequired: 'P45D',
    teaches: ['NEET Biology Revision', 'High-Yield Topics', 'Mock Tests', 'Previous Year Analysis'],
    offers: {
      '@type': 'Offer',
      price: '25000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: '6 hours/day for 45 days',
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
      { '@type': 'ListItem', position: 3, name: 'Crash Course', item: 'https://cerebrumbiologyacademy.com/neet-crash-course-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NEETCrashCourseContent faqs={faqs} />
    </>
  )
}
