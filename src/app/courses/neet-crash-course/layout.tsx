import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Crash Course 2026 | 3-Month Intensive Biology Program',
  description:
    'Intensive 3-month NEET crash course for Biology. Complete syllabus revision, 100+ mock tests, daily practice sessions. By AIIMS faculty. Limited seats. Enroll now!',
  keywords: [
    'NEET crash course',
    'NEET crash course 2026',
    'NEET 3 month course',
    'NEET intensive batch',
    'NEET Biology crash course',
    'NEET quick revision',
    'NEET last minute preparation',
    'NEET Biology revision course',
    'NEET short term course',
    'NEET Biology intensive program',
  ],
  openGraph: {
    title: 'NEET Crash Course 2026 | 3-Month Intensive Biology Program',
    description:
      'Intensive 3-month NEET crash course for Biology. Complete syllabus revision by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Crash Course 2026 | 3-Month Intensive Biology Program',
    description: 'Intensive 3-month NEET crash course for Biology. Complete syllabus revision, 100+ mock tests, daily practice sessions.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/neet-crash-course',
  },
}

export default function CrashCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
                name: 'NEET Crash Course',
                item: 'https://cerebrumbiologyacademy.com/courses/neet-crash-course',
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
                name: 'What is NEET Crash Course duration and schedule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '7 days/week intensive. Weekdays 9:30-10:30 AM, Weekends 7:00-8:30 AM. Available at South Extension + Online.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who should join NEET Crash Course?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Students who need quick revision before NEET 2026. Covers complete Class 11 + 12 Biology in compressed format.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the fee for NEET Crash Course?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Contact us on WhatsApp for current pricing. EMI options available.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Crash Course enough to crack NEET?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Best for revision, not first-time learning. Ideal for students who completed syllabus but need structured revision and mock test practice.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does Crash Course include mock tests?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Daily practice MCQs, weekly full-length mocks, and previous year paper analysis included.',
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
