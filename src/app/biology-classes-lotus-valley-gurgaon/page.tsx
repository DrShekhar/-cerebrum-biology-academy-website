import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-classes-lotus-valley-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes lotus valley',
    'neet coaching lotus valley gurgaon',
    'biology tuition lotus valley students',
    'lotus valley international neet prep',
    'biology coaching near lotus valley',
    'neet preparation lotus valley school',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-lotus-valley-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-lotus-valley-gurgaon',
  },
}

export default function BiologyClassesLotusValleyGurgaonPage() {
  return <CityHubPage data={cityData} />
}
