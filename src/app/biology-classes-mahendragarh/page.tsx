import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('mahendragarh')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in mahendragarh',
    'biology coaching mahendragarh',
    'neet biology classes mahendragarh',
    'best biology tuition mahendragarh',
    'online biology classes mahendragarh',
    'class 11 biology coaching mahendragarh',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-mahendragarh`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-mahendragarh',
  },
}

export default function BiologyClassesMahendragarhPage() {
  return <CityHubPage data={cityData} />
}
