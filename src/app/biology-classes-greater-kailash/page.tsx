import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('greater-kailash')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in greater kailash',
    'biology coaching gk delhi',
    'neet biology classes gk',
    'best biology tuition greater kailash',
    'biology classes gk-1',
    'biology coaching gk-2',
    'dps gk biology tuition',
    'class 11 biology tuition gk',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-greater-kailash`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-greater-kailash',
  },
}

export default function BiologyClassesGreaterKailashPage() {
  return <CityHubPage data={cityData} />
}
