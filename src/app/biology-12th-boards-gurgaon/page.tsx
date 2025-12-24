import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-12th-boards-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    '12th boards biology gurgaon',
    'cbse board biology coaching',
    'biology board exam preparation',
    '12th board exam coaching gurgaon',
    'cbse biology class 12 gurgaon',
    'board exam biology tuition',
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
