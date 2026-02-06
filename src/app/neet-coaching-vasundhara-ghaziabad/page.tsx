import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('vasundhara-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching vasundhara ghaziabad',
    'biology classes vasundhara',
    'best neet coaching vasundhara',
    'biology tuition vasundhara ghaziabad',
    'neet classes vasundhara',
    'biology coaching vasundhara',
    'class 11 biology vasundhara',
    'neet preparation vasundhara ghaziabad',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vasundhara-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vasundhara-ghaziabad',
  },
}

export default function NEETCoachingVasundharaGhaziabadPage() {
  return <CityHubPage data={cityData} />
}
