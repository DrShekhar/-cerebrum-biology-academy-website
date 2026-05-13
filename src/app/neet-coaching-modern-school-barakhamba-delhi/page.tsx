import { Metadata } from 'next'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Modern School Barakhamba Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Modern School Barakhamba Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching modern school barakhamba',
    'best neet coaching for modern school barakhamba students',
    'biology coaching modern school barakhamba',
    'neet tutor modern school barakhamba',
    'aiims faculty modern school barakhamba',
  ],
  openGraph: {
    title: 'NEET Coaching for Modern School Barakhamba Students',
    description: 'AIIMS-trained NEET biology coaching for Modern School Barakhamba students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-barakhamba-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-barakhamba-delhi',
  },
}

export default function FeederSchoolPage() {
  return (
    <>
      <DelhiAreaSchema pageSlug="neet-coaching-modern-school-barakhamba-delhi" />
      <BestVerticalLanding config={buildNEETFeederSchoolConfig('modern-school-barakhamba-delhi')} />
    </>
    )
}
