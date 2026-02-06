import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rohini')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in rohini',
    'biology coaching rohini delhi',
    'neet biology classes rohini',
    'best biology tuition rohini',
    'biology classes dc chauk',
    'biology coaching pitampura',
    'class 11 biology tuition rohini',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-rohini`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-rohini',
  },
}

export default function BiologyClassesRohiniPage() {
  return <CityHubPage data={cityData} />
}
