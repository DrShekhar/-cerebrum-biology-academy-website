import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('cbse-biology-coaching-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/cbse-biology-coaching-ghaziabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/cbse-biology-coaching-ghaziabad`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
