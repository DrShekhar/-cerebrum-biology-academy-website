import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('sohna-road-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sohna road gurgaon',
    'neet coaching sohna road gurugram',
    'biology tuition sector 48 gurgaon',
    'best biology teacher sohna road',
    'class 11 biology coaching south city 2 gurgaon',
    'class 12 biology tuition vatika city gurgaon',
    'neet biology classes unitech south city gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-sohna-road-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-sohna-road-gurgaon',
  },
}

export default function BiologyClassesSohnaRoadGurgaonPage() {
  return <CityHubPage data={cityData} />
}
