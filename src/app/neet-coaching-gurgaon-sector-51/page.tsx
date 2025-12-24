import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-gurgaon-sector-51')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 51 gurgaon',
    'neet classes m2k corporate park',
    'best neet institute sector 51 gurugram',
    'neet preparation sector 51',
    'neet dropper batch sector 51 gurgaon',
    'neet biology coaching sector 51',
    'class 11 neet coaching sector 51',
    'class 12 neet classes sector 51 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-51',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-51',
  },
}

export default function NEETCoachingSector51GurgaonPage() {
  return <CityHubPage data={cityData} />
}
