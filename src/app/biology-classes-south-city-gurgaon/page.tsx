import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('south-city-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes south city gurgaon',
    'neet coaching south city 1 gurugram',
    'biology tuition south city 2 gurgaon',
    'best biology teacher south city gurgaon',
    'class 11 biology coaching nirvana country',
    'class 12 biology tuition sector 49 gurgaon',
    'neet biology classes south city gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-south-city-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-south-city-gurgaon',
  },
}

export default function BiologyClassesSouthCityGurgaonPage() {
  return <CityHubPage data={cityData} />
}
