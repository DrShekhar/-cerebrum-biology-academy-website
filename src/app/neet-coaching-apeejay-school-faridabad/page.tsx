import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Apeejay School Faridabad Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Apeejay School Faridabad Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching apeejay school faridabad',
    'best neet coaching for apeejay school faridabad students',
    'biology coaching apeejay school faridabad',
    'neet tutor apeejay school faridabad',
    'aiims faculty apeejay school faridabad',
  ],
  openGraph: {
    title: 'NEET Coaching for Apeejay School Faridabad Students',
    description: 'AIIMS-trained NEET biology coaching for Apeejay School Faridabad students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-apeejay-school-faridabad',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-apeejay-school-faridabad',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('apeejay-school-faridabad')} />
}
