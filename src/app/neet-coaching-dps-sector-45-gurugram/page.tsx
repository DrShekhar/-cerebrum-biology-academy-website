import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS Sector 45 Gurugram Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for DPS Sector 45 Gurugram Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching dps sector 45 gurugram',
    'best neet coaching for dps sector 45 gurugram students',
    'biology coaching dps sector 45 gurugram',
    'neet tutor dps sector 45 gurugram',
    'aiims faculty dps sector 45 gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for DPS Sector 45 Gurugram Students',
    description: 'AIIMS-trained NEET biology coaching for DPS Sector 45 Gurugram students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-sector-45-gurugram',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-sector-45-gurugram',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching for DPS Sector 45 Gurugram Students | AIIMS Faculty | Cerebrum',
    description: 'NEET biology coaching for DPS Sector 45 Gurugram Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college se...',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('dps-sector-45-gurugram')} />
}
