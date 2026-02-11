import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NTSE Biology Coaching Delhi | Class 10 Scholarship Preparation | Cerebrum',
  description:
    'Expert NTSE Biology coaching in Delhi. Class 10 scholarship preparation, MAT & SAT strategies, Rs 1.25 lakh/year scholarship till PhD. 90% selection rate.',
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
  openGraph: {
    title: 'NTSE Biology Coaching Delhi | Rs 1.25 Lakh/Year Scholarship | Cerebrum',
    description:
      "Expert NTSE preparation for Class 10. Biology SAT strategies, 90% selection rate. India's most prestigious scholarship.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NTSE Biology Coaching Delhi | Class 10 Scholarship Preparation | Cerebrum',
    description: 'Expert NTSE Biology coaching in Delhi. Class 10 scholarship preparation, MAT & SAT strategies, Rs 1.',
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
              ratingValue: '4.9',
              reviewCount: '52',
              bestRating: '5',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
