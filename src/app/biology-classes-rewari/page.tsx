import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rewari')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in rewari',
    'biology coaching rewari',
    'neet biology classes rewari',
    'best biology tuition rewari',
    'online biology classes rewari',
    'class 11 biology coaching rewari',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-rewari`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-rewari',
  },
}

export default function BiologyClassesRewariPage() {
  return <CityHubPage data={cityData} />
}
