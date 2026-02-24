import { Metadata } from 'next'
import { IntensiveNEETBiologyPage } from '@/components/courses/premium/IntensiveNEETBiologyPage'

export const metadata: Metadata = {
  title: 'Intensive NEET Biology Course - Elite Program',
  description:
    "Join India's most exclusive NEET Biology course. Limited to 50 elite students. 100% AIIMS selection rate. Features AIIMS faculty, personalized mentorship, and advanced methodologies. Application-based admission.",
  keywords:
    'intensive NEET biology, premium NEET course, AIIMS selection, elite biology coaching, exclusive NEET preparation, top AIR ranks, advanced biology course',
  authors: [{ name: 'Cerebrum Biology Academy' }],
  openGraph: {
    title: 'Intensive NEET Biology Course - Elite Program',
    description:
      "India's most exclusive NEET Biology course with 100% AIIMS selection rate. Limited seats, elite faculty, guaranteed results.",
    images: ['/api/og?title=Intensive+NEET+Biology&subtitle=Elite+Program+%E2%80%A2+Limited+Seats'],
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/courses/intensive-neet-biology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intensive NEET Biology Course - Elite Program',
    description:
      "India's most exclusive NEET Biology course with 100% AIIMS selection rate. Limited seats, elite faculty, guaranteed results.",
    images: ['/api/og?title=Intensive+NEET+Biology&subtitle=Elite+Program+%E2%80%A2+Limited+Seats'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function IntensiveNEETBiologyCoursePage() {
  return <IntensiveNEETBiologyPage />
}
