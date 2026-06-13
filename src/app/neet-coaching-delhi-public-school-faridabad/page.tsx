import { Metadata } from 'next'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS Faridabad Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for DPS Faridabad Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching dps faridabad',
    'best neet coaching for dps faridabad students',
    'biology coaching dps faridabad',
    'neet tutor dps faridabad',
    'aiims faculty dps faridabad',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for DPS Faridabad Students',
    description: 'AIIMS-trained NEET biology coaching for DPS Faridabad students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-delhi-public-school-faridabad',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-delhi-public-school-faridabad',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching for DPS Faridabad Students | AIIMS Faculty | Cerebrum',
    description:
      'NEET biology coaching for DPS Faridabad Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  },
}

export default function FeederSchoolPage() {
  return (
    <>
      <DelhiAreaSchema pageSlug="neet-coaching-delhi-public-school-faridabad" />
      <BestVerticalLanding config={buildNEETFeederSchoolConfig('delhi-public-school-faridabad')} />
    </>
  )
}
