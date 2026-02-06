import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('laxmi-nagar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in laxmi nagar',
    'biology coaching laxmi nagar delhi',
    'neet biology classes laxmi nagar',
    'best biology tuition laxmi nagar',
    'biology classes east delhi',
    'biology coaching preet vihar',
    'class 11 biology tuition laxmi nagar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-laxmi-nagar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-laxmi-nagar',
  },
}

export default function BiologyClassesLaxmiNagarPage() {
  return <CityHubPage data={cityData} />
}
