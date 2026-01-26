import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-gurgaon-sector-17')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 17 gurgaon',
    'biology classes sector 17 gurgaon',
    'neet coaching old gurgaon',
    'sector 17 gurgaon coaching',
    'medical coaching sector 17',
    'neet tuition sector 17 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-17',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-17',
  },
}

export default function NEETCoachingSector17GurgaonPage() {
  return <CityHubPage data={cityData} />
}
