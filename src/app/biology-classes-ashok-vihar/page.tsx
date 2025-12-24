import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('ashok-vihar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in ashok vihar',
    'biology coaching ashok vihar delhi',
    'neet biology classes ashok vihar',
    'best biology tuition ashok vihar',
    'biology classes north delhi',
    'biology coaching shalimar bagh',
    'class 11 biology tuition ashok vihar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-ashok-vihar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-ashok-vihar',
  },
}

export default function BiologyClassesAshokViharPage() {
  return <CityHubPage data={cityData} />
}
