import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('class-10-biology-coaching-noida')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/class-10-biology-coaching-noida`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/class-10-biology-coaching-noida`,
  },
}

export const revalidate = 86400

export default function Page() {
  return <CityHubPage data={cityData} />
}
