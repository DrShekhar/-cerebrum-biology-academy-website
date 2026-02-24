import type { Metadata } from 'next'
import { NRIStudentsHubPage } from './NRIStudentsHubPage'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'NEET Coaching for NRI Students | 14 Countries | Online Classes',
  description:
    'Best NEET Biology coaching for NRI students in UAE, Saudi Arabia, Kuwait, Singapore, Qatar, Oman, Malaysia, Nepal & more. AIIMS faculty, flexible timings, NEET exam centers abroad. 98% success rate.',
  keywords:
    'NRI NEET coaching, NEET coaching abroad, NEET coaching UAE, NEET coaching Dubai, NEET coaching Saudi Arabia, NEET coaching Singapore, NEET coaching Kuwait, online NEET coaching overseas, NRI quota NEET, CBSE students abroad NEET, Indian students abroad NEET preparation',
  openGraph: {
    title: 'NEET Coaching for NRI Students | 14+ Countries',
    description:
      'Top NEET Biology coaching for NRI students worldwide. UAE, Saudi, Kuwait, Singapore, Qatar & more. AIIMS faculty, 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/nri-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/nri-students',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy',
  description:
    'Premier NEET Biology coaching institute offering specialized online classes for NRI students across 14+ countries. Expert faculty from AIIMS with 98% success rate.',
  url: 'https://cerebrumbiologyacademy.com',
  logo: 'https://cerebrumbiologyacademy.com/logo.png',
  telephone: '+91-8826444334',
  email: 'contact@cerebrumbiologyacademy.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: 'New Delhi',
  },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'Qatar' },
    { '@type': 'Country', name: 'Oman' },
    { '@type': 'Country', name: 'Bahrain' },
    { '@type': 'Country', name: 'Singapore' },
    { '@type': 'Country', name: 'Malaysia' },
    { '@type': 'Country', name: 'Nepal' },
    { '@type': 'Country', name: 'Sri Lanka' },
  ],
  sameAs: [
    'https://www.youtube.com/@cerebrumbiologyacademy',
    'https://www.youtube.com/@drshekharcsingh',
    'https://www.instagram.com/cerebrumbiologyacademy',
  ],
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Biology Coaching for NRI Students',
  description:
    'Comprehensive NEET Biology preparation course for NRI students with live online classes, flexible timings for different time zones, recorded lectures, and personalized mentorship.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  courseMode: 'Online',
  educationalLevel: 'Higher Secondary',
  teaches: 'NEET Biology, NCERT Biology, Medical Entrance Exam Preparation',
  numberOfCredits: 0,
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      name: 'NEET 2026 Foundation Batch (Class 11)',
      courseMode: 'Online',
      courseSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'Weekly',
        scheduleTimezone: 'Asia/Kolkata',
      },
    },
    {
      '@type': 'CourseInstance',
      name: 'NEET 2026 Target Batch (Class 12)',
      courseMode: 'Online',
      courseSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'Weekly',
        scheduleTimezone: 'Asia/Kolkata',
      },
    },
  ],
  offers: {
    '@type': 'Offer',
    category: 'NRI Students',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'INR',
    price: '45000',
    priceValidUntil: '2026-05-31',
    url: 'https://cerebrumbiologyacademy.com/nri-students',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: '38',
    bestRating: '5',
    worstRating: '1',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the class timings for NRI students in different time zones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer flexible batch timings to accommodate students from all time zones. Weekend batches (Friday/Saturday) are available at 6:00 PM IST and 8:00 PM IST. Weekday batches run from 7:00 PM - 9:00 PM IST. All live classes are also recorded.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods are available for NRI students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept international payments through Razorpay (all major international credit/debit cards), PayPal, direct bank wire transfer (SWIFT), and UPI for NRI accounts. Payment can be made in INR or USD.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the NRI quota work for NEET admissions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRI quota reserves 15% of seats in private and deemed medical colleges for NRI-sponsored candidates. The student must be an Indian citizen, and the NRI sponsor must provide an NRI certificate. NEET qualification is mandatory.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I appear for NEET exam from abroad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! NEET 2026 will have exam centers in 14+ countries including UAE (Dubai, Abu Dhabi, Sharjah), Saudi Arabia (Riyadh, Jeddah), Kuwait, Qatar, Oman, Bahrain, Singapore, Malaysia, Nepal, Sri Lanka, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which board syllabus do you follow - CBSE, ICSE, or State Board?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our curriculum is NCERT-based, which is the official syllabus for NEET. We help students from all boards (CBSE, ICSE, IB, IGCSE, State Boards) bridge any syllabus gaps.',
      },
    },
  ],
}

export default function NRIStudentsPage() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NRIStudentsHubPage />
    </>
  )
}
