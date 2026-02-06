import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-15')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 15 gurgaon',
    'biology classes sector 15 gurgaon',
    'neet coaching near huda market',
    'sector 15 gurgaon coaching',
    'medical coaching sector 15',
    'neet tuition sector 15 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-15',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-15',
  },
}

export default function NEETCoachingSector15GurgaonPage() {
  return <CityHubPage data={cityData} />
}
