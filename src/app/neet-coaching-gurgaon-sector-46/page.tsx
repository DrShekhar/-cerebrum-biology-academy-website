import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-46')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 46 gurgaon',
    'biology classes sector 46 gurgaon',
    'neet coaching near paras hospital',
    'sector 46 gurgaon coaching',
    'medical coaching sector 46',
    'neet tuition sector 46 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-46',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-46',
  },
}

export default function NEETCoachingSector46GurgaonPage() {
  return <CityHubPage data={cityData} />
}
