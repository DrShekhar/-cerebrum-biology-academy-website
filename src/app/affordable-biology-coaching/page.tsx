import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('affordable-biology-coaching')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/affordable-biology-coaching`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/affordable-biology-coaching`,
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function Page() {
  return <CityHubPage data={cityData} />
}
