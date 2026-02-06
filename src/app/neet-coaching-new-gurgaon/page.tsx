import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-new-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching new gurgaon',
    'neet coaching sectors 80-115 gurgaon',
    'biology classes new gurgaon',
    'medical coaching new gurgaon',
    'neet tuition new gurgaon',
    'sector 82 neet coaching',
    'sector 84 neet coaching',
    'sector 90 neet coaching gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-new-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-new-gurgaon',
  },
}

export default function NEETCoachingNewGurgaonPage() {
  return <CityHubPage data={cityData} />
}
