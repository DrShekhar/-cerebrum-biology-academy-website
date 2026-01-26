import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-gurgaon-sector-18')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 18 gurgaon',
    'biology classes sector 18 gurgaon',
    'neet coaching vyapar kendra',
    'sector 18 gurgaon coaching',
    'medical coaching sector 18',
    'neet tuition sector 18 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-18',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-18',
  },
}

export default function NEETCoachingSector18GurgaonPage() {
  return <CityHubPage data={cityData} />
}
