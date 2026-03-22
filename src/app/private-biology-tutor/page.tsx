import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('private-biology-tutor')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/private-biology-tutor`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/private-biology-tutor`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
