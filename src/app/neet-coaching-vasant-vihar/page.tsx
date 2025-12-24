import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('vasant-vihar')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Vasant Vihar | Premium Biology Classes South Delhi',
  description:
    'Premium NEET coaching in Vasant Vihar, South Delhi. Expert biology preparation for Vasant Valley School students & embassy area residents. Call 88264-44334.',
  keywords: [
    'neet coaching in vasant vihar',
    'neet biology classes vasant vihar',
    'neet coaching vasant valley school',
    'neet preparation vasant vihar',
    'premium neet coaching south delhi',
    'medical entrance coaching vasant vihar',
    'neet biology tutor vasant vihar',
    'neet coaching vasant kunj',
  ],
  openGraph: {
    title: 'NEET Coaching in Vasant Vihar | Premium Biology Classes South Delhi',
    description:
      'Premium NEET coaching in Vasant Vihar, South Delhi. Expert biology preparation for Vasant Valley School students & embassy area residents.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vasant-vihar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vasant-vihar',
  },
}

export default function NEETCoachingVasantViharPage() {
  return <CityHubPage data={cityData} />
}
