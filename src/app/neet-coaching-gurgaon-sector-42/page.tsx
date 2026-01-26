import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-gurgaon-sector-42')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 42 gurgaon',
    'biology classes sector 42 gurgaon',
    'neet coaching near medanta',
    'sector 42 gurgaon coaching',
    'medical coaching sector 42',
    'neet tuition sector 42 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-42',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-42',
  },
}

export default function NEETCoachingSector42GurgaonPage() {
  return <CityHubPage data={cityData} />
}
