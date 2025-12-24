import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-classes-gd-goenka-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes gd goenka gurgaon',
    'neet coaching gd goenka sohna',
    'biology tuition gd goenka world school',
    'best neet institute near gd goenka',
    'biology classes gd goenka gurugram',
    'class 11 12 biology gd goenka',
    'neet preparation gd goenka students',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gd-goenka-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gd-goenka-gurgaon',
  },
}

export default function BiologyClassesGDGoenkaGurgaonPage() {
  return <CityHubPage data={cityData} />
}
