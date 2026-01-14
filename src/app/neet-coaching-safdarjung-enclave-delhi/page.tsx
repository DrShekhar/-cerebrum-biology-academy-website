import { Metadata } from 'next'
import PageContent from './PageContent'

export const metadata: Metadata = {
  title: 'NEET Coaching in Safdarjung Enclave Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for Safdarjung Enclave, Delhi students near AIIMS. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections. Join today.',
  keywords: [
    'neet coaching safdarjung enclave',
    'neet coaching safdarjung enclave delhi',
    'medical entrance coaching near aiims',
    'neet biology tutor safdarjung',
    'neet preparation safdarjung delhi',
    'best neet coaching south delhi',
    'online neet coaching delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in Safdarjung Enclave Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for Safdarjung Enclave, Delhi students near AIIMS. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-safdarjung-enclave-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-safdarjung-enclave-delhi',
  },
}

export default function NEETCoachingSafdarjungEnclavePage() {
  return <PageContent />
}
