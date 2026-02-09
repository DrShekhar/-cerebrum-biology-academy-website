import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('panchsheel-park')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching panchsheel park',
    'NEET coaching panchsheel',
    'biology classes panchsheel enclave delhi',
    'medical coaching panchsheel park',
    'NEET preparation panchsheel',
    'biology tuition south delhi enclave',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-panchsheel',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-panchsheel',
  },
}

export default function BiologyCoachingPanchsheel() {
  return <CityHubPage data={cityData} />
}
