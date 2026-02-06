import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-50')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 50 gurgaon',
    'biology classes sector 50 gurgaon',
    'neet coaching near lotus valley',
    'sector 50 gurgaon coaching',
    'medical coaching sector 50',
    'neet tuition sector 50 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-50',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-50',
  },
}

export default function NEETCoachingSector50GurgaonPage() {
  return <CityHubPage data={cityData} />
}
