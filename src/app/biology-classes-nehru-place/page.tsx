import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('nehru-place')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in nehru place',
    'biology coaching nehru place delhi',
    'neet biology classes nehru place',
    'best biology tuition nehru place',
    'biology classes south delhi',
    'biology coaching kalkaji',
    'class 11 biology tuition nehru place',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-nehru-place`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-nehru-place',
  },
}

export default function BiologyClassesNehruPlacePage() {
  return <CityHubPage data={cityData} />
}
