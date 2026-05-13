import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS Ghaziabad Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for DPS Ghaziabad Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching dps ghaziabad',
    'best neet coaching for dps ghaziabad students',
    'biology coaching dps ghaziabad',
    'neet tutor dps ghaziabad',
    'aiims faculty dps ghaziabad',
  ],
  openGraph: {
    title: 'NEET Coaching for DPS Ghaziabad Students',
    description: 'AIIMS-trained NEET biology coaching for DPS Ghaziabad students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-ghaziabad',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-ghaziabad',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('dps-ghaziabad')} />
}
