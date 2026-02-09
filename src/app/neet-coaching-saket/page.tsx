import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('saket')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching saket',
    'NEET coaching saket delhi',
    'biology coaching saket malviya nagar',
    'medical coaching saket',
    'biology tuition saket',
    'NEET preparation south delhi',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-saket',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-saket',
  },
}

export default function NEETCoachingSaket() {
  return <CityHubPage data={cityData} />
}
