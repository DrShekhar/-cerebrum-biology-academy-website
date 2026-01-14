import { Metadata } from 'next'
import PageContent from './PageContent'

export const metadata: Metadata = {
  title: 'NEET Coaching in Saket Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for Saket, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections. Join comprehensive medical entrance preparation today.',
  keywords: [
    'neet coaching saket',
    'neet coaching saket delhi',
    'medical entrance coaching saket',
    'neet biology tutor saket',
    'neet preparation saket delhi',
    'best neet coaching south delhi',
    'online neet coaching delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in Saket Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for Saket, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-saket-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-saket-delhi',
  },
}

export default function NEETCoachingSaketPage() {
  return <PageContent />
}
