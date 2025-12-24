import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('manesar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in manesar',
    'biology coaching manesar',
    'neet biology classes manesar',
    'best biology tuition manesar',
    'biology classes imt manesar',
    'class 11 biology coaching manesar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-manesar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-manesar',
  },
}

export default function BiologyClassesManesarPage() {
  return <CityHubPage data={cityData} />
}
