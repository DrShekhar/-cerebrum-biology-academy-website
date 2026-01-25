import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 9 Biology Foundation | Pre-NEET Preparation | Cerebrum Academy',
  description:
    'Class 9 Biology foundation course with NEET-aligned curriculum. NCERT-based conceptual learning, interactive sessions, early NEET preparation. Expert AIIMS faculty.',
  keywords: [
    'Class 9 Biology tuition Delhi',
    'Class 9 Biology coaching',
    'NCERT Biology class 9',
    'Pre-NEET foundation class 9',
    'Biology tutor class 9 Delhi',
    'Class 9 Science tuition',
    'Biology classes for class 9',
    'Early NEET preparation',
    'Class 9 Biology South Delhi',
    'Foundation Biology course',
    'CBSE Biology class 9',
    'Class 9 home tutor Biology',
  ],
  openGraph: {
    title: 'Class 9 Biology Foundation | Pre-NEET Preparation | Cerebrum',
    description:
      'Build strong Biology foundation in Class 9 for future NEET success. NCERT-based, interactive learning with expert faculty.',
    type: 'website',
  },
}

export default function Class9FoundationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Class 9 Biology Foundation Course',
            description:
              'Foundation Biology course for Class 9 students with NEET-aligned curriculum and NCERT-based teaching.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            educationalLevel: 'Class 9',
            about: {
              '@type': 'Thing',
              name: 'Class 9 Biology',
            },
            teaches: [
              'Cell Biology',
              'Tissues',
              'Diversity in Living Organisms',
              'Life Processes Introduction',
            ],
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
          }),
        }}
      />
      {children}
    </>
  )
}
