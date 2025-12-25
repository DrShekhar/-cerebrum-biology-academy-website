import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-dps-gurgaon-students')!

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS Gurgaon Students | Cerebrum Biology Academy',
  description:
    'NEET biology coaching for DPS Gurgaon students. Sector 51 Gurgaon center, after-school batches. Expert AIIMS faculty. Call 88264-44334.',
  keywords: [
    'neet coaching dps gurgaon',
    'biology tuition dps gurgaon students',
    'dps gurgaon neet preparation',
    'biology classes gurgaon',
    'neet coaching sector 51 gurgaon',
    'dps gurgaon biology coaching',
  ],
  openGraph: {
    title: 'NEET Coaching for DPS Gurgaon Students | Cerebrum Biology Academy',
    description:
      'NEET biology coaching for DPS Gurgaon students. Sector 51 Gurgaon center, after-school batches. Expert AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-gurgaon-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-gurgaon-students',
  },
}

export default function DPSGurgaonPage() {
  return <CityHubPage data={cityData} />
}
