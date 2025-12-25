import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('noida-sector-137')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes noida sector 137',
    'neet coaching sector 137 noida',
    'best biology tuition sector 137',
    'biology coaching noida sector 137',
    'neet classes sector 137',
    'biology teacher sector 137 noida',
    'class 11 biology sector 137',
    'neet preparation sector 137 noida',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-noida-sector-137',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-noida-sector-137',
  },
}

export default function BiologyClassesNoidaSector137Page() {
  return <CityHubPage data={cityData} />
}
