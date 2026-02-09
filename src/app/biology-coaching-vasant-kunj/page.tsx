import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('vasant-kunj')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching vasant kunj',
    'NEET coaching vasant kunj',
    'biology classes vasant kunj delhi',
    'medical coaching vasant kunj',
    'NEET preparation vasant kunj',
    'biology tuition south delhi',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-kunj',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-kunj',
  },
}

export default function BiologyCoachingVasantKunj() {
  return <CityHubPage data={cityData} />
}
