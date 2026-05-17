import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for GD Goenka Gurugram Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for GD Goenka Gurugram Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching gd goenka gurugram',
    'best neet coaching for gd goenka gurugram students',
    'biology coaching gd goenka gurugram',
    'neet tutor gd goenka gurugram',
    'aiims faculty gd goenka gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for GD Goenka Gurugram Students',
    description: 'AIIMS-trained NEET biology coaching for GD Goenka Gurugram students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gd-goenka-gurugram',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gd-goenka-gurugram',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('gd-goenka-gurugram')} />
}
