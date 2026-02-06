import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-40')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 40 gurgaon',
    'biology classes sector 40 gurgaon',
    'neet coaching huda city centre',
    'sector 40 gurgaon coaching',
    'medical coaching sector 40',
    'neet tuition sector 40 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-40',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-40',
  },
}

export default function NEETCoachingSector40GurgaonPage() {
  return <CityHubPage data={cityData} />
}
