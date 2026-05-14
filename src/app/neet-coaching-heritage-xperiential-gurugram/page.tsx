import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Heritage Xperiential Gurugram Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Heritage Xperiential Gurugram Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching heritage xperiential gurugram',
    'best neet coaching for heritage xperiential gurugram students',
    'biology coaching heritage xperiential gurugram',
    'neet tutor heritage xperiential gurugram',
    'aiims faculty heritage xperiential gurugram',
  ],
  openGraph: {
    title: 'NEET Coaching for Heritage Xperiential Gurugram Students',
    description: 'AIIMS-trained NEET biology coaching for Heritage Xperiential Gurugram students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-heritage-xperiential-gurugram',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-heritage-xperiential-gurugram',
  },
}

export default function FeederSchoolPage() {
  return (
    <BestVerticalLanding config={buildNEETFeederSchoolConfig('heritage-xperiential-gurugram')} />
  )
}
