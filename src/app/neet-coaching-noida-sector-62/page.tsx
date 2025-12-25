import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('noida-sector-62')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching noida sector 62',
    'biology classes sector 62 noida',
    'best neet coaching sector 62',
    'biology tuition noida sector 62',
    'neet classes sector 62',
    'biology coaching sector 62 noida',
    'class 11 biology sector 62',
    'neet preparation sector 62 noida',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida-sector-62',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-noida-sector-62',
  },
}

export default function NEETCoachingNoidaSector62Page() {
  return <CityHubPage data={cityData} />
}
