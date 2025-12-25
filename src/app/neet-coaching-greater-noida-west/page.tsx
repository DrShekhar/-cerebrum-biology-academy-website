import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('greater-noida-west')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching greater noida west',
    'biology classes greater noida west',
    'best neet coaching noida extension',
    'biology tuition greater noida west',
    'neet classes noida extension',
    'biology coaching greater noida west',
    'class 11 biology noida extension',
    'neet preparation greater noida west',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida-west',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida-west',
  },
}

export default function NEETCoachingGreaterNoidaWestPage() {
  return <CityHubPage data={cityData} />
}
