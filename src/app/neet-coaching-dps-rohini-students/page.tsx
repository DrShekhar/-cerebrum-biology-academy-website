import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-dps-rohini-students')!

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS Rohini Students | Cerebrum Biology Academy',
  description:
    'Best NEET biology coaching for DPS Rohini students. Rohini center with after-school batches. 65+ AIIMS selections. Call 88264-44334.',
  keywords: [
    'neet coaching dps rohini',
    'biology tuition dps rohini students',
    'neet preparation dps rohini',
    'biology classes rohini',
    'neet coaching north delhi',
    'dps rohini neet coaching',
  ],
  openGraph: {
    title: 'NEET Coaching for DPS Rohini Students | Cerebrum Biology Academy',
    description:
      'Best NEET biology coaching for DPS Rohini students. Rohini center with after-school batches. 65+ AIIMS selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-rohini-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-rohini-students',
  },
}

export default function DPSRohiniPage() {
  return <CityHubPage data={cityData} />
}
