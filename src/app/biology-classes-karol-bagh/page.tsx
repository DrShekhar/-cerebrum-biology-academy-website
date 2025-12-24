import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('karol-bagh')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in karol bagh',
    'biology coaching karol bagh delhi',
    'neet biology classes karol bagh',
    'best biology tuition karol bagh',
    'biology classes central delhi',
    'biology coaching rajendra place',
    'class 11 biology tuition karol bagh',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-karol-bagh`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-karol-bagh',
  },
}

export default function BiologyClassesKarolBaghPage() {
  return <CityHubPage data={cityData} />
}
