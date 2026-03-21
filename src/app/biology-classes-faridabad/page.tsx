import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-faridabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-faridabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-classes-faridabad`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
