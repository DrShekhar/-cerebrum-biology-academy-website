import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('shalimar-bagh')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in shalimar bagh',
    'biology coaching shalimar bagh delhi',
    'neet biology classes shalimar bagh',
    'best biology tuition shalimar bagh',
    'biology classes north delhi',
    'biology coaching rohini',
    'class 11 biology tuition shalimar bagh',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-shalimar-bagh`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-shalimar-bagh',
  },
}

export default function BiologyClassesShalimarBaghPage() {
  return <CityHubPage data={cityData} />
}
