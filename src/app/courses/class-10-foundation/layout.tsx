import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 10 Biology Foundation | Board + NEET Preparation',
  description:
    'Class 10 Biology coaching with board exam focus and NEET foundation. Life processes, heredity, evolution covered. Expert AIIMS faculty, 95% board toppers.',
  keywords: [
    'Class 10 Biology tuition Delhi',
    'Class 10 Biology coaching',
    'NCERT Biology class 10',
    'Pre-NEET foundation class 10',
    'Biology tutor class 10 Delhi',
    'Class 10 board preparation Biology',
    'Biology classes for class 10',
    'Class 10 NEET preparation',
    'Class 10 Biology South Delhi',
    'Life Processes coaching',
    'CBSE Biology class 10',
    'Class 10 home tutor Biology',
    'Heredity and Evolution class 10',
  ],
  openGraph: {
    title: 'Class 10 Biology Foundation | Board + NEET Prep',
    description:
      'Excel in Class 10 boards and build NEET foundation. Life processes, heredity, evolution with expert faculty.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 10 Biology Foundation | Board + NEET Preparation',
    description: 'Class 10 Biology coaching with board exam focus and NEET foundation. Life processes, heredity, evolution covered.',
  },
}

export default function Class10FoundationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Class 10 Biology Foundation Course',
            description:
              'Comprehensive Class 10 Biology course focusing on board exam excellence and NEET foundation.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            educationalLevel: 'Class 10',
            about: {
              '@type': 'Thing',
              name: 'Class 10 Biology',
            },
            teaches: [
              'Life Processes',
              'Control and Coordination',
              'Reproduction',
              'Heredity and Evolution',
              'Our Environment',
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
