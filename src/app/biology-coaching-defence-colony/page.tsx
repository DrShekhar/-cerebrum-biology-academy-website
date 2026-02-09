import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('defence-colony')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching defence colony',
    'NEET coaching defence colony delhi',
    'biology tuition defence colony',
    'medical coaching south delhi',
    'NEET preparation defence colony',
    'biology classes defence colony',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-defence-colony',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-defence-colony',
  },
}

export default function BiologyCoachingDefenceColony() {
  return <CityHubPage data={cityData} />
}
