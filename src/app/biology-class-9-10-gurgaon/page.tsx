import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-class-9-10-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'class 9 biology gurgaon',
    'class 10 biology gurgaon',
    'biology foundation class 9 10',
    '9th 10th biology tuition gurugram',
    'biology coaching class 9 10',
    'school biology classes gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-class-9-10-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-class-9-10-gurgaon',
  },
}

export default function BiologyClass910GurgaonPage() {
  return <CityHubPage data={cityData} />
}
