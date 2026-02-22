import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CBSE Biology Class 11 & 12 Coaching Delhi | Board Exam Preparation | Cerebrum',
  description:
    'Best CBSE Biology coaching for Class 11 & 12 in Delhi. Expert faculty, complete NCERT coverage, board exam preparation with NEET alignment. South Delhi centers. Book free demo!',
  keywords: [
    'CBSE Biology class 11 coaching',
    'CBSE Biology class 12 coaching',
    'Class 11 Biology tuition Delhi',
    'Class 12 Biology tuition Delhi',
    'CBSE board Biology coaching',
    'NCERT Biology coaching Delhi',
    'Biology board exam preparation',
    'Class 11 12 Biology South Delhi',
    'Best Biology teacher class 11 CBSE',
    'Best Biology teacher class 12 CBSE',
    'CBSE Biology tutor Greater Kailash',
    'CBSE Biology coaching Defence Colony',
  ],
  openGraph: {
    title: 'CBSE Biology Class 11 & 12 Coaching | Board + NEET Preparation',
    description:
      'Comprehensive CBSE Biology coaching for Class 11 & 12. Complete NCERT coverage with NEET-aligned teaching. Expert faculty, small batches.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/courses/cbse-biology-class-11-12',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBSE Biology Class 11 & 12 Coaching Delhi | Board Exam Preparation | Cerebrum',
    description: 'Best CBSE Biology coaching for Class 11 & 12 in Delhi.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/cbse-biology-class-11-12',
  },
}

function CBSEBiologySchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CBSE Biology Class 11 & 12 Coaching Program',
    description:
      'Complete CBSE Biology coaching for Class 11 and 12 students. NCERT-focused teaching with board exam preparation and NEET alignment. Expert AIIMS faculty.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: ['Class 11', 'Class 12'],
    teaches: ['CBSE Biology', 'NCERT Biology', 'Board Exam Preparation'],
    availableLanguage: ['English', 'Hindi'],
    coursePrerequisites: 'Class 10 completion with Science',
    timeRequired: 'P2Y',
    offers: {
      '@type': 'Offer',
      price: '60000',
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

export default function CBSEBiologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CBSEBiologySchema />
      {children}
    </>
  )
}
