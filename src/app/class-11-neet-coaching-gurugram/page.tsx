import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('class-11-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'class 11 neet coaching gurugram',
    'neet coaching class 11 gurgaon',
    '11th class neet preparation',
    'neet foundation class 11 gurugram',
    'class 11 pcb coaching gurgaon',
    'neet 2027 coaching gurugram',
    'class 11 biology coaching gurugram',
    '11th neet batch gurugram',
    'best class 11 neet coaching',
    '2 year neet program gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/class-11-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-11-neet-coaching-gurugram',
  },
}

export default function Class11NEETCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
