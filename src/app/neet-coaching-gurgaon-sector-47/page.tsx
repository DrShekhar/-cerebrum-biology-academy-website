import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-47')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 47 gurgaon',
    'biology classes sector 47 gurgaon',
    'neet coaching central gurgaon',
    'sector 47 gurgaon coaching',
    'medical coaching sector 47',
    'neet tuition sector 47 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-47',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-47',
  },
}

export default function NEETCoachingSector47GurgaonPage() {
  return <CityHubPage data={cityData} />
}
