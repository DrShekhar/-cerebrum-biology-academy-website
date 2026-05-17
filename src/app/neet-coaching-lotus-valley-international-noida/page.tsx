import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Lotus Valley Noida Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Lotus Valley Noida Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching lotus valley noida',
    'best neet coaching for lotus valley noida students',
    'biology coaching lotus valley noida',
    'neet tutor lotus valley noida',
    'aiims faculty lotus valley noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for Lotus Valley Noida Students',
    description: 'AIIMS-trained NEET biology coaching for Lotus Valley Noida students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-lotus-valley-international-noida',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-lotus-valley-international-noida',
  },
}

export default function FeederSchoolPage() {
  return (
    <BestVerticalLanding config={buildNEETFeederSchoolConfig('lotus-valley-international-noida')} />
  )
}
