import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-south-city-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching south city gurgaon',
    'neet classes south city 1 gurugram',
    'neet coaching south city 2 gurgaon',
    'best neet institute south city',
    'neet preparation south city gurgaon',
    'neet biology coaching south city',
    'class 11 12 neet south city gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-city-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-city-gurgaon',
  },
}

export default function NEETCoachingSouthCityGurgaonPage() {
  return <CityHubPage data={cityData} />
}
