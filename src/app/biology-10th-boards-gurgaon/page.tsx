import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-10th-boards-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology 10th boards gurgaon',
    'class 10 biology coaching gurgaon',
    'cbse class 10 biology gurgaon',
    '10th board biology coaching',
    'biology coaching class 10 gurugram',
    'class 10 science coaching gurgaon',
    'board exam biology coaching',
    'icse class 10 biology gurgaon',
    'haryana board biology class 10',
    'biology tuition class 10 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-10th-boards-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-10th-boards-gurgaon',
  },
}

export default function Biology10thBoardsGurgaonPage() {
  return <CityHubPage data={cityData} />
}
