import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('lajpat-nagar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in lajpat nagar',
    'biology coaching lajpat nagar delhi',
    'neet biology classes lajpat nagar',
    'best biology tuition lajpat nagar',
    'biology classes south delhi',
    'biology coaching defence colony',
    'class 11 biology tuition lajpat nagar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-lajpat-nagar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-lajpat-nagar',
  },
}

export default function BiologyClassesLajpatNagarPage() {
  return <CityHubPage data={cityData} />
}
