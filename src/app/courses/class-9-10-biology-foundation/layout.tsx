import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 9-10 Biology Foundation Course | Pre-NEET Coaching | Cerebrum',
  description:
    'Best Biology tuition for Class 9 & 10 students in Delhi. CBSE & ICSE syllabus with NEET foundation. Build strong basics for medical entrance. Small batches, expert faculty. Book free demo!',
  keywords: [
    'Biology tuition class 9',
    'Biology tuition class 10',
    'Class 9 Biology coaching Delhi',
    'Class 10 Biology coaching Delhi',
    'CBSE Biology tuition',
    'ICSE Biology tuition',
    'Pre-NEET foundation course',
    'Biology classes for class 9 10',
    'Best Biology teacher class 9',
    'Best Biology teacher class 10',
    'Science tuition class 9 10 Delhi',
    'Biology home tutor Delhi',
    'Foundation Biology course NEET',
    'Class 9 10 Biology South Delhi',
  ],
  openGraph: {
    title: 'Class 9-10 Biology Foundation Course | Pre-NEET Coaching',
    description:
      'Build strong Biology fundamentals in Class 9-10 for future NEET success. CBSE & ICSE syllabus, expert faculty, small batches.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/courses/class-9-10-biology-foundation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 9-10 Biology Foundation Course | Pre-NEET Coaching | Cerebrum',
    description: 'Best Biology tuition for Class 9 & 10 students in Delhi. CBSE & ICSE syllabus with NEET foundation.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/class-9-10-biology-foundation',
  },
}

function CourseSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Class 9-10 Biology Foundation Course',
    description:
      'Comprehensive Biology foundation program for Class 9 and 10 students. Covers CBSE and ICSE syllabus with NEET-oriented concept building for future medical aspirants.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: ['Class 9', 'Class 10'],
    teaches: ['Biology', 'Life Sciences', 'NEET Foundation'],
    availableLanguage: ['English', 'Hindi'],
    coursePrerequisites: 'Class 8 completion',
    timeRequired: 'P1Y',
    offers: {
      '@type': 'Offer',
      price: '45000',
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

export default function Class910FoundationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CourseSchema />
      {children}
    </>
  )
}
