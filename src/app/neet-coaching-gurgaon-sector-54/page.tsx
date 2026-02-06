import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-54')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 54 gurgaon',
    'biology classes sector 54 gurgaon',
    'neet coaching golf course road',
    'sector 54 gurgaon coaching',
    'medical coaching sector 54',
    'neet tuition sector 54 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-54',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-54',
  },
}

export default function NEETCoachingSector54GurgaonPage() {
  return <CityHubPage data={cityData} />
}
