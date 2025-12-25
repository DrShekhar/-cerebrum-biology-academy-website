import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('rohini-west')!

export const metadata: Metadata = {
  title: 'Biology Tuition Rohini West | NEET Coaching | Cerebrum Academy',
  description:
    'Best biology tuition in Rohini West. Easy access to DC Chauk center. AIIMS faculty, 98% NEET success. Small batches. Call 88264-44334!',
  keywords: [
    'biology tuition Rohini West',
    'NEET coaching Rohini West',
    'best biology classes Rohini',
    'DC Chauk biology coaching',
    'NEET preparation Rohini West',
    'Dr Shekhar Singh',
    'AIIMS trained faculty',
    'biology coaching Rohini',
    'medical entrance Delhi',
    'biology tuition near me',
  ],
  openGraph: {
    title: 'Biology Tuition Rohini West | NEET Coaching | Cerebrum Academy',
    description:
      'Best biology tuition in Rohini West. Easy access to DC Chauk center. AIIMS faculty, 98% NEET success. Small batches. Call 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-rohini-west',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-rohini-west',
  },
}

export default function RohiniWestPage() {
  return <CityHubPage data={cityData} />
}
