import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('noida')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in noida',
    'biology coaching noida',
    'neet biology classes noida',
    'best biology tuition noida',
    'biology classes near me noida',
    'class 11 biology coaching noida',
    'class 12 biology tuition noida',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-noida`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-noida',
  },
}

export default function BiologyClassesNoidaPage() {
  return <CityHubPage data={cityData} />
}
