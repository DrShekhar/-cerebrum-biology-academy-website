import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('best-biology-coaching-delhi-ncr')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/best-biology-coaching-delhi-ncr`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/best-biology-coaching-delhi-ncr`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
