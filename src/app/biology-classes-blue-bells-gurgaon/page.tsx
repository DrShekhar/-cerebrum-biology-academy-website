import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-blue-bells-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes blue bells',
    'neet coaching blue bells gurgaon',
    'biology tuition blue bells students',
    'blue bells model school neet prep',
    'biology coaching near blue bells',
    'neet preparation blue bells school',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-blue-bells-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-blue-bells-gurgaon',
  },
}

export default function BiologyClassesBlueBellsGurgaonPage() {
  return <CityHubPage data={cityData} />
}
