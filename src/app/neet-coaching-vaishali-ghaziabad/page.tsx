import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('vaishali-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching vaishali ghaziabad',
    'biology classes vaishali',
    'best neet coaching vaishali',
    'biology tuition vaishali ghaziabad',
    'neet classes vaishali',
    'biology coaching near vaishali metro',
    'class 11 biology vaishali',
    'neet preparation vaishali ghaziabad',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vaishali-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vaishali-ghaziabad',
  },
}

export default function NEETCoachingVaishaliGhaziabadPage() {
  return <CityHubPage data={cityData} />
}
