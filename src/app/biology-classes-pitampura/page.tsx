import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('pitampura')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in pitampura',
    'biology coaching pitampura delhi',
    'neet biology classes pitampura',
    'best biology tuition pitampura',
    'biology classes near rohini',
    'biology coaching north delhi',
    'class 11 biology tuition pitampura',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-pitampura`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-pitampura',
  },
}

export default function BiologyClassesPitampuraPage() {
  return <CityHubPage data={cityData} />
}
