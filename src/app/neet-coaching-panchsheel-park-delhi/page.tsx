import { Metadata } from 'next'
import PageContent from './PageContent'

export const metadata: Metadata = {
  title: 'NEET Coaching in Panchsheel Park Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for Panchsheel Park, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers premium online NEET biology coaching with 500+ selections. Join today.',
  keywords: [
    'neet coaching panchsheel park',
    'neet coaching panchsheel park delhi',
    'medical entrance coaching panchsheel',
    'neet biology tutor panchsheel park',
    'neet preparation panchsheel delhi',
    'best neet coaching south delhi',
    'online neet coaching delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in Panchsheel Park Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for Panchsheel Park, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers premium online NEET biology coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-panchsheel-park-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-panchsheel-park-delhi',
  },
}

export default function NEETCoachingPanchsheelParkPage() {
  return <PageContent />
}
