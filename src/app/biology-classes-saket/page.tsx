import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('saket')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in saket',
    'biology coaching saket delhi',
    'neet biology classes saket',
    'best biology tuition saket',
    'biology classes south delhi',
    'biology coaching malviya nagar',
    'class 11 biology tuition saket',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-saket`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-saket',
  },
}

export default function BiologyClassesSaketPage() {
  return <CityHubPage data={cityData} />
}
