import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-class-12-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'class 12 biology gurgaon',
    'biology coaching class 12 gurugram',
    '12th biology neet preparation',
    'class 12 board exam biology',
    'best class 12 biology coaching',
    '12th biology tuition gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-class-12-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-class-12-gurgaon',
  },
}

export default function BiologyClass12GurgaonPage() {
  return <CityHubPage data={cityData} />
}
