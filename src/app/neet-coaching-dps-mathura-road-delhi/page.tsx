import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS Mathura Road Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for DPS Mathura Road Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching dps mathura road',
    'best neet coaching for dps mathura road students',
    'biology coaching dps mathura road',
    'neet tutor dps mathura road',
    'aiims faculty dps mathura road',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for DPS Mathura Road Students',
    description: 'AIIMS-trained NEET biology coaching for DPS Mathura Road students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-mathura-road-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-mathura-road-delhi',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('dps-mathura-road-delhi')} />
}
