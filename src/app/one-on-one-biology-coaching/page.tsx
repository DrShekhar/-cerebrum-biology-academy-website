import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('one-on-one-biology-coaching')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/one-on-one-biology-coaching`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/one-on-one-biology-coaching`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
