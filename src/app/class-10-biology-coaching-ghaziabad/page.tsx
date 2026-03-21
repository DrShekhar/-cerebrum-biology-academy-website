import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('class-10-biology-coaching-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/class-10-biology-coaching-ghaziabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/class-10-biology-coaching-ghaziabad`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
