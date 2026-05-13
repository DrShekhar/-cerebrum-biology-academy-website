import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS RK Puram Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for DPS RK Puram Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching dps rk puram',
    'best neet coaching for dps rk puram students',
    'biology coaching dps rk puram',
    'neet tutor dps rk puram',
    'aiims faculty dps rk puram',
  ],
  openGraph: {
    title: 'NEET Coaching for DPS RK Puram Students',
    description: 'AIIMS-trained NEET biology coaching for DPS RK Puram students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-rk-puram-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-rk-puram-delhi',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('dps-rk-puram-delhi')} />
}
