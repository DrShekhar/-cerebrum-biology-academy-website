import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('class-12-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'class 12 neet coaching gurugram',
    'neet coaching class 12 gurgaon',
    '12th class neet preparation',
    'neet 2026 coaching gurugram',
    'class 12 pcb coaching gurgaon',
    'class 12 biology coaching gurugram',
    '12th neet batch gurugram',
    'best class 12 neet coaching',
    '1 year neet program gurugram',
    'final year neet coaching gurgaon',
    'neet intensive class 12',
    'board and neet coaching gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/class-12-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-12-neet-coaching-gurugram',
  },
}

export default function Class12NEETCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
