import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-gurgaon-sector-44')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 44 gurgaon',
    'biology classes sector 44 gurgaon',
    'premium neet coaching gurgaon',
    'sector 44 gurgaon coaching',
    'medical coaching sector 44',
    'neet tuition sector 44 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-44',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-44',
  },
}

export default function NEETCoachingSector44GurgaonPage() {
  return <CityHubPage data={cityData} />
}
