import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('patel-nagar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in patel nagar',
    'biology coaching patel nagar delhi',
    'neet biology classes patel nagar',
    'best biology tuition patel nagar',
    'biology classes central delhi',
    'biology coaching karol bagh',
    'class 11 biology tuition patel nagar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-patel-nagar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-patel-nagar',
  },
}

export default function BiologyClassesPatelNagarPage() {
  return <CityHubPage data={cityData} />
}
