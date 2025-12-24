import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-class-11-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'class 11 biology gurgaon',
    'biology coaching class 11 gurugram',
    'neet foundation class 11',
    '11th biology tuition gurgaon',
    'class 11 neet preparation',
    'best class 11 biology coaching',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-class-11-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-class-11-gurgaon',
  },
}

export default function BiologyClass11GurgaonPage() {
  return <CityHubPage data={cityData} />
}
