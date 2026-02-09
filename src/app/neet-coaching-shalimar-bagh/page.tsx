import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('shalimar-bagh')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching shalimar bagh',
    'biology coaching shalimar bagh delhi',
    'NEET classes north delhi shalimar bagh',
    'best NEET tuition shalimar bagh',
    'biology tutor shalimar bagh',
    'medical coaching near azadpur',
    'NEET preparation shalimar bagh',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-shalimar-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-shalimar-bagh',
  },
}

export default function NEETCoachingShalimarbagh() {
  return <CityHubPage data={cityData} />
}
