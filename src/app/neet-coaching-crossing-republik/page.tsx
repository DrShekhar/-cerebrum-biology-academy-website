import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('crossings-republik')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Crossing Republik',
    'biology classes Crossing Republik Ghaziabad',
    'NEET preparation Crossing Republik',
    'best biology coaching Crossing Republik',
    'NEET tuition Crossing Republik',
    'AIIMS faculty Crossing Republik',
    'NEET online classes Crossing Republik',
    'biology tuition near Crossing Republik',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-crossing-republik`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-crossing-republik',
  },
}

export default function NEETCoachingCrossingRepublikPage() {
  return <CityHubPage data={cityData} />
}
