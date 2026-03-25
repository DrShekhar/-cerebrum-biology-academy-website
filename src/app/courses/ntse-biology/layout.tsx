import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NTSE Biology Coaching Delhi | Class 10 Scholarship Preparation',
  description:
    'NTSE Biology coaching in Delhi — Class 10 scholarship prep, MAT & SAT strategies, Rs 1.25 lakh/year scholarship. 90% selection rate. Book a free demo!',
  keywords: [
    'NTSE Biology preparation Delhi',
    'NTSE coaching Delhi',
    'NTSE Biology classes',
    'Class 10 scholarship exam',
    'NTSE SAT Biology',
    'NTSE preparation South Delhi',
    'National Talent Search Exam Biology',
    'NTSE scholarship coaching',
    'NTSE Biology tutor Delhi',
    'NTSE stage 1 preparation',
    'NTSE stage 2 Biology',
    'Talent search exam coaching',
    'NCERT based scholarship exam',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/ntse-biology',
  },

  openGraph: {
    title: 'NTSE Biology Coaching Delhi | Rs 1.25 Lakh/Year Scholarship',
    description:
      "Expert NTSE preparation for Class 10. Biology SAT strategies, 90% selection rate. India's most prestigious scholarship.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NTSE Biology Coaching Delhi | Class 10 Scholarship Preparation',
    description:
      'Expert NTSE Biology coaching in Delhi. Class 10 scholarship preparation, MAT & SAT strategies, Rs 1.',
  },
}

export default function NTSEBiologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'NTSE Biology Preparation',
            description:
              'Comprehensive NTSE preparation focusing on Biology for SAT section. Class 10 scholarship coaching with proven results.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            educationalLevel: 'Class 10',
            about: {
              '@type': 'Thing',
              name: 'National Talent Search Examination',
            },
            teaches: ['Biology SAT', 'MAT Reasoning', 'NCERT Biology', 'Mental Ability'],
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Blended',
              location: {
                '@type': 'Place',
                name: 'Cerebrum Biology Academy',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'South Extension',
                  addressRegion: 'Delhi',
                  addressCountry: 'IN',
                },
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '52',
              bestRating: '5',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: 'Courses',
                item: 'https://cerebrumbiologyacademy.com/courses',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'NTSE Biology',
                item: 'https://cerebrumbiologyacademy.com/courses/ntse-biology',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do you offer NTSE Biology coaching?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Specialized NTSE preparation covering Biology section with scientific reasoning, data interpretation, and application-based questions.',
                },
              },
              {
                '@type': 'Question',
                name: 'What class should I be in for NTSE?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'NTSE is for Class 10 students. Our NTSE Biology module prepares students for both Stage 1 (state) and Stage 2 (national).',
                },
              },
              {
                '@type': 'Question',
                name: 'Is NTSE prep included in Foundation course?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'NTSE Biology preparation is integrated into our Class 10 Foundation course. Standalone NTSE module also available.',
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
