import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('laxmi-nagar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes east delhi',
    'biology tuition east delhi',
    'biology coaching laxmi nagar',
    'biology classes preet vihar',
    'class 11 biology east delhi',
    'class 12 biology coaching east delhi',
    'NEET biology east delhi',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-east-delhi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-east-delhi',
  },
}

export default function BiologyClassesEastDelhiPage() {
  return <CityHubPage data={cityData} />
}
