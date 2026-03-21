import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('class-11-biology-coaching-north-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/class-11-biology-coaching-north-delhi`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/class-11-biology-coaching-north-delhi`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
