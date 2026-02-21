import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in ghaziabad',
    'biology coaching ghaziabad',
    'neet biology classes ghaziabad',
    'best biology tuition ghaziabad',
    'biology classes near me ghaziabad',
    'class 11 biology coaching ghaziabad',
    'class 12 biology tuition ghaziabad',
    'neet coaching ghaziabad',
    'biology tutor indirapuram',
    'neet preparation ghaziabad',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-ghaziabad`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-ghaziabad',
  },
}

export default function BiologyClassesGhaziabadPage() {
  return <CityHubPage data={cityData} />
}
