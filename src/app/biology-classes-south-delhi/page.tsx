import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('south-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in south delhi',
    'biology coaching south extension',
    'neet biology classes south delhi',
    'best biology tuition south delhi',
    'biology classes gk delhi',
    'biology coaching lajpat nagar',
    'class 11 biology tuition south delhi',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-south-delhi`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-south-delhi',
  },
}

export default function BiologyClassesSouthDelhiPage() {
  return <CityHubPage data={cityData} />
}
