import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-gurgaon-sector-48')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 48 gurgaon',
    'biology classes sector 48 gurgaon',
    'neet coaching near vega school',
    'sector 48 gurgaon coaching',
    'medical coaching sector 48',
    'neet tuition sector 48 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-48',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-48',
  },
}

export default function NEETCoachingSector48GurgaonPage() {
  return <CityHubPage data={cityData} />
}
