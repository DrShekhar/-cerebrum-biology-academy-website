import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon-sector-49')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sector 49 gurgaon',
    'neet coaching sector 49 gurugram',
    'biology tuition sector 49',
    'best biology teacher sector 49 gurgaon',
    'class 11 biology coaching sector 49',
    'class 12 biology tuition sector 49 gurgaon',
    'neet biology classes near sector 49',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-49',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-49',
  },
}

export default function BiologyClassesSector49GurgaonPage() {
  return <CityHubPage data={cityData} />
}
