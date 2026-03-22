import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('online-biology-tuition')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/online-biology-tuition`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/online-biology-tuition`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
