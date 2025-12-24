import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('defence-colony')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in defence colony',
    'biology coaching defence colony delhi',
    'neet biology classes defence colony',
    'best biology tuition defence colony',
    'biology classes south delhi',
    'biology coaching lajpat nagar',
    'class 11 biology tuition defence colony',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-defence-colony`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-defence-colony',
  },
}

export default function BiologyClassesDefenceColonyPage() {
  return <CityHubPage data={cityData} />
}
