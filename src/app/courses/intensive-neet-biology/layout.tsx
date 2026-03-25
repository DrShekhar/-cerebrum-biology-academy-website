import { Metadata } from 'next'
import { CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'Intensive NEET Biology Course - Elite Program',
  description:
    "India's most exclusive NEET Biology course — limited to 50 elite students, 100% AIIMS selection rate. AIIMS faculty, personalized mentorship. Apply now!",
  keywords:
    'intensive NEET biology, premium NEET course, AIIMS selection, elite biology coaching, exclusive NEET preparation, top AIR ranks, advanced biology course',
  authors: [{ name: 'Cerebrum Biology Academy' }],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/intensive-neet-biology',
  },

  openGraph: {
    title: 'Intensive NEET Biology Course - Elite Program',
    description:
      "India's most exclusive NEET Biology course with 100% AIIMS selection rate. Limited seats, elite faculty, guaranteed results.",
    images: ['/courses/intensive-neet-biology/hero-premium.jpg'],
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/courses/intensive-neet-biology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intensive NEET Biology Course - Elite Program',
    description:
      "India's most exclusive NEET Biology course with 100% AIIMS selection rate. Limited seats, elite faculty, guaranteed results.",
    images: ['/courses/intensive-neet-biology/hero-premium.jpg'],
  },
}

export default function IntensiveNEETBiologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CourseWithHowToSchema
        courseName="Intensive NEET Biology"
        courseDescription="India's most exclusive NEET Biology course. Limited to 50 elite students with 100% AIIMS selection rate. Features AIIMS faculty, personalized mentorship, and advanced methodologies."
        courseUrl="https://cerebrumbiologyacademy.com/courses/intensive-neet-biology"
        price={85000}
        duration="10 months"
        educationalLevel="Class 12"
        syllabus={[
          'Advanced Concept Mastery',
          'Elite Problem Solving',
          'Personalized Mentorship',
          'AIIMS-Level Questions',
          'Exclusive Mock Tests',
          'One-on-One Sessions',
        ]}
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
                name: 'Intensive NEET Biology',
                item: 'https://cerebrumbiologyacademy.com/courses/intensive-neet-biology',
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
                name: 'What is Intensive NEET Biology?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Premium fast-track NEET Biology preparation with small batches (max 12 students), personal mentoring, and guaranteed improvement.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who is this course for?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Serious NEET aspirants targeting top 1% scores. Students who want maximum faculty interaction and personalized strategy.',
                },
              },
              {
                '@type': 'Question',
                name: 'What results has this program achieved?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '98% success rate. Student Sadhna Sirin scored 695/720. Multiple AIIMS selections every year.',
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
