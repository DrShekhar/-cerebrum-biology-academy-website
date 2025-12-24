import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('model-town')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in model town',
    'biology coaching model town delhi',
    'neet biology classes model town',
    'best biology tuition model town',
    'biology classes north delhi',
    'biology coaching rohini',
    'class 11 biology tuition model town',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-model-town`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-model-town',
  },
}

export default function BiologyClassesModelTownPage() {
  return <CityHubPage data={cityData} />
}
