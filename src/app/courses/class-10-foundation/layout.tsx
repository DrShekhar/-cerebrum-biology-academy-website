import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 10 Biology Foundation | Board + NEET Preparation',
  description:
    'Class 10 Biology coaching with board exam focus and NEET foundation. Life processes, heredity, evolution. AIIMS faculty at Cerebrum. Book a free demo!',
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
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/class-10-foundation',
  },

  openGraph: {
    title: 'Class 10 Biology Foundation | Board + NEET Prep',
    description:
      'Excel in Class 10 boards and build NEET foundation. Life processes, heredity, evolution with expert faculty.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 10 Biology Foundation | Board + NEET Preparation',
    description:
      'Class 10 Biology coaching with board exam focus and NEET foundation. Life processes, heredity, evolution covered.',
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
                name: 'Class 10 Foundation',
                item: 'https://cerebrumbiologyacademy.com/courses/class-10-foundation',
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
                name: 'What is the fee for Class 10 Biology Foundation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Starting \u20B945,000/year (Pursuit). Ascent \u20B960,000/year. Pinnacle \u20B990,000/year. EMI from \u20B93,750/month.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does Class 10 Biology coaching help with board exams?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '95% of our Class 10 students score 90+ in board Biology. Course follows NCERT with deeper concepts.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who teaches Class 10 Biology at Cerebrum?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dr. Shekhar C Singh, AIIMS New Delhi alumnus, 15+ years experience, 15,000+ students mentored.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is covered in Class 10 Biology Foundation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '10 modules: Life Processes, Control & Coordination, Reproduction, Heredity & Evolution, Environment, Natural Resources, Board Mastery, Olympiad Prep.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Olympiad preparation included in Class 10?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. NSEB and IBO preparation included. Dedicated Olympiad module with mock tests and advanced problem-solving.',
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
