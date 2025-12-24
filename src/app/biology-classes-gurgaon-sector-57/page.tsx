import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-57')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sector 57 gurgaon',
    'neet coaching sector 57 gurugram',
    'biology tuition sector 57',
    'best biology teacher sector 57 gurgaon',
    'class 11 biology coaching sector 57',
    'class 12 biology tuition sector 57 gurgaon',
    'neet biology classes near sector 57',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-57',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-57',
  },
}

export default function BiologyClassesSector57GurgaonPage() {
  return <CityHubPage data={cityData} />
}
