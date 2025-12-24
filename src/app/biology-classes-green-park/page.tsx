import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('green-park')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in green park',
    'biology coaching green park delhi',
    'neet biology classes green park',
    'best biology tuition green park',
    'biology classes south delhi',
    'biology coaching hauz khas',
    'class 11 biology tuition green park',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-green-park`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-green-park',
  },
}

export default function BiologyClassesGreenParkPage() {
  return <CityHubPage data={cityData} />
}
