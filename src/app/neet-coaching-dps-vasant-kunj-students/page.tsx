import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-dps-vasant-kunj-students')!

export const metadata: Metadata = {
  title: 'NEET Coaching for DPS Vasant Kunj Students | Cerebrum Biology Academy',
  description:
    'Expert NEET biology coaching for DPS Vasant Kunj students. Flexible timings after school hours. 15+ years experience. Call 88264-44334.',
  keywords: [
    'neet coaching dps vasant kunj',
    'biology tuition dps vasant kunj students',
    'neet preparation dps vasant kunj',
    'biology classes vasant kunj',
    'neet coaching south delhi',
    'dps vasant kunj neet coaching',
  ],
  openGraph: {
    title: 'NEET Coaching for DPS Vasant Kunj Students | Cerebrum Biology Academy',
    description:
      'Expert NEET biology coaching for DPS Vasant Kunj students. Flexible timings after school hours. 15+ years experience.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-vasant-kunj-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-vasant-kunj-students',
  },
}

export default function DPSVasantKunjPage() {
  return <CityHubPage data={cityData} />
}
