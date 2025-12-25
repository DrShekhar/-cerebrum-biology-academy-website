import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('crossings-republik')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes crossings republik',
    'neet coaching crossings republik',
    'best biology tuition crossings republik',
    'biology coaching crossings republik ghaziabad',
    'neet classes crossings republik',
    'biology teacher crossings republik',
    'class 11 biology crossings republik',
    'neet preparation crossings republik',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-crossings-republik',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-crossings-republik',
  },
}

export default function BiologyClassesCrossingsRepublikPage() {
  return <CityHubPage data={cityData} />
}
