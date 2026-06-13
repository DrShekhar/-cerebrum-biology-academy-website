import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Cambridge International Noida Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Cambridge International Noida Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching cambridge international noida',
    'best neet coaching for cambridge international noida students',
    'biology coaching cambridge international noida',
    'neet tutor cambridge international noida',
    'aiims faculty cambridge international noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for Cambridge International Noida Students',
    description: 'AIIMS-trained NEET biology coaching for Cambridge International Noida students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-cambridge-international-noida',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-cambridge-international-noida',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching for Cambridge International Noida Students | AIIMS Faculty | Cerebrum',
    description:
      'NEET biology coaching for Cambridge International Noida Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical col...',
  },
}

export default function FeederSchoolPage() {
  return (
    <BestVerticalLanding config={buildNEETFeederSchoolConfig('cambridge-international-noida')} />
  )
}
