import { Metadata } from 'next'
import PageContent from './PageContent'

export const metadata: Metadata = {
  title: 'Biology Coaching in East of Kailash Delhi | NEET & CBSE Tutor',
  description:
    'Best Biology coaching for East of Kailash, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET coaching with 500+ selections. DPS EOK expertise, GK area students welcome.',
  keywords: [
    'biology coaching east of kailash',
    'neet coaching eok delhi',
    'biology tutor greater kailash',
    'neet biology tutor nehru place',
    'cbse biology tutor kailash colony',
    'dps eok biology coaching',
    'online biology tutor south delhi',
    'best biology teacher east of kailash',
    'neet coaching near dps eok',
  ],
  openGraph: {
    title: 'Biology Coaching in East of Kailash Delhi | NEET & CBSE Tutor',
    description:
      'Best Biology coaching for East of Kailash, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET coaching with 500+ selections. DPS EOK expertise.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-east-of-kailash-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-east-of-kailash-delhi',
  },
}

export default function BiologyCoachingEOKPage() {
  return <PageContent />
}
