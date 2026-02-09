import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('dwarka')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching dwarka',
    'NEET coaching dwarka delhi',
    'medical coaching dwarka sector',
    'biology tuition dwarka',
    'NEET preparation dwarka',
    'biology classes dwarka sectors',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-dwarka',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-dwarka',
  },
}

export default function BiologyCoachingDwarka() {
  return <CityHubPage data={cityData} />
}
