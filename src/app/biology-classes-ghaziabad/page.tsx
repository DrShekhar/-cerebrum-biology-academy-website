import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-ghaziabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-classes-ghaziabad`,
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function Page() {
  return <CityHubPage data={cityData} />
}
