import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-gurgaon-sector-49')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 49 gurgaon',
    'neet classes eldeco acacia',
    'neet coaching uppal southend gurgaon',
    'best neet institute sector 49',
    'neet preparation sector 49 gurugram',
    'neet biology coaching sector 49',
    'class 11 12 neet coaching sector 49',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-49',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-49',
  },
}

export default function NEETCoachingSector49GurgaonPage() {
  return <CityHubPage data={cityData} />
}
