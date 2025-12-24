import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-classes-ryan-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes ryan international',
    'neet coaching ryan school gurgaon',
    'biology tuition ryan students',
    'ryan international neet prep',
    'biology coaching near ryan school',
    'neet preparation ryan gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-ryan-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-ryan-gurgaon',
  },
}

export default function BiologyClassesRyanGurgaonPage() {
  return <CityHubPage data={cityData} />
}
