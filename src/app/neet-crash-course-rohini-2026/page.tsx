import { Metadata } from 'next'
import NEETCrashCourseRohiniContent from './NEETCrashCourseRohiniContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const rohiniLocation = CONTACT_INFO.centers.rohini

export const metadata: Metadata = {
  title: 'NEET Crash Course Rohini 2026 | 6-Month Intensive | Cerebrum Academy',
  description:
    'Intensive NEET 2026 crash course at Rohini DC Chauk. 6-month program, daily classes, 100+ mock tests. For droppers & 12th students. WhatsApp 88264-44334',
  keywords: [
    'NEET crash course Rohini',
    'NEET 2026 intensive batch',
    'NEET dropper batch Rohini',
    'NEET crash course Delhi',
    'NEET 6 month course Rohini',
    'NEET intensive coaching Rohini',
    'NEET biology crash course DC Chauk',
    'NEET repeater batch Rohini 2026',
  ],
  openGraph: {
    title: 'NEET Crash Course Rohini 2026 | 6-Month Intensive Program',
    description:
      'Join our 6-month intensive NEET 2026 crash course at Rohini DC Chauk. Daily 4-hour classes, 100+ mock tests, expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-crash-course-rohini-2026',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-crash-course-rohini-2026',
  },
}

const faqs = [
  {
    question: 'What is the duration of the NEET 2026 crash course in Rohini?',
    answer:
      'Our NEET 2026 crash course is a 6-month intensive program running from December 2025 to May 2026. It includes daily 4-hour classes, comprehensive study material, and 100+ mock tests to ensure thorough preparation.',
  },
  {
    question: 'What is the fee for the NEET crash course at Rohini center?',
    answer:
      'The fee for our 6-month NEET crash course for droppers is Rs 85,500/year. This includes study material, 100+ mock tests, daily doubt sessions, and access to our AI-powered learning tools. EMI options are available.',
  },
  {
    question: 'Who is eligible for the NEET 2026 crash course?',
    answer:
      'The crash course is designed for two categories: (1) Droppers who have already appeared for NEET and want to improve their score, and (2) Class 12 appearing students who need intensive last-minute preparation. Both require prior completion of NEET syllabus at least once.',
  },
  {
    question: 'What is the daily schedule for the crash course?',
    answer:
      'Daily schedule includes: Morning Batch (7 AM - 11 AM) or Evening Batch (4 PM - 8 PM). Each session covers 2 hours of concept revision, 1 hour of MCQ practice, and 1 hour of doubt clearing. Weekend batches also available.',
  },
  {
    question: 'How can I reach the Rohini center?',
    answer:
      'Our Rohini center is located at 211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini. It is just 2 minutes walk from Rohini West Metro Station (Red Line). Easy access from all Rohini sectors, Pitampura, and Shalimar Bagh.',
  },
  {
    question: 'What results can I expect from the crash course?',
    answer:
      'Our crash course students typically improve by 80-120 marks in Biology alone. Last year, 82% of our crash course students cleared NEET cutoff. Our topper Sadhna Sirin scored 695/720 after joining our intensive program.',
  },
  {
    question: 'Do you provide study material for the crash course?',
    answer:
      'Yes, comprehensive study material is included. You will receive NCERT-based notes, 5000+ MCQs with solutions, previous 15 years question papers, and access to our digital learning platform with video lectures.',
  },
]

export default function NEETCrashCourseRohini2026Page() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET 2026 Crash Course - Rohini',
    description:
      '6-month intensive NEET 2026 preparation crash course for droppers and 12th appearing students at Rohini DC Chauk center.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: rohiniLocation.streetAddress,
        addressLocality: rohiniLocation.addressLocality,
        addressRegion: rohiniLocation.addressRegion,
        postalCode: rohiniLocation.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 12 / Dropper',
    timeRequired: 'P6M',
    teaches: [
      'NEET Biology Complete Revision',
      'High-Yield Topics',
      '100+ Mock Tests',
      'Previous Year Analysis',
      'Doubt Clearing Sessions',
    ],
    offers: {
      '@type': 'Offer',
      price: '85500',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Offline',
      courseWorkload: '4 hours/day for 6 months',
      startDate: '2025-12-01',
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
        name: 'NEET Coaching Rohini',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Crash Course 2026',
        item: 'https://cerebrumbiologyacademy.com/neet-crash-course-rohini-2026',
      },
    ],
  }

  // VideoObject schema for embedded student testimonial videos
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'NEET Success Stories - Student Testimonials',
    description:
      'Watch real success stories from our NEET crash course students at Rohini center. See how they improved their scores and got selected in top medical colleges.',
    thumbnailUrl: 'https://img.youtube.com/vi/bk6wQCh6b9w/maxresdefault.jpg',
    uploadDate: '2025-01-15',
    contentUrl: 'https://www.youtube.com/watch?v=bk6wQCh6b9w',
    embedUrl: 'https://www.youtube.com/embed/bk6wQCh6b9w',
    duration: 'PT5M',
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <NEETCrashCourseRohiniContent faqs={faqs} />
    </>
  )
}
