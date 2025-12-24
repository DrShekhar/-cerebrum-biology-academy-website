import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('cr-park')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in cr park',
    'biology coaching chittaranjan park',
    'neet biology classes cr park',
    'best biology tuition cr park',
    'biology classes south delhi',
    'biology coaching kalkaji',
    'class 11 biology tuition cr park',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-cr-park`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-cr-park',
  },
}

export default function BiologyClassesCRParkPage() {
  return <CityHubPage data={cityData} />
}
