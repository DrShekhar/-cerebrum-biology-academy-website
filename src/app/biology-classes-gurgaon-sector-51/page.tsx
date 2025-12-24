import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-51')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sector 51 gurgaon',
    'neet coaching sector 51 gurugram',
    'biology tuition m2k corporate park',
    'best biology teacher sector 51',
    'class 11 biology coaching sector 51 gurgaon',
    'class 12 biology tuition sector 51',
    'neet biology classes golf course extension road',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-51',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-51',
  },
}

export default function BiologyClassesSector51GurgaonPage() {
  return <CityHubPage data={cityData} />
}
