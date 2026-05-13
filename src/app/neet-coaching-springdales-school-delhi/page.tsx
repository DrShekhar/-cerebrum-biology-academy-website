import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Springdales School Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Springdales School Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching springdales school',
    'best neet coaching for springdales school students',
    'biology coaching springdales school',
    'neet tutor springdales school',
    'aiims faculty springdales school',
  ],
  openGraph: {
    title: 'NEET Coaching for Springdales School Students',
    description: 'AIIMS-trained NEET biology coaching for Springdales School students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-springdales-school-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-springdales-school-delhi',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('springdales-school-delhi')} />
}
