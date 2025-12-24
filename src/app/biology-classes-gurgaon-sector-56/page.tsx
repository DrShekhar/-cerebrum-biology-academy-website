import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-56')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sector 56 gurgaon',
    'neet coaching sector 56 gurugram',
    'biology tuition sector 56',
    'best biology teacher sector 56 gurgaon',
    'class 11 biology coaching sector 56',
    'class 12 biology tuition sector 56 gurgaon',
    'neet biology classes near sector 56',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-56',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-56',
  },
}

export default function BiologyClassesSector56GurgaonPage() {
  return <CityHubPage data={cityData} />
}
