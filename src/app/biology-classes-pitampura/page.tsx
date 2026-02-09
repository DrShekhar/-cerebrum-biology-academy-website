import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('pitampura')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes pitampura',
    'biology coaching pitampura delhi',
    'NEET biology pitampura',
    'class 11 biology pitampura',
    'class 12 biology coaching pitampura',
    'biology tuition north delhi',
    'biology classes near pitampura metro',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-pitampura',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-pitampura',
  },
}

export default function BiologyClassesPitampuraPage() {
  return <CityHubPage data={cityData} />
}
