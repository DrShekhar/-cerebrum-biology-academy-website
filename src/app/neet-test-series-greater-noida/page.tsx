import { Metadata } from 'next'
import NEETTestSeriesGreaterNoidaContent from './NEETTestSeriesGreaterNoidaContent'

export const metadata: Metadata = {
  title: 'NEET Test Series in Greater Noida | 50+ Mock Tests with Analysis',
  description:
    'Join our comprehensive NEET Biology test series in Greater Noida. 50+ full-length mock tests, detailed analysis, rank prediction. Online and offline options. Starting ₹8,000.',
  keywords: [
    'neet test series greater noida',
    'neet mock test greater noida',
    'neet biology test series greater noida',
    'neet practice tests greater noida',
    'neet mock exam greater noida',
    'neet test series online greater noida',
    'neet rank predictor greater noida',
    'best neet test series greater noida',
  ],
  openGraph: {
    title: 'NEET Test Series in Greater Noida | 50+ Mock Tests',
    description:
      'Comprehensive NEET test series with detailed analysis, rank prediction, and performance tracking.',
    url: 'https://cerebrumbiologyacademy.com/neet-test-series-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-test-series-greater-noida',
  },
}

const faqs = [
  {
    question: 'How many tests are included in the test series?',
    answer:
      '50+ full-length mock tests following the latest NTA NEET pattern. Includes 20 chapter-wise tests, 15 subject tests (Biology only), and 15 full syllabus tests.',
  },
  {
    question: 'Is the test series available online for Greater Noida students?',
    answer:
      'Yes, all tests are available both online and offline. Online tests can be taken from your Greater Noida home with the same interface as the actual NEET exam. Offline tests are conducted at our Sector 62, Noida center.',
  },
  {
    question: 'What analysis do I get after each test?',
    answer:
      'Detailed analysis includes: subject-wise score breakdown, chapter-wise accuracy, time management insights, comparison with toppers, weak area identification, and personalized improvement suggestions.',
  },
  {
    question: 'Can I join just the test series without coaching?',
    answer:
      'Yes! Our test series is available as a standalone product. Many Greater Noida students from Aakash, WiseTurtle, Allen, and other institutes join our test series for additional practice and analysis.',
  },
  {
    question: 'What is the fee for the test series?',
    answer:
      'Test series fee starts from ₹8,000 for the Basic package (30 tests) and goes up to ₹15,000 for the Premium package (50+ tests with mentorship). Online-only package is ₹6,000.',
  },
  {
    question: 'When are tests conducted?',
    answer:
      'Offline tests are conducted every Sunday (9 AM - 12 PM) at our Sector 62, Noida center. Online tests can be taken anytime within a 48-hour window after release. New tests are released every week.',
  },
  {
    question: 'Do you provide rank prediction?',
    answer:
      'Yes, we provide All India Rank prediction based on your test scores compared to our database of 1,50,000+ students. Accuracy rate of 90% within ±5000 rank range.',
  },
]

export default function NEETTestSeriesGreaterNoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Test Series - Greater Noida',
    description:
      'Comprehensive NEET Biology mock test series with 50+ tests, detailed analysis, and rank prediction for Greater Noida students',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B-45, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'UP',
        postalCode: '201301',
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 11-12 / Dropper',
    teaches: ['NEET Mock Tests', 'Test Taking Strategy', 'Time Management', 'Performance Analysis'],
    offers: {
      '@type': 'Offer',
      price: '8000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: 'Weekly tests for 6 months',
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
        name: 'NEET Coaching Greater Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Test Series',
        item: 'https://cerebrumbiologyacademy.com/neet-test-series-greater-noida',
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
      <NEETTestSeriesGreaterNoidaContent faqs={faqs} />
    </>
  )
}
