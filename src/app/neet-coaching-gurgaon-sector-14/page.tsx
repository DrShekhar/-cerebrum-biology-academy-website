import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-14')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 14 gurgaon',
    'neet classes sector 14 gurugram',
    'best neet institute sector 14',
    'neet preparation sector 14 gurgaon',
    'aakash alternative sector 14',
    'narayana alternative sector 14',
    'neet biology coaching sector 14',
    'class 11 neet coaching sector 14',
    'class 12 neet classes sector 14 gurgaon',
    'affordable neet coaching sector 14',
    'small batch neet coaching gurgaon',
    'neet 2026 coaching sector 14',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-14',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-14',
  },
}

export default function NEETCoachingSector14GurgaonPage() {
  return <CityHubPage data={cityData} />
}
