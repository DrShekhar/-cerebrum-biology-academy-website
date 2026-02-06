import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-12th-boards-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology 12th boards gurgaon',
    'class 12 biology coaching gurgaon',
    'cbse class 12 biology gurgaon',
    '12th board biology coaching',
    'biology coaching class 12 gurugram',
    'class 12 board exam biology',
    'human physiology coaching gurgaon',
    'genetics coaching class 12',
    'biotechnology coaching gurgaon',
    'ecology biology class 12',
    'haryana board biology class 12',
    'biology tuition class 12 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-12th-boards-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-12th-boards-gurgaon',
  },
}

export default function Biology12thBoardsGurgaonPage() {
  return <CityHubPage data={cityData} />
}
