import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('vasant-vihar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in vasant vihar',
    'biology coaching vasant vihar delhi',
    'neet biology classes vasant vihar',
    'best biology tuition vasant vihar',
    'vasant valley school biology coaching',
    'premium biology coaching south delhi',
    'embassy area biology tuition',
    'class 11 biology tuition vasant vihar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-vasant-vihar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-vasant-vihar',
  },
}

export default function BiologyClassesVasantViharPage() {
  return <CityHubPage data={cityData} />
}
