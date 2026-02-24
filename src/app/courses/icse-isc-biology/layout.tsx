import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ICSE & ISC Biology Coaching Delhi | Class 9-12',
  description:
    'ICSE and ISC Biology coaching in Delhi for Class 9-12. Selina & Concise Biology coverage, board exam prep with expert AIIMS faculty. Book a free demo!',
  keywords: [
    'ICSE Biology coaching Delhi',
    'ISC Biology coaching Delhi',
    'ICSE Biology tuition class 9',
    'ICSE Biology tuition class 10',
    'ISC Biology class 11 coaching',
    'ISC Biology class 12 coaching',
    'Selina Biology tutor Delhi',
    'Concise Biology coaching',
    'ICSE Biology tutor South Delhi',
    'ISC Biology tutor Greater Kailash',
    'Best ICSE Biology teacher Delhi',
    'ICSE board Biology preparation',
  ],
  openGraph: {
    title: 'ICSE & ISC Biology Coaching Delhi | Expert Tutoring',
    description:
      'Specialized ICSE and ISC Biology coaching. Complete Selina/Concise Biology coverage for Class 9-12. Expert faculty, small batches.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/courses/icse-isc-biology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICSE & ISC Biology Coaching Delhi | Class 9-12',
    description: 'Expert ICSE and ISC Biology coaching in Delhi. Class 9, 10 ICSE and Class 11, 12 ISC Biology tuition.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/icse-isc-biology',
  },
}

function ICSEISCSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'ICSE & ISC Biology Coaching Program',
    description:
      'Comprehensive Biology coaching for ICSE (Class 9-10) and ISC (Class 11-12) students. Complete Selina and Concise Biology coverage with board exam preparation.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    teaches: ['ICSE Biology', 'ISC Biology', 'Selina Biology', 'Board Exam Preparation'],
    availableLanguage: 'English',
    coursePrerequisites: 'Class 8 completion',
    offers: {
      '@type': 'Offer',
      price: '55000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'offline',
        location: {
          '@type': 'Place',
          name: 'South Extension Center',
          address: 'D 35, South Extension Part 2, New Delhi',
        },
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function ICSEISCBiologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ICSEISCSchema />
      {children}
    </>
  )
}
