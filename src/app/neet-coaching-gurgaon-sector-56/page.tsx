import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-56')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 56 gurgaon',
    'neet classes near sector 56 gurugram',
    'best neet institute sector 56',
    'neet preparation sector 56 gurgaon',
    'neet biology coaching sector 56',
    'class 11 neet coaching sector 56',
    'class 12 neet classes sector 56 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-56',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-56',
  },
}

export default function NEETCoachingSector56GurgaonPage() {
  return <CityHubPage data={cityData} />
}
