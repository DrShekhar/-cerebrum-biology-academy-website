import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS Noida Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for DPS Noida Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching dps noida',
    'best neet coaching for dps noida students',
    'biology coaching dps noida',
    'neet tutor dps noida',
    'aiims faculty dps noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for DPS Noida Students',
    description: 'AIIMS-trained NEET biology coaching for DPS Noida students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-noida',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-noida',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching for DPS Noida Students | AIIMS Faculty | Cerebrum',
    description:
      'NEET biology coaching for DPS Noida Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('dps-noida')} />
}
