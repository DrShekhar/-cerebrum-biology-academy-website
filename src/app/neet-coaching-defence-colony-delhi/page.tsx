import { Metadata } from 'next'
import PageContent from './PageContent'

export const metadata: Metadata = {
  title: 'NEET Coaching in Defence Colony Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for Defence Colony, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections. Trusted by defence families.',
  keywords: [
    'neet coaching defence colony',
    'neet coaching defence colony delhi',
    'medical entrance coaching defence colony',
    'neet biology tutor defence colony',
    'neet preparation defence colony delhi',
    'best neet coaching south delhi',
    'online neet coaching delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in Defence Colony Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for Defence Colony, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections. Trusted by defence families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-defence-colony-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-defence-colony-delhi',
  },
}

export default function NEETCoachingDefenceColonyPage() {
  return <PageContent />
}
