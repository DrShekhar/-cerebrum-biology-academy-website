import { Metadata } from 'next'
import { CourseWithHowToSchema } from '@/components/seo/HowToEnrollSchema'

export const metadata: Metadata = {
  title: 'Intensive NEET Biology Course - Elite Program',
  description:
    "India's most exclusive NEET Biology course — limited to 50 elite students, 100% AIIMS selection rate. AIIMS faculty, personalized mentorship. Apply now!",
  keywords:
    'intensive NEET biology, premium NEET course, AIIMS selection, elite biology coaching, exclusive NEET preparation, top AIR ranks, advanced biology course',
  authors: [{ name: 'Cerebrum Biology Academy' }],
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
      {children}
    </>
  )
}
