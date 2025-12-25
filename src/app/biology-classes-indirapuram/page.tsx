import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('indirapuram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes indirapuram',
    'neet coaching indirapuram',
    'best biology tuition indirapuram',
    'biology coaching indirapuram ghaziabad',
    'neet classes indirapuram',
    'biology teacher indirapuram',
    'class 11 biology indirapuram',
    'neet preparation indirapuram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-indirapuram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-indirapuram',
  },
}

export default function BiologyClassesIndirapuramPage() {
  return <CityHubPage data={cityData} />
}
