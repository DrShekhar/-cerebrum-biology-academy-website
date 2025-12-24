import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('preet-vihar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in preet vihar',
    'biology coaching preet vihar delhi',
    'neet biology classes preet vihar',
    'best biology tuition preet vihar',
    'biology classes east delhi',
    'biology coaching laxmi nagar',
    'class 11 biology tuition preet vihar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-preet-vihar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-preet-vihar',
  },
}

export default function BiologyClassesPreetViharPage() {
  return <CityHubPage data={cityData} />
}
